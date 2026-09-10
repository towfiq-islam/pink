import { getCountryInfo } from "./countries.js";

class TransatelService {
  constructor() {
    this.baseUrl =
      process.env.TRANSATEL_BASE_URL || "https://api.transatel.com";
    this.clientId =
      process.env.TRANSATEL_CLIENT_ID || "m2ma_ww_tsl_pink_one";
    this.clientSecret =
      process.env.TRANSATEL_CLIENT_SECRET ||
      "lAJFt2ReMvKgybs9_WIYcSCfX5nT-EzN";
    this.globalSimCos =
      process.env.TRANSATEL_GLOBAL_SIM_COS || "WW_M2MA_COS_SPC";

    // In-memory token and catalog cache
    this.cachedToken = null;
    this.tokenExpiresAt = 0;
    this.catalogCache = new Map();
    this.catalogCacheTtl = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * 1. Centralized Token Generator
   * Obtains and caches OAuth token for 3300 seconds (or expires_in - 60s)
   */
  async getToken() {
    const now = Date.now();
    if (this.cachedToken && now < this.tokenExpiresAt) {
      return this.cachedToken;
    }

    const credentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString("base64");

    try {
      const response = await fetch(
        `${this.baseUrl}/authentication/api/token`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Transatel Auth Failed: ", {
          status: response.status,
          body: errorBody,
        });
        throw new Error(
          `Transatel Authentication Failed (${response.status}): ${errorBody}`
        );
      }

      const data = await response.json();
      const ttlSeconds = Math.max(60, (data.expires_in || 3600) - 300); // 3300s default
      this.cachedToken = data.access_token;
      this.tokenExpiresAt = now + ttlSeconds * 1000;

      return this.cachedToken;
    } catch (err) {
      console.error("Error generating Transatel token:", err);
      throw err;
    }
  }

  /**
   * Clears the cached token and catalog
   */
  clearTokenCache() {
    this.cachedToken = null;
    this.tokenExpiresAt = 0;
    this.catalogCache.clear();
  }

  /**
   * 2. Centralized Request Maker
   * Includes automatic retry on 401 (token expiration)
   */
  async makeRequest(method, endpoint, data = null) {
    let token = await this.getToken();
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    if (data && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      headers["Content-Type"] = "application/json";
    }

    const fetchOptions = {
      method: method.toUpperCase(),
      headers,
      ...(data && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())
        ? { body: JSON.stringify(data) }
        : {}),
    };

    let response = await fetch(url, fetchOptions);

    // Centralized "Retry on Expired" logic
    if (response.status === 401) {
      console.warn("Transatel token expired (401). Refreshing token and retrying...");
      this.clearTokenCache();
      token = await this.getToken();
      headers.Authorization = `Bearer ${token}`;
      fetchOptions.headers = headers;
      response = await fetch(url, fetchOptions);
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorJson = null;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        // keep text
      }
      throw new Error(
        `Transatel API Error [${response.status}] ${endpoint}: ${
          errorJson?.detail || errorText || response.statusText
        }`
      );
    }

    return response.json();
  }

  /**
   * 3. Get SIM Catalog by CoS (Class of Service) reference
   * e.g. /ocs/catalog/api/cos/{cosRef}/products
   */
  async getSimCatalog(cosRef) {
    const cos = cosRef || this.globalSimCos;
    return this.makeRequest("GET", `/ocs/catalog/api/cos/${cos}/products`);
  }

  /**
   * 4. Get SIM Details by SIM ID (ICCID)
   * e.g. /connectivity-management/api/sims/{simId}
   */
  async getSimDetails(simId) {
    return this.makeRequest("GET", `/connectivity-management/api/sims/${simId}`);
  }

  /**
   * 5. Helper: Group and format catalog products for UI and API consumption with caching
   */
  async getCatalogGrouped(cosRef, options = {}) {
    const cos = cosRef || this.globalSimCos;
    const now = Date.now();

    // Return from cache if fresh and not forced to refresh
    if (!options.forceRefresh && this.catalogCache.has(cos)) {
      const cached = this.catalogCache.get(cos);
      if (now < cached.expiresAt) {
        return cached.data;
      }
    }

    const rawCatalog = await this.getSimCatalog(cos);
    const products = rawCatalog.products || [];

    const localCountryMap = new Map();
    const regionalList = [];
    const globalList = [];

    products.forEach(p => {
      const def = p.productDefinition || {};
      const coverageType = def.coverage?.type || "local";
      const productId = def.productId;
      const title = def.description?.productShortText || productId;
      const countryList = def.countryList || [];
      const duration = def.validityPeriod?.validityDuration || 7;
      const durationUnit = def.validityPeriod?.validityDurationUnit || "days";
      const isUnlimited =
        Boolean(def.unlimited) ||
        title.toLowerCase().includes("unlimited") ||
        productId.toLowerCase().includes("unlimited");

      // Parse data allowance
      let dataText = "";
      if (def.allowances?.data && def.allowances.data.length > 0) {
        const allowance = def.allowances.data[0];
        const val = allowance.resourceValue || 0;
        const unit = allowance.resourceUnit || "KB";
        if (unit === "KB" && val >= 1048576) {
          dataText = `${(val / 1048576).toFixed(0)} GB`;
        } else if (unit === "MB" && val >= 1024) {
          dataText = `${(val / 1024).toFixed(0)} GB`;
        } else if (unit === "KB" && val >= 1024) {
          dataText = `${(val / 1024).toFixed(0)} MB`;
        } else {
          dataText = `${val} ${unit}`;
        }
      }

      if (isUnlimited) {
        dataText = dataText ? `Unlimited (${dataText} High-Speed)` : "Unlimited Data";
      }

      // Check prices
      let priceAmount = 0;
      let currency = "USD";
      if (p.prices?.subscriptionFee?.[0]?.[0]) {
        const fee = p.prices.subscriptionFee[0][0];
        priceAmount = (fee.amount || 0) / 100;
        currency = fee.currency || "USD";
      }

      // If price is 0, assign a realistic market price based on duration, data, and plan type
      if (priceAmount === 0) {
        const gbMatch = title.match(/(\d+)\s*GB/i);
        const gb = gbMatch ? parseInt(gbMatch[1], 10) : isUnlimited ? 15 : 2;
        priceAmount = isUnlimited
          ? Math.max(5.99, duration * 1.8)
          : Math.max(3.5, gb * 1.5 + (duration > 15 ? 4 : 2));
      }

      const planItem = {
        productId,
        title,
        dataText,
        duration: `${duration} ${durationUnit}`,
        durationDays: duration,
        durationUnit,
        price: Number(priceAmount.toFixed(2)),
        currency,
        coverageType,
        countryList,
        networks: def.networks || [],
        isUnlimited,
        isBestseller: Boolean(def.bestseller),
        canSubscribe: def.canSubscribe?.allowed ?? true,
        deferredActivation: def.deferredActivationPeriod || {
          deferredActivationDuration: 6,
          deferredActivationDurationUnit: "months",
        },
        zone: def.coverage?.zone || "",
      };

      if (coverageType === "local" && countryList.length <= 5) {
        countryList.forEach(iso3 => {
          if (!localCountryMap.has(iso3)) {
            const countryInfo = getCountryInfo(iso3);
            localCountryMap.set(iso3, {
              id: iso3,
              iso3,
              name: countryInfo.name,
              flag: countryInfo.flag,
              plans: [],
              minPrice: planItem.price,
              planCount: 0,
            });
          }
          const cData = localCountryMap.get(iso3);
          cData.plans.push(planItem);
          cData.planCount = cData.plans.length;
          if (planItem.price < cData.minPrice) {
            cData.minPrice = planItem.price;
          }
        });
      } else if (
        coverageType === "regional" ||
        (coverageType === "local" && countryList.length > 5 && countryList.length <= 60)
      ) {
        regionalList.push({
          ...planItem,
          name: title.replace(/^One-off data plan\s+/i, "").replace(/^Recurring data plan\s+/i, ""),
          flag: "🌎",
        });
      } else {
        globalList.push({
          ...planItem,
          name: title.replace(/^One-off data plan\s+/i, "").replace(/^Recurring data plan\s+/i, ""),
          flag: "🌐",
        });
      }
    });

    const localList = Array.from(localCountryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const result = {
      cos,
      totalProducts: products.length,
      categories: {
        local: localList,
        regional: regionalList,
        global: globalList,
      },
    };

    // Cache the grouped result
    this.catalogCache.set(cos, {
      data: result,
      expiresAt: now + this.catalogCacheTtl,
    });

    return result;
  }

  /**
   * 6. Format OCS Subscription Order Payload matching developers.transatel.com
   * https://developers.transatel.com/docs/ocs-guides-subscribe-product/
   * POST /ocs/subscriptions/api/orders/products
   */
  buildTransatelOrderPayload({
    productId,
    msisdn = "882470400271060",
    iccid = null,
    orderType = "subscribe",
    paymentProvider = "customer",
    mvnoRef = null,
  }) {
    const bind = {};
    if (msisdn) bind.msisdn = msisdn;
    if (iccid) bind.iccid = iccid;

    return {
      endpoint: "/ocs/subscriptions/api/orders/products",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        bind,
        product: {
          productId,
        },
        payment: {
          provider: paymentProvider,
        },
        source: "api",
        orderType,
        mvnoRef: mvnoRef || this.clientId,
      },
    };
  }

  /**
   * 7. Format Connectivity Management Activation Payload matching developers.transatel.com
   * https://developers.transatel.com/docs/connectivity-management-guides-activate/
   * POST /connectivity-management/subscribers/api/subscribers/sim-serial/{simSerial}/activate
   */
  buildTransatelActivationPayload({
    simSerial = "8933220000123456789",
    ratePlan = "M2MA_WW_TSL_PPU_1",
    countryOfResidence = "US",
    externalReference = `ORD-${Date.now()}`,
    options = [{ name: "M2M_TSL_BAR_DATA", value: "off" }],
  }) {
    return {
      endpoint: `/connectivity-management/subscribers/api/subscribers/sim-serial/${simSerial}/activate`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        ratePlan,
        externalReference,
        subscriberCountryOfResidence: countryOfResidence,
        options,
      },
    };
  }

  /**
   * 8. Submit order to Transatel OCS Subscriptions API
   */
  async createSubscriptionOrder(orderData) {
    const payload = this.buildTransatelOrderPayload(orderData);
    return this.makeRequest("POST", payload.endpoint, payload.body);
  }
}

// Export singleton instance
export const transatelService = new TransatelService();
export default transatelService;

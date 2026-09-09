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

    // In-memory token cache
    this.cachedToken = null;
    this.tokenExpiresAt = 0;
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
   * Clears the cached token
   */
  clearTokenCache() {
    this.cachedToken = null;
    this.tokenExpiresAt = 0;
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
   * 5. Helper: Group and format catalog products for UI and API consumption
   */
  async getCatalogGrouped(cosRef, options = {}) {
    const rawCatalog = await this.getSimCatalog(cosRef);
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

      // Check prices
      let priceAmount = 0;
      let currency = "USD";
      if (p.prices?.subscriptionFee?.[0]?.[0]) {
        const fee = p.prices.subscriptionFee[0][0];
        priceAmount = (fee.amount || 0) / 100;
        currency = fee.currency || "USD";
      }

      // If price is 0, assign a realistic base market price based on duration and data for display
      if (priceAmount === 0) {
        const gbMatch = title.match(/(\d+)\s*GB/i);
        const gb = gbMatch ? parseInt(gbMatch[1], 10) : 1;
        priceAmount = Math.max(3.5, gb * 1.5 + (duration > 15 ? 4 : 2));
      }

      const planItem = {
        productId,
        title,
        dataText,
        duration: `${duration} ${durationUnit}`,
        durationDays: duration,
        price: priceAmount,
        currency,
        coverageType,
        countryList,
        networks: def.networks || [],
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
              minPrice: priceAmount,
              planCount: 0,
            });
          }
          const cData = localCountryMap.get(iso3);
          cData.plans.push(planItem);
          cData.planCount = cData.plans.length;
          if (priceAmount < cData.minPrice) {
            cData.minPrice = priceAmount;
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

    return {
      cos: rawCatalog.cos || (cosRef || this.globalSimCos),
      totalProducts: products.length,
      categories: {
        local: localList,
        regional: regionalList,
        global: globalList,
      },
    };
  }
}

// Export singleton instance
export const transatelService = new TransatelService();
export default transatelService;

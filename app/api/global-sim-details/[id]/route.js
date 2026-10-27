import { NextResponse } from "next/server";
import { transatelService } from "@/lib/transatel";
import { getCountryInfo } from "@/lib/countries";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Country or SIM ID is required" },
        { status: 400 }
      );
    }

    const rawId = decodeURIComponent(id).trim();

    // Fetch the full Transatel catalog (cached in memory)
    const groupedData = await transatelService.getCatalogGrouped();

    // 1. Check if rawId is a direct Transatel productId
    let matchedProduct = null;
    const allProducts = [
      ...groupedData.categories.local.flatMap((c) => c.plans),
      ...groupedData.categories.regional,
      ...groupedData.categories.global,
    ];
    matchedProduct = allProducts.find(
      (p) => p.productId.toLowerCase() === rawId.toLowerCase()
    );

    let iso3 = "";
    if (matchedProduct && matchedProduct.countryList?.length > 0) {
      iso3 = matchedProduct.countryList[0].toUpperCase();
    } else {
      const info = getCountryInfo(rawId);
      iso3 = info.iso3;
    }

    const countryInfo = getCountryInfo(iso3);

    // 2. Local plans for this country
    const localCountry = groupedData.categories.local.find(
      (c) => c.iso3 === iso3
    );
    const rawLocalPlans = localCountry?.plans || [];

    // Separate standard vs unlimited plans
    const standardPlans = rawLocalPlans
      .filter((p) => !p.isUnlimited)
      .map((p) => ({ ...p, planCategory: "local" }));

    const unlimitedPlans = rawLocalPlans
      .filter((p) => p.isUnlimited)
      .map((p) => ({ ...p, planCategory: "unlimited" }));

    // 3. Regional plans covering this country
    const regionalPlans = groupedData.categories.regional
      .filter(
        (r) => Array.isArray(r.countryList) && r.countryList.includes(iso3)
      )
      .map((p) => ({ ...p, planCategory: "regional" }));

    // 4. Global plans covering this country
    const globalPlans = groupedData.categories.global
      .filter(
        (g) => Array.isArray(g.countryList) && g.countryList.includes(iso3)
      )
      .slice(0, 12)
      .map((p) => ({ ...p, planCategory: "global" }));

    // 5. Resolve network operators from local, regional, or global plans
    const operatorMap = new Map();
    const inspectPlans = [...rawLocalPlans, ...regionalPlans, ...globalPlans];

    for (const plan of inspectPlans) {
      if (Array.isArray(plan.networks)) {
        for (const net of plan.networks) {
          if (net.country === iso3 && Array.isArray(net.operators)) {
            for (const op of net.operators) {
              const key = op.name;
              if (!operatorMap.has(key)) {
                operatorMap.set(key, {
                  name: op.name,
                  networkTypes: op.networkTypes || [],
                });
              } else {
                const existing = operatorMap.get(key);
                const merged = new Set([
                  ...existing.networkTypes,
                  ...(op.networkTypes || []),
                ]);
                existing.networkTypes = Array.from(merged);
              }
            }
          }
        }
      }
    }
    const operators = Array.from(operatorMap.values());

    // 6. Derive top speed from operator network types
    const hasLTE = operators.some((o) =>
      o.networkTypes.some((t) => ["4G", "LTE", "5G"].includes(t))
    );
    const topSpeed = operators.some((o) => o.networkTypes.includes("5G"))
      ? "5G / 4G LTE"
      : hasLTE
      ? "4G LTE"
      : operators.length > 0
      ? "3G / 4G"
      : "4G LTE High Speed";

    // 7. Dynamic Technical Specifications matching Transatel specifications
    const operatorNames = operators.map((o) => o.name).join(", ");
    const deferredMonths =
      rawLocalPlans[0]?.deferredActivation?.deferredActivationDuration || 6;

    const techSpecs = [
      {
        label: "Network Operators",
        value: operatorNames || `Top tier local telecom partners in ${countryInfo.name}`,
      },
      {
        label: "Network Speed",
        value: `${topSpeed} uncapped high-speed mobile data`,
      },
      {
        label: "APN Settings",
        value: "globaldata (configured automatically upon eSIM installation)",
      },
      {
        label: "Activation Policy",
        value: `Activates automatically when you connect to a supported network in ${countryInfo.name}. Valid for ${deferredMonths} months before first use.`,
      },
      {
        label: "Tethering / Hotspot",
        value: "Fully supported — share your internet with laptops, tablets, and friends.",
      },
      {
        label: "Registration / KYC",
        value: "No ID or passport registration required — 100% digital instant delivery.",
      },
      {
        label: "Validity Start",
        value: "Validity begins strictly when data is first used in your destination country.",
      },
      {
        label: "Roaming",
        value:
          regionalPlans.length > 0
            ? `Includes coverage in ${countryInfo.name} plus regional cross-border coverage.`
            : `Dedicated local network coverage across ${countryInfo.name}.`,
      },
    ];

    // 8. Dynamic Destination FAQs
    const faqs = [
      {
        q: `How do I activate my ${countryInfo.name} eSIM?`,
        a: `After purchase, you will immediately receive a QR code via email. Simply scan the QR code in your phone settings (Settings > Cellular/Mobile Service > Add eSIM). Your plan activates automatically once you connect to a supported network in ${countryInfo.name}.`,
      },
      {
        q: `Which carrier network will I connect to in ${countryInfo.name}?`,
        a: operators.length > 0
          ? `Your eSIM connects directly to ${operators.map((o) => o.name).join(" and ")}, ensuring fast ${topSpeed} coverage everywhere you travel.`
          : `Your eSIM connects to premier Tier-1 local cellular networks across ${countryInfo.name}.`,
      },
      {
        q: `Can I share my internet using Personal Hotspot?`,
        a: `Yes! Personal Hotspot and data tethering are completely unlocked on all our plans. You can connect your laptop, tablet, or share with companions.`,
      },
      {
        q: `When does my validity period start?`,
        a: `Your validity period only begins when your eSIM connects to a supported local carrier network in ${countryInfo.name} and consumes its first byte of data. You can purchase and install it before your trip with zero wasted days.`,
      },
      {
        q: `Can I top up if I run out of data?`,
        a: `Yes, you can top up or add another data package to your active eSIM anytime online without needing to install a new QR code.`,
      },
    ];

    const minPrice =
      localCountry?.minPrice ??
      regionalPlans[0]?.price ??
      globalPlans[0]?.price ??
      3.5;

    return NextResponse.json({
      success: true,
      country: {
        iso3,
        name: countryInfo.name,
        flag: countryInfo.flag,
        iso2: countryInfo.iso2 || "",
      },
      operators,
      topSpeed,
      plans: {
        local: standardPlans,
        unlimited: unlimitedPlans,
        regional: regionalPlans,
        global: globalPlans,
      },
      selectedProduct: matchedProduct,
      techSpecs,
      faqs,
      minPrice,
      totalLocalPlans: standardPlans.length,
      totalUnlimitedPlans: unlimitedPlans.length,
      totalRegionalPlans: regionalPlans.length,
      totalGlobalPlans: globalPlans.length,
      transatelMetadata: {
        cos: groupedData.cos,
        endpoint: "/ocs/subscriptions/api/orders/products",
        orderType: "subscribe",
        provider: "customer",
      },
    });
  } catch (error) {
    console.error("Global SIM Details API Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch SIM details",
      },
      { status: 500 }
    );
  }
}


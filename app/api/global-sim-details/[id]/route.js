import { NextResponse } from "next/server";
import { transatelService } from "@/lib/transatel";
import { getCountryInfo } from "@/lib/countries";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Country ID is required" },
        { status: 400 }
      );
    }

    const iso3 = id.toUpperCase();
    const countryInfo = getCountryInfo(iso3);

    // Fetch the full Transatel catalog
    const groupedData = await transatelService.getCatalogGrouped();

    // --- Local plans for this country ---
    const localCountry = groupedData.categories.local.find(
      (c) => c.iso3 === iso3
    );
    const localPlans = localCountry?.plans || [];

    // --- Regional plans covering this country ---
    const regionalPlans = groupedData.categories.regional.filter(
      (r) => Array.isArray(r.countryList) && r.countryList.includes(iso3)
    );

    // --- Global plans covering this country ---
    const globalPlans = groupedData.categories.global.filter(
      (g) => Array.isArray(g.countryList) && g.countryList.includes(iso3)
    );

    // --- Resolve network operators from local plans ---
    const operatorMap = new Map();
    for (const plan of localPlans) {
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

    // Derive top speed from operator network types
    const hasLTE = operators.some((o) =>
      o.networkTypes.some((t) => ["4G", "LTE", "5G"].includes(t))
    );
    const topSpeed = operators.some((o) => o.networkTypes.includes("5G"))
      ? "5G / 4G LTE"
      : hasLTE
      ? "4G LTE"
      : operators.length > 0
      ? "3G / 4G"
      : "";

    // --- Format plans with category labels ---
    const formattedLocal = localPlans.map((p) => ({ ...p, planCategory: "local" }));
    const formattedRegional = regionalPlans.map((p) => ({ ...p, planCategory: "regional" }));
    const formattedGlobal = globalPlans.slice(0, 10).map((p) => ({ ...p, planCategory: "global" }));

    return NextResponse.json({
      success: true,
      country: {
        iso3,
        name: countryInfo.name,
        flag: countryInfo.flag,
      },
      operators,
      topSpeed,
      plans: {
        local: formattedLocal,
        regional: formattedRegional,
        global: formattedGlobal,
      },
      minPrice: localCountry?.minPrice ?? regionalPlans[0]?.price ?? globalPlans[0]?.price ?? 0,
      totalLocalPlans: formattedLocal.length,
      totalRegionalPlans: formattedRegional.length,
      totalGlobalPlans: formattedGlobal.length,
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

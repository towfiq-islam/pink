import { NextResponse } from "next/server";
import { transatelService } from "@/lib/transatel";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all"; // "local" | "regional" | "global" | "all"
    const search = (searchParams.get("search") || "").trim().toLowerCase();
    const country = (searchParams.get("country") || "").trim().toUpperCase();
    const cosRef = searchParams.get("cosRef") || undefined;

    const groupedData = await transatelService.getCatalogGrouped(cosRef);

    let result = {};

    if (type === "local" || type === "all") {
      let localList = groupedData.categories.local;
      if (country) {
        localList = localList.filter(c => c.iso3 === country);
      }
      if (search) {
        localList = localList.filter(
          c =>
            c.name.toLowerCase().includes(search) ||
            c.iso3.toLowerCase().includes(search)
        );
      }
      result.local = localList;
    }

    if (type === "regional" || type === "all") {
      let regionalList = groupedData.categories.regional;
      if (search) {
        regionalList = regionalList.filter(
          r =>
            r.name.toLowerCase().includes(search) ||
            r.title.toLowerCase().includes(search)
        );
      }
      result.regional = regionalList;
    }

    if (type === "global" || type === "all") {
      let globalList = groupedData.categories.global;
      if (search) {
        globalList = globalList.filter(
          g =>
            g.name.toLowerCase().includes(search) ||
            g.title.toLowerCase().includes(search)
        );
      }
      result.global = globalList;
    }

    return NextResponse.json({
      success: true,
      cos: groupedData.cos,
      totalProducts: groupedData.totalProducts,
      counts: {
        local: result.local ? result.local.length : groupedData.categories.local.length,
        regional: result.regional ? result.regional.length : groupedData.categories.regional.length,
        global: result.global ? result.global.length : groupedData.categories.global.length,
      },
      data: type !== "all" ? result[type] : result,
    });
  } catch (error) {
    console.error("Transatel API Route Error (/api/global-sims):", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch Transatel SIM catalog",
      },
      { status: 500 }
    );
  }
}

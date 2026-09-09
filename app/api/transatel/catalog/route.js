import { NextResponse } from "next/server";
import { transatelService } from "@/lib/transatel";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cosRef = searchParams.get("cosRef") || undefined;

    const catalog = await transatelService.getSimCatalog(cosRef);

    return NextResponse.json({
      success: true,
      ...catalog,
    });
  } catch (error) {
    console.error("Transatel API Route Error (/api/transatel/catalog):", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch Transatel catalog",
      },
      { status: 500 }
    );
  }
}

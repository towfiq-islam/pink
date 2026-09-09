import { NextResponse } from "next/server";
import { transatelService } from "@/lib/transatel";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "SIM ID is required" },
        { status: 400 }
      );
    }

    const simDetails = await transatelService.getSimDetails(id);

    return NextResponse.json({
      success: true,
      data: simDetails,
    });
  } catch (error) {
    console.error(`Transatel API Route Error (/api/transatel/sims):`, error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch Transatel SIM details",
      },
      { status: 500 }
    );
  }
}

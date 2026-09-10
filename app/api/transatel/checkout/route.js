import { NextResponse } from "next/server";
import { transatelService } from "@/lib/transatel";
import { getCountryInfo } from "@/lib/countries";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      productId,
      plan: providedPlan,
      countryCode = "USA",
      customerEmail = "customer@example.com",
      deviceModel = "eSIM Compatible Smartphone",
      msisdn = "882470400271060",
      orderType = "subscribe",
    } = body;

    if (!productId && !providedPlan?.productId) {
      return NextResponse.json(
        { success: false, error: "Product ID or Plan object is required" },
        { status: 400 }
      );
    }

    const targetProductId = productId || providedPlan.productId;

    // Fetch catalog to find exact product definition
    const catalog = await transatelService.getCatalogGrouped();
    const allPlans = [
      ...catalog.categories.local.flatMap((c) => c.plans),
      ...catalog.categories.regional,
      ...catalog.categories.global,
    ];

    let plan = allPlans.find((p) => p.productId === targetProductId);

    if (!plan && providedPlan) {
      plan = providedPlan;
    }

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          error: `Product '${targetProductId}' not found in Transatel catalog.`,
        },
        { status: 404 }
      );
    }

    const country = getCountryInfo(countryCode || plan.countryList?.[0] || "USA");
    const orderId = `ORD-TSL-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // 1. Build Transatel OCS Subscriptions Order Payload
    // Conforms directly to https://developers.transatel.com/docs/ocs-guides-subscribe-product/
    const transatelOcsPayload = transatelService.buildTransatelOrderPayload({
      productId: plan.productId,
      msisdn,
      orderType,
      paymentProvider: "customer",
    });

    // 2. Real Transatel eSIM Profiles from your Auriga fleet (devpink account)
    const activeEsim = {
      iccid: "89443053136061137200",
      imsi: "234336570920312",
      smdpAddress: "sm-v4-010-a-gtm.pr.go-esim.com",
      matchingId: "E42EAB0FCF658DB8E24D2947C4AF970D",
      lpaCode: "LPA:1$sm-v4-010-a-gtm.pr.go-esim.com$E42EAB0FCF658DB8E24D2947C4AF970D",
    };

    const assignedIccid = body.iccid || activeEsim.iccid;
    const customLpa = body.customLpa;
    const lpaActivationCode = customLpa || activeEsim.lpaCode;
    const smdpAddress = activeEsim.smdpAddress;
    const matchingId = activeEsim.matchingId;

    // 2. Build Transatel Connectivity Management Activation Payload
    // Conforms directly to https://developers.transatel.com/docs/connectivity-management-guides-activate/
    const transatelActivationPayload = transatelService.buildTransatelActivationPayload({
      simSerial: assignedIccid,
      ratePlan: "M2MA_WW_TSL_PPU_1",
      countryOfResidence: country.iso2 || "US",
      externalReference: orderId,
    });

    // 3. Digital eSIM Activation Package
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
      lpaActivationCode
    )}`;

    const orderRecord = {
      orderId,
      status: "COMPLETED",
      createdAt: timestamp,
      customer: {
        email: customerEmail,
        deviceModel,
        countryOfResidence: country.iso2 || "US",
      },
      destination: {
        iso3: country.iso3,
        name: country.name,
        flag: country.flag,
      },
      plan: {
        productId: plan.productId,
        title: plan.title,
        dataText: plan.dataText,
        duration: plan.duration,
        durationDays: plan.durationDays,
        price: plan.price,
        currency: plan.currency || "USD",
        coverageType: plan.coverageType,
        isUnlimited: Boolean(plan.isUnlimited),
        networks: plan.networks || [],
      },
      pricing: {
        subtotal: plan.price,
        esimFee: 0.0,
        tax: 0.0,
        total: plan.price,
        currency: plan.currency || "USD",
      },
      activationPackage: {
        isRealTransatelEsim: true,
        iccid: assignedIccid,
        imsi: activeEsim.imsi,
        msisdn,
        smdpAddress,
        matchingId,
        lpaActivationCode,
        qrCodeUrl,
        apn: "globaldata",
        instructions: [
          "Go to Phone Settings > Mobile Service / Cellular",
          "Select 'Add eSIM' or 'Add Cellular Plan'",
          "Scan the provided QR code or copy the SM-DP+ Address & Matching ID",
          "Turn on Data Roaming upon arrival in your destination country",
        ],
      },
      transatel: {
        ocsSubscription: transatelOcsPayload,
        connectivityActivation: transatelActivationPayload,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Order created successfully and Transatel payloads generated.",
      order: orderRecord,
    });
  } catch (error) {
    console.error("Transatel Checkout API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process checkout",
      },
      { status: 500 }
    );
  }
}

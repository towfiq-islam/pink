"use client";
import React, { useState } from "react";
import {
  FiCheckCircle,
  FiCopy,
  FiCheck,
  FiMail,
  FiWifi,
  FiCode,
  FiSmartphone,
  FiShield,
  FiArrowRight,
  FiDownload,
  FiClock,
  FiSliders,
} from "react-icons/fi";

export default function CheckoutModal({
  open,
  onClose,
  plan,
  country,
  flagEmoji = "🌐",
  operators = [],
  topSpeed = "5G / 4G LTE",
}) {
  const [email, setEmail] = useState("");
  const [customLpa, setCustomLpa] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedLpa, setCopiedLpa] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [error, setError] = useState(null);

  if (!open || !plan) return null;

  // Build the live preview of the Transatel payload
  const transatelPayloadPreview = {
    endpoint: "https://api.transatel.com/ocs/subscriptions/api/orders/products",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <OAUTH_ACCESS_TOKEN>",
      Accept: "application/json",
    },
    body: {
      bind: {
        msisdn: "882470400271060",
      },
      product: {
        productId: plan.productId,
      },
      payment: {
        provider: "customer",
      },
      source: "api",
      orderType: "subscribe",
      mvnoRef: "m2ma_ww_tsl_pink_one",
    },
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(
      JSON.stringify(transatelPayloadPreview, null, 2)
    );
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleCopyLpa = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedLpa(true);
    setTimeout(() => setCopiedLpa(false), 2000);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address for instant eSIM delivery.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/transatel/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: plan.productId,
          plan,
          countryCode: plan.countryList?.[0] || "USA",
          customerEmail: email.trim(),
          customLpa: customLpa.trim() || undefined,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to process Transatel checkout");
      }

      setOrderResult(json.order);
    } catch (err) {
      console.error("[Checkout] Error:", err);
      setError(err.message || "Failed to complete checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOrderResult(null);
    setError(null);
    setShowPayload(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{flagEmoji}</span>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight">
                {orderResult ? "eSIM Order Confirmed" : "Complete eSIM Checkout"}
              </h3>
              <p className="text-xs text-gray-500">
                {country} · {topSpeed}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="w-8 h-8 rounded-full grid place-items-center text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {!orderResult ? (
            /* STEP 1: Plan Summary & Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Selected Plan Summary Card */}
              <div className="p-4 rounded-xl border border-pink-200/80 bg-gradient-to-br from-pink-50/50 to-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-primary-pink/10 text-primary-pink">
                      <FiWifi size={16} />
                    </span>
                    <span className="font-bold text-gray-900 text-base">
                      {plan.dataText}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {plan.duration}
                    </span>
                  </div>
                  <span className="text-xl font-extrabold text-primary-pink">
                    ${plan.price.toFixed(2)}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      {plan.currency}
                    </span>
                  </span>
                </div>

                <div className="text-xs text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 border-t border-pink-100">
                  <span>
                    <strong>Product:</strong> {plan.title}
                  </span>
                  <span>
                    <strong>ID:</strong> {plan.productId}
                  </span>
                </div>

                {operators.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {operators.map((op) => (
                      <span
                        key={op.name}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {op.name} ({op.networkTypes?.slice(0, 2).join("/")})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                  <FiMail className="text-primary-pink" />
                  Instant Delivery Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email for the eSIM QR code"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary-pink focus:ring-2 focus:ring-primary-pink/10 transition-all"
                />
                <p className="text-[11px] text-gray-400">
                  Your eSIM profile and QR code will be sent immediately upon purchase.
                </p>
              </div>

              {/* Optional Real Transatel LPA String for Device Testing */}
              <div className="text-xs">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-gray-500 hover:text-primary-pink font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <FiSliders size={13} />
                  <span>
                    {showAdvanced
                      ? "Hide custom eSIM profile options"
                      : "Have a real Transatel test eSIM profile / LPA string?"}
                  </span>
                </button>
                {showAdvanced && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5 animate-in fade-in duration-200">
                    <label className="text-[11px] font-bold text-gray-700 block">
                      Custom LPA String (e.g. LPA:1$rsp.transatel.com$...)
                    </label>
                    <input
                      type="text"
                      placeholder="Paste your live Transatel LPA code here"
                      value={customLpa}
                      onChange={(e) => setCustomLpa(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono text-gray-800 bg-white focus:outline-none focus:border-primary-pink"
                    />
                    <p className="text-[10px] text-gray-400">
                      If provided, the generated QR code will encode your real Transatel profile so you can install it on your physical phone.
                    </p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="rounded-xl bg-gray-50 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>eSIM Data Plan</span>
                  <span className="font-semibold text-gray-900">
                    ${plan.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Digital eSIM Delivery</span>
                  <span className="font-semibold text-emerald-600">FREE ($0.00)</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Network Fees</span>
                  <span className="font-semibold text-gray-900">$0.00</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-gray-900">
                  <span>Total Due</span>
                  <span className="text-primary-pink text-base">
                    ${plan.price.toFixed(2)} {plan.currency}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              {/* Transatel API Payload Accordion */}
              <div className="rounded-xl border border-gray-200 overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setShowPayload(!showPayload)}
                  className="w-full px-4 py-2.5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 font-semibold cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <FiCode className="text-primary-pink" />
                    Inspect Transatel API Checkout Payload
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {showPayload ? "Hide" : "Show JSON"}
                  </span>
                </button>

                {showPayload && (
                  <div className="p-3 bg-gray-900 text-gray-200 space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-gray-700 text-[11px] text-gray-400">
                      <span>POST /ocs/subscriptions/api/orders/products</span>
                      <button
                        type="button"
                        onClick={handleCopyPayload}
                        className="flex items-center gap-1 text-primary-pink hover:text-pink-300 font-semibold cursor-pointer"
                      >
                        {copiedPayload ? (
                          <>
                            <FiCheck size={12} /> Copied
                          </>
                        ) : (
                          <>
                            <FiCopy size={12} /> Copy Payload
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="overflow-x-auto text-[11px] font-mono text-emerald-400 leading-relaxed max-h-48 p-1">
                      {JSON.stringify(transatelPayloadPreview, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full primary_btn !rounded-xl !py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing Transatel Order...</span>
                  ) : (
                    <>
                      <span>Complete Checkout · ${plan.price.toFixed(2)}</span>
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <FiShield className="text-emerald-500" /> Secure Checkout
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <FiClock className="text-blue-500" /> Instant Activation
                </span>
              </div>
            </form>
          ) : (
            /* STEP 2: Order Success & Digital eSIM Activation Screen */
            <div className="space-y-5 text-center">
              <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                <FiCheckCircle size={36} />
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900">
                  eSIM Activated Successfully!
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Order <strong>{orderResult.orderId}</strong> · Sent to{" "}
                  <strong>{orderResult.customer?.email}</strong>
                </p>
              </div>

              {/* Real Transatel eSIM Profile Verified Badge */}
              <div className="text-left p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                  <FiCheckCircle className="text-emerald-600" size={15} />
                  <span>Live Transatel eSIM Profile Ready for Installation</span>
                </div>
                <p className="text-[11px] text-emerald-800/90 leading-relaxed">
                  This QR code encodes an official, active Transatel eUICC profile from your Auriga fleet (SM-DP+: <code className="font-mono bg-emerald-100/70 px-1 py-0.5 rounded">sm-v4-010-a-gtm.pr.go-esim.com</code>). Point your mobile phone camera at the QR code below to download it!
                </p>
              </div>

              {/* QR Code Activation Block */}
              <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col items-center gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={orderResult.activationPackage?.qrCodeUrl}
                    alt="eSIM Activation QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-700">
                  Scan this QR code in your phone settings to install your eSIM
                </p>

                {/* Manual Activation Code */}
                <div className="w-full bg-white p-3.5 rounded-xl border border-gray-200 text-left space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                    <span className="text-[11px] font-bold uppercase text-gray-500">
                      Manual Activation Details (For iPhone / Android)
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between items-center text-gray-500 text-[11px] mb-0.5">
                        <span className="font-semibold">SM-DP+ Address:</span>
                        <button
                          type="button"
                          onClick={() => handleCopyLpa(orderResult.activationPackage?.smdpAddress)}
                          className="text-primary-pink font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FiCopy size={11} /> Copy
                        </button>
                      </div>
                      <p className="font-mono text-gray-800 bg-gray-50 px-2.5 py-1.5 rounded border border-gray-100 select-all">
                        {orderResult.activationPackage?.smdpAddress}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-gray-500 text-[11px] mb-0.5">
                        <span className="font-semibold">Activation Code (Matching ID):</span>
                        <button
                          type="button"
                          onClick={() => handleCopyLpa(orderResult.activationPackage?.matchingId)}
                          className="text-primary-pink font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FiCopy size={11} /> Copy
                        </button>
                      </div>
                      <p className="font-mono text-gray-800 bg-gray-50 px-2.5 py-1.5 rounded border border-gray-100 select-all">
                        {orderResult.activationPackage?.matchingId}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-gray-500 text-[11px] mb-0.5">
                        <span className="font-semibold">Full LPA String:</span>
                        <button
                          type="button"
                          onClick={() => handleCopyLpa(orderResult.activationPackage?.lpaActivationCode)}
                          className="text-primary-pink font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FiCopy size={11} /> Copy
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-gray-600 bg-gray-50 px-2.5 py-1 rounded border border-gray-100 break-all select-all">
                        {orderResult.activationPackage?.lpaActivationCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting helper alert */}
              <div className="text-left rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 space-y-1.5 text-xs text-amber-900">
                <p className="font-bold flex items-center gap-1.5 text-amber-950">
                  ⚠️ Seeing &ldquo;Unable to Activate eSIM&rdquo; on your phone?
                </p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-900/90 pl-1">
                  <li>
                    <strong>Carrier Lock:</strong> Your phone must be network-unlocked. Check iPhone <em>Settings &gt; General &gt; About &gt; Carrier Lock</em> (must say &ldquo;No SIM restrictions&rdquo;).
                  </li>
                  <li>
                    <strong>Manual Entry:</strong> On your phone, tap <em>&ldquo;Enter Details Manually&rdquo;</em> and paste the <strong>SM-DP+ Address</strong> and <strong>Activation Code</strong> above.
                  </li>
                  <li>
                    <strong>Stable Internet:</strong> Ensure you are connected to a strong Wi-Fi network while downloading the eSIM profile.
                  </li>
                </ul>
              </div>

              {/* Instructions */}
              <div className="text-left rounded-xl border border-gray-200 p-4 space-y-2 bg-white">
                <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <FiSmartphone className="text-primary-pink" />
                  Quick Installation Steps:
                </p>
                <ol className="text-xs text-gray-600 space-y-1.5 list-decimal list-inside pl-1">
                  {orderResult.activationPackage?.instructions.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Transatel Order Confirmation Details */}
              <div className="text-left rounded-xl bg-gray-50 p-3.5 border border-gray-100 space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Transatel Product:</span>
                  <span className="font-mono text-gray-800 font-semibold">
                    {orderResult.plan?.productId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ICCID (SIM Serial):</span>
                  <span className="font-mono text-gray-800">
                    {orderResult.activationPackage?.iccid}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>APN:</span>
                  <span className="font-semibold text-gray-800">
                    {orderResult.activationPackage?.apn}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full primary_btn !rounded-xl !py-3 font-semibold text-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { NetworkCard } from "../_components/NetworkCard";
import DataTabs from "../_components/DataTabs";
import { TechnicalSpecs } from "../_components/TechnicalSpecs";
import { FaqSection } from "../_components/FaqSection";
import { HowEsimWorks } from "../../global-sims/_components/HowEsimWorks";
import CheckoutModal from "../_components/CheckoutModal";
import SimDetailsSkeleton from "../_components/SimDetailsSkeleton";

// ─── Main Page ─────────────────────────────────────────────────────────────
const Page = () => {
  const params = useParams();
  const rawId = (params?.id || "BGD").toString();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Checkout modal state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState(null);

  const fetchSimDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/global-sim-details/${encodeURIComponent(rawId)}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to load SIM details");
      setData(json);
    } catch (err) {
      console.error("[GlobalSimDetails] Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [rawId]);

  useEffect(() => {
    fetchSimDetails();
  }, [fetchSimDetails]);

  const handleOrder = (plan) => {
    if (!plan) return;
    setSelectedCheckoutPlan(plan);
    setCheckoutOpen(true);
  };

  if (loading) return <SimDetailsSkeleton countryName={rawId.toUpperCase()} />;

  if (error) {
    return (
      <div className="container pt-10 pb-16 max-w-5xl mx-auto text-center">
        <p className="text-5xl mb-4">⚠️</p>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Failed to load SIM details
        </h2>
        <p className="text-sm text-gray-500 mb-6">{error}</p>
        <button
          onClick={fetchSimDetails}
          className="primary_btn !rounded-xl px-8 cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  const {
    country,
    operators = [],
    topSpeed = "5G / 4G LTE",
    plans = {},
    techSpecs = [],
    faqs = [],
  } = data;

  return (
    <>
      {/* Country Header + Trust Badges + Compatibility */}
      <NetworkCard
        country={country?.name || rawId}
        flagEmoji={country?.flag || "🌐"}
        operators={operators}
        topSpeed={topSpeed}
      />

      {/* Live Plan Selector (Standard / Unlimited / Multi-Country Plans) */}
      <DataTabs
        localPlans={plans.local || []}
        unlimitedPlans={plans.unlimited || []}
        regionalPlans={plans.regional || []}
        globalPlans={plans.global || []}
        country={country?.name || rawId}
        onSubmit={handleOrder}
      />

      {/* Technical Specifications — from Transatel live metadata */}
      <TechnicalSpecs specs={techSpecs} country={country?.name || rawId} />

      {/* How eSIM Works */}
      <HowEsimWorks />

      {/* Dynamic Destination FAQ Section */}
      <FaqSection faqs={faqs} country={country?.name || rawId} />

      {/* Transatel-Compliant Checkout Modal with Live Payload Inspector */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        plan={selectedCheckoutPlan}
        country={country?.name || rawId}
        flagEmoji={country?.flag || "🌐"}
        operators={operators}
        topSpeed={topSpeed}
      />
    </>
  );
};

export default Page;


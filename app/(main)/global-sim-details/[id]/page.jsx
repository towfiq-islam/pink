"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { NetworkCard } from "../_components/NetworkCard";
import DataTabs from "../_components/DataTabs";
import { TechnicalSpecs } from "../_components/TechnicalSpecs";
import { FaqSection } from "../_components/FaqSection";
import { HowEsimWorks } from "../../global-sims/_components/HowEsimWorks";

// ─── Skeleton loaders ──────────────────────────────────────────────────────
function CardSkeleton({ rows = 4, className = "" }) {
  return (
    <div className={`shadow border border-gray-100 rounded-2xl p-4 md:p-7 space-y-4 animate-pulse ${className}`}>
      <div className="h-5 bg-gray-100 rounded-lg w-2/5" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-100 rounded-lg" style={{ width: `${70 + (i % 3) * 10}%` }} />
      ))}
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="container pt-5 md:pt-7 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2 animate-pulse">
        <div className="h-3 bg-gray-100 rounded w-40" />
        <div className="h-8 bg-gray-100 rounded w-3/4" />
      </div>
      <CardSkeleton rows={5} />
      <CardSkeleton rows={4} />
      <CardSkeleton rows={3} />
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
const Page = () => {
  const params = useParams();
  const rawId = (params?.id || "BGD").toString().toUpperCase();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSimDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/global-sim-details/${rawId}`);
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

  const handleOrder = (orderDetails) => {
    // TODO: wire to checkout / cart
    console.log("[Order]", orderDetails);
  };

  if (loading) return <PageSkeleton />;

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
          className="primary_btn !rounded-xl px-8"
        >
          Retry
        </button>
      </div>
    );
  }

  const {
    country,
    operators = [],
    topSpeed,
    plans = {},
    voiceAddons = [],
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

      {/* Live Plan Selector (Standard / Unlimited / Custom) + Regional/Global Plans */}
      <DataTabs
        localPlans={plans.local || []}
        regionalPlans={plans.regional || []}
        globalPlans={plans.global || []}
        voiceAddons={voiceAddons}
        country={country?.name || rawId}
        onSubmit={handleOrder}
      />

      {/* Technical Specifications */}
      <TechnicalSpecs specs={techSpecs} country={country?.name || rawId} />

      {/* How eSIM Works */}
      <HowEsimWorks />

      {/* FAQ Section */}
      <FaqSection faqs={faqs} country={country?.name || rawId} />
    </>
  );
};

export default Page;

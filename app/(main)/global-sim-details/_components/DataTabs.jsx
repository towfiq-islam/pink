"use client";
import React, { useState, useMemo } from "react";
import { FiWifi, FiGlobe } from "react-icons/fi";

// ─── Helpers ────────────────────────────────────────────────────────────────
function currency(n) {
  return `$ ${Number(n).toFixed(2)}`;
}

// ─── Total + Submit ──────────────────────────────────────────────────────────
function TotalAndSubmit({ total, label, onSubmit, disabled }) {
  return (
    <div className="pt-5 border-t border-gray-100 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">Total Amount</span>
        <span className="font-bold text-lg text-primary-pink">{currency(total)}</span>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onSubmit}
        className="w-full primary_btn !rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {label}
      </button>
    </div>
  );
}

// ─── Live Plans Tab (from Transatel) ─────────────────────────────────────────
function StandardTab({ plans = [], country = "", onSubmit }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Group plans by duration
  const grouped = useMemo(() => {
    const map = new Map();
    plans.forEach((p) => {
      const key = p.duration || `${p.durationDays} days`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    });
    return Array.from(map.entries()).map(([duration, items]) => ({ duration, items }));
  }, [plans]);

  if (!plans.length) {
    return (
      <div className="py-8 text-center text-gray-400 text-sm font-medium">
        <FiGlobe size={28} className="mx-auto mb-2 text-gray-300" />
        No local plans available for {country}. Check regional or global plans below.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="font-semibold text-lg text-gray-900">Choose your plan</p>

      {/* Plan Groups */}
      <div className="space-y-6">
        {grouped.map(({ duration, items }) => (
          <div key={duration}>
            <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-pink inline-block" />
              {duration}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((plan) => {
                const id = plan.productId;
                const isSelected = selectedPlan?.productId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-primary-pink bg-pink-50 text-primary-pink"
                        : "border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FiWifi size={15} className={isSelected ? "text-primary-pink" : "text-gray-400"} />
                      <span className="font-semibold">{plan.dataText}</span>
                    </span>
                    <span className="font-bold">
                      ${plan.price.toFixed(2)}{" "}
                      <span className="font-normal text-xs text-gray-400">{plan.currency}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <TotalAndSubmit
        total={selectedPlan?.price ?? 0}
        label="Buy Now"
        disabled={!selectedPlan}
        onSubmit={() => onSubmit?.({ type: "standard", plan: selectedPlan, total: selectedPlan?.price ?? 0 })}
      />
    </div>
  );
}

// ─── Regional / Global Plans section ─────────────────────────────────────────
function AlternatePlans({ regionalPlans = [], globalPlans = [] }) {
  const [show, setShow] = useState(regionalPlans.length > 0 ? "regional" : "global");

  const plans = show === "regional" ? regionalPlans : globalPlans;
  if (!regionalPlans.length && !globalPlans.length) return null;

  return (
    <div className="container mt-6 md:mt-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-2.5">
          Multi-Country Plans
        </h2>
        <p className="text-sm text-gray-500 font-medium mb-4">
          Traveling to multiple countries? These plans also cover your destination.
        </p>

        <div className="shadow border border-gray-100 rounded-2xl p-4 md:p-5">
          {/* Toggle */}
          <div className="flex gap-2 mb-5">
            {regionalPlans.length > 0 && (
              <button
                onClick={() => setShow("regional")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  show === "regional"
                    ? "bg-primary-pink text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Regional ({regionalPlans.length})
              </button>
            )}
            {globalPlans.length > 0 && (
              <button
                onClick={() => setShow("global")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  show === "global"
                    ? "bg-primary-pink text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Global ({globalPlans.length})
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {plans.map((plan) => (
              <div
                key={plan.productId}
                className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5 hover:border-primary-pink hover:bg-pink-50/40 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{plan.flag}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {plan.name || plan.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {plan.dataText} · {plan.duration}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-700">
                  ${plan.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main DataTabs Component ─────────────────────────────────────────────────
const DataTabs = ({
  localPlans = [],
  regionalPlans = [],
  globalPlans = [],
  country = "",
  onSubmit,
}) => {
  return (
    <>
      <div className="container mt-6 md:mt-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-2.5">Data Plans</h2>

          <div className="shadow border border-gray-100 rounded-2xl p-4 md:p-5">
            <StandardTab
              plans={localPlans}
              country={country}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>

      {/* Multi-Country Alternate Plans */}
      <AlternatePlans regionalPlans={regionalPlans} globalPlans={globalPlans} />
    </>
  );
};

export default DataTabs;

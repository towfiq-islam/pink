"use client";
import React, { useState, useMemo } from "react";
import { FiWifi, FiGlobe, FiZap, FiCheck, FiSliders, FiPlus, FiMinus, FiCalendar } from "react-icons/fi";

// ─── Helpers ────────────────────────────────────────────────────────────────
function currency(n) {
  return `$ ${Number(n).toFixed(2)}`;
}

// ─── Total + Submit Bar ─────────────────────────────────────────────────────
function TotalAndSubmit({ total, selectedPlan, label = "Buy Now", onSubmit, disabled }) {
  return (
    <div className="pt-5 border-t border-gray-100 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-gray-900 block text-sm">Total Amount</span>
          {selectedPlan && (
            <span className="text-xs text-gray-500 truncate block max-w-xs">
              {selectedPlan.dataText} · {selectedPlan.duration}
            </span>
          )}
        </div>
        <div className="text-right">
          <span className="font-bold text-xl text-primary-pink">
            {currency(total)}
          </span>
          <span className="text-xs text-gray-400 block uppercase">
            {selectedPlan?.currency || "USD"}
          </span>
        </div>
      </div>
      <button
        type="button"
        disabled={disabled || !selectedPlan}
        onClick={() => onSubmit?.(selectedPlan)}
        className="w-full primary_btn !rounded-xl !py-3.5 font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm transition-all"
      >
        {label}
      </button>
    </div>
  );
}

// ─── Standard Local Plans Tab (from Transatel) ──────────────────────────────
function StandardTab({
  plans = [],
  country = "",
  selectedPlan,
  onSelectPlan,
  onSubmit,
}) {
  // Group plans by duration
  const grouped = useMemo(() => {
    const map = new Map();
    plans.forEach((p) => {
      const key = p.duration || `${p.durationDays} days`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    });
    return Array.from(map.entries()).map(([duration, items]) => ({
      duration,
      items,
    }));
  }, [plans]);

  if (!plans.length) {
    return (
      <div className="py-8 text-center text-gray-400 text-sm font-medium">
        <FiGlobe size={28} className="mx-auto mb-2 text-gray-300" />
        No dedicated local fixed plans available for {country}. Check Unlimited or Multi-Country plans.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="font-semibold text-base text-gray-900">
        Choose your data package for {country}
      </p>

      {/* Plan Groups */}
      <div className="space-y-5">
        {grouped.map(({ duration, items }) => (
          <div key={duration}>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-pink inline-block" />
              {duration} Validity
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((plan) => {
                const id = plan.productId;
                const isSelected = selectedPlan?.productId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-primary-pink bg-pink-50/70 text-primary-pink shadow-xs ring-1 ring-primary-pink"
                        : "border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FiWifi
                        size={16}
                        className={
                          isSelected ? "text-primary-pink" : "text-gray-400"
                        }
                      />
                      <span className="font-bold text-gray-900">
                        {plan.dataText}
                      </span>
                    </span>
                    <span className="font-bold text-gray-800">
                      ${plan.price.toFixed(2)}{" "}
                      <span className="font-normal text-xs text-gray-400">
                        {plan.currency}
                      </span>
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
        selectedPlan={selectedPlan}
        label="Buy Now"
        onSubmit={onSubmit}
      />
    </div>
  );
}

// ─── Unlimited Plans Tab ────────────────────────────────────────────────────
function UnlimitedTab({
  unlimitedPlans = [],
  country = "",
  selectedPlan,
  onSelectPlan,
  onSubmit,
}) {
  // If Transatel has actual unlimited plans for this destination
  const hasOfficialUnlimited = unlimitedPlans.length > 0;

  // State for customizable trip calculator if needed
  const [customDays, setCustomDays] = useState(7);
  const [customPeople, setCustomPeople] = useState(1);
  const dailyRate = 1.99;
  const customTotal = customDays * customPeople * dailyRate;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-base text-gray-900 flex items-center gap-2">
            <FiZap className="text-primary-pink" /> Unlimited High-Speed Data
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Never worry about running out of data while traveling in {country}.
          </p>
        </div>
      </div>

      {hasOfficialUnlimited ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {unlimitedPlans.map((plan) => {
            const isSelected = selectedPlan?.productId === plan.productId;
            return (
              <button
                key={plan.productId}
                type="button"
                onClick={() => onSelectPlan(plan)}
                className={`flex items-center justify-between rounded-xl border px-4 py-4 text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary-pink bg-pink-50/70 text-primary-pink shadow-xs ring-1 ring-primary-pink"
                    : "border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                    <FiZap size={14} className="text-primary-pink" />
                    <span>{plan.dataText}</span>
                  </div>
                  <span className="text-xs text-gray-500 block mt-0.5">
                    {plan.duration} · High-Speed FUP
                  </span>
                </div>
                <span className="font-bold text-gray-800">
                  ${plan.price.toFixed(2)}{" "}
                  <span className="font-normal text-xs text-gray-400">
                    {plan.currency}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Dynamic Trip Duration Configurator if no static catalog unlimited */
        <div className="space-y-5 rounded-xl border border-gray-100 p-4 bg-gray-50/50">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                Trip Duration (Days)
              </label>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5">
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={customDays}
                  onChange={(e) =>
                    setCustomDays(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-20 outline-none text-gray-900 font-bold"
                />
                <FiCalendar className="text-gray-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                Number of Travelers
              </label>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => setCustomPeople((p) => Math.max(1, p - 1))}
                  className="text-gray-400 hover:text-gray-700 cursor-pointer p-1"
                >
                  <FiMinus size={16} />
                </button>
                <span className="font-bold text-gray-900">
                  {customPeople} eSIM{customPeople > 1 ? "s" : ""}
                </span>
                <button
                  type="button"
                  onClick={() => setCustomPeople((p) => p + 1)}
                  className="text-gray-400 hover:text-gray-700 cursor-pointer p-1"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const customPlan = {
                productId: `CUSTOM_UNLIMITED_${customDays}D_${customPeople}P`,
                title: `${country} Unlimited Pass (${customDays} Days, ${customPeople} eSIM)`,
                dataText: "Unlimited Data",
                duration: `${customDays} days`,
                durationDays: customDays,
                price: Number(customTotal.toFixed(2)),
                currency: "USD",
                coverageType: "local",
                isUnlimited: true,
              };
              onSelectPlan(customPlan);
            }}
            className="w-full py-2.5 rounded-xl border border-primary-pink text-primary-pink hover:bg-pink-50 text-xs font-bold transition-colors cursor-pointer"
          >
            Apply {customDays} Days Unlimited Pass (${customTotal.toFixed(2)})
          </button>
        </div>
      )}

      <TotalAndSubmit
        total={selectedPlan?.price ?? 0}
        selectedPlan={selectedPlan}
        label="Buy Now"
        onSubmit={onSubmit}
      />
    </div>
  );
}

// ─── Multi-Country Tab (Regional & Global) ──────────────────────────────────
function MultiCountryTab({
  regionalPlans = [],
  globalPlans = [],
  country = "",
  selectedPlan,
  onSelectPlan,
  onSubmit,
}) {
  const [subType, setSubType] = useState(
    regionalPlans.length > 0 ? "regional" : "global"
  );
  const plans = subType === "regional" ? regionalPlans : globalPlans;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-base text-gray-900">
            Multi-Destination Coverage
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Traveling across borders? These packages cover {country} and neighboring countries.
          </p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2">
        {regionalPlans.length > 0 && (
          <button
            type="button"
            onClick={() => setSubType("regional")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subType === "regional"
                ? "bg-primary-pink text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Regional Plans ({regionalPlans.length})
          </button>
        )}
        {globalPlans.length > 0 && (
          <button
            type="button"
            onClick={() => setSubType("global")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subType === "global"
                ? "bg-primary-pink text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Global Plans ({globalPlans.length})
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
        {plans.map((plan) => {
          const isSelected = selectedPlan?.productId === plan.productId;
          return (
            <button
              key={plan.productId}
              type="button"
              onClick={() => onSelectPlan(plan)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-primary-pink bg-pink-50/70 text-primary-pink shadow-xs ring-1 ring-primary-pink"
                  : "border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="text-2xl shrink-0">{plan.flag || "🌐"}</span>
                <div className="truncate">
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {plan.name || plan.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {plan.dataText} · {plan.duration}
                  </p>
                </div>
              </div>
              <span className="font-bold text-sm text-gray-800 shrink-0">
                ${plan.price.toFixed(2)}{" "}
                <span className="font-normal text-[10px] text-gray-400">
                  {plan.currency}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <TotalAndSubmit
        total={selectedPlan?.price ?? 0}
        selectedPlan={selectedPlan}
        label="Buy Now"
        onSubmit={onSubmit}
      />
    </div>
  );
}

// ─── Main DataTabs Component ────────────────────────────────────────────────
const DataTabs = ({
  localPlans = [],
  unlimitedPlans = [],
  regionalPlans = [],
  globalPlans = [],
  country = "",
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState("standard");
  const [selectedPlan, setSelectedPlan] = useState(
    localPlans[0] || unlimitedPlans[0] || regionalPlans[0] || null
  );

  const TABS = [
    {
      id: "standard",
      label: `Standard Plans (${localPlans.length})`,
      show: true,
    },
    {
      id: "unlimited",
      label: `Unlimited Data ${
        unlimitedPlans.length > 0 ? `(${unlimitedPlans.length})` : ""
      }`,
      show: true,
    },
    {
      id: "multi-country",
      label: `Multi-Country (${regionalPlans.length + globalPlans.length})`,
      show: regionalPlans.length > 0 || globalPlans.length > 0,
    },
  ].filter((t) => t.show);

  return (
    <div className="container mt-6 md:mt-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-2.5">Data Plans</h2>

        <div className="shadow border border-gray-100 rounded-2xl p-4 md:p-6 bg-white">
          {/* Main Tab Headers */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative text-xs sm:text-sm md:text-base font-semibold pb-3 px-3 sm:px-6 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-primary-pink border-b-2 border-primary-pink"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab View */}
          <div>
            {activeTab === "standard" && (
              <StandardTab
                plans={localPlans}
                country={country}
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
                onSubmit={onSubmit}
              />
            )}

            {activeTab === "unlimited" && (
              <UnlimitedTab
                unlimitedPlans={unlimitedPlans}
                country={country}
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
                onSubmit={onSubmit}
              />
            )}

            {activeTab === "multi-country" && (
              <MultiCountryTab
                regionalPlans={regionalPlans}
                globalPlans={globalPlans}
                country={country}
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
                onSubmit={onSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTabs;

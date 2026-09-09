"use client";
import Sim from "@/components/common/Sim";
import { SimSkeleton } from "@/components/common/Skeleton";
import React, { useState, useEffect, useMemo } from "react";
import { FiSearch, FiMapPin, FiRefreshCw, FiX } from "react-icons/fi";

const TABS = [
  { id: "local", label: "Local" },
  { id: "regional", label: "Regional" },
  { id: "global", label: "Global" },
];

const ITEMS_PER_PAGE = 24;
const SKELETON_COUNT_ON_LOAD_MORE = 8;

export function PopularSimChoices({ initialData = null }) {
  const [activeTab, setActiveTab] = useState("local");
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Fetch client-side if initialData is not available
  useEffect(() => {
    if (!catalog) {
      setLoading(true);
      fetch("/api/global-sims")
        .then(res => res.json())
        .then(res => {
          if (res.success && res.data) {
            setCatalog({
              categories: res.data,
              totalProducts: res.totalProducts,
            });
          }
        })
        .catch(err => console.error("Error loading sims:", err))
        .finally(() => setLoading(false));
    }
  }, [catalog]);

  // Reset pagination on tab change or search
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    setLoadingMore(false);
  }, [activeTab, query]);

  // Reset search filter
  const handleResetFilter = () => {
    setQuery("");
  };

  // Current list based on active tab
  const activeItems = useMemo(() => {
    const list = catalog?.categories?.[activeTab] || [];
    if (!query.trim()) return list;
    const q = query.trim().toLowerCase();
    return list.filter(item => {
      const name = (item.name || item.title || "").toLowerCase();
      const iso = (item.iso3 || "").toLowerCase();
      return name.includes(q) || iso.includes(q);
    });
  }, [catalog, activeTab, query]);

  const displayedItems = useMemo(() => {
    return activeItems.slice(0, visibleCount);
  }, [activeItems, visibleCount]);

  const hasMore = visibleCount < activeItems.length;

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    // Smooth transition with skeleton preview
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      setLoadingMore(false);
    }, 350);
  };

  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 xl:pt-16 text-center">
      <p className="font-semibold mb-2 text-primary-pink">Global Sims</p>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
        Popular Global Sim Choices
      </h2>
      <p className="text-gray-400 text-sm md:text-base font-medium mb-5 lg:mb-8">
        Choose the best ones and get connected throughout your trip
      </p>

      {/* Search Bar */}
      <div className="flex justify-center mb-3 md:mb-4">
        <div className="flex items-center gap-2 border border-gray-200 rounded-full pl-4 pr-1.5 py-2 w-full max-w-sm focus-within:border-primary-pink transition-colors">
          <FiMapPin className="text-gray-400 shrink-0" size={16} />
          <span className="text-gray-200">|</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search your Destination"
            className="flex-1 text-sm outline-none placeholder:text-gray-400 font-medium"
          />

          {/* Inline Reset / Clear (X) Button */}
          {query && (
            <button
              type="button"
              onClick={handleResetFilter}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={`inline-flex justify-center gap-2 md:gap-5 xl:gap-7 rounded-2xl bg-gray-50 p-2 md:p-3 ${query.trim() ? "mb-6 md:mb-8" : "mt-2 mb-6 md:mb-8"}`}>
        {TABS.map(tab => {
          const count = catalog?.categories?.[tab.id]?.length || 0;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 md:px-7 xl:px-10 py-2 xl:py-3 cursor-pointer rounded-xl text-sm md:text-base font-medium duration-300 transition-all ${activeTab === tab.id
                ? "text-white bg-primary-pink shadow-xs"
                : "text-gray-500 hover:bg-gray-200"
                }`}
            >
              <span>{tab.label}</span>
              {count > 0 && (
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 text-left">
          <SimSkeleton count={8} />
        </div>
      ) : activeItems.length === 0 ? (
        <div className="py-10 text-center text-gray-500 max-w-md mx-auto">
          <div className="size-12 rounded-full bg-pink-50 text-primary-pink flex items-center justify-center mx-auto mb-3">
            <FiSearch size={22} />
          </div>
          <p className="text-lg font-semibold mb-2 text-gray-800">No destinations found</p>
          <p className="text-sm text-gray-400 font-medium mb-5">
            We couldn&apos;t find any SIM cards matching &ldquo;{query}&rdquo; in the {activeTab} section.
          </p>
        </div>
      ) : (
        <>
          <div
            key={activeTab}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 text-left"
          >
            {displayedItems.map((c, i) => (
              <Sim key={c.id || c.productId || i} sim={c} index={i} />
            ))}

            {/* Skeleton loader when loading more sims */}
            {loadingMore && (
              <SimSkeleton
                count={Math.min(
                  SKELETON_COUNT_ON_LOAD_MORE,
                  activeItems.length - visibleCount
                )}
              />
            )}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-8 md:mt-10 flex justify-center">
              <button
                type="button"
                disabled={loadingMore}
                onClick={handleLoadMore}
                className="px-6 py-2.5 rounded-xl border border-primary-pink text-primary-pink hover:bg-pink-50 text-sm font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <FiRefreshCw className="animate-spin" size={14} />
                    <span>Loading more SIMs...</span>
                  </>
                ) : (
                  <span>
                    Load More ({activeItems.length - visibleCount} remaining)
                  </span>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

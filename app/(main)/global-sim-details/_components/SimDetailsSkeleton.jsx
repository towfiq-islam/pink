"use client";
import React from "react";
import { FiWifi, FiSmartphone, FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function SimDetailsSkeleton({ countryName = "Destination" }) {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
      {/* ─── Hero / Network Card Skeleton ──────────────────────────────────── */}
      <div className="container pt-5 md:pt-7">
        <div className="max-w-5xl mx-auto">
          {/* Top Live Connectivity Badge */}
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50/80 border border-pink-100 text-xs font-semibold text-primary-pink">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-pink"></span>
            </span>
            <span>Live Carrier Sync · Connecting to {countryName} networks...</span>
          </div>

          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3.5 w-16 rounded-md shimmer-box" />
            <span className="text-gray-300">/</span>
            <div className="h-3.5 w-12 rounded-md shimmer-box" />
            <span className="text-gray-300">/</span>
            <div className="h-3.5 w-24 rounded-md shimmer-box" />
          </div>

          {/* Title Skeleton */}
          <div className="h-8 md:h-9 w-64 md:w-80 rounded-xl shimmer-box mb-4 md:mb-6" />

          {/* Main Card Skeleton */}
          <div className="shadow border border-gray-100 rounded-2xl p-4 md:p-7 space-y-5 bg-white">
            {/* Country + Operators Row */}
            <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
              {/* Flag Icon */}
              <div className="w-16 h-14 rounded-xl shimmer-box shrink-0" />

              <div className="flex-1 space-y-2.5">
                {/* Country Name */}
                <div className="h-5 w-44 rounded-lg shimmer-box" />

                {/* Operator Badges Skeleton */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <div className="h-7 w-28 rounded-full bg-blue-50/70 border border-blue-100 shimmer-box" />
                  <div className="h-7 w-32 rounded-full bg-blue-50/70 border border-blue-100 shimmer-box" />
                  <div className="h-7 w-24 rounded-full bg-blue-50/70 border border-blue-100 shimmer-box" />
                </div>

                {/* Speed Badge Skeleton */}
                <div className="h-6 w-24 rounded-md shimmer-box mt-2" />
              </div>
            </div>

            {/* Check Compatibility Button Skeleton */}
            <div className="w-48 h-11 rounded-xl shimmer-box" />

            {/* Trust Badges */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2.5">
                <div className="size-4 rounded-full bg-emerald-100 shrink-0" />
                <div className="h-3.5 w-72 rounded-md shimmer-box" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-4 rounded-full bg-emerald-100 shrink-0" />
                <div className="h-3.5 w-80 rounded-md shimmer-box" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Data Tabs Skeleton ────────────────────────────────────────────── */}
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section Heading */}
          <div className="h-6 w-32 rounded-lg shimmer-box mb-3" />

          <div className="shadow border border-gray-100 rounded-2xl p-4 md:p-6 bg-white space-y-6">
            {/* Tab Headers Skeleton */}
            <div className="flex border-b border-gray-100 pb-3 gap-6">
              <div className="h-4 w-32 rounded-md shimmer-box" />
              <div className="h-4 w-28 rounded-md shimmer-box" />
              <div className="h-4 w-36 rounded-md shimmer-box" />
            </div>

            {/* Subtitle */}
            <div className="h-4 w-52 rounded-md shimmer-box" />

            {/* Group Label */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-pink/40 inline-block" />
              <div className="h-3 w-28 rounded-md shimmer-box" />
            </div>

            {/* Plan Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="rounded-xl border border-gray-100 p-4 flex items-center justify-between bg-gray-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-5 rounded-md shimmer-box" />
                    <div className="h-4 w-16 rounded-md shimmer-box" />
                  </div>
                  <div className="h-5 w-20 rounded-md shimmer-box" />
                </div>
              ))}
            </div>

            {/* Total + Submit Bar Skeleton */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-3 w-20 rounded-md shimmer-box" />
                <div className="h-3 w-32 rounded-md shimmer-box" />
              </div>
              <div className="h-6 w-24 rounded-md shimmer-box" />
            </div>
            <div className="w-full h-12 rounded-xl shimmer-box" />
          </div>
        </div>
      </div>

      {/* ─── Technical Specifications Skeleton ─────────────────────────────── */}
      <div className="container">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="h-6 w-48 rounded-lg shimmer-box" />
          <div className="h-3.5 w-64 rounded-md shimmer-box" />

          <div className="shadow border border-gray-100 rounded-2xl overflow-hidden bg-white divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-start gap-4 p-4 md:px-6">
                <div className="w-8 h-8 rounded-lg shimmer-box shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-28 rounded shimmer-box" />
                  <div className="h-4 w-3/4 rounded shimmer-box" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

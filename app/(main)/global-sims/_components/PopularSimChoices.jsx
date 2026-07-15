"use client";
import Sim from "@/components/common/Sim";
import React, { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

const TABS = [
  { id: "local", label: "Local" },
  { id: "regional", label: "Regional" },
  { id: "global", label: "Global" },
];

const COUNTRIES = [
  { id: 1, name: "United kingdom", flag: "\u{1F1EC}\u{1F1E7}", price: 9.0 },
  { id: 2, name: "Argentina", flag: "\u{1F1E6}\u{1F1F7}", price: 6.0 },
  { id: 3, name: "Brazil", flag: "\u{1F1E7}\u{1F1F7}", price: 5.0 },
  { id: 4, name: "Japan", flag: "\u{1F1EF}\u{1F1F5}", price: 7.0 },
  { id: 5, name: "Yamen", flag: "\u{1F1FE}\u{1F1EA}", price: 5.0 },
  { id: 6, name: "India", flag: "\u{1F1EE}\u{1F1F3}", price: 6.0 },
  { id: 7, name: "England", flag: "\u{1F1EC}\u{1F1E7}", price: 7.0 },
  { id: 8, name: "Belgium", flag: "\u{1F1E7}\u{1F1EA}", price: 8.0 },
  { id: 9, name: "Bangladesh", flag: "\u{1F1E7}\u{1F1E9}", price: 2.0 },
  { id: 10, name: "Japan", flag: "\u{1F1EF}\u{1F1F5}", price: 7.0 },
  { id: 11, name: "Brazil", flag: "\u{1F1E7}\u{1F1F7}", price: 5.0 },
  { id: 12, name: "United kingdom", flag: "\u{1F1EC}\u{1F1E7}", price: 9.0 },
  { id: 13, name: "India", flag: "\u{1F1EE}\u{1F1F3}", price: 6.0 },
  { id: 14, name: "Yamen", flag: "\u{1F1FE}\u{1F1EA}", price: 5.0 },
  { id: 15, name: "Belgium", flag: "\u{1F1E7}\u{1F1EA}", price: 8.0 },
  { id: 16, name: "England", flag: "\u{1F1EC}\u{1F1E7}", price: 7.0 },
];

export function PopularSimChoices() {
  const [activeTab, setActiveTab] = useState("local");
  const [query, setQuery] = useState("");

  return (
    <section className="container pt-10 lg:pt-12 xl:pt-16 text-center">
      <p className="font-semibold mb-2 text-primary-pink">Global Sims</p>
      <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
        Popular Global Sim Choices
      </h2>
      <p className="text-gray-400 font-medium mb-5 lg:mb-8">
        Choose the best ones and get connected throughout your trip
      </p>

      <div className="flex justify-center mb-7 lg:mb-12">
        <div className="flex items-center gap-2 border border-gray-200 rounded-full pl-4 pr-1.5 py-1.5 w-full max-w-sm">
          <FiMapPin className="text-gray-400 shrink-0" size={16} />
          <span className="text-gray-200">|</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search your Destination"
            className="flex-1 text-sm outline-none placeholder:text-gray-400 font-medium"
          />
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer bg-primary-pink">
            <FiSearch size={14} />
          </button>
        </div>
      </div>

      <div className="inline-flex justify-center gap-5 xl:gap-7 rounded-2xl bg-gray-50 p-3 mb-10">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-7 xl:px-10 py-2 xl:py-3 cursor-pointer rounded-xl font-medium duration-300 transition-colors ${activeTab === tab.id ? "text-white bg-primary-pink" : "text-gray-500  hover:bg-gray-200"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        key={activeTab}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 text-left"
      >
        {COUNTRIES.map((c, i) => (
          <Sim key={i} sim={c} index={i} />
        ))}
      </div>
    </section>
  );
}

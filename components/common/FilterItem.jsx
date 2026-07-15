"use client";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FilterItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0 border-gray-200 pb-4 2xl:pb-5 mb-4 last:pb-0 last:mb-0">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full"
      >
        <span className="font-semibold text-sm md:text-base 2xl:text-lg text-gray-700">
          {title}
        </span>
        <FiChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open
            ? "max-h-96 overflow-y-auto opacity-100 mt-3"
            : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  );
};

export default FilterItem;

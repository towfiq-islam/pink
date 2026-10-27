"use client";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export function FaqSection({ faqs = [], country = "" }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs.length) return null;

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="container mt-6 md:mt-8 mb-10 md:mb-14">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Frequently Asked Questions
        </h2>
        {country && (
          <p className="text-sm text-gray-500 font-medium mb-4">
            Common questions about using an eSIM in {country}.
          </p>
        )}

        <div className="shadow border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="group">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-4 md:px-6 py-4 md:py-5 text-left hover:bg-gray-50/70 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-semibold leading-snug transition-colors ${
                      isOpen ? "text-primary-pink" : "text-gray-800"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <FiChevronDown
                    size={18}
                    className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary-pink" : ""
                    }`}
                  />
                </button>

                {/* Animated answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 md:px-6 pb-4 md:pb-5">
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

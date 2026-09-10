import React from "react";
import {
  FiWifi,
  FiZap,
  FiSettings,
  FiClock,
  FiShare2,
  FiUser,
  FiCalendar,
  FiGlobe,
} from "react-icons/fi";

const SPEC_ICONS = {
  "Network Operators": FiWifi,
  "Network Speed": FiZap,
  "APN Settings": FiSettings,
  "Activation Policy": FiClock,
  "Tethering / Hotspot": FiShare2,
  "Registration / KYC": FiUser,
  "Validity Start": FiCalendar,
  Roaming: FiGlobe,
};

export function TechnicalSpecs({ specs = [], country = "" }) {
  if (!specs.length) return null;

  return (
    <div className="container mt-6 md:mt-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-2.5">
          Technical Specifications
        </h2>
        {country && (
          <p className="text-sm text-gray-500 font-medium mb-4">
            Everything you need to know about your {country} eSIM.
          </p>
        )}

        <div className="shadow border border-gray-100 rounded-2xl overflow-hidden">
          {specs.map((spec, i) => {
            const Icon = SPEC_ICONS[spec.label] || FiSettings;
            const isLast = i === specs.length - 1;
            return (
              <div
                key={spec.label}
                className={`flex items-start gap-4 px-4 md:px-6 py-4 md:py-5 ${
                  !isLast ? "border-b border-gray-100" : ""
                } hover:bg-gray-50/70 transition-colors`}
              >
                <span className="w-8 h-8 rounded-lg bg-pink-50 text-primary-pink flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={15} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    {spec.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {spec.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

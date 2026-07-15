import React from "react";
const PRICE_OPTIONS = [{ label: "$40" }, { label: "$60" }, { label: "$45" }];

const Plans = () => {
  return (
    <div>
      <h2 className="text-center text-2xl sm:text-4xl font-semibold text-gray-900 mb-5">
        Get more with our new prepaid phone plans.
      </h2>

      <p className="text-center text-gray-500 text-lg font-medium max-w-5xl mx-auto mb-8">
        Enjoy greater flexibility, faster speeds, and affordable pricing with
        prepaid plans designed to keep you connected without long-term
        commitments.
      </p>

      <div className="flex justify-center gap-2">
        {PRICE_OPTIONS.map((opt, i) => {
          return (
            <button
              key={opt.label}
              type="button"
              className={`h-10 w-16 cursor-pointer rounded-xl text-sm font-semibold border transition-colors ${
                i === 1
                  ? "bg-primary-pink border-primary-pink text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;

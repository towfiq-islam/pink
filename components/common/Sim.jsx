import Link from "next/link";
import React from "react";

const Sim = ({ sim, index = 0 }) => {
  const displayPrice =
    typeof sim?.minPrice === "number"
      ? sim.minPrice
      : typeof sim?.price === "number"
      ? sim.price
      : 0;

  const targetId = sim?.iso3 || sim?.id || "1";
  // Cap animation delay so newly loaded batches appear instantly (max ~210ms)
  const animDelay = (index % 8) * 30;

  return (
    <Link
      href={`/global-sim-details/${targetId}`}
      style={{ animationDelay: `${animDelay}ms` }}
      className="sim-grid rounded-xl border border-gray-100 shadow p-4 md:p-5 flex flex-col items-start text-left gap-3 hover:border-primary-pink duration-500 hover:bg-pink-50/50 transition-all cursor-pointer hover:scale-[1.03]"
    >
      <span className="text-2xl size-12 rounded-full bg-gray-100 text-gray-500 grid place-items-center leading-none">
        {sim?.flag || "🌐"}
      </span>
      <span className="w-full">
        <span className="font-semibold text-gray-700 md:mt-1 block truncate">
          {sim?.name || sim?.title || "Global eSIM"}
        </span>

        <span className="text-gray-400 flex gap-2 md:gap-4 items-center mt-2 flex-wrap">
          <span className="font-semibold text-sm">From</span>
          <span className="font-semibold text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">
            ${displayPrice.toFixed(2)}/days
          </span>
          {sim?.planCount > 1 && (
            <span className="text-[11px] text-gray-400 font-medium">
              {sim.planCount} plans
            </span>
          )}
        </span>
      </span>
    </Link>
  );
};

export default Sim;

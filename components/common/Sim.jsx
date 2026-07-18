import Link from "next/link";
import React from "react";

const Sim = ({ sim, index }) => {
  return (
    <Link
      href={`/global-sim-details/1`}
      style={{ animationDelay: `${index * 60}ms` }}
      className="sim-grid rounded-xl border border-gray-100 shadow p-4 md:p-5 flex flex-col items-start text-left gap-3 hover:border-primary-pink duration-500 hover:bg-pink-50/50 transition-all cursor-pointer hover:scale-[1.03]"
    >
      <span className="text-2xl size-12 rounded-full bg-gray-100 text-gray-500 grid place-items-center leading-none">
        {sim.flag}
      </span>
      <span>
        <span className="font-semibold text-gray-700 md:mt-1">{sim.name}</span>

        <span className="text-gray-400 flex gap-3 md:gap-5 items-center mt-2">
          <span className="font-semibold text-sm">From</span>
          <span className="font-semibold text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">
            ${sim.price.toFixed(2)}/days
          </span>
        </span>
      </span>
    </Link>
  );
};

export default Sim;

import React from "react";

const SpecRow = ({ label, values, columnCount }) => (
  <div
    className="grid border-b border-gray-100 last:border-b-0"
    style={{ gridTemplateColumns: `160px repeat(${columnCount}, 1fr)` }}
  >
    <div className="flex items-center px-4 py-4 font-semibold text-sm md:text-base text-[#212B36]">
      {label}
    </div>
    {values.map((val, idx) => (
      <div
        key={idx}
        className="flex items-center justify-center px-4 py-4 text-xs md:text-sm text-gray-500 text-center border-l border-gray-100"
      >
        {val ?? "—"}
      </div>
    ))}
  </div>
);

export default SpecRow;

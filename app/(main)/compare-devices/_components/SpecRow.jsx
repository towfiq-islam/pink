import React from "react";

const SpecRow = ({ label, values, gridTemplate }) => (
  <div
    className="grid border-b border-gray-100 last:border-b-0"
    style={{ gridTemplateColumns: gridTemplate }}
  >
    <div className="sticky left-0 z-10 flex items-center bg-white px-3 py-4 text-xs font-semibold text-[#212B36] md:px-4 md:text-base md:w-40">
      {label}
    </div>
    {values.map((val, idx) => (
      <div
        key={idx}
        className="flex items-center justify-center border-l border-gray-100 px-3 py-4 text-center text-xs text-gray-500 md:px-4 md:text-sm"
      >
        {val ?? "—"}
      </div>
    ))}
  </div>
);

export default SpecRow;

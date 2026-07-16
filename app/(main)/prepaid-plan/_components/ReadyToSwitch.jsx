import React from "react";
import { FiPhone, FiMapPin } from "react-icons/fi";

const ReadyToSwitch = () => {
  return (
    <div className="bg-gray-50 -mt-3 rounded-2xl p-5 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-primary-pink text-lg font-semibold mb-2">
          Ready to switch?
        </p>
        <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
          <FiPhone size={14} className="shrink-0" />
          Call 800-375-1126 or visit a T-Mobile store near you.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-sm font-semibold px-5 2xl:px-7 py-2.5 2xl:py-3.5 rounded-2xl hover:border-gray-400 transition cursor-pointer">
          <FiMapPin size={14} />
          Find a store
        </button>

        <button className="primary_btn">Shop Tablets</button>
      </div>
    </div>
  );
};

export default ReadyToSwitch;

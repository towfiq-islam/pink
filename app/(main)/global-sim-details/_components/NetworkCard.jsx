import Modal from "@/components/common/Modal";
import { useState } from "react";
import { FiSmartphone, FiChevronRight } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import CompatibilityModal from "./CompatibilityModal";

export function NetworkCard({ country, flagEmoji, operators = [], topSpeed = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="container pt-5 md:pt-7">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 font-medium mb-2 md:mb-3 flex items-center gap-1 flex-wrap">
          <span>Global Sim</span>
          <span>/</span>
          <span>Local</span>
          <span>/</span>
          <span className="text-primary-pink font-medium">{country}</span>
        </nav>

        {/* Hero Title */}
        <h1 className="text-xl md:text-2xl xl:text-3xl font-semibold mb-3 md:mb-6">
          {country} eSIM
        </h1>

        {/* Main Card */}
        <div className="shadow border border-gray-100 rounded-2xl p-4 md:p-7 space-y-5">
          {/* Country + Operators Row */}
          <div className="flex items-start gap-4 pb-5 border-b border-gray-200">
            <span className="text-3xl font-medium leading-none bg-gray-100 w-16 h-14 rounded-xl grid place-items-center flex-shrink-0">
              {flagEmoji}
            </span>
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-800 text-lg block mb-2">
                {country}
              </span>

              {/* Network Operator Badges — from Transatel */}
              {operators.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {operators.map((op) => (
                    <span
                      key={op.name}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
                      {op.name}
                      {op.networkTypes?.length > 0 && (
                        <span className="text-blue-500">
                          · {op.networkTypes.slice(0, 2).join("/")}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )}

              {/* Top Speed — derived from Transatel operator data */}
              {topSpeed && (
                <span className="inline-block mt-2 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                  {topSpeed}
                </span>
              )}
            </div>
          </div>

          {/* Check Compatibility Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-fit flex items-center justify-between rounded-xl shadow-xs border border-gray-200 cursor-pointer px-4 py-3.5 duration-300 text-sm font-semibold text-gray-700 hover:border-primary-pink hover:text-primary-pink transition-colors"
          >
            <span className="flex items-center gap-2 pe-3">
              <FiSmartphone size={18} />
              Check Compatibility
            </span>
            <FiChevronRight size={18} />
          </button>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-[15px] font-medium text-gray-700">
              <IoIosCheckmarkCircle
                size={20}
                className="text-[#48B02C] shrink-0 mt-0.5"
              />
              If you&apos;re running low, you can always top up
            </li>
            <li className="flex items-start gap-2 text-[15px] font-medium text-gray-700">
              <IoIosCheckmarkCircle
                size={20}
                className="text-[#48B02C] shrink-0 mt-0.5"
              />
              The package starts when you connect to a supported network
            </li>
          </ul>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <CompatibilityModal />
      </Modal>
    </div>
  );
}

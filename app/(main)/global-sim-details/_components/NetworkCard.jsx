import Modal from "@/components/common/Modal";
import { useState } from "react";
import { FiSmartphone, FiChevronRight } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import CompatibilityModal from "./CompatibilityModal";

export function NetworkCard({ country, flagEmoji }) {
  const [open, isOpen] = useState(false);

  return (
    <div className="container pt-5 md:pt-7">
      <div className="max-w-5xl mx-auto">
        <nav className="text-sm text-gray-400 font-medium mb-2 md:mb-3 flex items-center gap-1">
          <span>Global Sim</span>
          <span>/</span>
          <span>Local</span>
          <span>/</span>
          <span className="text-primary-pink font-medium">{country}</span>
        </nav>

        <h1 className="text-xl md:text-2xl xl:text-3xl font-semibold mb-3 md:mb-6">iPhone 17 Pro Max</h1>

        <div className="shadow border border-gray-100 rounded-2xl p-4 md:p-7 space-y-5">
          <div className="flex items-center gap-4 pb-5 border-b border-gray-200">
            <span className="text-xl font-medium leading-none bg-gray-200 w-14 h-10 rounded-lg grid place-items-center">
              {flagEmoji}
            </span>
            <span className="font-semibold text-gray-700">{country}</span>
          </div>

          <button
            type="button"
            onClick={() => isOpen(true)}
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

      <Modal open={open} onClose={() => isOpen(false)}>
        <CompatibilityModal />
      </Modal>
    </div>
  );
}

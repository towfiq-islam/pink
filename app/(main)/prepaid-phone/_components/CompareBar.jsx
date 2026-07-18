"use client";
import React from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

const MAX_COMPARE = 3;

const CompareBar = ({ selected, onRemove, onCompare }) => {
  const router = useRouter();

  if (selected.length === 0) return null;

  const slots = Array.from({ length: MAX_COMPARE }).map(
    (_, i) => selected[i] || null,
  );
  const canCompare = selected.length >= 2;

  const handleCompareClick = () => {
    if (!canCompare) return;
    onCompare?.();
    const ids = selected.map(p => p.id).join(",");
    router.push(`/compare-devices?ids=${ids}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-350 mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-600 shrink-0">
          Select at least Two Phones to compare
        </p>

        <div className="flex items-center gap-2">
          {slots.map((product, idx) => (
            <div
              key={idx}
              className="relative size-14 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center"
            >
              {product && (
                <>
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                  />
                  <button
                    onClick={() => onRemove(product)}
                    aria-label={`Remove ${product.name}`}
                    className="absolute -top-1 -right-1 size-4 rounded-full bg-gray-700 text-white flex items-center justify-center text-[10px] cursor-pointer z-50"
                  >
                    <IoClose />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleCompareClick}
          disabled={!canCompare}
          className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-300 ${
            canCompare
              ? "bg-primary-pink text-white cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Compare
        </button>
      </div>
    </div>
  );
};

export default CompareBar;

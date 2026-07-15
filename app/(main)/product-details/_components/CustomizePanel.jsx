"use client";
import { useState } from "react";
import { TbShoppingBag } from "react-icons/tb";
const colors = [
  { id: "silver", name: "Silver", swatch: "#d9d9d9" },
  { id: "cosmic-orange", name: "Cosmic Orange", swatch: "#1c1c1e" },
  { id: "deep-blue", name: "Deep Blue", swatch: "#e0742f" },
];

const storageOptions = [
  {
    id: "256gb",
    label: "256GB",
    listPrice: "$59.99",
    monthlyPrice: "$4.16",
    dueToday: "$0.00",
    fullPrice: "$1,199.99",
  },
  {
    id: "512gb",
    label: "512GB",
    listPrice: "$58.34",
    monthlyPrice: "$12.50",
    dueToday: "$0.00",
    fullPrice: "$1,399.99",
  },
  {
    id: "1tb",
    label: "1TB",
    listPrice: "$66.67",
    monthlyPrice: "$20.83",
    dueToday: "$0.00",
    fullPrice: "$1,599.99",
  },
  {
    id: "2tb",
    label: "2TB",
    listPrice: "$79.17",
    monthlyPrice: "$33.33",
    dueToday: "$99.99",
    fullPrice: "$1,999.99",
  },
];

export function CustomizePanel() {
  const [selectedColor, setSelectedColor] = useState("cosmic-orange");
  const [selectedStorage, setSelectedStorage] = useState("256gb");
  const [payFull, setPayFull] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Customize your device</h2>
      <hr className="border-gray-200 mb-5" />

      <p className="font-semibold mb-3">Color</p>
      <div className="grid grid-cols-3 gap-3 mb-7">
        {colors?.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedColor(c.id)}
            className={`rounded-xl border cursor-pointer shadow px-4 xl:px-5 py-7 flex flex-col items-center gap-3 ${
              selectedColor === c.id
                ? "border-2 border-gray-900"
                : "border-gray-100"
            }`}
          >
            <span
              className="size-10 rounded-full border border-black/10"
              style={{ backgroundColor: c.swatch }}
            />
            <span className="text-sm font-semibold text-gray-600">
              {c.name}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-lg font-semibold text-gray-700">
          Storage and payment
        </p>
        <span
          className="text-xs flex font-medium items-center gap-1"
          style={{ color: "#1d9a54" }}
        >
          <span
            className="inline-block size-4 rounded-full"
            style={{ backgroundColor: "#1d9a54" }}
          />
          With promotion
        </span>
      </div>

      <div className="flex gap-3 w-full rounded-full bg-gray-100 p-2 mb-5">
        <button
          onClick={() => setPayFull(false)}
          className={`flex-1 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer duration-300 ${!payFull ? "text-white bg-primary-pink" : "text-[#9ca3af]"}`}
        >
          Pay monthly
        </button>
        <button
          onClick={() => setPayFull(true)}
          className={`flex-1 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer duration-300 ${payFull ? "text-white bg-primary-pink" : "text-[#9ca3af]"}`}
        >
          Pay in full
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {storageOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => setSelectedStorage(opt.id)}
            className={`w-full shadow cursor-pointer text-left rounded-xl border px-4 py-3 flex items-center justify-between ${
              selectedStorage === opt.id
                ? "border-2 border-gray-900"
                : "border-gray-200"
            }`}
          >
            <span className="text-sm font-semibold pt-0.5">{opt.label}</span>
            <span className="text-right text-sm">
              <span className="block">
                <span className="line-through text-gray-400 mr-1">
                  {opt.listPrice}
                </span>
                <span className="font-semibold">{opt.monthlyPrice}/month</span>
              </span>
              <span className="block font-semibold text-xs">for 24 months</span>
              <span className="block text-xs text-gray-400">
                Due today: {opt.dueToday}
              </span>
              <span className="block text-xs text-gray-400">
                Full price: {opt.fullPrice} + tax
              </span>
            </span>
          </button>
        ))}
      </div>

      <p className="font-semibold mb-1">
        Pricing when you choose Experience Beyond plan
      </p>
      <p className="text-sm text-gray-500 mb-3">
        Plus up to $35 device connection charge
      </p>
      <p className="text-sm text-gray-500 mb-6">
        If you select to pay monthly and cancel wireless service, the remaining
        balance on the device becomes due. For well-qualified buyers, 0% APR.
        Qualifying service required.
      </p>

      <div className="flex items-center gap-3">
        <button className="flex-1 primary_btn">Shop Now</button>

        <button
          aria-label="Add to bag"
          className="flex size-12 shrink-0 items-center justify-center rounded-full text-gray-600 hover:border-pink-300 hover:text-white hover:bg-primary-pink text-2xl cursor-pointer bg-gray-200"
        >
          <TbShoppingBag />
        </button>
      </div>
    </div>
  );
}

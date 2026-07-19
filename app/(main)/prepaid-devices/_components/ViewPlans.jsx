"use client";
import { useState } from "react";
import Link from "next/link";
import { BroadbandFactsCard } from "../../voip/_components/BroadbandFactsCard";
const PLANS = [
  {
    id: "2gb",
    data: "2GB",
    price: "$10",
    name: "2GB Plan",
    description: "Unlimited Mobile Internet with up to 2GB of 5G / 4G LTE Data",
    dataLabel: "2GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000030",
  },
  {
    id: "5gb",
    data: "5GB",
    price: "$20",
    name: "5GB Plan",
    description: "Unlimited Mobile Internet with up to 5GB of 5G / 4G LTE Data",
    dataLabel: "5GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000033",
  },
  {
    id: "10gb",
    data: "10GB",
    price: "$30",
    name: "10GB Plan",
    description:
      "Unlimited Mobile Internet with up to 10GB of 5G / 4G LTE Data",
    dataLabel: "10GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000029",
  },
  {
    id: "30gb",
    data: "30GB",
    price: "$40",
    name: "30GB Plan",
    description:
      "Unlimited Mobile Internet with up to 30GB of 5G / 4G LTE Data",
    dataLabel: "30GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000031",
  },
  {
    id: "50gb",
    data: "50GB",
    price: "$50",
    name: "50GB Plan",
    description:
      "Unlimited Mobile Internet with up to 50GB of 5G / 4G LTE Data",
    dataLabel: "50GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000032",
  },
];

function PlanCard({ plan, isOpen, onToggle }) {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-gray-100 bg-[#6A6A6A]/2 p-5 text-center shadow-sm">
      <div className="p-3 rounded-lg border border-gray-100 bg-gray-50 shadow">
        <p className="text-xl font-semibold text-gray-800">{plan.data}</p>
        <p className="mt-0.5 font-semibold text-primary-pink">of 5G data</p>
      </div>
      <p className="mt-5 text-3xl font-semibold text-gray-900">
        {plan.price}/month
      </p>
      <p className="mt-1 text-sm text-gray-500 font-medium">+ taxes and fees</p>{" "}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-xl font-semibold text-gray-800">Broadband Facts</p>
        <p className="mt-1 text-sm leading-snug text-gray-500 font-medium">
          Mobile Broadband Consumer Disclosure
        </p>
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-xl font-semibold text-gray-800">Pink Mobile</p>
        <p className="mt-1 text-sm font-medium leading-snug text-gray-400">
          {plan.description}
        </p>
      </div>
      {/* Fade-in BroadbandFactsCard */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`pt-4 text-left transition-opacity duration-500 ${
              isOpen ? "opacity-100 delay-150" : "opacity-0"
            }`}
          >
            <BroadbandFactsCard
              plan={plan}
              expanded={isOpen}
              onToggle={onToggle}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="mt-5 primary_btn w-full"
      >
        {isOpen ? "Hide Details" : "View Details"}
      </button>
    </div>
  );
}

export default function ViewPlans({ btn_url, btn_text }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      <div
        className={`grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 xl:grid-cols-3 ${openId && "items-start"}`}
      >
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isOpen={openId === plan.id}
            onToggle={() => setOpenId(openId === plan.id ? null : plan.id)}
          />
        ))}
      </div>

      <div className="mt-8 md:mt-14 flex justify-center">
        <Link
          href={btn_url}
          className="w-full max-w-2xl rounded-2xl text-center bg-gray-900 px-6 py-2.5 md:py-3.5 cursor-pointer font-semibold text-white transition-colors hover:bg-gray-800"
        >
          {btn_text}
        </Link>
      </div>
    </div>
  );
}

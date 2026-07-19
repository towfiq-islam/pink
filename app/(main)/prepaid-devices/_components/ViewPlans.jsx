"use client";

import Link from "next/link";

const PLANS = [
  {
    id: "2gb",
    data: "2GB",
    price: 10,
    description: "Unlimited Mobile Internet with up to 2GB of 5G / 4G LTE Data",
  },
  {
    id: "5gb",
    data: "5GB",
    price: 20,
    description: "Unlimited Mobile Internet with up to 5GB of 5G / 4G LTE Data",
  },
  {
    id: "10gb",
    data: "10GB",
    price: 30,
    description:
      "Unlimited Mobile Internet with up to 10GB of 5G / 4G LTE Data",
  },
  {
    id: "30gb",
    data: "30GB",
    price: 40,
    description:
      "Unlimited Mobile Internet with up to 30GB of 5G / 4G LTE Data",
  },
  {
    id: "50gb",
    data: "50GB",
    price: 50,
    description:
      "Unlimited Mobile Internet with up to 50GB of 5G / 4G LTE Data",
  },
];

function PlanCard({ plan, onViewDetails }) {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-gray-100 bg-[#6A6A6A]/2 py-5 px-7 text-center shadow-sm">
      <div className="p-3 rounded-lg border border-gray-100 bg-gray-50 shadow">
        <p className="text-xl font-semibold text-gray-800">{plan.data}</p>
        <p className="mt-0.5 font-semibold text-primary-pink">of 5G data</p>
      </div>

      <p className="mt-5 text-3xl font-semibold text-gray-900">
        ${plan.price}/month
      </p>
      <p className="mt-1 text-sm text-gray-500 font-medium">+ taxes and fees</p>

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

      <button
        type="button"
        onClick={() => onViewDetails?.(plan)}
        className="mt-5 primary_btn w-full"
      >
        View Details
      </button>
    </div>
  );
}

export default function ViewPlans({ onViewDetails, btn_url, btn_text }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 xl:grid-cols-3 place-items-center">
        {PLANS.map(plan => (
          <PlanCard key={plan.id} plan={plan} onViewDetails={onViewDetails} />
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

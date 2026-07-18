"use client";
import { useState } from "react";
import { BroadbandFactsCard } from "./BroadbandFactsCard";
const PLAN_DATA = {
  monthly: [
    {
      name: "Starter Plan Monthly",
      price: "$12",
      features: [
        "110 Call to any country",
        "60 min free per month",
        "HD Voice Quality",
        "Mobile + Desktop",
        "Global Coverage",
        "Secure Encrypted Calls",
        "24/7 Support",
      ],
    },
    {
      name: "Pro Plan Monthly",
      price: "$45",
      featured: true,
      features: [
        "250 Call to any country",
        "50 min free per month",
        "HD Voice Quality",
        "Mobile + Desktop",
        "Global Coverage",
        "Secure Encrypted Calls",
        "24/7 Support",
      ],
    },
    {
      name: "Enterprise Plan Monthly",
      price: "$60",
      features: [
        "450 Call to any country",
        "100 min free per month",
        "HD Voice Quality",
        "Mobile + Desktop",
        "Global Coverage",
        "Secure Encrypted Calls",
        "24/7 Support",
      ],
    },
  ],
  yearly: [
    {
      name: "Starter Plan Yearly",
      price: "$120",
      features: [
        "110 Call to any country",
        "60 min free per month",
        "HD Voice Quality",
        "Mobile + Desktop",
        "Global Coverage",
        "Secure Encrypted Calls",
        "24/7 Support",
      ],
    },
    {
      name: "Pro Plan Yearly",
      price: "$450",
      featured: true,
      features: [
        "250 Call to any country",
        "50 min free per month",
        "HD Voice Quality",
        "Mobile + Desktop",
        "Global Coverage",
        "Secure Encrypted Calls",
        "24/7 Support",
      ],
    },
    {
      name: "Enterprise Plan Yearly",
      price: "$600",
      features: [
        "450 Call to any country",
        "100 min free per month",
        "HD Voice Quality",
        "Mobile + Desktop",
        "Global Coverage",
        "Secure Encrypted Calls",
        "24/7 Support",
      ],
    },
  ],
};
const PLANS = [
  {
    id: "super-mobile",
    name: "Super Mobile",
    price: "$10",
    dataLabel: "2GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000030",
  },
  {
    id: "unlimited-monthly",
    name: "Unlimited Monthly",
    description: "Unlimited Mobile Internet with up to 5GB of 5G / 4G LTE Data",
    price: "$20",
    dataLabel: "5GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000033",
  },
  {
    id: "unlimited-plus-monthly",
    name: "Unlimited Plus Monthly",
    description:
      "Unlimited Mobile Internet with up to 10GB of 5G / 4G LTE Data",
    price: "$30",
    dataLabel: "10GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000029",
  },
];

export default function Pricing({ facts }) {
  const [billing, setBilling] = useState("monthly");
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-7 md:mb-10 xl:mb-12">
        <button
          onClick={() => setBilling("monthly")}
          className={`rounded-xl text-sm md:text-base px-5 md:px-10 cursor-pointer py-3 text-[15px] font-medium transition-colors duration-300 ${
            billing === "monthly"
              ? "bg-black text-white"
              : "text-black bg-gray-200"
          }`}
        >
          Monthly Plans
        </button>

        <button
          onClick={() => setBilling("yearly")}
          className={`rounded-xl text-sm md:text-base px-5 md:px-10 cursor-pointer py-3 text-[15px] font-medium transition-colors duration-300 ${
            billing === "yearly"
              ? "bg-black text-white"
              : "text-black bg-gray-200"
          }`}
        >
          Yearly Plans
        </button>
      </div>

      {/* Plan cards */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
        {PLAN_DATA[billing].map(plan => (
          <div
            key={plan.name}
            className="flex-1 rounded-2xl p-4 md:p-6 flex flex-col border border-gray-100 shadow hover:bg-pink-50/20 group hover:border-primary-pink duration-500 transition-all hover:scale-[1.02]"
          >
            <div className="text-center border-b border-gray-300 pb-4 mb-4">
              <p className="text-xl font-semibold text-gray-800">{plan.name}</p>
              <p className="text-3xl font-semibold mt-2">{plan.price}/mo</p>
            </div>

            <p className="font-semibold mb-3">Our plan for users.</p>
            <ul className="space-y-3 list-disc list-inside mb-10 flex-1">
              {plan.features.map((f, i) => {
                return (
                  <li key={i} className="text-sm text-gray-500 font-medium">
                    {f}
                  </li>
                );
              })}
            </ul>

            <button className="w-full py-2 xl:py-3 rounded-lg border cursor-pointer duration-300 transition-all hover:bg-primary-pink hover:text-white font-semibold border-primary-pink text-primary-pink group-hover:bg-primary-pink group-hover:text-white">
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      {/* Facts */}
      {facts && (
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {PLANS.map(plan => (
            <BroadbandFactsCard
              key={plan.id}
              plan={plan}
              expanded={openId === plan.id}
              onToggle={() => setOpenId(openId === plan.id ? null : plan.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

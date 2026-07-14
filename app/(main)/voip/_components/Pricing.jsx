"use client";
import { useState } from "react";
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

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="container mt-20">
      <div className="flex justify-center gap-3 mb-12">
        <button
          onClick={() => setBilling("monthly")}
          className={`rounded-xl px-10 cursor-pointer py-3 text-[15px] font-medium transition-colors duration-300 ${
            billing === "monthly"
              ? "bg-black text-white"
              : "text-black bg-gray-200"
          }`}
        >
          Monthly Plans
        </button>

        <button
          onClick={() => setBilling("yearly")}
          className={`rounded-xl px-10 cursor-pointer py-3 text-[15px] font-medium transition-colors duration-300 ${
            billing === "yearly"
              ? "bg-black text-white"
              : "text-black bg-gray-200"
          }`}
        >
          Yearly Plans
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {PLAN_DATA[billing].map(plan => (
          <div
            key={plan.name}
            className="flex-1 rounded-2xl p-6 flex flex-col border border-gray-100 shadow hover:bg-pink-50/20 group hover:border-primary-pink duration-500 transition-all hover:scale-[1.02]"
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

            <button className="w-full py-3 rounded-lg border cursor-pointer duration-300 transition-all hover:bg-primary-pink hover:text-white font-semibold border-primary-pink text-primary-pink group-hover:bg-primary-pink group-hover:text-white">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

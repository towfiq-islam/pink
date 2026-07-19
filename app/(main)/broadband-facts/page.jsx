"use client";
import { useState } from "react";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { BroadbandFactsCard } from "../voip/_components/BroadbandFactsCard";
const PLANS = [
  {
    id: "2gb",
    name: "Unlimited Mobile Internet with up to 2GB of 5G / 4G LTE Data",
    price: "$10",
    dataLabel: "2GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000030",
  },
  {
    id: "5gb",
    name: "Unlimited Mobile Internet with up to 5GB of 5G / 4G LTE Data",
    price: "$20",
    dataLabel: "5GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000033",
  },
  {
    id: "10gb",
    name: "Unlimited Mobile Internet with up to 10GB of 5G / 4G LTE Data",
    price: "$30",
    dataLabel: "10GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000029",
  },
  {
    id: "30gb",
    name: "Unlimited Mobile Internet with up to 30GB of 5G / 4G LTE Data",
    price: "$40",
    dataLabel: "30GB high-speed data, then unlimited at 128kbps",
    identifier: "M0006945950PRI0000000031",
  },
];

export default function CheckBroadbandFactsPage() {
  const [openIds, setOpenIds] = useState(() => new Set(PLANS.map(p => p.id)));

  const toggle = id => {
    setOpenIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="container pt-5 pb-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
          <li>
            <Link
              href="/"
              className="hover:text-primary-pink transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <IoChevronForward className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-900">Check Broadband Facts</span>
          </li>
        </ol>
      </nav>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 items-start">
        {PLANS.map(plan => (
          <BroadbandFactsCard
            key={plan.id}
            plan={plan}
            expanded={openIds.has(plan.id)}
            onToggle={() => toggle(plan.id)}
          />
        ))}
      </div>
    </section>
  );
}

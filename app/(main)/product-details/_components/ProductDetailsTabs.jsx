"use client";
import { useState } from "react";
import g1 from "@/assets/g1.png";
import g2 from "@/assets/g2.png";
import g3 from "@/assets/g3.png";
import Image from "next/image";

const FEATURES = [
  "6.9\u2033 Super Retina XDR display",
  "UniBody Design for exceptional power",
  "Durable ceramic Shield front and back",
  "Water resistant to a depth of 6 meters for up to 30 minutes",
  "A19 Pro chip, Vapor Cooled, Lighting Fast",
  "Best Battery life in an iPhone ever",
  "iOS 26",
  "Built for Apple Intelligence",
  "Satellite features",
  "Stronger Connectivity, Superfast speeds",
  "eSIM",
];

const WHATS_IN_BOX = [
  "Apple iPhone 17 Pro Max",
  "USB-C Charge Cable (1 m)",
  "Documentation",
];

const HIGHLIGHT_CARDS = [
  {
    icon: g1,
    title: "T-Satellite with Starlink",
    desc: "This device is compatible with T-Satellite, so you can stay connected in places never thought possible with the only mobile + satellite network powering messaging and apps.",
  },
  {
    icon: g2,
    title:
      "48MP Pro Fusion camera system: 48MP Fusion Main 48MP Fusion |Ultra Wide 48MP Fusion Telephoto",
    desc: "18MP Center Stage camera",
  },
  {
    icon: g3,
    title: "50 Hours Talk Time",
    desc: "Standby Time",
  },
];

const SPEC_COLUMN_LEFT = [
  {
    label: "Battery Description",
    value: "Built-in rechargeable lithium-ion battery",
  },
  { label: "Ports", value: "USB Type-C" },
  {
    label: "Connectivity",
    value:
      "Wi-Fi 7 (802.11be) with 2x2 MIMO, Bluetooth 6, NFC with reader mode, VoLTE, Satellite Capable, Native Satellite Capable, Satellite Data Capable",
  },
  { label: "Processor", value: "A19 Pro Chip" },
  { label: "Operating System", value: "iOS" },
  { label: "Maximum Expandable Memory", value: "0 GB" },
  { label: "Wireless Network Technology Generations", value: "4G LTE, 5G" },
  {
    label: "Supported Email Platforms",
    value:
      "Apple Mail, POP3, IMAP4, SMTP, Microsoft Exchange, AOL, AIM, Yahoo! Mail, Gmail",
  },
  { label: "WEA Capable", value: "true" },
];

const SPEC_COLUMN_RIGHT = [
  { label: "Mobile Hotspot Capable", value: "True" },
  {
    label: "Frequency",
    value:
      "LTE: 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 48, 53, 66, 71; GSM: 850 MHz, 900 MHz, 1800 MHz, 1900 MHz; UMTS: Band I (2100), Band II (1900), Band IV (1700/2100), Band V (850), Band VIII (900); 5G: n1, n2, n3, n5, n7, n8, n12, n20, n25, n26, n28, n29, n30, n38, n40, n41, n48, n53, n66, n70, n71, n77, n78, n79, n258, n260, n261",
  },
  { label: "Display", value: "6.9\u2033 Super Retina XDR display" },
  { label: "Display resolution", value: "2868 x 1320 pixels" },
  { label: "Weight", value: "8.22 Ounces" },
  { label: "Length", value: "0.34 inches" },
  { label: "Height", value: "6.43 inches" },
  { label: "Width", value: "3.07 inches" },
];

function SpecList({ items }) {
  return (
    <div className="divide-y divide-gray-200">
      {items?.map(item => (
        <div key={item.label} className="py-3">
          <p className="text-sm font-semibold text-gray-600">{item.label}</p>
          <p className="text-sm text-gray-400 font-medium mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Left */}
      <div>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div
            className="col-span-2 h-56 rounded-xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #4a4a6e 0%, #14141c 70%)",
            }}
          />
          <div
            className="h-32 rounded-xl"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, #4a4a6e 0%, #14141c 70%)",
            }}
          />
          <div
            className="h-32 rounded-xl"
            style={{
              background:
                "radial-gradient(circle at 60% 60%, #4a4a6e 0%, #14141c 70%)",
            }}
          />
        </div>

        <h3 className="font-semibold mb-3">Features</h3>
        <ul className="ps-5 space-y-2.5 list-disc list-inside mb-8">
          {FEATURES.map(f => (
            <li key={f} className="text-sm text-gray-500 font-medium">
              {f}
            </li>
          ))}
        </ul>

        <SpecList items={SPEC_COLUMN_LEFT} />

        <h3 className="font-semibold mt-8 mb-2">Additional spec details</h3>
        <SpecList items={[SPEC_COLUMN_LEFT[SPEC_COLUMN_LEFT.length - 1]]} />
      </div>

      {/* Right */}
      <div>
        <h3 className="font-semibold mb-3">What&apos;s in the box</h3>
        <ul className="ps-5 space-y-2 list-disc list-inside mb-10">
          {WHATS_IN_BOX.map(item => (
            <li key={item} className="text-sm font-medium text-gray-500">
              {item}
            </li>
          ))}
        </ul>

        <h3 className="font-semibold mb-2">Spec details</h3>
        <SpecList items={SPEC_COLUMN_RIGHT} />
      </div>
    </div>
  );
}

function SpecsTab() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {HIGHLIGHT_CARDS.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="rounded-xl border text-center border-gray-100 shadow px-6 py-7"
          >
            <figure className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-3">
              <Image
                src={icon}
                alt="icon"
                className="w-full h-full object-cover"
              />
            </figure>
            <p className="font-semibold mt-5 mb-2">{title}</p>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-14">
        {/* Left */}
        <div>
          <h3 className="font-semibold mb-3">Other features</h3>
          <ul className="space-y-2 ps-5 list-disc list-inside mb-8">
            {FEATURES.map(f => (
              <li key={f} className="text-sm text-gray-500 font-medium">
                {f}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2">Additional spec details</h3>
          <SpecList items={SPEC_COLUMN_LEFT} />
        </div>

        {/* Right */}
        <div>
          <h3 className="text-sm font-semibold mb-3">What&apos;s in the box</h3>
          <ul className="space-y-2 ps-5 list-disc list-inside mb-8">
            {WHATS_IN_BOX.map(item => (
              <li key={item} className="text-sm text-gray-500 font-medium">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2">Additional spec details</h3>
          <SpecList items={SPEC_COLUMN_RIGHT} />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="mt-16">
      <div className="flex justify-center border-gray-200 mb-14">
        {[
          { id: "overview", label: "Overview" },
          { id: "specs", label: "Specs" },
        ]?.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 flex-1 block cursor-pointer font-semibold border-b-2 transition-colors duration-200 ${
              activeTab === tab?.id
                ? "border-primary-pink text-gray-900"
                : "border-gray-200 text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab?.label}
          </button>
        ))}
      </div>

      <div key={activeTab} className="tab-content">
        {activeTab === "overview" ? <OverviewTab /> : <SpecsTab />}
      </div>
    </div>
  );
}

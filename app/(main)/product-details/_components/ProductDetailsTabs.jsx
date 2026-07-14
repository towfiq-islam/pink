"use client";
import { useState } from "react";
import {
  FiGlobe as HiOutlineGlobeAlt,
  FiCamera as HiOutlineCamera,
  FiBatteryCharging as HiOutlineBatteryFull,
} from "react-icons/fi";
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
    icon: HiOutlineGlobeAlt,
    title: "T-Satellite with Starlink",
    desc: "This device is compatible with T-Satellite, so you can stay connected in places never thought possible with the only mobile + satellite network powering messaging and apps.",
    bg: "#eaf2ff",
    color: "#2f6fed",
  },
  {
    icon: HiOutlineCamera,
    title:
      "48MP Pro Fusion camera system: 48MP Fusion Main 48MP Fusion |Ultra Wide 48MP Fusion Telephoto",
    desc: "18MP Center Stage camera",
    bg: "#eef0f6",
    color: "#4b4f63",
  },
  {
    icon: HiOutlineBatteryFull,
    title: "50 Hours Talk Time",
    desc: "Standby Time",
    bg: "#eafaf1",
    color: "#22a35c",
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
    <div className="divide-y divide-gray-100">
      {items.map(item => (
        <div key={item.label} className="py-3">
          <p className="text-sm font-medium">{item.label}</p>
          <p className="text-sm text-gray-400 mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="grid md:grid-cols-2 gap-10">
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

        <h3 className="text-sm font-semibold mb-3">Features</h3>
        <ul className="space-y-2 mb-8">
          {FEATURES.map(f => (
            <li key={f} className="text-sm text-gray-500 flex gap-2">
              <span>&middot;</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <SpecList items={SPEC_COLUMN_LEFT} />

        <h3 className="text-sm font-semibold mt-8 mb-2">
          Additional spec details
        </h3>
        <SpecList items={[SPEC_COLUMN_LEFT[SPEC_COLUMN_LEFT.length - 1]]} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">What&apos;s in the box</h3>
        <ul className="space-y-2 mb-10">
          {WHATS_IN_BOX.map(item => (
            <li key={item} className="text-sm text-gray-500 flex gap-2">
              <span>&middot;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-sm font-semibold mb-2">spec details</h3>
        <SpecList items={SPEC_COLUMN_RIGHT} />
      </div>
    </div>
  );
}

function SpecsTab() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {HIGHLIGHT_CARDS.map(({ icon: Icon, title, desc, bg, color }) => (
          <div key={title} className="rounded-xl border border-gray-100 p-5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: bg, color }}
            >
              <Icon size={20} />
            </div>
            <p className="text-sm font-semibold mb-1">{title}</p>
            <p className="text-xs text-gray-400">{desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-sm font-semibold mb-3">Other features</h3>
          <ul className="space-y-2 mb-8">
            {FEATURES.map(f => (
              <li key={f} className="text-sm text-gray-500 flex gap-2">
                <span>&middot;</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold mb-2">
            Additional spec details
          </h3>
          <SpecList items={SPEC_COLUMN_LEFT} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">What&apos;s in the box</h3>
          <ul className="space-y-2 mb-8">
            {WHATS_IN_BOX.map(item => (
              <li key={item} className="text-sm text-gray-500 flex gap-2">
                <span>&middot;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold mb-2">
            Additional spec details
          </h3>
          <SpecList items={SPEC_COLUMN_RIGHT} />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="mt-14">
      <div className="flex justify-center gap-10 border-b border-gray-200 mb-10">
        {[
          { id: "overview", label: "Overview" },
          { id: "specs", label: "Specs" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium -mb-px border-b-2 ${
              activeTab === tab.id
                ? "border-primary-pink text-gray-900"
                : "border-transparent text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" ? <OverviewTab /> : <SpecsTab />}
    </div>
  );
}

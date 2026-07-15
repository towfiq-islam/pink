import React, { useState } from "react";
import { FiCalendar, FiMinus, FiPlus } from "react-icons/fi";

const TABS = [
  { id: "unlimited", label: "Unlimited Data" },
  { id: "standard", label: "Standard" },
  { id: "custom", label: "Customize Pack" },
];

const STANDARD_PACKAGES = [
  {
    duration: "3 Day",
    plans: [
      { gb: 1, price: 4.99 },
      { gb: 3, price: 5.5 },
    ],
  },
  {
    duration: "7 Day",
    plans: [
      { gb: 3, price: 6.0 },
      { gb: 5, price: 7.0 },
      { gb: 10, price: 10.0, full: true },
    ],
  },
  {
    duration: "15 Day",
    plans: [
      { gb: 5, price: 7.5 },
      { gb: 10, price: 10.5 },
      { gb: 20, price: 17.5, full: true },
    ],
  },
  {
    duration: "30 Day",
    plans: [
      { gb: 5, price: 8.5 },
      { gb: 10, price: 11.0 },
      { gb: 20, price: 18.5 },
      { gb: 50, price: 27.5 },
    ],
  },
];

const PRICE_PER_DAY = 1.5;
const PRICE_PER_GB = 6.5;
const PRICE_PER_100_MIN = 1.5;

function currency(n) {
  return `$ ${n.toFixed(2)}`;
}

// Unlimited Data tab
function UnlimitedTab({ onSubmit }) {
  const [duration, setDuration] = useState(5);
  const [people, setPeople] = useState(2);
  const pricePerPersonPerDay = 0.599;
  const total = duration * people * pricePerPersonPerDay;

  const updatePeople = delta => {
    setPeople(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-gray-900 mb-1">Trip Duration</p>
          <label className="text-sm text-gray-500 font-medium mb-2 block">
            Trip Duration
          </label>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
            <input
              type="number"
              min={1}
              value={duration}
              onChange={e =>
                setDuration(Math.max(1, Number(e.target.value) || 1))
              }
              className="w-16 outline-none text-gray-900"
            />
            <FiCalendar size={18} className="text-gray-400" />
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-1">How Many People</p>
          <label className="text-sm text-gray-500 mb-2 block font-medium">
            Selected one eSIM Per Person
          </label>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
            <button
              type="button"
              onClick={() => updatePeople(-1)}
              className="text-gray-500 hover:text-primary-pink disabled:opacity-30 cursor-pointer"
              disabled={people <= 1}
              aria-label="Decrease people"
            >
              <FiMinus size={18} />
            </button>
            <span className="text-gray-900 font-medium">
              {String(people).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => updatePeople(1)}
              className="text-gray-500 hover:text-primary-pink cursor-pointer"
              aria-label="Increase people"
            >
              <FiPlus size={18} />
            </button>
          </div>
        </div>
      </div>

      <TotalAndSubmit
        total={total}
        label="Get Unlimited Internet"
        onSubmit={() =>
          onSubmit?.({ type: "unlimited", duration, people, total })
        }
      />
    </div>
  );
}

// Standard tab
function StandardTab({ onSubmit }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-5">
      <p className="font-semibold text-lg text-gray-900">Choose your package</p>

      <div className="space-y-6">
        {STANDARD_PACKAGES.map(group => (
          <div key={group.duration}>
            <p className="text-sm font-semibold text-gray-900 mb-2">
              {group.duration}
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {group.plans.map(plan => {
                const id = `${group.duration}-${plan.gb}`;
                const isSelected = selected?.id === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      setSelected({
                        id,
                        duration: group.duration,
                        gb: plan.gb,
                        price: plan.price,
                      })
                    }
                    className={`flex items-center cursor-pointer justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                      plan.full ? "sm:col-span-2" : ""
                    } ${
                      isSelected
                        ? "border-primary-pink text-primary-pink bg-pink-50"
                        : "border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span>{plan.gb} GB</span>
                    <span>${plan.price.toFixed(2)} USD</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <TotalAndSubmit
        total={selected?.price ?? 0}
        label="Buy Now"
        disabled={!selected}
        onSubmit={() => onSubmit?.({ type: "standard", ...selected })}
      />
    </div>
  );
}

// Customize Pack tab
function CustomTab({ onSubmit }) {
  const [days, setDays] = useState(16);
  const [gb, setGb] = useState(12);
  const [minutes, setMinutes] = useState(500);

  const total =
    days * PRICE_PER_DAY +
    gb * PRICE_PER_GB +
    (minutes / 100) * PRICE_PER_100_MIN;

  const field = (label, value, setValue, unit, min = 0) => (
    <div>
      <label className="text-sm text-gray-500 mb-2 block">{label}</label>
      <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
        <input
          type="number"
          min={min}
          value={value}
          onChange={e => setValue(Math.max(min, Number(e.target.value) || min))}
          className="w-20 outline-none text-gray-900"
        />
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <p className="font-semibold text-lg text-gray-900">Customize your package</p>

      <div className="grid sm:grid-cols-3 gap-6">
        {field("Validity (in days)", days, setDays, "Days", 1)}
        {field("Internet", gb, setGb, "GB", 1)}
        {field("Minutes", minutes, setMinutes, "Min", 0)}
      </div>

      <TotalAndSubmit
        total={total}
        label="Buy Now"
        onSubmit={() =>
          onSubmit?.({ type: "custom", days, gb, minutes, total })
        }
      />
    </div>
  );
}

// Shared total + submit button
function TotalAndSubmit({ total, label, onSubmit, disabled }) {
  return (
    <div className="pt-5 border-t border-gray-100 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">Total Amount</span>
        <span className="font-semibold text-gray-900">{currency(total)}</span>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onSubmit}
        className="w-full primary_btn !rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {label}
      </button>
    </div>
  );
}

const DataTabs = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState("unlimited");

  return (
    <div className="container mt-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-2.5">Data</h2>

        <div className="shadow border border-gray-100 rounded-2xl p-5">
          <div className="flex pb-7">
            {TABS.map(tab => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 font-semibold pb-3 transition-colors duration-300 border-b cursor-pointer ${
                    isActive
                      ? "text-primary-pink border-primary-pink border-b-2"
                      : "text-gray-500 hover:text-gray-700 border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="">
            {activeTab === "unlimited" && <UnlimitedTab onSubmit={onSubmit} />}
            {activeTab === "standard" && <StandardTab onSubmit={onSubmit} />}
            {activeTab === "custom" && <CustomTab onSubmit={onSubmit} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTabs;

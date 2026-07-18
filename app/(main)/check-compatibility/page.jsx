"use client";
import Image from "next/image";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import ReadyToSwitch from "../prepaid-plan/_components/ReadyToSwitch";
const STEPS = [
  { id: 1, label: "Check compatibility" },
  { id: 2, label: "Choose SIM type" },
  { id: 3, label: "Set up your number" },
];

export default function Page() {
  const [activeStep, setActiveStep] = useState(1);
  const [imei, setImei] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const imeiValid = /^\d{15}$/.test(imei);

  const handleCheckCompatibility = () => {
    if (!imeiValid) return;
    setChecking(true);
    setResult(null);
    // Simulated check - replace with real IMEI/compatibility API call
    setTimeout(() => {
      setChecking(false);
      setResult("compatible");
      setActiveStep(2);
    }, 1200);
  };

  return (
    <section className="container py-5 lg:py-10">
      {/* Heading */}
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
        Connect in 3 steps
      </h2>

      {/* Step tracker */}
      <div className="max-w-6xl mx-auto mt-4 md:mt-5 lg:mt-6 rounded-2xl bg-[#6A6A6A]/5 px-4 md:px-6 py-5 md:py-10 sm:px-10">
        <ol className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
          {STEPS.map((step, idx) => (
            <li key={step.id} className="flex items-center gap-3 flex-1">
              <span
                className={[
                  "flex size-6 md:size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white transition-colors",
                  step.id <= activeStep ? "bg-primary-pink" : "bg-gray-300",
                ].join(" ")}
              >
                {step.id < activeStep ? <FaCheck size={16} /> : step.id}
              </span>
              <span
                className={[
                  "text-sm sm:text-base font-semibold",
                  step.id <= activeStep ? "text-gray-800" : "text-gray-400",
                ].join(" ")}
              >
                {step.label}
              </span>
              {idx < STEPS.length - 1 && (
                <span className="hidden sm:block flex-1 h-px bg-gray-200 mx-2" />
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Content */}
      <h3 className="mt-6 md:mt-12 text-center text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
        Bring your phone when you switch
      </h3>

      <div className="mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 lg:gap-10 items-start mb-5 md:mb-16">
        {/* Video thumbnail */}
        <div className="relative w-full h-80 md:h-100 overflow-hidden rounded-2xl bg-gray-800">
          <Image
            src="https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop"
            alt="thumbnail"
            fill
            className="h-full w-full object-cover opacity-90"
          />
        </div>

        {/* Steps */}
        <div className="divide-y divide-gray-200">
          {/* Step 1 */}
          <div className="pb-6">
            <p className="font-semibold text-gray-900">
              <span className="text-primary-pink">Step 1:</span> Check
              compatibility
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Dial *#06# to get your IMEI, or find it in settings.
            </p>

            <label
              htmlFor="imei"
              className="mt-4 block text-sm font-medium text-gray-700"
            >
              Enter your device&apos;s IMEI
            </label>
            <input
              id="imei"
              type="text"
              inputMode="numeric"
              maxLength={15}
              value={imei}
              onChange={e => setImei(e.target.value.replace(/\D/g, ""))}
              placeholder="15 digit IMEI number*"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-pink focus:outline-none focus:ring-2 focus:ring-primary-pink/30"
            />

            <button
              type="button"
              onClick={handleCheckCompatibility}
              disabled={!imeiValid || checking}
              className={[
                "mt-4 w-full rounded-lg cursor-pointer px-4 py-3 text-sm font-semibold transition-colors",
                imeiValid && !checking
                  ? "bg-primary-pink text-white hover:bg-primary-pink/90"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed",
              ].join(" ")}
            >
              {checking ? "Checking..." : "Check compatibility"}
            </button>

            {result === "compatible" && (
              <p className="mt-2 text-sm font-medium text-green-600">
                Good news — your phone is compatible.
              </p>
            )}
          </div>

          {/* Step 2 */}
          <div className="py-6">
            <p
              className={[
                "font-semibold",
                activeStep >= 2 ? "text-gray-900" : "text-gray-400",
              ].join(" ")}
            >
              <span
                className={
                  activeStep >= 2 ? "text-primary-pink" : "text-gray-400"
                }
              >
                Step 2:
              </span>{" "}
              Choose how to activate
            </p>
            {activeStep < 2 && (
              <p className="mt-1 text-sm text-gray-400">
                Unlocks once your device is confirmed compatible.
              </p>
            )}
          </div>

          {/* Step 3 */}
          <div className="py-6">
            <p
              className={[
                "font-semibold",
                activeStep >= 3 ? "text-gray-900" : "text-gray-400",
              ].join(" ")}
            >
              <span
                className={
                  activeStep >= 3 ? "text-primary-pink" : "text-gray-400"
                }
              >
                Step 3:
              </span>{" "}
              Set up your number
            </p>
          </div>
        </div>
      </div>
      <ReadyToSwitch />
    </section>
  );
}

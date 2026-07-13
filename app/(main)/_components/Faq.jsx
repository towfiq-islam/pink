"use client";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
const FAQ_ITEMS = [
  {
    q: "Can I bring my own phone to Pink Mobile?",
    a: "Yes. Most unlocked, compatible phones can be brought over — check compatibility during sign up and we'll confirm before you switch.",
  },
  {
    q: "What is the Global Sims?",
    a: "Global Sims let you add short-term data and calling in supported countries without swapping your primary SIM.",
  },
  {
    q: "Can I keep my current phone number when switching to phone?",
    a: "Yes, you can transfer your existing number when you switch — just have your account details from your current carrier ready.",
  },
  {
    q: "Which payment options are available?",
    a: "We accept major credit and debit cards, PayPal, and autopay via bank transfer.",
  },
  {
    q: "Does Pink Mobile support 5G?",
    a: "Yes, all current plans include access to our nationwide 5G network at no extra cost on compatible devices.",
  },
  {
    q: "Can I bring my own phone to Pink Mobile?",
    a: "Yes. Most unlocked, compatible phones can be brought over — check compatibility during sign up and we'll confirm before you switch.",
  },
  {
    q: "Does Pink Mobile have live chat support?",
    a: "Yes, live chat is available from the chat bubble in the bottom-right corner, seven days a week.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = i => setOpenIndex(current => (current === i ? null : i));

  return (
    <section className="mx-auto max-w-3xl pt-14 pb-24 text-center">
      <p className="text-xl font-medium uppercase tracking-wide text-primary-pink">
        FAQ
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl">
        Can&apos;t see what you&apos;re searching for?
      </h2>
      <p className="mt-2.5 font-medium text-gray-400">
        Know Everything You Need, in One Place
      </p>

      <div className="mt-9 space-y-3 text-left">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i} className="rounded-xl border border-gray-200">
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between cursor-pointer px-5 py-5 text-left font-semibold text-gray-800"
              >
                {item.q}
                <FaAngleDown
                  className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-5 pb-4 text-[15px] font-medium leading-relaxed text-gray-500">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

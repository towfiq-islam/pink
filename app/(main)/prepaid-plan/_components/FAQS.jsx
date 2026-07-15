import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
const faq = [
  "What happens if I switch plans mid-cycle?",
  "What if I'm calling Mexico or Canada?",
  "Can I bring my own phone to use with T-Mobile Prepaid?",
  "How will I be charged for international calling to pay-per-use countries?",
  "Is mobile hotspot included or available as an add-on?",
  "Who is eligible for Caller ID?",
];

export function FAQS() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = i => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <div className="container bg-[#6A6A6A]/4 rounded-2xl p-6 sm:p-8">
      <h2 className="text-center text-2xl font-semibold text-gray-900 uppercase mb-5 md:mb-7">
        FAQs
      </h2>

      <div className="grid sm:grid-cols-2 gap-3 md:gap-4 items-start">
        {faq?.map((question, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={question}
              className="bg-[#000000]/4 border border-gray-200 rounded-xl px-4"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full cursor-pointer flex items-center justify-between py-4 text-left text-sm font-semibold text-gray-700"
              >
                {question}
                <FiChevronDown
                  size={16}
                  className={`text-gray-400 shrink-0 ml-3 transition-transform ${
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
                  <p className="pb-4 text-sm text-gray-500 font-medium">
                    Details for this question go here — connect it to your real
                    FAQ content or CMS.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

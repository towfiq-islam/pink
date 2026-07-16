import { IoIosArrowDown } from "react-icons/io";

function Row({ label, value, bold }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className={bold ? "font-semibold text-gray-900" : "text-gray-600"}>
        {label}
      </span>
      <span className={bold ? "font-semibold text-gray-900" : "text-gray-700"}>
        {value}
      </span>
    </div>
  );
}

function SectionDivider() {
  return <div className="my-3 border-t border-gray-200" />;
}

export function BroadbandFactsCard({ plan, expanded, onToggle }) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow">
      {/* Header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
      >
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Broadband Facts and fees
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Mobile Broadband Consumer Disclosure
          </p>

          <div className="mt-4">
            <p className="text-xs text-gray-500">T-Mobile Plan</p>
            <p className="text-sm font-semibold text-gray-900">{plan.name}</p>
          </div>
        </div>

        <IoIosArrowDown
          className={`mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-500 ${
            expanded ? "rotate-180 text-primary-pink" : ""
          }`}
        />
      </button>

      {/* Expandable full label — animated height + fade */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`px-5 pb-5 transition-opacity duration-500 ${
              expanded ? "opacity-100 delay-150" : "opacity-0"
            }`}
          >
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Broadband Facts
              </p>
              <p className="text-[11px] text-gray-500">
                Mobile Broadband Consumer Disclosure
              </p>

              <div className="mt-4">
                <p className="text-xs text-gray-500">T-Mobile</p>
                <p className="text-sm font-semibold text-gray-900">
                  {plan.description ?? plan.name}
                </p>
              </div>

              <SectionDivider />
              <Row label="Monthly Price" value={plan.price} bold />
              <p className="mt-1 text-xs text-gray-500">
                This monthly price is not an introductory rate and does not
                require a yearly contract.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Does not include discounts.
              </p>

              <SectionDivider />
              <p className="text-sm font-semibold text-gray-900">
                Additional Charges &amp; Terms
              </p>
              <Row
                label="Provider monthly fees"
                value="Included in monthly price"
              />
              <p className="mt-2 text-xs font-semibold text-gray-500">
                One-time fees
              </p>
              <Row label="Device connection charge" value="$25/line" />
              <Row label="Early termination fee" value="$0" />
              <Row label="Government taxes" value="Varies by location" />

              <SectionDivider />
              <p className="text-sm font-semibold text-gray-900">
                Discounts &amp; Bundles
              </p>
              <p className="mt-1 text-xs text-gray-600">
                There may be additional billing discounts available.
              </p>

              <SectionDivider />
              <p className="text-sm font-semibold text-gray-900">
                Speeds Provided with Plan
              </p>
              <Row
                label="Typical Download Speed"
                value="144 - 561 Mbps (5G), 13 - 69 Mbps (4G)"
              />
              <Row
                label="Typical Upload Speed"
                value="6 - 34 Mbps (5G), 2 - 15 Mbps (4G)"
              />
              <Row
                label="Typical Latency"
                value="15 - 27 ms (5G), 24 - 42 ms (4G)"
              />

              <SectionDivider />
              <Row
                label="Data Included with Monthly Price"
                value={plan.dataLabel}
              />
              <Row label="Charges for Additional Data Usage" value="$0" />

              <SectionDivider />
              <a
                href="#"
                className="block text-sm font-medium text-primary-pink underline"
              >
                Network Management Policy
              </a>
              <a
                href="#"
                className="mt-2 block text-sm font-medium text-primary-pink underline"
              >
                Privacy Policy
              </a>

              <SectionDivider />
              <p className="text-sm font-semibold text-gray-900">
                Customer Support
              </p>
              <a
                href="#"
                className="mt-1 block text-sm font-medium text-primary-pink underline"
              >
                Contact Us
              </a>
              <p className="mt-2 text-xs text-gray-600">
                From your pink- mobile phone : 611
              </p>
              <p className="text-xs text-gray-600">
                Call:{" "}
                <a
                  href="tel:18009378997"
                  className="text-primary-pink underline"
                >
                  1-800-937-8997
                </a>
              </p>

              <SectionDivider />
              <p className="text-[11px] text-gray-500">
                Learn more about the terms used on this label by visiting the
                Federal Communications Commission&apos;s Consumer Resource
                Center.{" "}
                <a
                  href="https://www.fcc.gov/consumers"
                  className="text-primary-pink underline"
                >
                  https://www.fcc.gov/consumers
                </a>
              </p>

              <p className="mt-3 text-[11px] text-gray-400">
                Unique plan identifier: {plan.identifier}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

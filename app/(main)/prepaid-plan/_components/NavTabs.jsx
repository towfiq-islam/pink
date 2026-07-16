import SectionTitle from "@/components/common/SectionTitle";
import Link from "next/link";
import { FiSmartphone, FiRepeat, FiGift } from "react-icons/fi";
const NAV_TABS = [
  { label: "Prepaid Plans", icon: FiSmartphone, path: "/prepaid-phone-plans" },
  {
    label: "Bring your own Phone",
    icon: FiRepeat,
    path: "/own-phone",
  },
  { label: "Prepaid Phone", icon: FiSmartphone, path: "/prepaid-phone" },
  { label: "Benefits", icon: FiGift, path: "/benefits" },
];

export function NavTabs() {
  return (
    <div>
      <SectionTitle
        title=" Get more with our new prepaid phone plans."
        description=" Enjoy greater flexibility, faster speeds, and affordable pricing with
        prepaid plans designed to keep you connected without long-term
        commitments."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
        {NAV_TABS.map(tab => {
          const Icon = tab.icon;

          return (
            <Link
              href={tab?.path}
              key={tab?.label}
              className="relative text-center flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-100 py-10 px-3 bg-[#6A6A6A]/10 font-semibold text-gray-700 hover:bg-[#6A6A6A]/20 duration-300 transition-colors"
            >
              <Icon size={25} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

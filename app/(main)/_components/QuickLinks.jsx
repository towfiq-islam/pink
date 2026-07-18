import { GrPlan } from "react-icons/gr";
import { MdPhoneIphone } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { BsRouter } from "react-icons/bs";
import { FaArrowUpRightDots } from "react-icons/fa6";

const QUICK_LINKS = [
  { label: "Mobile Plan", icon: GrPlan },
  { label: "Buy a new phone", icon: MdPhoneIphone },
  { label: "VoIP", icon: FiPhoneCall },
  { label: "Broadband", icon: BsRouter },
  { label: "Global Sims", icon: FaArrowUpRightDots },
];

export function QuickLinks() {
  return (
    <div className="container grid grid-cols-2 gap-3 lg:gap-3 pt-8 xl:pt-10 sm:grid-cols-3 lg:grid-cols-5">
      {QUICK_LINKS?.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="flex flex-col gap-3 xl:gap-4 rounded-xl border border-[#EEEEEEEE] p-4 md:p-5 text-left font-semibold text-gray-800 transition-colors duration-300 cursor-pointer hover:border-pink-300 hover:bg-pink-50 text-[15px] md:text-base"
        >
          <Icon className="text-3xl xl:text-4xl text-primary-pink" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

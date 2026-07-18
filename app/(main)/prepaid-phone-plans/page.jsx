import Banner from "@/components/common/Banner";
import React from "react";
import bannerBg from "@/assets/phoneBg.png";
import b6 from "@/assets/b6.png";
import b7 from "@/assets/b7.png";
import Link from "next/link";
import { FiSmartphone, FiGift } from "react-icons/fi";
import Pricing from "../voip/_components/Pricing";
import ExclusiveBenefits from "../prepaid-plan/_components/ExclusiveBenefits";
import { SplitBanner } from "@/components/common/SplitBanner";
import SectionTitle from "@/components/common/SectionTitle";
import { MdSpeakerPhone } from "react-icons/md";
const NAV_TABS = [
  { label: "Prepaid Plans", icon: FiSmartphone, path: "/prepaid-phone-plans" },
  { label: "Prepaid Phone", icon: MdSpeakerPhone, path: "/prepaid-phone" },
  { label: "Benefits", icon: FiGift, path: "/benefits" },
];

const page = () => {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 md:pb-20 space-y-10 lg:space-y-14 xl:space-y-20">
      <Banner
        bannerBg={bannerBg}
        title="Compare our best monthly plans."
        description="Your price is backed by our 5-year price guarantee. No contracts. No commitments."
      >
        <button className="primary_btn md:!px-10">Get Full Items</button>
      </Banner>

      <div className="grid grid-cols-2 lg:grid-cols-3 lg:px-20 gap-3 lg:gap-5 -mt-5">
        {NAV_TABS.map(tab => {
          const Icon = tab.icon;

          return (
            <Link
              href={tab?.path}
              key={tab?.label}
              className="relative text-center flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-100 py-10 px-3 bg-[#6A6A6A]/10 font-semibold text-gray-700 hover:bg-[#6A6A6A]/20 duration-300 transition-colors"
            >
              <Icon size={30} />
              {tab.label}
            </Link>
          );
        })}
      </div>

      <Pricing facts={true} />
      <ExclusiveBenefits />
      <SectionTitle title="Customize your plan with add-ons." />
      <SplitBanner
        title="Mexico & Canada coverage."
        description="Add calling and texting to Mexico and Canada to your plan for only $5/mo. and mobile lines in 30+ countries."
        img={b6}
        btn_text="Get full terms"
        btn_url="/"
      />
      <SplitBanner
        title="North America Stateside International calling."
        description="For an extra $15/mo., make unlimited calls from the US, Mexico, or Canada to landlines in 70+ countries and mobile lines in 30+ countries."
        img={b7}
        btn_text="Get full terms"
        btn_url="/"
        direction="right"
      />
    </section>
  );
};

export default page;

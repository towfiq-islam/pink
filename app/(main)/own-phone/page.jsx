import Banner from "@/components/common/Banner";
import React from "react";
import bannerBg from "@/assets/bring.png";
import Link from "next/link";
import ReasonCard from "@/components/common/ReasonCard";
import p1 from "@/assets/m1.png";
import p2 from "@/assets/m2.png";
import p3 from "@/assets/m3.png";
import SectionTitle from "@/components/common/SectionTitle";
import Plans from "../prepaid-plan/_components/Plans";
import b1 from "@/assets/b1.png";
import m5 from "@/assets/m5.png";
import m4 from "@/assets/m4.png";
import Coverage from "../prepaid-plan/_components/Coverage";
import ExclusiveBenefits from "../prepaid-plan/_components/ExclusiveBenefits";
import ReadyToSwitch from "../prepaid-plan/_components/ReadyToSwitch";
const PROMO_CARDS = [
  {
    icon: m5,
    title: "Save $5/mo. with AutoPay.",
    desc: "Sign up for one of our Monthly plans to save $5/mo. With AutoPay, just choose AutoPay at checkout.",
  },
  {
    icon: m4,
    title: "Keep your phone and everything in it.",
    desc: "Save your contacts, messages, and photos. Just check if your phone is compatible with the T-Mobile network.",
  },
];

const REASONS = [
  {
    icon: p1,
    title: "America’s Best Network.",
    desc: "Enjoy crystal-clear calls with enterprise-grade audio.",
  },
  {
    icon: p2,
    title: "5-year price guarantee.",
    desc: "Stay connected from anywhere.",
  },
  {
    icon: p3,
    title: "Exclusive benefits.",
    desc: "Call over 100+ countries at affordable rates.",
  },
];

const page = () => {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 md:pb-20 space-y-10 lg:space-y-14 xl:space-y-20">
      <Banner
        bannerBg={bannerBg}
        title="Keep your phone and everything in it."
        description="Get Unlimited 5G data on America’s Best Network for $40/mo. with AutoPay. Plus, ur prices are backed by our 5-year price guarantee."
      >
        <Link href="/check-compatibility" className="secondary_btn">
          Check compatibility
        </Link>
      </Banner>

      <div>
        <SectionTitle title="Why T-Mobile Prepaid?" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-7">
          {REASONS?.map(reason => (
            <ReasonCard key={reason?.title} reason={reason} isBigger={true} />
          ))}
        </div>
      </div>

      <Plans />
      <Banner
        bannerBg={b1}
        title="Unlimited Monthly $42/mo. with Autopay"
        description="Unlimited talk, text, and 5G data backed by our 5-year price guarantee. Plus, get unlimited mobile hotspot with 3G speeds."
      >
        <button className="primary_btn md:!px-10">See plan details</button>
      </Banner>

      <div>
        <SectionTitle
          title="Have an eSIM? Activate right from your phone."
          description="Our app makes it easy. Check it Out"
        />
        <div className="grid md:grid-cols-2 gap-5 xl:gap-7">
          {PROMO_CARDS?.map(reason => (
            <ReasonCard key={reason?.title} reason={reason} isBigger={true} />
          ))}
        </div>
        <div className="mt-7 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-7">
          {[...REASONS, ...PROMO_CARDS]?.slice(0, 4)?.map(reason => (
            <ReasonCard key={reason?.title} reason={reason} />
          ))}
        </div>
      </div>

      <Coverage />
      <ExclusiveBenefits />
      <ReadyToSwitch />
    </section>
  );
};

export default page;

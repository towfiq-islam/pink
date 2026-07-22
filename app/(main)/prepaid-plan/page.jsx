"use client";
import { NavTabs } from "./_components/NavTabs";
import Banner from "@/components/common/Banner";
import b1 from "@/assets/b1.png";
import Plans from "./_components/Plans";
import { ProductSpotlight } from "./_components/ProductSpotlight";
import { TwoColumnPromo } from "./_components/TwoColumnPromo";
import { FAQS } from "./_components/FAQS";
import b2 from "@/assets/b2.png";
import { SplitBanner } from "@/components/common/SplitBanner";
import ExclusiveBenefits from "./_components/ExclusiveBenefits";
import Coverage from "./_components/Coverage";
import ReadyToSwitch from "./_components/ReadyToSwitch";
import Link from "next/link";

export default function PrepaidPlansPage() {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 space-y-10 lg:space-y-14 xl:space-y-20">
      <NavTabs />
      <Banner
        bannerBg={b1}
        title="Unlimited 5G. No Speed Caps"
        description="Get Unlimited 5G data on America’s Best Network for $45/mo. with AutoPay. Plus, our prices are backed by our 5-year price guarantee."
      >
        <Link href="/prepaid-phone-plans" className="primary_btn md:!px-10">
          Switch Now
        </Link>
      </Banner>
      <Plans />
      <SplitBanner
        title="Catch every call, text, and match with the U.S. Pass eSIM."
        description="Get talk, text, and 5G data to share every moment of your trip across
          the U.S., Mexico and Canada. You're covered with T-Mobile."
        img={b2}
        btn_text="Check out plans"
        btn_url="/checkout-plans"
      />
      <ProductSpotlight />
      <TwoColumnPromo />
      <ExclusiveBenefits />
      <Coverage />
      <FAQS title="FAQs" />
      <ReadyToSwitch />
    </section>
  );
}

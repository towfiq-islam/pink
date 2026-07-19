import Banner from "@/components/common/Banner";
import React from "react";
import bannerBg from "@/assets/n1.png";
import SectionTitle from "@/components/common/SectionTitle";
import { TwoColumnPromo } from "../prepaid-plan/_components/TwoColumnPromo";
import Coverage from "../prepaid-plan/_components/Coverage";
import ReadyToSwitch from "../prepaid-plan/_components/ReadyToSwitch";

const page = () => {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 md:pb-20 space-y-10 lg:space-y-14 xl:space-y-20">
      <Banner
        bannerBg={bannerBg}
        title="Connect to the America's Best Network in the U.S. while you visit."
        description="T-Mobile has the best Mobile Network in the U.S., according to Ookla Speed test. It's easy. Just download the T-Mobile Prepaid eSIM app to get started."
      />

      <div>
        <SectionTitle title="Get 30 days of Unlimited talk, text, and data starting at just $50." />
        <TwoColumnPromo />
      </div>

      <Coverage />
      <ReadyToSwitch />
    </section>
  );
};

export default page;

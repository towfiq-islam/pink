import Banner from "@/components/common/Banner";
import React from "react";
import bannerBg from "@/assets/phoneBg.png";
import connect from "@/assets/connect.png";
import SectionTitle from "@/components/common/SectionTitle";
import Pricing from "../voip/_components/Pricing";
import Coverage from "../prepaid-plan/_components/Coverage";
import ExclusiveBenefits from "../prepaid-plan/_components/ExclusiveBenefits";
import { FAQS } from "../prepaid-plan/_components/FAQS";

const page = () => {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 md:pb-20 space-y-10 lg:space-y-14 xl:space-y-20">
      <Banner
        bannerBg={bannerBg}
        title="Stay connected across borders With one pass on T-Mobile Prepaid."
        description="Score talk, text, and 5G data that works in the U.S., Mexico, and Canada without switching plans, so you can pull up your tickets at the gate no matter which side of the border you’re on."
      >
        <button className="primary_btn md:!px-10">Check out plans</button>
      </Banner>
      <SectionTitle
        title="Exclusive benefits. Unforgettable experiences."
        description="Discover premium advantages and curated experiences that reward your loyalty every step of the way."
      />
      <Pricing facts={true} />
      <Coverage />
      <ExclusiveBenefits />
      <Banner
        bannerBg={connect}
        title="Connect in minutes in the eSIM app."
        description="Get the T-Mobile Prepaid eSIM app, purchase your U.S. Pass eSIM plan, and activate your phone. Activation happens instantly, so only purchase when you’ve landed."
      >
        <div className="flex gap-3 items-center">
          <button className="primary_btn md:!px-10">Play store</button>
          <button className="secondary_btn">App Store</button>
        </div>
      </Banner>
      <FAQS title="Got questions?" />
    </section>
  );
};

export default page;

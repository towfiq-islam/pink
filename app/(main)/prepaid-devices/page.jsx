import Banner from "@/components/common/Banner";
import React from "react";
import bannerBg from "@/assets/feature.png";

const page = () => {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 md:pb-20 space-y-10 lg:space-y-14 xl:space-y-20">
      <Banner
        bannerBg={bannerBg}
        title="5G data plans for all your devices."
        description="Stay connected with prepaid data on your tablet and hotspot devices. No annual contracts. No credit checks."
      />
    </section>
  );
};

export default page;

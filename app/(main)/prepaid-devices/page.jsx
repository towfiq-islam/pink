"use client";
import Banner from "@/components/common/Banner";
import React from "react";
import bannerBg from "@/assets/feature.png";
import ViewPlans from "./_components/ViewPlans";
import SectionTitle from "@/components/common/SectionTitle";
import ReasonCard from "@/components/common/ReasonCard";
import a1 from "@/assets/a1.png";
import a2 from "@/assets/a2.png";
import a3 from "@/assets/a3.png";
import i1 from "@/assets/i1.png";
import i2 from "@/assets/i2.png";
import Image from "next/image";
import { FAQS } from "../prepaid-plan/_components/FAQS";
import Link from "next/link";
const REASONS = [
  {
    icon: a1,
    title: "15% off all Hilton brands and an upgrade to Hilton Honors Silver.",
    desc: "Enjoy crystal-clear calls with enterprise-grade audio.",
  },
  {
    icon: a2,
    title: "Return your rental car without refueling it.",
    desc: "Stay connected from anywhere.",
  },
  {
    icon: a3,
    title: "Get $0.10 off per gallon with complimentary Gold Status.",
    desc: "Call over 100+ countries at affordable rates.",
  },
];
const Packs = [
  {
    icon: i1,
    title: "Ready to get started?",
    desc: "Keep the device you love.",
  },
  {
    icon: i2,
    title: "Shop tablets & hotspot.",
    desc: "Browse the latest devices.",
  },
];

const page = () => {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 md:pb-20 space-y-10 lg:space-y-14 xl:space-y-20">
      <Banner
        bannerBg={bannerBg}
        title="5G data plans for all your devices."
        description="Stay connected with prepaid data on your tablet and hotspot devices. No annual contracts. No credit checks."
      />
      <ViewPlans btn_url="/all-prepaid-data-plan" btn_text="Get Started" />

      <div>
        <SectionTitle title="Data rate plans come with great benefits." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-7">
          {REASONS?.map(reason => (
            <ReasonCard key={reason?.title} reason={reason} isBigger={true} />
          ))}
        </div>
      </div>

      <div className="px-5 py-10 bg-[#6A6A6A]/5 rounded-2xl">
        <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-900 mb-5 xl:mb-7">
          Ready to get started?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {Packs?.map(pack => (
            <div
              key={pack?.title}
              className="rounded-xl overflow-hidden border border-gray-100 text-center group duration-300 transition-all"
            >
              <Image
                src={pack?.icon}
                alt="thumbnail"
                width={105}
                height={50}
                className="object-contain mx-auto"
              />
              <h3 className={`font-semibold md:text-lg mt-5 mb-2`}>
                {pack?.title}
              </h3>
              <p className="text-[15px] text-gray-600 font-medium">
                {pack?.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 md:px-5 py-7 md:py-10 bg-[#D2D7DA]/20 rounded-2xl">
        <SectionTitle
          title="Get in touch with us."
          description="We are here to help."
        />
        <p className="p-5 rounded-2xl border border-gray-300 w-fit mx-auto flex flex-col gap-3 -mt-3">
          <span className="font-medium">Call-2540 52545 14545</span>
          <Link href="/" className="primary_btn w-fit mx-auto block">
            Find a store
          </Link>
        </p>
      </div>

      <div className="px-3 md:px-5 py-7 md:py-10 bg-[#D2D7DA]/20 rounded-2xl">
        <SectionTitle
          title="Looking for a phone plan?"
          description="Find a prepaid plan that fits your needs"
        />
        <Link href="/" className="primary_btn w-fit mx-auto block md:-mt-3">
          Compare plans
        </Link>
      </div>

      <FAQS title="Got Questions?" />
    </section>
  );
};

export default page;

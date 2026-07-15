"use client";
import { FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import { NavTabs } from "./_components/NavTabs";
import Banner from "@/components/common/Banner";
import b1 from "@/assets/b1.png";
import Plans from "./_components/Plans";
import { ESimPromo } from "./_components/ESimPromo";
import { ProductSpotlight } from "./_components/ProductSpotlight";
import { TwoColumnPromo } from "./_components/TwoColumnPromo";
import p1 from "@/assets/p1.png";
import p2 from "@/assets/p2.png";
import p3 from "@/assets/p3.png";
import p4 from "@/assets/p4.png";
import world from "@/assets/world.png";
import ReasonCard from "@/components/common/ReasonCard";
import Image from "next/image";
import { FAQS } from "./_components/FAQS";
const REASONS = [
  {
    icon: p1,
    title: "HD Voice Quality",
    desc: "Enjoy crystal-clear calls with enterprise-grade audio.",
  },
  {
    icon: p2,
    title: "Mobile & Desktop Apps",
    desc: "Stay connected from anywhere.",
  },
  {
    icon: p3,
    title: "Worldwide Coverage",
    desc: "Call over 100+ countries at affordable rates.",
  },
  {
    icon: p4,
    title: "Secure & Reliable",
    desc: "99.99% uptime with encrypted communication.",
  },
];

export default function PrepaidPlansPage() {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 space-y-10 lg:space-y-14 xl:space-y-20">
      <NavTabs />
      <Banner
        bannerBg={b1}
        title="Unlimited 5G. No Speed Caps"
        description="Get Unlimited 5G data on America’s Best Network for $45/mo. with AutoPay. Plus, our prices are backed by our 5-year price guarantee."
      >
        <button className="primary_btn md:!px-10">Switch Now</button>
      </Banner>
      <Plans />
      <ESimPromo />
      <ProductSpotlight />
      <TwoColumnPromo />
      <div>
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-900 mb-3 xl:mb-5">
          Exclusive benefits. Unforgettable experiences.
        </h2>

        <p className="text-center text-gray-500 text-sm md:text-base xl:text-lg font-medium max-w-5xl mx-auto mb-8">
          Discover premium advantages and curated experiences that reward your
          loyalty every step of the way.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REASONS?.map(reason => (
            <ReasonCard key={reason?.title} reason={reason} />
          ))}
        </div>
      </div>

      <div className="container relative bg-black rounded-2xl overflow-hidden grid sm:grid-cols-2 items-center">
        <div className="px-2 md:px-5 py-10 md:py-16">
          <h3 className="text-white text-xl sm:text-2xl font-semibold leading-9 max-w-md mb-4">
            Experience America&apos;s largest and fastest 5G network.
          </h3>
          <p className="text-white/80 mb-7 max-w-md">
            Unlimited high-speed data plans that include 5G at no extra cost—all
            on the T-Mobile nationwide network.
          </p>

          <button className="inline-flex items-center gap-2 border border-white/80 px-5 py-3 cursor-pointer rounded-full text-white text-sm font-semibold hover:text-primary-pink transition duration-300 hover:border-primary-pink">
            Check coverage
            <FiArrowRight size={16} />
          </button>
        </div>

        <div className="relative h-48 sm:h-64 opacity-80">
          <Image src={world} alt="map" />
        </div>
      </div>

      <FAQS />

      <div className="bg-gray-50 -mt-3 rounded-2xl p-5 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-primary-pink text-lg font-semibold mb-2">
            Ready to switch?
          </p>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
            <FiPhone size={14} className="shrink-0" />
            Call 800-375-1126 or visit a T-Mobile store near you.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-sm font-semibold px-5 2xl:px-7 py-2.5 2xl:py-3.5 rounded-2xl hover:border-gray-400 transition cursor-pointer">
            <FiMapPin size={14} />
            Find a store
          </button>

          <button className="primary_btn">Shop Tablets</button>
        </div>
      </div>
    </section>
  );
}

import Banner from "@/components/common/Banner";
import React from "react";
import bannerBg from "@/assets/benefit.png";
import SectionTitle from "@/components/common/SectionTitle";
import ReasonCard from "@/components/common/ReasonCard";
import a1 from "@/assets/a1.png";
import a2 from "@/assets/a2.png";
import a3 from "@/assets/a3.png";
import a4 from "@/assets/a4.png";
import a5 from "@/assets/a5.png";
import a6 from "@/assets/a6.png";
import b6 from "@/assets/ban.png";
import b7 from "@/assets/b7.png";
import f1 from "@/assets/f1.png";
import f2 from "@/assets/f2.png";
import f3 from "@/assets/f3.png";
import f4 from "@/assets/f4.png";
import { SplitBanner } from "@/components/common/SplitBanner";
import ReadyToSwitch from "../prepaid-plan/_components/ReadyToSwitch";
import Image from "next/image";

const Packs = [
  {
    icon: f1,
    title: "15% off all Hilton brands and an upgrade to Hilton Honors Silver.",
    desc: "Enjoy crystal-clear calls with enterprise-grade audio.",
  },
  {
    icon: f2,
    title: "Return your rental car without refueling it.",
    desc: "Stay connected from anywhere.",
  },
  {
    icon: f3,
    title: "Get $0.10 off per gallon with complimentary Gold Status.",
    desc: "Call over 100+ countries at affordable rates.",
  },
  {
    icon: f4,
    title: "$5 movie tickets.",
    desc: "Enjoy crystal-clear calls with enterprise-grade audio.",
  },
];

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
  {
    icon: a4,
    title: "$5 movie tickets.",
    desc: "Enjoy crystal-clear calls with enterprise-grade audio.",
  },
  {
    icon: a5,
    title: "Save 25% on tickets for select shows.",
    desc: "Stay connected from anywhere.",
  },
  {
    icon: a6,
    title: "Score tickets to the hottest shows.",
    desc: "Call over 100+ countries at affordable rates.",
  },
];

const page = () => {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 md:pb-20 space-y-10 lg:space-y-14 xl:space-y-20">
      <Banner
        bannerBg={bannerBg}
        title="It’s better over here."
        description="With T-Mobile Prepaid, you’re more than a customer—you’re a member with Magenta Status from day one. Experience amazing value, next-level connectivity, and access to exclusive benefits you can’t get anywhere else. All with a lifetime of savings. Just download the T-Life app."
      >
        <button className="primary_btn !px-10">Play store</button>
        <button className="secondary_btn">App store</button>
      </Banner>

      <div>
        <SectionTitle title="Benefits from departure to arrival." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-7">
          {REASONS?.slice(0, 3)?.map(reason => (
            <ReasonCard key={reason?.title} reason={reason} isBigger={true} />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle title="Your entertainment, up a notch." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-7">
          {REASONS?.slice(3, 6)?.map(reason => (
            <ReasonCard key={reason?.title} reason={reason} isBigger={true} />
          ))}
        </div>
      </div>

      <SplitBanner
        title="Get more free stuff and great deals."
        sub_title="T-MOBILE TUESDAYS"
        description="Since 2016, we’ve given over a billion thankings—and we won’t stop. We’ve redefined customer appreciation with T-Mobile Tuesdays, offering exclusive perks every week. And we’re always adding new stuff from brands you love and use every day."
        img={b7}
        direction="right"
        has_btn={false}
      />

      <div>
        <SectionTitle title="Plans packed with all the things you love." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-5">
          {Packs?.map(pack => (
            <div
              key={pack?.title}
              className="rounded-xl overflow-hidden border border-gray-100 text-center space-y-5 py-14 px-8 bg-[#6A6A6A]/20 group duration-300 transition-all"
            >
              <Image
                src={pack?.icon}
                alt="thumbnail"
                width={105}
                height={50}
                className="object-contain mx-auto"
              />
              <h3 className={`font-semibold md:text-lg`}>{pack?.title}</h3>
              <p className="text-[15px] text-gray-600 font-medium mt-1">
                {pack?.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SplitBanner
        title="Get a 5G phone On Us when you move to T-Mobile."
        description="New phone. More exclusive benefits. America's Best Network. Just make on-time payments for 12 months with T-Mobile Prepaid and pay SO down on select 5G phones when you move to T-Mobile."
        img={b6}
        btn_text="Check it out"
        btn_url="/"
      />
      <ReadyToSwitch />
    </section>
  );
};

export default page;

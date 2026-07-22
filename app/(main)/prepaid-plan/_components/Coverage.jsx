import React from "react";
import world from "@/assets/world.png";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const Coverage = () => {
  return (
    <div className="relative bg-black rounded-2xl overflow-hidden grid sm:grid-cols-2 items-center">
      <div className="px-5 md:px-10 lg:px-16 py-10 md:py-16">
        <h3 className="text-white text-xl sm:text-2xl font-semibold leading-9 max-w-md mb-4">
          Experience America&apos;s largest and fastest 5G network.
        </h3>
        <p className="text-white/80 mb-7 max-w-md">
          Unlimited high-speed data plans that include 5G at no extra cost—all
          on the T-Mobile nationwide network.
        </p>

        {/* <button className="inline-flex items-center gap-2 border border-white/80 px-5 py-3 cursor-pointer rounded-full text-white text-sm font-semibold hover:text-primary-pink transition duration-300 hover:border-primary-pink">
          Check coverage
          <FiArrowRight size={16} />
        </button> */}
      </div>

      <div className="relative h-48 sm:h-64 opacity-80">
        <Image src={world} alt="map" />
      </div>
    </div>
  );
};

export default Coverage;

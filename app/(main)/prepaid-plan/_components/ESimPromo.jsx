import Image from "next/image";
import b2 from "@/assets/b2.png";

export function ESimPromo() {
  return (
    <div className="grid sm:grid-cols-2 gap-7 lg:gap-10 items-center bg-[#6A6A6A]/4 rounded-2xl p-4">
      <Image
        src={b2}
        alt="eSIM card"
        className="w-full h-56 sm:h-full object-cover rounded-xl sm:rounded-none"
      />

      <div className="sm:pr-10">
        <h3 className="text-xl lg:text-2xl xl:text-4xl font-semibold xl:leading-11 text-gray-800 mb-3">
          Catch every call, text, and match with the U.S. Pass eSIM.
        </h3>

        <p className="text-gray-500 font-medium text-[15px] lg:text-base mb-5">
          Get talk, text, and 5G data to share every moment of your trip across
          the U.S., Mexico and Canada. You&apos;re covered with T-Mobile.
        </p>
        <button className="primary_btn">Check out plans</button>
      </div>
    </div>
  );
}

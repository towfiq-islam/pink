import Image from "next/image";
import b3 from "@/assets/b3.png";

export function ProductSpotlight() {
  return (
    <div className="flex gap-10 items-center bg-[#6A6A6A]/4 rounded-2xl p-4">
      <div className="relative shrink-0">
        <Image
          src={b3}
          alt="iPhone 17 Pro"
          className="w-fit h-72 sm:h-96 object-cover rounded-2xl"
        />
      </div>

      <div>
        <p className="md:text-lg xl:text-xl font-semibold tracking-wide text-primary-pink">
          Apple
        </p>
        <h3 className="mt-3 mb-2 md:mb-3 xl:mb-5 text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-10">
          The Most Powerful and Advanced iPhone Ever Created for Professionals
          and Everyday Users
        </h3>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-500 font-medium mb-5">
          Whether you&apos;re capturing breathtaking photos, creating cinematic
          videos, gaming at peak performance, or staying productive throughout
          the day, the iPhone 17 Pro is engineered to exceed every expectation.
        </p>
        <button className="primary_btn">Ship in store</button>
      </div>
    </div>
  );
}

import Image from "next/image";

export function SplitBanner({ title, description, img }) {
  return (
    <div className="grid sm:grid-cols-2 gap-7 lg:gap-10 items-center bg-[#6A6A6A]/4 rounded-2xl p-4">
      <figure className="w-full h-92 relative">
        <Image
          src={img}
          alt="banner"
          fill
          className="w-full h-full object-cover rounded-xl"
        />
      </figure>

      <div className="sm:pr-10">
        <h3 className="text-xl lg:text-2xl xl:text-4xl font-semibold xl:leading-11 text-gray-800 mb-3">
          {title}
        </h3>

        <p className="text-gray-500 font-medium text-[15px] lg:text-base mb-5">
          {description}
        </p>
        <button className="primary_btn">Check out plans</button>
      </div>
    </div>
  );
}

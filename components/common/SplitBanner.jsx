import Image from "next/image";
import Link from "next/link";

export function SplitBanner({
  title,
  description,
  img,
  btn_text,
  btn_url,
  direction = "left",
}) {
  return (
    <div
      className={`flex gap-5 md:gap-7 lg:gap-10 items-center bg-[#6A6A6A]/4 rounded-2xl p-4 ${direction === "left" ? "flex-col lg:flex-row" : "flex-col lg:flex-row-reverse"}`}
    >
      <figure className="w-full h-92 relative flex-1">
        <Image
          src={img}
          alt="banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </figure>

      <div
        className={`flex-1 ${direction === "left" ? "sm:pr-10" : "sm:ps-5"}`}
      >
        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-semibold xl:leading-11 text-gray-800 mb-2 md:mb-3">
          {title}
        </h3>

        <p className="text-gray-500 font-medium text-[15px] lg:text-base mb-5">
          {description}
        </p>

        <Link href={btn_url} className="primary_btn">
          {btn_text}
        </Link>
      </div>
    </div>
  );
}

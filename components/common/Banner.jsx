import Image from "next/image";

export default function Banner({ bannerBg, title, description, children }) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-85 md:h-90 lg:h-105 flex items-center justify-center text-center  lg:px-28">
      <Image
        src={bannerBg}
        alt="banner"
        fill
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 px-6">
        <h1 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight max-w-4xl mx-auto">
          {title}
        </h1>
        <p className="text-white/80 font-medium mt-4 text-sm md:text-[17px]">
          {description}
        </p>
        <div className="flex items-center justify-center gap-3 md:gap-5 mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

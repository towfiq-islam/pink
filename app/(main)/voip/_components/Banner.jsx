import bannerBg from "@/assets/phoneBg.png";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="container pt-6">
      <div className="font-medium text-sm text-gray-400 mb-5">
        <span>Home</span>
        <span className="mx-1">/</span>
        <span className="text-primary-pink font-semibold">Phone Plans</span>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-105 flex items-center justify-center text-center">
        <Image
          src={bannerBg}
          alt="banner"
          fill
          className="absolute inset-0 w-full h-full"
        />

        <div className="relative z-10 px-6">
          <h1 className="text-white text-3xl xl:text-4xl font-semibold leading-tight">
            Crystal-Clear VoIP Calling for Home &amp; Business
          </h1>

          <p className="text-white/80 mt-4">
            Affordable cloud-based phone services with unlimited calling, HD
            voice quality, virtual numbers, and advanced business features.
          </p>

          <div className="flex items-center justify-center gap-5 mt-6">
            <button className="primary_btn !px-10">Get Started</button>
            <button className="secondary_btn">View Plans</button>
          </div>
        </div>
      </div>
    </section>
  );
}

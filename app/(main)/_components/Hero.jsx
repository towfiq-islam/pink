import Image from "next/image";
import hero from "@/assets/hero.png";

export function Hero() {
  return (
    <section className="container pt-16">
      <div className="mx-auto max-w-6xl grid grid-cols-1 items-center rounded-2xl border border-gray-100 shadow p-8 md:grid-cols-2">
        <figure className="relative">
          <Image src={hero} alt="hero" className="object-contain" />
        </figure>

        <div>
          <p className="text-xl font-semibold tracking-wide text-gray-600">
            Apple
          </p>

          <h1 className="mt-3 mb-5 text-3xl font-semibold text-gray-900 md:text-5xl">
            iPhone 17 Pro On Us
          </h1>

          <p className="text-xl leading-relaxed text-gray-500 font-medium">
            Get the ultimate Pro when you switch to Pink Mobile and bring your
            number on an Experience More or Experience Beyond plan.
          </p>

          <button className="mt-5 primary_btn">Shop Now</button>
        </div>
      </div>
    </section>
  );
}

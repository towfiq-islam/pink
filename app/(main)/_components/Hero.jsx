import Image from "next/image";
import hero from "@/assets/hero.png";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container pt-9 md:pt-12 xl:pt-16">
      <div className="mx-auto max-w-6xl grid grid-cols-1 items-center rounded-2xl border border-gray-100 shadow p-4 md:p-5 xl:p-8 md:grid-cols-2">
        <figure className="relative">
          <Image src={hero} alt="hero" className="object-contain" />
        </figure>

        <div>
          <p className="md:text-lg xl:text-xl font-semibold tracking-wide text-gray-600">
            Apple
          </p>

          <h1 className="mt-3 mb-2 md:mb-3 xl:mb-5 text-xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold text-gray-900">
            iPhone 17 Pro On Us
          </h1>

          <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-500 font-medium">
            Get the ultimate Pro when you switch to Pink Mobile and bring your
            number on an Experience More or Experience Beyond plan.
          </p>

          <Link href={`/product-details/1`} className="mt-5 primary_btn block w-fit">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

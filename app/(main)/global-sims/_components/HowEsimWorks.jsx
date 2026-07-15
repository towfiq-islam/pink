import phoneBg from "@/assets/mobile.png";
import Image from "next/image";

export function HowEsimWorks() {
  return (
    <section className="container pt-16 xl:pt-22 pb-20 xl:pb-28 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="font-semibold mb-2 text-primary-pink">eSIM APP</p>
        <h2 className="text-3xl xl:text-4xl font-semibold mb-8 xl:mb-12">How Our eSIM Works?</h2>

        <div className="grid md:grid-cols-2 gap-20 items-center text-left">
          <p className="text-lg xl:text-xl font-medium text-center text-gray-500 leading-relaxed">
            First, you&apos;ll need to purchase your eSIM from our website. Once
            the purchase is complete, a QR code will be provided instantly.
            Simply scan the QR code using your mobile device, and your eSIM will
            be activated and connected to your phone within minutes.
          </p>

          <figure className="flex justify-center md:justify-start">
            <Image src={phoneBg} alt="phone" />
          </figure>
        </div>
      </div>
    </section>
  );
}

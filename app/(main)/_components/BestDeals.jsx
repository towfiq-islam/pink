import s1 from "@/assets/s1.png";
import s2 from "@/assets/s2.png";
import s3 from "@/assets/s3.png";
import Image from "next/image";
import Link from "next/link";

const DEALS = [
  {
    brand: "Apple",
    title: "iPhone 17—Get 4 On Us Plus, 4 lines for $25/line/mo.",
    copy: "More delightful. More durable. Yours when you trade in an eligible phone and add qualifying lines on our Essentials promo plan. With 24 monthly bill credits.",
    img: s1,
  },
  {
    brand: "Apple",
    title: "iPhone 15 pro—Get 4 On Us Plus, 4 lines for $25/line/mo.",
    copy: "More delightful. More durable. Yours when you trade in an eligible phone and add qualifying lines on our Essentials promo plan. With 24 monthly bill credits.",
    img: s2,
  },
  {
    brand: "Apple",
    title: "iPhone 17—Get 4 On Us Plus, 4 lines for $25/line/mo.",
    copy: "More delightful. More durable. Yours when you trade in an eligible phone and add qualifying lines on our Essentials promo plan. With 24 monthly bill credits.",
    img: s3,
  },
];

export function BestDeals() {
  return (
    <section className="container py-7 md:py-10 xl:py-14">
      <div className="mx-auto max-w-6xl ">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold text-gray-900">
          Shop our best deals
        </h2>

        <div className="mt-3 xl:mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEALS.map((deal, i) => (
            <Link
              key={i}
              href={`/product-details/1`}
              className="rounded-2xl border border-gray-100 duration-300 transition hover:border-primary-pink/30 hover:bg-pink-50/20 shadow p-4 md:p-5"
            >
              <p className="font-semibold text-gray-700">{deal?.brand}</p>
              <h3 className="mt-2 text-lg md:text-xl xl:text-2xl font-semibold leading-snug text-gray-800">
                {deal?.title}
              </h3>
              <p className="mt-5 text-sm md:text-[15px] leading-relaxed text-gray-500">
                {deal.copy}
              </p>
              <div className="mt-5 flex items-end justify-center gap-2">
                <Image src={deal?.img} alt={deal?.brand} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

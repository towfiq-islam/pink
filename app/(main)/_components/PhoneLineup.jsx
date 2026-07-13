import { TbShoppingBag } from "react-icons/tb";
import s4 from "@/assets/s4.png";
import s5 from "@/assets/s5.png";
import Image from "next/image";

const PHONES = [
  {
    name: "iPhone 17 Pro Max",
    tagline: "Built for Apple Intelligence",
    swatches: ["#c8c8c8", "#2b2b2b", "#e07a2c"],
    priceFull: "50.00",
    priceMonthly: "4.16",
    total: "1199999",
    img: s4,
  },
  {
    name: "iPhone 17 Pro Max",
    tagline: "Built for Apple Intelligence",
    swatches: ["#c8c8c8", "#2b2b2b", "#e07a2c"],
    priceFull: "50.00",
    priceMonthly: "4.16",
    total: "1199999",
    img: s4,
  },
  {
    name: "iPhone 15 Pro Max",
    tagline: "Built for Apple Intelligence",
    swatches: ["#c8c8c8", "#2b2b2b", "#e07a2c"],
    priceFull: "50.00",
    priceMonthly: "4.16",
    total: "1199999",
    img: s5,
  },
];

export function PhoneLineup() {
  return (
    <section className="container">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold text-gray-900">Phone</h2>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PHONES?.map((phone, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 shadow p-5 flex gap-5 items-center"
            >
              <figure className="shrink-0">
                <Image
                  src={phone?.img}
                  width={74}
                  height={119}
                  alt={phone?.name}
                />
              </figure>
              <div>
                <p className="font-semibold text-gray-900">{phone.name}</p>
                <p className="text-sm mt-0.5 text-gray-400">{phone.tagline}</p>

                <div className="mt-2 flex gap-1.5 border-b pb-3 border-gray-100">
                  {phone.swatches.map((c, idx) => (
                    <button
                      key={idx}
                      className="size-5 rounded-full cursor-pointer"
                      style={{ backgroundColor: c }}
                      aria-hidden
                    />
                  ))}
                </div>

                <p className="mt-3 font-semibold text-gray-700">
                  Starting at ${phone.priceFull} ${phone.priceMonthly}/month for
                  24 months
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  $0.00 down + tax due today
                </p>
                <p className="text-xs text-gray-400">
                  Full price: ${phone.total}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <button className="flex-1 rounded-2xl bg-primary-pink px-7 cursor-pointer py-2.5 font-medium text-white transition-all duration-300">
                    Shop Now
                  </button>

                  <button
                    aria-label="Add to bag"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-600 hover:border-pink-300 hover:text-white hover:bg-primary-pink text-xl cursor-pointer bg-gray-200"
                  >
                    <TbShoppingBag />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

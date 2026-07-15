import s4 from "@/assets/s4.png";
import s5 from "@/assets/s5.png";
import Product from "@/components/common/Product";
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
        <h2 className="text-2xl xl:text-3xl font-semibold text-gray-900">
          Phone
        </h2>

        <div className="mt-3 xl:mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PHONES?.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

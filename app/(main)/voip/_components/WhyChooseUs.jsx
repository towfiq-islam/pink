import p1 from "@/assets/p1.png";
import p2 from "@/assets/p2.png";
import p3 from "@/assets/p3.png";
import p4 from "@/assets/p4.png";
import Image from "next/image";

const REASONS = [
  {
    icon: p1,
    title: "HD Voice Quality",
    desc: "Enjoy crystal-clear calls with enterprise-grade audio.",
  },
  {
    icon: p2,
    title: "Mobile & Desktop Apps",
    desc: "Stay connected from anywhere.",
  },
  {
    icon: p3,
    title: "Worldwide Coverage",
    desc: "Call over 100+ countries at affordable rates.",
  },
  {
    icon: p4,
    title: "Secure & Reliable",
    desc: "99.99% uptime with encrypted communication.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container mt-14 xl:mt-20 mb-16 xl:mb-22">
      <h2 className="text-center text-2xl xl:text-3xl font-semibold mb-8">
        Why Customers love our VoIP
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {REASONS?.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="rounded-xl overflow-hidden border border-gray-100 p-2.5 bg-[#6A6A6A]/5 group duration-300 transition-all"
          >
            <figure className="h-50 xl:h-58 2xl:h-64 flex items-center justify-center relative rounded-lg overflow-hidden">
              <Image
                src={icon}
                alt="thumbnail"
                fill
                className="w-full h-full object-cover rounded-lg group-hover:scale-[1.05] duration-500 transition-transform"
              />
            </figure>

            <div className="mt-3 px-1">
              <p className="font-semibold">{title}</p>
              <p className="text-[15px] text-gray-500 mt-1">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import p1 from "@/assets/p1.png";
import p2 from "@/assets/p2.png";
import p3 from "@/assets/p3.png";
import p4 from "@/assets/p4.png";
import ReasonCard from "@/components/common/ReasonCard";
import SectionTitle from "@/components/common/SectionTitle";

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
    <section className="container mt-8 md:mt-14 xl:mt-20 mb-10 md:mb-16 xl:mb-22">
      <SectionTitle title="Why Customers love our VoIP" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {REASONS?.map(reason => (
          <ReasonCard key={reason?.title} reason={reason} />
        ))}
      </div>
    </section>
  );
}

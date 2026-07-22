import Image from "next/image";
import b4 from "@/assets/b4.png";
import b5 from "@/assets/b5.png";
import Link from "next/link";

const PROMO_CARDS = [
  {
    image: b4,
    alt: "Desk setup with monitor",
    title: "Save $5/mo. with AutoPay.",
    body: "Sign up for one of our Monthly plans to save $5/mo. With AutoPay, just choose AutoPay at checkout.",
    cta: "Shop Plan",
    url: "/checkout-plans",
  },
  {
    image: b5,
    alt: "Person checking phone",
    title: "Keep your phone and everything in it.",
    body: "Save your contacts, messages, and photos. Just check if your phone is compatible with the T-Mobile network.",
    cta: "Check compatibility",
    url: "check-compatibility",
  },
];

export function TwoColumnPromo() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {PROMO_CARDS.map(card => (
        <div key={card.title}>
          <Image
            src={card.image}
            alt={card.alt}
            className="w-full h-74 object-cover rounded-2xl mb-5"
          />
          <h4 className="font-semibold text-lg md:text-xl text-gray-800 mb-2">
            {card.title}
          </h4>
          <p className="text-gray-500 text-sm md:text-base font-medium mb-3 md:mb-4">
            {card.body}
          </p>
          <Link href={card?.url} className="primary_btn">
            {card.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}

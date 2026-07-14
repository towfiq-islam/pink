import React from "react";
import { TbShoppingBag } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <Link
      href={`/product-details/1`}
      className="rounded-2xl border border-gray-100 shadow p-5 flex gap-5 items-center group hover:bg-pink-50/30 hover:border-primary-pink hover:scale-[1.02] duration-300 transition-all"
    >
      {/* Left */}
      <figure className="shrink-0">
        <Image src={product?.img} width={74} height={119} alt={product?.name} />
      </figure>

      {/* Right */}
      <div>
        <p className="font-semibold text-gray-900 group-hover:underline">
          {product.name}
        </p>
        <p className="text-sm mt-0.5 text-gray-400">{product.tagline}</p>

        <div className="mt-2 flex gap-1.5 border-b pb-3 border-gray-100">
          {product.swatches.map((c, idx) => (
            <button
              key={idx}
              className="size-5 rounded-full cursor-pointer"
              style={{ backgroundColor: c }}
              aria-hidden
            />
          ))}
        </div>

        <p className="mt-3 font-semibold text-gray-700">
          Starting at ${product.priceFull} ${product.priceMonthly}/month for 24
          months
        </p>

        <p className="mt-1 text-sm text-gray-400">$0.00 down + tax due today</p>
        <p className="text-xs text-gray-400">Full price: ${product.total}</p>

        <div className="mt-5 flex items-center gap-3">
          <button className="flex-1 primary_btn !py-2.5">Shop Now</button>

          <button
            aria-label="Add to bag"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-600 hover:border-pink-300 hover:text-white hover:bg-primary-pink text-xl cursor-pointer bg-gray-200"
          >
            <TbShoppingBag />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;

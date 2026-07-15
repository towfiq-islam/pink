"use client";
import React, { useState } from "react";
import Image from "next/image";

const thumbnails = [
  { id: 1, src: "https://picsum.photos/seed/iphone-back/600/800" },
  { id: 2, src: "https://picsum.photos/seed/iphone-side/600/800" },
  { id: 3, src: "https://picsum.photos/seed/iphone-accessory/600/800" },
  { id: 4, src: "https://picsum.photos/seed/iphone-front/600/800" },
];

const ProductGallery = () => {
  const [selectedThumb, setSelectedThumb] = useState(1);
  const activeImage =
    thumbnails.find(t => t.id === selectedThumb) || thumbnails[0];

  return (
    <div>
      <nav className="text-sm text-gray-400 font-medium mb-3 flex items-center gap-1">
        <span>Phones</span>
        <span>/</span>
        <span>Apple</span>
        <span>/</span>
        <span className="text-primary-pink font-semibold">
          iPhone 17 Pro Max
        </span>
      </nav>

      <h1 className="text-3xl font-semibold mb-6">iPhone 17 Pro Max</h1>

      <div className="rounded-2xl bg-gray-50 flex items-center justify-center h-96 mb-4 overflow-hidden relative">
        <Image
          key={activeImage.id}
          src={activeImage?.src}
          fill
          alt="product"
          className="gallery-main-image w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {thumbnails?.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedThumb(t.id)}
            className={`h-28 cursor-pointer relative rounded-xl border overflow-hidden transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 ${
              selectedThumb === t.id
                ? "border-2 shadow-sm border-primary-pink"
                : "border-gray-200"
            }`}
          >
            <Image
              src={t.src}
              alt="product"
              fill
              className="w-full h-full object-cover transition-transform duration-200"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

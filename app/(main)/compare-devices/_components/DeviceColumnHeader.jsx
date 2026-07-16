import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const DeviceColumnHeader = ({ device, onRemove }) => {
  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-5 border-l border-gray-100">
        <button className="w-full rounded-full border border-primary-pink text-primary-pink text-xs md:text-sm font-semibold py-2.5 cursor-pointer hover:bg-pink-50 transition-colors">
          Add A Device
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-2 px-4 py-5 border-l border-gray-100">
      <button
        onClick={() => onRemove(device)}
        aria-label={`Remove ${device.name}`}
        className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 cursor-pointer"
      >
        <IoClose size={16} />
      </button>

      <figure className="w-14">
        <Image
          src={device.img}
          alt={device.name}
          width={56}
          height={90}
          className="mx-auto"
        />
      </figure>

      <div className="text-center">
        <p className="text-xs md:text-sm font-semibold text-[#212B36]">
          {device.brand}
        </p>
        <p className="text-xs text-gray-400 -mt-0.5">{device.name}</p>
      </div>

      <div className="text-center">
        <p className="text-[10px] uppercase tracking-wide text-gray-400">
          Starting At
        </p>
        <p className="text-xs md:text-sm font-semibold text-[#212B36]">
          ${device.startingPrice} + tax
        </p>
      </div>

      <Link
        href={`/product-details/${device.id}`}
        className="w-full text-center rounded-full bg-primary-pink text-white text-xs md:text-sm font-semibold py-2.5 hover:opacity-90 transition-opacity"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default DeviceColumnHeader;

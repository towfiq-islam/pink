import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const DeviceColumnHeader = ({ device, onRemove }) => {
  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 border-l border-gray-100 px-2 py-5 md:px-4">
        <button className="w-full cursor-pointer rounded-full border border-primary-pink py-2 text-[11px] font-semibold text-primary-pink transition-colors hover:bg-pink-50 md:py-2.5 md:text-sm">
          Add A Device
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-2 border-l border-gray-100 px-2 py-5 md:px-4">
      <button
        onClick={() => onRemove(device)}
        aria-label={`Remove ${device.name}`}
        className="absolute top-2 right-2 cursor-pointer text-gray-300 hover:text-gray-500"
      >
        <IoClose size={16} />
      </button>

      <figure className="w-10 md:w-14">
        <Image
          src={device.img}
          alt={device.name}
          width={56}
          height={90}
          className="mx-auto h-auto w-full"
        />
      </figure>

      <div className="text-center">
        <p className="text-[11px] font-semibold text-[#212B36] md:text-sm">
          {device.brand}
        </p>
        <p className="-mt-0.5 text-[10px] text-gray-400 md:text-xs">
          {device.name}
        </p>
      </div>

      <div className="text-center">
        <p className="text-[9px] uppercase tracking-wide text-gray-400 md:text-[10px]">
          Starting At
        </p>
        <p className="text-[11px] font-semibold text-[#212B36] md:text-sm">
          ${device.startingPrice} + tax
        </p>
      </div>

      <Link
        href={`/product-details/${device.id}`}
        className="w-full rounded-full bg-primary-pink py-2 text-center text-[11px] font-semibold text-white transition-opacity hover:opacity-90 md:py-2.5 md:text-sm"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default DeviceColumnHeader;

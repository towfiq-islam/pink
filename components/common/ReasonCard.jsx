import React from "react";
import Image from "next/image";

const ReasonCard = ({ reason }) => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 p-2.5 bg-[#6A6A6A]/5 group duration-300 transition-all">
      <figure className="h-50 xl:h-58 2xl:h-64 flex items-center justify-center relative rounded-lg overflow-hidden">
        <Image
          src={reason?.icon}
          alt="thumbnail"
          fill
          className="w-full h-full object-cover rounded-lg group-hover:scale-[1.05] duration-500 transition-transform"
        />
      </figure>

      <div className="mt-3 px-1">
        <p className="font-semibold">{reason?.title}</p>
        <p className="text-[15px] text-gray-500 mt-1">{reason?.desc}</p>
      </div>
    </div>
  );
};

export default ReasonCard;

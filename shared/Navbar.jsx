"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Global Sims", path: "/global-sims" },
  { label: "VoIP", path: "/voip" },
  { label: "Shop", path: "/shop" },
  { label: "Prepaid Plan", path: "/prepaid-plan" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <nav className="border-b border-gray-100 bg-white py-3 md:py-4 lg:py-4.5 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-wide text-[#FF69B4]"
        >
          LOGO
        </Link>

        <nav className="hidden lg:flex items-center gap-12 text-gray-600">
          {NAV_LINKS?.map(link => {
            const isActive = link?.path === pathname;
            const hasChevron = link?.label === "Prepaid Plan";

            return (
              <Link
                key={link?.label}
                href={link?.path}
                className={`flex items-center gap-1 font-semibold transition-colors hover:text-pink-600 ${
                  isActive
                    ? "font-semibold text-primary-pink"
                    : "text-[#6A6A6A]"
                }`}
              >
                {link?.label}
                {/* {hasChevron && <FaAngleDown />} */}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4">
          <button className="text-gray-700 duration-300 transition-colors hover:text-white hover:bg-primary-pink grid place-items-center size-10 md:size-11 rounded-full cursor-pointer bg-gray-100">
            <IoCartOutline className="text-2xl" />
          </button>

          <Link
            href=""
            className="rounded-xl text-sm md:text-base bg-primary-pink px-5 py-2 lg:py-2.5 active:scale-95 duration-100 transition font-medium text-white hover:bg-pink-600"
          >
            Sign In
          </Link>

          <button
            onClick={() => setOpen(!isOpen)}
            className="bg-primary-pink text-white size-8.5 md:size-10 rounded-lg grid lg:hidden place-items-center cursor-pointer"
          >
            <FaBars className="text-lg md:text-xl" />
          </button>
        </div>
      </div>

      {/* Blur Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-999 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } duration-500 transition-transform fixed top-0 z-999 left-0 bg-white p-5 lg:p-7 shadow-lg overflow-y-auto border-r border-gray-200 max-h-screen min-h-screen w-62.5 lg:hidden`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-wide text-[#FF69B4]"
        >
          LOGO
        </Link>

        {/* Links */}
        <div className="mt-5 flex flex-col gap-5 text-gray-600">
          {NAV_LINKS?.map(link => {
            const isActive = link?.path === pathname;
            const hasChevron = link?.label === "Prepaid Plan";

            return (
              <Link
                onClick={() => setOpen(false)}
                key={link?.label}
                href={link?.path}
                className={`flex items-center gap-1 font-semibold transition-colors hover:text-pink-600 ${
                  isActive
                    ? "font-semibold text-primary-pink"
                    : "text-[#6A6A6A]"
                }`}
              >
                {link?.label}
                {/* {hasChevron && <FaAngleDown />} */}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

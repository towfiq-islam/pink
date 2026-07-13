"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleDown } from "react-icons/fa6";
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

  return (
    <nav className="border-b border-gray-100 bg-white py-4.5 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-wide text-[#FF69B4]"
        >
          LOGO
        </Link>

        <nav className="hidden items-center gap-12 text-gray-600 md:flex">
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
                {hasChevron && <FaAngleDown />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-gray-700 duration-300 transition-colors hover:text-white hover:bg-primary-pink grid place-items-center size-11 rounded-full cursor-pointer bg-gray-100">
            <IoCartOutline className="text-2xl" />
          </button>

          <Link
            href=""
            className="rounded-xl bg-primary-pink px-5 py-2.5 active:scale-95 duration-100 transition font-medium text-white hover:bg-pink-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

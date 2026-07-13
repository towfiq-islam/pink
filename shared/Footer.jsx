import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Plan", path: "/plan" },
  { label: "VoIP", path: "/voip" },
  { label: "Shop", path: "/shop" },
  { label: "Global Sims", path: "/global-sims" },
  { label: "About Us", path: "/about-us" },
  { label: "Contact Us", path: "/contact-us" },
];

const Footer = () => {
  return (
    <footer className="rounded-t-3xl bg-black text-white py-10">
      <div className="container flex flex-col items-center gap-8">
        <span className="text-3xl font-semibold tracking-wide text-[#FF69B4]">
          LOGO
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-10 text-[15px] text-gray-200">
          {NAV_LINKS?.map(link => (
            <Link
              key={link?.path}
              href={link?.path}
              className="hover:text-white hover:underline"
            >
              {link?.label}
            </Link>
          ))}
        </nav>

        <div className="flex w-full flex-col items-center justify-between gap-4 text-sm text-gray-100 sm:flex-row">
          <span>Copyright 2026 © Logo</span>

          <div className="flex items-center gap-5 text-base">
            <Link
              href=""
              className="duration-100 transition hover:text-primary-pink"
            >
              <FaInstagram />
            </Link>
            <Link
              href=""
              className="duration-100 transition hover:text-primary-pink"
            >
              <BsTwitterX />
            </Link>
            <Link
              href=""
              className="duration-100 transition hover:text-primary-pink"
            >
              <FaLinkedin />
            </Link>
            <Link
              href=""
              className="duration-100 transition hover:text-primary-pink"
            >
              <FaFacebook />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

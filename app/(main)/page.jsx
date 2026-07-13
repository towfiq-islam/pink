import React from "react";
import { QuickLinks } from "./_components/QuickLinks";
import { Hero } from "./_components/Hero";
import { HomeInternetAndSims } from "./_components/HomeInternetAndSims";
import { BestDeals } from "./_components/BestDeals";
import { PhoneLineup } from "./_components/PhoneLineup";
import { Faq } from "./_components/Faq";

const page = () => {
  return (
    <>
      <QuickLinks />
      <Hero />
      <HomeInternetAndSims />
      <BestDeals />
      <PhoneLineup />
      <Faq />
    </>
  );
};

export default page;

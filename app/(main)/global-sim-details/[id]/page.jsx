"use client";
import React from "react";
import { NetworkCard } from "../_components/NetworkCard";
import DataTabs from "../_components/DataTabs";
import { HowEsimWorks } from "../../global-sims/_components/HowEsimWorks";

const Page = ({
  country = "Bangladesh",
  flagEmoji = "🇧🇩",
  onCheckCompatibility,
}) => {
  return (
    <>
      <NetworkCard
        country={country}
        flagEmoji={flagEmoji}
        onCheckCompatibility={onCheckCompatibility}
      />

      <DataTabs />
      <HowEsimWorks />
    </>
  );
};

export default Page;

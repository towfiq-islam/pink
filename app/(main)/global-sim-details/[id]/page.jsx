"use client";
import React from "react";
import { useParams } from "next/navigation";
import { NetworkCard } from "../_components/NetworkCard";
import DataTabs from "../_components/DataTabs";
import { HowEsimWorks } from "../../global-sims/_components/HowEsimWorks";
import { getCountryInfo } from "@/lib/countries";

const Page = ({ onCheckCompatibility }) => {
  const params = useParams();
  const rawId = (params?.id || "BGD").toString();
  const countryInfo = getCountryInfo(rawId);

  const country =
    countryInfo.name !== rawId ? countryInfo.name : rawId.length === 3 ? countryInfo.name : "Bangladesh";
  const flagEmoji = countryInfo.flag || "🇧🇩";

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

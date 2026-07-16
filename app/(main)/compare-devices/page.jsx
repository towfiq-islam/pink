"use client";
import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DeviceColumnHeader from "./_components/DeviceColumnHeader";
import SpecRow from "./_components/SpecRow";

const MAX_COMPARE = 3;

// TODO: replace with real data — e.g. useGetProductsByIdsQuery(ids) from shopApi
const MOCK_DEVICES = {
  1: {
    id: "1",
    brand: "Samsung",
    name: "Galaxy S26 Ultra",
    startingPrice: "1199.99",
    img: "/products/s26-ultra.png",
    offer: "$1100 off with new line and trade",
    dimension: "6.44 x 3.07 x 0.31 inches",
    weight: "7.55",
    batteryTalkTime: "Up to 32 hours",
    satelliteOptimized: "Yes",
    fiveGCapable: "No",
    camera: "Yes",
    hotspotCapable: "Yes",
    connectionsCapable:
      "802.11a/b/g/n/ac/ax/be WiFi 7, UMTS, HSDPA, HSPA+, LTE, 5G, Bluetooth 6.0",
    networkSpeed: "4G,4G LTE,5G",
  },
  2: {
    id: "2",
    brand: "Samsung",
    name: "Galaxy S26+",
    startingPrice: "1099.99",
    img: "/products/s26-plus.png",
    offer: "On Us with new line and trade",
    dimension: "6.24 x 2.98 x 0.29 inches",
    weight: "6.7",
    batteryTalkTime: "Up to 50 hours",
    satelliteOptimized: "Yes",
    fiveGCapable: "No",
    camera: "Yes",
    hotspotCapable: "Yes",
    connectionsCapable:
      "802.11a/b/g/n/ac/ax/be WiFi 7, UMTS, HSDPA, HSPA+, LTE, 5G, Bluetooth 6.0",
    networkSpeed: "4G,4G LTE,5G",
  },
};

const SPEC_CONFIG = [
  { key: "offer", label: "Offers" },
  { key: "dimension", label: "Dimension" },
  { key: "weight", label: "Weight" },
  { key: "batteryTalkTime", label: "Battery Talk Time" },
  { key: "satelliteOptimized", label: "T-Satellite optimized" },
  { key: "fiveGCapable", label: "5G Capable" },
  { key: "camera", label: "Camera" },
  { key: "hotspotCapable", label: "Mobile HotSpot Capable" },
  { key: "connectionsCapable", label: "Connections Capable" },
  { key: "networkSpeed", label: "Network Speed" },
];

const ComparePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ids = useMemo(
    () => searchParams.get("ids")?.split(",").filter(Boolean) ?? [],
    [searchParams],
  );

  // TODO: swap for real query, e.g.
  // const { data: devices = [], isLoading } = useGetProductsByIdsQuery(ids, { skip: !ids.length });
  const devices = ids.map(id => MOCK_DEVICES[id]).filter(Boolean);

  const handleRemove = device => {
    const remaining = ids.filter(id => id !== device.id);
    if (remaining.length === 0) {
      router.push("/shop");
      return;
    }
    router.push(`/compare-devices?ids=${remaining.join(",")}`);
  };

  const columns = [
    ...devices,
    ...Array.from({ length: Math.max(0, MAX_COMPARE - devices.length) }).map(
      () => null,
    ),
  ];

  return (
    <section className="container mb-10 md:mb-16">
      <div className="max-w-350 mx-auto">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mt-4 mb-4">
          <Link href="/business" className="hover:underline">
            Business
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="hover:underline">
            Device
          </Link>{" "}
          / <span className="text-primary-pink">Compare Devices</span>
        </p>

        <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          {/* Header row: Device label + device columns */}
          <div
            className="grid border-b border-gray-100"
            style={{
              gridTemplateColumns: `160px repeat(${columns.length}, 1fr)`,
            }}
          >
            <div className="flex items-center px-4 py-5">
              <h2 className="font-bold text-lg md:text-xl text-[#212B36]">
                Device
              </h2>
            </div>
            {columns.map((device, idx) => (
              <DeviceColumnHeader
                key={device?.id ?? `empty-${idx}`}
                device={device}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Spec rows */}
          {SPEC_CONFIG.map(spec => (
            <SpecRow
              key={spec.key}
              label={spec.label}
              columnCount={columns.length}
              values={columns.map(device => device?.[spec.key])}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-primary-pink text-white text-sm font-semibold px-10 py-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparePage;

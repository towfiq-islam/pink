"use client";
import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DeviceColumnHeader from "./_components/DeviceColumnHeader";
import SpecRow from "./_components/SpecRow";

const MAX_COMPARE = 3;

// replace with real data — e.g. useGetProductsByIdsQuery(ids) from shopApi
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

  // 100px label column, each device column flexes but never shrinks below 130px —
  // below that the table scrolls horizontally instead of squishing.
  const gridTemplate = `100px repeat(${columns.length}, minmax(130px, 1fr))`;

  return (
    <section className="container mb-10 md:mb-16">
      {/* Breadcrumb */}
      <p className="text-[13px] md:text-sm font-medium text-gray-400 mt-4 md:mt-6 mb-3 md:mb-4">
        <Link href="/prepaid-phone" className="hover:underline">
          Prepaid phone
        </Link>{" "}
        / <span className="text-primary-pink">Compare Devices</span>
      </p>

      <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          {/* Header row: Device label + device columns */}
          <div
            className="grid border-b border-gray-100"
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="sticky left-0 z-10 flex items-center bg-white px-3 py-5 md:px-4">
              <h2 className="font-bold text-base md:text-xl text-[#212B36]">
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
              gridTemplate={gridTemplate}
              values={columns.map(device => device?.[spec.key])}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparePage;

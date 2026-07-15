"use client";
import React, { useState } from "react";
import ProductSkeleton from "@/components/common/Skeleton";
import Lottie from "lottie-react";
import emptyAnimation from "@/assets/cart.json";
import FilterItem from "@/components/common/FilterItem";
import Product from "@/components/common/Product";
import s4 from "@/assets/s4.png";
const filterData = {
  data: {
    deals: [
      { id: "5g-trade", name: "5G trade" },
      { id: "free", name: "Free" },
      { id: "new", name: "New" },
      { id: "reduced-down", name: "Reduced down payment" },
    ],
    brands: [
      { id: "apple", name: "Apple" },
      { id: "google", name: "Google" },
      { id: "motorola", name: "Motorola" },
      { id: "nokia", name: "Nokia" },
    ],
    operatingSystem: [
      { id: "android", name: "Android" },
      { id: "aosp", name: "AOSP" },
      { id: "ios", name: "iOS" },
      { id: "kaios", name: "KaiOS" },
    ],
    network: [
      { id: "satellite", name: "Satellite" },
      { id: "5g", name: "5G" },
      { id: "4g-lte", name: "4G LTE" },
      { id: "4g", name: "4G" },
    ],
    simType: [
      { id: "esim", name: "eSIM" },
      { id: "physical-sim", name: "Physical SIM" },
    ],
  },
};

const SWATCHES = ["#c9c9c9", "#2b2b2b", "#e07a2c"];

const baseProducts = [
  {
    name: "iPhone 17 Pro Max",
    tagline: "Built for Apple Intelligence",
    color: "#e07a2c",
  },
  {
    name: "iPhone 17 Pro Max",
    tagline: "Built for Apple Intelligence",
    color: "#e07a2c",
  },
  {
    name: "iPhone 15 Pro Max",
    tagline: "Built for Apple Intelligence",
    color: "#c9aee0",
  },
];

const products = Array.from({ length: 4 }).flatMap((_, row) =>
  baseProducts.map((p, idx) => ({
    ...p,
    id: `${row}-${idx}`,
    swatches: SWATCHES,
    priceFull: 50.0,
    priceMonthly: 4.16,
    total: 1199.99,
    img: s4,
  })),
);

const TABS = ["Phone", "Tablets"];

const EMPTY_FILTERS = {
  deals: [],
  brand: [],
  operatingSystem: [],
  network: [],
  simType: [],
};

const ShopPage = () => {
  const [activeTab, setActiveTab] = useState("Phone");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const productLoading = false;

  const toggleFilter = (group, id) => {
    setFilters(prev => ({
      ...prev,
      [group]: prev[group].includes(id)
        ? prev[group].filter(item => item !== id)
        : [...prev[group], id],
    }));
  };

  const handleResetFilters = () => setFilters(EMPTY_FILTERS);

  return (
    <section className="container mb-5 md:mb-8 lg:mb-12 xl:mb-20">
      <div className="max-w-350 mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#212B36] mt-6 mb-4">
          Shop
        </h3>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          {TABS?.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-colors duration-300 ${
                activeTab === tab
                  ? "bg-primary-pink text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ======================
                FILTER SIDEBAR
            ====================== */}
          <div className="lg:sticky top-22 w-full lg:w-68 2xl:w-72.5 bg-white p-5 rounded-2xl shadow-sm shrink-0">
            <div className="flex gap-3 items-center justify-between">
              <h4 className="font-semibold text-xl text-[#212B36]">Filters</h4>
              <button
                onClick={handleResetFilters}
                className="underline cursor-pointer text-sm font-semibold text-primary-pink"
              >
                Clear all
              </button>
            </div>

            <hr className="text-gray-200 my-4" />

            <div>
              {/* DEALS */}
              <FilterItem title="Deals">
                {filterData.data.deals.map(item => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-primary-pink"
                      checked={filters.deals.includes(item.id)}
                      onChange={() => toggleFilter("deals", item.id)}
                    />
                    {item.name}
                  </label>
                ))}
                <button className="text-xs font-semibold text-primary-pink cursor-pointer">
                  Show more
                </button>
              </FilterItem>

              {/* BRANDS */}
              <FilterItem title="Brands">
                {filterData.data.brands.map(brand => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-primary-pink"
                      checked={filters.brand.includes(brand.id)}
                      onChange={() => toggleFilter("brand", brand.id)}
                    />
                    {brand.name}
                  </label>
                ))}
                <button className="text-xs font-semibold text-primary-pink cursor-pointer">
                  Show more
                </button>
              </FilterItem>

              {/* OPERATING SYSTEM */}
              <FilterItem title="Operating system">
                {filterData.data.operatingSystem.map(item => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-primary-pink"
                      checked={filters.operatingSystem.includes(item.id)}
                      onChange={() => toggleFilter("operatingSystem", item.id)}
                    />
                    {item.name}
                  </label>
                ))}
                <button className="text-xs font-semibold text-primary-pink cursor-pointer">
                  Show more
                </button>
              </FilterItem>

              {/* NETWORK */}
              <FilterItem title="Network">
                {filterData.data.network.map(item => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-primary-pink"
                      checked={filters.network.includes(item.id)}
                      onChange={() => toggleFilter("network", item.id)}
                    />
                    {item.name}
                  </label>
                ))}
              </FilterItem>

              {/* SIM TYPE */}
              <FilterItem title="SIM type">
                {filterData.data.simType.map(item => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-primary-pink"
                      checked={filters.simType.includes(item.id)}
                      onChange={() => toggleFilter("simType", item.id)}
                    />
                    {item.name}
                  </label>
                ))}
              </FilterItem>
            </div>
          </div>

          {/* ======================
                PRODUCTS GRID
            ====================== */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-y-5 xl:gap-y-6 gap-x-4 md:gap-x-5">
            {productLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton isSmall={true} key={i} />
              ))
            ) : products?.length > 0 ? (
              products.map(product => (
                <Product key={product.id} product={product} isSmall={true} />
              ))
            ) : (
              <div className="col-span-full flex flex-col gap-2 justify-center md:gap-3 xl:gap-4 items-center py-10">
                <div className="w-40 md:w-48 xl:w-54 mx-auto">
                  <Lottie
                    animationData={emptyAnimation}
                    loop={true}
                    autoplay={true}
                  />
                </div>
                <h3 className="text-lg md:text-xl xl:text-2xl font-semibold mb-1">
                  No Products Found
                </h3>
                <h3 className="text-sm xl:text-base italic font-semibold text-primary-gray text-center max-w-md mx-auto">
                  Try adjusting your filters or explore other categories to find
                  what you&apos;re looking for.
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;

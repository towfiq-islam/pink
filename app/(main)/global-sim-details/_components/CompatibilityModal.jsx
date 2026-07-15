import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
const DEVICE_LIST = {
  ios: {
    Apple: [
      "iPad 10th Gen",
      "iPad 8th Gen (WiFi+Cellular)",
      "iPad Air 11-inch (M2)",
      "iPad Air 13-inch (M2)",
      "iPad Air 3rd Gen",
      "iPhone 17 Pro Max",
      "iPhone 17 Pro",
      "iPhone 17",
      "iPhone XS",
      "iPhone 11",
      "iPhone 11 Pro",
      "iPhone 11 Pro Max",
      "iPhone 12",
      "iPhone 12 Mini",
      "iPhone 12 Pro",
      "iPhone 12 Pro Max",
      "iPhone 13",
      "iPhone 13 Mini",
      "iPhone 13 Pro",
      "iPhone 13 Pro Max",
      "iPhone 14",
      "iPhone 14 Plus",
      "iPhone 14 Pro",
      "iPhone 14 Pro Max",
      "iPhone 15",
      "iPhone 15 Plus",
      "iPhone 15 Pro",
      "iPhone 15 Pro Max",
      "iPhone 16",
      "iPhone 16 Plus",
      "iPhone 16 Pro",
      "iPhone 16 Pro Max",
    ],
  },
  android: {
    Samsung: [
      "Galaxy S22",
      "Galaxy S22 Ultra",
      "Galaxy S23",
      "Galaxy S23 Ultra",
      "Galaxy S24",
      "Galaxy S24 Ultra",
      "Galaxy S25",
      "Galaxy Z Fold 5",
      "Galaxy Z Fold 6",
      "Galaxy Z Flip 5",
      "Galaxy Z Flip 6",
    ],
    Google: [
      "Pixel 6",
      "Pixel 6 Pro",
      "Pixel 7",
      "Pixel 7 Pro",
      "Pixel 8",
      "Pixel 8 Pro",
      "Pixel 9",
      "Pixel 9 Pro",
      "Pixel Fold",
    ],
  },
};

export default function CompatibilityModal() {
  const [activeOS, setActiveOS] = useState("ios");
  const [query, setQuery] = useState("");

  const groups = DEVICE_LIST[activeOS];

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.toLowerCase();
    const result = {};
    Object.entries(groups).forEach(([brand, devices]) => {
      const matches = devices.filter(d => d.toLowerCase().includes(q));
      if (matches.length) result[brand] = matches;
    });
    return result;
  }, [groups, query]);

  const handleTabChange = os => {
    setActiveOS(os);
    setQuery("");
  };

  return (
    <div className="p-1">
      <h2 className="text-lg font-semibold text-gray-700 pb-3">
        Check Compatibility
      </h2>

      {/* Body (scrollable) */}
      <div className="overflow-y-auto space-y-10">
        <div className="space-y-2.5 text-sm text-gray-500 font-medium">
          <p className="text-[15px]">
            To use an Pink Mobile eSIM, a device must meet the following
            conditions:
          </p>

          <ul className="list-disc list-inside pl-5 space-y-1">
            <li>The device supports eSIMs.</li>
            <li>The device is not carrier or network-locked.</li>
            <li>The device is not jailbroken (iOS) or rooted (Android).</li>
          </ul>

          <p>
            You can use our list to see if the device you want to use is eSIM-
            compatible. Note, some regional models may not support eSIMs.
          </p>

          <p>
            Don&apos;t see your device? Our list is updated regularly, but not
            exhaustive — check with the device manufacturer to confirm it
            supports eSIMs.
          </p>
        </div>

        <div>
          {/* OS tabs */}
          <div className="flex">
            {[
              { id: "ios", label: "iOS" },
              { id: "android", label: "Android" },
            ].map(tab => {
              const isActive = tab.id === activeOS;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex-1 pb-2.5 text-sm cursor-pointer font-semibold border-b transition-colors duration-200 ${
                    isActive
                      ? "text-primary-pink border-primary-pink border-b-2"
                      : "text-gray-500 hover:text-gray-600 border-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 my-6">
            <FiSearch size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full outline-none text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Device list */}
          <div className="max-h-64 overflow-y-auto pr-1 space-y-4">
            {Object.keys(filteredGroups).length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">
                No devices found.
              </p>
            ) : (
              Object.entries(filteredGroups).map(([brand, devices]) => (
                <div key={brand}>
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    {brand}
                  </p>
                  <ul className="space-y-2">
                    {devices.map(device => (
                      <li
                        key={device}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {device}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import internet from "@/assets/internet.png";

export function HomeInternetAndSims() {
  return (
    <section className="container">
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-5 xl:gap-6 pt-6 md:grid-cols-2">
        {/* 5G home internet */}
        <div className="rounded-2xl border border-gray-100 shadow p-6 flex gap-6 items-start">
          <figure className="shrink-0">
            <Image
              width={122}
              height={138}
              src={internet}
              alt="Pink Mobile 5G home internet device"
              className="shrink-0 object-contain"
            />
          </figure>

          <div>
            <h3 className="text-xl xl:text-[22px] font-semibold text-gray-900">
              Now the fastest 5G home internet
            </h3>
            <p className="mt-1 font-semibold text-gray-800">
              According to Ookla speedtest.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Starting at just $35/mo. with autopay, get 5G home internet when
              you bundle with a Pink Mobile phone plan, get a month
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Up to $200 back via virtual prepaid card; allow 4 weeks from
              rebate submission. Savings and Month On Us. via bill credits, plus
              taxes &amp; fees.{" "}
              <span className="cursor-pointer underline">Get full terms</span>
            </p>
          </div>
        </div>

        {/* Global sims */}
        <div className="rounded-2xl border border-gray-100 shadow p-6">
          <h3 className="text-xl xl:text-[22px] font-semibold text-gray-900">
            Global Sims
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-5">
            <div className="p-3 border border-gray-200 rounded-xl">
              <p className="flex items-center gap-2 font-semibold text-gray-800">
                Argentina
              </p>
              <p className="mt-1 text-sm text-gray-400">
                From:{" "}
                <span className="font-semibold text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                  $6.00
                </span>
              </p>
            </div>

            <div className="p-3 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 font-semibold text-gray-800">
                Brazil
              </div>
              <p className="mt-1 text-sm text-gray-400">
                From:{" "}
                <span className="font-semibold text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                  $5.00
                </span>
              </p>
            </div>
          </div>

          <button className="mt-6 primary_btn w-fit mx-auto block">See all plan</button>
        </div>
      </div>
    </section>
  );
}

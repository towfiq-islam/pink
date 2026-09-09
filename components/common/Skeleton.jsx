export const ProductSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-100 shadow p-5 flex gap-5 items-center animate-pulse">
      {/* Product Image */}
      <div className="w-[74px] h-[119px] rounded-lg bg-gray-200 shrink-0" />

      <div className="flex-1">
        {/* Product Name */}
        <div className="h-5 w-40 bg-gray-200 rounded" />

        {/* Tagline */}
        <div className="h-4 w-28 bg-gray-200 rounded mt-2" />

        {/* Color Swatches */}
        <div className="mt-3 flex gap-2 border-b border-gray-100 pb-3">
          <div className="size-5 rounded-full bg-gray-200" />
          <div className="size-5 rounded-full bg-gray-200" />
          <div className="size-5 rounded-full bg-gray-200" />
          <div className="size-5 rounded-full bg-gray-200" />
        </div>

        {/* Pricing */}
        <div className="h-5 w-full bg-gray-200 rounded mt-3" />
        <div className="h-4 w-48 bg-gray-200 rounded mt-2" />
        <div className="h-3 w-32 bg-gray-200 rounded mt-2" />

        {/* Buttons */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex-1 h-11 rounded-2xl bg-gray-200" />
          <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
        </div>
      </div>
    </div>
  );
};

export const SimSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-100 shadow p-4 md:p-5 flex flex-col items-start text-left gap-3 animate-pulse bg-white"
        >
          {/* Flag / Icon circular skeleton */}
          <div className="size-12 rounded-full bg-gray-200 shrink-0" />

          <div className="w-full space-y-2.5">
            {/* Country / Plan title */}
            <div className="h-4 bg-gray-200 rounded w-3/4 md:mt-1" />

            {/* Price badge */}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-3.5 bg-gray-200 rounded w-8" />
              <div className="h-6 bg-gray-200 rounded-full w-24" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;

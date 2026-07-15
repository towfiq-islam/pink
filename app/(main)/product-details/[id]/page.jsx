import ProductGallery from "../_components/ProductGallery";
import { CustomizePanel } from "../_components/CustomizePanel";
import { ProductDetailsTabs } from "../_components/ProductDetailsTabs";

export default function ProductDetailsPage() {
  return (
    <div className="container pt-7 xl:pt-10 pb-16 xl:pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 xl:gap-10 2xl:gap-16">
          <ProductGallery />
          <CustomizePanel />
        </div>

        <ProductDetailsTabs />
      </div>
    </div>
  );
}

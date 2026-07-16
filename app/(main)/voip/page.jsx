import Banner from "@/components/common/Banner";
import Pricing from "./_components/Pricing";
import WhyChooseUs from "./_components/WhyChooseUs";
import bannerBg from "@/assets/phoneBg.png";

const page = () => {
  return (
    <>
      <div className="container pt-6 font-medium text-sm text-gray-400 mb-5">
        <span>Home</span>
        <span className="mx-1">/</span>
        <span className="text-primary-pink font-semibold">Phone Plans</span>
      </div>

      <div className="container">
        <Banner
          bannerBg={bannerBg}
          title="Crystal-Clear VoIP Calling for Home &amp; Business"
          description="Affordable cloud-based phone services with unlimited calling, HD voice quality, virtual numbers, and advanced business features."
        >
          <button className="primary_btn md:!px-10">Get Started</button>
          <button className="secondary_btn">View Plans</button>
        </Banner>
      </div>

      <div className="container mt-9 md:mt-12 lg:mt-14 xl:mt-20">
        <Pricing />
      </div>
      <WhyChooseUs />
    </>
  );
};

export default page;

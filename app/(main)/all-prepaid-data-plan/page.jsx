import React from "react";
import ViewPlans from "../prepaid-devices/_components/ViewPlans";

const page = () => {
  return (
    <section className="container pt-7 md:pt-10 lg:pt-12 pb-10 md:pb-20 space-y-10 lg:space-y-14 xl:space-y-20">
      <ViewPlans
        btn_url="/check-broadband-facts"
        btn_text="Check Broadband Facts"
      />
    </section>
  );
};

export default page;

import React from "react";

const SectionTitle = ({ title, description }) => {
  return (
    <div className={`mb-5 md:mb-8 ${description ? "lg:mb-12" : "lg:mb-10"}`}>
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-900 mb-3 xl:mb-5">
        {title}
      </h2>

      {description && (
        <p className="text-center text-gray-500 text-sm md:text-base xl:text-lg font-medium max-w-5xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

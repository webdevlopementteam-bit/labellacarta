import AudienceAccordionSection from "@/sections/AudienceAccordionSection";
import CompanyShowcaseSection from "@/sections/CompanyShowcaseSection";
import ProductsNewsAndMapSection from "@/sections/ProductsNewsAndMapSection";
import SectionBanner from "@/sections/SectionBanner";
import SolutionsAndFeaturedSection from "@/sections/SolutionsAndFeaturedSection";
import React from "react";

function page() {
  return (
    <>
      <SectionBanner />
      <SolutionsAndFeaturedSection />
      <AudienceAccordionSection />
      <CompanyShowcaseSection />
      <ProductsNewsAndMapSection />
    </>
  );
}

export default page;

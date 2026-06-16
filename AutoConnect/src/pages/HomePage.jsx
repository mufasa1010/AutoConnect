/* eslint-disable no-unused-vars */
import React from "react";
import HeroSection        from "@/components/home/HeroSection";
import HowItWorksSection  from "@/components/home/HowItWorksSection";
import CategoriesSection  from "@/components/home/CategoriesSection";
import TopRatedSection    from "@/components/home/TopRatedSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import UrgentCTASection   from "@/components/home/UrgentCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <CategoriesSection />
      <TopRatedSection />
      <TestimonialsSection />
      <UrgentCTASection />
    </>
  );
}
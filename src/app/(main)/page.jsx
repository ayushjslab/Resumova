"use client";

import React, { useEffect, useState } from "react";
import CTA from "../../home/components/cta";
import Features from "../../home/components/features";
import Footer from "../../home/components/footer";
import Header from "../../home/components/header";
import Hero from "../../home/components/hero";
import Testimonials from "../../home/components/testimonial";
import TermsService from "../../home/components/terms-service";
import { ChevronUp } from "lucide-react";
import { PT_Sans } from "next/font/google";
import TemplateStack from "@/home/components/templateStack"
const pt_sans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});


const HomePage = () => {

    const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
     const handleScroll = () => {
       setShowScrollTop(window.scrollY > 300);
     };

     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
  },[])

  return (
    <div className={`flex flex-col min-h-screen bg-black ${pt_sans.className}`}>
      {/* Header (sticky on top) */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        <Hero />
        <Features />
        <TemplateStack/>
        <Testimonials />
        <TermsService />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default HomePage;

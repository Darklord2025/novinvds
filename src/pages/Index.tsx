
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import DomainSearchSection from '../components/home/DomainSearchSection';
import FeaturesSection from '../components/home/FeaturesSection';
import VpsPlansSection from '../components/home/VpsPlansSection';
import DomainPricingSection from '../components/home/DomainPricingSection';
import HostingSection from '../components/home/HostingSection';
import CTASection from '../components/home/CTASection';
import { Helmet } from "react-helmet";

const Index = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Helmet>
        <title>NovinVDS - میزبانی وب، سرور مجازی و اختصاصی | خدمات هاستینگ حرفه‌ای</title>
        <meta name="description" content="NovinVDS ارائه دهنده خدمات تخصصی هاستینگ، سرور مجازی، سرور اختصاصی و راهکارهای شبکه با بالاترین کیفیت و پشتیبانی 24/7" />
        <meta name="keywords" content="سرور مجازی، هاستینگ، سرور اختصاصی، دامنه، میزبانی وب، خدمات شبکه" />
        <meta name="author" content="NovinVDS" />
        <meta property="og:title" content="NovinVDS - میزبانی وب، سرور مجازی و اختصاصی" />
        <meta property="og:description" content="ارائه دهنده خدمات تخصصی هاستینگ، سرور مجازی، سرور اختصاصی و راهکارهای شبکه با بالاترین کیفیت" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novinvds.ir" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NovinVDS - میزبانی وب، سرور مجازی و اختصاصی" />
        <meta name="twitter:description" content="ارائه دهنده خدمات تخصصی هاستینگ، سرور مجازی، سرور اختصاصی و راهکارهای شبکه با بالاترین کیفیت" />
      </Helmet>
      
      <Navbar />
      <HeroSection />
      <DomainSearchSection />
      <FeaturesSection />
      <VpsPlansSection />
      <DomainPricingSection />
      <HostingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

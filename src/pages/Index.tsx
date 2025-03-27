
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

const Index = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
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

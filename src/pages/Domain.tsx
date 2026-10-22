import PublicDomainOrder from '@/components/domain/PublicDomainOrder';
import LegacyLocale from '@/components/LegacyLocale';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DomainPricing from '../components/DomainPricing';
import DomainSearchForm from '../components/domain/DomainSearchForm';
import DomainSearchResult from '../components/domain/DomainSearchResult';
import DomainFeatures from '../components/domain/DomainFeatures';
import DomainFAQ from '../components/domain/DomainFAQ';
import DomainCTA from '../components/domain/DomainCTA';

const Domain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <LegacyLocale>{(
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">ثبت دامنه برای کسب و کار شما</h1>
            <p className="text-lg text-gray-600 mb-8">
              بیش از 50 پسوند مختلف با قیمت‌های مناسب و تحویل آنی
            </p>
            
            <PublicDomainOrder/>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <DomainFeatures />
      
      {/* Domain Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">قیمت‌های دامنه</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              قیمت‌های مقرون به صرفه برای ثبت، تمدید و انتقال انواع دامنه‌ها
            </p>
          </div>
          
          <DomainPricing />
        </div>
      </section>
      
      {/* FAQ Section */}
      <DomainFAQ />
      
      {/* CTA Section */}
      <DomainCTA />
      
      <Footer />
    </div>
  )}</LegacyLocale>;
};

export default Domain;


import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DatacenterComparison from '../components/DatacenterComparison';

const Datacenter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">دیتاسنترهای ما</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              دیتاسنترهای پیشرفته با بهترین زیرساخت‌ها در نقاط مختلف جهان
            </p>
          </div>
          
          <DatacenterComparison />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Datacenter;

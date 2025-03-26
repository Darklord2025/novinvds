
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dedicated = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">سرور اختصاصی</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              این صفحه در حال توسعه است و به زودی تکمیل خواهد شد.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dedicated;

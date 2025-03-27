
import React from 'react';

const DomainCTA: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">امروز دامنه مورد نظر خود را ثبت کنید</h2>
        <p className="max-w-2xl mx-auto mb-8 text-blue-100">
          بیش از 50 پسوند مختلف با قیمت‌های مناسب و کنترل پنل کامل مدیریت دامنه
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            جستجوی دامنه
          </button>
          <button className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
            مشاهده قیمت‌ها
          </button>
        </div>
      </div>
    </section>
  );
};

export default DomainCTA;

import React from 'react';
import { Link } from 'react-router-dom';
import { Server, CheckCircle, Award, Shield } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white"></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0 animate-slide-down">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              <span className="text-gradient">خدمات حرفه‌ای</span> هاستینگ و شبکه
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              راهکارهای قدرتمند هاستینگ، سرورهای مجازی و اختصاصی، خدمات شبکه و فروش لایسنس با کیفیت بالا و پشتیبانی 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="btn-gradient px-8 py-3 rounded-lg font-medium">
                مشاهده خدمات
              </Link>
              <Link to="/contact" className="px-8 py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                تماس با ما
              </Link>
            </div>
            
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Server className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">+۵۰۰۰</p>
                  <p className="text-gray-600 text-sm">سرور فعال</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">۹۹.۹۹٪</p>
                  <p className="text-gray-600 text-sm">آپ‌تایم</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">+۱۰</p>
                  <p className="text-gray-600 text-sm">سال تجربه</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-slide-up">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
                <img 
                  src="https://placehold.co/600x400/3b82f6/FFFFFF/png?text=NovinVDS+Infrastructure&font=Montserrat" 
                  alt="سرور" 
                  className="rounded-lg w-full object-cover"
                />
                
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-float">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Server className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">سرورهای قدرتمند</p>
                      <p className="text-gray-600 text-sm">با بالاترین کارایی</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-10 -right-6 bg-white rounded-lg shadow-lg p-4 animate-float" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">امنیت پیشرفته</p>
                      <p className="text-gray-600 text-sm">محافظت ۲۴/۷</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

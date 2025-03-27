
import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, CheckCircle } from 'lucide-react';

const HostingSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold mb-6">خدمات هاستینگ با بالاترین کیفیت</h2>
            <p className="text-gray-600 mb-6">
              هاستینگ وب با سرعت بالا، امنیت پیشرفته و پشتیبانی 24/7 برای وبسایت‌ها و اپلیکیشن‌های شما. تمام پلن‌های ما شامل:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="mr-3">
                  <h4 className="font-medium">دیسک‌های SSD NVMe سریع</h4>
                  <p className="text-gray-600 text-sm">تمام هاستینگ‌ها روی دیسک‌های SSD NVMe با سرعت خواندن و نوشتن فوق‌العاده بالا</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="mr-3">
                  <h4 className="font-medium">کنترل پنل حرفه‌ای</h4>
                  <p className="text-gray-600 text-sm">دسترسی به پنل مدیریت کامل و کاربرپسند برای کنترل تمام جنبه‌های هاستینگ</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="mr-3">
                  <h4 className="font-medium">بکاپ اتوماتیک</h4>
                  <p className="text-gray-600 text-sm">پشتیبان‌گیری خودکار برای محافظت از داده‌ها و محتوای شما</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="mr-3">
                  <h4 className="font-medium">SSL رایگان</h4>
                  <p className="text-gray-600 text-sm">گواهینامه SSL رایگان برای تمام دامنه‌ها جهت محافظت از داده‌های کاربران</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/hosting" className="btn-gradient px-6 py-3 rounded-lg font-medium inline-block">
                مشاهده پلن‌های هاستینگ
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Web+Hosting&font=Montserrat" 
                  alt="هاستینگ وب" 
                  className="w-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg shadow-lg p-4 animate-float">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Cloud className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">آپ‌تایم 99.99%</p>
                    <p className="text-gray-600 text-sm">همیشه در دسترس</p>
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

export default HostingSection;

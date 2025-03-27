
import React from 'react';
import { Globe, Shield, RefreshCw } from 'lucide-react';

const DomainFeatures: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">ویژگی‌های ثبت دامنه NovinVDS</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            ما بهترین امکانات و خدمات را برای دامنه‌های شما فراهم کرده‌ایم
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">کنترل پنل کامل</h3>
            <p className="text-gray-600">
              کنترل پنل اختصاصی برای مدیریت دامنه‌ها با امکان ویرایش رکوردهای DNS، انتقال دامنه و تنظیمات پیشرفته
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">محافظت از اطلاعات</h3>
            <p className="text-gray-600">
              محافظت WHOIS رایگان برای حفظ حریم خصوصی شما و جلوگیری از دسترسی به اطلاعات شخصی
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">تمدید خودکار</h3>
            <p className="text-gray-600">
              سیستم تمدید خودکار دامنه‌ها برای اطمینان از عدم منقضی شدن دامنه و جلوگیری از مشکلات احتمالی
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainFeatures;

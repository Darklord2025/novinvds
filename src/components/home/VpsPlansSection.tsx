
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PricingCard from '../PricingCard';

const VpsPlansSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">سرورهای مجازی</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            سرورهای مجازی قدرتمند با منابع اختصاصی، کنترل کامل و انعطاف‌پذیری بالا
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard 
            title="پایه" 
            price="199,000"
            period="ماهانه"
            description="مناسب برای وبسایت‌های کوچک و پروژه‌های شخصی"
            features={[
              { text: "2 هسته پردازشی", available: true },
              { text: "2 گیگابایت رم", available: true },
              { text: "50 گیگابایت فضای SSD NVMe", available: true },
              { text: "ترافیک نامحدود", available: true },
              { text: "1 آدرس IP اختصاصی", available: true },
              { text: "پشتیبانی از پنل کنترل", available: true },
              { text: "بکاپ هفتگی", available: false },
              { text: "پشتیبانی اولویت‌دار", available: false },
            ]}
          />
          
          <PricingCard 
            title="حرفه‌ای" 
            price="399,000"
            period="ماهانه"
            description="مناسب برای کسب و کارهای متوسط و سایت‌های پربازدید"
            features={[
              { text: "4 هسته پردازشی", available: true },
              { text: "8 گیگابایت رم", available: true },
              { text: "100 گیگابایت فضای SSD NVMe", available: true },
              { text: "ترافیک نامحدود", available: true },
              { text: "1 آدرس IP اختصاصی", available: true },
              { text: "پشتیبانی از پنل کنترل", available: true },
              { text: "بکاپ هفتگی", available: true },
              { text: "پشتیبانی اولویت‌دار", available: false },
            ]}
            popular={true}
          />
          
          <PricingCard 
            title="سازمانی" 
            price="699,000"
            period="ماهانه"
            description="مناسب برای کسب و کارهای بزرگ و اپلیکیشن‌های سنگین"
            features={[
              { text: "8 هسته پردازشی", available: true },
              { text: "16 گیگابایت رم", available: true },
              { text: "200 گیگابایت فضای SSD NVMe", available: true },
              { text: "ترافیک نامحدود", available: true },
              { text: "2 آدرس IP اختصاصی", available: true },
              { text: "پشتیبانی از پنل کنترل", available: true },
              { text: "بکاپ روزانه", available: true },
              { text: "پشتیبانی اولویت‌دار", available: true },
            ]}
          />
        </div>
        
        <div className="text-center mt-12">
          <Link to="/vps" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            مشاهده تمام پلن‌ها <ArrowRight size={16} className="mr-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VpsPlansSection;

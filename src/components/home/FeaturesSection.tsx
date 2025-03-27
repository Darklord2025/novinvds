
import React from 'react';
import { Cpu, Shield, Clock, CheckCircle, Database, Globe } from 'lucide-react';
import FeatureCard from '../FeatureCard';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">چرا NovinVDS را انتخاب کنید؟</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            ما بهترین راهکارهای هاستینگ، سرور و شبکه را با فناوری‌های پیشرفته و پشتیبانی 24/7 ارائه می‌دهیم
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            title="سرعت و کارایی بالا" 
            description="سرورهای قدرتمند با سخت‌افزارهای نسل جدید و شبکه پرسرعت برای اجرای سریع برنامه‌های شما"
            icon={<Cpu size={24} />}
            gradient={true}
          />
          <FeatureCard 
            title="امنیت پیشرفته" 
            description="محافظت از داده‌ها و سرورهای شما با جدیدترین فناوری‌های امنیتی و پروتکل‌های رمزنگاری"
            icon={<Shield size={24} />}
            gradient={true}
          />
          <FeatureCard 
            title="پشتیبانی 24/7" 
            description="تیم پشتیبانی متخصص و پاسخگو در تمام ساعات شبانه‌روز و در تمام روزهای هفته"
            icon={<Clock size={24} />}
            gradient={true}
          />
          <FeatureCard 
            title="آپ‌تایم 99.99%" 
            description="اطمینان از دسترسی همیشگی به سرویس‌ها با ضمانت آپ‌تایم 99.99 درصد"
            icon={<CheckCircle size={24} />}
            gradient={true}
          />
          <FeatureCard 
            title="مقیاس‌پذیری آسان" 
            description="امکان ارتقا و توسعه منابع متناسب با نیاز شما و رشد کسب و کارتان"
            icon={<Database size={24} />}
            gradient={true}
          />
          <FeatureCard 
            title="شبکه جهانی" 
            description="دسترسی به شبکه‌ای از دیتاسنترهای پیشرفته در سراسر جهان با کمترین تأخیر"
            icon={<Globe size={24} />}
            gradient={true}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

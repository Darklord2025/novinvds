
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Server, Cloud, Globe, Shield, Cpu, Database, Clock, Award, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/PricingCard';
import FeatureCard from '../components/FeatureCard';
import DomainPricing from '../components/DomainPricing';

const Index = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
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
      
      {/* Domain Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">دامنه مورد نظر خود را جستجو کنید</h2>
              <p className="text-blue-100">
                بیش از 50 پسوند دامنه با قیمت‌های مناسب
              </p>
            </div>
            
            <form className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="دامنه مورد نظر خود را وارد کنید..." 
                  className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  .com
                </div>
              </div>
              
              <button type="submit" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                جستجو
              </button>
            </form>
            
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.com</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.net</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.org</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.ir</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.co.ir</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.io</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
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
      
      {/* VPS Plans Section */}
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
      
      {/* Domain Pricing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">قیمت دامنه‌ها</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              قیمت برخی از پسوندهای محبوب دامنه ها
            </p>
          </div>
          
          <DomainPricing />
          
          <div className="text-center mt-12">
            <Link to="/domain" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              مشاهده همه پسوندها <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Hosting Section */}
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
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">آماده همکاری با ما هستید؟</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            با ما تماس بگیرید تا مشاوران ما به شما در انتخاب بهترین راهکار متناسب با نیازهای کسب و کار شما کمک کنند
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-opacity-95 transition-colors">
              تماس با ما
            </Link>
            <Link to="/services" className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              مشاهده خدمات
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

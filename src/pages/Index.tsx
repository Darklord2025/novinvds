
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Server, Cloud, Globe, Shield, Cpu, Database, Clock, Award, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/PricingCard';
import FeatureCard from '../components/FeatureCard';

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
                    src="https://placehold.co/600x400/3b82f6/FFFFFF/png?text=VirtuaServe+Infrastructure&font=Montserrat" 
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
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">چرا سرویس‌های ما را انتخاب کنید؟</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ما بهترین راهکارهای هاستینگ، سرور و شبکه را با فناوری‌های پیشرفته و پشتیبانی 24/7 ارائه می‌دهیم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="سرعت و کارایی بالا" 
              description="سرورهای قدرتمند با سخت‌افزارهای نسل جدید و شبکه پرسرعت برای اجرای سریع برنامه‌های شما"
              icon={<Cpu size={24} />}
            />
            <FeatureCard 
              title="امنیت پیشرفته" 
              description="محافظت از داده‌ها و سرورهای شما با جدیدترین فناوری‌های امنیتی و پروتکل‌های رمزنگاری"
              icon={<Shield size={24} />}
            />
            <FeatureCard 
              title="پشتیبانی 24/7" 
              description="تیم پشتیبانی متخصص و پاسخگو در تمام ساعات شبانه‌روز و در تمام روزهای هفته"
              icon={<Clock size={24} />}
            />
            <FeatureCard 
              title="آپ‌تایم 99.99%" 
              description="اطمینان از دسترسی همیشگی به سرویس‌ها با ضمانت آپ‌تایم 99.99 درصد"
              icon={<CheckCircle size={24} />}
            />
            <FeatureCard 
              title="مقیاس‌پذیری آسان" 
              description="امکان ارتقا و توسعه منابع متناسب با نیاز شما و رشد کسب و کارتان"
              icon={<Database size={24} />}
            />
            <FeatureCard 
              title="شبکه جهانی" 
              description="دسترسی به شبکه‌ای از دیتاسنترهای پیشرفته در سراسر جهان با کمترین تأخیر"
              icon={<Globe size={24} />}
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
                { text: "50 گیگابایت فضای SSD", available: true },
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
                { text: "100 گیگابایت فضای SSD", available: true },
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
                { text: "200 گیگابایت فضای SSD", available: true },
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
      
      {/* Hosting Section */}
      <section className="py-16 md:py-24">
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
                    <h4 className="font-medium">دیسک‌های SSD سریع</h4>
                    <p className="text-gray-600 text-sm">تمام هاستینگ‌ها روی دیسک‌های SSD با سرعت خواندن و نوشتن بالا</p>
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
      
      {/* License Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center">
            <div className="lg:w-1/2 lg:pl-12 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold mb-6">فروش لایسنس‌های اصلی نرم‌افزاری</h2>
              <p className="text-gray-600 mb-6">
                لایسنس‌های اصلی و معتبر انواع نرم‌افزارها با قیمت مناسب و تحویل آنی. لایسنس‌های ما شامل موارد زیر می‌شوند:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">سیستم عامل‌ها</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>Windows Server</li>
                    <li>Windows Desktop</li>
                    <li>Distros Linux</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">آنتی ویروس‌ها</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>Kaspersky</li>
                    <li>ESET</li>
                    <li>Bitdefender</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">نرم‌افزارهای اداری</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>Microsoft Office</li>
                    <li>Adobe Creative Cloud</li>
                    <li>AutoCAD</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">خدمات ابری</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>Microsoft 365</li>
                    <li>Google Workspace</li>
                    <li>Dropbox Business</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/license" className="btn-gradient px-6 py-3 rounded-lg font-medium inline-block">
                  مشاهده لایسنس‌ها
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src="https://placehold.co/600x400/6d28d9/FFFFFF/png?text=Software+Licenses&font=Montserrat" 
                    alt="لایسنس نرم‌افزاری" 
                    className="w-full object-cover"
                  />
                </div>
                
                <div className="absolute -top-5 -left-5 bg-white rounded-lg shadow-lg p-4 animate-float" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">100% اصل</p>
                      <p className="text-gray-600 text-sm">تضمین اصالت</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Network Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">خدمات شبکه</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              راهکارهای جامع شبکه برای کسب و کارها با طراحی اختصاصی و پشتیبانی حرفه‌ای
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="bg-orange-50 w-14 h-14 rounded-lg flex items-center justify-center text-orange-600 mb-5">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">راه‌اندازی شبکه</h3>
              <p className="text-gray-600 mb-4">
                طراحی و پیاده‌سازی زیرساخت‌های شبکه برای سازمان‌ها با تجهیزات پیشرفته
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>شبکه‌های LAN و WAN</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>تجهیزات Cisco و Mikrotik</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>مشاوره و طراحی شبکه</span>
                </li>
              </ul>
              <Link to="/network" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                اطلاعات بیشتر <ArrowRight size={16} className="mr-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">امنیت شبکه</h3>
              <p className="text-gray-600 mb-4">
                محافظت از زیرساخت‌های شبکه در برابر تهدیدات با پیشرفته‌ترین راهکارهای امنیتی
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>فایروال‌های سخت‌افزاری و نرم‌افزاری</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>سیستم‌های تشخیص و جلوگیری از نفوذ</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>رمزنگاری داده‌ها و VPN</span>
                </li>
              </ul>
              <Link to="/network/security" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                اطلاعات بیشتر <ArrowRight size={16} className="mr-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="bg-green-50 w-14 h-14 rounded-lg flex items-center justify-center text-green-600 mb-5">
                <Server size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">پشتیبانی شبکه</h3>
              <p className="text-gray-600 mb-4">
                خدمات پشتیبانی و نگهداری شبکه به صورت حضوری و از راه دور برای اطمینان از عملکرد بهینه
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>نظارت 24/7 بر سرورها و شبکه</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>عیب‌یابی و رفع مشکلات</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-600 ml-2" />
                  <span>بروزرسانی و مدیریت زیرساخت</span>
                </li>
              </ul>
              <Link to="/network/support" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                اطلاعات بیشتر <ArrowRight size={16} className="mr-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">آماده همکاری با ما هستید؟</h2>
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

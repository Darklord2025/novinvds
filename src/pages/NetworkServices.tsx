
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";
import { 
  Globe, 
  Shield, 
  Wifi, 
  Server, 
  ArrowRight, 
  Lock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Network service types
const networkServices = [
  {
    id: "ddos-protection",
    name: "محافظت DDoS پیشرفته",
    description: "محافظت پیشرفته در برابر حملات DDoS با فیلترینگ هوشمند و پهنای باند انعطاف‌پذیر",
    icon: <Shield size={48} className="text-purple-600" />,
    features: [
      "محافظت در برابر حملات Layer 3, 4, 7",
      "فیلترینگ هوشمند ترافیک مخرب",
      "پهنای باند انعطاف‌پذیر تا 1Tbps",
      "مانیتورینگ 24/7 و هشدار در زمان حمله",
      "گزارش‌های تحلیلی حملات",
      "زمان پاسخ کمتر از 10 ثانیه"
    ],
    price: "از 890,000 تومان ماهانه",
    popular: true,
  },
  {
    id: "cdn",
    name: "شبکه تحویل محتوا (CDN)",
    description: "انتقال محتوا با سرعت بالا به کاربران در سراسر جهان با استفاده از شبکه توزیع محتوا",
    icon: <Globe size={48} className="text-blue-600" />,
    features: [
      "بیش از 200 نقطه حضور (PoP) در سراسر جهان",
      "بهینه‌سازی خودکار تصاویر و فایل‌ها",
      "کش‌سازی هوشمند محتوا",
      "گواهی SSL رایگان",
      "حفاظت در برابر حملات وب",
      "آمار و تحلیل دقیق ترافیک"
    ],
    price: "از 450,000 تومان ماهانه",
    popular: false,
  },
  {
    id: "load-balancing",
    name: "توزیع بار (Load Balancing)",
    description: "توزیع هوشمند ترافیک بین چندین سرور برای افزایش کارایی و دسترس‌پذیری",
    icon: <Server size={48} className="text-green-600" />,
    features: [
      "توزیع ترافیک بین چندین سرور",
      "بررسی سلامت سرورها به صورت خودکار",
      "پشتیبانی از پروتکل‌های HTTP, HTTPS, TCP",
      "مدیریت جلسات (Session Management)",
      "افزونگی و تحمل خطا",
      "مقیاس‌پذیری خودکار"
    ],
    price: "از 780,000 تومان ماهانه",
    popular: false,
  },
  {
    id: "vpn",
    name: "شبکه خصوصی مجازی (VPN)",
    description: "ایجاد اتصال امن و رمزگذاری شده برای دسترسی به شبکه‌ها و سرورها از راه دور",
    icon: <Lock size={48} className="text-red-600" />,
    features: [
      "رمزگذاری AES-256 بیت",
      "پروتکل‌های OpenVPN, WireGuard, IPSec",
      "نقاط دسترسی متعدد در سراسر جهان",
      "پشتیبانی از دسترسی چند کاربر",
      "پنل مدیریت اختصاصی",
      "پشتیبانی 24/7"
    ],
    price: "از 550,000 تومان ماهانه",
    popular: false,
  },
  {
    id: "backup",
    name: "پشتیبان‌گیری شبکه",
    description: "سرویس پشتیبان‌گیری خودکار و مطمئن از داده‌ها و تنظیمات شبکه",
    icon: <Database size={48} className="text-yellow-600" />,
    features: [
      "پشتیبان‌گیری خودکار روزانه، هفتگی و ماهانه",
      "ذخیره‌سازی در مراکز داده متعدد",
      "رمزگذاری داده‌های پشتیبان",
      "بازیابی سریع و آسان",
      "مدیریت نسخه‌های پشتیبان",
      "فضای ذخیره‌سازی انعطاف‌پذیر"
    ],
    price: "از 380,000 تومان ماهانه",
    popular: false,
  },
  {
    id: "managed-networking",
    name: "مدیریت شبکه",
    description: "مدیریت حرفه‌ای تمام جنبه‌های شبکه شما توسط متخصصان ما",
    icon: <Wifi size={48} className="text-indigo-600" />,
    features: [
      "پیکربندی و راه‌اندازی تجهیزات شبکه",
      "مدیریت فایروال و امنیت شبکه",
      "بهینه‌سازی عملکرد و پهنای باند",
      "مانیتورینگ 24/7 و هشدارهای لحظه‌ای",
      "پشتیبانی فنی تخصصی",
      "گزارش‌های دوره‌ای عملکرد"
    ],
    price: "از 1,200,000 تومان ماهانه",
    popular: true,
  }
];

// Additional bandwidth packages
const bandwidthPackages = [
  {
    id: "bw-basic",
    name: "بسته پهنای باند پایه",
    traffic: "500 گیگابایت",
    price: "450,000",
    speed: "100 مگابیت بر ثانیه"
  },
  {
    id: "bw-standard",
    name: "بسته پهنای باند استاندارد",
    traffic: "1 ترابایت",
    price: "850,000",
    speed: "200 مگابیت بر ثانیه"
  },
  {
    id: "bw-premium",
    name: "بسته پهنای باند حرفه‌ای",
    traffic: "3 ترابایت",
    price: "1,950,000",
    speed: "500 مگابیت بر ثانیه"
  },
  {
    id: "bw-unlimited",
    name: "بسته پهنای باند نامحدود",
    traffic: "نامحدود",
    price: "3,500,000",
    speed: "1 گیگابیت بر ثانیه"
  }
];

// Frequently asked questions about network services
const networkFAQs = [
  {
    question: "محافظت DDoS چگونه کار می‌کند؟",
    answer: "محافظت DDoS یک سیستم پیشرفته است که ترافیک ورودی به سرور را بررسی می‌کند و الگوهای مشکوک و حملات را شناسایی و فیلتر می‌کند. این سیستم با استفاده از شبکه‌ای از سرورهای توزیع‌شده، حجم زیادی از ترافیک مخرب را قبل از رسیدن به سرور اصلی شما جذب می‌کند و فقط ترافیک مشروع را عبور می‌دهد."
  },
  {
    question: "آیا می‌توانم پهنای باند اضافی را به سرور موجود خود اضافه کنم؟",
    answer: "بله، شما می‌توانید پهنای باند اضافی را به هر یک از سرویس‌های موجود خود (سرور مجازی، اختصاصی یا ابری) اضافه کنید. این کار از طریق پنل کاربری شما و با انتخاب بسته پهنای باند مورد نظر امکان‌پذیر است و معمولاً در کمتر از چند ساعت اعمال می‌شود."
  },
  {
    question: "تفاوت بین CDN و Load Balancing چیست؟",
    answer: "CDN (شبکه تحویل محتوا) برای توزیع محتوای استاتیک مانند تصاویر، CSS و JavaScript در سرورهای مختلف در سراسر جهان استفاده می‌شود تا سرعت بارگذاری برای کاربران در مناطق مختلف بهبود یابد. در مقابل، Load Balancing (توزیع بار) ترافیک را بین چندین سرور توزیع می‌کند تا از اضافه بار روی یک سرور جلوگیری کند و دسترس‌پذیری و کارایی را افزایش دهد."
  },
  {
    question: "آیا سرویس پشتیبان‌گیری شبکه شما رمزگذاری می‌شود؟",
    answer: "بله، تمام داده‌های پشتیبان با استفاده از رمزگذاری AES-256 بیتی رمزگذاری می‌شوند و در چندین مرکز داده با فاصله جغرافیایی ذخیره می‌شوند تا از امنیت و دسترس‌پذیری داده‌های شما اطمینان حاصل شود. فقط شما با کلید اختصاصی خود می‌توانید به این داده‌ها دسترسی داشته باشید."
  },
  {
    question: "سطح SLA (توافق‌نامه سطح خدمات) برای خدمات شبکه شما چیست؟",
    answer: "ما برای تمام خدمات شبکه خود SLA با دسترس‌پذیری 99.9% ارائه می‌دهیم. برای خدمات پیشرفته مانند Load Balancing و محافظت DDoS، این مقدار به 99.99% افزایش می‌یابد. در صورت عدم رعایت این سطوح، اعتبار متناسب به حساب شما اضافه خواهد شد."
  },
  {
    question: "آیا برای استفاده از خدمات شبکه شما نیاز به تغییر در زیرساخت فعلی خود دارم؟",
    answer: "در اکثر موارد، خدمات ما به گونه‌ای طراحی شده‌اند که با حداقل تغییرات در زیرساخت موجود شما قابل پیاده‌سازی هستند. تیم فنی ما در تمام مراحل نصب و پیکربندی همراه شما خواهد بود تا اطمینان حاصل شود که همه چیز به درستی کار می‌کند و تأثیری بر عملیات جاری شما نخواهد داشت."
  }
];

const NetworkServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>خدمات شبکه | راهکارهای شبکه و پهنای باند | NovinVDS</title>
        <meta name="description" content="خدمات پیشرفته شبکه شامل محافظت DDoS، CDN، توزیع بار، VPN و مدیریت شبکه با پشتیبانی 24/7" />
        <meta name="keywords" content="خدمات شبکه, محافظت DDoS, شبکه تحویل محتوا, توزیع بار, VPN, پهنای باند" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">خدمات شبکه حرفه‌ای و امن</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              راهکارهای پیشرفته شبکه برای افزایش امنیت، سرعت و پایداری زیرساخت آنلاین شما
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="#network-services" className="px-8 py-3 bg-white text-blue-800 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                مشاهده خدمات
              </Link>
              <Link to="/contact" className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                مشاوره رایگان
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Network Services Section */}
      <section id="network-services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">خدمات شبکه NovinVDS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              خدمات پیشرفته و قابل اطمینان شبکه برای تمام نیازهای کسب و کار شما
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {networkServices.map((service) => (
              <div 
                key={service.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border ${service.popular ? 'border-blue-500' : 'border-transparent'} transition-all duration-300 hover:shadow-lg`}
              >
                {service.popular && (
                  <div className="bg-blue-600 text-white py-1 px-4 text-center text-sm">
                    پیشنهاد ویژه
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-center mb-3">{service.name}</h3>
                  <p className="text-gray-600 text-center mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-gray-700">
                        <CheckCircle className="text-green-500 ml-2 flex-shrink-0" size={18} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mb-6">
                    <p className="text-xl font-bold">{service.price}</p>
                  </div>
                  
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    سفارش سرویس
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bandwidth Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">بسته‌های پهنای باند اضافی</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پهنای باند اضافی برای سرورهای مجازی، اختصاصی و ابری
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bandwidthPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">{pkg.name}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ترافیک:</span>
                      <span className="font-bold">{pkg.traffic}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">سرعت:</span>
                      <span className="font-bold">{pkg.speed}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">قیمت ماهانه:</span>
                      <span className="text-xl font-bold">{pkg.price} تومان</span>
                    </div>
                    
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                      افزودن به سرور
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              بسته‌های پهنای باند سفارشی نیز در دسترس هستند. لطفاً با پشتیبانی ما تماس بگیرید.
            </p>
          </div>
        </div>
      </section>
      
      {/* Network Management Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">مدیریت شبکه حرفه‌ای</h2>
              <p className="text-gray-600 mb-6">
                تیم متخصصان شبکه ما آماده مدیریت کامل زیرساخت شبکه شما هستند. با استفاده از راهکارهای مدیریت شبکه NovinVDS، می‌توانید بر کسب و کار اصلی خود تمرکز کنید و مدیریت فنی را به ما بسپارید.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MonitorChart className="text-blue-600 ml-2" size={24} />
                    <h3 className="font-bold">مانیتورینگ 24/7</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    نظارت مداوم بر شبکه و هشدارهای لحظه‌ای
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Lock className="text-blue-600 ml-2" size={24} />
                    <h3 className="font-bold">مدیریت امنیت</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    پیکربندی فایروال و سیاست‌های امنیتی
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Router className="text-blue-600 ml-2" size={24} />
                    <h3 className="font-bold">مدیریت تجهیزات</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    پیکربندی و نگهداری روترها و سوئیچ‌ها
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <BarChart className="text-blue-600 ml-2" size={24} />
                    <h3 className="font-bold">بهینه‌سازی عملکرد</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    افزایش کارایی و بهبود زمان پاسخ‌دهی
                  </p>
                </div>
              </div>
              
              <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                درخواست مشاوره <ArrowRight size={18} className="mr-2" />
              </Link>
            </div>
            
            <div className="lg:w-1/2">
              <img 
                src="https://placehold.co/800x600/3b82f6/FFFFFF/png?text=Network+Management&font=Montserrat" 
                alt="مدیریت شبکه" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
              <p className="text-gray-600">
                پاسخ سوالات رایج درباره خدمات شبکه
              </p>
            </div>
            
            <div className="space-y-6">
              {networkFAQs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">ارتقای زیرساخت شبکه خود را همین امروز شروع کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            با خدمات شبکه NovinVDS، امنیت، سرعت و پایداری زیرساخت آنلاین خود را بهبود بخشید
            و از پشتیبانی متخصصان ما بهره‌مند شوید.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="#network-services" className="px-8 py-3 bg-white text-blue-800 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              انتخاب سرویس شبکه
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              مشاوره رایگان
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NetworkServices;

// Adding missing components that might be used in this file
const Database = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
};

const Router = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><rect x="2" y="14" width="20" height="8" rx="2"></rect><path d="M6.01 18H6"></path><path d="M10.01 18H10"></path><path d="M15 10v4"></path><path d="M17.84 7.17a4 4 0 0 0-5.66 0"></path><path d="M20.66 4.34a8 8 0 0 0-11.31 0"></path></svg>;
};

const MonitorChart = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><path d="M10 2h4"></path><path d="M12 14v-4"></path><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="m16 12-1.58-1.58a2 2 0 0 0-2.82 0L8 14"></path></svg>;
};

const BarChart = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>;
};

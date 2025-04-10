
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";
import { 
  Server, 
  Check, 
  Shield, 
  Cpu, 
  HardDrive, 
  Globe, 
  Zap, 
  MonitorSmartphone 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// VPS plan types and their detailed information
const vpsPlans = {
  linux: [
    {
      id: "linux-basic",
      name: "سرور مجازی لینوکس پایه",
      cpu: "2 هسته",
      ram: "2 گیگابایت",
      storage: "40 گیگابایت SSD NVMe",
      bandwidth: "1TB ترافیک ماهانه",
      price: "450,000",
      period: "ماهانه",
      location: "آلمان",
      popular: false,
    },
    {
      id: "linux-standard",
      name: "سرور مجازی لینوکس استاندارد",
      cpu: "3 هسته",
      ram: "4 گیگابایت",
      storage: "60 گیگابایت SSD NVMe",
      bandwidth: "2TB ترافیک ماهانه",
      price: "750,000",
      period: "ماهانه",
      location: "آلمان",
      popular: true,
    },
    {
      id: "linux-professional",
      name: "سرور مجازی لینوکس حرفه‌ای",
      cpu: "4 هسته",
      ram: "8 گیگابایت",
      storage: "100 گیگابایت SSD NVMe",
      bandwidth: "3TB ترافیک ماهانه",
      price: "1,250,000",
      period: "ماهانه",
      location: "آلمان",
      popular: false,
    },
    {
      id: "linux-enterprise",
      name: "سرور مجازی لینوکس سازمانی",
      cpu: "6 هسته",
      ram: "16 گیگابایت",
      storage: "160 گیگابایت SSD NVMe",
      bandwidth: "4TB ترافیک ماهانه",
      price: "2,500,000",
      period: "ماهانه",
      location: "آلمان",
      popular: false,
    }
  ],
  windows: [
    {
      id: "windows-basic",
      name: "سرور مجازی ویندوز پایه",
      cpu: "2 هسته",
      ram: "4 گیگابایت",
      storage: "60 گیگابایت SSD NVMe",
      bandwidth: "1TB ترافیک ماهانه",
      price: "650,000",
      period: "ماهانه",
      location: "آلمان",
      popular: false,
    },
    {
      id: "windows-standard",
      name: "سرور مجازی ویندوز استاندارد",
      cpu: "3 هسته",
      ram: "6 گیگابایت",
      storage: "80 گیگابایت SSD NVMe",
      bandwidth: "2TB ترافیک ماهانه",
      price: "950,000",
      period: "ماهانه",
      location: "آلمان",
      popular: true,
    },
    {
      id: "windows-professional",
      name: "سرور مجازی ویندوز حرفه‌ای",
      cpu: "4 هسته",
      ram: "8 گیگابایت",
      storage: "120 گیگابایت SSD NVMe",
      bandwidth: "3TB ترافیک ماهانه",
      price: "1,450,000",
      period: "ماهانه",
      location: "آلمان",
      popular: false,
    },
    {
      id: "windows-enterprise",
      name: "سرور مجازی ویندوز سازمانی",
      cpu: "6 هسته",
      ram: "16 گیگابایت",
      storage: "160 گیگابایت SSD NVMe",
      bandwidth: "4TB ترافیک ماهانه",
      price: "2,700,000",
      period: "ماهانه",
      location: "آلمان",
      popular: false,
    }
  ],
  ubuntu: [
    {
      id: "ubuntu-desktop-basic",
      name: "سرور مجازی اوبونتو دسکتاپ پایه",
      cpu: "2 هسته",
      ram: "4 گیگابایت",
      storage: "50 گیگابایت SSD NVMe",
      bandwidth: "1.5TB ترافیک ماهانه",
      price: "550,000",
      period: "ماهانه",
      location: "آلمان",
      popular: true,
    },
    {
      id: "ubuntu-desktop-standard",
      name: "سرور مجازی اوبونتو دسکتاپ استاندارد",
      cpu: "4 هسته",
      ram: "8 گیگابایت",
      storage: "100 گیگابایت SSD NVMe",
      bandwidth: "3TB ترافیک ماهانه",
      price: "1,100,000",
      period: "ماهانه",
      location: "آلمان",
      popular: false,
    }
  ],
  daily: [
    {
      id: "daily-basic",
      name: "سرور مجازی روزانه پایه",
      cpu: "2 هسته",
      ram: "2 گیگابایت",
      storage: "40 گیگابایت SSD NVMe",
      bandwidth: "100GB ترافیک",
      price: "25,000",
      period: "روزانه",
      location: "آلمان",
      popular: true,
    },
    {
      id: "daily-standard",
      name: "سرور مجازی روزانه استاندارد",
      cpu: "3 هسته",
      ram: "4 گیگابایت",
      storage: "60 گیگابایت SSD NVMe",
      bandwidth: "150GB ترافیک",
      price: "45,000",
      period: "روزانه",
      location: "آلمان",
      popular: false,
    }
  ],
  iran: [
    {
      id: "iran-linux-basic",
      name: "سرور مجازی لینوکس ایران پایه",
      cpu: "2 هسته",
      ram: "2 گیگابایت",
      storage: "40 گیگابایت SSD",
      bandwidth: "1TB ترافیک ماهانه",
      price: "550,000",
      period: "ماهانه",
      location: "ایران",
      popular: false,
    },
    {
      id: "iran-linux-standard",
      name: "سرور مجازی لینوکس ایران استاندارد",
      cpu: "3 هسته",
      ram: "4 گیگابایت",
      storage: "60 گیگابایت SSD",
      bandwidth: "2TB ترافیک ماهانه",
      price: "850,000",
      period: "ماهانه",
      location: "ایران",
      popular: true,
    },
    {
      id: "iran-windows-basic",
      name: "سرور مجازی ویندوز ایران پایه",
      cpu: "2 هسته",
      ram: "4 گیگابایت",
      storage: "60 گیگابایت SSD",
      bandwidth: "1TB ترافیک ماهانه",
      price: "750,000",
      period: "ماهانه",
      location: "ایران",
      popular: false,
    },
    {
      id: "iran-windows-standard",
      name: "سرور مجازی ویندوز ایران استاندارد",
      cpu: "3 هسته",
      ram: "6 گیگابایت",
      storage: "80 گیگابایت SSD",
      bandwidth: "2TB ترافیک ماهانه",
      price: "1,050,000",
      period: "ماهانه",
      location: "ایران",
      popular: false,
    }
  ]
};

// Frequently asked questions about VPS services
const vpsFAQs = [
  {
    question: "سرور مجازی چیست و چه تفاوتی با هاستینگ اشتراکی دارد؟",
    answer: "سرور مجازی (VPS) یک محیط مجازی شده است که منابع مشخصی از سرور فیزیکی را به صورت اختصاصی در اختیار شما قرار می‌دهد و امکان مدیریت کامل و دسترسی root را فراهم می‌کند. بر خلاف هاستینگ اشتراکی، در VPS منابع اختصاصی دارید و سایت‌های دیگر نمی‌توانند بر عملکرد سرور شما تأثیر بگذارند."
  },
  {
    question: "تفاوت بین سرور مجازی لینوکس و ویندوز چیست؟",
    answer: "سرور مجازی لینوکس معمولاً ارزان‌تر، امن‌تر و پایدارتر است و برای اپلیکیشن‌های وب مبتنی بر PHP، Python و Node.js مناسب‌تر است. سرور مجازی ویندوز برای اپلیکیشن‌هایی که به تکنولوژی‌های مایکروسافت مانند ASP.NET و SQL Server نیاز دارند مناسب است و رابط کاربری گرافیکی آشناتری دارد."
  },
  {
    question: "چه نوع پشتیبانی برای سرورهای مجازی ارائه می‌دهید؟",
    answer: "ما پشتیبانی 24/7 برای موارد فنی و زیرساختی ارائه می‌دهیم. این شامل مشکلات مربوط به سخت‌افزار، شبکه و در دسترس بودن سرور است. همچنین برای مشتریان سرورهای مجازی مدیریت شده، پشتیبانی برای نصب و پیکربندی نرم‌افزارهای عمومی نیز ارائه می‌شود."
  },
  {
    question: "آیا امکان ارتقاء منابع سرور مجازی در آینده وجود دارد؟",
    answer: "بله، شما می‌توانید در هر زمان منابع سرور مجازی خود را شامل CPU، RAM و فضای دیسک ارتقا دهید. این فرآیند معمولاً نیاز به راه‌اندازی مجدد سرور دارد و در کمترین زمان ممکن انجام می‌شود."
  },
  {
    question: "چقدر طول می‌کشد تا سرور مجازی من راه‌اندازی شود؟",
    answer: "پس از تأیید پرداخت، سرور مجازی شما معمولاً در کمتر از 30 دقیقه راه‌اندازی می‌شود و اطلاعات دسترسی برای شما ارسال خواهد شد. در برخی موارد خاص مانند سفارش‌های سازمانی یا پیکربندی‌های پیچیده، ممکن است این زمان تا چند ساعت افزایش یابد."
  },
  {
    question: "سرور مجازی روزانه برای چه کاربردهایی مناسب است؟",
    answer: "سرور مجازی روزانه برای پروژه‌های کوتاه مدت، آزمون نرم‌افزارها، انجام عملیات پردازشی موقت، پشتیبان‌گیری اضطراری، یا برای مواقعی که نیاز به سرور مجازی برای مدت زمان محدودی دارید، مناسب است و می‌تواند جایگزین اقتصادی برای اجاره سرورهای بلندمدت باشد."
  }
];

const VPSServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("linux");

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>سرور مجازی | خدمات سرور مجازی لینوکس و ویندوز | NovinVDS</title>
        <meta name="description" content="سرورهای مجازی لینوکس، ویندوز و اوبونتو دسکتاپ با قدرت پردازش بالا و پشتیبانی 24/7 برای نیازهای کسب و کار شما" />
        <meta name="keywords" content="سرور مجازی, سرور مجازی لینوکس, سرور مجازی ویندوز, vps, سرور مجازی ایران, سرور مجازی اوبونتو" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">سرورهای مجازی قدرتمند و مقرون به صرفه</h1>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              قدرت یک سرور اختصاصی با هزینه‌ای کمتر، راه‌اندازی فوری و منابع اختصاصی
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="#vps-plans" className="px-8 py-3 bg-white text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                مشاهده پلن‌ها
              </Link>
              <Link to="/contact" className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                مشاوره رایگان
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">مزایای سرور مجازی NovinVDS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              سرور مجازی با کیفیت بالا، عملکرد تضمین‌شده و پشتیبانی حرفه‌ای
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-5">
                <Cpu size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">منابع اختصاصی</h3>
              <p className="text-gray-600">
                منابع پردازشی اختصاصی با CPU، RAM و فضای ذخیره‌سازی مشخص برای اطمینان از عملکرد پایدار و قابل پیش‌بینی
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-5">
                <HardDrive size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">دیسک‌های SSD NVMe</h3>
              <p className="text-gray-600">
                استفاده از دیسک‌های SSD NVMe برای سرعت خواندن و نوشتن فوق‌العاده و عملکرد بهتر پایگاه داده و برنامه‌ها
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-5">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">راه‌اندازی آنی</h3>
              <p className="text-gray-600">
                راه‌اندازی سریع سرور مجازی در کمتر از 30 دقیقه پس از تأیید پرداخت و تحویل اطلاعات دسترسی
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-5">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت بالا</h3>
              <p className="text-gray-600">
                محافظت DDoS، فایروال‌های پیشرفته، پشتیبان‌گیری منظم و به‌روزرسانی‌های امنیتی خودکار برای محافظت از سرور شما
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-5">
                <Server size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">دسترسی کامل</h3>
              <p className="text-gray-600">
                دسترسی root/admin به سرور مجازی برای نصب نرم‌افزارها، سرویس‌ها و تنظیمات سفارشی مورد نیاز شما
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-5">
                <MonitorSmartphone size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">مدیریت آسان</h3>
              <p className="text-gray-600">
                پنل مدیریت قدرتمند برای کنترل سرور، نظارت بر منابع، راه‌اندازی مجدد و بکاپ‌گیری از سیستم
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* VPS Plans Section */}
      <section id="vps-plans" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">پلن‌های سرور مجازی</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پلن سرور مجازی مناسب خود را انتخاب کنید
            </p>
          </div>
          
          {/* Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveTab("linux")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "linux" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور مجازی لینوکس
            </button>
            <button 
              onClick={() => setActiveTab("windows")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "windows" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور مجازی ویندوز
            </button>
            <button 
              onClick={() => setActiveTab("ubuntu")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "ubuntu" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور مجازی اوبونتو دسکتاپ
            </button>
            <button 
              onClick={() => setActiveTab("daily")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "daily" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور مجازی روزانه
            </button>
            <button 
              onClick={() => setActiveTab("iran")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "iran" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور مجازی ایران
            </button>
          </div>
          
          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {vpsPlans[activeTab].map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border ${plan.popular ? 'border-indigo-500 transform scale-105' : 'border-transparent'} transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="bg-indigo-600 text-white py-1 px-4 text-center text-sm">
                    پرفروش‌ترین
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 mr-2">تومان / {plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-gray-700">
                      <Cpu className="text-indigo-500 ml-2 flex-shrink-0" size={18} />
                      <span>پردازنده: {plan.cpu}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Server className="text-indigo-500 ml-2 flex-shrink-0" size={18} />
                      <span>رم: {plan.ram}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <HardDrive className="text-indigo-500 ml-2 flex-shrink-0" size={18} />
                      <span>هارد: {plan.storage}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Globe className="text-indigo-500 ml-2 flex-shrink-0" size={18} />
                      <span>ترافیک: {plan.bandwidth}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="text-indigo-500 ml-2 flex-shrink-0" size={18} />
                      <span>موقعیت: {plan.location}</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    سفارش
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              نیاز به پلن سفارشی دارید؟
            </p>
            <Link to="/contact" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
              با کارشناسان ما تماس بگیرید <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Control Panel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">پنل کنترل پیشرفته</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              مدیریت آسان سرور مجازی با پنل کنترل اختصاصی NovinVDS
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <img 
                src="https://placehold.co/800x600/818cf8/FFFFFF/png?text=VPS+Control+Panel&font=Montserrat" 
                alt="پنل کنترل سرور مجازی" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">راه‌اندازی مجدد سریع</h3>
                  <p className="text-gray-600">امکان راه‌اندازی مجدد سرور با یک کلیک در هر زمان</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">نصب سیستم عامل</h3>
                  <p className="text-gray-600">نصب مجدد انواع سیستم عامل‌های لینوکس و ویندوز با انتخاب شما</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">مانیتورینگ منابع</h3>
                  <p className="text-gray-600">نظارت بر مصرف CPU، حافظه، دیسک و پهنای باند به صورت زنده</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">مدیریت پشتیبان</h3>
                  <p className="text-gray-600">تهیه و بازیابی پشتیبان از سیستم با چند کلیک ساده</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">کنسول دسترسی</h3>
                  <p className="text-gray-600">دسترسی به کنسول سرور در مواقع اضطراری بدون نیاز به SSH یا RDP</p>
                </div>
              </div>
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
                پاسخ سوالات رایج درباره سرورهای مجازی
              </p>
            </div>
            
            <div className="space-y-6">
              {vpsFAQs.map((faq, index) => (
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
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">سرور مجازی خود را همین امروز راه‌اندازی کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
            با سرورهای مجازی NovinVDS، از قدرت و انعطاف‌پذیری یک سرور اختصاصی با قیمتی مناسب بهره‌مند شوید
            و پروژه‌های خود را با اطمینان خاطر میزبانی کنید.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="#vps-plans" className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
              انتخاب پلن سرور مجازی
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

export default VPSServices;

// Adding missing components that might be used in this file
const MapPin = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
};

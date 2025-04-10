
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
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Dedicated server plans by region
const dedicatedPlans = {
  europe: [
    {
      id: "eu-basic",
      name: "سرور اختصاصی پایه",
      cpu: "Intel Xeon E-2236",
      cores: "6 هسته / 12 ترد",
      ram: "32 گیگابایت DDR4 ECC",
      storage: "2 × 1TB NVMe SSD",
      bandwidth: "نامحدود - 1Gbps",
      price: "8,500,000",
      period: "ماهانه",
      location: "آلمان (فرانکفورت)",
      datacenter: "Hetzner",
      popular: false,
    },
    {
      id: "eu-standard",
      name: "سرور اختصاصی استاندارد",
      cpu: "AMD EPYC 7443P",
      cores: "24 هسته / 48 ترد",
      ram: "128 گیگابایت DDR4 ECC",
      storage: "2 × 2TB NVMe SSD",
      bandwidth: "نامحدود - 10Gbps",
      price: "14,900,000",
      period: "ماهانه",
      location: "هلند (آمستردام)",
      datacenter: "LeaseWeb",
      popular: true,
    },
    {
      id: "eu-professional",
      name: "سرور اختصاصی حرفه‌ای",
      cpu: "Intel Xeon Gold 6348",
      cores: "28 هسته / 56 ترد",
      ram: "256 گیگابایت DDR4 ECC",
      storage: "2 × 3.84TB Enterprise SSD",
      bandwidth: "نامحدود - 10Gbps",
      price: "24,500,000",
      period: "ماهانه",
      location: "فرانسه (پاریس)",
      datacenter: "OVH",
      popular: false,
    },
    {
      id: "eu-enterprise",
      name: "سرور اختصاصی سازمانی",
      cpu: "2× Intel Xeon Gold 6348",
      cores: "56 هسته / 112 ترد",
      ram: "512 گیگابایت DDR4 ECC",
      storage: "4 × 3.84TB Enterprise SSD (RAID 10)",
      bandwidth: "نامحدود - 10Gbps",
      price: "42,000,000",
      period: "ماهانه",
      location: "آلمان (فرانکفورت)",
      datacenter: "Hetzner",
      popular: false,
    }
  ],
  america: [
    {
      id: "us-basic",
      name: "سرور اختصاصی پایه آمریکا",
      cpu: "Intel Xeon E-2288G",
      cores: "8 هسته / 16 ترد",
      ram: "64 گیگابایت DDR4 ECC",
      storage: "2 × 1TB NVMe SSD",
      bandwidth: "100TB - 1Gbps",
      price: "11,500,000",
      period: "ماهانه",
      location: "آمریکا (داکوتا)",
      datacenter: "FDC",
      popular: true,
    },
    {
      id: "us-standard",
      name: "سرور اختصاصی استاندارد آمریکا",
      cpu: "AMD EPYC 7502P",
      cores: "32 هسته / 64 ترد",
      ram: "128 گیگابایت DDR4 ECC",
      storage: "2 × 2TB NVMe SSD",
      bandwidth: "نامحدود - 10Gbps",
      price: "19,500,000",
      period: "ماهانه",
      location: "آمریکا (شیکاگو)",
      datacenter: "Steadfast",
      popular: false,
    }
  ],
  asia: [
    {
      id: "asia-basic",
      name: "سرور اختصاصی پایه آسیا",
      cpu: "Intel Xeon E-2278G",
      cores: "8 هسته / 16 ترد",
      ram: "32 گیگابایت DDR4 ECC",
      storage: "2 × 1TB NVMe SSD",
      bandwidth: "50TB - 1Gbps",
      price: "10,500,000",
      period: "ماهانه",
      location: "سنگاپور",
      datacenter: "Equinix",
      popular: true,
    },
    {
      id: "asia-standard",
      name: "سرور اختصاصی استاندارد آسیا",
      cpu: "AMD EPYC 7402P",
      cores: "24 هسته / 48 ترد",
      ram: "128 گیگابایت DDR4 ECC",
      storage: "2 × 2TB NVMe SSD",
      bandwidth: "100TB - 10Gbps",
      price: "17,800,000",
      period: "ماهانه",
      location: "ژاپن (توکیو)",
      datacenter: "NTT",
      popular: false,
    }
  ],
  iran: [
    {
      id: "iran-basic",
      name: "سرور اختصاصی پایه ایران",
      cpu: "Intel Xeon Silver 4214",
      cores: "12 هسته / 24 ترد",
      ram: "64 گیگابایت DDR4 ECC",
      storage: "2 × 1TB SSD",
      bandwidth: "نامحدود - 1Gbps",
      price: "15,800,000",
      period: "ماهانه",
      location: "ایران (تهران)",
      datacenter: "آسیاتک",
      popular: true,
    },
    {
      id: "iran-standard",
      name: "سرور اختصاصی استاندارد ایران",
      cpu: "Intel Xeon Gold 6248",
      cores: "20 هسته / 40 ترد",
      ram: "128 گیگابایت DDR4 ECC",
      storage: "2 × 2TB SSD",
      bandwidth: "نامحدود - 10Gbps",
      price: "26,500,000",
      period: "ماهانه",
      location: "ایران (تهران)",
      datacenter: "افرانت",
      popular: false,
    }
  ]
};

// Frequently asked questions about dedicated servers
const dedicatedFAQs = [
  {
    question: "تفاوت سرور اختصاصی با سرور مجازی چیست؟",
    answer: "سرور اختصاصی یک سرور فیزیکی کامل است که تمام منابع آن (پردازنده، حافظه، دیسک) در اختیار شماست و هیچ کاربر دیگری از آن استفاده نمی‌کند. این برخلاف سرور مجازی است که بخشی از منابع یک سرور فیزیکی را به اشتراک می‌گذارد. سرور اختصاصی عملکرد بالاتر، امنیت بیشتر و قابلیت شخصی‌سازی کامل‌تری ارائه می‌دهد."
  },
  {
    question: "چه زمانی به سرور اختصاصی نیاز دارم؟",
    answer: "سرور اختصاصی برای کسب و کارهای با ترافیک بالا، اپلیکیشن‌های سنگین، پایگاه‌های داده بزرگ، سرویس‌های گیمینگ، هوش مصنوعی و پردازش داده، یا وب‌سایت‌هایی که نیاز به عملکرد بالا و ثبات دارند مناسب است. همچنین برای سازمان‌هایی که نیازمند امنیت بالا و انطباق با استانداردهای خاص هستند، سرور اختصاصی گزینه بهتری است."
  },
  {
    question: "آیا می‌توانم سخت‌افزار سرور اختصاصی خود را ارتقا دهم؟",
    answer: "بله، یکی از مزایای سرور اختصاصی امکان ارتقای سخت‌افزاری آن است. شما می‌توانید بر اساس نیاز خود، پردازنده، حافظه RAM، هارد دیسک و سایر قطعات سرور را ارتقا دهید. برای این کار با تیم پشتیبانی ما تماس بگیرید تا هماهنگی‌های لازم انجام شود."
  },
  {
    question: "سطح دسترسی و مدیریت سرور اختصاصی چگونه است؟",
    answer: "شما دسترسی کامل Administrator/Root به سرور اختصاصی خود دارید و می‌توانید هر سیستم عامل، نرم‌افزار یا سرویسی که نیاز دارید را نصب و پیکربندی کنید. علاوه بر این، ما خدمات مدیریت سرور نیز ارائه می‌دهیم تا در صورت تمایل، مدیریت فنی سرور را به متخصصان ما بسپارید."
  },
  {
    question: "زمان راه‌اندازی سرور اختصاصی چقدر است؟",
    answer: "برای سرورهای اختصاصی با پیکربندی استاندارد، معمولاً راه‌اندازی در کمتر از 24 ساعت کاری پس از تأیید پرداخت انجام می‌شود. برای پیکربندی‌های سفارشی یا سرورهای سازمانی، ممکن است این زمان تا 72 ساعت افزایش یابد. در صورت نیاز به راه‌اندازی سریع‌تر، با پشتیبانی ما تماس بگیرید."
  },
  {
    question: "آیا پشتیبان‌گیری خودکار برای سرور اختصاصی ارائه می‌شود؟",
    answer: "بله، ما سرویس پشتیبان‌گیری خودکار را به صورت اختیاری برای سرورهای اختصاصی ارائه می‌دهیم. با این سرویس، داده‌های سرور شما به صورت روزانه، هفتگی یا ماهانه (بر اساس نیاز شما) در فضای ذخیره‌سازی امن و مجزا پشتیبان‌گیری می‌شود. این سرویس با هزینه اضافی قابل خریداری است."
  }
];

const DedicatedServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("europe");

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>سرور اختصاصی | خدمات سرور اختصاصی قدرتمند | NovinVDS</title>
        <meta name="description" content="سرورهای اختصاصی قدرتمند با قطعات سخت‌افزاری درجه یک در دیتاسنترهای معتبر جهان برای کسب و کارها و پروژه‌های سنگین" />
        <meta name="keywords" content="سرور اختصاصی, سرور فیزیکی, dedicated server, سرور اختصاصی آلمان, سرور اختصاصی ایران, سرور اختصاصی آمریکا" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">سرورهای اختصاصی با بالاترین عملکرد</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              قدرت بی‌نظیر سرورهای اختصاصی با سخت‌افزار درجه یک در دیتاسنترهای معتبر جهان
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="#dedicated-plans" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
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
            <h2 className="text-3xl font-bold mb-4">مزایای سرورهای اختصاصی NovinVDS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              چرا باید سرور اختصاصی NovinVDS را انتخاب کنید؟
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-5">
                <Cpu size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">سخت‌افزار اختصاصی</h3>
              <p className="text-gray-600">
                تمامی منابع سرور فیزیکی به صورت کامل در اختیار شماست. پردازنده، حافظه RAM، هارد دیسک و پهنای باند مختص شماست و با هیچ کاربر دیگری به اشتراک گذاشته نمی‌شود.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-5">
                <Server size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">عملکرد فوق‌العاده</h3>
              <p className="text-gray-600">
                بالاترین سطح عملکرد و پایداری برای اجرای برنامه‌های سنگین، پایگاه‌های داده بزرگ، سرویس‌های گیمینگ و هر نوع کاربرد با نیاز به پردازش بالا.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-5">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت پیشرفته</h3>
              <p className="text-gray-600">
                امنیت بالاتر با ایزوله‌سازی کامل، سیستم محافظت DDoS پیشرفته، فایروال‌های اختصاصی و پروتکل‌های امنیتی سخت‌گیرانه در دیتاسنترها.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-5">
                <HardDrive size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">برندهای معتبر</h3>
              <p className="text-gray-600">
                استفاده از سخت‌افزارهای با کیفیت از برندهای معتبر جهانی مانند HP، Dell، Supermicro و Intel با گارانتی رسمی و پشتیبانی کامل.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-5">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">دیتاسنترهای معتبر</h3>
              <p className="text-gray-600">
                میزبانی در بهترین دیتاسنترهای جهان با استانداردهای Tier 3+ و بالاتر، زیرساخت‌های افزونه، سیستم‌های پشتیبان متعدد و امنیت فیزیکی 24/7.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-5">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">پهنای باند اختصاصی</h3>
              <p className="text-gray-600">
                پهنای باند اختصاصی با سرعت فوق‌العاده 1Gbps تا 10Gbps و ترافیک نامحدود برای پروژه‌های پربازدید.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dedicated Server Plans Section */}
      <section id="dedicated-plans" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">پلن‌های سرور اختصاصی</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              سرور اختصاصی مناسب نیاز خود را انتخاب کنید
            </p>
          </div>
          
          {/* Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveTab("europe")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "europe" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور اختصاصی اروپا
            </button>
            <button 
              onClick={() => setActiveTab("america")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "america" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور اختصاصی آمریکا
            </button>
            <button 
              onClick={() => setActiveTab("asia")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "asia" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور اختصاصی آسیا
            </button>
            <button 
              onClick={() => setActiveTab("iran")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === "iran" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              سرور اختصاصی ایران
            </button>
          </div>
          
          {/* Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dedicatedPlans[activeTab].map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border ${plan.popular ? 'border-blue-500' : 'border-transparent'} transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="bg-blue-600 text-white py-1 px-4 text-center text-sm">
                    پرفروش‌ترین
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">دیتاسنتر: {plan.datacenter} - {plan.location}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 mr-2">تومان / {plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <Cpu className="text-blue-500 ml-2 flex-shrink-0" size={18} />
                        <div>
                          <p className="font-bold">پردازنده</p>
                          <p className="text-sm">{plan.cpu}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Server className="text-blue-500 ml-2 flex-shrink-0" size={18} />
                        <div>
                          <p className="font-bold">هسته پردازشی</p>
                          <p className="text-sm">{plan.cores}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MemoryStick className="text-blue-500 ml-2 flex-shrink-0" size={18} />
                        <div>
                          <p className="font-bold">حافظه رم</p>
                          <p className="text-sm">{plan.ram}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <HardDrive className="text-blue-500 ml-2 flex-shrink-0" size={18} />
                        <div>
                          <p className="font-bold">ذخیره‌سازی</p>
                          <p className="text-sm">{plan.storage}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Globe className="text-blue-500 ml-2 flex-shrink-0" size={18} />
                        <div>
                          <p className="font-bold">پهنای باند</p>
                          <p className="text-sm">{plan.bandwidth}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="text-blue-500 ml-2 flex-shrink-0" size={18} />
                        <div>
                          <p className="font-bold">موقعیت</p>
                          <p className="text-sm">{plan.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    سفارش سرور
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-2">راه‌اندازی در کمتر از 24 ساعت</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              نیاز به پیکربندی سفارشی دارید؟
            </p>
            <Link to="/contact" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              با کارشناسان ما تماس بگیرید <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Add-ons Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">افزونه‌های سرور اختصاصی</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              خدمات و قطعات اضافی برای تکمیل سرور اختصاصی شما
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">افزایش فضای ذخیره‌سازی</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>هارد دیسک اضافه 1TB SSD: 3,500,000 تومان</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>هارد دیسک اضافه 2TB SSD: 6,800,000 تومان</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>هارد دیسک اضافه 4TB SSD: 13,500,000 تومان</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>پیکربندی RAID: از 1,200,000 تومان</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">پنل‌های مدیریت</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>لایسنس cPanel: 1,800,000 تومان / ماهانه</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>لایسنس DirectAdmin: 950,000 تومان / ماهانه</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>لایسنس Plesk: 1,300,000 تومان / ماهانه</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>لایسنس WHM: 1,500,000 تومان / ماهانه</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">خدمات اضافی</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>ترافیک اضافه: از 500,000 تومان</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>IP اضافه: 250,000 تومان / ماهانه</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>پشتیبان‌گیری خودکار: 850,000 تومان / ماهانه</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={18} />
                  <span>مدیریت سرور: از 1,500,000 تومان / ماهانه</span>
                </li>
              </ul>
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
                پاسخ سوالات رایج درباره سرورهای اختصاصی
              </p>
            </div>
            
            <div className="space-y-6">
              {dedicatedFAQs.map((faq, index) => (
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">سرور اختصاصی حرفه‌ای برای کسب و کار شما</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            با سرورهای اختصاصی NovinVDS، از بالاترین عملکرد و امنیت برای کسب و کار خود بهره‌مند شوید
            و به پشتیبانی 24/7 متخصصان ما اطمینان کنید.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="#dedicated-plans" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              انتخاب سرور اختصاصی
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

export default DedicatedServices;

// Adding missing components that might be used in this file
const ArrowRight = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>;
};

const MapPin = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
};

const MemoryStick = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><path d="M6 19v-3"></path><path d="M10 19v-3"></path><path d="M14 19v-3"></path><path d="M18 19v-3"></path><path d="M8 11V9"></path><path d="M16 11V9"></path><path d="M12 11V9"></path><path d="M2 15h20"></path><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"></path></svg>;
};

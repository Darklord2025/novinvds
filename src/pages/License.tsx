
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Key, Check, Lock, ShieldCheck, CreditCard, Download, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const License = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // License Products
  const licenses = [
    {
      name: "Windows Server 2022 Standard",
      price: "2,450,000",
      period: "مادام‌العمر",
      image: "https://placehold.co/200x200/4f46e5/FFFFFF/png?text=Windows+Server&font=Montserrat",
      features: [
        "لایسنس اصلی و معتبر",
        "امکان آپدیت",
        "گارانتی اصالت",
        "فعال‌سازی آنلاین"
      ]
    },
    {
      name: "Microsoft Office 2021 Professional",
      price: "1,890,000",
      period: "مادام‌العمر",
      image: "https://placehold.co/200x200/4f46e5/FFFFFF/png?text=Office&font=Montserrat",
      features: [
        "لایسنس اصلی و معتبر",
        "نصب روی یک سیستم",
        "گارانتی اصالت",
        "آپدیت‌های رسمی"
      ]
    },
    {
      name: "Windows 11 Professional",
      price: "1,350,000",
      period: "مادام‌العمر",
      image: "https://placehold.co/200x200/4f46e5/FFFFFF/png?text=Windows+11&font=Montserrat",
      features: [
        "لایسنس اصلی و معتبر",
        "امکان آپدیت",
        "گارانتی اصالت",
        "فعال‌سازی آنلاین"
      ]
    },
    {
      name: "VMware vSphere 7 Enterprise Plus",
      price: "24,900,000",
      period: "سالانه",
      image: "https://placehold.co/200x200/4f46e5/FFFFFF/png?text=VMware&font=Montserrat",
      features: [
        "لایسنس اصلی و معتبر",
        "پشتیبانی فنی",
        "آپدیت‌های امنیتی",
        "دسترسی به پورتال پشتیبانی"
      ]
    },
    {
      name: "Plesk Web Pro Edition",
      price: "1,790,000",
      period: "سالانه",
      image: "https://placehold.co/200x200/4f46e5/FFFFFF/png?text=Plesk&font=Montserrat",
      features: [
        "لایسنس اصلی و معتبر",
        "مدیریت 30 دامنه",
        "پشتیبانی فنی 24/7",
        "آپدیت‌های امنیتی"
      ]
    },
    {
      name: "cPanel Solo",
      price: "1,190,000",
      period: "سالانه",
      image: "https://placehold.co/200x200/4f46e5/FFFFFF/png?text=cPanel&font=Montserrat",
      features: [
        "لایسنس اصلی و معتبر",
        "یک حساب",
        "پشتیبانی فنی 24/7",
        "آپدیت‌های امنیتی"
      ]
    },
    {
      name: "WHMCS Standard",
      price: "3,490,000",
      period: "سالانه",
      image: "https://placehold.co/200x200/4f46e5/FFFFFF/png?text=WHMCS&font=Montserrat",
      features: [
        "لایسنس اصلی و معتبر",
        "مدیریت 250 مشتری",
        "پشتیبانی فنی",
        "آپدیت‌های امنیتی"
      ]
    },
    {
      name: "Cloudflare Pro",
      price: "950,000",
      period: "ماهانه",
      image: "https://placehold.co/200x200/4f46e5/FFFFFF/png?text=Cloudflare&font=Montserrat",
      features: [
        "لایسنس اصلی و معتبر",
        "حفاظت پیشرفته وب",
        "CDN جهانی",
        "پشتیبانی فنی"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">خرید لایسنس‌های اصلی نرم‌افزارها</h1>
                <p className="text-purple-100 text-lg mb-8">
                  لایسنس‌های اصلی و معتبر انواع نرم‌افزارها با قیمت مناسب و فعال‌سازی آنی
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-purple-500 p-1 rounded-full" size={20} />
                    <span>تضمین اصالت و گارانتی بازگشت وجه</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-purple-500 p-1 rounded-full" size={20} />
                    <span>فعالسازی آنلاین و بدون نیاز به واسطه</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-purple-500 p-1 rounded-full" size={20} />
                    <span>قیمت‌های مناسب با تخفیف‌های ویژه</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-purple-500 p-1 rounded-full" size={20} />
                    <span>پشتیبانی فنی و راهنمای فعال‌سازی</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 flex justify-center items-center">
                <img 
                  src="https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Software+Licenses&font=Montserrat" 
                  alt="لایسنس نرم‌افزار" 
                  className="rounded-lg shadow-lg max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* License Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">دسته‌بندی لایسنس‌ها</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ارائه انواع لایسنس‌های نرم‌افزاری برای نیازهای مختلف شخصی و سازمانی
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                <Key size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">سیستم عامل</h3>
              <p className="text-gray-600 mb-4">
                انواع لایسنس‌های ویندوز، سرور و سیستم‌عامل‌های متنوع
              </p>
              <Link to="/license" className="text-purple-600 font-medium">مشاهده همه</Link>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">امنیتی</h3>
              <p className="text-gray-600 mb-4">
                آنتی‌ویروس، فایروال و نرم‌افزارهای امنیتی پیشرفته
              </p>
              <Link to="/license" className="text-purple-600 font-medium">مشاهده همه</Link>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">مجازی‌سازی</h3>
              <p className="text-gray-600 mb-4">
                VMware، Hyper-V و سایر نرم‌افزارهای مجازی‌سازی
              </p>
              <Link to="/license" className="text-purple-600 font-medium">مشاهده همه</Link>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                <Download size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">کاربردی</h3>
              <p className="text-gray-600 mb-4">
                آفیس، ادوبی و سایر نرم‌افزارهای کاربردی
              </p>
              <Link to="/license" className="text-purple-600 font-medium">مشاهده همه</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Licenses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">پرفروش‌ترین لایسنس‌ها</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              محبوب‌ترین لایسنس‌های نرم‌افزاری که توسط مشتریان ما خریداری می‌شوند
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {licenses.slice(0, 8).map((license, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4 flex justify-center bg-gray-50">
                  <img src={license.image} alt={license.name} className="h-32 w-32 object-contain" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{license.name}</h3>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xl font-bold text-purple-600">{license.price} تومان</span>
                    <span className="text-sm text-gray-500">{license.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {license.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check size={16} className="ml-2 text-green-500 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/license" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
              مشاهده همه لایسنس‌ها
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">چرا باید لایسنس اصلی خریداری کنید؟</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              مزایای استفاده از لایسنس‌های اصلی و معتبر برای کسب و کار و استفاده شخصی
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-5">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت و پایداری</h3>
              <p className="text-gray-600">
                لایسنس‌های اصلی تضمین می‌کنند که نرم‌افزار شما امن و به‌روز است و در برابر تهدیدهای امنیتی محافظت می‌شود.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-5">
                <Download size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">دسترسی به آپدیت‌ها</h3>
              <p className="text-gray-600">
                با لایسنس‌های اصلی به تمام به‌روزرسانی‌ها، وصله‌های امنیتی و قابلیت‌های جدید نرم‌افزار دسترسی خواهید داشت.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-5">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">پشتیبانی رسمی</h3>
              <p className="text-gray-600">
                با خرید لایسنس اصلی، به خدمات پشتیبانی رسمی شرکت سازنده دسترسی خواهید داشت و می‌توانید مشکلات فنی خود را سریع‌تر حل کنید.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-5">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">قانونی بودن</h3>
              <p className="text-gray-600">
                استفاده از نرم‌افزارهای دارای لایسنس اصلی، شما را از نظر قانونی محافظت می‌کند و از جریمه‌های احتمالی جلوگیری می‌کند.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-5">
                <CreditCard size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">ارزش سرمایه‌گذاری</h3>
              <p className="text-gray-600">
                هزینه خرید لایسنس اصلی در مقایسه با خطرات امنیتی، حقوقی و عملکردی استفاده از نسخه‌های غیرمجاز بسیار ناچیز است.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-5">
                <Key size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">دسترسی به قابلیت‌های کامل</h3>
              <p className="text-gray-600">
                با لایسنس اصلی به تمام قابلیت‌ها و امکانات نرم‌افزار دسترسی خواهید داشت، بدون هیچ محدودیتی.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Volume Licensing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">لایسنس‌های سازمانی و حجمی</h2>
                <p className="text-gray-600 mb-6">
                  برای سازمان‌ها و شرکت‌هایی که نیاز به خرید تعداد زیادی لایسنس دارند، ما راهکارهای لایسنس حجمی با تخفیف‌های ویژه ارائه می‌دهیم.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check size={18} className="ml-2 text-green-500 mt-1" />
                    <span>تخفیف‌های ویژه برای خرید حجمی</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="ml-2 text-green-500 mt-1" />
                    <span>مدیریت متمرکز لایسنس‌ها</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="ml-2 text-green-500 mt-1" />
                    <span>قابلیت انتقال بین کاربران</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="ml-2 text-green-500 mt-1" />
                    <span>پشتیبانی فنی اختصاصی</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="ml-2 text-green-500 mt-1" />
                    <span>امکان پرداخت اقساطی</span>
                  </li>
                </ul>
                <Link to="/contact" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  درخواست مشاوره رایگان
                </Link>
              </div>
              <div className="md:w-1/2 bg-gray-50 p-6 md:p-10 flex justify-center items-center">
                <img 
                  src="https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Volume+Licensing&font=Montserrat" 
                  alt="لایسنس حجمی" 
                  className="rounded-lg max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پاسخ سوالات رایج شما درباره خرید لایسنس نرم‌افزارها
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">تفاوت لایسنس OEM، Retail و Volume چیست؟</h4>
              <p className="text-gray-600">
                لایسنس OEM همراه با سخت‌افزار فروخته می‌شود و به سیستم خاصی متصل است. لایسنس Retail قابل انتقال به سیستم‌های مختلف است و مستقیماً از تولیدکننده خریداری می‌شود. لایسنس Volume برای سازمان‌هایی است که تعداد زیادی نرم‌افزار نیاز دارند و معمولاً با تخفیف عرضه می‌شود.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا می‌توانم لایسنس را بر روی چند دستگاه نصب کنم؟</h4>
              <p className="text-gray-600">
                این به نوع لایسنس بستگی دارد. لایسنس‌های شخصی معمولاً فقط روی یک دستگاه قابل نصب هستند. برخی لایسنس‌ها امکان نصب روی چند دستگاه را می‌دهند، به شرطی که توسط یک کاربر استفاده شوند. لایسنس‌های سازمانی معمولاً بر اساس تعداد کاربر یا دستگاه قیمت‌گذاری می‌شوند.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">روش فعال‌سازی لایسنس‌ها چگونه است؟</h4>
              <p className="text-gray-600">
                پس از خرید، یک کد فعال‌سازی (Product Key) دریافت خواهید کرد. این کد را می‌توانید در بخش فعال‌سازی نرم‌افزار وارد کنید. برای هر محصول، راهنمای فعال‌سازی به صورت جداگانه ارائه می‌شود. در صورت بروز مشکل، تیم پشتیبانی ما آماده کمک به شما است.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا لایسنس‌ها گارانتی دارند؟</h4>
              <p className="text-gray-600">
                بله، تمام لایسنس‌های ارائه شده توسط NovinVDS دارای گارانتی اصالت هستند. در صورتی که لایسنس خریداری شده به هر دلیلی کار نکند یا غیرمعتبر باشد، ما آن را تعویض می‌کنیم یا وجه شما را بازگردانیم. لایسنس‌های دائمی به صورت مادام‌العمر معتبر هستند و لایسنس‌های اشتراکی تا زمان اعتبار آنها پشتیبانی می‌شوند.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">امروز لایسنس اصلی خود را تهیه کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-purple-100">
            با خرید لایسنس‌های اصلی، از امنیت، پشتیبانی و به‌روزرسانی‌های رسمی برخوردار شوید
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              مشاهده همه لایسنس‌ها
            </button>
            <button className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              مشاوره خرید
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default License;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Wifi, Globe, Server, Lock, ArrowRight, BarChart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/PricingCard';

const Network = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Network Service Plans
  const networkPlans = [
    {
      title: "اشتراک پایه",
      price: "790,000",
      period: "ماهانه",
      description: "مناسب برای کسب و کارهای کوچک و وبسایت‌های شخصی",
      features: [
        { text: "مدیریت ۵ دستگاه شبکه", available: true },
        { text: "کانفیگ ۳ فایروال", available: true },
        { text: "پشتیبانی ایمیل", available: true },
        { text: "زمان پاسخگویی: 24 ساعت", available: true },
        { text: "مانیتورینگ اولیه شبکه", available: true },
        { text: "مشاوره امنیتی", available: false },
        { text: "پشتیبانی تلفنی", available: false },
        { text: "پشتیبانی VIP", available: false },
      ],
      popular: false,
    },
    {
      title: "اشتراک حرفه‌ای",
      price: "1,990,000",
      period: "ماهانه",
      description: "مناسب برای شرکت‌های متوسط و کسب و کارهای آنلاین",
      features: [
        { text: "مدیریت ۲۰ دستگاه شبکه", available: true },
        { text: "کانفیگ ۱۰ فایروال", available: true },
        { text: "پشتیبانی ایمیل و تلفنی", available: true },
        { text: "زمان پاسخگویی: 8 ساعت", available: true },
        { text: "مانیتورینگ پیشرفته شبکه", available: true },
        { text: "مشاوره امنیتی", available: true },
        { text: "بررسی دوره‌ای امنیت", available: true },
        { text: "پشتیبانی VIP", available: false },
      ],
      popular: true,
    },
    {
      title: "اشتراک سازمانی",
      price: "4,990,000",
      period: "ماهانه",
      description: "مناسب برای سازمان‌های بزرگ و شرکت‌های سازمانی",
      features: [
        { text: "مدیریت نامحدود دستگاه‌های شبکه", available: true },
        { text: "کانفیگ نامحدود فایروال", available: true },
        { text: "پشتیبانی 24/7", available: true },
        { text: "زمان پاسخگویی: 2 ساعت", available: true },
        { text: "مانیتورینگ سازمانی شبکه", available: true },
        { text: "مشاوره امنیتی تخصصی", available: true },
        { text: "بررسی هفتگی امنیت", available: true },
        { text: "پشتیبانی VIP", available: true },
      ],
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">خدمات شبکه و امنیت حرفه‌ای</h1>
                <p className="text-blue-100 text-lg mb-8">
                  راهکارهای شبکه و امنیت برای کسب و کارها و سازمان‌ها با بالاترین استانداردها و جدیدترین فناوری‌ها
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Shield className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>راهکارهای امنیتی پیشرفته</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Wifi className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>طراحی و پیاده‌سازی شبکه‌های پرسرعت</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Server className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>پشتیبانی از شبکه‌های سازمانی</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Globe className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>اتصال به شبکه‌های جهانی با بالاترین کیفیت</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 flex justify-center items-center">
                <img 
                  src="https://placehold.co/600x400/0284c7/FFFFFF/png?text=Network+Services&font=Montserrat" 
                  alt="خدمات شبکه" 
                  className="rounded-lg shadow-lg max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">خدمات شبکه ما</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ارائه انواع خدمات شبکه و امنیت با استفاده از تجهیزات پیشرفته و تیم متخصص
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Wifi size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">طراحی و پیاده‌سازی شبکه</h3>
              <p className="text-gray-600">
                طراحی، پیاده‌سازی و بهینه‌سازی زیرساخت‌های شبکه‌ای سازمانی، سیستم‌های ذخیره‌سازی و راهکارهای پشتیبان‌گیری
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت شبکه</h3>
              <p className="text-gray-600">
                پیاده‌سازی سیستم‌های امنیتی، فایروال‌های پیشرفته، سیستم‌های تشخیص و پیشگیری از نفوذ (IDS/IPS) و راهکارهای امنیتی سازمانی
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">زیرساخت‌های سرور</h3>
              <p className="text-gray-600">
                طراحی و پیاده‌سازی مراکز داده، سرورهای فیزیکی و مجازی، راهکارهای مجازی‌سازی و سیستم‌های کلاستر با قابلیت High Availability
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">VPN و دسترسی از راه دور</h3>
              <p className="text-gray-600">
                راه‌اندازی سیستم‌های VPN، دسترسی امن از راه دور، اتصالات Site-to-Site و راهکارهای SD-WAN برای اتصال شعب و دفاتر
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">مانیتورینگ و تحلیل شبکه</h3>
              <p className="text-gray-600">
                راه‌اندازی سیستم‌های مانیتورینگ 24/7، تحلیل ترافیک، مدیریت لاگ و گزارش‌گیری هوشمند از وضعیت شبکه و سرورها
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">CDN و بهینه‌سازی ترافیک</h3>
              <p className="text-gray-600">
                پیاده‌سازی CDN، بهینه‌سازی ترافیک وب، Load Balancing و راهکارهای شتاب‌دهنده محتوا برای افزایش سرعت و کارایی
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Subscription Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">اشتراک خدمات شبکه</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              اشتراک‌های منظم خدمات شبکه و امنیت برای پشتیبانی مداوم از زیرساخت‌های شما
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {networkPlans.map((plan, index) => (
              <PricingCard 
                key={index}
                title={plan.title} 
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                popular={plan.popular}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/contact" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              نیاز به خدمات سفارشی دارید؟ با متخصصان ما تماس بگیرید <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Technologies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">تجهیزات و تکنولوژی‌ها</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              استفاده از بهترین تجهیزات و فناوری‌های روز دنیا در ارائه خدمات شبکه و امنیت
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/100x60/0284c7/FFFFFF/png?text=Cisco&font=Montserrat" alt="Cisco" className="mx-auto mb-3" />
              <h4 className="font-bold">Cisco</h4>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/100x60/0284c7/FFFFFF/png?text=Juniper&font=Montserrat" alt="Juniper" className="mx-auto mb-3" />
              <h4 className="font-bold">Juniper</h4>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/100x60/0284c7/FFFFFF/png?text=FortiNet&font=Montserrat" alt="FortiNet" className="mx-auto mb-3" />
              <h4 className="font-bold">FortiNet</h4>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/100x60/0284c7/FFFFFF/png?text=Palo+Alto&font=Montserrat" alt="Palo Alto" className="mx-auto mb-3" />
              <h4 className="font-bold">Palo Alto</h4>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/100x60/0284c7/FFFFFF/png?text=VMware&font=Montserrat" alt="VMware" className="mx-auto mb-3" />
              <h4 className="font-bold">VMware</h4>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/100x60/0284c7/FFFFFF/png?text=Mikrotik&font=Montserrat" alt="Mikrotik" className="mx-auto mb-3" />
              <h4 className="font-bold">Mikrotik</h4>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/100x60/0284c7/FFFFFF/png?text=Ubiquiti&font=Montserrat" alt="Ubiquiti" className="mx-auto mb-3" />
              <h4 className="font-bold">Ubiquiti</h4>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/100x60/0284c7/FFFFFF/png?text=HPE+Aruba&font=Montserrat" alt="HPE Aruba" className="mx-auto mb-3" />
              <h4 className="font-bold">HPE Aruba</h4>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">نمونه پروژه‌های ما</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              بخشی از پروژه‌های موفق اجرا شده توسط تیم متخصص NovinVDS
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/600x300/0284c7/FFFFFF/png?text=Banking+Network&font=Montserrat" 
                alt="پروژه بانکی" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">زیرساخت شبکه بانکی</h3>
                <p className="text-gray-600 mb-4">
                  طراحی و پیاده‌سازی شبکه امن برای یک موسسه مالی با بیش از 50 شعبه و سیستم مانیتورینگ مرکزی
                </p>
                <Link to="/contact" className="text-blue-600 font-medium hover:text-blue-800">مطالعه بیشتر</Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/600x300/0284c7/FFFFFF/png?text=Corporate+Security&font=Montserrat" 
                alt="امنیت سازمانی" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">امنیت سازمانی</h3>
                <p className="text-gray-600 mb-4">
                  پیاده‌سازی راهکارهای امنیتی چندلایه برای یک شرکت بزرگ با بیش از 1000 کاربر و حفاظت از داده‌های حساس
                </p>
                <Link to="/contact" className="text-blue-600 font-medium hover:text-blue-800">مطالعه بیشتر</Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src="https://placehold.co/600x300/0284c7/FFFFFF/png?text=Data+Center&font=Montserrat" 
                alt="مرکز داده" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">طراحی مرکز داده</h3>
                <p className="text-gray-600 mb-4">
                  طراحی و راه‌اندازی یک مرکز داده کامل با زیرساخت‌های مجازی‌سازی، سیستم‌های پشتیبان و مانیتورینگ پیشرفته
                </p>
                <Link to="/contact" className="text-blue-600 font-medium hover:text-blue-800">مطالعه بیشتر</Link>
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
              پاسخ سوالات رایج شما درباره خدمات شبکه و امنیت
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">چرا به خدمات شبکه حرفه‌ای نیاز داریم؟</h4>
              <p className="text-gray-600">
                یک شبکه امن و بهینه برای حفاظت از داده‌ها، بهبود بهره‌وری، کاهش زمان خرابی‌ها و ایجاد زیرساخت قابل اعتماد برای کسب و کار ضروری است. خدمات شبکه حرفه‌ای باعث می‌شود سازمان شما در برابر تهدیدات امنیتی محافظت شود و از بهترین عملکرد ممکن برخوردار باشد.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">چه تجهیزاتی برای راه‌اندازی یک شبکه امن لازم است؟</h4>
              <p className="text-gray-600">
                برای راه‌اندازی یک شبکه امن، تجهیزاتی مانند روترهای پیشرفته، سوئیچ‌های مدیریتی، فایروال‌های سخت‌افزاری و نرم‌افزاری، سیستم‌های IDS/IPS، تجهیزات VPN، سرورهای احراز هویت و مدیریت دسترسی، و سیستم‌های مانیتورینگ مورد نیاز هستند. انتخاب دقیق این تجهیزات بسته به نیازهای سازمان شما متفاوت خواهد بود.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا خدمات مدیریت شبکه از راه دور ارائه می‌شود؟</h4>
              <p className="text-gray-600">
                بله، ما خدمات مدیریت و نگهداری شبکه از راه دور را ارائه می‌دهیم. تیم متخصصان ما به صورت 24/7 شبکه شما را مانیتور می‌کنند و در صورت بروز مشکل، به سرعت آن را برطرف می‌کنند. این خدمات شامل به‌روزرسانی نرم‌افزارها و فریم‌ورها، پیکربندی تجهیزات، مدیریت امنیت و بهینه‌سازی عملکرد شبکه می‌شود.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">چگونه می‌توانم امنیت شبکه سازمان خود را ارزیابی کنم؟</h4>
              <p className="text-gray-600">
                ما خدمات ارزیابی امنیتی شبکه را ارائه می‌دهیم که شامل تست نفوذ، ارزیابی آسیب‌پذیری، بررسی معماری امنیتی و ارزیابی سیاست‌های امنیتی می‌شود. پس از انجام این ارزیابی‌ها، گزارش کاملی از نقاط ضعف و قوت شبکه شما همراه با راهکارهای بهبود ارائه می‌دهیم. این خدمات به شما کمک می‌کند تا از وضعیت امنیتی شبکه خود آگاه شوید و اقدامات لازم را برای بهبود آن انجام دهید.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">با متخصصان شبکه ما مشاوره کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            برای دریافت مشاوره تخصصی درباره خدمات شبکه و امنیت، همین امروز با ما تماس بگیرید
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              درخواست مشاوره رایگان
            </button>
            <button className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              تماس با ما
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Network;

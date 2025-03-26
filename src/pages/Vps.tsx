
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Server, ShieldCheck, Cpu, HardDrive, Rocket, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DatacenterComparison from '../components/DatacenterComparison';

const Vps = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // VPS Plans
  const vpsPlans = [
    {
      name: "اقتصادی",
      price: "199,000",
      cpu: "2 هسته",
      ram: "2 گیگابایت",
      storage: "50 گیگابایت SSD NVMe",
      bandwidth: "نامحدود",
      features: [
        "نصب انواع سیستم عامل",
        "کنترل پنل مدیریت",
        "1 آدرس IP اختصاصی",
        "پشتیبانی 24/7",
      ],
      popular: false,
    },
    {
      name: "استاندارد",
      price: "399,000",
      cpu: "4 هسته",
      ram: "8 گیگابایت",
      storage: "100 گیگابایت SSD NVMe",
      bandwidth: "نامحدود",
      features: [
        "نصب انواع سیستم عامل",
        "کنترل پنل مدیریت",
        "1 آدرس IP اختصاصی",
        "بکاپ هفتگی",
        "پشتیبانی 24/7",
      ],
      popular: true,
    },
    {
      name: "حرفه‌ای",
      price: "699,000",
      cpu: "8 هسته",
      ram: "16 گیگابایت",
      storage: "200 گیگابایت SSD NVMe",
      bandwidth: "نامحدود",
      features: [
        "نصب انواع سیستم عامل",
        "کنترل پنل مدیریت",
        "2 آدرس IP اختصاصی",
        "بکاپ روزانه",
        "پشتیبانی 24/7 اختصاصی",
        "حفاظت DDOS",
      ],
      popular: false,
    },
    {
      name: "سازمانی",
      price: "1,290,000",
      cpu: "16 هسته",
      ram: "32 گیگابایت",
      storage: "500 گیگابایت SSD NVMe",
      bandwidth: "نامحدود",
      features: [
        "نصب انواع سیستم عامل",
        "کنترل پنل مدیریت",
        "4 آدرس IP اختصاصی",
        "بکاپ روزانه",
        "پشتیبانی 24/7 اختصاصی",
        "حفاظت DDOS پیشرفته",
      ],
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">سرور مجازی با بالاترین کیفیت</h1>
                <p className="text-blue-100 text-lg mb-8">
                  سرورهای مجازی قدرتمند با منابع اختصاصی، سرعت بالا و پشتیبانی 24/7، مناسب برای کسب و کارهای آنلاین، 
                  وبسایت‌ها و اپلیکیشن‌های شما
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>راه‌اندازی آنی (کمتر از 5 دقیقه)</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>دیسک‌های SSD NVMe سریع</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>اتصال به اینترنت پرسرعت</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>دسترسی root کامل</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 flex justify-center items-center">
                <img 
                  src="https://placehold.co/600x400/3b82f6/FFFFFF/png?text=Server+Infrastructure&font=Montserrat" 
                  alt="سرور مجازی" 
                  className="rounded-lg shadow-lg max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Plans Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">پلن‌های سرور مجازی</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پلن‌های متنوع سرور مجازی متناسب با نیاز شما با قیمت‌های مقرون به صرفه و کیفیت بالا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vpsPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border ${plan.popular ? 'border-blue-500' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white py-1 px-4 text-center">
                    محبوب‌ترین
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-6">
                    <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-500 mr-1">تومان / ماهانه</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Cpu size={18} className="ml-2 text-blue-500" />
                      <span>{plan.cpu}</span>
                    </div>
                    <div className="flex items-center">
                      <Server size={18} className="ml-2 text-blue-500" />
                      <span>{plan.ram}</span>
                    </div>
                    <div className="flex items-center">
                      <HardDrive size={18} className="ml-2 text-blue-500" />
                      <span>{plan.storage}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe size={18} className="ml-2 text-blue-500" />
                      <span>{plan.bandwidth}</span>
                    </div>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check size={16} className="ml-2 text-green-500 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-medium transition-colors ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                    سفارش
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">ویژگی‌های سرور مجازی NovinVDS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ما بهترین امکانات و خدمات را برای سرورهای مجازی شما فراهم کرده‌ایم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">راه‌اندازی سریع</h3>
              <p className="text-gray-600">
                سرور مجازی شما در کمتر از 5 دقیقه راه‌اندازی می‌شود و آماده استفاده خواهد بود.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <HardDrive size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">دیسک‌های NVMe</h3>
              <p className="text-gray-600">
                استفاده از دیسک‌های SSD NVMe با سرعت خواندن و نوشتن فوق‌العاده بالا برای عملکرد بهینه.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت پیشرفته</h3>
              <p className="text-gray-600">
                سیستم‌های پیشرفته حفاظت در برابر حملات DDOS و بکاپ خودکار برای حفظ امنیت داده‌های شما.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Datacenter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">دیتاسنترهای ما</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              سرورهای مجازی در دیتاسنترهای پیشرفته با بهترین زیرساخت‌ها در نقاط مختلف جهان
            </p>
          </div>
          
          <DatacenterComparison />
          
          <div className="text-center mt-12">
            <Link to="/datacenter" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              اطلاعات بیشتر درباره دیتاسنترها
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پاسخ سوالات رایج شما درباره سرورهای مجازی
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">تفاوت سرور مجازی و سرور اختصاصی چیست؟</h4>
              <p className="text-gray-600">
                سرور مجازی بخشی از یک سرور فیزیکی است که به صورت اختصاصی به شما اختصاص داده می‌شود، در حالی که سرور اختصاصی یک سرور فیزیکی کامل است که فقط در اختیار شماست. سرور مجازی برای اکثر نیازها کافی است و هزینه‌ی کمتری دارد.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">چه سیستم عامل‌هایی را می‌توانم نصب کنم؟</h4>
              <p className="text-gray-600">
                شما می‌توانید انواع سیستم عامل‌های لینوکس (Ubuntu، CentOS، Debian و...) و ویندوز سرور را روی سرور مجازی خود نصب کنید. ما تصاویر آماده‌ی این سیستم عامل‌ها را داریم و نصب آن‌ها به سادگی و با چند کلیک انجام می‌شود.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا می‌توانم سرور مجازی خود را ارتقا دهم؟</h4>
              <p className="text-gray-600">
                بله، شما می‌توانید در هر زمان منابع سرور مجازی خود (CPU، RAM و فضای دیسک) را افزایش دهید. این کار از طریق پنل کاربری به سادگی قابل انجام است و معمولاً بدون نیاز به راه‌اندازی مجدد سرور انجام می‌شود.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">پشتیبانی 24/7 شامل چه مواردی می‌شود؟</h4>
              <p className="text-gray-600">
                پشتیبانی 24/7 ما شامل رفع مشکلات زیرساختی، شبکه و سخت‌افزاری می‌شود. همچنین در نصب سیستم عامل و کنترل پنل به شما کمک می‌کنیم. مشکلات نرم‌افزاری خاص و توسعه‌ی برنامه‌ها در محدوده‌ی خدمات پشتیبانی پایه قرار نمی‌گیرد، اما می‌توانید از خدمات مدیریت سرور ما استفاده کنید.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">همین امروز سرور مجازی خود را راه‌اندازی کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            با NovinVDS، شما می‌توانید در کمتر از 5 دقیقه صاحب یک سرور مجازی قدرتمند با بهترین کیفیت شوید
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              مشاهده همه پلن‌ها
            </button>
            <button className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              مشاوره رایگان
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Vps;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Server, Database, ShieldCheck, Clock, Cpu, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/PricingCard';

const Hosting = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hosting Plans
  const hostingPlans = [
    {
      title: "پایه",
      price: "119,000",
      period: "ماهانه",
      description: "مناسب برای وبسایت‌های شخصی و وبلاگ‌ها",
      features: [
        { text: "5 گیگابایت فضا SSD", available: true },
        { text: "نامحدود پهنای باند", available: true },
        { text: "5 دامنه پارک", available: true },
        { text: "10 زیردامنه", available: true },
        { text: "10 حساب ایمیل", available: true },
        { text: "2 پایگاه داده MySQL", available: true },
        { text: "نصب رایگان SSL", available: true },
        { text: "پشتیبانی از PHP 8", available: true },
        { text: "بکاپ هفتگی", available: false },
        { text: "پشتیبانی اولویت‌دار", available: false },
      ],
      popular: false,
    },
    {
      title: "استاندارد",
      price: "299,000",
      period: "ماهانه",
      description: "مناسب برای کسب و کارهای کوچک و فروشگاه‌های آنلاین",
      features: [
        { text: "20 گیگابایت فضا SSD", available: true },
        { text: "نامحدود پهنای باند", available: true },
        { text: "نامحدود دامنه پارک", available: true },
        { text: "نامحدود زیردامنه", available: true },
        { text: "نامحدود حساب ایمیل", available: true },
        { text: "10 پایگاه داده MySQL", available: true },
        { text: "نصب رایگان SSL", available: true },
        { text: "پشتیبانی از PHP 8", available: true },
        { text: "بکاپ هفتگی", available: true },
        { text: "پشتیبانی اولویت‌دار", available: false },
      ],
      popular: true,
    },
    {
      title: "حرفه‌ای",
      price: "499,000",
      period: "ماهانه",
      description: "مناسب برای شرکت‌ها و کسب و کارهای متوسط",
      features: [
        { text: "50 گیگابایت فضا SSD", available: true },
        { text: "نامحدود پهنای باند", available: true },
        { text: "نامحدود دامنه پارک", available: true },
        { text: "نامحدود زیردامنه", available: true },
        { text: "نامحدود حساب ایمیل", available: true },
        { text: "نامحدود پایگاه داده MySQL", available: true },
        { text: "نصب رایگان SSL", available: true },
        { text: "پشتیبانی از PHP 8", available: true },
        { text: "بکاپ روزانه", available: true },
        { text: "پشتیبانی اولویت‌دار", available: true },
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">هاستینگ وب با بالاترین کیفیت</h1>
                <p className="text-blue-100 text-lg mb-8">
                  هاستینگ وب با سرعت بالا، امنیت پیشرفته و پشتیبانی 24/7 برای وبسایت‌ها و اپلیکیشن‌های شما
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <CheckCircle className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>سرعت بارگذاری فوق‌العاده با SSD NVMe</span>
                  </div>
                  <div className="flex items-center text-white">
                    <CheckCircle className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>پنل کنترل قدرتمند cPanel/Plesk</span>
                  </div>
                  <div className="flex items-center text-white">
                    <CheckCircle className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>پشتیبانی از PHP، MySQL، WordPress</span>
                  </div>
                  <div className="flex items-center text-white">
                    <CheckCircle className="ml-2 bg-blue-500 p-1 rounded-full" size={20} />
                    <span>گواهی SSL رایگان برای همه دامنه‌ها</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 flex justify-center items-center">
                <img 
                  src="https://placehold.co/600x400/3b82f6/FFFFFF/png?text=Web+Hosting&font=Montserrat" 
                  alt="هاستینگ وب" 
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
            <h2 className="text-3xl font-bold mb-4">پلن‌های هاستینگ</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پلن‌های متنوع هاستینگ متناسب با نیاز شما با قیمت‌های مقرون به صرفه و کیفیت بالا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hostingPlans.map((plan, index) => (
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
              نیاز به پلن اختصاصی دارید؟ با ما تماس بگیرید <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Control Panel Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div className="lg:w-1/2 mt-10 lg:mt-0 lg:pl-12">
              <img 
                src="https://placehold.co/600x400/4f46e5/FFFFFF/png?text=cPanel+Interface&font=Montserrat" 
                alt="پنل کنترل cPanel" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:w-1/2 lg:pr-12">
              <h2 className="text-3xl font-bold mb-6">پنل کنترل قدرتمند</h2>
              <p className="text-gray-600 mb-6">
                تمامی پلن‌های هاستینگ NovinVDS با پنل‌های کنترل حرفه‌ای cPanel و Plesk ارائه می‌شوند که به شما امکان مدیریت آسان وبسایت خود را می‌دهند:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1">
                    <CheckCircle size={18} className="text-blue-600" />
                  </div>
                  <div className="mr-3">
                    <h4 className="font-medium">مدیریت فایل‌ها و پایگاه داده</h4>
                    <p className="text-gray-600 text-sm">دسترسی به File Manager، phpMyAdmin و ابزارهای مدیریت پایگاه داده</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1">
                    <CheckCircle size={18} className="text-blue-600" />
                  </div>
                  <div className="mr-3">
                    <h4 className="font-medium">ایمیل حرفه‌ای</h4>
                    <p className="text-gray-600 text-sm">ایجاد و مدیریت حساب‌های ایمیل، فیلترهای اسپم و تنظیمات پیشرفته</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1">
                    <CheckCircle size={18} className="text-blue-600" />
                  </div>
                  <div className="mr-3">
                    <h4 className="font-medium">نصب آسان نرم‌افزارها</h4>
                    <p className="text-gray-600 text-sm">نصب وردپرس، جوملا، پرستاشاپ و سایر CMS‌ها با یک کلیک</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1">
                    <CheckCircle size={18} className="text-blue-600" />
                  </div>
                  <div className="mr-3">
                    <h4 className="font-medium">مدیریت دامنه</h4>
                    <p className="text-gray-600 text-sm">تنظیم رکوردهای DNS، ریدایرکت و مدیریت زیردامنه‌ها</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">ویژگی‌های هاستینگ NovinVDS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              تمامی پلن‌های هاستینگ ما دارای امکانات و ویژگی‌های زیر هستند
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">زیرساخت قدرتمند</h3>
              <p className="text-gray-600">
                سرورهای پیشرفته با پردازنده‌های نسل جدید و دیسک‌های SSD NVMe برای سرعت و کارایی بالا
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">بکاپ خودکار</h3>
              <p className="text-gray-600">
                سیستم پشتیبان‌گیری خودکار و منظم برای اطمینان از حفظ اطلاعات و محتوای شما
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت پیشرفته</h3>
              <p className="text-gray-600">
                سیستم‌های پیشرفته حفاظت از سرور، فایروال، آنتی ویروس و گواهی SSL رایگان
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">آپتایم 99.99%</h3>
              <p className="text-gray-600">
                تضمین در دسترس بودن سرویس با ضمانت آپتایم 99.99 درصد و مانیتورینگ 24/7
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">منابع اختصاصی</h3>
              <p className="text-gray-600">
                تخصیص منابع CPU و RAM اختصاصی برای هر پلن جهت جلوگیری از تداخل با سایر کاربران
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">انتقال رایگان</h3>
              <p className="text-gray-600">
                انتقال رایگان وبسایت شما از هاست فعلی به NovinVDS بدون دانتایم و توسط تیم فنی ما
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پاسخ سوالات رایج شما درباره هاستینگ وب
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">هاست لینوکس بهتر است یا ویندوز؟</h4>
              <p className="text-gray-600">
                هر دو نوع هاست مزایای خود را دارند. هاست لینوکس برای وبسایت‌های PHP مانند وردپرس، جوملا و پرستاشاپ مناسب است و هزینه کمتری دارد. هاست ویندوز برای وبسایت‌های ASP.NET مناسب است اما معمولاً هزینه بیشتری دارد. اگر مطمئن نیستید، با کارشناسان ما مشورت کنید.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا می‌توانم وبسایت خود را از هاست فعلی به NovinVDS منتقل کنم؟</h4>
              <p className="text-gray-600">
                بله، ما خدمات انتقال رایگان وبسایت ارائه می‌دهیم. تیم فنی ما تمام محتوا، پایگاه‌های داده، ایمیل‌ها و تنظیمات وبسایت شما را بدون هیچ هزینه‌ای منتقل می‌کند. این فرایند معمولاً بدون داون‌تایم انجام می‌شود.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا هاست شما از وردپرس پشتیبانی می‌کند؟</h4>
              <p className="text-gray-600">
                بله، تمامی پلن‌های هاستینگ ما کاملاً با وردپرس سازگار هستند. ما حتی امکان نصب خودکار وردپرس را از طریق پنل کنترل cPanel ارائه می‌دهیم و سرورهای ما برای اجرای بهینه وردپرس پیکربندی شده‌اند.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">پهنای باند نامحدود یعنی چه؟</h4>
              <p className="text-gray-600">
                پهنای باند نامحدود به این معنی است که ما برای میزان ترافیک ماهانه وبسایت شما محدودیتی قائل نمی‌شویم. البته استفاده از منابع باید منطقی باشد و مطابق با شرایط استفاده از خدمات ما باشد. برای وبسایت‌های معمولی و حتی پربازدید، این محدودیتی ایجاد نمی‌کند.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">امروز هاستینگ خود را راه‌اندازی کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            با NovinVDS، شما می‌توانید در کمتر از 5 دقیقه صاحب یک هاست قدرتمند با بهترین کیفیت شوید
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              سفارش هاستینگ
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

export default Hosting;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, Lock, RefreshCw, CreditCard, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/PricingCard';

const SSL = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SSL Plans
  const sslPlans = [
    {
      title: "DV استاندارد",
      price: "490,000",
      period: "سالانه",
      description: "گواهی امنیتی پایه برای وبسایت‌های شخصی و وبلاگ‌ها",
      features: [
        { text: "تأیید مالکیت دامنه", available: true },
        { text: "رمزنگاری 256 بیتی", available: true },
        { text: "نماد قفل سبز در مرورگر", available: true },
        { text: "صدور در 5 دقیقه", available: true },
        { text: "پشتیبانی از زیردامنه‌ها", available: false },
        { text: "بیمه مسئولیت", available: false },
        { text: "تأیید هویت سازمانی", available: false },
        { text: "نمایش نام شرکت در مرورگر", available: false },
      ],
      popular: false,
    },
    {
      title: "OV تجاری",
      price: "1,990,000",
      period: "سالانه",
      description: "مناسب برای فروشگاه‌های آنلاین و کسب و کارها",
      features: [
        { text: "تأیید مالکیت دامنه", available: true },
        { text: "رمزنگاری 256 بیتی", available: true },
        { text: "نماد قفل سبز در مرورگر", available: true },
        { text: "صدور در 1-3 روز کاری", available: true },
        { text: "پشتیبانی از زیردامنه‌ها", available: true },
        { text: "بیمه مسئولیت تا 1 میلیارد تومان", available: true },
        { text: "تأیید هویت سازمانی", available: true },
        { text: "نمایش نام شرکت در مرورگر", available: true },
      ],
      popular: true,
    },
    {
      title: "EV پیشرفته",
      price: "5,990,000",
      period: "سالانه",
      description: "بالاترین سطح اعتبار برای بانک‌ها و سازمان‌های بزرگ",
      features: [
        { text: "تأیید مالکیت دامنه", available: true },
        { text: "رمزنگاری 256 بیتی", available: true },
        { text: "نماد قفل سبز در مرورگر", available: true },
        { text: "صدور در 5-7 روز کاری", available: true },
        { text: "پشتیبانی از زیردامنه‌ها", available: true },
        { text: "بیمه مسئولیت تا 5 میلیارد تومان", available: true },
        { text: "تأیید هویت سازمانی پیشرفته", available: true },
        { text: "نوار سبز با نام شرکت در مرورگر", available: true },
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
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">گواهینامه SSL برای امنیت وبسایت شما</h1>
                <p className="text-green-100 text-lg mb-8">
                  محافظت از اطلاعات کاربران، افزایش اعتماد مشتریان و بهبود رتبه در موتورهای جستجو
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-green-500 p-1 rounded-full" size={20} />
                    <span>رمزنگاری پیشرفته اطلاعات</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-green-500 p-1 rounded-full" size={20} />
                    <span>نمایش نماد قفل در مرورگر</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-green-500 p-1 rounded-full" size={20} />
                    <span>بهبود رتبه‌بندی در گوگل</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-green-500 p-1 rounded-full" size={20} />
                    <span>نصب و پیکربندی رایگان</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 flex justify-center items-center">
                <img 
                  src="https://placehold.co/600x400/10b981/FFFFFF/png?text=SSL+Certificate&font=Montserrat" 
                  alt="گواهی SSL" 
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
            <h2 className="text-3xl font-bold mb-4">انواع گواهینامه SSL</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              انتخاب گواهینامه SSL مناسب برای وبسایت یا کسب و کار شما
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sslPlans.map((plan, index) => (
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
            <Link to="/contact" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium">
              نیاز به مشاوره در انتخاب گواهینامه مناسب دارید؟ با ما تماس بگیرید
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">مزایای استفاده از گواهینامه SSL</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              چرا هر وبسایتی به گواهینامه SSL نیاز دارد؟
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-5">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت اطلاعات</h3>
              <p className="text-gray-600">
                رمزنگاری پیشرفته تمام اطلاعات ردوبدل شده بین کاربران و وبسایت شما برای جلوگیری از دسترسی هکرها
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-5">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">افزایش اعتماد</h3>
              <p className="text-gray-600">
                نمایش نماد قفل در مرورگر کاربران و افزایش اعتماد آن‌ها به وبسایت شما، به خصوص در فروشگاه‌های آنلاین
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-5">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">بهبود رتبه در گوگل</h3>
              <p className="text-gray-600">
                گوگل وبسایت‌های دارای SSL را در نتایج جستجو بالاتر نمایش می‌دهد و به وبسایت‌های ناامن هشدار می‌دهد
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-5">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">تمدید آسان</h3>
              <p className="text-gray-600">
                تمدید خودکار گواهینامه SSL بدون نیاز به پیکربندی مجدد و بدون وقفه در کارکرد وبسایت
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-5">
                <CreditCard size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">مناسب برای پرداخت آنلاین</h3>
              <p className="text-gray-600">
                محافظت از اطلاعات حساس کاربران مانند شماره کارت، رمز و اطلاعات شخصی در تراکنش‌های آنلاین
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-5">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">الزام قانونی</h3>
              <p className="text-gray-600">
                رعایت الزامات قانونی حفاظت از داده‌ها و اطلاعات شخصی کاربران در بسیاری از کشورها
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Installation Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">فرآیند نصب و راه‌اندازی SSL</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              مراحل خرید، نصب و پیکربندی گواهینامه SSL با NovinVDS
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <span className="font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">انتخاب و خرید</h3>
              <p className="text-gray-600">
                گواهینامه SSL مناسب برای وبسایت خود را انتخاب کنید و فرایند خرید را تکمیل نمایید. ما تمام انواع گواهینامه‌ها از مراجع معتبر جهانی را ارائه می‌دهیم.
              </p>
            </div>
            
            <div className="flex-1 border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <span className="font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">تأیید مالکیت</h3>
              <p className="text-gray-600">
                پس از خرید، باید مالکیت دامنه و در صورت نیاز هویت سازمانی شما تأیید شود. این کار از طریق ایمیل، افزودن رکورد DNS یا آپلود فایل انجام می‌شود.
              </p>
            </div>
            
            <div className="flex-1 border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <span className="font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">نصب و پیکربندی</h3>
              <p className="text-gray-600">
                پس از صدور گواهینامه، تیم فنی ما آن را روی سرور شما نصب و پیکربندی می‌کند. این خدمت برای تمام مشتریان ما رایگان است.
              </p>
            </div>
            
            <div className="flex-1 border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <span className="font-bold text-lg">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">تست و بررسی</h3>
              <p className="text-gray-600">
                پس از نصب، وبسایت شما را بررسی می‌کنیم تا از عملکرد صحیح SSL و عدم وجود مشکلات محتوای مختلط اطمینان حاصل کنیم.
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
              پاسخ سوالات رایج شما درباره گواهینامه‌های SSL
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">تفاوت بین گواهینامه‌های DV، OV و EV چیست؟</h4>
              <p className="text-gray-600">
                گواهینامه DV (Domain Validation) فقط مالکیت دامنه را تأیید می‌کند و برای وبسایت‌های شخصی مناسب است. گواهینامه OV (Organization Validation) علاوه بر دامنه، هویت سازمان را نیز تأیید می‌کند و اعتبار بیشتری دارد. گواهینامه EV (Extended Validation) بالاترین سطح اعتبار را ارائه می‌دهد و نام شرکت را در نوار سبز مرورگر نمایش می‌دهد که برای بانک‌ها و سازمان‌های بزرگ مناسب است.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">مدت زمان صدور گواهینامه SSL چقدر است؟</h4>
              <p className="text-gray-600">
                گواهینامه‌های DV معمولاً در کمتر از 5 دقیقه صادر می‌شوند. گواهینامه‌های OV به 1-3 روز کاری و گواهینامه‌های EV به 5-7 روز کاری زمان نیاز دارند زیرا فرایند تأیید هویت سازمانی پیچیده‌تر است.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا گواهینامه SSL از زیردامنه‌ها نیز پشتیبانی می‌کند؟</h4>
              <p className="text-gray-600">
                گواهینامه‌های استاندارد معمولاً فقط یک دامنه را پوشش می‌دهند. برای پوشش زیردامنه‌ها، شما به گواهینامه Wildcard یا Multi-Domain نیاز دارید. گواهینامه Wildcard تمام زیردامنه‌های یک دامنه را پوشش می‌دهد (مانند *.yourdomain.com) و گواهینامه Multi-Domain می‌تواند چندین دامنه و زیردامنه مشخص را پوشش دهد.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا گواهینامه SSL برای همه وبسایت‌ها ضروری است؟</h4>
              <p className="text-gray-600">
                بله، امروزه تمام وبسایت‌ها به SSL نیاز دارند. گوگل و سایر مرورگرها وبسایت‌های بدون SSL را ناامن معرفی می‌کنند و به کاربران هشدار می‌دهند. همچنین، SSL یک فاکتور رتبه‌بندی در موتورهای جستجو است. برای وبسایت‌هایی که اطلاعات شخصی یا تراکنش‌های مالی را پردازش می‌کنند، SSL یک الزام قانونی است.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">همین امروز امنیت وبسایت خود را تأمین کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-green-100">
            با گواهینامه SSL از NovinVDS، اطلاعات کاربران خود را محافظت کنید و اعتماد مشتریان را افزایش دهید
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
              خرید گواهینامه SSL
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

export default SSL;

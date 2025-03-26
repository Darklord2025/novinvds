
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Server, ShieldCheck, Cpu, HardDrive, Globe, ArrowRight, Wifi } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DatacenterComparison from '../components/DatacenterComparison';

const Dedicated = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedTab, setSelectedTab] = useState("germany");

  // Dedicated Server Plans by Region
  const serverPlans = {
    germany: [
      {
        name: "DS-1",
        cpu: "Intel Xeon E-2236",
        cores: "6 هسته / 12 ترد",
        ram: "32 گیگابایت DDR4 ECC",
        storage: "2 × 1TB NVMe SSD",
        bandwidth: "نامحدود - 1Gbps",
        price: "8,500,000",
        location: "فرانکفورت، آلمان",
        datacenter: "Hetzner",
        uptime: "99.99%",
      },
      {
        name: "DS-2",
        cpu: "AMD EPYC 7443P",
        cores: "24 هسته / 48 ترد",
        ram: "128 گیگابایت DDR4 ECC",
        storage: "2 × 2TB NVMe SSD",
        bandwidth: "نامحدود - 10Gbps",
        price: "14,900,000",
        location: "فرانکفورت، آلمان",
        datacenter: "Hetzner",
        uptime: "99.99%",
      },
      {
        name: "DS-3",
        cpu: "Intel Xeon Gold 6348",
        cores: "28 هسته / 56 ترد",
        ram: "256 گیگابایت DDR4 ECC",
        storage: "2 × 3.84TB Enterprise SSD",
        bandwidth: "نامحدود - 10Gbps",
        price: "24,500,000",
        location: "فرانکفورت، آلمان",
        datacenter: "Hetzner",
        uptime: "99.99%",
      }
    ],
    netherlands: [
      {
        name: "DS-NL1",
        cpu: "Intel Xeon E-2286G",
        cores: "6 هسته / 12 ترد",
        ram: "32 گیگابایت DDR4 ECC",
        storage: "2 × 1TB NVMe SSD",
        bandwidth: "نامحدود - 1Gbps",
        price: "7,900,000",
        location: "آمستردام، هلند",
        datacenter: "LeaseWeb",
        uptime: "99.99%",
      },
      {
        name: "DS-NL2",
        cpu: "AMD EPYC 7302P",
        cores: "16 هسته / 32 ترد",
        ram: "64 گیگابایت DDR4 ECC",
        storage: "2 × 2TB NVMe SSD",
        bandwidth: "نامحدود - 10Gbps",
        price: "12,900,000",
        location: "آمستردام، هلند",
        datacenter: "LeaseWeb",
        uptime: "99.99%",
      }
    ],
    france: [
      {
        name: "DS-FR1",
        cpu: "Intel Xeon E-2288G",
        cores: "8 هسته / 16 ترد",
        ram: "64 گیگابایت DDR4 ECC",
        storage: "2 × 2TB NVMe SSD",
        bandwidth: "نامحدود - 1Gbps",
        price: "9,900,000",
        location: "پاریس، فرانسه",
        datacenter: "OVH",
        uptime: "99.99%",
      },
      {
        name: "DS-FR2",
        cpu: "AMD EPYC 7313",
        cores: "16 هسته / 32 ترد",
        ram: "128 گیگابایت DDR4 ECC",
        storage: "2 × 3.84TB Enterprise SSD",
        bandwidth: "نامحدود - 10Gbps",
        price: "16,500,000",
        location: "پاریس، فرانسه",
        datacenter: "OVH",
        uptime: "99.99%",
      }
    ],
    uk: [
      {
        name: "DS-UK1",
        cpu: "Intel Xeon Silver 4210",
        cores: "10 هسته / 20 ترد",
        ram: "64 گیگابایت DDR4 ECC",
        storage: "2 × 2TB NVMe SSD",
        bandwidth: "نامحدود - 1Gbps",
        price: "11,500,000",
        location: "لندن، انگلستان",
        datacenter: "OVH",
        uptime: "99.99%",
      },
      {
        name: "DS-UK2",
        cpu: "AMD EPYC 7413",
        cores: "24 هسته / 48 ترد",
        ram: "128 گیگابایت DDR4 ECC",
        storage: "2 × 3.84TB Enterprise SSD",
        bandwidth: "نامحدود - 10Gbps",
        price: "17,900,000",
        location: "لندن، انگلستان",
        datacenter: "OVH",
        uptime: "99.99%",
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">سرور اختصاصی با بالاترین کیفیت</h1>
                <p className="text-indigo-100 text-lg mb-8">
                  سرورهای اختصاصی قدرتمند با سخت‌افزارهای پیشرفته، آپتایم 99.99% و پشتیبانی 24/7، مناسب برای کسب و کارهای بزرگ و اپلیکیشن‌های سنگین
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-indigo-500 p-1 rounded-full" size={20} />
                    <span>سخت‌افزارهای اختصاصی نسل جدید</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-indigo-500 p-1 rounded-full" size={20} />
                    <span>دیسک‌های SSD NVMe پرسرعت</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-indigo-500 p-1 rounded-full" size={20} />
                    <span>دسترسی کامل و مدیریت از راه دور</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Check className="ml-2 bg-indigo-500 p-1 rounded-full" size={20} />
                    <span>دیتاسنترهای معتبر با آپتایم 99.99%</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 flex justify-center items-center">
                <img 
                  src="https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Dedicated+Server&font=Montserrat" 
                  alt="سرور اختصاصی" 
                  className="rounded-lg shadow-lg max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Location Tabs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">سرورهای اختصاصی در بهترین دیتاسنترها</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              سرورهای اختصاصی قدرتمند و پایدار در مراکز داده معتبر اروپا با بهترین زیرساخت‌ها و پهنای باند بالا
            </p>
          </div>
          
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setSelectedTab("germany")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedTab === "germany" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              آلمان (فرانکفورت)
            </button>
            <button 
              onClick={() => setSelectedTab("netherlands")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedTab === "netherlands" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              هلند (آمستردام)
            </button>
            <button 
              onClick={() => setSelectedTab("france")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedTab === "france" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              فرانسه (پاریس)
            </button>
            <button 
              onClick={() => setSelectedTab("uk")} 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedTab === "uk" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              انگلستان (لندن)
            </button>
          </div>
          
          {/* Server Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {serverPlans[selectedTab].map((plan, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-indigo-50 p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-2">{plan.name}</h3>
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-bold">{plan.price} تومان</span>
                    <span className="text-gray-600">/ ماهانه</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center bg-indigo-50 p-2 rounded mb-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 ml-3">
                        <Cpu size={18} />
                      </div>
                      <div>
                        <p className="font-medium">{plan.cpu}</p>
                        <p className="text-sm text-gray-500">{plan.cores}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-indigo-50 p-2 rounded mb-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 ml-3">
                        <Server size={18} />
                      </div>
                      <div>
                        <p className="font-medium">رم</p>
                        <p className="text-sm text-gray-500">{plan.ram}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-indigo-50 p-2 rounded mb-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 ml-3">
                        <HardDrive size={18} />
                      </div>
                      <div>
                        <p className="font-medium">ذخیره‌سازی</p>
                        <p className="text-sm text-gray-500">{plan.storage}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-indigo-50 p-2 rounded mb-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 ml-3">
                        <Wifi size={18} />
                      </div>
                      <div>
                        <p className="font-medium">پهنای باند</p>
                        <p className="text-sm text-gray-500">{plan.bandwidth}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-indigo-50 p-2 rounded mb-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 ml-3">
                        <Globe size={18} />
                      </div>
                      <div>
                        <p className="font-medium">دیتاسنتر</p>
                        <p className="text-sm text-gray-500">{plan.datacenter} - {plan.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="mb-4 text-center">
                      <p className="text-sm">آپتایم: <span className="font-bold text-green-600">{plan.uptime}</span></p>
                    </div>
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                      سفارش سرور
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-2">راه‌اندازی در کمتر از 24 ساعت</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/contact" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              نیاز به پیکربندی سفارشی دارید؟ با کارشناسان ما تماس بگیرید <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">مزایای سرورهای اختصاصی NovinVDS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              چرا باید سرور اختصاصی NovinVDS را انتخاب کنید؟
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-5">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">سخت‌افزار اختصاصی</h3>
              <p className="text-gray-600">
                منابع کاملاً اختصاصی بدون اشتراک با کاربران دیگر، شامل CPU، رم، هارد و کارت شبکه برای بالاترین کارایی ممکن
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-5">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">تجهیزات سرور درجه یک</h3>
              <p className="text-gray-600">
                استفاده از برندهای معتبر مانند HP, Dell و Supermicro با قطعات اصلی و گارانتی تولیدکننده
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-5">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت پیشرفته</h3>
              <p className="text-gray-600">
                محافظت DDOS پیشرفته، فایروال‌های سخت‌افزاری و نرم‌افزاری، و پشتیبان‌گیری منظم از داده‌ها
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-5">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">دیتاسنترهای بین‌المللی</h3>
              <p className="text-gray-600">
                میزبانی در مراکز داده معتبر در اروپا با زیرساخت Tier 3+، برق و خنک‌کننده پشتیبان و امنیت فیزیکی 24/7
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-5">
                <Wifi size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">پهنای باند اختصاصی</h3>
              <p className="text-gray-600">
                اتصال پرسرعت 1Gbps تا 10Gbps با پهنای باند نامحدود و ترافیک بین‌المللی بدون محدودیت
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-5">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">پشتیبانی 24/7</h3>
              <p className="text-gray-600">
                تیم پشتیبانی فنی متخصص در تمام ساعات شبانه‌روز برای رفع مشکلات فنی و سخت‌افزاری
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
              سرورهای اختصاصی در دیتاسنترهای پیشرفته با بهترین زیرساخت‌ها در نقاط مختلف اروپا
            </p>
          </div>
          
          <DatacenterComparison />
          
          <div className="text-center mt-12">
            <Link to="/datacenter" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              اطلاعات بیشتر درباره دیتاسنترها <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* OS Selection */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">انتخاب سیستم عامل</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              امکان نصب انواع سیستم عامل‌ها بر روی سرور اختصاصی
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/80x80/4f46e5/FFFFFF/png?text=Ubuntu&font=Montserrat" alt="Ubuntu" className="mx-auto mb-4" />
              <h4 className="font-bold">Ubuntu Server</h4>
              <p className="text-sm text-gray-600">22.04, 20.04, 18.04</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/80x80/4f46e5/FFFFFF/png?text=CentOS&font=Montserrat" alt="CentOS" className="mx-auto mb-4" />
              <h4 className="font-bold">CentOS</h4>
              <p className="text-sm text-gray-600">Stream 9, Stream 8, 7</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/80x80/4f46e5/FFFFFF/png?text=Debian&font=Montserrat" alt="Debian" className="mx-auto mb-4" />
              <h4 className="font-bold">Debian</h4>
              <p className="text-sm text-gray-600">11, 10, 9</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/80x80/4f46e5/FFFFFF/png?text=Windows&font=Montserrat" alt="Windows Server" className="mx-auto mb-4" />
              <h4 className="font-bold">Windows Server</h4>
              <p className="text-sm text-gray-600">2022, 2019, 2016</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/80x80/4f46e5/FFFFFF/png?text=Rocky&font=Montserrat" alt="Rocky Linux" className="mx-auto mb-4" />
              <h4 className="font-bold">Rocky Linux</h4>
              <p className="text-sm text-gray-600">9, 8</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/80x80/4f46e5/FFFFFF/png?text=Fedora&font=Montserrat" alt="Fedora" className="mx-auto mb-4" />
              <h4 className="font-bold">Fedora Server</h4>
              <p className="text-sm text-gray-600">36, 35</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/80x80/4f46e5/FFFFFF/png?text=FreeBSD&font=Montserrat" alt="FreeBSD" className="mx-auto mb-4" />
              <h4 className="font-bold">FreeBSD</h4>
              <p className="text-sm text-gray-600">13, 12</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src="https://placehold.co/80x80/4f46e5/FFFFFF/png?text=Custom&font=Montserrat" alt="سفارشی" className="mx-auto mb-4" />
              <h4 className="font-bold">نصب سفارشی</h4>
              <p className="text-sm text-gray-600">از ایمیج شما</p>
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
              پاسخ سوالات رایج شما درباره سرورهای اختصاصی
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">تفاوت سرور اختصاصی با سرور مجازی چیست؟</h4>
              <p className="text-gray-600">
                سرور اختصاصی یک سرور فیزیکی کامل است که فقط در اختیار شماست، در حالی که سرور مجازی بخشی از یک سرور فیزیکی است که به صورت مجازی‌سازی شده به شما اختصاص داده می‌شود. سرور اختصاصی منابع اختصاصی بیشتر، کارایی بالاتر و امنیت بیشتری دارد اما هزینه آن بالاتر است.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">چه زمانی باید از سرور اختصاصی استفاده کنم؟</h4>
              <p className="text-gray-600">
                سرور اختصاصی برای کسب و کارهای بزرگ، وبسایت‌های با ترافیک بالا، بازی‌های آنلاین، پلتفرم‌های استریمینگ، پردازش‌های سنگین، پایگاه‌های داده بزرگ و اپلیکیشن‌هایی که به منابع سخت‌افزاری بالا نیاز دارند، مناسب است. همچنین برای سازمان‌هایی که به دنبال الزامات امنیتی و انطباق با مقررات خاص هستند، سرور اختصاصی گزینه بهتری است.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا امکان ارتقای سخت‌افزار سرور اختصاصی وجود دارد؟</h4>
              <p className="text-gray-600">
                بله، شما می‌توانید در هر زمان سخت‌افزار سرور اختصاصی خود را ارتقا دهید. این شامل افزایش RAM، ظرفیت دیسک، ارتقای CPU یا افزودن کارت‌های شبکه می‌شود. برای ارتقا کافی است با تیم پشتیبانی تماس بگیرید تا هماهنگی‌های لازم انجام شود.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">سرویس مدیریت سرور چه خدماتی ارائه می‌دهد؟</h4>
              <p className="text-gray-600">
                سرویس مدیریت سرور ما شامل نصب و پیکربندی سیستم عامل، امنیت سرور، پیکربندی فایروال، بهینه‌سازی عملکرد، نصب و پیکربندی پنل‌های کنترل، مانیتورینگ 24/7، پشتیبان‌گیری منظم، مدیریت آپدیت‌ها و وصله‌های امنیتی، و رفع مشکلات فنی می‌شود. این سرویس برای کسانی که دانش فنی کافی ندارند یا می‌خواهند زمان خود را بر روی کسب و کارشان متمرکز کنند، بسیار مفید است.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">امروز سرور اختصاصی خود را سفارش دهید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
            با NovinVDS، شما می‌توانید به سرورهای اختصاصی قدرتمند با بهترین سخت‌افزارها و پشتیبانی حرفه‌ای دسترسی داشته باشید
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
              مشاهده همه پلن‌ها
            </button>
            <button className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              مشاوره سفارشی
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dedicated;

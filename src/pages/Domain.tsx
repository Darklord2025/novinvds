import React, { useState, useEffect } from 'react';
import { Search, Check, Globe, Shield, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DomainPricing from '../components/DomainPricing';

const Domain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [domain, setDomain] = useState('');
  const [extensions, setExtensions] = useState<string[]>(['.com']);
  const [selectedExtension, setSelectedExtension] = useState('.com');
  const [searchResult, setSearchResult] = useState<null | { available: boolean, domain: string, price: string }>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    
    setIsSearching(true);
    setSearchResult(null);
    
    // Simulate API call
    setTimeout(() => {
      const available = Math.random() > 0.3; // 70% chance domain is available
      setSearchResult({
        available,
        domain: domain + selectedExtension,
        price: '390,000'
      });
      setIsSearching(false);
    }, 1500);
  };

  const handleExtensionChange = (ext: string) => {
    setSelectedExtension(ext);
    if (!extensions.includes(ext)) {
      setExtensions([...extensions, ext]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">ثبت دامنه برای کسب و کار شما</h1>
            <p className="text-lg text-gray-600 mb-8">
              بیش از 50 پسوند مختلف با قیمت‌های مناسب و تحویل آنی
            </p>
            
            {/* Domain Search Form - Updated with correct extension display */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="نام دامنه مورد نظر خود را وارد کنید..." 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {selectedExtension}
                    </div>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  disabled={!domain || isSearching}
                >
                  {isSearching ? (
                    <RefreshCw size={20} className="animate-spin ml-2" />
                  ) : (
                    <Search size={20} className="ml-2" />
                  )}
                  جستجو
                </button>
              </form>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <div 
                  onClick={() => handleExtensionChange('.com')} 
                  className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.com' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
                >
                  .com
                </div>
                <div 
                  onClick={() => handleExtensionChange('.net')} 
                  className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.net' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
                >
                  .net
                </div>
                <div 
                  onClick={() => handleExtensionChange('.org')} 
                  className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.org' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
                >
                  .org
                </div>
                <div 
                  onClick={() => handleExtensionChange('.ir')} 
                  className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.ir' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
                >
                  .ir
                </div>
                <div 
                  onClick={() => handleExtensionChange('.co.ir')} 
                  className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.co.ir' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
                >
                  .co.ir
                </div>
                <div 
                  onClick={() => handleExtensionChange('.io')} 
                  className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.io' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
                >
                  .io
                </div>
              </div>
            </div>
            
            {/* Search Result */}
            {searchResult && (
              <div className={`p-6 rounded-xl shadow-md mb-8 ${searchResult.available ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{searchResult.domain}</h3>
                    {searchResult.available ? (
                      <p className="text-green-600 flex items-center">
                        <Check size={18} className="ml-1" /> در دسترس است
                      </p>
                    ) : (
                      <p className="text-red-600">قبلاً ثبت شده است</p>
                    )}
                  </div>
                  {searchResult.available && (
                    <div>
                      <p className="text-lg font-bold text-blue-600">{searchResult.price} تومان</p>
                      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        افزودن به سبد خرید
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">ویژگی‌های ثبت دامنه NovinVDS</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ما بهترین امکانات و خدمات را برای دامنه‌های شما فراهم کرده‌ایم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">کنترل پنل کامل</h3>
              <p className="text-gray-600">
                کنترل پنل اختصاصی برای مدیریت دامنه‌ها با امکان ویرایش رکوردهای DNS، انتقال دامنه و تنظیمات پیشرفته
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">محافظت از اطلاعات</h3>
              <p className="text-gray-600">
                محافظت WHOIS رایگان برای حفظ حریم خصوصی شما و جلوگیری از دسترسی به اطلاعات شخصی
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">تمدید خودکار</h3>
              <p className="text-gray-600">
                سیستم تمدید خودکار دامنه‌ها برای اطمینان از عدم منقضی شدن دامنه و جلوگیری از مشکلات احتمالی
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Domain Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">قیمت‌های دامنه</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              قیمت‌های مقرون به صرفه برای ثبت، تمدید و انتقال انواع دامنه‌ها
            </p>
          </div>
          
          <DomainPricing />
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پاسخ سوالات رایج شما درباره ثبت دامنه
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">چه مدت طول می‌کشد تا دامنه من فعال شود؟</h4>
              <p className="text-gray-600">
                دامنه‌های عمومی مانند .com، .net و .org معمولاً بلافاصله پس از ثبت فعال می‌شوند. دامنه‌های کشوری مانند .ir ممکن است به تأیید و بررسی بیشتری نیاز داشته باشند و زمان فعال‌سازی آن‌ها ممکن است تا 24 ساعت طول بکشد.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">آیا می‌توانم دامنه خود را از شرکت دیگری به NovinVDS منتقل کنم؟</h4>
              <p className="text-gray-600">
                بله، شما می‌توانید دامنه‌های خود را از شرکت‌های دیگر به NovinVDS منتقل کنید. برای این کار باید کد انتقال (EPP Code) را از شرکت فعلی خود دریافت کنید و در پنل کاربری ما وارد نمایید. فرایند انتقال معمولاً بین 5 تا 7 روز طول می‌کشد.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">محافظت WHOIS چیست و چرا به آن نیاز دارم؟</h4>
              <p className="text-gray-600">
                محافظت WHOIS یک سرویس است که اطلاعات شخصی شما مانند نام، آدرس، شماره تلفن و ایمیل را در پایگاه داده WHOIS مخفی می‌کند. این کار به حفظ حریم خصوصی شما کمک می‌کند و از دریافت هرزنامه‌ها و تماس‌های تبلیغاتی ناخواسته جلوگیری می‌کند.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-bold mb-2">چگونه می‌توانم رکوردهای DNS دامنه خود را تغییر دهم؟</h4>
              <p className="text-gray-600">
                شما می‌توانید از طریق پنل کاربری NovinVDS، بخش مدیریت دامنه، به رکوردهای DNS دسترسی پیدا کنید و آن‌ها را ویرایش نمایید. در این بخش می‌توانید انواع رکوردها مانند A, CNAME, MX, TXT و غیره را اضافه، ویرایش یا حذف کنید.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">امروز دامنه مورد نظر خود را ثبت کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            بیش از 50 پسوند مختلف با قیمت‌های مناسب و کنترل پنل کامل مدیریت دامنه
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              جستجوی دامنه
            </button>
            <button className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              مشاهده قیمت‌ها
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Domain;

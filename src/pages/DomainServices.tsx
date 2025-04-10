
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";
import { 
  Globe, 
  CheckCircle, 
  Search, 
  Shield, 
  RefreshCcw, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Domain pricing information
const domainPricing = [
  { extension: '.com', register: '390,000', transfer: '390,000', renew: '390,000', popular: true },
  { extension: '.net', register: '410,000', transfer: '410,000', renew: '410,000', popular: true },
  { extension: '.org', register: '420,000', transfer: '420,000', renew: '420,000', popular: true },
  { extension: '.ir', register: '150,000', transfer: 'N/A', renew: '150,000', popular: true },
  { extension: '.co.ir', register: '100,000', transfer: 'N/A', renew: '100,000', popular: false },
  { extension: '.info', register: '350,000', transfer: '350,000', renew: '350,000', popular: false },
  { extension: '.biz', register: '380,000', transfer: '380,000', renew: '380,000', popular: false },
  { extension: '.io', register: '1,450,000', transfer: '1,450,000', renew: '1,450,000', popular: false },
  { extension: '.co', register: '850,000', transfer: '850,000', renew: '850,000', popular: false },
  { extension: '.app', register: '490,000', transfer: '490,000', renew: '490,000', popular: true },
  { extension: '.dev', register: '480,000', transfer: '480,000', renew: '480,000', popular: false },
  { extension: '.me', register: '650,000', transfer: '650,000', renew: '650,000', popular: false },
];

// Frequently asked questions about domains
const domainFAQs = [
  {
    question: "تفاوت پسوندهای مختلف دامنه چیست؟",
    answer: "پسوندهای مختلف دامنه (TLD) برای مقاصد متفاوتی طراحی شده‌اند. پسوندهای عمومی مانند .com معمولاً برای کسب و کارهای بین‌المللی استفاده می‌شوند، .org برای سازمان‌های غیرانتفاعی، .net برای شرکت‌های مرتبط با شبکه و فناوری اطلاعات، .ir برای وب‌سایت‌های ایرانی، .app برای اپلیکیشن‌ها و .dev برای پروژه‌های توسعه نرم‌افزار مناسب هستند."
  },
  {
    question: "چگونه می‌توانم مطمئن شوم دامنه من تمدید می‌شود؟",
    answer: "ما 60، 30 و 7 روز قبل از انقضای دامنه، ایمیل‌های یادآوری برای شما ارسال می‌کنیم. همچنین می‌توانید گزینه تمدید خودکار را در پنل کاربری خود فعال کنید تا دامنه به صورت خودکار قبل از انقضا تمدید شود و مطمئن شوید که دامنه شما بدون وقفه در دسترس خواهد بود."
  },
  {
    question: "آیا می‌توانم دامنه‌ای که قبلاً ثبت کرده‌ام را به NovinVDS منتقل کنم؟",
    answer: "بله، شما می‌توانید دامنه خود را از ثبت‌کننده فعلی به NovinVDS منتقل کنید. برای این کار نیاز به کد انتقال (EPP/Auth Code) از ثبت‌کننده فعلی دارید. پس از دریافت این کد، می‌توانید فرآیند انتقال را از پنل کاربری NovinVDS شروع کنید. توجه داشته باشید که برخی پسوندها مانند .ir قابلیت انتقال ندارند."
  },
  {
    question: "چقدر طول می‌کشد تا دامنه‌ای که ثبت کرده‌ام فعال شود؟",
    answer: "بیشتر دامنه‌ها پس از تأیید پرداخت در عرض چند دقیقه تا حداکثر 24 ساعت فعال می‌شوند. دامنه‌های بین‌المللی مانند .com، .net و .org معمولاً سریع‌تر فعال می‌شوند، در حالی که برخی از پسوندهای کشوری ممکن است به بررسی و زمان بیشتری نیاز داشته باشند."
  },
  {
    question: "چگونه می‌توانم اطلاعات WHOIS دامنه خود را محافظت کنم؟",
    answer: "ما سرویس حفاظت از حریم خصوصی WHOIS را برای اکثر پسوندهای بین‌المللی ارائه می‌دهیم. با فعال کردن این سرویس، اطلاعات شخصی شما در پایگاه داده WHOIS با اطلاعات نماینده ما جایگزین می‌شود و از دسترس عموم محفوظ می‌ماند، در حالی که مالکیت دامنه همچنان متعلق به شماست."
  },
  {
    question: "آیا می‌توانم از دامنه خود در سرویس هاستینگ دیگری استفاده کنم؟",
    answer: "بله، شما می‌توانید از دامنه‌ای که از NovinVDS خریداری کرده‌اید با هر سرویس هاستینگی استفاده کنید. کافی است رکوردهای DNS دامنه را از پنل کاربری NovinVDS به سمت سرورهای ناموسپاری (Nameservers) سرویس هاستینگ خود تغییر دهید."
  }
];

const DomainServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('.com');
  const [searchResult, setSearchResult] = useState<null | { available: boolean, domain: string, price: string }>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    if (!searchQuery) return;
    
    setIsSearching(true);
    setSearchResult(null);
    
    // Simulate API call
    setTimeout(() => {
      const available = Math.random() > 0.3; // 70% chance domain is available
      const extension = selectedExtension;
      const domainInfo = domainPricing.find(d => d.extension === extension);
      
      setSearchResult({
        available,
        domain: searchQuery + extension,
        price: domainInfo ? domainInfo.register : '0'
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>ثبت دامنه | خدمات ثبت و انتقال دامنه | NovinVDS</title>
        <meta name="description" content="ثبت انواع دامنه با پسوندهای مختلف، انتقال و تمدید دامنه با قیمت مناسب و پنل مدیریت آسان" />
        <meta name="keywords" content="ثبت دامنه, خرید دامنه, دامنه ir, domain registration, انتقال دامنه, تمدید دامنه" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">ثبت دامنه برای کسب و کار شما</h1>
            <p className="text-xl text-green-50 mb-8 leading-relaxed">
              بیش از 50 پسوند مختلف با قیمت‌های مناسب و تحویل آنی
            </p>
            
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="نام دامنه مورد نظر خود را وارد کنید..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none text-gray-800"
                  />
                </div>
                <div>
                  <select
                    value={selectedExtension}
                    onChange={(e) => setSelectedExtension(e.target.value)}
                    className="w-full md:w-auto px-4 py-3 rounded-lg focus:outline-none text-gray-800"
                  >
                    {domainPricing.map((domain) => (
                      <option key={domain.extension} value={domain.extension}>
                        {domain.extension}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery}
                    className="w-full md:w-auto px-8 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        در حال جستجو...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Search size={20} className="ml-2" />
                        جستجو
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {searchResult && (
                <div className={`mt-6 p-4 rounded-lg ${searchResult.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="flex items-center mb-2">
                    {searchResult.available ? (
                      <>
                        <CheckCircle className="text-green-600 ml-2" size={24} />
                        <h3 className="text-lg font-bold">دامنه {searchResult.domain} قابل ثبت است!</h3>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-600 ml-2" size={24} />
                        <h3 className="text-lg font-bold">دامنه {searchResult.domain} در دسترس نیست!</h3>
                      </>
                    )}
                  </div>
                  
                  {searchResult.available && (
                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                      <p className="font-bold text-xl mb-3 sm:mb-0">قیمت: {searchResult.price} تومان</p>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        ثبت دامنه
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-white/20 rounded-full">.com از {domainPricing.find(d => d.extension === '.com')?.register}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">.net از {domainPricing.find(d => d.extension === '.net')?.register}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">.org از {domainPricing.find(d => d.extension === '.org')?.register}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">.ir از {domainPricing.find(d => d.extension === '.ir')?.register}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">دامنه‌های با کیفیت با خدمات برتر</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ما مدیریت دامنه‌ها را ساده‌تر کرده‌ایم تا شما بتوانید روی کسب و کار خود تمرکز کنید
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-5">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">بیش از 50 پسوند</h3>
              <p className="text-gray-600">
                انتخاب از بین بیش از 50 پسوند دامنه بین‌المللی و داخلی برای یافتن بهترین گزینه برای کسب و کار شما
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-5">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">محافظت از حریم خصوصی</h3>
              <p className="text-gray-600">
                محافظت از اطلاعات شخصی شما با سرویس حفاظت از حریم خصوصی WHOIS برای دامنه‌های بین‌المللی
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-5">
                <RefreshCcw size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">تمدید خودکار</h3>
              <p className="text-gray-600">
                امکان فعال‌سازی تمدید خودکار برای اطمینان از اینکه دامنه شما همیشه فعال می‌ماند و کسب و کارتان بدون وقفه ادامه دارد
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-5">
                <Settings size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">پنل مدیریت آسان</h3>
              <p className="text-gray-600">
                پنل مدیریت کاربرپسند برای کنترل تمام جنبه‌های دامنه شما، از مدیریت DNS تا انتقال و تمدید، همه در یک مکان
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
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-right font-medium text-gray-600">پسوند دامنه</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">ثبت</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">انتقال</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">تمدید</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">سفارش</th>
                </tr>
              </thead>
              <tbody>
                {domainPricing.map((domain, index) => (
                  <tr key={index} className={`border-b hover:bg-gray-50 ${domain.popular ? 'bg-green-50' : ''}`}>
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center">
                        {domain.popular && <span className="inline-block w-2 h-2 bg-green-600 rounded-full ml-2"></span>}
                        {domain.extension}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">{domain.register} تومان</td>
                    <td className="py-4 px-6 text-center">{domain.transfer}</td>
                    <td className="py-4 px-6 text-center">{domain.renew} تومان</td>
                    <td className="py-4 px-6 text-center">
                      <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                        ثبت
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Domain Management */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://placehold.co/800x600/4ade80/FFFFFF/png?text=Domain+Management&font=Montserrat" 
                alt="مدیریت دامنه" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold mb-6">مدیریت آسان دامنه</h2>
              <p className="text-gray-600 mb-6">
                با پنل مدیریت پیشرفته NovinVDS، کنترل کامل دامنه‌های خود را در دست بگیرید. به راحتی رکوردهای DNS را مدیریت کنید، مشخصات تماس را به‌روزرسانی کنید و انتقال‌ها را انجام دهید.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-green-100 rounded-lg text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">مدیریت ساده DNS</h3>
                    <p className="text-gray-600">افزودن، ویرایش و حذف رکوردهای DNS با رابط کاربری ساده و کاربرپسند</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-green-100 rounded-lg text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">قفل انتقال دامنه</h3>
                    <p className="text-gray-600">محافظت از دامنه در برابر انتقال‌های غیرمجاز با قابلیت قفل انتقال</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-green-100 rounded-lg text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">مدیریت اطلاعات WHOIS</h3>
                    <p className="text-gray-600">به‌روزرسانی و محافظت از اطلاعات تماس در پایگاه داده WHOIS</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-green-100 rounded-lg text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">تنظیمات تمدید خودکار</h3>
                    <p className="text-gray-600">فعال‌سازی تمدید خودکار برای اطمینان از عدم انقضای دامنه‌ها</p>
                  </div>
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
                پاسخ سوالات رایج درباره خدمات دامنه
              </p>
            </div>
            
            <div className="space-y-6">
              {domainFAQs.map((faq, index) => (
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
      <section className="py-16 bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">دامنه ایده‌آل خود را پیدا کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-green-50">
            از بین بیش از 50 پسوند دامنه انتخاب کنید و اولین قدم برای حضور آنلاین کسب و کار خود را بردارید.
            با NovinVDS، از فرآیند ساده ثبت، مدیریت و تمدید دامنه لذت ببرید.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="#" className="px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
              جستجوی دامنه
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

export default DomainServices;

// Adding missing components that might be used in this file
const Settings = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
};

const XCircle = (props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={props.style}><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>;
};

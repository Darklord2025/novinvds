
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";
import { 
  Server, 
  CheckCircle, 
  Database, 
  ShieldCheck, 
  Rocket, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Hosting plan types and their detailed information
const hostingPlans = [
  {
    id: "linux-eco",
    name: "هاست لینوکس ECO",
    icon: <Server className="text-green-600" />,
    description: "میزبانی وب مقرون به صرفه با منابع مناسب برای وب‌سایت‌های کوچک",
    features: [
      "فضای میزبانی: 5GB",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MySQL: 3 عدد",
      "ایمیل اختصاصی: 10 اکانت",
      "پشتیبانی از PHP 8.x",
      "کنترل پنل cPanel"
    ],
    price: "125,000",
    period: "ماهانه",
    popular: false,
    color: "green"
  },
  {
    id: "linux-pro",
    name: "هاست لینوکس PRO",
    icon: <Server className="text-blue-600" />,
    description: "میزبانی حرفه‌ای با منابع بالا و پشتیبانی 24/7 برای کسب‌وکارهای متوسط",
    features: [
      "فضای میزبانی: 20GB SSD",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MySQL: نامحدود",
      "ایمیل اختصاصی: نامحدود",
      "پشتیبانی از PHP 8.x",
      "کنترل پنل cPanel با امکانات پیشرفته",
      "گواهی SSL رایگان"
    ],
    price: "295,000",
    period: "ماهانه",
    popular: true,
    color: "blue"
  },
  {
    id: "linux-pro-iran",
    name: "هاست لینوکس PRO ایران",
    icon: <Server className="text-purple-600" />,
    description: "میزبانی حرفه‌ای روی سرورهای پرقدرت ایران با دسترسی سریع",
    features: [
      "فضای میزبانی: 30GB SSD NVMe",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MySQL: نامحدود",
      "ایمیل اختصاصی: نامحدود",
      "پشتیبانی از PHP 8.x",
      "کنترل پنل cPanel با امکانات پیشرفته",
      "گواهی SSL رایگان",
      "سرورهای مستقر در ایران"
    ],
    price: "350,000",
    period: "ماهانه",
    popular: false,
    color: "purple"
  },
  {
    id: "linux-vip",
    name: "هاست لینوکس VIP",
    icon: <Server className="text-yellow-600" />,
    description: "میزبانی فوق‌العاده قدرتمند با منابع اختصاصی برای وب‌سایت‌های پربازدید",
    features: [
      "فضای میزبانی: 50GB SSD NVMe",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MySQL: نامحدود",
      "ایمیل اختصاصی: نامحدود",
      "پشتیبانی از PHP 8.x",
      "کنترل پنل cPanel با امکانات پیشرفته",
      "گواهی SSL رایگان",
      "بکاپ روزانه اتوماتیک"
    ],
    price: "525,000",
    period: "ماهانه",
    popular: false,
    color: "yellow"
  },
  {
    id: "linux-iran",
    name: "هاست لینوکس ایران",
    icon: <Server className="text-red-600" />,
    description: "میزبانی اقتصادی روی سرورهای داخلی با پایداری بالا",
    features: [
      "فضای میزبانی: 10GB SSD",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MySQL: 5 عدد",
      "ایمیل اختصاصی: 20 اکانت",
      "پشتیبانی از PHP 8.x",
      "کنترل پنل Direct Admin",
      "سرورهای مستقر در ایران"
    ],
    price: "175,000",
    period: "ماهانه",
    popular: false,
    color: "red"
  },
  {
    id: "wordpress",
    name: "هاست وردپرس",
    icon: <Database className="text-indigo-600" />,
    description: "میزبانی بهینه‌سازی‌شده برای سایت‌های وردپرسی با سرعت بارگذاری بالا",
    features: [
      "فضای میزبانی: 15GB SSD",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MySQL: نامحدود",
      "ایمیل اختصاصی: نامحدود",
      "پشتیبانی از PHP 8.x",
      "کنترل پنل cPanel",
      "WordPress Toolkit",
      "نصب خودکار وردپرس"
    ],
    price: "250,000",
    period: "ماهانه",
    popular: false,
    color: "indigo"
  },
  {
    id: "woocommerce",
    name: "هاست ووکامرس",
    icon: <Database className="text-pink-600" />,
    description: "میزبانی مخصوص فروشگاه‌های آنلاین با پشتیبانی از ووکامرس",
    features: [
      "فضای میزبانی: 25GB SSD NVMe",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MySQL: نامحدود",
      "ایمیل اختصاصی: نامحدود",
      "پشتیبانی از PHP 8.x",
      "کنترل پنل cPanel",
      "WordPress & WooCommerce Toolkit",
      "گواهی SSL رایگان",
      "بهینه‌سازی برای فروشگاه‌های آنلاین"
    ],
    price: "375,000",
    period: "ماهانه",
    popular: false,
    color: "pink"
  },
  {
    id: "windows",
    name: "هاست ویندوز",
    icon: <Server className="text-blue-500" />,
    description: "میزبانی وب روی پلتفرم ویندوز با پشتیبانی از ASP.NET و MSSQL",
    features: [
      "فضای میزبانی: 15GB SSD",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MSSQL: 2GB",
      "ایمیل اختصاصی: 20 اکانت",
      "پشتیبانی از ASP.NET Core",
      "کنترل پنل Plesk"
    ],
    price: "350,000",
    period: "ماهانه",
    popular: false,
    color: "blue"
  },
  {
    id: "windows-iran",
    name: "هاست ویندوز ایران",
    icon: <Server className="text-cyan-600" />,
    description: "میزبانی ویندوز روی سرورهای ایران با دسترسی سریع",
    features: [
      "فضای میزبانی: 20GB SSD",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MSSQL: 3GB",
      "ایمیل اختصاصی: نامحدود",
      "پشتیبانی از ASP.NET Core",
      "کنترل پنل Plesk",
      "سرورهای مستقر در ایران"
    ],
    price: "425,000",
    period: "ماهانه",
    popular: false,
    color: "cyan"
  },
  {
    id: "python",
    name: "هاست پایتون",
    icon: <Database className="text-green-700" />,
    description: "میزبانی تخصصی برای اپلیکیشن‌های پایتون با پشتیبانی از فریم‌ورک‌های متنوع",
    features: [
      "فضای میزبانی: 15GB SSD",
      "ترافیک ماهانه: نامحدود",
      "پایگاه داده MySQL: نامحدود",
      "ایمیل اختصاصی: 20 اکانت",
      "پشتیبانی از Python 3.9+",
      "پشتیبانی از Django و Flask",
      "SSL رایگان"
    ],
    price: "325,000",
    period: "ماهانه",
    popular: false,
    color: "green"
  },
];

// Frequently asked questions about hosting services
const hostingFAQs = [
  {
    question: "تفاوت هاست لینوکس و ویندوز چیست؟",
    answer: "هاست لینوکس برای سایت‌های توسعه یافته با PHP، WordPress و سیستم‌های مدیریت محتوای متداول مناسب است و معمولاً ارزان‌تر و پایدارتر است. هاست ویندوز برای سایت‌هایی که از تکنولوژی‌های مایکروسافت مانند ASP.NET و پایگاه داده MSSQL استفاده می‌کنند مناسب است."
  },
  {
    question: "چرا باید هاست ایران را انتخاب کنم؟",
    answer: "هاست ایران برای کسب و کارهایی که مخاطبان ایرانی دارند مناسب‌تر است زیرا سرعت لود سایت برای کاربران ایرانی بالاتر است، امکان پرداخت ریالی وجود دارد و مشکلات مربوط به تحریم‌ها را ندارد."
  },
  {
    question: "آیا امکان ارتقاء پلن هاستینگ وجود دارد؟",
    answer: "بله، شما می‌توانید در هر زمان پلن هاستینگ خود را به نسخه‌های بالاتر ارتقا دهید. در این صورت، هزینه مابه‌التفاوت پلن فعلی تا پلن جدید محاسبه خواهد شد."
  },
  {
    question: "آیا برای سایت وردپرسی باید حتماً از هاست وردپرس استفاده کنم؟",
    answer: "استفاده از هاست وردپرس الزامی نیست، اما این نوع هاست با تنظیمات ویژه‌ای برای اجرای بهینه وردپرس پیکربندی شده و معمولاً سرعت بارگذاری بالاتر و امنیت بیشتری را برای سایت‌های وردپرسی فراهم می‌کند."
  },
  {
    question: "پشتیبانی شما چگونه است و چقدر طول می‌کشد تا به درخواست‌های من پاسخ دهید؟",
    answer: "ما پشتیبانی 24/7 از طریق تیکت، ایمیل و تلفن ارائه می‌دهیم. زمان پاسخگویی به تیکت‌های پشتیبانی معمولاً کمتر از 30 دقیقه است و در موارد اضطراری به سرعت به مشکلات رسیدگی می‌کنیم."
  },
  {
    question: "آیا می‌توانم چندین دامنه را روی یک هاست میزبانی کنم؟",
    answer: "بله، در اکثر پلن‌های هاستینگ ما امکان میزبانی چندین دامنه (Addon Domains) وجود دارد. تعداد دامنه‌های قابل افزودن بسته به پلن انتخابی شما متفاوت است."
  }
];

const HostingServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>خدمات هاستینگ و میزبانی وب | NovinVDS</title>
        <meta name="description" content="انواع مختلف هاستینگ لینوکس، ویندوز، وردپرس و ووکامرس با بالاترین کیفیت و پشتیبانی 24/7 برای کسب و کارهای آنلاین" />
        <meta name="keywords" content="هاست لینوکس, هاست ویندوز, هاست وردپرس, هاست ووکامرس, میزبانی وب, هاستینگ ایران" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">خدمات هاستینگ حرفه‌ای و مقرون به صرفه</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              هاست‌های قدرتمند با آپتایم 99.9% و پشتیبانی 24/7 برای کسب و کار آنلاین شما
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="#hosting-plans" className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors">
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
            <h2 className="text-3xl font-bold mb-4">چرا هاستینگ NovinVDS را انتخاب کنید؟</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ما بیش از 10 سال تجربه در ارائه خدمات هاستینگ با بالاترین کیفیت داریم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-5">
                <Server size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">سرورهای پیشرفته</h3>
              <p className="text-gray-600">
                استفاده از سرورهای قدرتمند با پردازنده‌های نسل جدید و حافظه‌های SSD NVMe برای سرعت بارگذاری فوق‌العاده
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-5">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">آپتایم 99.9%</h3>
              <p className="text-gray-600">
                تضمین دسترسی بالا با کمترین زمان قطعی سرویس به همراه مانیتورینگ 24 ساعته و سیستم‌های پشتیبان برق و شبکه
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-5">
                <Database size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">کنترل پنل قدرتمند</h3>
              <p className="text-gray-600">
                ارائه کنترل پنل‌های حرفه‌ای cPanel، Plesk و DirectAdmin با امکانات پیشرفته و رابط کاربری آسان
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-5">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">امنیت پیشرفته</h3>
              <p className="text-gray-600">
                حفاظت از سایت شما با فایروال‌های پیشرفته، آنتی‌ویروس، اسکن امنیتی مداوم و نصب خودکار به‌روزرسانی‌های امنیتی
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-5">
                <Rocket size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">عملکرد فوق‌العاده</h3>
              <p className="text-gray-600">
                سرعت بالای بارگذاری سایت با استفاده از تکنولوژی‌های LiteSpeed، SSD و شبکه‌های توزیع محتوا (CDN)
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-5">
                <ArrowRight size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">پشتیبانی 24/7</h3>
              <p className="text-gray-600">
                پشتیبانی فنی متخصص در تمام ساعات شبانه‌روز و 7 روز هفته از طریق تیکت، ایمیل و تلفن
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Hosting Plans Section */}
      <section id="hosting-plans" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">پلن‌های هاستینگ</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              پلن هاستینگ مناسب خود را انتخاب کنید و همین امروز وب‌سایت خود را راه‌اندازی کنید
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border ${plan.popular ? 'border-blue-500 transform scale-105' : 'border-transparent'} transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="bg-blue-600 text-white py-1 px-4 text-center text-sm">
                    پرفروش‌ترین
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${plan.color}-100 mr-4`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 mr-2">تومان / {plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="text-green-500 ml-2 flex-shrink-0" size={18} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className={`w-full py-3 bg-${plan.color}-600 text-white rounded-lg font-medium hover:bg-${plan.color}-700 transition-colors`}
                  >
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
            <Link to="/contact" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              با کارشناسان ما تماس بگیرید <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
              <p className="text-gray-600">
                پاسخ سوالات رایج درباره خدمات هاستینگ ما
              </p>
            </div>
            
            <div className="space-y-6">
              {hostingFAQs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">همین امروز سایت خود را راه‌اندازی کنید</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            با میزبانی وب NovinVDS، سایت خود را با سرعت و امنیت بالا راه‌اندازی کنید
            و از پشتیبانی 24/7 متخصصین ما بهره‌مند شوید.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="#hosting-plans" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              انتخاب پلن هاستینگ
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

export default HostingServices;


import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Cpu, HardDrive, Network, Globe } from 'lucide-react';

const DedicatedPlans = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
    
    return () => {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    };
  }, []);

  const iranDedicatedPlans = [
    {
      id: "iran-dedi-1",
      title: "سرور اختصاصی ایران - پایه",
      price: "6,900,000",
      period: "ماهانه",
      cpu: "Intel Xeon E-2236",
      cores: "6 هسته / 12 ترد",
      ram: "32GB DDR4",
      disk: "2x 1TB SSD",
      bandwidth: "20TB",
      location: "ایران",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "1 آدرس IP",
        "تحویل 24 ساعته",
      ],
      isPopular: false,
    },
    {
      id: "iran-dedi-2",
      title: "سرور اختصاصی ایران - استاندارد",
      price: "10,900,000",
      period: "ماهانه",
      cpu: "Intel Xeon Silver 4210",
      cores: "10 هسته / 20 ترد",
      ram: "64GB DDR4",
      disk: "2x 2TB SSD",
      bandwidth: "نامحدود",
      location: "ایران",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "2 آدرس IP",
        "تحویل 24 ساعته",
        "مدیریت سرور رایگان",
      ],
      isPopular: true,
    },
    {
      id: "iran-dedi-3",
      title: "سرور اختصاصی ایران - حرفه‌ای",
      price: "16,900,000",
      period: "ماهانه",
      cpu: "Intel Xeon Gold 5218",
      cores: "16 هسته / 32 ترد",
      ram: "128GB DDR4",
      disk: "2x 4TB SSD + 2TB NVMe",
      bandwidth: "نامحدود",
      location: "ایران",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "4 آدرس IP",
        "تحویل 24 ساعته",
        "مدیریت سرور رایگان",
        "پشتیبانی اختصاصی",
      ],
      isPopular: false,
    },
  ];

  const europeDedicatedPlans = [
    {
      id: "europe-dedi-1",
      title: "سرور اختصاصی اروپا - پایه",
      price: "5,900,000",
      period: "ماهانه",
      cpu: "Intel Xeon E-2236",
      cores: "6 هسته / 12 ترد",
      ram: "32GB DDR4",
      disk: "2x 1TB SSD",
      bandwidth: "30TB",
      location: "آلمان",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "1 آدرس IP",
        "تحویل 24 ساعته",
      ],
      isPopular: false,
    },
    {
      id: "europe-dedi-2",
      title: "سرور اختصاصی اروپا - استاندارد",
      price: "8,900,000",
      period: "ماهانه",
      cpu: "Intel Xeon Silver 4210",
      cores: "10 هسته / 20 ترد",
      ram: "64GB DDR4",
      disk: "2x 2TB SSD",
      bandwidth: "50TB",
      location: "آلمان",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "2 آدرس IP",
        "تحویل 24 ساعته",
        "مدیریت سرور رایگان",
      ],
      isPopular: true,
    },
    {
      id: "europe-dedi-3",
      title: "سرور اختصاصی اروپا - حرفه‌ای",
      price: "14,900,000",
      period: "ماهانه",
      cpu: "Intel Xeon Gold 5218",
      cores: "16 هسته / 32 ترد",
      ram: "128GB DDR4",
      disk: "2x 4TB SSD + 2TB NVMe",
      bandwidth: "100TB",
      location: "آلمان",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "4 آدرس IP",
        "تحویل 24 ساعته",
        "مدیریت سرور رایگان",
        "پشتیبانی اختصاصی",
      ],
      isPopular: false,
    },
  ];

  const usaDedicatedPlans = [
    {
      id: "usa-dedi-1",
      title: "سرور اختصاصی آمریکا - پایه",
      price: "6,200,000",
      period: "ماهانه",
      cpu: "Intel Xeon E-2236",
      cores: "6 هسته / 12 ترد",
      ram: "32GB DDR4",
      disk: "2x 1TB SSD",
      bandwidth: "30TB",
      location: "آمریکا",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "1 آدرس IP",
        "تحویل 24 ساعته",
      ],
      isPopular: false,
    },
    {
      id: "usa-dedi-2",
      title: "سرور اختصاصی آمریکا - استاندارد",
      price: "9,400,000",
      period: "ماهانه",
      cpu: "Intel Xeon Silver 4210",
      cores: "10 هسته / 20 ترد",
      ram: "64GB DDR4",
      disk: "2x 2TB SSD",
      bandwidth: "50TB",
      location: "آمریکا",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "2 آدرس IP",
        "تحویل 24 ساعته",
        "مدیریت سرور رایگان",
      ],
      isPopular: true,
    },
    {
      id: "usa-dedi-3",
      title: "سرور اختصاصی آمریکا - حرفه‌ای",
      price: "15,500,000",
      period: "ماهانه",
      cpu: "Intel Xeon Gold 5218",
      cores: "16 هسته / 32 ترد",
      ram: "128GB DDR4",
      disk: "2x 4TB SSD + 2TB NVMe",
      bandwidth: "100TB",
      location: "آمریکا",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "4 آدرس IP",
        "تحویل 24 ساعته",
        "مدیریت سرور رایگان",
        "پشتیبانی اختصاصی",
      ],
      isPopular: false,
    },
  ];

  const asiaDedicatedPlans = [
    {
      id: "asia-dedi-1",
      title: "سرور اختصاصی آسیا - پایه",
      price: "6,500,000",
      period: "ماهانه",
      cpu: "Intel Xeon E-2236",
      cores: "6 هسته / 12 ترد",
      ram: "32GB DDR4",
      disk: "2x 1TB SSD",
      bandwidth: "30TB",
      location: "سنگاپور",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "1 آدرس IP",
        "تحویل 24 ساعته",
      ],
      isPopular: false,
    },
    {
      id: "asia-dedi-2",
      title: "سرور اختصاصی آسیا - استاندارد",
      price: "9,800,000",
      period: "ماهانه",
      cpu: "Intel Xeon Silver 4210",
      cores: "10 هسته / 20 ترد",
      ram: "64GB DDR4",
      disk: "2x 2TB SSD",
      bandwidth: "50TB",
      location: "سنگاپور",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "2 آدرس IP",
        "تحویل 24 ساعته",
        "مدیریت سرور رایگان",
      ],
      isPopular: true,
    },
    {
      id: "asia-dedi-3",
      title: "سرور اختصاصی آسیا - حرفه‌ای",
      price: "15,900,000",
      period: "ماهانه",
      cpu: "Intel Xeon Gold 5218",
      cores: "16 هسته / 32 ترد",
      ram: "128GB DDR4",
      disk: "2x 4TB SSD + 2TB NVMe",
      bandwidth: "100TB",
      location: "سنگاپور",
      features: [
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "نصب رایگان سیستم عامل",
        "4 آدرس IP",
        "تحویل 24 ساعته",
        "مدیریت سرور رایگان",
        "پشتیبانی اختصاصی",
      ],
      isPopular: false,
    },
  ];

  const renderPricingCard = (plan) => (
    <Card key={plan.id} className={`flex flex-col h-full transition-all duration-300 ${plan.isPopular ? 'shadow-lg border-blue-400 scale-105' : 'border-gray-200'}`}>
      {plan.isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            پیشنهاد ویژه
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-center text-xl">{plan.title}</CardTitle>
        <CardDescription className="text-center">
          <div className="mt-4">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-sm text-gray-500"> تومان / {plan.period}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg flex items-center">
            <Cpu className="h-5 w-5 text-blue-600 ml-3" />
            <div>
              <div className="font-bold text-blue-800">{plan.cpu}</div>
              <div className="text-xs text-gray-600">{plan.cores}</div>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg flex items-center">
            <div className="h-5 w-5 text-green-600 ml-3 font-bold">RAM</div>
            <div className="font-bold text-green-800">{plan.ram}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg flex items-center">
            <HardDrive className="h-5 w-5 text-purple-600 ml-3" />
            <div className="font-bold text-purple-800">{plan.disk}</div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg flex items-center">
            <Network className="h-5 w-5 text-amber-600 ml-3" />
            <div className="font-bold text-amber-800">ترافیک: {plan.bandwidth}</div>
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg text-center mb-4 flex items-center justify-center gap-2">
          <Globe className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">دیتاسنتر: {plan.location}</span>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="bg-green-100 p-1 rounded-full mr-2">
                <Check className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${plan.isPopular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : ''}`}>
          سفارش سرور
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen overflow-hidden">
      <Helmet>
        <title>سرور اختصاصی نوین وی دی اس | سرور اختصاصی ایران، اروپا، آمریکا و آسیا</title>
        <meta name="description" content="خرید انواع سرور اختصاصی در ایران، اروپا، آمریکا و آسیا با قیمت مناسب و کیفیت بالا. تحویل سریع، پشتیبانی 24 ساعته و ضمانت آپتایم 99.9%" />
        <meta name="keywords" content="سرور اختصاصی، دیدیکیتد سرور، سرور اختصاصی ایران، سرور اختصاصی اروپا، سرور اختصاصی آمریکا، سرور اختصاصی آسیا" />
        <style>
          {`
            body {
              direction: rtl;
              font-family: Vazirmatn, system-ui, sans-serif;
            }
          `}
        </style>
      </Helmet>
      
      <Navbar />
      
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">سرور اختصاصی نوین وی دی اس</h1>
            <p className="text-gray-600 md:text-lg">
              سرور اختصاصی قدرتمند با سخت‌افزار اختصاصی، عملکرد فوق‌العاده و امنیت بالا
            </p>
          </div>
          
          <Tabs defaultValue="iran-dedicated" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              <TabsTrigger value="iran-dedicated">سرور اختصاصی ایران</TabsTrigger>
              <TabsTrigger value="europe-dedicated">سرور اختصاصی اروپا</TabsTrigger>
              <TabsTrigger value="usa-dedicated">سرور اختصاصی آمریکا</TabsTrigger>
              <TabsTrigger value="asia-dedicated">سرور اختصاصی آسیا</TabsTrigger>
            </TabsList>
            
            <TabsContent value="iran-dedicated" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {iranDedicatedPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="europe-dedicated" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {europeDedicatedPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="usa-dedicated" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {usaDedicatedPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="asia-dedicated" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {asiaDedicatedPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">چرا سرور اختصاصی نوین وی دی اس؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">عملکرد فوق‌العاده</h3>
                <p className="text-gray-700">سرورهای اختصاصی ما با استفاده از پردازنده‌های قدرتمند Intel Xeon، حافظه DDR4 و دیسک‌های SSD عملکرد فوق‌العاده‌ای را برای شما فراهم می‌کنند.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">کنترل کامل</h3>
                <p className="text-gray-700">با استفاده از سرور اختصاصی، کنترل کامل روی منابع سخت‌افزاری و سیستم عامل خواهید داشت. شما می‌توانید هر نرم‌افزاری را نصب کنید و تنظیمات سرور را مطابق نیاز خود تغییر دهید.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">امنیت بالا</h3>
                <p className="text-gray-700">سرور اختصاصی به معنی منابع اختصاصی است. بر خلاف سرورهای مجازی، هیچ کاربر دیگری از سخت‌افزار شما استفاده نمی‌کند، که منجر به افزایش امنیت و حفظ حریم خصوصی می‌شود.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">سوالات متداول</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">تفاوت سرور اختصاصی با سرور مجازی چیست؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>سرور اختصاصی یک سرور فیزیکی است که تمام منابع آن (CPU، RAM، هارد دیسک) به صورت اختصاصی در اختیار شما قرار می‌گیرد. در مقابل، سرور مجازی بخشی از یک سرور فیزیکی است که با کاربران دیگر به اشتراک گذاشته می‌شود. سرور اختصاصی عملکرد بهتر، امنیت بالاتر و کنترل بیشتری نسبت به سرور مجازی دارد.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">آیا برای مدیریت سرور اختصاصی به دانش فنی نیاز است؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>معمولاً بله، مدیریت سرور اختصاصی نیازمند دانش فنی در زمینه سیستم‌عامل و شبکه است. اما نگران نباشید! نوین وی دی اس خدمات مدیریت سرور اختصاصی ارائه می‌دهد که در آن متخصصان ما وظیفه نگهداری، بروزرسانی و امنیت سرور شما را بر عهده می‌گیرند.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">مدت زمان راه‌اندازی سرور اختصاصی چقدر است؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>معمولاً راه‌اندازی سرور اختصاصی بین 24 تا 48 ساعت زمان می‌برد. البته در برخی موارد و بسته به دسترس بودن سخت‌افزار مورد نیاز، ممکن است این زمان کمتر یا بیشتر شود. پس از راه‌اندازی، دسترسی‌های لازم به سرور در اختیار شما قرار می‌گیرد.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DedicatedPlans;

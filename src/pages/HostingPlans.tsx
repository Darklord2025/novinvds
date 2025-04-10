
import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from 'lucide-react';

const HostingPlans = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
    
    return () => {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    };
  }, []);

  const linuxEcoPlans = [
    {
      id: "linux-eco-1",
      title: "هاست لینوکس ECO - پایه",
      price: "490,000",
      period: "سالانه",
      space: "5GB",
      bandwidth: "نامحدود",
      domains: "5",
      features: [
        "پشتیبانی از PHP 8.2",
        "پشتیبانی از MySQL",
        "پنل cPanel",
        "بکاپ روزانه",
        "SSL رایگان",
      ],
      isPopular: false,
    },
    {
      id: "linux-eco-2",
      title: "هاست لینوکس ECO - استاندارد",
      price: "790,000",
      period: "سالانه",
      space: "10GB",
      bandwidth: "نامحدود",
      domains: "10",
      features: [
        "پشتیبانی از PHP 8.2",
        "پشتیبانی از MySQL",
        "پنل cPanel",
        "بکاپ روزانه",
        "SSL رایگان",
        "دامنه ir. رایگان",
      ],
      isPopular: true,
    },
    {
      id: "linux-eco-3",
      title: "هاست لینوکس ECO - حرفه‌ای",
      price: "1,290,000",
      period: "سالانه",
      space: "25GB",
      bandwidth: "نامحدود",
      domains: "نامحدود",
      features: [
        "پشتیبانی از PHP 8.2",
        "پشتیبانی از MySQL",
        "پنل cPanel",
        "بکاپ روزانه",
        "SSL رایگان",
        "دامنه ir. رایگان",
        "نصب رایگان قالب و افزونه",
      ],
      isPopular: false,
    },
  ];

  const linuxProPlans = [
    {
      id: "linux-pro-1",
      title: "هاست لینوکس PRO - پایه",
      price: "750,000",
      period: "سالانه",
      space: "10GB SSD",
      bandwidth: "نامحدود",
      domains: "10",
      features: [
        "پشتیبانی از PHP 8.2",
        "پشتیبانی از MySQL",
        "پنل cPanel",
        "بکاپ روزانه",
        "SSL رایگان",
        "LiteSpeed",
        "Redis Cache",
      ],
      isPopular: false,
    },
    {
      id: "linux-pro-2",
      title: "هاست لینوکس PRO - استاندارد",
      price: "1,190,000",
      period: "سالانه",
      space: "25GB SSD",
      bandwidth: "نامحدود",
      domains: "نامحدود",
      features: [
        "پشتیبانی از PHP 8.2",
        "پشتیبانی از MySQL",
        "پنل cPanel",
        "بکاپ روزانه",
        "SSL رایگان",
        "LiteSpeed",
        "Redis Cache",
        "دامنه com. رایگان",
      ],
      isPopular: true,
    },
    {
      id: "linux-pro-3",
      title: "هاست لینوکس PRO - حرفه‌ای",
      price: "2,190,000",
      period: "سالانه",
      space: "50GB SSD",
      bandwidth: "نامحدود",
      domains: "نامحدود",
      features: [
        "پشتیبانی از PHP 8.2",
        "پشتیبانی از MySQL",
        "پنل cPanel",
        "بکاپ روزانه",
        "SSL رایگان",
        "LiteSpeed",
        "Redis Cache",
        "دامنه com. رایگان",
        "نصب رایگان قالب و افزونه",
      ],
      isPopular: false,
    },
  ];

  const wordpressPlans = [
    {
      id: "wordpress-1",
      title: "هاست وردپرس - پایه",
      price: "990,000",
      period: "سالانه",
      space: "10GB SSD",
      bandwidth: "نامحدود",
      domains: "1",
      features: [
        "پشتیبانی از وردپرس",
        "LiteSpeed",
        "Redis Cache",
        "بکاپ روزانه",
        "SSL رایگان",
        "نصب خودکار وردپرس",
      ],
      isPopular: false,
    },
    {
      id: "wordpress-2",
      title: "هاست وردپرس - استاندارد",
      price: "1,490,000",
      period: "سالانه",
      space: "25GB SSD",
      bandwidth: "نامحدود",
      domains: "3",
      features: [
        "پشتیبانی از وردپرس",
        "LiteSpeed",
        "Redis Cache",
        "بکاپ روزانه",
        "SSL رایگان",
        "نصب خودکار وردپرس",
        "دامنه com. رایگان",
      ],
      isPopular: true,
    },
    {
      id: "wordpress-3",
      title: "هاست وردپرس - حرفه‌ای",
      price: "2,490,000",
      period: "سالانه",
      space: "50GB SSD",
      bandwidth: "نامحدود",
      domains: "5",
      features: [
        "پشتیبانی از وردپرس",
        "LiteSpeed",
        "Redis Cache",
        "بکاپ روزانه",
        "SSL رایگان",
        "نصب خودکار وردپرس",
        "دامنه com. رایگان",
        "نصب رایگان قالب و افزونه",
      ],
      isPopular: false,
    },
  ];

  const woocommercePlans = [
    {
      id: "woocommerce-1",
      title: "هاست ووکامرس - پایه",
      price: "1,290,000",
      period: "سالانه",
      space: "15GB SSD",
      bandwidth: "نامحدود",
      domains: "1",
      features: [
        "بهینه سازی ووکامرس",
        "LiteSpeed",
        "Redis Cache",
        "بکاپ روزانه",
        "SSL رایگان",
        "نصب خودکار ووکامرس",
      ],
      isPopular: false,
    },
    {
      id: "woocommerce-2",
      title: "هاست ووکامرس - استاندارد",
      price: "1,990,000",
      period: "سالانه",
      space: "30GB SSD",
      bandwidth: "نامحدود",
      domains: "3",
      features: [
        "بهینه سازی ووکامرس",
        "LiteSpeed",
        "Redis Cache",
        "بکاپ روزانه",
        "SSL رایگان",
        "نصب خودکار ووکامرس",
        "دامنه com. رایگان",
      ],
      isPopular: true,
    },
    {
      id: "woocommerce-3",
      title: "هاست ووکامرس - حرفه‌ای",
      price: "2,990,000",
      period: "سالانه",
      space: "60GB SSD",
      bandwidth: "نامحدود",
      domains: "5",
      features: [
        "بهینه سازی ووکامرس",
        "LiteSpeed",
        "Redis Cache",
        "بکاپ روزانه",
        "SSL رایگان",
        "نصب خودکار ووکامرس",
        "دامنه com. رایگان",
        "نصب رایگان قالب و افزونه",
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
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">فضا</div>
            <div className="font-bold text-blue-800">{plan.space}</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">پهنای باند</div>
            <div className="font-bold text-green-800">{plan.bandwidth}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">دامنه</div>
            <div className="font-bold text-purple-800">{plan.domains}</div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">ایمیل</div>
            <div className="font-bold text-amber-800">نامحدود</div>
          </div>
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
          سفارش پلن
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen overflow-hidden">
      <Helmet>
        <title>پلن های هاستینگ نوین وی دی اس | هاست لینوکس، هاست وردپرس، هاست ووکامرس</title>
        <meta name="description" content="انواع پلن های هاستینگ نوین وی دی اس با قیمت مناسب و کیفیت بالا. هاست لینوکس ECO، هاست لینوکس PRO، هاست وردپرس، هاست ووکامرس و هاست ویندوز با پشتیبانی 24 ساعته." />
        <meta name="keywords" content="هاست لینوکس, هاست وردپرس, هاست ووکامرس, هاست ویندوز, هاستینگ ایران, خرید هاست, قیمت هاست" />
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">پلن‌های هاستینگ نوین وی دی اس</h1>
            <p className="text-gray-600 md:text-lg">
              هاستینگ ایمن، پایدار و مقرون به صرفه برای وب‌سایت و فروشگاه آنلاین شما
            </p>
          </div>
          
          <Tabs defaultValue="linux-eco" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              <TabsTrigger value="linux-eco">هاست لینوکس ECO</TabsTrigger>
              <TabsTrigger value="linux-pro">هاست لینوکس PRO</TabsTrigger>
              <TabsTrigger value="wordpress">هاست وردپرس</TabsTrigger>
              <TabsTrigger value="woocommerce">هاست ووکامرس</TabsTrigger>
            </TabsList>
            
            <TabsContent value="linux-eco" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {linuxEcoPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="linux-pro" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {linuxProPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="wordpress" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {wordpressPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="woocommerce" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {woocommercePlans.map(renderPricingCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">چرا هاستینگ نوین وی دی اس؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">سرعت بالا</h3>
                <p className="text-gray-700">با استفاده از سرورهای قدرتمند و فناوری‌های پیشرفته، سرعت بارگذاری سایت شما را تضمین می‌کنیم.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">پشتیبانی 24/7</h3>
                <p className="text-gray-700">تیم پشتیبانی متخصص ما در هر ساعت از شبانه‌روز آماده پاسخگویی و رفع مشکلات شماست.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">آپتایم 99.9%</h3>
                <p className="text-gray-700">با زیرساخت‌های قدرتمند، تضمین می‌کنیم که وب‌سایت شما همیشه در دسترس باشد.</p>
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
                  <CardTitle className="text-lg">تفاوت هاست لینوکس ECO و PRO چیست؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>هاست لینوکس PRO از سرورهای قدرتمندتر با دیسک‌های SSD و تکنولوژی LiteSpeed استفاده می‌کند که سرعت بارگذاری سایت را افزایش می‌دهد و برای سایت‌های پربازدید مناسب‌تر است.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">آیا می‌توانم بعداً پلن هاست خود را ارتقا دهم؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>بله، در هر زمان می‌توانید پلن هاست خود را به یک پلن بالاتر ارتقا دهید. تنها کافیست با پشتیبانی تماس بگیرید تا این فرآیند به سرعت و بدون قطعی انجام شود.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">هاست وردپرس چه مزایایی دارد؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>هاست وردپرس به صورت اختصاصی برای سایت‌های وردپرسی بهینه شده است و شامل تنظیمات پیشرفته کش، LiteSpeed و Redis است که سرعت بارگذاری سایت وردپرسی شما را به طور چشمگیری افزایش می‌دهد.</p>
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

export default HostingPlans;

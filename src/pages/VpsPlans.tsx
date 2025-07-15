
import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Cpu, HardDrive, Network, Globe } from 'lucide-react';

const VpsPlans = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
    
    return () => {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    };
  }, []);

  const linuxVpsPlans = [
    {
      id: "linux-vps-1",
      title: "سرور مجازی لینوکس - پایه",
      price: "690,000",
      period: "ماهانه",
      cpu: "2",
      ram: "2GB",
      disk: "40GB SSD",
      bandwidth: "1TB",
      location: "آلمان",
      features: [
        "نصب انواع توزیع‌های لینوکس",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
      ],
      isPopular: false,
    },
    {
      id: "linux-vps-2",
      title: "سرور مجازی لینوکس - استاندارد",
      price: "990,000",
      period: "ماهانه",
      cpu: "4",
      ram: "4GB",
      disk: "80GB SSD",
      bandwidth: "2TB",
      location: "آلمان",
      features: [
        "نصب انواع توزیع‌های لینوکس",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: true,
    },
    {
      id: "linux-vps-3",
      title: "سرور مجازی لینوکس - حرفه‌ای",
      price: "1,590,000",
      period: "ماهانه",
      cpu: "6",
      ram: "8GB",
      disk: "160GB SSD",
      bandwidth: "4TB",
      location: "آلمان",
      features: [
        "نصب انواع توزیع‌های لینوکس",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
        "ترافیک نامحدود داخلی",
      ],
      isPopular: false,
    },
    {
      id: "linux-vps-4",
      title: "سرور مجازی لینوکس - سنگین",
      price: "2,490,000",
      period: "ماهانه",
      cpu: "8",
      ram: "16GB",
      disk: "320GB SSD",
      bandwidth: "8TB",
      location: "آلمان",
      features: [
        "نصب انواع توزیع‌های لینوکس",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
        "ترافیک نامحدود داخلی",
        "پشتیبانی اولویت‌دار",
      ],
      isPopular: false,
    },
    {
      id: "linux-vps-5",
      title: "سرور مجازی لینوکس - انتربرایز",
      price: "3,990,000",
      period: "ماهانه",
      cpu: "12",
      ram: "32GB",
      disk: "500GB SSD",
      bandwidth: "10TB",
      location: "آلمان",
      features: [
        "نصب انواع توزیع‌های لینوکس",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ روزانه",
        "تحویل آنی",
        "IP اختصاصی",
        "ترافیک نامحدود داخلی",
        "پشتیبانی اختصاصی",
        "پنل cPanel رایگان",
      ],
      isPopular: false,
    },
  ];

  const windowsVpsPlans = [
    {
      id: "windows-vps-1",
      title: "سرور مجازی ویندوز - پایه",
      price: "890,000",
      period: "ماهانه",
      cpu: "2",
      ram: "4GB",
      disk: "60GB SSD",
      bandwidth: "1TB",
      location: "آلمان",
      features: [
        "نصب انواع نسخه‌های ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
      ],
      isPopular: false,
    },
    {
      id: "windows-vps-2",
      title: "سرور مجازی ویندوز - استاندارد",
      price: "1,190,000",
      period: "ماهانه",
      cpu: "4",
      ram: "8GB",
      disk: "120GB SSD",
      bandwidth: "2TB",
      location: "آلمان",
      features: [
        "نصب انواع نسخه‌های ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: true,
    },
    {
      id: "windows-vps-3",
      title: "سرور مجازی ویندوز - حرفه‌ای",
      price: "1,890,000",
      period: "ماهانه",
      cpu: "6",
      ram: "16GB",
      disk: "240GB SSD",
      bandwidth: "4TB",
      location: "آلمان",
      features: [
        "نصب انواع نسخه‌های ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
        "ترافیک نامحدود داخلی",
      ],
      isPopular: false,
    },
    {
      id: "windows-vps-4",
      title: "سرور مجازی ویندوز - سنگین",
      price: "2,690,000",
      period: "ماهانه",
      cpu: "8",
      ram: "24GB",
      disk: "400GB SSD",
      bandwidth: "6TB",
      location: "آلمان",
      features: [
        "نصب انواع نسخه‌های ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
        "ترافیک نامحدود داخلی",
        "پشتیبانی اولویت‌دار",
      ],
      isPopular: false,
    },
    {
      id: "windows-vps-5",
      title: "سرور مجازی ویندوز - انتربرایز",
      price: "4,290,000",
      period: "ماهانه",
      cpu: "12",
      ram: "48GB",
      disk: "600GB SSD",
      bandwidth: "10TB",
      location: "آلمان",
      features: [
        "نصب انواع نسخه‌های ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ روزانه",
        "تحویل آنی",
        "IP اختصاصی",
        "ترافیک نامحدود داخلی",
        "پشتیبانی اختصاصی",
        "لایسنس SQL Server",
      ],
      isPopular: false,
    },
  ];

  const iranVpsPlans = [
    {
      id: "iran-vps-1",
      title: "سرور مجازی ایران - پایه",
      price: "890,000",
      period: "ماهانه",
      cpu: "2",
      ram: "2GB",
      disk: "40GB SSD",
      bandwidth: "500GB",
      location: "ایران - تهران",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
      ],
      isPopular: false,
    },
    {
      id: "iran-vps-2",
      title: "سرور مجازی ایران - استاندارد",
      price: "1,290,000",
      period: "ماهانه",
      cpu: "4",
      ram: "4GB",
      disk: "80GB SSD",
      bandwidth: "1TB",
      location: "ایران - تهران",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: true,
    },
    {
      id: "iran-vps-3",
      title: "سرور مجازی ایران - حرفه‌ای",
      price: "1,990,000",
      period: "ماهانه",
      cpu: "6",
      ram: "8GB",
      disk: "160GB SSD",
      bandwidth: "2TB",
      location: "ایران - تهران",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
        "پشتیبانی اختصاصی",
      ],
      isPopular: false,
    },
    {
      id: "iran-vps-4",
      title: "سرور مجازی ایران - سنگین",
      price: "2,890,000",
      period: "ماهانه",
      cpu: "8",
      ram: "16GB",
      disk: "320GB SSD",
      bandwidth: "3TB",
      location: "ایران - تهران",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ روزانه",
        "تحویل آنی",
        "IP اختصاصی",
        "پشتیبانی اختصاصی",
        "CDN رایگان",
      ],
      isPopular: false,
    },
  ];

  const locationVpsPlans = [
    {
      id: "us-vps-1",
      title: "سرور مجازی آمریکا - استاندارد",
      price: "1,190,000",
      period: "ماهانه",
      cpu: "4",
      ram: "4GB",
      disk: "80GB SSD",
      bandwidth: "2TB",
      location: "آمریکا - نیویورک",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: false,
    },
    {
      id: "uk-vps-1",
      title: "سرور مجازی انگلستان - استاندارد",
      price: "1,290,000",
      period: "ماهانه",
      cpu: "4",
      ram: "4GB",
      disk: "80GB SSD",
      bandwidth: "2TB",
      location: "انگلستان - لندن",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: false,
    },
    {
      id: "fr-vps-1",
      title: "سرور مجازی فرانسه - استاندارد",
      price: "1,090,000",
      period: "ماهانه",
      cpu: "4",
      ram: "4GB",
      disk: "80GB SSD",
      bandwidth: "2TB",
      location: "فرانسه - پاریس",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: true,
    },
    {
      id: "nl-vps-1",
      title: "سرور مجازی هلند - استاندارد",
      price: "1,190,000",
      period: "ماهانه",
      cpu: "4",
      ram: "4GB",
      disk: "80GB SSD",
      bandwidth: "2TB",
      location: "هلند - آمستردام",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: false,
    },
    {
      id: "sg-vps-1",
      title: "سرور مجازی سنگاپور - استاندارد",
      price: "1,390,000",
      period: "ماهانه",
      cpu: "4",
      ram: "4GB",
      disk: "80GB SSD",
      bandwidth: "1.5TB",
      location: "سنگاپور",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "بکاپ هفتگی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: false,
    },
  ];

  const dailyVpsPlans = [
    {
      id: "daily-vps-1",
      title: "سرور مجازی روزانه - اقتصادی",
      price: "35,000",
      period: "روزانه",
      cpu: "1",
      ram: "1GB",
      disk: "20GB SSD",
      bandwidth: "100GB",
      location: "آلمان",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "تحویل آنی",
      ],
      isPopular: false,
    },
    {
      id: "daily-vps-2",
      title: "سرور مجازی روزانه - استاندارد",
      price: "55,000",
      period: "روزانه",
      cpu: "2",
      ram: "2GB",
      disk: "40GB SSD",
      bandwidth: "200GB",
      location: "آلمان",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "تحویل آنی",
        "IP اختصاصی",
      ],
      isPopular: true,
    },
    {
      id: "daily-vps-3",
      title: "سرور مجازی روزانه - حرفه‌ای",
      price: "85,000",
      period: "روزانه",
      cpu: "4",
      ram: "4GB",
      disk: "80GB SSD",
      bandwidth: "300GB",
      location: "آلمان",
      features: [
        "نصب لینوکس یا ویندوز",
        "پشتیبانی 24/7",
        "پنل مدیریتی",
        "تحویل آنی",
        "IP اختصاصی",
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
          <div className="bg-blue-50 p-3 rounded-lg text-center flex flex-col items-center">
            <Cpu className="h-5 w-5 text-blue-600 mb-1" />
            <div className="text-sm text-gray-600">CPU</div>
            <div className="font-bold text-blue-800">{plan.cpu} هسته</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center flex flex-col items-center">
            <div className="h-5 w-5 text-green-600 mb-1 font-bold">RAM</div>
            <div className="text-sm text-gray-600">رم</div>
            <div className="font-bold text-green-800">{plan.ram}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center flex flex-col items-center">
            <HardDrive className="h-5 w-5 text-purple-600 mb-1" />
            <div className="text-sm text-gray-600">دیسک</div>
            <div className="font-bold text-purple-800">{plan.disk}</div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg text-center flex flex-col items-center">
            <Network className="h-5 w-5 text-amber-600 mb-1" />
            <div className="text-sm text-gray-600">ترافیک</div>
            <div className="font-bold text-amber-800">{plan.bandwidth}</div>
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
        <Button 
          className={`w-full ${plan.isPopular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : ''}`}
          onClick={() => {
            // Check if user is logged in (simple check)
            const isLoggedIn = localStorage.getItem('user'); 
            if (isLoggedIn) {
              // Redirect to user panel for checkout
              window.location.href = '/user-panel';
            } else {
              // Redirect to login page
              window.location.href = '/login';
            }
          }}
        >
          افزودن به سبد خرید
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen overflow-hidden">
      <Helmet>
        <title>سرور مجازی نوین وی دی اس | سرور مجازی لینوکس و ویندوز با قیمت مناسب</title>
        <meta name="description" content="خرید انواع سرور مجازی لینوکس، ویندوز، ایران و روزانه با قیمت مناسب و کیفیت بالا. تحویل آنی، پشتیبانی 24 ساعته و ضمانت آپتایم 99.9%" />
        <meta name="keywords" content="سرور مجازی، vps، سرور مجازی لینوکس، سرور مجازی ویندوز، سرور مجازی ایران، سرور مجازی روزانه" />
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">سرور مجازی نوین وی دی اس</h1>
            <p className="text-gray-600 md:text-lg">
              سرور مجازی قدرتمند با ضمانت آپتایم 99.9% و پشتیبانی 24 ساعته برای کسب‌وکار شما
            </p>
          </div>
          
          <Tabs defaultValue="linux-vps" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
              <TabsTrigger value="linux-vps">سرور مجازی لینوکس</TabsTrigger>
              <TabsTrigger value="windows-vps">سرور مجازی ویندوز</TabsTrigger>
              <TabsTrigger value="iran-vps">سرور مجازی ایران</TabsTrigger>
              <TabsTrigger value="location-vps">لوکیشن‌های مختلف</TabsTrigger>
              <TabsTrigger value="daily-vps">سرور مجازی روزانه</TabsTrigger>
            </TabsList>
            
            <TabsContent value="linux-vps" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {linuxVpsPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="windows-vps" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {windowsVpsPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="iran-vps" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {iranVpsPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="location-vps" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {locationVpsPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="daily-vps" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {dailyVpsPlans.map(renderPricingCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">ویژگی‌های سرور مجازی نوین وی دی اس</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">عملکرد بالا</h3>
                <p className="text-gray-700">سرورهای مجازی ما روی سخت‌افزار پیشرفته و دیسک‌های SSD اجرا می‌شوند که سرعت و کارایی فوق‌العاده‌ای را تضمین می‌کند.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">تحویل آنی</h3>
                <p className="text-gray-700">پس از تکمیل سفارش، سرور مجازی شما به صورت خودکار راه‌اندازی شده و در کمتر از 5 دقیقه آماده استفاده خواهد بود.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">پشتیبانی تخصصی</h3>
                <p className="text-gray-700">تیم پشتیبانی متخصص ما به صورت 24/7 آماده پاسخگویی و کمک به شما در مدیریت سرور مجازی‌تان است.</p>
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
                  <CardTitle className="text-lg">تفاوت سرور مجازی لینوکس و ویندوز چیست؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>سرور مجازی لینوکس با سیستم عامل‌های لینوکس مانند Ubuntu، CentOS یا Debian ارائه می‌شود و به دلیل نیاز به منابع کمتر، عملکرد بهتری دارد. سرور مجازی ویندوز با سیستم عامل ویندوز سرور ارائه می‌شود که برای اجرای نرم‌افزارهای ویندوزی مناسب است، اما معمولاً به منابع بیشتری نیاز دارد.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">آیا می‌توانم بعداً سرور مجازی خود را ارتقا دهم؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>بله، در هر زمان می‌توانید منابع سرور مجازی خود را افزایش دهید. می‌توانید CPU، RAM یا فضای دیسک را متناسب با نیازهای خود ارتقا دهید. برای این کار کافیست با پشتیبانی تماس بگیرید یا از پنل مدیریتی اقدام نمایید.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">سرور مجازی روزانه برای چه کاربردهایی مناسب است؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>سرور مجازی روزانه برای موارد موقتی مانند تست نرم‌افزار، اجرای پروژه‌های کوتاه‌مدت، آموزش و یا نیازهای محاسباتی موقت بسیار مناسب است. این نوع سرور مقرون به صرفه‌تر از اجاره ماهانه برای کارهای کوتاه‌مدت است.</p>
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

export default VpsPlans;

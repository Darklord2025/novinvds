
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Globe, Database, HardDrive, Shield, Network, Code, Headset, LayoutTemplate, Monitor, LucideIcon, Cloud, Download, ShoppingCart, Tag, CreditCard, Settings, Wifi } from "lucide-react";

// Define the interface for service categories
interface ServiceCategory {
  title: string;
  icon: LucideIcon;
  color: string;
  services: Array<{
    name: string;
    link: string;
    description?: string;
  }>;
}

interface ServiceOrder {
  id: number;
  title: string;
  date: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  icon: LucideIcon;
}

// Define the component props
interface ServiceOrderSectionProps {
  serviceCategories?: ServiceCategory[];
  navigateToServiceOrderPage?: (serviceLink: string) => void;
}

const ServiceOrderSection: React.FC<ServiceOrderSectionProps> = ({ serviceCategories, navigateToServiceOrderPage }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Define all service categories
  const allServiceCategories: ServiceCategory[] = [
    {
      title: 'میزبانی وب',
      icon: Globe,
      color: 'bg-blue-500',
      services: [
        { name: 'هاست دانلود', link: '/hosting?type=download', description: 'مناسب برای سایت‌های دانلود و اشتراک فایل' },
        { name: 'هاست لینوکس ECO', link: '/hosting?type=linux-eco', description: 'میزبانی مقرون به صرفه برای وب‌سایت‌های کوچک' },
        { name: 'هاست لینوکس PRO', link: '/hosting?type=linux-pro', description: 'میزبانی حرفه‌ای برای وب‌سایت‌های پر بازدید' },
        { name: 'هاست لینوکس PRO ایران', link: '/hosting?type=linux-pro-iran', description: 'میزبانی حرفه‌ای داخل ایران' },
        { name: 'هاست لینوکس VIP', link: '/hosting?type=linux-vip', description: 'میزبانی با منابع اختصاصی و پشتیبانی ویژه' },
        { name: 'هاست لینوکس ایران', link: '/hosting?type=linux-iran', description: 'میزبانی مطمئن داخل ایران' },
        { name: 'هاست وردپرس', link: '/hosting?type=wordpress', description: 'بهینه‌سازی شده برای سایت‌های وردپرسی' },
        { name: 'هاست ووکامرس', link: '/hosting?type=woocommerce', description: 'مناسب برای فروشگاه‌های آنلاین ووکامرس' },
        { name: 'هاست ویندوز', link: '/hosting?type=windows', description: 'پشتیبانی از ASP.NET و تکنولوژی‌های مایکروسافت' },
        { name: 'هاست ویندوز ایران', link: '/hosting?type=windows-iran', description: 'میزبانی ویندوز داخل ایران' },
        { name: 'هاست پایتون', link: '/hosting?type=python', description: 'پشتیبانی از اپلیکیشن‌های پایتون' }
      ]
    },
    {
      title: 'سرور مجازی',
      icon: Server,
      color: 'bg-green-500',
      services: [
        { name: 'سرور مجازی لینوکس', link: '/vps?type=linux', description: 'سرور مجازی با سیستم عامل لینوکس' },
        { name: 'سرور مجازی ویندوز', link: '/vps?type=windows', description: 'سرور مجازی با سیستم عامل ویندوز' },
        { name: 'سرور مجازی اوبونتو دسکتاپ', link: '/vps?type=ubuntu-desktop', description: 'سرور مجازی با رابط گرافیکی اوبونتو' },
        { name: 'سرور مجازی روزانه', link: '/vps?type=daily', description: 'سرور مجازی با پرداخت روزانه' },
        { name: 'سرور مجازی لینوکس ایران', link: '/vps?type=linux-iran', description: 'سرور مجازی لینوکس در دیتاسنتر ایران' },
        { name: 'سرور مجازی ویندوز ایران', link: '/vps?type=windows-iran', description: 'سرور مجازی ویندوز در دیتاسنتر ایران' }
      ]
    },
    {
      title: 'سرور اختصاصی',
      icon: HardDrive,
      color: 'bg-purple-500',
      services: [
        { name: 'سرور اختصاصی ایران', link: '/dedicated?location=iran', description: 'سرور فیزیکی اختصاصی در دیتاسنتر ایران' },
        { name: 'سرور اختصاصی اروپا', link: '/dedicated?location=europe', description: 'سرور فیزیکی اختصاصی در دیتاسنترهای اروپا' },
        { name: 'سرور اختصاصی آمریکا', link: '/dedicated?location=america', description: 'سرور فیزیکی اختصاصی در دیتاسنترهای آمریکا' },
        { name: 'سرور اختصاصی آسیا', link: '/dedicated?location=asia', description: 'سرور فیزیکی اختصاصی در دیتاسنترهای آسیا' }
      ]
    },
    {
      title: 'سرور ابری',
      icon: Cloud,
      color: 'bg-blue-400',
      services: [
        { name: 'سرور ابری لینوکس', link: '/cloud?type=linux', description: 'سرور ابری با انعطاف‌پذیری بالا و سیستم عامل لینوکس' },
        { name: 'سرور ابری ویندوز', link: '/cloud?type=windows', description: 'سرور ابری با انعطاف‌پذیری بالا و سیستم عامل ویندوز' },
        { name: 'سرور ابری اختصاصی', link: '/cloud?type=dedicated', description: 'سرور ابری با منابع اختصاصی' },
        { name: 'سرور ابری ایران', link: '/cloud?type=iran', description: 'سرور ابری در دیتاسنتر ایران' }
      ]
    },
    {
      title: 'خدمات دامنه',
      icon: Globe,
      color: 'bg-orange-500',
      services: [
        { name: 'ثبت دامنه', link: '/domain/register', description: 'ثبت انواع پسوندهای دامنه' },
        { name: 'انتقال دامنه', link: '/domain/transfer', description: 'انتقال دامنه از شرکت‌های دیگر' },
        { name: 'تمدید دامنه', link: '/domain/renew', description: 'تمدید دامنه‌های ثبت شده' },
        { name: 'مدیریت DNS', link: '/domain/dns', description: 'مدیریت رکوردهای DNS دامنه' }
      ]
    },
    {
      title: 'خدمات امنیتی',
      icon: Shield,
      color: 'bg-red-500',
      services: [
        { name: 'گواهی SSL', link: '/security/ssl', description: 'گواهی‌های امنیتی SSL/TLS برای وب‌سایت' },
        { name: 'آنتی ویروس', link: '/security/antivirus', description: 'نرم‌افزارهای آنتی ویروس و امنیتی' },
        { name: 'فایروال', link: '/security/firewall', description: 'فایروال‌های سخت‌افزاری و نرم‌افزاری' },
        { name: 'بکاپ گیری', link: '/security/backup', description: 'سرویس‌های پشتیبان‌گیری خودکار' }
      ]
    },
    {
      title: 'خدمات شبکه',
      icon: Network,
      color: 'bg-teal-500',
      services: [
        { name: 'ترافیک اضافه', link: '/network/traffic', description: 'خرید ترافیک اضافه برای سرورها' },
        { name: 'IP اختصاصی', link: '/network/ip', description: 'آدرس IP اختصاصی برای سرورها' },
        { name: 'VPN اختصاصی', link: '/network/vpn', description: 'سرویس VPN اختصاصی برای کسب و کارها' },
        { name: 'CDN', link: '/network/cdn', description: 'شبکه توزیع محتوا برای وب‌سایت‌ها' }
      ]
    },
    {
      title: 'پنل‌های مدیریت',
      icon: Settings,
      color: 'bg-indigo-500',
      services: [
        { name: 'cPanel', link: '/panels/cpanel', description: 'پنل مدیریت هاستینگ cPanel' },
        { name: 'DirectAdmin', link: '/panels/directadmin', description: 'پنل مدیریت هاستینگ DirectAdmin' },
        { name: 'Plesk', link: '/panels/plesk', description: 'پنل مدیریت هاستینگ Plesk' },
        { name: 'WHM', link: '/panels/whm', description: 'پنل مدیریت هاستینگ WHM' }
      ]
    },
    {
      title: 'خدمات طراحی',
      icon: LayoutTemplate,
      color: 'bg-pink-500',
      services: [
        { name: 'طراحی قالب سایت', link: '/design/template', description: 'طراحی اختصاصی قالب وب‌سایت' },
        { name: 'قالب‌های آماده', link: '/design/ready', description: 'فروش قالب‌های آماده وب‌سایت' },
        { name: 'طراحی لوگو', link: '/design/logo', description: 'طراحی لوگو برای کسب و کارها' },
        { name: 'طراحی UI/UX', link: '/design/ui-ux', description: 'طراحی رابط کاربری و تجربه کاربری' }
      ]
    },
    {
      title: 'پشتیبانی آنلاین',
      icon: Headset,
      color: 'bg-yellow-500',
      services: [
        { name: 'پشتیبانی فنی', link: '/support/technical', description: 'پشتیبانی فنی برای سرورها و هاستینگ' },
        { name: 'پشتیبانی شبکه', link: '/support/network', description: 'پشتیبانی برای مشکلات شبکه' },
        { name: 'پشتیبانی امنیتی', link: '/support/security', description: 'مشاوره و پشتیبانی امنیتی' },
        { name: 'پشتیبانی توسعه', link: '/support/development', description: 'پشتیبانی برای مسائل برنامه‌نویسی و توسعه' }
      ]
    }
  ];

  const serviceOrders: ServiceOrder[] = [
    { id: 1, title: 'سرور مجازی آمریکا', date: '2024-01-20', status: 'active', icon: Server },
    { id: 2, title: 'هاست لینوکس', date: '2023-12-15', status: 'completed', icon: Globe },
    { id: 3, title: 'دیتابیس', date: '2024-02-01', status: 'pending', icon: Database },
    { id: 4, title: 'فضای ذخیره سازی', date: '2024-01-25', status: 'cancelled', icon: HardDrive },
    { id: 5, title: 'لایسنس امنیتی', date: '2024-02-10', status: 'active', icon: Shield },
    { id: 6, title: 'سرویس شبکه', date: '2024-01-30', status: 'completed', icon: Network },
    { id: 7, title: 'لایسنس توسعه', date: '2024-02-15', status: 'pending', icon: Code },
    { id: 8, title: 'پشتیبانی فنی', date: '2024-02-20', status: 'active', icon: Headset },
    { id: 9, title: 'قالب سایت', date: '2024-02-25', status: 'completed', icon: LayoutTemplate },
    { id: 10, title: 'مانیتورینگ سرور', date: '2024-03-01', status: 'active', icon: Monitor },
  ];

  // Filter orders based on active tab
  const filteredOrders = (serviceType: string) => {
    if (serviceType === 'all') {
      return serviceOrders;
    }
    return serviceOrders.filter(order => {
      const categoryMatch = allServiceCategories.find(cat => cat.title.toLowerCase().includes(serviceType.toLowerCase()));
      if (categoryMatch) {
        return order.title.toLowerCase().includes(categoryMatch.title.toLowerCase());
      }
      return false;
    });
  };

  // Handle item click if navigateToServiceOrderPage is provided
  const handleItemClick = (link: string) => {
    if (navigateToServiceOrderPage) {
      navigateToServiceOrderPage(link);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle === selectedCategory ? null : categoryTitle);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">سفارش خدمات جدید</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {allServiceCategories.map((category, index) => (
          <Card 
            key={index} 
            className={`cursor-pointer hover:shadow-lg transition-shadow ${
              selectedCategory === category.title ? 'ring-2 ring-offset-2 ring-blue-500' : ''
            }`}
            onClick={() => handleCategorySelect(category.title)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center text-white mb-3 mt-3`}>
                <category.icon size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">{category.title}</h3>
              <p className="text-sm text-gray-500">{category.services.length} سرویس</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCategory && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">سرویس‌های {selectedCategory}</h3>
            <Button variant="outline" onClick={() => setSelectedCategory(null)}>بستن</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allServiceCategories
              .find(cat => cat.title === selectedCategory)
              ?.services.map((service, serviceIndex) => (
                <Card key={serviceIndex} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-bold mb-2">{service.name}</h4>
                    {service.description && <p className="text-sm text-gray-600 mb-3">{service.description}</p>}
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => handleItemClick(service.link)}
                    >
                      سفارش
                    </Button>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 mt-10">سفارشات فعلی</h2>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="hosting">هاستینگ</TabsTrigger>
          <TabsTrigger value="vps">سرور مجازی</TabsTrigger>
          <TabsTrigger value="dedicated">سرور اختصاصی</TabsTrigger>
          <TabsTrigger value="cloud">سرور ابری</TabsTrigger>
          <TabsTrigger value="domain">دامنه</TabsTrigger>
          <TabsTrigger value="other">سایر خدمات</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders(activeTab).map(order => (
              <Card key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <order.icon className="text-blue-500 ml-2" size={20} />
                      <h3 className="text-lg font-semibold">{order.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      order.status === 'active' ? 'bg-green-100 text-green-600' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          order.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                    }`}>{
                        order.status === 'active' ? 'فعال' :
                          order.status === 'pending' ? 'در انتظار' :
                            order.status === 'completed' ? 'تکمیل شده' :
                              'لغو شده'
                      }</span>
                  </div>
                  <p className="text-gray-600 text-sm">تاریخ سفارش: {order.date}</p>
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <Link to={`/order/${order.id}`}>مشاهده جزئیات</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ServiceOrderSection;

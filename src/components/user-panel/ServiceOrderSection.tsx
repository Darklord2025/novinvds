
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Server, 
  HardDrive, 
  Database, 
  Globe, 
  Cloud, 
  Shield, 
  Network, 
  Download, 
  Code, 
  Layout, 
  LifeBuoy
} from 'lucide-react';

interface ServiceCategoryProps {
  title: string;
  icon: React.ElementType;
  bgColor: string;
  services: Array<{
    name: string;
    link: string;
  }>;
  navigateToServiceOrderPage: (link: string) => void;
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ 
  title, 
  icon: Icon, 
  bgColor, 
  services, 
  navigateToServiceOrderPage 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="relative">
      <div 
        className={`${bgColor} rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="p-3 bg-white rounded-lg bg-opacity-20 mr-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">{title}</h3>
            <p className="text-sm text-white text-opacity-80">{services.length} خدمت</p>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="absolute z-30 right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in">
          {services.map((service, idx) => (
            <button
              key={idx}
              className="w-full text-right px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between"
              onClick={(e) => {
                e.stopPropagation();
                navigateToServiceOrderPage(service.link);
              }}
            >
              {service.name}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface ServiceOrderSectionProps {
  navigateToServiceOrderPage: (link: string) => void;
}

const ServiceOrderSection: React.FC<ServiceOrderSectionProps> = ({ navigateToServiceOrderPage }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  const serviceCategories = [
    {
      id: "hosting",
      title: "میزبانی وب",
      icon: Database,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      services: [
        { name: 'هاست لینوکس ECO', link: '/hosting?type=linux-eco' },
        { name: 'هاست لینوکس PRO', link: '/hosting?type=linux-pro' },
        { name: 'هاست لینوکس PRO ایران', link: '/hosting?type=linux-pro-iran' },
        { name: 'هاست لینوکس VIP', link: '/hosting?type=linux-vip' },
        { name: 'هاست لینوکس ایران', link: '/hosting?type=linux-iran' },
        { name: 'هاست وردپرس', link: '/hosting?type=wordpress' },
        { name: 'هاست ووکامرس', link: '/hosting?type=woocommerce' },
        { name: 'هاست ویندوز', link: '/hosting?type=windows' },
        { name: 'هاست ویندوز ایران', link: '/hosting?type=windows-iran' },
        { name: 'هاست پایتون', link: '/hosting?type=python' },
        { name: 'هاست دانلود', link: '/hosting?type=download' },
      ]
    },
    {
      id: "vps",
      title: "سرور مجازی",
      icon: Server,
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      services: [
        { name: 'سرور مجازی لینوکس', link: '/vps?type=linux' },
        { name: 'سرور مجازی ویندوز', link: '/vps?type=windows' },
        { name: 'سرور مجازی اوبونتو دسکتاپ', link: '/vps?type=ubuntu-desktop' },
        { name: 'سرور مجازی لینوکس ایران', link: '/vps?type=linux-iran' },
        { name: 'سرور مجازی ویندوز ایران', link: '/vps?type=windows-iran' },
        { name: 'سرور مجازی روزانه', link: '/vps?type=daily' },
      ]
    },
    {
      id: "dedicated",
      title: "سرور اختصاصی",
      icon: HardDrive,
      bgColor: "bg-gradient-to-r from-red-500 to-red-600",
      services: [
        { name: 'سرور اختصاصی ایران', link: '/dedicated?location=iran' },
        { name: 'سرور اختصاصی اروپا', link: '/dedicated?location=europe' },
        { name: 'سرور اختصاصی آمریکا', link: '/dedicated?location=america' },
        { name: 'سرور اختصاصی آسیا', link: '/dedicated?location=asia' },
      ]
    },
    {
      id: "domain",
      title: "خدمات دامنه",
      icon: Globe,
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      services: [
        { name: 'ثبت دامنه', link: '/domain/register' },
        { name: 'انتقال دامنه', link: '/domain/transfer' },
        { name: 'تمدید دامنه', link: '/domain/renew' },
      ]
    },
    {
      id: "cloud",
      title: "سرور ابری",
      icon: Cloud,
      bgColor: "bg-gradient-to-r from-sky-500 to-sky-600",
      services: [
        { name: 'سرور ابری لینوکس', link: '/cloud?type=linux' },
        { name: 'سرور ابری ویندوز', link: '/cloud?type=windows' },
        { name: 'سرور ابری اختصاصی', link: '/cloud?type=dedicated' },
      ]
    },
    {
      id: "security",
      title: "خدمات امنیتی",
      icon: Shield,
      bgColor: "bg-gradient-to-r from-yellow-500 to-amber-500",
      services: [
        { name: 'گواهی SSL', link: '/ssl' },
        { name: 'آنتی ویروس', link: '/security/antivirus' },
        { name: 'فایروال', link: '/security/firewall' },
        { name: 'بکاپ گیری', link: '/security/backup' },
      ]
    },
    {
      id: "network",
      title: "خدمات شبکه",
      icon: Network,
      bgColor: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      services: [
        { name: 'ترافیک اضافه', link: '/network/traffic' },
        { name: 'IP اضافه', link: '/network/ip' },
        { name: 'CDN', link: '/network/cdn' },
        { name: 'پشتیبانی آنلاین', link: '/support/online' },
      ]
    },
    {
      id: "tools",
      title: "پنل‌های مدیریت",
      icon: Download,
      bgColor: "bg-gradient-to-r from-gray-600 to-gray-700",
      services: [
        { name: 'پنل مدیریت cPanel', link: '/services/cpanel' },
        { name: 'پنل مدیریت DirectAdmin', link: '/services/directadmin' },
        { name: 'افزودن هارد اضافه', link: '/services/additional-storage' },
      ]
    },
    {
      id: "design",
      title: "خدمات طراحی",
      icon: Layout,
      bgColor: "bg-gradient-to-r from-pink-500 to-pink-600",
      services: [
        { name: 'طراحی قالب سایت', link: '/services/web-design' },
        { name: 'فروش قالب آماده', link: '/services/templates' },
        { name: 'خدمات سئو', link: '/services/seo' },
      ]
    },
    {
      id: "support",
      title: "پشتیبانی",
      icon: LifeBuoy,
      bgColor: "bg-gradient-to-r from-teal-500 to-teal-600",
      services: [
        { name: 'پشتیبانی آنلاین', link: '/support/online' },
        { name: 'مدیریت سرور', link: '/services/server-management' },
        { name: 'راهنمای استفاده', link: '/support/guide' },
      ]
    },
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>سفارش سرویس جدید</CardTitle>
        <CardDescription>
          سرویس مورد نیاز خود را انتخاب کنید
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="all">همه</TabsTrigger>
            <TabsTrigger value="hosting">میزبانی وب</TabsTrigger>
            <TabsTrigger value="vps">سرور مجازی</TabsTrigger>
            <TabsTrigger value="dedicated">سرور اختصاصی</TabsTrigger>
            <TabsTrigger value="domain">دامنه</TabsTrigger>
            <TabsTrigger value="security">امنیتی</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {serviceCategories.map((category) => (
                <ServiceCategory
                  key={category.id}
                  title={category.title}
                  icon={category.icon}
                  bgColor={category.bgColor}
                  services={category.services}
                  navigateToServiceOrderPage={navigateToServiceOrderPage}
                />
              ))}
            </div>
          </TabsContent>
          
          {serviceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.services.map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                    <h3 className="font-medium mb-2">{service.name}</h3>
                    <Button
                      onClick={() => navigateToServiceOrderPage(service.link)}
                      className="w-full"
                    >
                      سفارش
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm mb-4">نیاز به راهنمایی بیشتر دارید؟</p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigateToServiceOrderPage('/support/online')}
            >
              <LifeBuoy className="ml-2 h-4 w-4" />
              چت آنلاین با پشتیبانی
            </Button>
            <Button
              variant="outline"
              onClick={() => navigateToServiceOrderPage('/tickets/new')}
            >
              پرسش سوال
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceOrderSection;

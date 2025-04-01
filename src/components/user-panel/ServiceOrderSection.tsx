
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, HardDrive, Database, Globe, Shield, Network, Laptop, Headphones } from 'lucide-react';

interface ServiceCategory {
  title: string;
  services: Array<{
    name: string;
    link: string;
  }>;
}

interface ServiceOrderSectionProps {
  serviceCategories: ServiceCategory[];
  navigateToServiceOrderPage: (serviceLink: string) => void;
}

const ServiceOrderSection: React.FC<ServiceOrderSectionProps> = ({ 
  serviceCategories, 
  navigateToServiceOrderPage 
}) => {
  const [activeCategory, setActiveCategory] = useState('web-hosting');
  
  // Define new service categories with updated information
  const updatedServiceCategories = [
    {
      id: 'web-hosting',
      title: 'میزبانی وب',
      icon: <Database className="h-6 w-6" />,
      color: 'bg-blue-500',
      services: [
        { name: 'هاست لینوکس', link: '/hosting?type=linux' },
        { name: 'هاست ویندوز', link: '/hosting?type=windows' },
        { name: 'سرور مجازی', link: '/vps' },
        { name: 'سرور اختصاصی', link: '/dedicated' },
        { name: 'سرور ابری', link: '/cloud' },
      ]
    },
    {
      id: 'domain',
      title: 'خدمات دامنه',
      icon: <Globe className="h-6 w-6" />,
      color: 'bg-green-500',
      services: [
        { name: 'ثبت دامنه', link: '/domain' },
        { name: 'انتقال دامنه', link: '/domain/transfer' },
        { name: 'تمدید دامنه', link: '/domain/renew' },
      ]
    },
    {
      id: 'security',
      title: 'خدمات امنیتی',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-red-500',
      services: [
        { name: 'گواهی SSL', link: '/ssl' },
        { name: 'آنتی ویروس', link: '/security/antivirus' },
        { name: 'فایروال', link: '/security/firewall' },
        { name: 'بکاپ گیری', link: '/security/backup' },
      ]
    },
    {
      id: 'network',
      title: 'خدمات شبکه',
      icon: <Network className="h-6 w-6" />,
      color: 'bg-purple-500',
      services: [
        { name: 'نصب نرم افزار مدیریت شبکه', link: '/network/software' },
        { name: 'خدمات VoIP', link: '/network/voip' },
        { name: 'پیکربندی شبکه', link: '/network/config' },
        { name: 'مانیتورینگ شبکه', link: '/network/monitoring' },
      ]
    },
    {
      id: 'other',
      title: 'سایر خدمات',
      icon: <Laptop className="h-6 w-6" />,
      color: 'bg-amber-500',
      services: [
        { name: 'طراحی قالب سایت', link: '/webdesign/template' },
        { name: 'فروش قالب‌های آماده', link: '/webdesign/templates' },
        { name: 'طراحی لوگو', link: '/design/logo' },
        { name: 'خدمات سئو', link: '/seo' },
      ]
    },
    {
      id: 'support',
      title: 'پشتیبانی تخصصی',
      icon: <Headphones className="h-6 w-6" />,
      color: 'bg-teal-500',
      services: [
        { name: 'پشتیبانی شبکه', link: '/support/network' },
        { name: 'پشتیبانی سرور', link: '/support/server' },
        { name: 'مشاوره تخصصی IT', link: '/support/consulting' },
        { name: 'آموزش مدیریت سرور', link: '/support/training' },
      ]
    }
  ];
  
  const getServiceIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'web-hosting': return <Database className="h-6 w-6" />;
      case 'domain': return <Globe className="h-6 w-6" />;
      case 'security': return <Shield className="h-6 w-6" />;
      case 'network': return <Network className="h-6 w-6" />;
      case 'other': return <Laptop className="h-6 w-6" />;
      case 'support': return <Headphones className="h-6 w-6" />;
      default: return <Database className="h-6 w-6" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>سفارش سرویس جدید</CardTitle>
        <CardDescription>
          از میان خدمات زیر، سرویس مورد نظر خود را انتخاب کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {updatedServiceCategories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                activeCategory === category.id 
                  ? `${category.color} text-white` 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              <span className="mt-1 text-sm font-medium">{category.title}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {updatedServiceCategories.map((category) => (
            activeCategory === category.id && (
              <div key={`content-${category.id}`} className="space-y-4 animate-in fade-in-50 duration-300">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {category.services.map((service, serviceIndex) => (
                    <Button 
                      key={serviceIndex} 
                      variant="outline" 
                      className="justify-start text-sm h-auto py-2 border-2 hover:border-blue-500 hover:bg-blue-50"
                      onClick={() => navigateToServiceOrderPage(service.link)}
                    >
                      {service.name}
                    </Button>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
        
        <div className="mt-6">
          <Button 
            className="w-full" 
            onClick={() => navigateToServiceOrderPage('/services')}
          >
            مشاهده همه خدمات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceOrderSection;


import React, { useState } from 'react';
import ServerList from './ServerList';
import DashboardCards from './DashboardCards';
import ActivityFeed from './ActivityFeed';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Server, HardDrive, Cloud, Database, Globe, ShieldCheck, Code, PenTool, Network, Package, Cpu, CircuitBoard, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ServiceCategory {
  title: string;
  services: Array<{ name: string; link: string }>;
}

interface OperatingSystem {
  id: string;
  name: string;
}

interface OperatingSystems {
  linux: OperatingSystem[];
  windows: OperatingSystem[];
  specialized: OperatingSystem[];
}

interface DashboardProps {
  serviceCategories?: ServiceCategory[];
  navigateToServiceOrderPage?: (link: string) => void;
  operatingSystems?: OperatingSystems;
}

const Dashboard = ({ 
  serviceCategories = [], 
  navigateToServiceOrderPage = () => {}, 
  operatingSystems = { linux: [], windows: [], specialized: [] }
}: DashboardProps) => {
  // مشخصات تماس و ایمیل‌های پشتیبانی
  const contactInfo = {
    phone: "09335732119",
    email: "info@novinvds.ir",
    supportEmails: {
      sales: "sales@novinvds.ir",
      vps: "vps@novinvds.ir",
      dedicated: "dedicated@novinvds.ir",
      hosting: "hosting@novinvds.ir",
      domain: "domain@novinvds.ir",
      network: "network@novinvds.ir",
      support: "support@novinvds.ir"
    }
  };
  
  // سرویس‌های فوری که در داشبورد نمایش داده می‌شوند
  const quickServices = [
    { 
      id: 'vps',
      title: 'سرور مجازی', 
      icon: <Server className="h-8 w-8 mb-2" />,
      color: 'bg-blue-600',
      links: [
        { name: 'سرور مجازی لینوکس', link: '/vps?os=linux' },
        { name: 'سرور مجازی ویندوز', link: '/vps?os=windows' },
        { name: 'سرور مجازی تخصصی', link: '/vps?os=specialized' },
        { name: 'دیدن همه پلن‌ها', link: '/vps' }
      ]
    },
    { 
      id: 'dedicated',
      title: 'سرور اختصاصی', 
      icon: <HardDrive className="h-8 w-8 mb-2" />,
      color: 'bg-purple-600',
      links: [
        { name: 'سرور اختصاصی لینوکس', link: '/dedicated?os=linux' },
        { name: 'سرور اختصاصی ویندوز', link: '/dedicated?os=windows' },
        { name: 'سرور اختصاصی تخصصی', link: '/dedicated?os=specialized' },
        { name: 'دیدن همه پلن‌ها', link: '/dedicated' }
      ]
    },
    { 
      id: 'cloud',
      title: 'سرور ابری', 
      icon: <Cloud className="h-8 w-8 mb-2" />,
      color: 'bg-green-600',
      links: [
        { name: 'سرور ابری لینوکس', link: '/cloud?os=linux' },
        { name: 'سرور ابری ویندوز', link: '/cloud?os=windows' },
        { name: 'سرور ابری تخصصی', link: '/cloud?os=specialized' },
        { name: 'دیدن همه پلن‌ها', link: '/cloud' }
      ]
    },
    { 
      id: 'hosting',
      title: 'هاستینگ', 
      icon: <Database className="h-8 w-8 mb-2" />,
      color: 'bg-amber-600',
      links: [
        { name: 'هاست لینوکس', link: '/hosting?type=linux' },
        { name: 'هاست ویندوز', link: '/hosting?type=windows' },
        { name: 'هاست وردپرس', link: '/hosting?type=wordpress' },
        { name: 'دیدن همه پلن‌ها', link: '/hosting' }
      ]
    },
    { 
      id: 'domain',
      title: 'دامنه', 
      icon: <Globe className="h-8 w-8 mb-2" />,
      color: 'bg-cyan-600',
      links: [
        { name: 'ثبت دامنه جدید', link: '/domain' },
        { name: 'انتقال دامنه', link: '/domain/transfer' },
        { name: 'تمدید دامنه', link: '/domain/renew' },
        { name: 'مدیریت دامنه‌ها', link: '/domain/manage' }
      ]
    },
    { 
      id: 'ssl',
      title: 'گواهی SSL', 
      icon: <ShieldCheck className="h-8 w-8 mb-2" />,
      color: 'bg-rose-600',
      links: [
        { name: 'SSL ساده (DV)', link: '/ssl?type=dv' },
        { name: 'SSL سازمانی (OV)', link: '/ssl?type=ov' },
        { name: 'SSL تجاری (EV)', link: '/ssl?type=ev' },
        { name: 'دیدن همه گواهی‌ها', link: '/ssl' }
      ]
    },
    { 
      id: 'network',
      title: 'خدمات شبکه', 
      icon: <Network className="h-8 w-8 mb-2" />,
      color: 'bg-indigo-600',
      links: [
        { name: 'IP اختصاصی', link: '/network/ip' },
        { name: 'VPN سازمانی', link: '/network/vpn' },
        { name: 'CDN', link: '/network/cdn' },
        { name: 'خدمات شبکه بیشتر', link: '/network' }
      ]
    },
    { 
      id: 'web',
      title: 'طراحی سایت', 
      icon: <Code className="h-8 w-8 mb-2" />,
      color: 'bg-orange-600',
      links: [
        { name: 'طراحی سایت شرکتی', link: '/webdesign?type=corporate' },
        { name: 'طراحی فروشگاه آنلاین', link: '/webdesign?type=ecommerce' },
        { name: 'سایت شخصی و وبلاگ', link: '/webdesign?type=personal' },
        { name: 'مشاوره طراحی سایت', link: '/webdesign' }
      ]
    },
    { 
      id: 'licenses',
      title: 'لایسنس‌ها', 
      icon: <Package className="h-8 w-8 mb-2" />,
      color: 'bg-teal-600',
      links: [
        { name: 'لایسنس ویندوز', link: '/license?type=windows' },
        { name: 'لایسنس آنتی‌ویروس', link: '/license?type=antivirus' },
        { name: 'لایسنس cPanel', link: '/license?type=cpanel' },
        { name: 'همه لایسنس‌ها', link: '/license' }
      ]
    },
    { 
      id: 'hardware',
      title: 'سخت‌افزار', 
      icon: <Cpu className="h-8 w-8 mb-2" />,
      color: 'bg-pink-600',
      links: [
        { name: 'سرور HP', link: '/hardware?brand=hp' },
        { name: 'سرور Dell', link: '/hardware?brand=dell' },
        { name: 'تجهیزات شبکه', link: '/hardware?type=network' },
        { name: 'همه سخت‌افزارها', link: '/hardware' }
      ]
    },
    { 
      id: 'special',
      title: 'سرویس‌های ویژه', 
      icon: <CircuitBoard className="h-8 w-8 mb-2" />,
      color: 'bg-gray-600',
      links: [
        { name: 'سرور مقاوم DDoS', link: '/special?type=ddos' },
        { name: 'سرور های پرسرعت NVMe', link: '/special?type=nvme' },
        { name: 'راهکارهای ابری', link: '/special?type=cloud' },
        { name: 'همه سرویس‌های ویژه', link: '/special' }
      ]
    },
    { 
      id: 'other',
      title: 'سایر خدمات', 
      icon: <PenTool className="h-8 w-8 mb-2" />,
      color: 'bg-blue-800',
      links: [
        { name: 'خدمات SEO', link: '/seo' },
        { name: 'پشتیبانی فنی VIP', link: '/support?type=vip' },
        { name: 'مشاوره‌ی IT', link: '/consulting' },
        { name: 'همه خدمات', link: '/services' }
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">داشبورد</h1>
        <Button variant="outline">بروزرسانی</Button>
      </div>

      <DashboardCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="active">سرویس‌های فعال</TabsTrigger>
              <TabsTrigger value="pending">در انتظار راه‌اندازی</TabsTrigger>
              <TabsTrigger value="expired">منقضی شده</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <ServerList />
            </TabsContent>
            <TabsContent value="pending">
              <ServerList />
            </TabsContent>
            <TabsContent value="expired">
              <ServerList />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <ActivityFeed />
        </div>
      </div>
      
      {/* بخش سفارش سرویس جدید */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>سفارش سرویس جدید</CardTitle>
          <CardDescription>
            از میان خدمات متنوع نوین وی‌دی‌اس، سرویس مورد نظر خود را انتخاب کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quickServices.map((service) => (
              <Popover key={service.id}>
                <PopoverTrigger asChild>
                  <Button className={`${service.color} h-auto py-6 flex flex-col items-center justify-center w-full`}>
                    {service.icon}
                    <span className="flex items-center gap-1">
                      {service.title}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    {service.links.map((link, index) => (
                      <Button 
                        key={index} 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => navigateToServiceOrderPage(link.link)}
                      >
                        {link.name}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
          
          {serviceCategories.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceCategories.map((category, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>
                        <a 
                          href={service.link}
                          className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToServiceOrderPage(service.link);
                          }}
                        >
                          <span>{service.name}</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          {/* بخش اطلاعات تماس */}
          <div className="mt-8 border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">تماس با پشتیبانی</h3>
                <p className="text-gray-600 mb-4">برای ارتباط با کارشناسان ما، از طریق یکی از روش‌های زیر اقدام کنید:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-gray-700 ml-2">تلفن:</span>
                    <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">{contactInfo.phone}</a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 ml-2">ایمیل عمومی:</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">{contactInfo.email}</a>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">ایمیل‌های تخصصی</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-gray-600">فروش:</div>
                    <a href={`mailto:${contactInfo.supportEmails.sales}`} className="text-blue-600 hover:underline">{contactInfo.supportEmails.sales}</a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">سرور مجازی:</div>
                    <a href={`mailto:${contactInfo.supportEmails.vps}`} className="text-blue-600 hover:underline">{contactInfo.supportEmails.vps}</a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">سرور اختصاصی:</div>
                    <a href={`mailto:${contactInfo.supportEmails.dedicated}`} className="text-blue-600 hover:underline">{contactInfo.supportEmails.dedicated}</a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">هاستینگ:</div>
                    <a href={`mailto:${contactInfo.supportEmails.hosting}`} className="text-blue-600 hover:underline">{contactInfo.supportEmails.hosting}</a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">دامنه:</div>
                    <a href={`mailto:${contactInfo.supportEmails.domain}`} className="text-blue-600 hover:underline">{contactInfo.supportEmails.domain}</a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">خدمات شبکه:</div>
                    <a href={`mailto:${contactInfo.supportEmails.network}`} className="text-blue-600 hover:underline">{contactInfo.supportEmails.network}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

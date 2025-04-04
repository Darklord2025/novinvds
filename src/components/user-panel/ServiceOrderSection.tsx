
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Server, Globe, Database, Cloud, Code, Shield, Network, HardDrive } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  services: {
    id: string;
    name: string;
    link: string;
  }[];
}

interface ServiceOrderSectionProps {
  navigateToServiceOrderPage: (serviceLink: string) => void;
}

const ServiceOrderSection: React.FC<ServiceOrderSectionProps> = ({ navigateToServiceOrderPage }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const serviceCategories: ServiceCategory[] = [
    {
      id: "hosting",
      title: "میزبانی وب",
      description: "انواع سرویس‌های میزبانی وب برای نیازهای مختلف",
      icon: <Database className="h-6 w-6" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      services: [
        { id: "linux-eco", name: "هاست لینوکس ECO", link: "/hosting/linux-eco" },
        { id: "linux-pro", name: "هاست لینوکس PRO", link: "/hosting/linux-pro" },
        { id: "linux-pro-iran", name: "هاست لینوکس PRO ایران", link: "/hosting/linux-pro-iran" },
        { id: "linux-vip", name: "هاست لینوکس VIP", link: "/hosting/linux-vip" },
        { id: "linux-iran", name: "هاست لینوکس ایران", link: "/hosting/linux-iran" },
        { id: "wordpress", name: "هاست وردپرس", link: "/hosting/wordpress" },
        { id: "woocommerce", name: "هاست ووکامرس", link: "/hosting/woocommerce" },
        { id: "windows", name: "هاست ویندوز", link: "/hosting/windows" },
        { id: "windows-iran", name: "هاست ویندوز ایران", link: "/hosting/windows-iran" },
        { id: "python", name: "هاست پایتون", link: "/hosting/python" },
        { id: "download", name: "هاست دانلود", link: "/hosting/download" },
      ]
    },
    {
      id: "vps",
      title: "سرور مجازی",
      description: "انواع سرورهای مجازی با سیستم‌عامل‌های مختلف",
      icon: <Server className="h-6 w-6" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      services: [
        { id: "vps-windows", name: "سرور مجازی ویندوز", link: "/vps/windows" },
        { id: "vps-linux", name: "سرور مجازی لینوکس", link: "/vps/linux" },
        { id: "vps-ubuntu-desktop", name: "سرور مجازی اوبونتو دسکتاپ", link: "/vps/ubuntu-desktop" },
        { id: "vps-daily", name: "سرور مجازی روزانه", link: "/vps/daily" },
        { id: "vps-linux-iran", name: "سرور مجازی لینوکس ایران", link: "/vps/linux-iran" },
        { id: "vps-windows-iran", name: "سرور مجازی ویندوز ایران", link: "/vps/windows-iran" },
      ]
    },
    {
      id: "dedicated",
      title: "سرور اختصاصی",
      description: "سرورهای اختصاصی با قدرت و کارایی بالا",
      icon: <HardDrive className="h-6 w-6" />,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      services: [
        { id: "dedicated-iran", name: "سرور اختصاصی ایران", link: "/dedicated/iran" },
        { id: "dedicated-europe", name: "سرور اختصاصی اروپا", link: "/dedicated/europe" },
        { id: "dedicated-usa", name: "سرور اختصاصی آمریکا", link: "/dedicated/usa" },
        { id: "dedicated-asia", name: "سرور اختصاصی آسیا", link: "/dedicated/asia" },
      ]
    },
    {
      id: "cloud",
      title: "سرور ابری",
      description: "سرورهای ابری با انعطاف‌پذیری و مقیاس‌پذیری بالا",
      icon: <Cloud className="h-6 w-6" />,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      services: [
        { id: "cloud-linux", name: "سرور ابری لینوکس", link: "/cloud/linux" },
        { id: "cloud-windows", name: "سرور ابری ویندوز", link: "/cloud/windows" },
        { id: "cloud-kubernetes", name: "سرور ابری کوبرنتیز", link: "/cloud/kubernetes" },
        { id: "cloud-container", name: "سرور ابری کانتینر", link: "/cloud/container" },
      ]
    },
    {
      id: "domain",
      title: "دامنه",
      description: "ثبت، تمدید و انتقال انواع دامنه‌ها",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      services: [
        { id: "domain-ir", name: "دامنه .ir", link: "/domain/ir" },
        { id: "domain-com", name: "دامنه .com", link: "/domain/com" },
        { id: "domain-net", name: "دامنه .net", link: "/domain/net" },
        { id: "domain-org", name: "دامنه .org", link: "/domain/org" },
        { id: "domain-co", name: "دامنه .co", link: "/domain/co" },
        { id: "domain-io", name: "دامنه .io", link: "/domain/io" },
      ]
    },
    {
      id: "security",
      title: "امنیتی",
      description: "خدمات و محصولات امنیتی",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      services: [
        { id: "ssl", name: "گواهی SSL", link: "/security/ssl" },
        { id: "ddos", name: "محافظت DDoS", link: "/security/ddos" },
        { id: "waf", name: "فایروال اپلیکیشن وب", link: "/security/waf" },
        { id: "backup", name: "پشتیبان‌گیری خودکار", link: "/security/backup" },
      ]
    },
    {
      id: "network",
      title: "خدمات شبکه",
      description: "راه‌حل‌های شبکه و ترافیک",
      icon: <Network className="h-6 w-6" />,
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      services: [
        { id: "traffic", name: "ترافیک اضافه", link: "/network/traffic" },
        { id: "cdn", name: "شبکه تحویل محتوا (CDN)", link: "/network/cdn" },
        { id: "ip", name: "IP استاتیک", link: "/network/ip" },
        { id: "vpn", name: "خدمات VPN", link: "/network/vpn" },
      ]
    },
    {
      id: "other",
      title: "سایر خدمات",
      description: "سایر خدمات و محصولات",
      icon: <Code className="h-6 w-6" />,
      color: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-600",
      services: [
        { id: "cpanel", name: "لایسنس Cpanel", link: "/licenses/cpanel" },
        { id: "directadmin", name: "لایسنس DirectAdmin", link: "/licenses/directadmin" },
        { id: "templates", name: "قالب‌های آماده", link: "/design/templates" },
        { id: "custom-design", name: "طراحی اختصاصی", link: "/design/custom" },
        { id: "support", name: "پشتیبانی تخصصی", link: "/services/support" },
      ]
    },
  ];

  const handleServiceClick = (link: string) => {
    navigateToServiceOrderPage(link);
  };

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <section className="my-8">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">سفارش سرویس جدید</CardTitle>
          <CardDescription>
            از میان خدمات متنوع نوین وی‌دی‌اس، سرویس مورد نظر خود را انتخاب کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceCategories.map((category) => (
              <div key={category.id} className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      className={`flex justify-between items-center w-full px-4 py-6 ${category.color} text-white hover:opacity-90 transition-all shadow-md hover:shadow-lg`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center">
                        {category.icon}
                        <span className="mr-2 text-lg font-medium">{category.title}</span>
                      </div>
                      <ChevronDown className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full min-w-[240px] p-0" align="start">
                    <div className="p-2 border-b bg-muted/50">
                      <h4 className="font-semibold">{category.title}</h4>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                    <div className="py-2">
                      {category.services.map((service) => (
                        <Button
                          key={service.id}
                          variant="ghost"
                          className="w-full justify-start font-normal"
                          onClick={() => handleServiceClick(service.link)}
                        >
                          {service.name}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ServiceOrderSection;

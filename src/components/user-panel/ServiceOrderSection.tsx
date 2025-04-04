
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Server, Globe, Database, Cloud, Code, Shield, Network, HardDrive, 
  Cpu, Download, Laptop, Monitor, PanelLeft, Settings, Users, CreditCard,
  ChevronDown, ChevronRight, Wifi, FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  name: string;
  link: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  services: ServiceItem[];
}

interface ServiceOrderSectionProps {
  navigateToServiceOrderPage: (serviceLink: string) => void;
}

const ServiceOrderSection: React.FC<ServiceOrderSectionProps> = ({ navigateToServiceOrderPage }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const serviceCategories: ServiceCategory[] = [
    {
      id: "hosting",
      title: "میزبانی وب",
      description: "انواع سرویس‌های میزبانی وب برای نیازهای مختلف",
      icon: <Database className="h-6 w-6" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      hoverColor: "from-purple-600 to-purple-800",
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
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      hoverColor: "from-blue-600 to-blue-800",
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
      color: "bg-gradient-to-br from-red-500 to-red-700",
      hoverColor: "from-red-600 to-red-800",
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
      color: "bg-gradient-to-br from-emerald-500 to-emerald-700",
      hoverColor: "from-emerald-600 to-emerald-800",
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
      color: "bg-gradient-to-br from-amber-500 to-amber-700",
      hoverColor: "from-amber-600 to-amber-800",
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
      color: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      hoverColor: "from-indigo-600 to-indigo-800",
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
      icon: <Wifi className="h-6 w-6" />,
      color: "bg-gradient-to-br from-cyan-500 to-cyan-700",
      hoverColor: "from-cyan-600 to-cyan-800",
      services: [
        { id: "traffic", name: "ترافیک اضافه", link: "/network/traffic" },
        { id: "cdn", name: "شبکه تحویل محتوا (CDN)", link: "/network/cdn" },
        { id: "ip", name: "IP استاتیک", link: "/network/ip" },
        { id: "vpn", name: "خدمات VPN", link: "/network/vpn" },
      ]
    },
    {
      id: "panels",
      title: "کنترل پنل‌ها",
      description: "پنل های مدیریت سایت و سرور",
      icon: <PanelLeft className="h-6 w-6" />,
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
      hoverColor: "from-orange-600 to-orange-800",
      services: [
        { id: "cpanel", name: "لایسنس Cpanel", link: "/panels/cpanel" },
        { id: "directadmin", name: "لایسنس DirectAdmin", link: "/panels/directadmin" },
        { id: "plesk", name: "لایسنس Plesk", link: "/panels/plesk" },
        { id: "whm", name: "لایسنس WHM", link: "/panels/whm" },
      ]
    },
    {
      id: "modules",
      title: "ماژول‌های اضافی",
      description: "ماژول‌های اضافی برای سرورها",
      icon: <Cpu className="h-6 w-6" />,
      color: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-700",
      hoverColor: "from-fuchsia-600 to-fuchsia-800",
      services: [
        { id: "extra-hdd", name: "هارد اضافه", link: "/modules/extra-hdd" },
        { id: "extra-ram", name: "رم اضافه", link: "/modules/extra-ram" },
        { id: "extra-traffic", name: "ترافیک اضافه", link: "/modules/extra-traffic" },
        { id: "extra-ip", name: "آی‌پی اضافه", link: "/modules/extra-ip" },
        { id: "extra-cpu", name: "پردازنده اضافه", link: "/modules/extra-cpu" },
      ]
    },
    {
      id: "design",
      title: "طراحی سایت",
      description: "خدمات طراحی و توسعه وب",
      icon: <Monitor className="h-6 w-6" />,
      color: "bg-gradient-to-br from-pink-500 to-pink-700",
      hoverColor: "from-pink-600 to-pink-800",
      services: [
        { id: "templates", name: "قالب‌های آماده", link: "/design/templates" },
        { id: "custom-design", name: "طراحی اختصاصی", link: "/design/custom" },
        { id: "wordpress", name: "راه‌اندازی وردپرس", link: "/design/wordpress" },
        { id: "woocommerce", name: "راه‌اندازی فروشگاه", link: "/design/woocommerce" },
      ]
    },
    {
      id: "support",
      title: "پشتیبانی تخصصی",
      description: "خدمات پشتیبانی تخصصی در زمینه‌های مختلف",
      icon: <Users className="h-6 w-6" />,
      color: "bg-gradient-to-br from-teal-500 to-teal-700",
      hoverColor: "from-teal-600 to-teal-800",
      services: [
        { id: "support-basic", name: "پشتیبانی پایه", link: "/support/basic" },
        { id: "support-advanced", name: "پشتیبانی پیشرفته", link: "/support/advanced" },
        { id: "support-premium", name: "پشتیبانی ویژه", link: "/support/premium" },
        { id: "support-online", name: "پشتیبانی آنلاین", link: "/support/online" },
      ]
    },
    {
      id: "other",
      title: "سایر خدمات",
      description: "سایر خدمات و محصولات",
      icon: <Settings className="h-6 w-6" />,
      color: "bg-gradient-to-br from-gray-500 to-gray-700",
      hoverColor: "from-gray-600 to-gray-800",
      services: [
        { id: "migration", name: "انتقال وب‌سایت", link: "/services/migration" },
        { id: "optimization", name: "بهینه‌سازی سایت", link: "/services/optimization" },
        { id: "backup", name: "سرویس بک‌آپ", link: "/services/backup" },
        { id: "monitoring", name: "مانیتورینگ", link: "/services/monitoring" },
        { id: "seo", name: "خدمات SEO", link: "/services/seo" },
      ]
    },
  ];

  const handleServiceClick = (link: string) => {
    navigateToServiceOrderPage(link);
  };

  const toggleDropdown = (categoryId: string) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  return (
    <section className="my-8">
      <Card className="overflow-hidden shadow-lg border-0">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
          <CardTitle className="text-2xl">سفارش سرویس جدید</CardTitle>
          <CardDescription className="text-blue-100">
            از میان خدمات متنوع نوین وی‌دی‌اس، سرویس مورد نظر خود را انتخاب کنید
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {serviceCategories.map((category) => (
              <div key={category.id} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <DropdownMenu open={openDropdown === category.id} onOpenChange={() => toggleDropdown(category.id)}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={cn(
                        "w-full h-32 rounded-xl px-4 py-4 text-white shadow-md transition-all duration-300",
                        category.color,
                        "hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br",
                        "hover:" + category.hoverColor
                      )}
                    >
                      <div className="flex flex-col h-full items-center justify-center gap-3 text-center">
                        <div className="bg-white/20 p-2 rounded-full">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{category.title}</h3>
                          <p className="text-xs text-white/80 mt-1 line-clamp-1">{category.description}</p>
                        </div>
                        <ChevronDown className="h-4 w-4 absolute bottom-2 right-2 opacity-70" />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="p-2 rounded-xl shadow-xl bg-white w-56 max-h-72 overflow-y-auto" 
                    align="center"
                  >
                    {category.services.map((service) => (
                      <DropdownMenuItem
                        key={service.id}
                        className="cursor-pointer rounded-lg py-2 px-3 hover:bg-gray-100"
                        onClick={() => handleServiceClick(service.link)}
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          <span className="font-medium text-gray-700">{service.name}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-6 px-5 rounded-lg font-medium text-lg items-center gap-2 shadow-md"
              onClick={() => navigateToServiceOrderPage('/special-offers')}
            >
              <CreditCard className="h-5 w-5" />
              مشاهده تخفیف‌های ویژه 
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white py-6 px-5 rounded-lg font-medium text-lg items-center gap-2 shadow-md"
              onClick={() => navigateToServiceOrderPage('/compare-plans')}
            >
              <FileText className="h-5 w-5" />
              مقایسه سرویس‌ها
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ServiceOrderSection;

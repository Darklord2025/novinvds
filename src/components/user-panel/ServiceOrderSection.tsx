
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Server, Globe, Database, Cloud, Code, Shield, Network, HardDrive, 
  Cpu, Download, Laptop, Monitor, PanelLeft, Settings, Users, CreditCard,
  ChevronDown, ChevronRight, Wifi, FileText, Layers, BookOpen,
  BarChart3, User, Key, Lock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

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

  // Updated service categories with more detailed subcategories
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
        { id: "firewall", name: "فایروال پیشرفته", link: "/security/firewall" },
        { id: "antivirus", name: "آنتی‌ویروس سرور", link: "/security/antivirus" },
        { id: "vpn", name: "سرویس VPN اختصاصی", link: "/security/vpn" },
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
        { id: "load-balancer", name: "لود بالانسر", link: "/network/load-balancer" },
        { id: "dns", name: "سرویس DNS اختصاصی", link: "/network/dns" },
        { id: "proxy", name: "سرویس پروکسی", link: "/network/proxy" },
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
        { id: "vestacp", name: "لایسنس VestaCP", link: "/panels/vestacp" },
        { id: "webmin", name: "لایسنس Webmin", link: "/panels/webmin" },
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
        { id: "extra-backup", name: "فضای بکاپ اضافه", link: "/modules/extra-backup" },
        { id: "extra-bandwidth", name: "پهنای باند اضافه", link: "/modules/extra-bandwidth" },
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
        { id: "seo", name: "بهینه‌سازی سئو", link: "/design/seo" },
        { id: "responsive", name: "طراحی ریسپانسیو", link: "/design/responsive" },
        { id: "mobile-app", name: "طراحی اپلیکیشن موبایل", link: "/design/mobile-app" },
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
        { id: "support-managed", name: "مدیریت سرور", link: "/support/managed" },
        { id: "support-emergency", name: "پشتیبانی اضطراری", link: "/support/emergency" },
        { id: "support-consultation", name: "مشاوره تخصصی", link: "/support/consultation" },
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
        { id: "content", name: "تولید محتوا", link: "/services/content" },
        { id: "email", name: "ایمیل حرفه‌ای", link: "/services/email" },
        { id: "analytics", name: "آنالیز وب‌سایت", link: "/services/analytics" },
      ]
    },
  ];

  const handleServiceClick = (link: string) => {
    toast({
      title: "انتقال به صفحه سفارش",
      description: "در حال انتقال به صفحه سفارش سرویس جدید...",
    });
    navigateToServiceOrderPage(link);
  };

  const toggleDropdown = (categoryId: string) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  return (
    <section className="my-8">
      <Card className="overflow-hidden shadow-2xl border-0 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
          <CardTitle className="text-2xl font-bold flex items-center">
            <CreditCard className="h-6 w-6 mr-2 animate-pulse" />
            سفارش سرویس جدید
          </CardTitle>
          <CardDescription className="text-blue-100">
            از میان خدمات متنوع نوین وی‌دی‌اس، سرویس مورد نظر خود را انتخاب کنید
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceCategories.map((category) => (
              <div 
                key={category.id} 
                className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <DropdownMenu open={openDropdown === category.id} onOpenChange={() => toggleDropdown(category.id)}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={cn(
                        "w-full h-32 rounded-xl px-4 py-5 text-white shadow-lg transition-all duration-300",
                        category.color,
                        "hover:shadow-xl hover:scale-[1.03] hover:bg-gradient-to-br",
                        "hover:" + category.hoverColor,
                        "relative overflow-hidden group"
                      )}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10"></div>
                      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-black/5"></div>
                      
                      <div className="flex flex-col h-full items-center justify-center gap-3 text-center relative z-10">
                        <div className="bg-white/20 p-3 rounded-full shadow-inner">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{category.title}</h3>
                          <p className="text-xs text-white/90 mt-1 line-clamp-1">{category.description}</p>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-white/30 rounded-full p-1">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="p-2 rounded-xl shadow-2xl bg-white/95 backdrop-blur-sm border-0 w-64 max-h-80 overflow-y-auto z-50" 
                    align="center"
                  >
                    <div className="pb-2 mb-2 border-b text-center">
                      <h3 className={cn(
                        "text-sm font-semibold px-2 py-1 rounded-md inline-block",
                        category.id === "hosting" && "bg-purple-100 text-purple-700",
                        category.id === "vps" && "bg-blue-100 text-blue-700",
                        category.id === "dedicated" && "bg-red-100 text-red-700",
                        category.id === "cloud" && "bg-emerald-100 text-emerald-700",
                        category.id === "domain" && "bg-amber-100 text-amber-700",
                        category.id === "security" && "bg-indigo-100 text-indigo-700",
                        category.id === "network" && "bg-cyan-100 text-cyan-700",
                        category.id === "panels" && "bg-orange-100 text-orange-700",
                        category.id === "modules" && "bg-fuchsia-100 text-fuchsia-700",
                        category.id === "design" && "bg-pink-100 text-pink-700",
                        category.id === "support" && "bg-teal-100 text-teal-700",
                        category.id === "other" && "bg-gray-100 text-gray-700",
                      )}>
                        {category.title}
                      </h3>
                    </div>
                    {category.services.map((service) => (
                      <DropdownMenuItem
                        key={service.id}
                        className="cursor-pointer rounded-lg py-2 px-3 hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                        onClick={() => handleServiceClick(service.link)}
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          <span className="font-medium text-gray-700">{service.name}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg py-2 px-3 hover:bg-blue-50 focus:bg-blue-50 transition-colors text-center font-medium text-blue-600"
                      onClick={() => handleServiceClick(`/${category.id}`)}
                    >
                      مشاهده همه خدمات {category.title}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-6 px-6 rounded-xl font-semibold text-lg items-center gap-2 shadow-lg group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              onClick={() => handleServiceClick('/special-offers')}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <CreditCard className="h-5 w-5 mr-2 inline-block" />
              مشاهده تخفیف‌های ویژه 
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white py-6 px-6 rounded-xl font-semibold text-lg items-center gap-2 shadow-lg group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              onClick={() => handleServiceClick('/compare-plans')}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <FileText className="h-5 w-5 mr-2 inline-block" />
              مقایسه سرویس‌ها
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-6 px-6 rounded-xl font-semibold text-lg items-center gap-2 shadow-lg group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              onClick={() => handleServiceClick('/quick-order')}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <Layers className="h-5 w-5 mr-2 inline-block" />
              سفارش سریع
            </Button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-800">راهنمای انتخاب سرویس</h4>
                  <p className="text-xs text-indigo-600">مشاوره رایگان برای انتخاب بهترین سرویس</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-teal-50 to-green-50 border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">مشاوره تخصصی</h4>
                  <p className="text-xs text-green-600">ارتباط با کارشناسان فنی برای راهنمایی</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <BarChart3 className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">محاسبه منابع مورد نیاز</h4>
                  <p className="text-xs text-yellow-600">تخمین دقیق سرویس مناسب برای پروژه شما</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ServiceOrderSection;

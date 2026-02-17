
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import DashboardCards from "./DashboardCards";
import ActivityFeed from "./ActivityFeed";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Download, Eye, RefreshCw, Server, HardDrive, Cloud, Globe, Database, Settings, ExternalLink, Gauge, Cpu, MemoryStick, Wifi, ChevronLeft } from "lucide-react";
import { toPersianDigits } from '@/lib/numberUtils';

interface DashboardProps {
  navigateToServiceOrderPage: (serviceLink: string) => void;
  onResetRequest?: (serviceType: string, serviceId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  navigateToServiceOrderPage,
  onResetRequest 
}) => {
  const [activeTab, setActiveTab] = useState('servers');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [serverToReset, setServerToReset] = useState({ type: '', id: '' });
  const [resetInProgress, setResetInProgress] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  
  const handleReset = (serverId: string, serviceType: string = 'vps') => {
    setServerToReset({ type: serviceType, id: serverId });
    setResetDialogOpen(true);
  };

  const confirmReset = () => {
    setResetDialogOpen(false);
    setResetInProgress(true);
    
    toast({
      title: "در حال ریست سرور",
      description: `لطفاً صبر کنید... سرور ${serverToReset.id} در حال ریست است.`,
    });
    
    setTimeout(() => {
      setResetInProgress(false);
      setResetComplete(true);
      
      toast({
        title: "ریست سرور انجام شد",
        description: `ریست سرور ${serverToReset.id} با موفقیت انجام شد.`,
      });
      
      if (onResetRequest) {
        onResetRequest(serverToReset.type, serverToReset.id);
      }
    }, 3000);
  };
  
  const handleRenew = (serviceType: string, serviceId: string) => {
    toast({
      title: "تمدید سرویس",
      description: `درخواست تمدید سرویس ${serviceId} ثبت شد.`,
    });
  };

  const handleViewInvoice = (invoiceId: string, isPaid: boolean = false) => {
    navigateToServiceOrderPage(`/invoices/${invoiceId}`);
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({ title: "دانلود فاکتور", description: "فاکتور در حال دانلود است..." });
  };

  const handlePayInvoice = (invoiceId: string) => {
    navigateToServiceOrderPage(`/invoices/pay/${invoiceId}`);
  };

  const handleManageService = (type: string, id: string) => {
    navigateToServiceOrderPage(`/${type}-management/${id}`);
  };

  const safeNavigate = (link: string) => {
    if (navigateToServiceOrderPage) {
      navigateToServiceOrderPage(link);
    }
  };

  const tabOptions = [
    { value: 'servers', label: 'سرور مجازی', icon: Server },
    { value: 'dedicated', label: 'اختصاصی', icon: HardDrive },
    { value: 'cloud', label: 'ابری', icon: Cloud },
    { value: 'hosting', label: 'هاستینگ', icon: Database },
    { value: 'domains', label: 'دامنه‌ها', icon: Globe },
  ];

  // Mock services data
  const servicesData: Record<string, any[]> = {
    servers: [
      { id: 'VPS-1234', name: 'سرور لینوکس ۱', ip: '۱۸۵.۱۲۳.۴۵.۶۷', os: 'Ubuntu 22.04', status: 'active', cpu: 45, ram: 62, disk: 35, bandwidth: 20, plan: 'پلن حرفه‌ای', expiry: '۱۴۰۳/۰۶/۱۵' },
      { id: 'VPS-5678', name: 'سرور ویندوز ۱', ip: '۱۸۵.۱۲۳.۴۵.۶۸', os: 'Windows Server 2022', status: 'active', cpu: 78, ram: 85, disk: 60, bandwidth: 45, plan: 'پلن ویژه', expiry: '۱۴۰۳/۰۸/۲۰' },
    ],
    dedicated: [
      { id: 'DED-9012', name: 'سرور اختصاصی ایران', ip: '۱۸۵.۲۲۰.۱۰.۵', os: 'CentOS 8', status: 'active', cpu: 30, ram: 40, disk: 25, bandwidth: 15, plan: 'E3-1270v6', expiry: '۱۴۰۳/۰۹/۰۱' },
    ],
    cloud: [
      { id: 'CLD-3456', name: 'سرور ابری ۱', ip: '۱۸۵.۱۵۰.۲۰.۱۰', os: 'Debian 12', status: 'active', cpu: 55, ram: 70, disk: 40, bandwidth: 30, plan: 'ابری پیشرفته', expiry: '۱۴۰۳/۰۷/۱۰' },
    ],
    hosting: [
      { id: 'HOST-7890', name: 'example.ir', panel: 'cPanel', status: 'active', disk: 25, bandwidth: 15, plan: 'پکیج حرفه‌ای', expiry: '۱۴۰۳/۱۲/۰۱' },
      { id: 'HOST-1122', name: 'mysite.com', panel: 'DirectAdmin', status: 'active', disk: 60, bandwidth: 40, plan: 'پکیج VIP', expiry: '۱۴۰۳/۱۰/۱۵' },
    ],
    domains: [
      { id: 'example.ir', status: 'active', registrar: 'ایرنیک', expiry: '۱۴۰۳/۱۱/۲۰' },
      { id: 'mysite.com', status: 'active', registrar: 'بین‌المللی', expiry: '۱۴۰۴/۰۳/۰۵' },
      { id: 'shop.ir', status: 'expiring', registrar: 'ایرنیک', expiry: '۱۴۰۳/۰۵/۰۱' },
    ],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-emerald-100 text-emerald-700 text-[10px] md:text-xs">فعال</Badge>;
      case 'expiring': return <Badge className="bg-amber-100 text-amber-700 text-[10px] md:text-xs">در حال انقضا</Badge>;
      case 'suspended': return <Badge className="bg-red-100 text-red-700 text-[10px] md:text-xs">تعلیق</Badge>;
      default: return <Badge className="text-[10px] md:text-xs">{status}</Badge>;
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return 'text-red-500';
    if (value >= 60) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const renderServerCard = (service: any, type: string) => (
    <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 md:p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-sm md:text-base truncate">{service.name}</h4>
          <p className="text-[10px] md:text-xs text-muted-foreground font-mono mt-0.5">{service.ip}</p>
        </div>
        {getStatusBadge(service.status)}
      </div>

      {/* Info Row */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] md:text-xs text-muted-foreground">
        <span>{service.os}</span>
        <span>•</span>
        <span>{service.plan}</span>
        <span>•</span>
        <span>انقضا: {service.expiry}</span>
      </div>

      {/* Resource Bars */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'CPU', value: service.cpu, icon: Cpu },
          { label: 'RAM', value: service.ram, icon: MemoryStick },
          { label: 'دیسک', value: service.disk, icon: HardDrive },
          { label: 'ترافیک', value: service.bandwidth, icon: Wifi },
        ].map(res => (
          <div key={res.label} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] md:text-xs text-muted-foreground">{res.label}</span>
              <span className={`text-[10px] md:text-xs font-bold ${getProgressColor(res.value)}`}>
                {toPersianDigits(res.value)}٪
              </span>
            </div>
            <Progress value={res.value} className="h-1.5" />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-1">
        <Button size="sm" variant="default" className="flex-1 min-w-0 text-[10px] md:text-xs h-8" onClick={() => handleManageService(type, service.id)}>
          <Settings className="w-3 h-3 ml-1 shrink-0" />
          مدیریت
        </Button>
        <Button size="sm" variant="outline" className="text-[10px] md:text-xs h-8" onClick={() => handleReset(service.id, type)}>
          <RefreshCw className="w-3 h-3 ml-1" />
          ریست
        </Button>
        <Button size="sm" variant="outline" className="text-[10px] md:text-xs h-8" onClick={() => handleRenew(type, service.id)}>
          تمدید
        </Button>
      </div>
    </div>
  );

  const renderHostingCard = (service: any) => (
    <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 md:p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-sm md:text-base truncate">{service.name}</h4>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{service.plan} • {service.panel}</p>
        </div>
        {getStatusBadge(service.status)}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] md:text-xs text-muted-foreground">دیسک</span>
            <span className={`text-[10px] md:text-xs font-bold ${getProgressColor(service.disk)}`}>{toPersianDigits(service.disk)}٪</span>
          </div>
          <Progress value={service.disk} className="h-1.5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] md:text-xs text-muted-foreground">ترافیک</span>
            <span className={`text-[10px] md:text-xs font-bold ${getProgressColor(service.bandwidth)}`}>{toPersianDigits(service.bandwidth)}٪</span>
          </div>
          <Progress value={service.bandwidth} className="h-1.5" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground">
        <span>انقضا: {service.expiry}</span>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <Button size="sm" variant="default" className="flex-1 min-w-0 text-[10px] md:text-xs h-8" onClick={() => handleManageService('hosting', service.id)}>
          <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
          ورود به پنل
        </Button>
        <Button size="sm" variant="outline" className="text-[10px] md:text-xs h-8" onClick={() => handleRenew('hosting', service.id)}>
          تمدید
        </Button>
      </div>
    </div>
  );

  const renderDomainCard = (service: any) => (
    <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 md:p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-sm md:text-base font-mono truncate" dir="ltr">{service.id}</h4>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{service.registrar}</p>
        </div>
        {getStatusBadge(service.status)}
      </div>
      <div className="text-[10px] md:text-xs text-muted-foreground">
        انقضا: {service.expiry}
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        <Button size="sm" variant="default" className="flex-1 min-w-0 text-[10px] md:text-xs h-8" onClick={() => handleManageService('domain', service.id)}>
          <Settings className="w-3 h-3 ml-1 shrink-0" />
          مدیریت
        </Button>
        <Button size="sm" variant="outline" className="text-[10px] md:text-xs h-8" onClick={() => handleRenew('domain', service.id)}>
          تمدید
        </Button>
      </div>
    </div>
  );

  const renderServicesList = () => {
    const services = servicesData[activeTab] || [];
    if (services.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <p>هیچ سرویسی در این دسته یافت نشد</p>
          <Button variant="link" className="mt-2" onClick={() => safeNavigate('/order-' + activeTab)}>
            سفارش سرویس جدید
          </Button>
        </div>
      );
    }

    if (activeTab === 'domains') {
      return (
        <div className="grid grid-cols-1 gap-3">
          {services.map(s => renderDomainCard(s))}
        </div>
      );
    }

    if (activeTab === 'hosting') {
      return (
        <div className="grid grid-cols-1 gap-3">
          {services.map(s => renderHostingCard(s))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-3">
        {services.map(s => renderServerCard(s, activeTab === 'servers' ? 'vps' : activeTab))}
      </div>
    );
  };
  
  return (
    <div className="space-y-4 md:space-y-6" dir="rtl">
      <h1 className="text-lg md:text-2xl font-bold">داشبورد</h1>
      
      <DashboardCards />
      
      {/* Services Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-0 rounded-xl overflow-hidden">
            <CardHeader className="pb-2 px-3 md:px-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm md:text-lg">سرویس‌های من</CardTitle>
                  <Button variant="ghost" size="sm" className="text-[10px] md:text-xs text-primary" onClick={() => safeNavigate('/servers')}>
                    مشاهده همه
                    <ChevronLeft className="w-3 h-3 mr-1" />
                  </Button>
                </div>
                
                {/* Tabs - scrollable on mobile */}
                <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                  {tabOptions.map(tab => (
                    <Button
                      key={tab.value}
                      variant={activeTab === tab.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab(tab.value)}
                      className={`text-[10px] md:text-xs gap-1 shrink-0 h-7 md:h-8 px-2 md:px-3 ${
                        activeTab === tab.value ? '' : 'border-gray-200'
                      }`}
                    >
                      <tab.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
              {renderServicesList()}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="shadow-sm border-0 rounded-xl">
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="text-sm md:text-lg">فعالیت‌های اخیر</CardTitle>
              <CardDescription className="text-[10px] md:text-xs">آخرین فعالیت‌های پنل کاربری</CardDescription>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <ActivityFeed />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Bottom Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {/* Support Tickets */}
        <Card className="shadow-sm border-0 rounded-xl">
          <CardHeader className="pb-2 px-3 md:px-6">
            <CardTitle className="text-sm md:text-lg">تیکت‌های پشتیبانی</CardTitle>
          </CardHeader>
          <CardContent className="px-3 md:px-6">
            <div className="space-y-2">
              {[
                { label: 'تیکت‌های باز', count: 2, color: 'bg-blue-100 text-blue-800' },
                { label: 'در حال بررسی', count: 1, color: 'bg-yellow-100 text-yellow-800' },
                { label: 'پاسخ داده شده', count: 3, color: 'bg-green-100 text-green-800' },
                { label: 'بسته شده', count: 8, color: 'bg-gray-100 text-gray-800' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-[10px] md:text-sm">{item.label}</span>
                  <span className={`${item.color} text-[10px] md:text-xs font-semibold px-1.5 py-0.5 rounded`}>{toPersianDigits(item.count)}</span>
                </div>
              ))}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Button className="text-[10px] md:text-xs h-8" variant="outline" size="sm" onClick={() => safeNavigate('/tickets')}>
                  مشاهده تیکت‌ها
                </Button>
                <Button className="text-[10px] md:text-xs h-8" size="sm" onClick={() => safeNavigate('/tickets/new')}>
                  تیکت جدید
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Invoices */}
        <Card className="shadow-sm border-0 rounded-xl">
          <CardHeader className="pb-2 px-3 md:px-6">
            <CardTitle className="text-sm md:text-lg">فاکتورهای اخیر</CardTitle>
          </CardHeader>
          <CardContent className="px-3 md:px-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-red-50 text-red-700 rounded-lg text-[10px] md:text-xs">
                <span className="font-medium">INV-{toPersianDigits('1234')}</span>
                <span>{toPersianDigits('1402/04/15')}</span>
                <div className="flex gap-0.5">
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleViewInvoice('INV-1234')}>
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleDownloadInvoice('INV-1234')}>
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-[10px] md:text-xs h-8" size="sm" onClick={() => handlePayInvoice('INV-1234')}>
                پرداخت فاکتور
              </Button>
              
              <div className="flex items-center justify-between p-2 bg-green-50 text-green-700 rounded-lg text-[10px] md:text-xs">
                <span className="font-medium">INV-{toPersianDigits('1233')}</span>
                <span>{toPersianDigits('1402/04/01')}</span>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleViewInvoice('INV-1233', true)}>
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
              
              <Button className="w-full text-[10px] md:text-xs h-8" variant="outline" size="sm" onClick={() => safeNavigate('/invoices')}>
                مشاهده همه فاکتورها
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="shadow-sm border-0 rounded-xl sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 px-3 md:px-6">
            <CardTitle className="text-sm md:text-lg">اطلاعیه‌های مهم</CardTitle>
          </CardHeader>
          <CardContent className="px-3 md:px-6">
            <div className="space-y-2">
              <div className="p-2 md:p-3 border rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => safeNavigate('/announcement-details/1')}>
                <h4 className="text-[10px] md:text-sm font-medium mb-0.5">به‌روزرسانی سرورها</h4>
                <p className="text-[10px] md:text-xs text-gray-600 line-clamp-2">سرورهای ابری در تاریخ {toPersianDigits(15)} شهریور بروزرسانی خواهند شد.</p>
              </div>
              
              <div className="p-2 md:p-3 border rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer" onClick={() => safeNavigate('/announcement-details/2')}>
                <h4 className="text-[10px] md:text-sm font-medium mb-0.5">افزایش ظرفیت دیتاسنتر</h4>
                <p className="text-[10px] md:text-xs text-gray-600 line-clamp-2">ظرفیت جدید سرورهای اختصاصی در دیتاسنتر اضافه شد.</p>
              </div>
              
              <Button className="w-full text-[10px] md:text-xs h-8" variant="outline" size="sm" onClick={() => safeNavigate('/important-announcements')}>
                مشاهده همه اطلاعیه‌ها
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset Dialogs */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأیید ریست سرور</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از ریست سرور {serverToReset.id} اطمینان دارید؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset} className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="ml-2 h-4 w-4" />
              تأیید ریست
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={resetInProgress} onOpenChange={setResetInProgress}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-600">در حال ریست سرور</AlertDialogTitle>
            <AlertDialogDescription>
              لطفاً صبر کنید...
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={resetComplete} onOpenChange={setResetComplete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600">ریست سرور انجام شد</AlertDialogTitle>
            <AlertDialogDescription>
              ریست سرور {serverToReset.id} با موفقیت انجام شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setResetComplete(false)}>تأیید</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;

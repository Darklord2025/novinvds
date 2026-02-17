
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import DashboardCards from "./DashboardCards";
import ServerList from "./ServerList";
import ActivityFeed from "./ActivityFeed";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Download, Eye, RefreshCw, Server, HardDrive, Cloud, Globe, Database } from "lucide-react";
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

  const handleManageService = (id: string) => {
    const serviceType = activeTab === 'servers' ? 'vps' : 
                        activeTab === 'dedicated' ? 'dedicated' : 
                        activeTab === 'cloud' ? 'cloud' : 
                        activeTab === 'domains' ? 'domain' : 'hosting';
    navigateToServiceOrderPage(`/${serviceType}-management/${id}`);
  };

  const safeNavigate = (link: string) => {
    if (navigateToServiceOrderPage) {
      navigateToServiceOrderPage(link);
    }
  };

  const tabOptions = [
    { value: 'servers', label: 'سرورهای مجازی', icon: Server },
    { value: 'dedicated', label: 'اختصاصی', icon: HardDrive },
    { value: 'cloud', label: 'ابری', icon: Cloud },
    { value: 'domains', label: 'دامنه‌ها', icon: Globe },
    { value: 'hosting', label: 'هاستینگ', icon: Database },
  ];

  const renderServiceList = () => {
    const typeMap: Record<string, string> = {
      servers: 'vps', dedicated: 'dedicated', cloud: 'cloud', domains: 'domain', hosting: 'hosting'
    };
    return (
      <ServerList 
        serviceType={typeMap[activeTab] || 'vps'}
        onManage={handleManageService}
        onReset={activeTab !== 'domains' ? (id) => handleReset(id, typeMap[activeTab]) : undefined}
        onRenew={(id) => handleRenew(typeMap[activeTab], id)}
      />
    );
  };
  
  return (
    <div className="space-y-4 md:space-y-6" dir="rtl">
      <h1 className="text-xl md:text-2xl font-bold">داشبورد</h1>
      
      <DashboardCards />
      
      {/* Services Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-md border-0 rounded-xl">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="text-base md:text-lg">سرویس‌های من</CardTitle>
                {/* Mobile: Select dropdown */}
                <div className="sm:hidden w-full">
                  <Select value={activeTab} onValueChange={setActiveTab}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tabOptions.map(tab => (
                        <SelectItem key={tab.value} value={tab.value}>
                          <span className="flex items-center gap-2">
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Desktop: Tab buttons */}
                <div className="hidden sm:flex flex-wrap gap-1">
                  {tabOptions.map(tab => (
                    <Button
                      key={tab.value}
                      variant={activeTab === tab.value ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab(tab.value)}
                      className="text-xs md:text-sm gap-1.5"
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderServiceList()}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="shadow-md border-0 rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">فعالیت‌های اخیر</CardTitle>
              <CardDescription className="text-xs md:text-sm">آخرین فعالیت‌های پنل کاربری</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Bottom Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Support Tickets */}
        <Card className="shadow-md border-0 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">تیکت‌های پشتیبانی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs md:text-sm font-medium">تیکت‌های باز</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">{toPersianDigits(2)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs md:text-sm font-medium">در حال بررسی</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded">{toPersianDigits(1)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs md:text-sm font-medium">پاسخ داده شده</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">{toPersianDigits(3)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm font-medium">بسته شده</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded">{toPersianDigits(8)}</span>
              </div>
              <div className="pt-2 space-y-2">
                <Button className="w-full text-xs md:text-sm" variant="outline" size="sm" onClick={() => safeNavigate('/tickets')}>
                  مشاهده همه تیکت‌ها
                </Button>
                <Button className="w-full text-xs md:text-sm" size="sm" onClick={() => safeNavigate('/tickets/new')}>
                  ارسال تیکت جدید
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Invoices */}
        <Card className="shadow-md border-0 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">فاکتورهای اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-red-50 text-red-700 rounded-md text-xs md:text-sm">
                <span className="font-medium">INV-{toPersianDigits('1234')}</span>
                <span>{toPersianDigits('1402/04/15')}</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleViewInvoice('INV-1234')}>
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleDownloadInvoice('INV-1234')}>
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs md:text-sm" size="sm" onClick={() => handlePayInvoice('INV-1234')}>
                پرداخت فاکتور
              </Button>
              
              <div className="flex justify-between items-center p-2 bg-green-50 text-green-700 rounded-md text-xs md:text-sm">
                <span className="font-medium">INV-{toPersianDigits('1233')}</span>
                <span>{toPersianDigits('1402/04/01')}</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleViewInvoice('INV-1233', true)}>
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <Button className="w-full text-xs md:text-sm" variant="outline" size="sm" onClick={() => safeNavigate('/invoices')}>
                مشاهده همه فاکتورها
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="shadow-md border-0 rounded-xl sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">اطلاعیه‌های مهم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-md bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => safeNavigate('/announcement-details/1')}>
                <h4 className="text-xs md:text-sm font-medium mb-1">به‌روزرسانی سرورها</h4>
                <p className="text-xs text-gray-600 line-clamp-2">سرورهای ابری در تاریخ {toPersianDigits(15)} شهریور بروزرسانی خواهند شد.</p>
              </div>
              
              <div className="p-3 border rounded-md bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer" onClick={() => safeNavigate('/announcement-details/2')}>
                <h4 className="text-xs md:text-sm font-medium mb-1">افزایش ظرفیت دیتاسنتر</h4>
                <p className="text-xs text-gray-600 line-clamp-2">ظرفیت جدید سرورهای اختصاصی در دیتاسنتر اضافه شد.</p>
              </div>
              
              <Button className="w-full text-xs md:text-sm" variant="outline" size="sm" onClick={() => safeNavigate('/important-announcements')}>
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

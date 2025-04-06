
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import DashboardCards from "./DashboardCards";
import ServerList from "./ServerList";
import ActivityFeed from "./ActivityFeed";
import ServiceOrderSection from "./ServiceOrderSection";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Download, Eye, RefreshCw } from "lucide-react";
import { DashboardProps } from './interfaces';

const Dashboard: React.FC<DashboardProps> = ({ navigateToServiceOrderPage }) => {
  const [activeTab, setActiveTab] = useState('servers');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [serverToReset, setServerToReset] = useState({ type: '', id: '' });
  
  const handleReset = (serverId: string, serviceType: string = 'vps') => {
    if (!serverId) return; // Prevent attempting to reset with an empty ID
    
    setServerToReset({ type: serviceType, id: serverId });
    setResetDialogOpen(true);
  };

  const confirmReset = () => {
    setResetDialogOpen(false);
    toast({
      title: "در حال ریست سرور",
      description: `لطفاً صبر کنید... سرور ${serverToReset.id} در حال ریست است.`
    });
    
    // Simulate reset process
    setTimeout(() => {
      toast({
        title: "ریست سرور انجام شد",
        description: `ریست سرور ${serverToReset.id} با موفقیت انجام شد.`,
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
    }, 3000);
  };
  
  const handleRenew = (serviceType: string, serviceId: string) => {
    if (!serviceId) return; // Prevent attempting to renew with an empty ID
    
    toast({
      title: "تمدید سرویس",
      description: `درخواست تمدید سرویس ${serviceId} ثبت شد و به صفحه پرداخت هدایت می‌شوید.`,
      action: (
        <Button variant="outline" onClick={() => navigateToServiceOrderPage(`/renew/${serviceType}/${serviceId}`)}>
          ادامه
        </Button>
      )
    });
  };

  const handleViewInvoice = (invoiceId: string, isPaid: boolean = false) => {
    if (!invoiceId) return; // Prevent attempting to view with an empty ID
    
    toast({
      title: isPaid ? "مشاهده فاکتور پرداخت شده" : "مشاهده فاکتور پرداخت نشده",
      description: `در حال بارگیری فاکتور شماره ${invoiceId}...`,
    });
    
    setTimeout(() => {
      if (navigateToServiceOrderPage) {
        navigateToServiceOrderPage(`/invoices/${invoiceId}`);
      }
    }, 500);
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    if (!invoiceId) return; // Prevent attempting to download with an empty ID
    
    toast({
      title: "دانلود فاکتور",
      description: "فاکتور در حال دانلود است...",
    });
    
    // Simulate download process
    setTimeout(() => {
      toast({
        title: "دانلود انجام شد",
        description: "فاکتور با موفقیت دانلود شد.",
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
    }, 1500);
  };

  const handlePayInvoice = (invoiceId: string) => {
    if (!invoiceId) return; // Prevent attempting to pay with an empty ID
    
    toast({
      title: "پرداخت فاکتور",
      description: "در حال انتقال به درگاه پرداخت...",
    });
    
    setTimeout(() => {
      if (navigateToServiceOrderPage) {
        navigateToServiceOrderPage(`/invoices/pay/${invoiceId}`);
      }
    }, 1000);
  };
  
  // Safely handle navigation
  const safeNavigate = (path: string) => {
    if (navigateToServiceOrderPage && path) {
      navigateToServiceOrderPage(path);
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">داشبورد</h1>
      
      <DashboardCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="servers" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="servers">سرورهای مجازی</TabsTrigger>
              <TabsTrigger value="dedicated">سرورهای اختصاصی</TabsTrigger>
              <TabsTrigger value="cloud">سرورهای ابری</TabsTrigger>
              <TabsTrigger value="domains">دامنه‌ها</TabsTrigger>
              <TabsTrigger value="hosting">هاستینگ</TabsTrigger>
            </TabsList>
            <TabsContent value="servers" className="mt-6">
              <ServerList 
                serviceType="vps" 
                onManage={(id) => safeNavigate(`/manage/vps/${id}`)}
                onReset={(id) => handleReset(id, 'vps')} 
                onRenew={(id) => handleRenew('vps', id)} 
              />
            </TabsContent>
            <TabsContent value="dedicated" className="mt-6">
              <ServerList 
                serviceType="dedicated" 
                onManage={(id) => safeNavigate(`/manage/dedicated/${id}`)} 
                onReset={(id) => handleReset(id, 'dedicated')} 
                onRenew={(id) => handleRenew('dedicated', id)} 
              />
            </TabsContent>
            <TabsContent value="cloud" className="mt-6">
              <ServerList 
                serviceType="cloud" 
                onManage={(id) => safeNavigate(`/manage/cloud/${id}`)}
                onReset={(id) => handleReset(id, 'cloud')} 
                onRenew={(id) => handleRenew('cloud', id)} 
              />
            </TabsContent>
            <TabsContent value="domains" className="mt-6">
              <ServerList 
                serviceType="domain" 
                onManage={(id) => safeNavigate(`/manage/domain/${id}`)} 
                onRenew={(id) => handleRenew('domain', id)} 
              />
            </TabsContent>
            <TabsContent value="hosting" className="mt-6">
              <ServerList 
                serviceType="hosting" 
                onManage={(id) => safeNavigate(`/manage/hosting/${id}`)} 
                onRenew={(id) => handleRenew('hosting', id)} 
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="shadow-md border-0 rounded-xl">
            <CardHeader>
              <CardTitle>فعالیت‌های اخیر</CardTitle>
              <CardDescription>آخرین فعالیت‌های انجام شده در پنل کاربری</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Pass the navigateToServiceOrderPage prop to ServiceOrderSection */}
      <ServiceOrderSection 
        navigateToServiceOrderPage={navigateToServiceOrderPage}
      />
      
      {/* Cards for support tickets and invoices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md border-0 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle>تیکت‌های پشتیبانی</CardTitle>
            <CardDescription>
              وضعیت تیکت‌های پشتیبانی شما
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">تیکت‌های باز</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">2</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">در حال بررسی</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">1</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">پاسخ داده شده</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">بسته شده</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">8</span>
              </div>
              
              <div className="pt-2">
                <Button className="w-full" variant="outline" onClick={() => safeNavigate('/tickets')}>
                  مشاهده همه تیکت‌ها
                </Button>
                <Button className="w-full mt-2" onClick={() => safeNavigate('/tickets/new')}>
                  ارسال تیکت جدید
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-0 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle>فاکتورهای اخیر</CardTitle>
            <CardDescription>
              آخرین فاکتورهای صادر شده
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-red-50 text-red-700 rounded-md">
                <span className="text-sm font-medium">INV-1234</span>
                <span className="text-xs">1402/04/15</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" title="مشاهده فاکتور" 
                    onClick={() => handleViewInvoice('INV-1234')}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" title="دانلود فاکتور"
                    onClick={() => handleDownloadInvoice('INV-1234')}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white" 
                onClick={() => handlePayInvoice('INV-1234')}
              >
                پرداخت فاکتور
              </Button>
              
              <div className="flex justify-between items-center p-2 bg-green-50 text-green-700 rounded-md">
                <span className="text-sm font-medium">INV-1233</span>
                <span className="text-xs">1402/04/01</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" title="مشاهده فاکتور"
                    onClick={() => handleViewInvoice('INV-1233', true)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" title="دانلود فاکتور"
                    onClick={() => handleDownloadInvoice('INV-1233')}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-green-50 text-green-700 rounded-md">
                <span className="text-sm font-medium">INV-1232</span>
                <span className="text-xs">1402/03/15</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" title="مشاهده فاکتور"
                    onClick={() => handleViewInvoice('INV-1232', true)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" title="دانلود فاکتور"
                    onClick={() => handleDownloadInvoice('INV-1232')}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button className="w-full mt-2" variant="outline" onClick={() => safeNavigate('/invoices')}>
                مشاهده همه فاکتورها
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle>اطلاعیه‌های مهم</CardTitle>
            <CardDescription>
              آخرین اطلاعیه‌های مهم سیستم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-md bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => safeNavigate('/announcements/1')}>
                <h4 className="text-sm font-medium mb-1">به‌روزرسانی سرورها</h4>
                <p className="text-xs text-gray-600">سرورهای ابری در تاریخ 15 شهریور بروزرسانی خواهند شد.</p>
                <div className="text-xs text-gray-500 mt-1">1402/06/01</div>
              </div>
              
              <div className="p-3 border rounded-md bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer" onClick={() => safeNavigate('/announcements/2')}>
                <h4 className="text-sm font-medium mb-1">افزایش ظرفیت دیتاسنتر</h4>
                <p className="text-xs text-gray-600">ظرفیت جدید سرورهای اختصاصی در دیتاسنتر اضافه شد.</p>
                <div className="text-xs text-gray-500 mt-1">1402/05/20</div>
              </div>
              
              <Button className="w-full mt-2" variant="outline" onClick={() => safeNavigate('/announcements')}>
                مشاهده همه اطلاعیه‌ها
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset Server Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأیید ریست سرور</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از ریست سرور {serverToReset.id} اطمینان دارید؟ تمام اطلاعات و تنظیمات به حالت اولیه بازخواهند گشت.
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
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ServerList from "./ServerList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileDown, RefreshCw, Settings, Download, Eye } from 'lucide-react';

interface OperatingSystem {
  id: string;
  name: string;
}

interface OperatingSystems {
  linux: OperatingSystem[];
  windows: OperatingSystem[];
  specialized: OperatingSystem[];
}

interface ServicesPageProps {
  serviceType: string;
  operatingSystems?: OperatingSystems;
  onManage?: (serviceType: string, id: string) => void;
  onReset?: (serviceType: string, id: string) => void;
  onRenew?: (serviceType: string, id: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ 
  serviceType, 
  operatingSystems,
  onManage,
  onReset,
  onRenew
}) => {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [serverToReset, setServerToReset] = useState({ type: '', id: '' });
  const [selectedTab, setSelectedTab] = useState('active');
  const [resetInProgress, setResetInProgress] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const getPageTitle = () => {
    switch(serviceType) {
      case 'servers':
        return 'سرورهای مجازی';
      case 'dedicated':
        return 'سرورهای اختصاصی';
      case 'cloud':
        return 'سرورهای ابری';
      case 'hosting':
        return 'هاستینگ';
      case 'domains':
        return 'دامنه‌ها';
      default:
        return 'سرویس‌ها';
    }
  };

  const getMappedServiceType = () => {
    switch(serviceType) {
      case 'servers':
        return 'vps';
      case 'domains':
        return 'domain';
      default:
        return serviceType;
    }
  };

  const handleResetRequest = (id: string) => {
    setServerToReset({ type: getMappedServiceType(), id });
    setResetDialogOpen(true);
  };

  const confirmReset = () => {
    setResetDialogOpen(false);
    setResetInProgress(true);
    
    // Show progress toast
    toast({
      title: "در حال ریست سرور",
      description: `لطفاً صبر کنید... سرور ${serverToReset.id} در حال ریست است.`
    });
    
    // Simulate reset process
    setTimeout(() => {
      setResetInProgress(false);
      setResetComplete(true);
      
      toast({
        title: "ریست سرور انجام شد",
        description: `ریست سرور ${serverToReset.id} با موفقیت انجام شد.`,
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
      
      // Call external handler if available
      if (onReset) {
        onReset(serverToReset.type, serverToReset.id);
      }
    }, 3000);
  };

  const handleManage = (id: string) => {
    if (onManage) {
      onManage(getMappedServiceType(), id);
      
      toast({
        title: "مدیریت سرویس",
        description: `در حال انتقال به پنل مدیریت سرویس ${id}...`,
      });
    }
  };

  const handleRenew = (id: string) => {
    if (onRenew) {
      onRenew(getMappedServiceType(), id);
      
      toast({
        title: "تمدید سرویس",
        description: `درخواست تمدید سرویس ${id} ثبت شد و به صفحه پرداخت هدایت می‌شوید.`,
        action: (
          <Button variant="outline" onClick={() => toast({ title: "پرداخت موفق" })}>
            ادامه به پرداخت
          </Button>
        )
      });
    }
  };

  const handleDownloadInvoice = (id: string) => {
    toast({
      title: "دانلود فاکتور",
      description: `فاکتور سرویس ${id} در حال آماده‌سازی برای دانلود است.`,
    });
    
    // Simulate download process
    setTimeout(() => {
      toast({
        title: "فاکتور آماده است",
        description: "فاکتور با موفقیت دانلود شد.",
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
    }, 1500);
  };

  const handleViewInvoice = (id: string, isPaid: boolean = false) => {
    toast({
      title: isPaid ? "مشاهده فاکتور پرداخت شده" : "مشاهده فاکتور پرداخت نشده", 
      description: `در حال بارگیری فاکتور مربوط به سرویس ${id}...`,
    });
    
    // Simulate view process
    setTimeout(() => {
      if (onManage) {
        onManage('invoice', id);
      }
    }, 500);
  };

  const renderServiceActions = () => {
    const actions = [];
    
    if (['vps', 'dedicated', 'cloud'].includes(getMappedServiceType())) {
      actions.push(
        <Button 
          key="order-new" 
          className="flex items-center"
          onClick={() => window.location.href = `/${getMappedServiceType()}`}
        >
          <ExternalLink className="ml-2 h-4 w-4" />
          سفارش {getPageTitle()} جدید
        </Button>
      );
    } else if (getMappedServiceType() === 'domain') {
      actions.push(
        <Button 
          key="register-domain" 
          className="flex items-center"
          onClick={() => window.location.href = '/domain/register'}
        >
          <ExternalLink className="ml-2 h-4 w-4" />
          ثبت دامنه جدید
        </Button>
      );
    } else if (getMappedServiceType() === 'hosting') {
      actions.push(
        <Button 
          key="order-hosting" 
          className="flex items-center"
          onClick={() => window.location.href = '/hosting'}
        >
          <ExternalLink className="ml-2 h-4 w-4" />
          سفارش هاستینگ جدید
        </Button>
      );
    }
    
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {actions}
        <Button 
          variant="outline" 
          className="flex items-center"
          onClick={() => setSelectedTab('active')}
        >
          <Settings className="ml-2 h-4 w-4" />
          مدیریت {getPageTitle()}
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center"
          onClick={() => handleDownloadInvoice('all')}
        >
          <FileDown className="ml-2 h-4 w-4" />
          دانلود فاکتورها
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
          <p className="text-gray-500 mt-1">مدیریت و مشاهده {getPageTitle()} شما</p>
        </div>
        
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">فعال: 3</Badge>
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">در انتظار: 0</Badge>
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">منقضی شده: 1</Badge>
        </div>
      </div>
      
      {renderServiceActions()}
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle>لیست {getPageTitle()}</CardTitle>
              <CardDescription>
                لیست تمام {getPageTitle()} فعال شما
              </CardDescription>
            </div>
            
            <Tabs 
              value={selectedTab} 
              onValueChange={setSelectedTab}
              className="mt-4 md:mt-0"
            >
              <TabsList>
                <TabsTrigger value="active">فعال</TabsTrigger>
                <TabsTrigger value="pending">در انتظار</TabsTrigger>
                <TabsTrigger value="expired">منقضی شده</TabsTrigger>
                <TabsTrigger value="all">همه</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <ServerList 
            serviceType={getMappedServiceType() as any}
            onManage={handleManage}
            onReset={['vps', 'dedicated', 'cloud'].includes(getMappedServiceType()) ? handleResetRequest : undefined}
            onRenew={handleRenew}
            onViewInvoice={handleViewInvoice}
            onDownloadInvoice={handleDownloadInvoice}
          />
        </CardContent>
      </Card>

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
      
      {/* Reset In Progress Dialog */}
      <AlertDialog open={resetInProgress} onOpenChange={setResetInProgress}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-600">در حال ریست سرور</AlertDialogTitle>
            <AlertDialogDescription>
              لطفاً صبر کنید... ریست سرور {serverToReset.id} در حال انجام است.
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Complete Dialog */}
      <AlertDialog open={resetComplete} onOpenChange={setResetComplete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600">ریست سرور انجام شد</AlertDialogTitle>
            <AlertDialogDescription>
              ریست سرور {serverToReset.id} با موفقیت انجام شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setResetComplete(false)}>
              تأیید
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesPage;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Database, Globe, Shield, Network, Code, HeadphonesIcon, Cloud, DownloadCloud, HardDrive, Lock, Cpu } from 'lucide-react';

// Define the types for service order section props
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

const ServiceOrderSection = ({ serviceCategories, navigateToServiceOrderPage }: ServiceOrderSectionProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>سفارش سرویس جدید</CardTitle>
        <CardDescription>
          از طریق این بخش می‌توانید سرویس‌های مورد نیاز خود را سفارش دهید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="web-hosting">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full mb-6">
            <TabsTrigger value="web-hosting" className="flex items-center bg-blue-50 data-[state=active]:bg-blue-100">
              <Database className="h-4 w-4 mr-2 text-blue-600" />
              <span>میزبانی وب</span>
            </TabsTrigger>
            <TabsTrigger value="domains" className="flex items-center bg-green-50 data-[state=active]:bg-green-100">
              <Globe className="h-4 w-4 mr-2 text-green-600" />
              <span>دامنه‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center bg-red-50 data-[state=active]:bg-red-100">
              <Shield className="h-4 w-4 mr-2 text-red-600" />
              <span>امنیتی</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center bg-purple-50 data-[state=active]:bg-purple-100">
              <Network className="h-4 w-4 mr-2 text-purple-600" />
              <span>شبکه</span>
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center bg-orange-50 data-[state=active]:bg-orange-100">
              <Code className="h-4 w-4 mr-2 text-orange-600" />
              <span>سایر خدمات</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center bg-indigo-50 data-[state=active]:bg-indigo-100">
              <HeadphonesIcon className="h-4 w-4 mr-2 text-indigo-600" />
              <span>پشتیبانی آنلاین</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="web-hosting" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-blue-50 hover:bg-blue-100 border-blue-200" onClick={() => navigateToServiceOrderPage('/hosting?type=linux')}>
                <Database className="h-8 w-8 mb-2 text-blue-600" />
                <span>هاست لینوکس</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-blue-50 hover:bg-blue-100 border-blue-200" onClick={() => navigateToServiceOrderPage('/hosting?type=windows')}>
                <Database className="h-8 w-8 mb-2 text-blue-600" />
                <span>هاست ویندوز</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-blue-50 hover:bg-blue-100 border-blue-200" onClick={() => navigateToServiceOrderPage('/vps')}>
                <Server className="h-8 w-8 mb-2 text-blue-600" />
                <span>سرور مجازی</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-blue-50 hover:bg-blue-100 border-blue-200" onClick={() => navigateToServiceOrderPage('/dedicated')}>
                <HardDrive className="h-8 w-8 mb-2 text-blue-600" />
                <span>سرور اختصاصی</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-blue-50 hover:bg-blue-100 border-blue-200" onClick={() => navigateToServiceOrderPage('/cloud')}>
                <Cloud className="h-8 w-8 mb-2 text-blue-600" />
                <span>سرور ابری</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="domains" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-green-50 hover:bg-green-100 border-green-200" onClick={() => navigateToServiceOrderPage('/domain')}>
                <Globe className="h-8 w-8 mb-2 text-green-600" />
                <span>ثبت دامنه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-green-50 hover:bg-green-100 border-green-200" onClick={() => navigateToServiceOrderPage('/domain/transfer')}>
                <Globe className="h-8 w-8 mb-2 text-green-600" />
                <span>انتقال دامنه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-green-50 hover:bg-green-100 border-green-200" onClick={() => navigateToServiceOrderPage('/domain/renew')}>
                <Globe className="h-8 w-8 mb-2 text-green-600" />
                <span>تمدید دامنه</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-red-50 hover:bg-red-100 border-red-200" onClick={() => navigateToServiceOrderPage('/ssl')}>
                <Lock className="h-8 w-8 mb-2 text-red-600" />
                <span>گواهی SSL</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-red-50 hover:bg-red-100 border-red-200" onClick={() => navigateToServiceOrderPage('/security/antivirus')}>
                <Shield className="h-8 w-8 mb-2 text-red-600" />
                <span>آنتی ویروس</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-red-50 hover:bg-red-100 border-red-200" onClick={() => navigateToServiceOrderPage('/security/firewall')}>
                <Shield className="h-8 w-8 mb-2 text-red-600" />
                <span>فایروال</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-red-50 hover:bg-red-100 border-red-200" onClick={() => navigateToServiceOrderPage('/security/backup')}>
                <DownloadCloud className="h-8 w-8 mb-2 text-red-600" />
                <span>بکاپ گیری</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-purple-50 hover:bg-purple-100 border-purple-200" onClick={() => navigateToServiceOrderPage('/network/software')}>
                <Cpu className="h-8 w-8 mb-2 text-purple-600" />
                <span>نصب نرم افزار مدیریت شبکه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-purple-50 hover:bg-purple-100 border-purple-200" onClick={() => navigateToServiceOrderPage('/network/voip')}>
                <HeadphonesIcon className="h-8 w-8 mb-2 text-purple-600" />
                <span>خدمات VoIP</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-purple-50 hover:bg-purple-100 border-purple-200" onClick={() => navigateToServiceOrderPage('/network/config')}>
                <Network className="h-8 w-8 mb-2 text-purple-600" />
                <span>پیکربندی شبکه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-purple-50 hover:bg-purple-100 border-purple-200" onClick={() => navigateToServiceOrderPage('/network/monitoring')}>
                <Network className="h-8 w-8 mb-2 text-purple-600" />
                <span>مانیتورینگ شبکه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-purple-50 hover:bg-purple-100 border-purple-200" onClick={() => navigateToServiceOrderPage('/network/traffic')}>
                <Network className="h-8 w-8 mb-2 text-purple-600" />
                <span>ترافیک اضافه</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-orange-50 hover:bg-orange-100 border-orange-200" onClick={() => navigateToServiceOrderPage('/webdesign/template')}>
                <Code className="h-8 w-8 mb-2 text-orange-600" />
                <span>طراحی قالب سایت</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-orange-50 hover:bg-orange-100 border-orange-200" onClick={() => navigateToServiceOrderPage('/webdesign/templates')}>
                <Code className="h-8 w-8 mb-2 text-orange-600" />
                <span>فروش قالب‌های آماده</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-orange-50 hover:bg-orange-100 border-orange-200" onClick={() => navigateToServiceOrderPage('/design/logo')}>
                <Code className="h-8 w-8 mb-2 text-orange-600" />
                <span>طراحی لوگو</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-orange-50 hover:bg-orange-100 border-orange-200" onClick={() => navigateToServiceOrderPage('/seo')}>
                <Code className="h-8 w-8 mb-2 text-orange-600" />
                <span>خدمات سئو</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-indigo-50 hover:bg-indigo-100 border-indigo-200" onClick={() => navigateToServiceOrderPage('/tickets/new')}>
                <HeadphonesIcon className="h-8 w-8 mb-2 text-indigo-600" />
                <span>درخواست پشتیبانی آنلاین</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col bg-indigo-50 hover:bg-indigo-100 border-indigo-200" onClick={() => navigateToServiceOrderPage('/tickets')}>
                <HeadphonesIcon className="h-8 w-8 mb-2 text-indigo-600" />
                <span>تیکت‌های پشتیبانی</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceOrderSection;

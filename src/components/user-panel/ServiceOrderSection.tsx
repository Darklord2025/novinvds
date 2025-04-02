
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Database, Globe, Shield, Network, Code } from 'lucide-react';

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
            <TabsTrigger value="web-hosting" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              <span>میزبانی وب</span>
            </TabsTrigger>
            <TabsTrigger value="domains" className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span>دامنه‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>امنیتی</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center">
              <Network className="h-4 w-4 mr-2" />
              <span>شبکه</span>
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              <span>سایر خدمات</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center">
              <Server className="h-4 w-4 mr-2" />
              <span>پشتیبانی آنلاین</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="web-hosting" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/hosting?type=linux')}>
                <Database className="h-8 w-8 mb-2" />
                <span>هاست لینوکس</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/hosting?type=windows')}>
                <Database className="h-8 w-8 mb-2" />
                <span>هاست ویندوز</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/vps')}>
                <Server className="h-8 w-8 mb-2" />
                <span>سرور مجازی</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/dedicated')}>
                <Server className="h-8 w-8 mb-2" />
                <span>سرور اختصاصی</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/cloud')}>
                <Server className="h-8 w-8 mb-2" />
                <span>سرور ابری</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="domains" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/domain')}>
                <Globe className="h-8 w-8 mb-2" />
                <span>ثبت دامنه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/domain/transfer')}>
                <Globe className="h-8 w-8 mb-2" />
                <span>انتقال دامنه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/domain/renew')}>
                <Globe className="h-8 w-8 mb-2" />
                <span>تمدید دامنه</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/ssl')}>
                <Shield className="h-8 w-8 mb-2" />
                <span>گواهی SSL</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/security/antivirus')}>
                <Shield className="h-8 w-8 mb-2" />
                <span>آنتی ویروس</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/security/firewall')}>
                <Shield className="h-8 w-8 mb-2" />
                <span>فایروال</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/security/backup')}>
                <Shield className="h-8 w-8 mb-2" />
                <span>بکاپ گیری</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/network/software')}>
                <Network className="h-8 w-8 mb-2" />
                <span>نصب نرم افزار مدیریت شبکه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/network/voip')}>
                <Network className="h-8 w-8 mb-2" />
                <span>خدمات VoIP</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/network/config')}>
                <Network className="h-8 w-8 mb-2" />
                <span>پیکربندی شبکه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/network/monitoring')}>
                <Network className="h-8 w-8 mb-2" />
                <span>مانیتورینگ شبکه</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/network/traffic')}>
                <Network className="h-8 w-8 mb-2" />
                <span>ترافیک اضافه</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/webdesign/template')}>
                <Code className="h-8 w-8 mb-2" />
                <span>طراحی قالب سایت</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/webdesign/templates')}>
                <Code className="h-8 w-8 mb-2" />
                <span>فروش قالب‌های آماده</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/design/logo')}>
                <Code className="h-8 w-8 mb-2" />
                <span>طراحی لوگو</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/seo')}>
                <Code className="h-8 w-8 mb-2" />
                <span>خدمات سئو</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/tickets/new')}>
                <Server className="h-8 w-8 mb-2" />
                <span>درخواست پشتیبانی آنلاین</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => navigateToServiceOrderPage('/tickets')}>
                <Server className="h-8 w-8 mb-2" />
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

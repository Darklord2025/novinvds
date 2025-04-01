
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCards from "./DashboardCards";
import ServerList from "./ServerList";
import ActivityFeed from "./ActivityFeed";

// Define the types for dashboard props
interface ServiceCategory {
  title: string;
  services: Array<{
    name: string;
    link: string;
  }>;
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
  serviceCategories: ServiceCategory[];
  navigateToServiceOrderPage: (serviceLink: string) => void;
  operatingSystems?: OperatingSystems;
}

const Dashboard = ({ serviceCategories, navigateToServiceOrderPage, operatingSystems }: DashboardProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">داشبورد</h1>
      
      <DashboardCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="servers">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="servers">سرورهای مجازی</TabsTrigger>
              <TabsTrigger value="domains">دامنه‌ها</TabsTrigger>
              <TabsTrigger value="hosting">هاستینگ</TabsTrigger>
            </TabsList>
            <TabsContent value="servers" className="mt-6">
              <ServerList type="vps" />
            </TabsContent>
            <TabsContent value="domains" className="mt-6">
              <ServerList type="domain" />
            </TabsContent>
            <TabsContent value="hosting" className="mt-6">
              <ServerList type="hosting" />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>سفارش سرویس جدید</CardTitle>
            <CardDescription>
              سرویس جدیدی سفارش دهید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceCategories.slice(0, 3).map((category, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold mb-2">{category.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {category.services.slice(0, 4).map((service, serviceIndex) => (
                      <Button 
                        key={serviceIndex} 
                        variant="outline" 
                        className="justify-start text-sm h-auto py-2"
                        onClick={() => navigateToServiceOrderPage(service.link)}
                      >
                        {service.name}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
              <Button className="w-full" onClick={() => window.open('/services', '_blank')}>
                مشاهده همه خدمات
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
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
                <Button className="w-full" variant="outline" onClick={() => window.open('/tickets', '_blank')}>
                  مشاهده همه تیکت‌ها
                </Button>
                <Button className="w-full mt-2" onClick={() => window.open('/tickets/new', '_blank')}>
                  ارسال تیکت جدید
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
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
                <span className="text-xs font-semibold">پرداخت نشده</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 text-green-700 rounded-md">
                <span className="text-sm font-medium">INV-1233</span>
                <span className="text-xs">1402/04/01</span>
                <span className="text-xs font-semibold">پرداخت شده</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 text-green-700 rounded-md">
                <span className="text-sm font-medium">INV-1232</span>
                <span className="text-xs">1402/03/15</span>
                <span className="text-xs font-semibold">پرداخت شده</span>
              </div>
              
              <Button className="w-full mt-2" variant="outline" onClick={() => window.open('/invoices', '_blank')}>
                مشاهده همه فاکتورها
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

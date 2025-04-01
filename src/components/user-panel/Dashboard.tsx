
import React from 'react';
import ServerList from './ServerList';
import DashboardCards from './DashboardCards';
import ActivityFeed from './ActivityFeed';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Server, HardDrive, Cloud, Database, Globe, ShieldCheck } from 'lucide-react';

interface ServiceCategory {
  title: string;
  services: Array<{ name: string; link: string }>;
}

interface DashboardProps {
  serviceCategories?: ServiceCategory[];
}

const Dashboard = ({ serviceCategories = [] }: DashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">داشبورد</h1>
        <Button variant="outline">بروزرسانی</Button>
      </div>

      <DashboardCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="active">سرویس‌های فعال</TabsTrigger>
              <TabsTrigger value="pending">در انتظار راه‌اندازی</TabsTrigger>
              <TabsTrigger value="expired">منقضی شده</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <ServerList />
            </TabsContent>
            <TabsContent value="pending">
              <ServerList />
            </TabsContent>
            <TabsContent value="expired">
              <ServerList />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <ActivityFeed />
        </div>
      </div>
      
      {/* بخش سفارش سرویس جدید */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>سفارش سرویس جدید</CardTitle>
          <CardDescription>
            از میان خدمات متنوع نوین وی‌دی‌اس، سرویس مورد نظر خود را انتخاب کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-blue-600 h-auto py-6 flex flex-col items-center justify-center">
              <Server className="h-8 w-8 mb-2" />
              <span>سرور مجازی</span>
            </Button>
            <Button className="bg-purple-600 h-auto py-6 flex flex-col items-center justify-center">
              <HardDrive className="h-8 w-8 mb-2" />
              <span>سرور اختصاصی</span>
            </Button>
            <Button className="bg-green-600 h-auto py-6 flex flex-col items-center justify-center">
              <Cloud className="h-8 w-8 mb-2" />
              <span>سرور ابری</span>
            </Button>
            <Button className="bg-amber-600 h-auto py-6 flex flex-col items-center justify-center">
              <Database className="h-8 w-8 mb-2" />
              <span>هاستینگ</span>
            </Button>
            <Button className="bg-cyan-600 h-auto py-6 flex flex-col items-center justify-center">
              <Globe className="h-8 w-8 mb-2" />
              <span>دامنه</span>
            </Button>
            <Button className="bg-rose-600 h-auto py-6 flex flex-col items-center justify-center">
              <ShieldCheck className="h-8 w-8 mb-2" />
              <span>گواهی SSL</span>
            </Button>
          </div>
          
          {serviceCategories.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceCategories.map((category, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>
                        <a 
                          href={service.link}
                          className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <span>{service.name}</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Globe, Database, HardDrive, Shield, Network, Code, Headset, LayoutTemplate, Monitor } from "lucide-react";

interface ServiceOrder {
  id: number;
  title: string;
  date: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ServiceOrderSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vps');

  const serviceOrders: ServiceOrder[] = [
    { id: 1, title: 'سرور مجازی آمریکا', date: '2024-01-20', status: 'active', icon: Server },
    { id: 2, title: 'هاست لینوکس', date: '2023-12-15', status: 'completed', icon: Globe },
    { id: 3, title: 'دیتابیس', date: '2024-02-01', status: 'pending', icon: Database },
    { id: 4, title: 'فضای ذخیره سازی', date: '2024-01-25', status: 'cancelled', icon: HardDrive },
    { id: 5, title: 'لایسنس امنیتی', date: '2024-02-10', status: 'active', icon: Shield },
    { id: 6, title: 'سرویس شبکه', date: '2024-01-30', status: 'completed', icon: Network },
    { id: 7, title: 'لایسنس توسعه', date: '2024-02-15', status: 'pending', icon: Code },
    { id: 8, title: 'پشتیبانی فنی', date: '2024-02-20', status: 'active', icon: Headset },
    { id: 9, title: 'قالب سایت', date: '2024-02-25', status: 'completed', icon: LayoutTemplate },
    { id: 10, title: 'مانیتورینگ سرور', date: '2024-03-01', status: 'active', icon: Monitor },
  ];

  const filteredOrders = (type: string) => serviceOrders.filter(order => order.title.toLowerCase().includes(type));

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">سفارشات خدمات</h2>

      <Tabs defaultValue="vps" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="vps">سرور مجازی</TabsTrigger>
          <TabsTrigger value="hosting">هاستینگ</TabsTrigger>
          <TabsTrigger value="database">دیتابیس</TabsTrigger>
          <TabsTrigger value="other">سایر خدمات</TabsTrigger>
        </TabsList>
        <TabsContent value="vps">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders('سرور مجازی').map(order => (
              <Card key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <order.icon className="text-blue-500 mr-2" size={20} />
                      <h3 className="text-lg font-semibold">{order.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      order.status === 'active' ? 'bg-green-100 text-green-600' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          order.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                    }`}>{
                        order.status === 'active' ? 'فعال' :
                          order.status === 'pending' ? 'در انتظار' :
                            order.status === 'completed' ? 'تکمیل شده' :
                              'لغو شده'
                      }</span>
                  </div>
                  <p className="text-gray-600 text-sm">تاریخ سفارش: {order.date}</p>
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <Link to={`/order/${order.id}`}>مشاهده جزئیات</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="hosting">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders('هاست').map(order => (
              <Card key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <order.icon className="text-blue-500 mr-2" size={20} />
                      <h3 className="text-lg font-semibold">{order.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      order.status === 'active' ? 'bg-green-100 text-green-600' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          order.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                    }`}>{
                        order.status === 'active' ? 'فعال' :
                          order.status === 'pending' ? 'در انتظار' :
                            order.status === 'completed' ? 'تکمیل شده' :
                              'لغو شده'
                      }</span>
                  </div>
                  <p className="text-gray-600 text-sm">تاریخ سفارش: {order.date}</p>
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <Link to={`/order/${order.id}`}>مشاهده جزئیات</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="database">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders('دیتابیس').map(order => (
              <Card key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <order.icon className="text-blue-500 mr-2" size={20} />
                      <h3 className="text-lg font-semibold">{order.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      order.status === 'active' ? 'bg-green-100 text-green-600' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          order.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                    }`}>{
                        order.status === 'active' ? 'فعال' :
                          order.status === 'pending' ? 'در انتظار' :
                            order.status === 'completed' ? 'تکمیل شده' :
                              'لغو شده'
                      }</span>
                  </div>
                  <p className="text-gray-600 text-sm">تاریخ سفارش: {order.date}</p>
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <Link to={`/order/${order.id}`}>مشاهده جزئیات</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="other">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceOrders.filter(order => !order.title.toLowerCase().includes('سرور مجازی') && !order.title.toLowerCase().includes('هاست') && !order.title.toLowerCase().includes('دیتابیس')).map(order => (
              <Card key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <order.icon className="text-blue-500 mr-2" size={20} />
                      <h3 className="text-lg font-semibold">{order.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      order.status === 'active' ? 'bg-green-100 text-green-600' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          order.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                    }`}>{
                        order.status === 'active' ? 'فعال' :
                          order.status === 'pending' ? 'در انتظار' :
                            order.status === 'completed' ? 'تکمیل شده' :
                              'لغو شده'
                      }</span>
                  </div>
                  <p className="text-gray-600 text-sm">تاریخ سفارش: {order.date}</p>
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <Link to={`/order/${order.id}`}>مشاهده جزئیات</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ServiceOrderSection;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Server, HardDrive, Globe, Database, Cloud } from 'lucide-react';

interface ServicesPageProps {
  serviceType: string;
}

const ServicesPage = ({ serviceType }: ServicesPageProps) => {
  const [statusFilter, setStatusFilter] = useState('all');

  const getServiceTitle = () => {
    switch (serviceType) {
      case 'servers': return 'سرورهای مجازی';
      case 'dedicated': return 'سرورهای اختصاصی';
      case 'domains': return 'دامنه‌ها';
      case 'hosting': return 'هاستینگ';
      case 'cloud': return 'سرور ابری';
      default: return 'خدمات';
    }
  };

  const getServiceIcon = () => {
    switch (serviceType) {
      case 'servers': return <Server className="h-6 w-6 text-blue-500" />;
      case 'dedicated': return <HardDrive className="h-6 w-6 text-purple-500" />;
      case 'domains': return <Globe className="h-6 w-6 text-green-500" />;
      case 'hosting': return <Database className="h-6 w-6 text-yellow-500" />;
      case 'cloud': return <Cloud className="h-6 w-6 text-indigo-500" />;
      default: return <Server className="h-6 w-6 text-blue-500" />;
    }
  };

  // Sample data for services
  const getServices = () => {
    if (serviceType === 'domains') {
      return [
        { id: '1', name: 'novinvds.com', status: 'active', expiryDate: '1403/05/12', autoRenew: true },
        { id: '2', name: 'novinvds.ir', status: 'active', expiryDate: '1403/04/20', autoRenew: true },
        { id: '3', name: 'novinvds.net', status: 'expired', expiryDate: '1402/09/10', autoRenew: false },
      ];
    } else if (serviceType === 'servers' || serviceType === 'dedicated' || serviceType === 'cloud') {
      return [
        { id: '1', name: 'سرور لینوکس A', location: 'تهران', status: 'active', ip: '185.xx.xx.1', expiryDate: '1403/02/15' },
        { id: '2', name: 'سرور ویندوز B', location: 'آلمان', status: 'suspended', ip: '45.xx.xx.2', expiryDate: '1402/12/10' },
      ];
    } else {
      return [
        { id: '1', name: 'هاستینگ وردپرس', status: 'active', domain: 'novinvds.com', expiryDate: '1403/06/22' },
        { id: '2', name: 'هاستینگ ایمیل', status: 'pending', domain: 'mail.novinvds.ir', expiryDate: '1403/04/05' },
      ];
    }
  };

  const services = getServices();
  const filteredServices = statusFilter === 'all' ? services : services.filter(s => s.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">فعال</Badge>;
      case 'suspended':
        return <Badge className="bg-yellow-500">معلق</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">منقضی شده</Badge>;
      case 'pending':
        return <Badge className="bg-blue-500">در انتظار</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderDomainList = () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">دامنه</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ انقضا</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تمدید خودکار</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredServices.map((domain) => (
          <tr key={domain.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{domain.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(domain.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{domain.expiryDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {domain.autoRenew ? 
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">فعال</Badge> : 
                <Badge variant="outline">غیرفعال</Badge>
              }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <Button variant="outline" size="sm">مدیریت</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderServerList = () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام سرور</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">دیتاسنتر</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ انقضا</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredServices.map((server) => (
          <tr key={server.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{server.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(server.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.ip}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.location}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.expiryDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex space-x-2 space-x-reverse">
                <Button variant="outline" size="sm">مدیریت</Button>
                <Button variant="outline" size="sm" className="text-blue-600">تمدید</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderHostingList = () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">محصول</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">دامنه</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ انقضا</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredServices.map((hosting) => (
          <tr key={hosting.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{hosting.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(hosting.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hosting.domain}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hosting.expiryDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex space-x-2 space-x-reverse">
                <Button variant="outline" size="sm">مدیریت</Button>
                <Button variant="outline" size="sm" className="text-blue-600">کنترل پنل</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {getServiceIcon()}
          <h1 className="text-2xl font-bold mr-2">{getServiceTitle()}</h1>
        </div>
        <Button className="bg-blue-600">+ سفارش جدید</Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>مدیریت {getServiceTitle()}</CardTitle>
          <CardDescription>
            لیست {getServiceTitle()} شما و وضعیت آنها
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="active">فعال</TabsTrigger>
              <TabsTrigger value="suspended">معلق</TabsTrigger>
              <TabsTrigger value="expired">منقضی شده</TabsTrigger>
              <TabsTrigger value="pending">در انتظار</TabsTrigger>
            </TabsList>
            
            <TabsContent value={statusFilter} className="mt-0">
              <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
                {filteredServices.length > 0 ? (
                  serviceType === 'domains' ? renderDomainList() :
                  (serviceType === 'servers' || serviceType === 'dedicated' || serviceType === 'cloud') ? renderServerList() :
                  renderHostingList()
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>هیچ سرویسی با این وضعیت یافت نشد.</p>
                    <Button className="mt-4 bg-blue-600">سفارش {getServiceTitle()}</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesPage;

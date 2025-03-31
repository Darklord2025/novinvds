
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HardDrive, Server, Globe, Database, Cloud } from 'lucide-react';

type ServiceTypes = 'servers' | 'dedicated' | 'domains' | 'hosting' | 'cloud';

type BaseService = {
  id: string;
  name: string;
  status: string;
  expiryDate: string;
};

type VpsService = BaseService & {
  location: string;
  ip: string;
};

type DomainService = BaseService & {
  domain: string;
};

type DomainWithRenewal = BaseService & {
  autoRenew: boolean;
};

type Service = VpsService | DomainService | DomainWithRenewal;

interface ServicesPageProps {
  serviceType: string;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ serviceType }) => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'VPS سرور لینوکس',
      location: 'آلمان',
      status: 'active',
      ip: '152.89.125.156',
      expiryDate: '2024/06/25',
    },
    {
      id: '2',
      name: 'VPS سرور ویندوز',
      location: 'هلند',
      status: 'active',
      ip: '185.231.59.87',
      expiryDate: '2024/05/12',
    },
    {
      id: '3',
      name: 'سرور اختصاصی',
      location: 'فرانسه',
      status: 'suspended',
      ip: '89.145.172.23',
      expiryDate: '2024/02/05',
    },
    {
      id: '4',
      name: 'novinvds.com',
      status: 'active',
      domain: 'novinvds.com',
      expiryDate: '2025/01/15',
    },
    {
      id: '5',
      name: 'novinvds.ir',
      status: 'active',
      domain: 'novinvds.ir',
      expiryDate: '2024/08/20',
    },
    {
      id: '6',
      name: 'هاست لینوکس',
      status: 'active',
      expiryDate: '2024/09/10',
      autoRenew: true,
    },
    {
      id: '7',
      name: 'هاست ویندوز',
      status: 'active',
      expiryDate: '2024/11/30',
      autoRenew: false,
    },
    {
      id: '8',
      name: 'سرور ابری',
      location: 'آلمان',
      status: 'active',
      ip: '176.54.128.93',
      expiryDate: '2024/12/15',
    },
  ]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">فعال</Badge>;
      case 'suspended':
        return <Badge className="bg-yellow-500">معلق</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">منقضی شده</Badge>;
      default:
        return <Badge className="bg-gray-500">نامشخص</Badge>;
    }
  };
  
  const mapServiceTypeToTab = (type: string): ServiceTypes => {
    switch (type) {
      case 'servers': return 'servers';
      case 'dedicated': return 'dedicated';
      case 'domains': return 'domains';
      case 'hosting': return 'hosting';
      case 'cloud': return 'cloud';
      default: return 'servers';
    }
  };
  
  const [activeTab, setActiveTab] = useState<ServiceTypes>(mapServiceTypeToTab(serviceType));
  
  const filteredServices = services.filter(service => {
    if (activeTab === 'servers' && 'ip' in service && !('domain' in service)) {
      return true;
    }
    if (activeTab === 'dedicated' && 'ip' in service && service.name.includes('اختصاصی')) {
      return true;
    }
    if (activeTab === 'domains' && 'domain' in service) {
      return true;
    }
    if (activeTab === 'hosting' && 'autoRenew' in service) {
      return true;
    }
    if (activeTab === 'cloud' && 'ip' in service && service.name.includes('ابری')) {
      return true;
    }
    return false;
  });
  
  const getRenderContent = (service: Service) => {
    if ('domain' in service) {
      return (
        <div className="flex justify-between items-center p-4 border rounded-lg mb-3">
          <div>
            <h3 className="font-medium">{service.name}</h3>
            <p className="text-sm text-gray-500">دامنه: {service.domain}</p>
            <p className="text-sm text-gray-500">تاریخ انقضا: {service.expiryDate}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(service.status)}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">مدیریت DNS</Button>
              <Button variant="outline" size="sm">تمدید</Button>
            </div>
          </div>
        </div>
      );
    } else if ('ip' in service) {
      return (
        <div className="flex justify-between items-center p-4 border rounded-lg mb-3">
          <div>
            <h3 className="font-medium">{service.name}</h3>
            <p className="text-sm text-gray-500">IP: {service.ip}</p>
            <p className="text-sm text-gray-500">موقعیت: {service.location}</p>
            <p className="text-sm text-gray-500">تاریخ انقضا: {service.expiryDate}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(service.status)}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">مدیریت سرور</Button>
              <Button variant="outline" size="sm">تمدید</Button>
            </div>
          </div>
        </div>
      );
    } else if ('autoRenew' in service) {
      return (
        <div className="flex justify-between items-center p-4 border rounded-lg mb-3">
          <div>
            <h3 className="font-medium">{service.name}</h3>
            <p className="text-sm text-gray-500">تاریخ انقضا: {service.expiryDate}</p>
            <p className="text-sm text-gray-500">تمدید خودکار: {service.autoRenew ? 'فعال' : 'غیرفعال'}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(service.status)}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">کنترل پنل</Button>
              <Button variant="outline" size="sm">تمدید</Button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getServiceIcon = (tab: ServiceTypes) => {
    switch (tab) {
      case 'servers': return <Server className="h-5 w-5" />;
      case 'dedicated': return <HardDrive className="h-5 w-5" />;
      case 'domains': return <Globe className="h-5 w-5" />;
      case 'hosting': return <Database className="h-5 w-5" />;
      case 'cloud': return <Cloud className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">سرویس‌های من</h2>
        <Button>سفارش سرویس جدید</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ServiceTypes)}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="servers" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>سرورهای مجازی</span>
          </TabsTrigger>
          <TabsTrigger value="dedicated" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span>سرورهای اختصاصی</span>
          </TabsTrigger>
          <TabsTrigger value="cloud" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            <span>سرورهای ابری</span>
          </TabsTrigger>
          <TabsTrigger value="hosting" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>هاستینگ</span>
          </TabsTrigger>
          <TabsTrigger value="domains" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>دامنه‌ها</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="servers" className="space-y-4">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div key={service.id}>{getRenderContent(service)}</div>
            ))
          ) : (
            <div className="text-center py-10">
              <Server className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">هیچ سرور مجازی یافت نشد</h3>
              <p className="mt-1 text-gray-500">برای سفارش سرور مجازی جدید کلیک کنید</p>
              <Button className="mt-4">سفارش سرور مجازی</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="dedicated" className="space-y-4">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div key={service.id}>{getRenderContent(service)}</div>
            ))
          ) : (
            <div className="text-center py-10">
              <HardDrive className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">هیچ سرور اختصاصی یافت نشد</h3>
              <p className="mt-1 text-gray-500">برای سفارش سرور اختصاصی جدید کلیک کنید</p>
              <Button className="mt-4">سفارش سرور اختصاصی</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cloud" className="space-y-4">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div key={service.id}>{getRenderContent(service)}</div>
            ))
          ) : (
            <div className="text-center py-10">
              <Cloud className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">هیچ سرور ابری یافت نشد</h3>
              <p className="mt-1 text-gray-500">برای سفارش سرور ابری جدید کلیک کنید</p>
              <Button className="mt-4">سفارش سرور ابری</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hosting" className="space-y-4">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div key={service.id}>{getRenderContent(service)}</div>
            ))
          ) : (
            <div className="text-center py-10">
              <Database className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">هیچ هاستینگی یافت نشد</h3>
              <p className="mt-1 text-gray-500">برای سفارش هاستینگ جدید کلیک کنید</p>
              <Button className="mt-4">سفارش هاستینگ</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="domains" className="space-y-4">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div key={service.id}>{getRenderContent(service)}</div>
            ))
          ) : (
            <div className="text-center py-10">
              <Globe className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">هیچ دامنه‌ای یافت نشد</h3>
              <p className="mt-1 text-gray-500">برای ثبت دامنه جدید کلیک کنید</p>
              <Button className="mt-4">ثبت دامنه</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesPage;

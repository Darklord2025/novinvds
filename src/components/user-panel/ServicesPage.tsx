import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HardDrive, Server, Globe, Database, Cloud, ExternalLink, RefreshCw, Play, Cpu, MemoryStick, Zap } from 'lucide-react';

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
  isCloud?: boolean;
  resources?: {
    cpu: number;
    ram: number;
    disk: number;
    bandwidth: number;
  };
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'VPS سرور لینوکس',
      location: 'آلمان',
      status: 'active',
      ip: '152.89.125.156',
      expiryDate: '2024/06/25',
      resources: {
        cpu: 2,
        ram: 4,
        disk: 50,
        bandwidth: 2
      }
    },
    {
      id: '2',
      name: 'VPS سرور ویندوز',
      location: 'هلند',
      status: 'active',
      ip: '185.231.59.87',
      expiryDate: '2024/05/12',
      resources: {
        cpu: 4,
        ram: 8,
        disk: 100,
        bandwidth: 5
      }
    },
    {
      id: '3',
      name: 'سرور اختصاصی',
      location: 'فرانسه',
      status: 'suspended',
      ip: '89.145.172.23',
      expiryDate: '2024/02/05',
      resources: {
        cpu: 8,
        ram: 32,
        disk: 1000,
        bandwidth: 50
      }
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
      name: 'سرور ابری اقتصادی',
      location: 'آلمان',
      status: 'active',
      ip: '176.54.128.93',
      expiryDate: '2024/12/15',
      isCloud: true,
      resources: {
        cpu: 2,
        ram: 4,
        disk: 80,
        bandwidth: 3
      }
    },
    {
      id: '9',
      name: 'سرور ابری حرفه‌ای',
      location: 'هلند',
      status: 'active',
      ip: '188.132.65.74',
      expiryDate: '2024/11/05',
      isCloud: true,
      resources: {
        cpu: 6,
        ram: 16,
        disk: 250,
        bandwidth: 10
      }
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
    if (activeTab === 'servers' && 'ip' in service && !('domain' in service) && !service.isCloud) {
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
    if (activeTab === 'cloud' && 'ip' in service && service.isCloud) {
      return true;
    }
    return false;
  });
  
  const openManagementPage = (service: Service) => {
    setSelectedService(service);
  };
  
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
              <Button variant="outline" size="sm" onClick={() => openManagementPage(service)}>
                مدیریت DNS
              </Button>
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
            {service.resources && (
              <div className="flex gap-6 mt-2">
                <span className="flex items-center text-sm text-gray-600">
                  <Cpu className="h-4 w-4 ml-1" />
                  {service.resources.cpu} هسته
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <MemoryStick className="h-4 w-4 ml-1" />
                  {service.resources.ram} GB
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Database className="h-4 w-4 ml-1" />
                  {service.resources.disk} GB
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 ml-1" />
                  {service.resources.bandwidth} TB
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(service.status)}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => openManagementPage(service)}>
                مدیریت سرور
              </Button>
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
              <Button variant="outline" size="sm" onClick={() => openManagementPage(service)}>
                کنترل پنل
              </Button>
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
      
      {/* Service Management Dialog */}
      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedService.name} - مدیریت سرویس
              </DialogTitle>
              <DialogDescription>
                از این بخش می‌توانید سرویس خود را مدیریت کنید
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 p-4">
              {'ip' in selectedService ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">آدرس IP</p>
                      <p className="font-medium">{selectedService.ip}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">موقعیت</p>
                      <p className="font-medium">{selectedService.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">وضعیت</p>
                      <p className="font-medium">{selectedService.status === 'active' ? 'فعال' : selectedService.status === 'suspended' ? 'معلق' : 'منقضی شده'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">تاریخ انقضا</p>
                      <p className="font-medium">{selectedService.expiryDate}</p>
                    </div>
                  </div>
                  
                  {selectedService.resources && (
                    <div>
                      <h3 className="font-medium mb-3">منابع سرور</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg flex flex-col items-center">
                          <Cpu className="h-8 w-8 text-blue-500 mb-2" />
                          <p className="text-sm text-gray-600">پردازنده</p>
                          <p className="font-bold">{selectedService.resources.cpu} هسته</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center">
                          <MemoryStick className="h-8 w-8 text-green-500 mb-2" />
                          <p className="text-sm text-gray-600">حافظه</p>
                          <p className="font-bold">{selectedService.resources.ram} گیگابایت</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg flex flex-col items-center">
                          <Database className="h-8 w-8 text-purple-500 mb-2" />
                          <p className="text-sm text-gray-600">فضای ذخیره‌سازی</p>
                          <p className="font-bold">{selectedService.resources.disk} گیگابایت</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg flex flex-col items-center">
                          <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                          <p className="text-sm text-gray-600">پهنای باند</p>
                          <p className="font-bold">{selectedService.resources.bandwidth} ترابایت</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-3">عملیات سرور</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button className="bg-green-600">
                        <Play className="ml-2 h-4 w-4" />
                        روشن کردن
                      </Button>
                      <Button variant="outline">
                        راه‌اندازی مجدد
                      </Button>
                      <Button variant="outline">
                        خاموش کردن
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="ml-2 h-4 w-4" />
                        بازسازی
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-3">دسترسی به سرور</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        کنسول VNC
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        کنترل پنل مدیریت
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        تنظیمات DNS
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مانیتورینگ
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        بکاپ و بازیابی
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        فایروال
                      </Button>
                    </div>
                  </div>
                </div>
              ) : 'domain' in selectedService ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">نام دامنه</p>
                      <p className="font-medium">{selectedService.domain}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">وضعیت</p>
                      <p className="font-medium">{selectedService.status === 'active' ? 'فعال' : selectedService.status === 'suspended' ? 'معلق' : 'منقضی شده'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">تاریخ انقضا</p>
                      <p className="font-medium">{selectedService.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-3">مدیریت دامنه</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت رکوردهای DNS
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت انتقال دامنه
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت Nameserver
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت WHOIS
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        فعال/غیرفعال سازی قفل دامنه
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت تمدید خودکار
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">نام سرویس</p>
                      <p className="font-medium">{selectedService.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">وضعیت</p>
                      <p className="font-medium">{selectedService.status === 'active' ? 'فعال' : selectedService.status === 'suspended' ? 'معلق' : 'منقضی شده'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">تاریخ انقضا</p>
                      <p className="font-medium">{selectedService.expiryDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">تمدید خودکار</p>
                      <p className="font-medium">{'autoRenew' in selectedService && (selectedService.autoRenew ? 'فعال' : 'غیرفعال')}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-3">مدیریت هاستینگ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        ورود به کنترل پنل
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت ایمیل
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت دیتابیس
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت ساب‌دامین‌ها
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت دامنه‌های اضافی
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مدیریت SSL
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ServicesPage;

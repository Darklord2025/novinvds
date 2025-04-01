
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Server, HardDrive, Database, Clock, AlertTriangle, Power, PowerOff, RotateCw, Trash2, Edit, ExternalLink, Plus } from 'lucide-react';

interface OperatingSystem {
  id: string;
  name: string;
}

interface OperatingSystems {
  linux: OperatingSystem[];
  windows: OperatingSystem[];
  specialized: OperatingSystem[];
}

export interface ServicesPageProps {
  serviceType: string;
  operatingSystems?: OperatingSystems;
}

const ServicesPage = ({ serviceType, operatingSystems }: ServicesPageProps) => {
  const [view, setView] = useState('active');
  const [filter, setFilter] = useState('all');
  
  // Mock data for services
  const services = {
    servers: [
      {
        id: 'VPS-1001',
        name: 'Ubuntu Server',
        status: 'active',
        details: {
          os: 'Ubuntu 20.04 LTS',
          cpu: '2 vCPU',
          ram: '4 GB',
          storage: '80 GB SSD',
          ip: '123.456.789.101',
          location: 'تهران',
          bandwidth: '500 GB',
          price: 1250000,
          nextPayment: '1402/05/15'
        }
      },
      {
        id: 'VPS-1002',
        name: 'Windows Server',
        status: 'active',
        details: {
          os: 'Windows Server 2019',
          cpu: '4 vCPU',
          ram: '8 GB',
          storage: '120 GB SSD',
          ip: '123.456.789.102',
          location: 'تهران',
          bandwidth: '1 TB',
          price: 2750000,
          nextPayment: '1402/05/20'
        }
      },
      {
        id: 'VPS-1003',
        name: 'Development Server',
        status: 'suspended',
        details: {
          os: 'CentOS 8',
          cpu: '1 vCPU',
          ram: '2 GB',
          storage: '40 GB SSD',
          ip: '123.456.789.103',
          location: 'تهران',
          bandwidth: '300 GB',
          price: 850000,
          nextPayment: '1402/04/25'
        }
      }
    ],
    dedicated: [
      {
        id: 'DED-501',
        name: 'High Performance',
        status: 'active',
        details: {
          cpu: 'Intel Xeon E5-2680 v4',
          cores: '14 Cores / 28 Threads',
          ram: '64 GB DDR4',
          storage: '2 × 1TB SSD NVMe',
          ip: '185.165.169.12',
          location: 'تهران',
          bandwidth: '20 TB',
          price: 12500000,
          nextPayment: '1402/06/15'
        }
      }
    ],
    hosting: [
      {
        id: 'HST-2001',
        name: 'شرکتی پلاس',
        status: 'active',
        details: {
          type: 'Linux Hosting',
          storage: '25 GB SSD',
          bandwidth: 'نامحدود',
          domainCount: '5',
          databaseCount: '10',
          price: 2200000,
          nextPayment: '1402/07/10'
        }
      },
      {
        id: 'HST-2002',
        name: 'فروشگاهی',
        status: 'active',
        details: {
          type: 'Linux Hosting',
          storage: '10 GB SSD',
          bandwidth: 'نامحدود',
          domainCount: '1',
          databaseCount: '3',
          price: 950000,
          nextPayment: '1402/05/25'
        }
      }
    ],
    domains: [
      {
        id: 'DOM-5001',
        name: 'example.com',
        status: 'active',
        details: {
          registrar: 'نوین وی‌دی‌اس',
          registrationDate: '1400/05/15',
          expiryDate: '1402/05/15',
          autoRenew: true,
          nameservers: ['ns1.novinvds.ir', 'ns2.novinvds.ir'],
          price: 650000,
          nextPayment: '1402/05/15'
        }
      },
      {
        id: 'DOM-5002',
        name: 'example.net',
        status: 'active',
        details: {
          registrar: 'نوین وی‌دی‌اس',
          registrationDate: '1401/02/10',
          expiryDate: '1402/02/10',
          autoRenew: true,
          nameservers: ['ns1.novinvds.ir', 'ns2.novinvds.ir'],
          price: 850000,
          nextPayment: '1402/02/10'
        }
      },
      {
        id: 'DOM-5003',
        name: 'example.org',
        status: 'expired',
        details: {
          registrar: 'نوین وی‌دی‌اس',
          registrationDate: '1400/10/05',
          expiryDate: '1401/10/05',
          autoRenew: false,
          nameservers: ['ns1.novinvds.ir', 'ns2.novinvds.ir'],
          price: 750000,
          nextPayment: 'منقضی شده'
        }
      }
    ],
    cloud: [
      {
        id: 'CLD-301',
        name: 'Cloud Server Pro',
        status: 'active',
        details: {
          cores: '8 vCPU',
          ram: '16 GB',
          storage: '250 GB SSD',
          backupStorage: '500 GB',
          location: 'تهران',
          bandwidth: '5 TB',
          price: 4500000,
          nextPayment: '1402/08/15'
        }
      }
    ]
  };
  
  // Get the appropriate services based on the serviceType
  const getServices = () => {
    switch (serviceType) {
      case 'servers':
        return services.servers;
      case 'dedicated':
        return services.dedicated;
      case 'hosting':
        return services.hosting;
      case 'domains':
        return services.domains;
      case 'cloud':
        return services.cloud;
      default:
        return [];
    }
  };
  
  // Filter services based on status
  const filteredServices = getServices().filter(service => {
    if (view === 'active') return service.status === 'active';
    if (view === 'suspended') return service.status === 'suspended';
    if (view === 'expired') return service.status === 'expired';
    return true;
  });
  
  // Get service type title for display
  const getServiceTypeTitle = () => {
    switch (serviceType) {
      case 'servers':
        return 'سرورهای مجازی';
      case 'dedicated':
        return 'سرورهای اختصاصی';
      case 'hosting':
        return 'هاستینگ';
      case 'domains':
        return 'دامنه‌ها';
      case 'cloud':
        return 'سرور ابری';
      default:
        return 'سرویس‌ها';
    }
  };
  
  // Get status badge component
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">فعال</Badge>;
      case 'suspended':
        return <Badge className="bg-amber-500">معلق</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">منقضی شده</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Get service card based on service type
  const getServiceCard = (service) => {
    switch (serviceType) {
      case 'servers':
      case 'cloud':
        return (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    {service.name}
                  </CardTitle>
                  <CardDescription>{service.id}</CardDescription>
                </div>
                <div>{getStatusBadge(service.status)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">سیستم عامل:</span>
                    <span>{service.details.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">CPU:</span>
                    <span>{service.details.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">RAM:</span>
                    <span>{service.details.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">دیسک:</span>
                    <span>{service.details.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">IP:</span>
                    <span>{service.details.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">مکان:</span>
                    <span>{service.details.location}</span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-500">تاریخ تمدید بعدی:</span>
                  <span>{service.details.nextPayment}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>هزینه ماهانه:</span>
                  <span>{new Intl.NumberFormat('fa-IR').format(service.details.price)} تومان</span>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.status === 'active' && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Power className="h-4 w-4 mr-1" />
                      <span>ریستارت</span>
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>مدیریت</span>
                  </Button>
                  <Button size="sm" className="flex-1">
                    <RotateCw className="h-4 w-4 mr-1" />
                    <span>تمدید</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'dedicated':
        return (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <HardDrive className="h-5 w-5 mr-2" />
                    {service.name}
                  </CardTitle>
                  <CardDescription>{service.id}</CardDescription>
                </div>
                <div>{getStatusBadge(service.status)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">پردازنده:</span>
                    <span>{service.details.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">هسته/ترد:</span>
                    <span>{service.details.cores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">RAM:</span>
                    <span>{service.details.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">دیسک:</span>
                    <span>{service.details.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">IP:</span>
                    <span>{service.details.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">مکان:</span>
                    <span>{service.details.location}</span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-500">تاریخ تمدید بعدی:</span>
                  <span>{service.details.nextPayment}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>هزینه ماهانه:</span>
                  <span>{new Intl.NumberFormat('fa-IR').format(service.details.price)} تومان</span>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.status === 'active' && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Power className="h-4 w-4 mr-1" />
                      <span>ریبوت</span>
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>مدیریت</span>
                  </Button>
                  <Button size="sm" className="flex-1">
                    <RotateCw className="h-4 w-4 mr-1" />
                    <span>تمدید</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'hosting':
        return (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    {service.name}
                  </CardTitle>
                  <CardDescription>{service.id}</CardDescription>
                </div>
                <div>{getStatusBadge(service.status)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">نوع:</span>
                    <span>{service.details.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">فضا:</span>
                    <span>{service.details.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">پهنای باند:</span>
                    <span>{service.details.bandwidth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">تعداد دامنه:</span>
                    <span>{service.details.domainCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">تعداد دیتابیس:</span>
                    <span>{service.details.databaseCount}</span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-500">تاریخ تمدید بعدی:</span>
                  <span>{service.details.nextPayment}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>هزینه سالانه:</span>
                  <span>{new Intl.NumberFormat('fa-IR').format(service.details.price)} تومان</span>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>مدیریت سی پنل</span>
                  </Button>
                  <Button size="sm" className="flex-1">
                    <RotateCw className="h-4 w-4 mr-1" />
                    <span>تمدید</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'domains':
        return (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.id}</CardDescription>
                </div>
                <div>{getStatusBadge(service.status)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ثبت کننده:</span>
                    <span>{service.details.registrar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">تاریخ ثبت:</span>
                    <span>{service.details.registrationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">تاریخ انقضا:</span>
                    <span>{service.details.expiryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">تمدید خودکار:</span>
                    <span>{service.details.autoRenew ? 'فعال' : 'غیرفعال'}</span>
                  </div>
                </div>
                
                <div className="text-sm space-y-1">
                  <div className="text-gray-500">نیم سرورها:</div>
                  {service.details.nameservers.map((ns, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>{ns}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-500">تاریخ تمدید بعدی:</span>
                  <span>{service.details.nextPayment}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>هزینه سالانه:</span>
                  <span>{new Intl.NumberFormat('fa-IR').format(service.details.price)} تومان</span>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch id={`autorenew-${service.id}`} defaultChecked={service.details.autoRenew} />
                    <Label htmlFor={`autorenew-${service.id}`}>تمدید خودکار</Label>
                  </div>
                  <Button size="sm">
                    {service.status === 'expired' ? 'فعالسازی مجدد' : 'تمدید'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{service.name}</CardTitle>
                <div>{getStatusBadge(service.status)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{service.id}</p>
            </CardContent>
          </Card>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{getServiceTypeTitle()}</h1>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          <span>سفارش جدید</span>
        </Button>
      </div>
      
      <Tabs value={view} onValueChange={setView}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">همه</TabsTrigger>
            <TabsTrigger value="active">فعال</TabsTrigger>
            <TabsTrigger value="suspended">معلق</TabsTrigger>
            <TabsTrigger value="expired">منقضی شده</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="فیلتر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="date-asc">تاریخ (صعودی)</SelectItem>
                <SelectItem value="date-desc">تاریخ (نزولی)</SelectItem>
                <SelectItem value="name-asc">نام (صعودی)</SelectItem>
                <SelectItem value="name-desc">نام (نزولی)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => getServiceCard(service))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ سرویسی یافت نشد</h3>
              <p className="text-gray-500 mb-4">در حال حاضر هیچ سرویسی با وضعیت انتخاب شده وجود ندارد.</p>
              <Button>سفارش سرویس جدید</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => getServiceCard(service))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ سرویس فعالی یافت نشد</h3>
              <p className="text-gray-500 mb-4">در حال حاضر هیچ سرویس فعالی وجود ندارد.</p>
              <Button>سفارش سرویس جدید</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="suspended" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => getServiceCard(service))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ سرویس معلقی یافت نشد</h3>
              <p className="text-gray-500 mb-4">در حال حاضر هیچ سرویس معلقی وجود ندارد.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="expired" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => getServiceCard(service))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ سرویس منقضی شده‌ای یافت نشد</h3>
              <p className="text-gray-500 mb-4">در حال حاضر هیچ سرویس منقضی شده‌ای وجود ندارد.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesPage;

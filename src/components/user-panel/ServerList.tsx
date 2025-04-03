
import React, { useState } from 'react';
import { Server, Database, Globe, HardDrive, Cloud, RefreshCw, Settings, ArrowRightLeft, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface ServerListProps {
  serviceType: 'vps' | 'dedicated' | 'cloud' | 'hosting' | 'domain';
  onManage?: (id: string) => void;
  onReset?: (id: string) => void;
  onRenew?: (id: string) => void;
}

const ServerList: React.FC<ServerListProps> = ({ serviceType, onManage, onReset, onRenew }) => {
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [currentServerId, setCurrentServerId] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<any>(null);

  // Sample data for different service types
  const services = {
    vps: [
      { id: 'vps-123', name: 'سرور مجازی لینوکس', location: 'آمریکا', status: 'active', ip: '123.456.789.012', os: 'Ubuntu 22.04', plan: 'VPS-L1', cpu: '2 هسته', ram: '2 گیگابایت', disk: '40 گیگابایت', bandwidth: '2 ترابایت', price: '850,000 تومان', expireDate: '1403/06/15' },
      { id: 'vps-124', name: 'سرور مجازی ویندوز', location: 'آلمان', status: 'active', ip: '123.456.789.013', os: 'Windows Server 2022', plan: 'VPS-W2', cpu: '4 هسته', ram: '8 گیگابایت', disk: '80 گیگابایت', bandwidth: '3 ترابایت', price: '1,950,000 تومان', expireDate: '1403/04/20' },
      { id: 'vps-125', name: 'سرور مجازی لینوکس ایران', location: 'ایران', status: 'suspended', ip: '185.173.106.123', os: 'CentOS 8', plan: 'VPS-IR1', cpu: '2 هسته', ram: '4 گیگابایت', disk: '60 گیگابایت', bandwidth: '1 ترابایت', price: '1,250,000 تومان', expireDate: '1403/02/10' }
    ],
    dedicated: [
      { id: 'ded-123', name: 'سرور اختصاصی', location: 'آلمان', status: 'active', ip: '123.456.789.014', os: 'CentOS 7', plan: 'DED-X1', cpu: 'Intel Xeon E5-2680', ram: '64 گیگابایت', disk: '2x2 ترابایت SSD', bandwidth: '100 ترابایت', price: '12,500,000 تومان', expireDate: '1403/05/18' },
      { id: 'ded-124', name: 'سرور اختصاصی ایران', location: 'ایران', status: 'active', ip: '185.173.106.124', os: 'Ubuntu 20.04', plan: 'DED-IR1', cpu: 'AMD EPYC 7302P', ram: '32 گیگابایت', disk: '1 ترابایت NVMe', bandwidth: '50 ترابایت', price: '9,800,000 تومان', expireDate: '1403/07/22' }
    ],
    cloud: [
      { id: 'cld-123', name: 'سرور ابری', location: 'هلند', status: 'active', ip: '123.456.789.015', os: 'Debian 11', plan: 'CLOUD-1', cpu: '4 vCPU', ram: '8 گیگابایت', disk: '100 گیگابایت SSD', bandwidth: '5 ترابایت', price: '2,200,000 تومان', expireDate: '1403/04/08' },
      { id: 'cld-124', name: 'سرور ابری اختصاصی', location: 'فرانسه', status: 'active', ip: '123.456.789.016', os: 'Ubuntu 22.04', plan: 'CLOUD-D1', cpu: '8 vCPU', ram: '16 گیگابایت', disk: '200 گیگابایت SSD', bandwidth: '10 ترابایت', price: '4,500,000 تومان', expireDate: '1403/08/15' }
    ],
    hosting: [
      { id: 'host-123', name: 'هاست لینوکس', location: 'آمریکا', status: 'active', domain: 'example.com', plan: 'Host-L1', storage: '20 گیگابایت', bandwidth: 'نامحدود', databases: '10', subdomains: 'نامحدود', price: '450,000 تومان', expireDate: '1403/06/01', cpanel: true },
      { id: 'host-124', name: 'هاست وردپرس', location: 'آلمان', status: 'active', domain: 'example.org', plan: 'Host-WP1', storage: '50 گیگابایت', bandwidth: 'نامحدود', databases: '20', subdomains: 'نامحدود', price: '850,000 تومان', expireDate: '1403/05/12', cpanel: true },
      { id: 'host-125', name: 'هاست ویندوز', location: 'انگلستان', status: 'active', domain: 'example.net', plan: 'Host-W1', storage: '30 گیگابایت', bandwidth: 'نامحدود', databases: '15', subdomains: 'نامحدود', price: '750,000 تومان', expireDate: '1403/09/20', plesk: true }
    ],
    domain: [
      { id: 'dom-123', name: 'example.com', registrar: 'نوین وی دی اس', status: 'active', expiry: '2025-01-15', price: '650,000 تومان', dns: ['ns1.novinvds.ir', 'ns2.novinvds.ir'], whois: 'حفاظت شده', autoRenew: true },
      { id: 'dom-124', name: 'example.org', registrar: 'نوین وی دی اس', status: 'active', expiry: '2024-11-20', price: '580,000 تومان', dns: ['ns1.novinvds.ir', 'ns2.novinvds.ir'], whois: 'حفاظت شده', autoRenew: false },
      { id: 'dom-125', name: 'example.ir', registrar: 'nic.ir', status: 'pending-transfer', expiry: '2025-03-10', price: '180,000 تومان', dns: ['ns1.nic.ir', 'ns2.nic.ir'], whois: 'عمومی', autoRenew: false }
    ]
  };

  // Select the appropriate service data based on type
  const serviceData = services[serviceType] || [];

  // Get the appropriate icon for the service type
  const getServiceIcon = () => {
    switch(serviceType) {
      case 'vps':
        return Server;
      case 'dedicated':
        return HardDrive;
      case 'cloud':
        return Cloud;
      case 'hosting':
        return Database;
      case 'domain':
        return Globe;
      default:
        return Server;
    }
  };

  const ServiceIcon = getServiceIcon();

  // Handle reset confirmation
  const handleResetRequest = (id: string) => {
    setCurrentServerId(id);
    setResetConfirmOpen(true);
  };
  
  const confirmReset = () => {
    setResetConfirmOpen(false);
    if (onReset && currentServerId) {
      onReset(currentServerId);
      
      // Show progress toast
      toast({
        title: "در حال ریست سرور",
        description: `لطفاً صبر کنید... سرور ${currentServerId} در حال ریست است.`
      });
      
      // Simulate reset process
      setTimeout(() => {
        toast({
          title: "ریست سرور انجام شد",
          description: `ریست سرور ${currentServerId} با موفقیت انجام شد.`,
          action: (
            <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
              تأیید
            </Button>
          )
        });
      }, 3000);
    }
  };

  // Handle showing service details
  const handleViewDetails = (service: any) => {
    setSelectedServer(service);
    setDetailsDialogOpen(true);
  };

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    let badgeClass = '';
    let statusText = '';

    switch(status) {
      case 'active':
        badgeClass = 'bg-green-100 text-green-800';
        statusText = 'فعال';
        break;
      case 'suspended':
        badgeClass = 'bg-red-100 text-red-800';
        statusText = 'معلق';
        break;
      case 'pending':
        badgeClass = 'bg-yellow-100 text-yellow-800';
        statusText = 'در انتظار';
        break;
      case 'pending-transfer':
        badgeClass = 'bg-blue-100 text-blue-800';
        statusText = 'در حال انتقال';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
        statusText = status;
    }

    return (
      <Badge className={badgeClass}>{statusText}</Badge>
    );
  };

  // Render domain-specific details
  const renderDomainDetails = (service: any) => (
    <>
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-500">ثبت کننده:</span>
        <span className="text-sm text-gray-700 mr-2">{service.registrar}</span>
      </div>
      <div className="mb-3">
        <span className="text-sm font-medium text-gray-500">تاریخ انقضا:</span>
        <span className="text-sm text-gray-700 mr-2">{service.expiry}</span>
      </div>
    </>
  );

  // Render hosting-specific details
  const renderHostingDetails = (service: any) => (
    <>
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-500">دامنه اصلی:</span>
        <span className="text-sm text-gray-700 mr-2">{service.domain}</span>
      </div>
      <div className="mb-3">
        <span className="text-sm font-medium text-gray-500">پلن:</span>
        <span className="text-sm text-gray-700 mr-2">{service.plan}</span>
      </div>
    </>
  );

  // Render server-specific details (VPS, Dedicated, Cloud)
  const renderServerDetails = (service: any) => (
    <>
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-500">IP:</span>
        <span className="text-sm font-mono text-gray-700 mr-2">{service.ip}</span>
      </div>
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-500">سیستم عامل:</span>
        <span className="text-sm text-gray-700 mr-2">{service.os}</span>
      </div>
      <div className="mb-3">
        <span className="text-sm font-medium text-gray-500">پلن:</span>
        <span className="text-sm text-gray-700 mr-2">{service.plan}</span>
      </div>
    </>
  );

  // Render server-specific full details (VPS, Dedicated, Cloud)
  const renderFullServerDetails = (service: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <h3 className="font-semibold mb-2">مشخصات سرور</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">نام سرور:</span>
            <span className="font-medium">{service.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">پلن:</span>
            <span className="font-medium">{service.plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">وضعیت:</span>
            <span>{renderStatusBadge(service.status)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">لوکیشن:</span>
            <span className="font-medium">{service.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">آدرس IP:</span>
            <span className="font-mono">{service.ip}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">سیستم عامل:</span>
            <span className="font-medium">{service.os}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">مشخصات منابع</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">پردازشگر:</span>
            <span className="font-medium">{service.cpu}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">حافظه رم:</span>
            <span className="font-medium">{service.ram}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">فضای ذخیره‌سازی:</span>
            <span className="font-medium">{service.disk}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">پهنای باند:</span>
            <span className="font-medium">{service.bandwidth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">هزینه ماهانه:</span>
            <span className="font-medium">{service.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">تاریخ انقضا:</span>
            <span className="font-medium">{service.expireDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render domain-specific full details
  const renderFullDomainDetails = (service: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <h3 className="font-semibold mb-2">اطلاعات دامنه</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">نام دامنه:</span>
            <span className="font-medium">{service.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">ثبت کننده:</span>
            <span className="font-medium">{service.registrar}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">وضعیت:</span>
            <span>{renderStatusBadge(service.status)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">تاریخ انقضا:</span>
            <span className="font-medium">{service.expiry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">قیمت تمدید:</span>
            <span className="font-medium">{service.price}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">تنظیمات دامنه</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">NameServer 1:</span>
            <span className="font-mono text-sm">{service.dns[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">NameServer 2:</span>
            <span className="font-mono text-sm">{service.dns[1]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">حفاظت Whois:</span>
            <span className="font-medium">{service.whois}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">تمدید خودکار:</span>
            <span className="font-medium">{service.autoRenew ? 'فعال' : 'غیرفعال'}</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render hosting-specific full details
  const renderFullHostingDetails = (service: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <h3 className="font-semibold mb-2">اطلاعات هاست</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">نام سرویس:</span>
            <span className="font-medium">{service.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">پلن:</span>
            <span className="font-medium">{service.plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">وضعیت:</span>
            <span>{renderStatusBadge(service.status)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">لوکیشن:</span>
            <span className="font-medium">{service.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">دامنه اصلی:</span>
            <span className="font-medium">{service.domain}</span>
          </div>
          {service.cpanel && (
            <div className="flex justify-between">
              <span className="text-gray-500">کنترل پنل:</span>
              <span className="font-medium">cPanel</span>
            </div>
          )}
          {service.plesk && (
            <div className="flex justify-between">
              <span className="text-gray-500">کنترل پنل:</span>
              <span className="font-medium">Plesk</span>
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">مشخصات منابع</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">فضای ذخیره‌سازی:</span>
            <span className="font-medium">{service.storage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">پهنای باند:</span>
            <span className="font-medium">{service.bandwidth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">تعداد پایگاه داده:</span>
            <span className="font-medium">{service.databases}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">ساب دامین:</span>
            <span className="font-medium">{service.subdomains}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">هزینه سالانه:</span>
            <span className="font-medium">{service.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">تاریخ انقضا:</span>
            <span className="font-medium">{service.expireDate}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {serviceData.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <ServiceIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">هیچ سرویسی یافت نشد</h3>
          <p className="mt-1 text-sm text-gray-500">برای سفارش سرویس جدید، از بخش سفارش خدمات جدید استفاده کنید.</p>
        </div>
      ) : (
        serviceData.map((service: any) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <ServiceIcon className="h-10 w-10 text-primary ml-3" />
                  <div>
                    <h3 className="text-lg font-medium">{service.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 ml-2">موقعیت: {service.location}</span>
                      {renderStatusBadge(service.status)}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(service)}
                  >
                    <Settings className="ml-1 h-4 w-4" />
                    جزئیات
                  </Button>
                  
                  {onManage && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => {
                        if (onManage) onManage(service.id);
                        toast({
                          title: "مدیریت سرویس",
                          description: `در حال ورود به بخش مدیریت سرویس ${service.id}...`,
                        });
                      }}
                    >
                      <Settings className="ml-1 h-4 w-4" />
                      مدیریت
                    </Button>
                  )}
                  
                  {onReset && (serviceType === 'vps' || serviceType === 'dedicated' || serviceType === 'cloud') && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResetRequest(service.id)}
                    >
                      <RefreshCw className="ml-1 h-4 w-4" />
                      ریست
                    </Button>
                  )}
                  
                  {onRenew && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (onRenew) onRenew(service.id);
                      }}
                    >
                      <ArrowRightLeft className="ml-1 h-4 w-4" />
                      تمدید
                    </Button>
                  )}
                  
                  {/* Add download manual button */}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "دانلود راهنما",
                        description: `در حال آماده‌سازی راهنمای استفاده از سرویس ${service.id}...`,
                        action: (
                          <Button variant="outline" onClick={() => toast({ title: "دانلود آغاز شد" })}>
                            دریافت
                          </Button>
                        )
                      });
                    }}
                  >
                    <Download className="ml-1 h-4 w-4" />
                    راهنما
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                {serviceType === 'domain' ? 
                  renderDomainDetails(service) : 
                  serviceType === 'hosting' ? 
                    renderHostingDetails(service) : 
                    renderServerDetails(service)
                }
              </div>
            </CardContent>
          </Card>
        ))
      )}
      
      {/* Reset confirmation dialog */}
      <AlertDialog open={resetConfirmOpen} onOpenChange={setResetConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأیید ریست سرور</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از ریست سرور {currentServerId} اطمینان دارید؟ تمام اطلاعات و تنظیمات به حالت اولیه بازخواهند گشت.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset}>تأیید ریست</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Server details dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedServer?.name}
            </DialogTitle>
            <DialogDescription>
              جزئیات کامل سرویس {selectedServer?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedServer && (
            <>
              {serviceType === 'domain' ? 
                renderFullDomainDetails(selectedServer) : 
                serviceType === 'hosting' ? 
                  renderFullHostingDetails(selectedServer) : 
                  renderFullServerDetails(selectedServer)
              }
              
              <div className="flex flex-wrap gap-2 justify-end">
                {onManage && (
                  <Button 
                    variant="default"
                    onClick={() => {
                      if (onManage) onManage(selectedServer.id);
                      setDetailsDialogOpen(false);
                      toast({
                        title: "مدیریت سرویس",
                        description: `در حال ورود به بخش مدیریت سرویس ${selectedServer.id}...`,
                      });
                    }}
                  >
                    <Settings className="ml-1 h-4 w-4" />
                    مدیریت سرویس
                  </Button>
                )}
                
                {onReset && (serviceType === 'vps' || serviceType === 'dedicated' || serviceType === 'cloud') && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setDetailsDialogOpen(false);
                      handleResetRequest(selectedServer.id);
                    }}
                  >
                    <RefreshCw className="ml-1 h-4 w-4" />
                    ریست سرویس
                  </Button>
                )}
                
                {onRenew && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (onRenew) onRenew(selectedServer.id);
                      setDetailsDialogOpen(false);
                    }}
                  >
                    <ArrowRightLeft className="ml-1 h-4 w-4" />
                    تمدید سرویس
                  </Button>
                )}
                
                <DialogClose asChild>
                  <Button variant="ghost">بستن</Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServerList;

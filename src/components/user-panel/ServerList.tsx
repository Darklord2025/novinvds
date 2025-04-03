
import React from 'react';
import { Server, Database, Globe, HardDrive, Cloud } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServerListProps {
  serviceType: 'vps' | 'dedicated' | 'cloud' | 'hosting' | 'domain';
  onManage?: (id: string) => void;
  onReset?: (id: string) => void;
  onRenew?: (id: string) => void;
}

const ServerList: React.FC<ServerListProps> = ({ serviceType, onManage, onReset, onRenew }) => {
  // Sample data for different service types
  const services = {
    vps: [
      { id: 'vps-123', name: 'سرور مجازی لینوکس', location: 'آمریکا', status: 'active', ip: '123.456.789.012', os: 'Ubuntu 22.04', plan: 'VPS-L1' },
      { id: 'vps-124', name: 'سرور مجازی ویندوز', location: 'آلمان', status: 'active', ip: '123.456.789.013', os: 'Windows Server 2022', plan: 'VPS-W2' },
      { id: 'vps-125', name: 'سرور مجازی لینوکس ایران', location: 'ایران', status: 'suspended', ip: '185.173.106.123', os: 'CentOS 8', plan: 'VPS-IR1' }
    ],
    dedicated: [
      { id: 'ded-123', name: 'سرور اختصاصی', location: 'آلمان', status: 'active', ip: '123.456.789.014', os: 'CentOS 7', plan: 'DED-X1' },
      { id: 'ded-124', name: 'سرور اختصاصی ایران', location: 'ایران', status: 'active', ip: '185.173.106.124', os: 'Ubuntu 20.04', plan: 'DED-IR1' }
    ],
    cloud: [
      { id: 'cld-123', name: 'سرور ابری', location: 'هلند', status: 'active', ip: '123.456.789.015', os: 'Debian 11', plan: 'CLOUD-1' },
      { id: 'cld-124', name: 'سرور ابری اختصاصی', location: 'فرانسه', status: 'active', ip: '123.456.789.016', os: 'Ubuntu 22.04', plan: 'CLOUD-D1' }
    ],
    hosting: [
      { id: 'host-123', name: 'هاست لینوکس', location: 'آمریکا', status: 'active', domain: 'example.com', plan: 'Host-L1' },
      { id: 'host-124', name: 'هاست وردپرس', location: 'آلمان', status: 'active', domain: 'example.org', plan: 'Host-WP1' },
      { id: 'host-125', name: 'هاست ویندوز', location: 'انگلستان', status: 'active', domain: 'example.net', plan: 'Host-W1' }
    ],
    domain: [
      { id: 'dom-123', name: 'example.com', registrar: 'نوین وی دی اس', status: 'active', expiry: '2025-01-15' },
      { id: 'dom-124', name: 'example.org', registrar: 'نوین وی دی اس', status: 'active', expiry: '2024-11-20' },
      { id: 'dom-125', name: 'example.ir', registrar: 'nic.ir', status: 'pending-transfer', expiry: '2025-03-10' }
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
          <Card key={service.id} className="overflow-hidden">
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
                  {onManage && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => onManage(service.id)}
                    >
                      مدیریت
                    </Button>
                  )}
                  {onReset && serviceType !== 'domain' && serviceType !== 'hosting' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onReset(service.id)}
                    >
                      ریست
                    </Button>
                  )}
                  {onRenew && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onRenew(service.id)}
                    >
                      تمدید
                    </Button>
                  )}
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
    </div>
  );
};

export default ServerList;

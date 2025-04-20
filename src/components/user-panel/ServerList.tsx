import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Gauge, Award, MessageSquare, RotateCw, FileEdit, Lock, AlertTriangle, AlertCircle, FastForward } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { HostingCard, VpsCard, DedicatedCard, DomainCard, CloudCard } from "../services/ServiceCards";

// Update the interface to include all possible props
interface ServerListProps {
  serviceType: string;
  onManage?: (id: string) => void;
  onReset?: (id: string) => void;
  onRenew?: (id: string) => void;
  onViewInvoice?: (id: string, isPaid?: boolean) => void;
  onDownloadInvoice?: (id: string) => void;
  onPayInvoice?: (id: string) => void;
}

const ServerList: React.FC<ServerListProps> = ({ 
  serviceType, 
  onManage, 
  onReset, 
  onRenew,
  onViewInvoice,
  onDownloadInvoice,
  onPayInvoice
}) => {
  const mockData = {
    vps: [
      { id: 'VPS-123', status: 'active', cpuUsage: 60, ramUsage: 75, diskUsage: 40, bandwidthUsage: 90 },
      { id: 'VPS-456', status: 'inactive', cpuUsage: 30, ramUsage: 45, diskUsage: 60, bandwidthUsage: 25 },
    ],
    dedicated: [
      { id: 'DED-789', status: 'active', cpuUsage: 80, ramUsage: 90, diskUsage: 70, bandwidthUsage: 50 },
      { id: 'DED-012', status: 'pending', cpuUsage: 10, ramUsage: 20, diskUsage: 10, bandwidthUsage: 10 },
    ],
    cloud: [
      { id: 'CLD-345', status: 'active', cpuUsage: 50, ramUsage: 60, diskUsage: 50, bandwidthUsage: 70 },
    ],
    domain: [
      { id: 'example.com', status: 'active', expiryDate: '2024-12-31' },
      { id: 'novinvds.com', status: 'active', expiryDate: '2025-01-15' },
    ],
    hosting: [
      { id: 'HOST-678', status: 'active', diskUsage: 80, bandwidthUsage: 60 },
    ],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">فعال</Badge>;
      case 'inactive':
        return <Badge variant="secondary">غیرفعال</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 text-white">در انتظار</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // For now, we'll just render simple cards instead of using the imported components
  const renderServiceCard = (service: any) => {
    return (
      <div className="flex items-center">
        <div className="mr-2 font-medium">{service.id}</div>
      </div>
    );
  };

  const handleManage = (id: string) => {
    if (onManage) {
      onManage(id);
    }
  };

  const handleReset = (id: string) => {
    if (onReset) {
      onReset(id);
    }
  };

  const handleRenew = (id: string) => {
    if (onRenew) {
      onRenew(id);
    }
  };

  const handleViewInvoice = (id: string, isPaid: boolean = false) => {
    if (onViewInvoice) {
      onViewInvoice(id, isPaid);
    }
  };

  const handleDownloadInvoice = (id: string) => {
    if (onDownloadInvoice) {
      onDownloadInvoice(id);
    }
  };

  const handlePayInvoice = (id: string) => {
    if (onPayInvoice) {
      onPayInvoice(id);
    }
  };

  const services = mockData[serviceType] || [];

  if (!services) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          خطا در بارگیری لیست {serviceType}. لطفاً بعداً دوباره امتحان کنید.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid gap-4">
        {services.length === 0 ? (
          <Card className="w-full shadow-md border-0 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                هیچ {serviceType} یافت نشد.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  شما هیچ {serviceType} فعالی ندارید. برای سفارش
                  <Button variant="link">
                    <a href="/services">
                      اینجا
                    </a>
                  </Button>
                  کلیک کنید.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          services.map((service: any) => (
            <Card key={service.id} className="w-full shadow-md border-0 rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {renderServiceCard(service)}
                </CardTitle>
                {getStatusBadge(service.status)}
              </CardHeader>
              <CardContent>
                {serviceType === 'vps' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-gray-500" />
                        <span>CPU: {service.cpuUsage}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span>RAM: {service.ramUsage}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileEdit className="h-4 w-4 text-gray-500" />
                        <span>Disk: {service.diskUsage}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FastForward className="h-4 w-4 text-gray-500" />
                        <span>Bandwidth: {service.bandwidthUsage}%</span>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleManage(service.id)}>
                            <MessageSquare className="h-4 w-4 ml-2" />
                            مدیریت
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>مدیریت سرویس</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="destructive" size="sm" onClick={() => handleReset(service.id)}>
                            <RotateCw className="h-4 w-4 ml-2" />
                            ریست
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>ریست سرور</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" onClick={() => handleRenew(service.id)}>
                            <Lock className="h-4 w-4 ml-2" />
                            تمدید
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>تمدید سرویس</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </>
                )}
                {serviceType === 'dedicated' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-gray-500" />
                        <span>CPU: {service.cpuUsage}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span>RAM: {service.ramUsage}%</span>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleManage(service.id)}>
                        <MessageSquare className="h-4 w-4 ml-2" />
                        مدیریت
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleReset(service.id)}>
                        <RotateCw className="h-4 w-4 ml-2" />
                        ریست
                      </Button>
                      <Button size="sm" onClick={() => handleRenew(service.id)}>
                        <Lock className="h-4 w-4 ml-2" />
                        تمدید
                      </Button>
                    </div>
                  </>
                )}
                {serviceType === 'cloud' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-gray-500" />
                        <span>CPU: {service.cpuUsage}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span>RAM: {service.ramUsage}%</span>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleManage(service.id)}>
                        <MessageSquare className="h-4 w-4 ml-2" />
                        مدیریت
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleReset(service.id)}>
                        <RotateCw className="h-4 w-4 ml-2" />
                        ریست
                      </Button>
                      <Button size="sm" onClick={() => handleRenew(service.id)}>
                        <Lock className="h-4 w-4 ml-2" />
                        تمدید
                      </Button>
                    </div>
                  </>
                )}
                {serviceType === 'domain' && (
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleManage(service.id)}>
                      <MessageSquare className="h-4 w-4 ml-2" />
                      مدیریت
                    </Button>
                    <Button size="sm" onClick={() => handleRenew(service.id)}>
                      <Lock className="h-4 w-4 ml-2" />
                      تمدید
                    </Button>
                  </div>
                )}
                {serviceType === 'hosting' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <FileEdit className="h-4 w-4 text-gray-500" />
                        <span>Disk: {service.diskUsage}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FastForward className="h-4 w-4 text-gray-500" />
                        <span>Bandwidth: {service.bandwidthUsage}%</span>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleManage(service.id)}>
                        <MessageSquare className="h-4 w-4 ml-2" />
                        مدیریت
                      </Button>
                      <Button size="sm" onClick={() => handleRenew(service.id)}>
                        <Lock className="h-4 w-4 ml-2" />
                        تمدید
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </TooltipProvider>
  );
};

export default ServerList;

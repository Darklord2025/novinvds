
import React from 'react';
import { Server, Database, Cloud, Globe, Inbox } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    status: string;
    cpuUsage?: number;
    ramUsage?: number;
    diskUsage?: number;
    bandwidthUsage?: number;
    expiryDate?: string;
  };
}

export const VpsCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <Server className="h-4 w-4 mr-2 text-blue-500" />
      <span>سرور مجازی: {service.id}</span>
    </div>
  );
};

export const DedicatedCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <Database className="h-4 w-4 mr-2 text-purple-500" />
      <span>سرور اختصاصی: {service.id}</span>
    </div>
  );
};

export const CloudCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <Cloud className="h-4 w-4 mr-2 text-sky-500" />
      <span>سرور ابری: {service.id}</span>
    </div>
  );
};

export const DomainCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <Globe className="h-4 w-4 mr-2 text-green-500" />
      <span>دامنه: {service.id}</span>
    </div>
  );
};

export const HostingCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <Inbox className="h-4 w-4 mr-2 text-amber-500" />
      <span>هاستینگ: {service.id}</span>
    </div>
  );
};

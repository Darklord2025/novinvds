
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  service: any;
}

export const VpsCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 font-medium">{service.id}</div>
    </div>
  );
};

export const DedicatedCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 font-medium">{service.id}</div>
    </div>
  );
};

export const CloudCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 font-medium">{service.id}</div>
    </div>
  );
};

export const DomainCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 font-medium">{service.id}</div>
      {service.expiryDate && (
        <Badge className="ml-2 bg-blue-100 text-blue-700">
          تا {service.expiryDate}
        </Badge>
      )}
    </div>
  );
};

export const HostingCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 font-medium">{service.id}</div>
    </div>
  );
};

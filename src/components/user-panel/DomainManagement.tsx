
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface DomainManagementProps {
  domainId: string;
  onBack: () => void;
}

const DomainManagement: React.FC<DomainManagementProps> = ({ domainId, onBack }) => {
  const domainData = {
    id: domainId,
    name: `example${domainId}.com`,
    registrationDate: '2023-01-15',
    expiryDate: '2024-01-15',
    status: 'فعال',
    nameservers: ['ns1.novinvds.com', 'ns2.novinvds.com'],
    autoRenewal: true,
    dnsRecords: []
  };

  const handleUpdateNameservers = () => {
    // ... nameserver update logic
  };

  const handleDNSManagement = () => {
    // ... DNS management logic
  };

  const handleAutoRenewal = () => {
    // ... auto renewal toggle logic
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => onBack()} className="ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">مدیریت دامنه</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => onBack()}>
          بازگشت به لیست دامنه‌ها
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg font-medium">اطلاعات دامنه</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">نام دامنه</span>
              <span className="font-medium">{domainData.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">وضعیت</span>
              <Badge variant={domainData.status === 'فعال' ? 'default' : 'secondary'}>
                {domainData.status}
              </Badge>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">تاریخ ثبت</span>
              <span className="font-medium">{formatDate(domainData.registrationDate)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">تاریخ انقضا</span>
              <span className="font-medium">{formatDate(domainData.expiryDate)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">تنظیمات DNS</h3>
            <div className="space-y-2">
              <span className="text-sm text-gray-500">Nameservers</span>
              <ul className="list-disc pl-5">
                {domainData.nameservers.map((ns, index) => (
                  <li key={index} className="font-medium">{ns}</li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button onClick={handleUpdateNameservers}>
                بروزرسانی Nameservers
              </Button>
              <Button onClick={handleDNSManagement} variant="outline">
                مدیریت رکوردهای DNS
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <span>تمدید خودکار</span>
            <Button 
              variant={domainData.autoRenewal ? "default" : "outline"}
              onClick={handleAutoRenewal}
            >
              {domainData.autoRenewal ? 'فعال' : 'غیرفعال'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainManagement;

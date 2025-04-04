import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Add the onBack prop to the interface
export interface DomainManagementProps {
  domainId: string;
  onBack: () => void;
}

// Update the component to use the onBack prop
const DomainManagement: React.FC<DomainManagementProps> = ({ domainId, onBack }) => {
  // Mock domain data
  const domainData = {
    id: domainId,
    name: `example${domainId}.com`,
    registrationDate: '2023-01-15',
    expiryDate: '2024-01-15',
    status: 'فعال',
    nameservers: ['ns1.novinvds.com', 'ns2.novinvds.com'],
    autoRenewal: true
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
          <Button variant="ghost" onClick={onBack} className="ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">مدیریت دامنه</h1>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">اطلاعات دامنه</CardTitle>
            <Button variant="outline" size="sm" onClick={onBack}>
              بازگشت به لیست دامنه‌ها
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">نام دامنه</span>
              <span className="font-medium">{domainData.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">وضعیت</span>
              <span className="font-medium">{domainData.status}</span>
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
          
          <div className="space-y-2">
            <span className="text-sm text-gray-500">Nameservers</span>
            <ul className="list-disc pl-5">
              {domainData.nameservers.map((ns, index) => (
                <li key={index} className="font-medium">{ns}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainManagement;

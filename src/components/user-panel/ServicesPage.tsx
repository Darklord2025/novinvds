
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ServerList from "./ServerList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OperatingSystem {
  id: string;
  name: string;
}

interface OperatingSystems {
  linux: OperatingSystem[];
  windows: OperatingSystem[];
  specialized: OperatingSystem[];
}

interface ServicesPageProps {
  serviceType: string;
  operatingSystems?: OperatingSystems;
  onManage?: (serviceType: string, id: string) => void;
  onReset?: (serviceType: string, id: string) => void;
  onRenew?: (serviceType: string, id: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ 
  serviceType, 
  operatingSystems,
  onManage,
  onReset,
  onRenew
}) => {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [serverToReset, setServerToReset] = useState({ type: '', id: '' });

  const getPageTitle = () => {
    switch(serviceType) {
      case 'servers':
        return 'سرورهای مجازی';
      case 'dedicated':
        return 'سرورهای اختصاصی';
      case 'cloud':
        return 'سرورهای ابری';
      case 'hosting':
        return 'هاستینگ';
      case 'domains':
        return 'دامنه‌ها';
      default:
        return 'سرویس‌ها';
    }
  };

  const getMappedServiceType = () => {
    switch(serviceType) {
      case 'servers':
        return 'vps';
      case 'domains':
        return 'domain';
      default:
        return serviceType;
    }
  };

  const handleResetRequest = (id: string) => {
    setServerToReset({ type: getMappedServiceType(), id });
    setResetDialogOpen(true);
  };

  const confirmReset = () => {
    setResetDialogOpen(false);
    if (onReset) {
      onReset(serverToReset.type, serverToReset.id);
    }
  };

  const handleManage = (id: string) => {
    if (onManage) {
      onManage(getMappedServiceType(), id);
    }
  };

  const handleRenew = (id: string) => {
    if (onRenew) {
      onRenew(getMappedServiceType(), id);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>لیست {getPageTitle()}</CardTitle>
          <CardDescription>
            لیست تمام {getPageTitle()} فعال شما
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServerList 
            serviceType={getMappedServiceType() as any}
            onManage={handleManage}
            onReset={['vps', 'dedicated', 'cloud'].includes(getMappedServiceType()) ? handleResetRequest : undefined}
            onRenew={handleRenew}
          />
        </CardContent>
      </Card>

      {/* Reset Server Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأیید ریست سرور</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از ریست سرور {serverToReset.id} اطمینان دارید؟ تمام اطلاعات و تنظیمات به حالت اولیه بازخواهند گشت.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset}>تأیید ریست</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesPage;

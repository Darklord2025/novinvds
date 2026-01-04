import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  Globe, 
  Server,
  Shield, 
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import { toPersianDigits } from '@/lib/numberUtils';

export interface DomainManagementProps {
  domainId: string;
  onBack: () => void;
}

const DomainManagement: React.FC<DomainManagementProps> = ({ domainId, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTransferCode, setShowTransferCode] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);
  const [privacyProtection, setPrivacyProtection] = useState(true);

  // Mock domain data
  const domainData = {
    id: domainId,
    name: `example${domainId}.com`,
    registrationDate: '2023-01-15',
    expiryDate: '2025-01-15',
    status: 'فعال',
    registrar: 'NovinVDS',
    transferCode: 'ABC123XYZ789',
    nameservers: ['ns1.novinvds.com', 'ns2.novinvds.com'],
    autoRenewal: autoRenew,
    privacyProtection: privacyProtection,
    dnsRecords: [
      { type: 'A', name: '@', value: '۱۸۵.۱۲۳.۴۵.۶۷', ttl: '۳۶۰۰' },
      { type: 'CNAME', name: 'www', value: 'example.com', ttl: '۳۶۰۰' },
      { type: 'MX', name: '@', value: 'mail.example.com', ttl: '۳۶۰۰', priority: '۱۰' }
    ]
  };

  const formatDate = (dateString: string) => {
    const formatted = new Intl.DateTimeFormat('fa-IR').format(new Date(dateString));
    return toPersianDigits(formatted);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} کپی شد`);
  };

  const handleUpdateNameservers = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('نیم‌سرورها با موفقیت بروزرسانی شدند');
    } catch (error) {
      toast.error('خطا در بروزرسانی نیم‌سرورها');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoRenewToggle = async (checked: boolean) => {
    setAutoRenew(checked);
    toast.success(`تمدید خودکار ${checked ? 'فعال' : 'غیرفعال'} شد`);
  };

  const handlePrivacyToggle = async (checked: boolean) => {
    setPrivacyProtection(checked);
    toast.success(`حریم خصوصی ${checked ? 'فعال' : 'غیرفعال'} شد`);
  };

  const getStatusColor = () => {
    switch (domainData.status) {
      case 'فعال': return 'bg-green-100 text-green-800';
      case 'منقضی': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              {domainData.name}
            </h1>
            <p className="text-gray-600">مدیریت دامنه</p>
          </div>
        </div>
        <Badge className={getStatusColor()}>{domainData.status}</Badge>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              تاریخ ثبت
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{formatDate(domainData.registrationDate)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              تاریخ انقضا
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{formatDate(domainData.expiryDate)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              ثبت‌کننده
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{domainData.registrar}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 gap-1">
          <TabsTrigger value="overview" className="text-xs md:text-sm">نمای کلی</TabsTrigger>
          <TabsTrigger value="dns" className="text-xs md:text-sm">DNS</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs md:text-sm">تنظیمات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                اطلاعات دامنه
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">نام دامنه</Label>
                  <p className="font-medium text-lg">{domainData.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">وضعیت</Label>
                  <p className="font-medium">{domainData.status}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">تمدید خودکار</Label>
                  <p className="font-medium">{autoRenew ? 'فعال' : 'غیرفعال'}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">حریم خصوصی</Label>
                  <p className="font-medium">{privacyProtection ? 'فعال' : 'غیرفعال'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-500" />
                نیم‌سرورها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {domainData.nameservers.map((ns, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <span className="font-mono text-sm">{ns}</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(ns, 'نیم‌سرور')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button 
                onClick={handleUpdateNameservers} 
                disabled={isLoading}
                className="w-full"
              >
                <Settings className="w-4 h-4 ml-2" />
                تغییر نیم‌سرورها
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-500" />
                مدیریت رکوردهای DNS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domainData.dnsRecords.map((record, index) => (
                  <div key={index} className="border rounded p-4 space-y-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <Label className="text-xs text-gray-600">نوع</Label>
                        <p className="font-medium">{record.type}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">نام</Label>
                        <p className="font-medium font-mono">{record.name}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">مقدار</Label>
                        <p className="font-medium font-mono text-xs">{record.value}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">TTL</Label>
                        <p className="font-medium">{record.ttl}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  افزودن رکورد جدید
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                تنظیمات دامنه
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">تمدید خودکار</Label>
                  <p className="text-sm text-gray-600">دامنه به صورت خودکار تمدید شود</p>
                </div>
                <Switch 
                  checked={autoRenew} 
                  onCheckedChange={handleAutoRenewToggle}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-medium">حفاظت از حریم خصوصی</Label>
                  <p className="text-sm text-gray-600">مخفی کردن اطلاعات شخصی در WHOIS</p>
                </div>
                <Switch 
                  checked={privacyProtection} 
                  onCheckedChange={handlePrivacyToggle}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="font-medium">عملیات خطرناک</Label>
                <Button variant="destructive" className="w-full">
                  <Lock className="w-4 h-4 ml-2" />
                  قفل کردن دامنه
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DomainManagement;

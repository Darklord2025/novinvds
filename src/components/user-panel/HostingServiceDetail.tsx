import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight, 
  Globe, 
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  HardDrive,
  Database,
  Mail,
  Users,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { formatNumber, formatDate } from '@/lib/numberUtils';

interface HostingServiceDetailProps {
  serviceId: string;
  onBack?: () => void;
}

const HostingServiceDetail: React.FC<HostingServiceDetailProps> = ({ serviceId, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Mock data - based on HostArmada screenshot
  const hostingData = {
    id: serviceId,
    packageName: 'پکیج هاستینگ پریمیوم',
    domain: 'example.ir',
    status: 'active',
    registrationDate: '2024-01-15',
    nextDueDate: '2025-01-15',
    billingCycle: 'سالانه',
    paymentMethod: 'کارت بانکی',
    recurringAmount: 1200000,
    
    // Service Details
    dedicatedIP: '185.123.45.67',
    nameservers: ['ns1.novinvds.ir', 'ns2.novinvds.ir'],
    
    // cPanel Access
    cpanelUrl: 'https://cp.example.ir:2083',
    cpanelUsername: 'example_user',
    cpanelPassword: 'SecurePass123!',
    
    // FTP Access
    ftpHostname: 'ftp.example.ir',
    ftpUsername: 'example_ftp',
    ftpPassword: 'FtpPass456!',
    
    // Database
    databaseHost: 'localhost',
    
    // Disk Usage
    diskUsed: 2.5, // GB
    diskLimit: 10, // GB
    diskUsagePercent: 25,
    
    // Bandwidth
    bandwidthUsed: 15.3, // GB
    bandwidthLimit: 100, // GB
    bandwidthUsagePercent: 15,
    
    // Email Accounts
    emailAccounts: 5,
    emailLimit: 50,
    
    // Databases
    databases: 3,
    databaseLimit: 10,
    
    // Subdomains
    subdomains: 2,
    subdomainLimit: 'نامحدود'
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} کپی شد`);
  };

  const getStatusBadge = () => {
    if (hostingData.status === 'active') {
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          فعال
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
        <XCircle className="w-3 h-3" />
        غیرفعال
      </Badge>
    );
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold">{hostingData.packageName}</h1>
            <p className="text-muted-foreground">{hostingData.domain}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">اطلاعات سرویس</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">تاریخ ثبت</Label>
                  <div className="font-medium">{formatDate(new Date(hostingData.registrationDate), 'fa')}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">تاریخ تمدید بعدی</Label>
                  <div className="font-medium">{formatDate(new Date(hostingData.nextDueDate), 'fa')}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">دوره پرداخت</Label>
                  <div className="font-medium">{hostingData.billingCycle}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">روش پرداخت</Label>
                  <div className="font-medium">{hostingData.paymentMethod}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">مبلغ دوره‌ای</Label>
                  <div className="font-medium">{formatNumber(hostingData.recurringAmount, 'fa')} تومان</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">جزئیات سرویس</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label className="text-sm">IP اختصاصی</Label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{hostingData.dedicatedIP}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.dedicatedIP, 'IP اختصاصی')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">نیم سرورها</Label>
                  {hostingData.nameservers.map((ns, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-mono text-sm">{ns}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(ns, 'نیم سرور')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">اطلاعات دسترسی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* cPanel */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">cPanel</h4>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(hostingData.cpanelUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 ml-1" />
                    ورود به cPanel
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm">آدرس</Label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{hostingData.cpanelUrl}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(hostingData.cpanelUrl, 'آدرس cPanel')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm">نام کاربری</Label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{hostingData.cpanelUsername}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(hostingData.cpanelUsername, 'نام کاربری')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm">رمز عبور</Label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {showPassword ? hostingData.cpanelPassword : '••••••••••'}
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(hostingData.cpanelPassword, 'رمز عبور')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* FTP */}
              <div className="space-y-3">
                <h4 className="font-semibold">FTP</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm">آدرس هاست</Label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{hostingData.ftpHostname}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(hostingData.ftpHostname, 'آدرس FTP')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm">نام کاربری</Label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{hostingData.ftpUsername}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(hostingData.ftpUsername, 'نام کاربری FTP')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm">رمز عبور</Label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {showPassword ? hostingData.ftpPassword : '••••••••••'}
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(hostingData.ftpPassword, 'رمز عبور FTP')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Database */}
              <div className="space-y-3">
                <h4 className="font-semibold">پایگاه داده</h4>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label className="text-sm">آدرس هاست</Label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{hostingData.databaseHost}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.databaseHost, 'آدرس دیتابیس')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">آمار مصرف</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Disk Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-blue-500" />
                    <span>فضای دیسک</span>
                  </div>
                  <span className="font-medium">
                    {formatNumber(hostingData.diskUsed, 'fa')} / {formatNumber(hostingData.diskLimit, 'fa')} GB
                  </span>
                </div>
                <Progress value={hostingData.diskUsagePercent} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {formatNumber(hostingData.diskUsagePercent, 'fa')}% استفاده شده
                </p>
              </div>

              <Separator />

              {/* Bandwidth */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-500" />
                    <span>پهنای باند</span>
                  </div>
                  <span className="font-medium">
                    {formatNumber(hostingData.bandwidthUsed, 'fa')} / {formatNumber(hostingData.bandwidthLimit, 'fa')} GB
                  </span>
                </div>
                <Progress value={hostingData.bandwidthUsagePercent} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {formatNumber(hostingData.bandwidthUsagePercent, 'fa')}% استفاده شده
                </p>
              </div>

              <Separator />

              {/* Email Accounts */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span>اکانت‌های ایمیل</span>
                </div>
                <span className="font-medium">
                  {formatNumber(hostingData.emailAccounts, 'fa')} / {formatNumber(hostingData.emailLimit, 'fa')}
                </span>
              </div>

              <Separator />

              {/* Databases */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-500" />
                  <span>پایگاه‌های داده</span>
                </div>
                <span className="font-medium">
                  {formatNumber(hostingData.databases, 'fa')} / {formatNumber(hostingData.databaseLimit, 'fa')}
                </span>
              </div>

              <Separator />

              {/* Subdomains */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-500" />
                  <span>ساب‌دامنه‌ها</span>
                </div>
                <span className="font-medium">
                  {formatNumber(hostingData.subdomains, 'fa')} / {hostingData.subdomainLimit}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">عملیات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 ml-2" />
                تمدید سرویس
              </Button>
              <Button className="w-full" variant="outline">
                <Globe className="w-4 h-4 ml-2" />
                مدیریت دامنه
              </Button>
              <Button className="w-full" variant="outline">
                <Database className="w-4 h-4 ml-2" />
                پشتیبان‌گیری
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HostingServiceDetail;

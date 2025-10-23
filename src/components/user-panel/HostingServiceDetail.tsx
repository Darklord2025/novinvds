import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield,
  FileText,
  Download,
  RefreshCw,
  Calendar,
  CreditCard,
  Server,
  LayoutDashboard,
  Lock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { formatNumber, formatDate } from '@/lib/numberUtils';

interface HostingServiceDetailProps {
  serviceId: string;
  onBack?: () => void;
}

const HostingServiceDetail: React.FC<HostingServiceDetailProps> = ({ serviceId, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showFtpPassword, setShowFtpPassword] = useState(false);

  // Mock data - realistic hosting service
  const hostingData = {
    id: serviceId,
    packageName: 'پکیج هاستینگ Premium',
    domain: 'example.ir',
    status: 'Active',
    registrationDate: '2024-01-15',
    nextDueDate: '2025-01-15',
    billingCycle: 'سالانه',
    paymentMethod: 'کارت بانکی',
    recurringAmount: 1200000,
    firstPaymentAmount: 1200000,
    
    // Server Information
    serverName: 'Server IR-1',
    serverIP: '185.123.45.67',
    dedicatedIP: '185.123.45.67',
    nameservers: ['ns1.novinvds.ir', 'ns2.novinvds.ir'],
    
    // cPanel Access
    cpanelUrl: 'https://cpanel.example.ir:2083',
    cpanelUsername: 'exampleir',
    cpanelPassword: 'SecurePass123!@#',
    
    // FTP Access
    ftpHostname: 'ftp.example.ir',
    ftpPort: '21',
    ftpUsername: 'exampleir',
    ftpPassword: 'FtpPass456!@#',
    
    // Database
    databaseHost: 'localhost',
    phpMyAdminUrl: 'https://cpanel.example.ir:2083/phpmyadmin',
    
    // Email
    webmailUrl: 'https://webmail.example.ir',
    
    // Disk Usage
    diskUsed: 2.5, // GB
    diskLimit: 10, // GB
    diskUsagePercent: 25,
    
    // Bandwidth
    bandwidthUsed: 15.3, // GB
    bandwidthLimit: 100, // GB
    bandwidthUsagePercent: 15.3,
    
    // Resources
    emailAccounts: 5,
    emailLimit: 50,
    databases: 3,
    databaseLimit: 10,
    subdomains: 2,
    subdomainLimit: 'نامحدود',
    ftpAccounts: 2,
    ftpAccountLimit: 10,
    
    // SSL
    sslStatus: 'فعال',
    sslProvider: 'Let\'s Encrypt',
    sslExpiryDate: '2025-04-15'
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} کپی شد`);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Active') {
      return (
        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          فعال
        </Badge>
      );
    } else if (status === 'Suspended') {
      return (
        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          تعلیق شده
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 flex items-center gap-1">
        <XCircle className="w-3 h-3" />
        غیرفعال
      </Badge>
    );
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold">{hostingData.packageName}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {hostingData.domain}
            </p>
          </div>
        </div>
        {getStatusBadge(hostingData.status)}
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Button 
          variant="outline" 
          className="h-auto py-3 flex-col gap-2"
          onClick={() => window.open(hostingData.cpanelUrl, '_blank')}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-xs">cPanel</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex-col gap-2"
          onClick={() => window.open(hostingData.webmailUrl, '_blank')}
        >
          <Mail className="w-5 h-5" />
          <span className="text-xs">Webmail</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex-col gap-2"
          onClick={() => window.open(hostingData.cpanelUrl + '/file_manager', '_blank')}
        >
          <FileText className="w-5 h-5" />
          <span className="text-xs">مدیریت فایل</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex-col gap-2"
          onClick={() => window.open(hostingData.phpMyAdminUrl, '_blank')}
        >
          <Database className="w-5 h-5" />
          <span className="text-xs">phpMyAdmin</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex-col gap-2"
        >
          <Shield className="w-5 h-5" />
          <span className="text-xs">SSL</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex-col gap-2"
        >
          <Download className="w-5 h-5" />
          <span className="text-xs">پشتیبان‌گیری</span>
        </Button>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">نمای کلی</TabsTrigger>
          <TabsTrigger value="info">اطلاعات سرویس</TabsTrigger>
          <TabsTrigger value="access">اطلاعات دسترسی</TabsTrigger>
          <TabsTrigger value="resources">منابع</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Service Status Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>وضعیت سرویس</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">نام بسته</TableCell>
                      <TableCell>{hostingData.packageName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">دامنه اصلی</TableCell>
                      <TableCell className="font-mono">{hostingData.domain}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">وضعیت</TableCell>
                      <TableCell>{getStatusBadge(hostingData.status)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">تاریخ ثبت</TableCell>
                      <TableCell>{formatDate(new Date(hostingData.registrationDate), 'fa')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">تاریخ تمدید بعدی</TableCell>
                      <TableCell className="text-orange-600 dark:text-orange-400 font-medium">
                        {formatDate(new Date(hostingData.nextDueDate), 'fa')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">مبلغ تمدید</TableCell>
                      <TableCell className="font-semibold">
                        {formatNumber(hostingData.recurringAmount, 'fa')} تومان
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">عملیات سریع</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <RefreshCw className="w-4 h-4 ml-2" />
                    تمدید سرویس
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="w-4 h-4 ml-2" />
                    ارتقا پلن
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="w-4 h-4 ml-2" />
                    مدیریت SSL
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    پشتیبان‌گیری
                  </Button>
                </CardContent>
              </Card>

              {/* SSL Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    وضعیت SSL
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">وضعیت</span>
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                      {hostingData.sslStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">ارائه‌دهنده</span>
                    <span className="text-sm font-medium">{hostingData.sslProvider}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">تاریخ انقضا</span>
                    <span className="text-sm font-medium">
                      {formatDate(new Date(hostingData.sslExpiryDate), 'fa')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Resource Usage */}
          <Card>
            <CardHeader>
              <CardTitle>میزان استفاده از منابع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Disk Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-primary" />
                    <span className="font-medium">فضای دیسک</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatNumber(hostingData.diskUsed, 'fa')} / {formatNumber(hostingData.diskLimit, 'fa')} GB
                  </span>
                </div>
                <Progress value={hostingData.diskUsagePercent} className="h-3" />
                <p className="text-xs text-muted-foreground text-left">
                  {formatNumber(hostingData.diskUsagePercent, 'fa')}% استفاده شده
                </p>
              </div>

              <Separator />

              {/* Bandwidth Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-medium">پهنای باند</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatNumber(hostingData.bandwidthUsed, 'fa')} / {formatNumber(hostingData.bandwidthLimit, 'fa')} GB
                  </span>
                </div>
                <Progress value={hostingData.bandwidthUsagePercent} className="h-3" />
                <p className="text-xs text-muted-foreground text-left">
                  {formatNumber(hostingData.bandwidthUsagePercent, 'fa')}% استفاده شده
                </p>
              </div>

              <Separator />

              {/* Resource Summary Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Mail className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">
                    {formatNumber(hostingData.emailAccounts, 'fa')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    از {formatNumber(hostingData.emailLimit, 'fa')} ایمیل
                  </div>
                </div>

                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Database className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">
                    {formatNumber(hostingData.databases, 'fa')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    از {formatNumber(hostingData.databaseLimit, 'fa')} دیتابیس
                  </div>
                </div>

                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Globe className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">
                    {formatNumber(hostingData.subdomains, 'fa')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ساب‌دامنه
                  </div>
                </div>

                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Server className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">
                    {formatNumber(hostingData.ftpAccounts, 'fa')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    از {formatNumber(hostingData.ftpAccountLimit, 'fa')} FTP
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Info Tab */}
        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle>اطلاعات صورتحساب</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">دوره پرداخت</TableCell>
                      <TableCell>{hostingData.billingCycle}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">روش پرداخت</TableCell>
                      <TableCell>{hostingData.paymentMethod}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">مبلغ اولین پرداخت</TableCell>
                      <TableCell>{formatNumber(hostingData.firstPaymentAmount, 'fa')} تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">مبلغ تمدید</TableCell>
                      <TableCell className="font-semibold">
                        {formatNumber(hostingData.recurringAmount, 'fa')} تومان
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">تاریخ تمدید بعدی</TableCell>
                      <TableCell className="text-orange-600 dark:text-orange-400">
                        {formatDate(new Date(hostingData.nextDueDate), 'fa')}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Server Information */}
            <Card>
              <CardHeader>
                <CardTitle>اطلاعات سرور</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">نام سرور</TableCell>
                      <TableCell>{hostingData.serverName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">IP سرور</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{hostingData.serverIP}</span>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => copyToClipboard(hostingData.serverIP, 'IP سرور')}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">IP اختصاصی</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{hostingData.dedicatedIP}</span>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => copyToClipboard(hostingData.dedicatedIP, 'IP اختصاصی')}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Nameservers */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>نیم سرورها (Nameservers)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hostingData.nameservers.map((ns, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono text-sm">{ns}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(ns, 'نیم سرور')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-4">
                  برای اتصال دامنه خود به این هاست، نیم سرورهای بالا را در تنظیمات دامنه خود وارد کنید.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Access Information Tab */}
        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* cPanel Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5" />
                    دسترسی cPanel
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(hostingData.cpanelUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 ml-1" />
                    ورود
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">آدرس</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">{hostingData.cpanelUrl}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.cpanelUrl, 'آدرس cPanel')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">نام کاربری</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">{hostingData.cpanelUsername}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.cpanelUsername, 'نام کاربری')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">رمز عبور</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">
                      {showPassword ? hostingData.cpanelPassword : '••••••••••••'}
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
              </CardContent>
            </Card>

            {/* FTP Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  دسترسی FTP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">آدرس هاست</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">{hostingData.ftpHostname}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.ftpHostname, 'آدرس FTP')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">پورت</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">{hostingData.ftpPort}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.ftpPort, 'پورت FTP')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">نام کاربری</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">{hostingData.ftpUsername}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.ftpUsername, 'نام کاربری FTP')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">رمز عبور</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">
                      {showFtpPassword ? hostingData.ftpPassword : '••••••••••••'}
                    </span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setShowFtpPassword(!showFtpPassword)}
                    >
                      {showFtpPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.ftpPassword, 'رمز عبور FTP')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    پایگاه داده
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(hostingData.phpMyAdminUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 ml-1" />
                    phpMyAdmin
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">آدرس هاست</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">{hostingData.databaseHost}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.databaseHost, 'آدرس دیتابیس')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  برای مدیریت دیتابیس‌ها و کاربران، از phpMyAdmin یا بخش MySQL Databases در cPanel استفاده کنید.
                </p>
              </CardContent>
            </Card>

            {/* Webmail Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Webmail
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(hostingData.webmailUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 ml-1" />
                    ورود
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">آدرس</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <span className="font-mono text-sm flex-1">{hostingData.webmailUrl}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(hostingData.webmailUrl, 'آدرس Webmail')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  برای دسترسی به ایمیل‌های خود از طریق مرورگر، از Webmail استفاده کنید.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>منابع و محدودیت‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">فضای دیسک</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={hostingData.diskUsagePercent} className="flex-1 h-2" />
                        <span className="text-sm whitespace-nowrap">
                          {formatNumber(hostingData.diskUsed, 'fa')} / {formatNumber(hostingData.diskLimit, 'fa')} GB
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">پهنای باند</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={hostingData.bandwidthUsagePercent} className="flex-1 h-2" />
                        <span className="text-sm whitespace-nowrap">
                          {formatNumber(hostingData.bandwidthUsed, 'fa')} / {formatNumber(hostingData.bandwidthLimit, 'fa')} GB
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">اکانت‌های ایمیل</TableCell>
                    <TableCell>
                      {formatNumber(hostingData.emailAccounts, 'fa')} / {formatNumber(hostingData.emailLimit, 'fa')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">پایگاه‌های داده</TableCell>
                    <TableCell>
                      {formatNumber(hostingData.databases, 'fa')} / {formatNumber(hostingData.databaseLimit, 'fa')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ساب‌دامنه‌ها</TableCell>
                    <TableCell>
                      {formatNumber(hostingData.subdomains, 'fa')} / {hostingData.subdomainLimit}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">اکانت‌های FTP</TableCell>
                    <TableCell>
                      {formatNumber(hostingData.ftpAccounts, 'fa')} / {formatNumber(hostingData.ftpAccountLimit, 'fa')}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostingServiceDetail;

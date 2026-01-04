import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
  CheckCircle2,
  XCircle,
  AlertCircle,
  Settings,
  Lock,
  Terminal
} from 'lucide-react';
import { toast } from 'sonner';
import { toPersianDigits, formatNumber, formatDate } from '@/lib/numberUtils';

interface HostingManagementPanelProps {
  serviceId: string;
  onBack?: () => void;
}

// Panel type icons and colors
const panelConfigs = {
  cpanel: {
    name: 'cPanel',
    color: 'bg-orange-500',
    icon: LayoutDashboard,
    loginUrl: ':2083'
  },
  directadmin: {
    name: 'DirectAdmin',
    color: 'bg-blue-600',
    icon: Settings,
    loginUrl: ':2222'
  },
  cyberpanel: {
    name: 'CyberPanel',
    color: 'bg-green-500',
    icon: Terminal,
    loginUrl: ':8090'
  },
  aapanel: {
    name: 'aaPanel',
    color: 'bg-sky-500',
    icon: Server,
    loginUrl: ':8888'
  },
  plesk: {
    name: 'Plesk',
    color: 'bg-indigo-600',
    icon: Globe,
    loginUrl: ':8443'
  },
  cwp: {
    name: 'CWP',
    color: 'bg-purple-600',
    icon: Database,
    loginUrl: ':2030'
  }
};

const HostingManagementPanel: React.FC<HostingManagementPanelProps> = ({ serviceId, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showFtpPassword, setShowFtpPassword] = useState(false);
  const [showDbPassword, setShowDbPassword] = useState(false);

  // Mock data
  const hostingData = {
    id: serviceId,
    packageName: 'پکیج هاستینگ Premium',
    domain: 'example.ir',
    panelType: 'cpanel' as keyof typeof panelConfigs,
    status: 'Active',
    registrationDate: '2024-01-15',
    nextDueDate: '2025-01-15',
    billingCycle: 'سالانه',
    recurringAmount: 1200000,
    
    // Server
    serverName: 'Server IR-1',
    serverIP: '۱۸۵.۱۲۳.۴۵.۶۷',
    nameservers: ['ns1.novinvds.ir', 'ns2.novinvds.ir'],
    
    // Panel Access
    panelUrl: 'https://server.novinvds.ir',
    panelUsername: 'exampleir',
    panelPassword: 'SecurePass123',
    
    // FTP Access
    ftpHostname: 'ftp.example.ir',
    ftpPort: '۲۱',
    ftpUsername: 'exampleir',
    ftpPassword: 'FtpPass456',
    
    // Database
    dbHost: 'localhost',
    dbUsername: 'exampleir_db',
    dbPassword: 'DbPass789',
    phpMyAdminUrl: 'https://server.novinvds.ir:2083/phpmyadmin',
    
    // Webmail
    webmailUrl: 'https://webmail.example.ir',
    
    // Resources
    diskUsed: 2.5,
    diskLimit: 10,
    diskUsagePercent: 25,
    bandwidthUsed: 15.3,
    bandwidthLimit: 100,
    bandwidthUsagePercent: 15.3,
    emailAccounts: 5,
    emailLimit: 50,
    databases: 3,
    databaseLimit: 10,
    
    // SSL
    sslStatus: 'فعال',
    sslExpiryDate: '2025-04-15'
  };

  const panelConfig = panelConfigs[hostingData.panelType];
  const PanelIcon = panelConfig.icon;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} کپی شد`);
  };

  const openPanel = () => {
    const url = `${hostingData.panelUrl}${panelConfig.loginUrl}`;
    window.open(url, '_blank');
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
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            بازگشت به سرویس‌ها
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              {hostingData.domain}
            </h1>
            <p className="text-muted-foreground">{hostingData.packageName}</p>
          </div>
        </div>
        {getStatusBadge(hostingData.status)}
      </div>

      {/* Panel Access Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${panelConfig.color} flex items-center justify-center`}>
                <PanelIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">ورود به پنل {panelConfig.name}</h3>
                <p className="text-sm text-muted-foreground">مدیریت کامل هاستینگ</p>
              </div>
            </div>
            <Button onClick={openPanel} className="gap-2">
              <ExternalLink className="w-4 h-4" />
              ورود به پنل
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background rounded-lg p-4">
              <label className="text-sm text-muted-foreground">آدرس پنل</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 text-sm font-mono">{hostingData.panelUrl}{panelConfig.loginUrl}</code>
                <Button size="icon" variant="ghost" onClick={() => copyToClipboard(`${hostingData.panelUrl}${panelConfig.loginUrl}`, 'آدرس پنل')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4">
              <label className="text-sm text-muted-foreground">نام کاربری</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 text-sm font-mono">{hostingData.panelUsername}</code>
                <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.panelUsername, 'نام کاربری')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4">
              <label className="text-sm text-muted-foreground">رمز عبور</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 text-sm font-mono">
                  {showPassword ? hostingData.panelPassword : '••••••••••'}
                </code>
                <Button size="icon" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.panelPassword, 'رمز عبور')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
          onClick={openPanel}
        >
          <PanelIcon className="w-6 h-6" />
          <span className="text-xs">{panelConfig.name}</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
          onClick={() => window.open(hostingData.webmailUrl, '_blank')}
        >
          <Mail className="w-6 h-6" />
          <span className="text-xs">Webmail</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs">مدیریت فایل</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
          onClick={() => window.open(hostingData.phpMyAdminUrl, '_blank')}
        >
          <Database className="w-6 h-6" />
          <span className="text-xs">phpMyAdmin</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
        >
          <Shield className="w-6 h-6" />
          <span className="text-xs">SSL</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
        >
          <Download className="w-6 h-6" />
          <span className="text-xs">پشتیبان‌گیری</span>
        </Button>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">نمای کلی</TabsTrigger>
          <TabsTrigger value="access">اطلاعات دسترسی</TabsTrigger>
          <TabsTrigger value="resources">منابع</TabsTrigger>
          <TabsTrigger value="billing">صورتحساب</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>اطلاعات سرویس</CardTitle>
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
                      <TableCell className="font-medium">کنترل پنل</TableCell>
                      <TableCell>
                        <Badge className={`${panelConfig.color} text-white`}>
                          {panelConfig.name}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">آی‌پی سرور</TableCell>
                      <TableCell className="font-mono">{hostingData.serverIP}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">وضعیت SSL</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-100 text-emerald-800">
                          {hostingData.sslStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">نیم‌سرورها</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hostingData.nameservers.map((ns, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                    <span className="text-sm font-mono">{ns}</span>
                    <Button size="icon" variant="ghost" onClick={() => copyToClipboard(ns, 'نیم‌سرور')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Resource Usage */}
          <Card>
            <CardHeader>
              <CardTitle>میزان استفاده از منابع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-primary" />
                    <span className="font-medium">فضای دیسک</span>
                  </div>
                  <span className="text-sm font-medium">
                    {toPersianDigits(hostingData.diskUsed.toString())} / {toPersianDigits(hostingData.diskLimit.toString())} GB
                  </span>
                </div>
                <Progress value={hostingData.diskUsagePercent} className="h-3" />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-medium">پهنای باند</span>
                  </div>
                  <span className="text-sm font-medium">
                    {toPersianDigits(hostingData.bandwidthUsed.toString())} / {toPersianDigits(hostingData.bandwidthLimit.toString())} GB
                  </span>
                </div>
                <Progress value={hostingData.bandwidthUsagePercent} className="h-3" />
              </div>

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Mail className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">{toPersianDigits(hostingData.emailAccounts.toString())}</div>
                  <div className="text-xs text-muted-foreground">از {toPersianDigits(hostingData.emailLimit.toString())} ایمیل</div>
                </div>

                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Database className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">{toPersianDigits(hostingData.databases.toString())}</div>
                  <div className="text-xs text-muted-foreground">از {toPersianDigits(hostingData.databaseLimit.toString())} دیتابیس</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Info Tab */}
        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FTP Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  اطلاعات FTP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <label className="text-sm text-muted-foreground">آدرس FTP</label>
                  <div className="flex items-center justify-between mt-1">
                    <code className="font-mono text-sm">{hostingData.ftpHostname}</code>
                    <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.ftpHostname, 'آدرس FTP')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <label className="text-sm text-muted-foreground">پورت</label>
                  <div className="flex items-center justify-between mt-1">
                    <code className="font-mono text-sm">{hostingData.ftpPort}</code>
                    <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.ftpPort, 'پورت')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <label className="text-sm text-muted-foreground">نام کاربری</label>
                  <div className="flex items-center justify-between mt-1">
                    <code className="font-mono text-sm">{hostingData.ftpUsername}</code>
                    <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.ftpUsername, 'نام کاربری')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <label className="text-sm text-muted-foreground">رمز عبور</label>
                  <div className="flex items-center justify-between mt-1">
                    <code className="font-mono text-sm">
                      {showFtpPassword ? hostingData.ftpPassword : '••••••••••'}
                    </code>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setShowFtpPassword(!showFtpPassword)}>
                        {showFtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.ftpPassword, 'رمز عبور')}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  اطلاعات دیتابیس
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <label className="text-sm text-muted-foreground">هاست دیتابیس</label>
                  <div className="flex items-center justify-between mt-1">
                    <code className="font-mono text-sm">{hostingData.dbHost}</code>
                    <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.dbHost, 'هاست')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <label className="text-sm text-muted-foreground">نام کاربری</label>
                  <div className="flex items-center justify-between mt-1">
                    <code className="font-mono text-sm">{hostingData.dbUsername}</code>
                    <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.dbUsername, 'نام کاربری')}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <label className="text-sm text-muted-foreground">رمز عبور</label>
                  <div className="flex items-center justify-between mt-1">
                    <code className="font-mono text-sm">
                      {showDbPassword ? hostingData.dbPassword : '••••••••••'}
                    </code>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setShowDbPassword(!showDbPassword)}>
                        {showDbPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => copyToClipboard(hostingData.dbPassword, 'رمز عبور')}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full" variant="outline" onClick={() => window.open(hostingData.phpMyAdminUrl, '_blank')}>
                  <ExternalLink className="w-4 h-4 ml-2" />
                  ورود به phpMyAdmin
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مصرف منابع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">فضای دیسک</h3>
                  <Progress value={hostingData.diskUsagePercent} className="h-4" />
                  <p className="text-sm text-muted-foreground">
                    {toPersianDigits(hostingData.diskUsed.toString())} GB از {toPersianDigits(hostingData.diskLimit.toString())} GB استفاده شده
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">پهنای باند</h3>
                  <Progress value={hostingData.bandwidthUsagePercent} className="h-4" />
                  <p className="text-sm text-muted-foreground">
                    {toPersianDigits(hostingData.bandwidthUsed.toString())} GB از {toPersianDigits(hostingData.bandwidthLimit.toString())} GB استفاده شده
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
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
                    <TableCell className="font-medium">تاریخ ثبت</TableCell>
                    <TableCell>{formatDate(hostingData.registrationDate, 'fa')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">تاریخ تمدید بعدی</TableCell>
                    <TableCell className="text-orange-600">{formatDate(hostingData.nextDueDate, 'fa')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">مبلغ تمدید</TableCell>
                    <TableCell className="font-bold text-lg">
                      {formatNumber(hostingData.recurringAmount, 'fa')} تومان
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  تمدید سرویس
                </Button>
                <Button variant="outline" className="flex-1">
                  <CreditCard className="w-4 h-4 ml-2" />
                  ارتقا پلن
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostingManagementPanel;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, Globe, Copy, Eye, EyeOff, ExternalLink,
  HardDrive, Database, Mail, Shield, FileText, Download,
  RefreshCw, CreditCard, Server, LayoutDashboard,
  CheckCircle2, XCircle, AlertCircle, Settings, Terminal, Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { toPersianDigits, formatNumber, formatDate } from '@/lib/numberUtils';

interface HostingManagementPanelProps {
  serviceId: string;
  onBack?: () => void;
}

const panelConfigs = {
  cpanel: { name: 'cPanel', color: 'bg-orange-500', icon: LayoutDashboard, loginUrl: ':2083' },
  directadmin: { name: 'DirectAdmin', color: 'bg-blue-600', icon: Settings, loginUrl: ':2222' },
  cyberpanel: { name: 'CyberPanel', color: 'bg-green-500', icon: Terminal, loginUrl: ':8090' },
  aapanel: { name: 'aaPanel', color: 'bg-sky-500', icon: Server, loginUrl: ':8888' },
  plesk: { name: 'Plesk', color: 'bg-indigo-600', icon: Globe, loginUrl: ':8443' },
  cwp: { name: 'CWP', color: 'bg-purple-600', icon: Database, loginUrl: ':2030' }
};

const HostingManagementPanel: React.FC<HostingManagementPanelProps> = ({ serviceId, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showFtpPassword, setShowFtpPassword] = useState(false);
  const [showDbPassword, setShowDbPassword] = useState(false);

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
    serverName: 'Server IR-1',
    serverIP: '۱۸۵.۱۲۳.۴۵.۶۷',
    nameservers: ['ns1.novinvds.ir', 'ns2.novinvds.ir'],
    panelUrl: 'https://server.novinvds.ir',
    panelUsername: 'exampleir',
    panelPassword: 'SecurePass123',
    ftpHostname: 'ftp.example.ir',
    ftpPort: '۲۱',
    ftpUsername: 'exampleir',
    ftpPassword: 'FtpPass456',
    dbHost: 'localhost',
    dbUsername: 'exampleir_db',
    dbPassword: 'DbPass789',
    phpMyAdminUrl: 'https://server.novinvds.ir:2083/phpmyadmin',
    webmailUrl: 'https://webmail.example.ir',
    diskUsed: 2.5, diskLimit: 10, diskUsagePercent: 25,
    bandwidthUsed: 15.3, bandwidthLimit: 100, bandwidthUsagePercent: 15.3,
    emailAccounts: 5, emailLimit: 50,
    databases: 3, databaseLimit: 10,
    sslStatus: 'فعال', sslExpiryDate: '2025-04-15'
  };

  const panelConfig = panelConfigs[hostingData.panelType];
  const PanelIcon = panelConfig.icon;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} کپی شد`);
  };

  const openPanel = () => {
    window.open(`${hostingData.panelUrl}${panelConfig.loginUrl}`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Active') return <Badge className="bg-emerald-100 text-emerald-800 flex items-center gap-1 text-[10px] md:text-xs"><CheckCircle2 className="w-3 h-3" />فعال</Badge>;
    if (status === 'Suspended') return <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1 text-[10px] md:text-xs"><AlertCircle className="w-3 h-3" />تعلیق</Badge>;
    return <Badge className="bg-red-100 text-red-800 flex items-center gap-1 text-[10px] md:text-xs"><XCircle className="w-3 h-3" />غیرفعال</Badge>;
  };

  const CredentialField = ({ label, value, hidden, onToggle, showCopy = true }: { label: string; value: string; hidden?: boolean; onToggle?: () => void; showCopy?: boolean }) => (
    <div className="bg-muted/50 p-2.5 md:p-3 rounded-lg">
      <label className="text-[10px] md:text-xs text-muted-foreground">{label}</label>
      <div className="flex items-center justify-between mt-1 gap-2">
        <code className="flex-1 text-xs md:text-sm font-mono truncate">{hidden !== undefined ? (hidden ? '••••••••' : value) : value}</code>
        <div className="flex gap-0.5 shrink-0">
          {onToggle && (
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onToggle}>
              {hidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </Button>
          )}
          {showCopy && (
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(value, label)}>
              <Copy className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack} className="self-start flex items-center gap-1 text-xs">
          <ArrowRight className="h-3.5 w-3.5" />
          بازگشت
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${panelConfig.color} flex items-center justify-center shrink-0`}>
            <PanelIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base md:text-xl font-bold truncate flex items-center gap-2">
              {hostingData.domain}
              {getStatusBadge(hostingData.status)}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate">{hostingData.packageName} • {panelConfig.name}</p>
          </div>
        </div>
      </div>

      {/* Panel Quick Access */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 md:mb-4">
            <h3 className="text-sm md:text-base font-bold">دسترسی سریع به پنل {panelConfig.name}</h3>
            <Button onClick={openPanel} size="sm" className="gap-1.5 text-xs md:text-sm w-full sm:w-auto">
              <ExternalLink className="w-3.5 h-3.5" />
              ورود به پنل
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
            <CredentialField label="آدرس پنل" value={`${hostingData.panelUrl}${panelConfig.loginUrl}`} />
            <CredentialField label="نام کاربری" value={hostingData.panelUsername} />
            <CredentialField label="رمز عبور" value={hostingData.panelPassword} hidden={!showPassword} onToggle={() => setShowPassword(!showPassword)} />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {[
          { label: panelConfig.name, icon: PanelIcon, onClick: openPanel },
          { label: 'Webmail', icon: Mail, onClick: () => window.open(hostingData.webmailUrl, '_blank') },
          { label: 'مدیریت فایل', icon: FileText, onClick: () => {} },
          { label: 'phpMyAdmin', icon: Database, onClick: () => window.open(hostingData.phpMyAdminUrl, '_blank') },
          { label: 'SSL', icon: Shield, onClick: () => {} },
          { label: 'پشتیبان‌گیری', icon: Download, onClick: () => {} },
        ].map((action, i) => (
          <Button key={i} variant="outline" className="h-auto py-2.5 md:py-3 flex-col gap-1.5" onClick={action.onClick}>
            <action.icon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-[9px] md:text-xs">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full overflow-x-auto justify-start gap-0 h-auto p-1">
          <TabsTrigger value="overview" className="text-[10px] md:text-xs px-2 md:px-3 py-1.5">نمای کلی</TabsTrigger>
          <TabsTrigger value="access" className="text-[10px] md:text-xs px-2 md:px-3 py-1.5">دسترسی‌ها</TabsTrigger>
          <TabsTrigger value="resources" className="text-[10px] md:text-xs px-2 md:px-3 py-1.5">منابع</TabsTrigger>
          <TabsTrigger value="billing" className="text-[10px] md:text-xs px-2 md:px-3 py-1.5">صورتحساب</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="text-sm md:text-base">اطلاعات سرویس</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6">
                <div className="space-y-2">
                  {[
                    { label: 'نام بسته', value: hostingData.packageName },
                    { label: 'دامنه اصلی', value: hostingData.domain, mono: true },
                    { label: 'کنترل پنل', value: panelConfig.name, badge: true, badgeColor: panelConfig.color },
                    { label: 'آی‌پی سرور', value: hostingData.serverIP, mono: true },
                    { label: 'وضعیت SSL', value: hostingData.sslStatus, badgeGreen: true },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-[10px] md:text-sm text-muted-foreground">{row.label}</span>
                      {row.badge ? (
                        <Badge className={`${row.badgeColor} text-white text-[10px] md:text-xs`}>{row.value}</Badge>
                      ) : row.badgeGreen ? (
                        <Badge className="bg-emerald-100 text-emerald-800 text-[10px] md:text-xs">{row.value}</Badge>
                      ) : (
                        <span className={`text-xs md:text-sm font-medium ${row.mono ? 'font-mono' : ''}`}>{row.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="text-sm md:text-base">نیم‌سرورها</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-2">
                {hostingData.nameservers.map((ns, i) => (
                  <div key={i} className="flex items-center justify-between bg-muted/50 p-2 md:p-3 rounded-lg">
                    <span className="text-xs md:text-sm font-mono truncate">{ns}</span>
                    <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={() => copyToClipboard(ns, 'نیم‌سرور')}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Resource Summary */}
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="text-sm md:text-base">مصرف منابع</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-primary" />
                      <span className="text-xs md:text-sm font-medium">فضای دیسک</span>
                    </div>
                    <span className="text-[10px] md:text-xs">{toPersianDigits(hostingData.diskUsed.toString())} / {toPersianDigits(hostingData.diskLimit.toString())} GB</span>
                  </div>
                  <Progress value={hostingData.diskUsagePercent} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-xs md:text-sm font-medium">پهنای باند</span>
                    </div>
                    <span className="text-[10px] md:text-xs">{toPersianDigits(hostingData.bandwidthUsed.toString())} / {toPersianDigits(hostingData.bandwidthLimit.toString())} GB</span>
                  </div>
                  <Progress value={hostingData.bandwidthUsagePercent} className="h-2" />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Mail, label: 'ایمیل', used: hostingData.emailAccounts, total: hostingData.emailLimit },
                  { icon: Database, label: 'دیتابیس', used: hostingData.databases, total: hostingData.databaseLimit },
                ].map((item, i) => (
                  <div key={i} className="text-center p-2 md:p-3 bg-muted/50 rounded-lg">
                    <item.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <div className="text-base md:text-lg font-bold">{toPersianDigits(item.used.toString())}</div>
                    <div className="text-[9px] md:text-xs text-muted-foreground">از {toPersianDigits(item.total.toString())} {item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Tab */}
        <TabsContent value="access" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* FTP */}
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                  <Server className="w-4 h-4" />
                  اطلاعات FTP
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-2">
                <CredentialField label="آدرس FTP" value={hostingData.ftpHostname} />
                <CredentialField label="پورت" value={hostingData.ftpPort} />
                <CredentialField label="نام کاربری" value={hostingData.ftpUsername} />
                <CredentialField label="رمز عبور" value={hostingData.ftpPassword} hidden={!showFtpPassword} onToggle={() => setShowFtpPassword(!showFtpPassword)} />
              </CardContent>
            </Card>

            {/* Database */}
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                  <Database className="w-4 h-4" />
                  اطلاعات دیتابیس
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-2">
                <CredentialField label="هاست" value={hostingData.dbHost} />
                <CredentialField label="نام کاربری" value={hostingData.dbUsername} />
                <CredentialField label="رمز عبور" value={hostingData.dbPassword} hidden={!showDbPassword} onToggle={() => setShowDbPassword(!showDbPassword)} />
                <Button className="w-full text-xs h-8 mt-2" variant="outline" onClick={() => window.open(hostingData.phpMyAdminUrl, '_blank')}>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  ورود به phpMyAdmin
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="text-sm md:text-base">مصرف منابع</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs md:text-sm font-medium">فضای دیسک</h3>
                  <Progress value={hostingData.diskUsagePercent} className="h-3" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">
                    {toPersianDigits(hostingData.diskUsed.toString())} GB از {toPersianDigits(hostingData.diskLimit.toString())} GB
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs md:text-sm font-medium">پهنای باند</h3>
                  <Progress value={hostingData.bandwidthUsagePercent} className="h-3" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">
                    {toPersianDigits(hostingData.bandwidthUsed.toString())} GB از {toPersianDigits(hostingData.bandwidthLimit.toString())} GB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="text-sm md:text-base">اطلاعات صورتحساب</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="space-y-2">
                {[
                  { label: 'دوره پرداخت', value: hostingData.billingCycle },
                  { label: 'تاریخ ثبت', value: formatDate(hostingData.registrationDate, 'fa') },
                  { label: 'تاریخ تمدید بعدی', value: formatDate(hostingData.nextDueDate, 'fa'), warning: true },
                  { label: 'مبلغ تمدید', value: `${formatNumber(hostingData.recurringAmount, 'fa')} تومان`, bold: true },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-[10px] md:text-sm text-muted-foreground">{row.label}</span>
                    <span className={`text-xs md:text-sm ${row.bold ? 'font-bold text-base' : ''} ${row.warning ? 'text-orange-600' : ''}`}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button className="text-xs md:text-sm h-9">
                  <RefreshCw className="w-3.5 h-3.5 ml-1.5" />
                  تمدید سرویس
                </Button>
                <Button variant="outline" className="text-xs md:text-sm h-9">
                  <CreditCard className="w-3.5 h-3.5 ml-1.5" />
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

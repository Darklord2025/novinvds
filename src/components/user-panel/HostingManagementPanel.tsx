
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowRight, Globe, Copy, Eye, EyeOff, ExternalLink,
  HardDrive, Database, Mail, Shield, FileText, Download,
  RefreshCw, CreditCard, Server, LayoutDashboard,
  CheckCircle2, XCircle, AlertCircle, Settings, Terminal, Lock,
  FolderOpen, Upload, Code, Cpu, MemoryStick, Zap,
  Key, Search, Plus, Trash2, Edit, RotateCcw, Clock, AlertTriangle
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
    serverIP: '185.123.45.67',
    os: 'CloudLinux 8',
    location: 'تهران، ایران',
    nameservers: ['ns1.novinvds.ir', 'ns2.novinvds.ir'],
    panelUrl: 'https://server.novinvds.ir',
    panelUsername: 'exampleir',
    panelPassword: 'SecurePass123',
    ftpHostname: 'ftp.example.ir',
    ftpPort: '21',
    ftpUsername: 'exampleir',
    ftpPassword: 'FtpPass456',
    dbHost: 'localhost',
    dbUsername: 'exampleir_db',
    dbPassword: 'DbPass789',
    phpMyAdminUrl: 'https://server.novinvds.ir:2083/phpmyadmin',
    webmailUrl: 'https://webmail.example.ir',
    diskUsed: 2.5, diskLimit: 10, diskUsagePercent: 25,
    bandwidthUsed: 15.3, bandwidthLimit: 100, bandwidthUsagePercent: 15.3,
    inodeUsed: 45000, inodeLimit: 200000, inodePercent: 22.5,
    cpuUsage: 12, cpuLimit: 100,
    ramUsed: 256, ramLimit: 1024, ramPercent: 25,
    entryProcess: 8, entryProcessLimit: 30,
    emailAccounts: 5, emailLimit: 50,
    databases: 3, databaseLimit: 10,
    subdomains: 2, subdomainLimit: 20,
    addonDomains: 1, addonDomainLimit: 5,
    sslStatus: 'فعال', sslExpiryDate: '2025-04-15',
    phpVersion: '8.2',
  };

  const panelConfig = panelConfigs[hostingData.panelType];
  const PanelIcon = panelConfig.icon;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} کپی شد`);
  };

  const openPanel = () => window.open(`${hostingData.panelUrl}${panelConfig.loginUrl}`, '_blank');

  const getStatusBadge = (status: string) => {
    if (status === 'Active') return <Badge className="bg-emerald-100 text-emerald-800 text-[10px] md:text-xs"><CheckCircle2 className="w-3 h-3 ml-1" />فعال</Badge>;
    if (status === 'Suspended') return <Badge className="bg-amber-100 text-amber-800 text-[10px] md:text-xs"><AlertCircle className="w-3 h-3 ml-1" />تعلیق</Badge>;
    return <Badge className="bg-red-100 text-red-800 text-[10px] md:text-xs"><XCircle className="w-3 h-3 ml-1" />غیرفعال</Badge>;
  };

  const CredentialField = ({ label, value, hidden, onToggle }: { label: string; value: string; hidden?: boolean; onToggle?: () => void }) => (
    <div className="bg-muted/50 p-2.5 rounded-lg">
      <label className="text-[10px] md:text-xs text-muted-foreground">{label}</label>
      <div className="flex items-center justify-between mt-1 gap-2">
        <code className="flex-1 text-xs font-mono truncate">{hidden !== undefined ? (hidden ? '••••••••' : value) : value}</code>
        <div className="flex gap-0.5 shrink-0">
          {onToggle && (
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onToggle}>
              {hidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </Button>
          )}
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(value, label)}>
            <Copy className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );

  const ResourceBar = ({ label, icon: Icon, used, total, unit, percent }: { label: string; icon: any; used: number | string; total: number | string; unit: string; percent: number }) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium">{label}</span>
        </div>
        <span className={`text-[10px] font-bold ${percent >= 80 ? 'text-red-500' : percent >= 60 ? 'text-amber-500' : 'text-emerald-500'}`}>
          {toPersianDigits(percent.toFixed(0))}٪
        </span>
      </div>
      <Progress value={percent} className="h-1.5" />
      <p className="text-[10px] text-muted-foreground">{toPersianDigits(String(used))} / {toPersianDigits(String(total))} {unit}</p>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack} className="self-start flex items-center gap-1 text-xs">
          <ArrowRight className="h-3.5 w-3.5" />
          بازگشت به سرویس‌ها
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-xl ${panelConfig.color} flex items-center justify-center shrink-0`}>
            <PanelIcon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base md:text-xl font-bold truncate flex items-center gap-2">
              {hostingData.domain}
              {getStatusBadge(hostingData.status)}
            </h1>
            <p className="text-xs text-muted-foreground truncate">{hostingData.packageName} • {panelConfig.name} • {hostingData.os}</p>
          </div>
        </div>
      </div>

      {/* Panel Quick Access */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <h3 className="text-sm font-bold">دسترسی سریع به پنل {panelConfig.name}</h3>
            <Button onClick={openPanel} size="sm" className="gap-1.5 text-xs w-full sm:w-auto">
              <ExternalLink className="w-3.5 h-3.5" />
              ورود به پنل
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <CredentialField label="آدرس پنل" value={`${hostingData.panelUrl}${panelConfig.loginUrl}`} />
            <CredentialField label="نام کاربری" value={hostingData.panelUsername} />
            <CredentialField label="رمز عبور" value={hostingData.panelPassword} hidden={!showPassword} onToggle={() => setShowPassword(!showPassword)} />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {[
          { label: panelConfig.name, icon: PanelIcon, onClick: openPanel },
          { label: 'Webmail', icon: Mail, onClick: () => window.open(hostingData.webmailUrl, '_blank') },
          { label: 'مدیریت فایل', icon: FolderOpen, onClick: () => toast.info('در حال باز کردن فایل منیجر...') },
          { label: 'phpMyAdmin', icon: Database, onClick: () => window.open(hostingData.phpMyAdminUrl, '_blank') },
          { label: 'SSL', icon: Shield, onClick: () => toast.info('مدیریت SSL') },
          { label: 'بکاپ', icon: Download, onClick: () => toast.info('مدیریت بکاپ') },
          { label: 'Cron Job', icon: Clock, onClick: () => toast.info('مدیریت Cron Job') },
          { label: 'نصب‌کننده', icon: Zap, onClick: () => toast.info('Softaculous') },
        ].map((action, i) => (
          <Button key={i} variant="outline" className="h-auto py-2 flex-col gap-1" onClick={action.onClick}>
            <action.icon className="w-4 h-4" />
            <span className="text-[8px] md:text-[10px] leading-tight text-center">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full overflow-x-auto justify-start gap-0 h-auto p-1 flex-wrap">
          {[
            { value: 'overview', label: 'نمای کلی' },
            { value: 'resources', label: 'مصرف منابع' },
            { value: 'files', label: 'مدیریت فایل' },
            { value: 'database', label: 'دیتابیس' },
            { value: 'email', label: 'ایمیل' },
            { value: 'security', label: 'امنیت' },
            { value: 'tools', label: 'ابزارها' },
            { value: 'billing', label: 'صورتحساب' },
          ].map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-[10px] md:text-xs px-2 md:px-3 py-1.5">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="text-sm">اطلاعات سرویس</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6">
                <div className="space-y-1.5">
                  {[
                    { label: 'نام پلن', value: hostingData.packageName },
                    { label: 'دامنه اصلی', value: hostingData.domain, mono: true },
                    { label: 'کنترل پنل', value: panelConfig.name },
                    { label: 'سیستم‌عامل', value: hostingData.os },
                    { label: 'آی‌پی سرور', value: hostingData.serverIP, mono: true },
                    { label: 'لوکیشن', value: hostingData.location },
                    { label: 'نسخه PHP', value: hostingData.phpVersion },
                    { label: 'SSL', value: hostingData.sslStatus },
                    { label: 'تاریخ انقضا', value: formatDate(hostingData.nextDueDate, 'fa'), warning: true },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-muted/50 last:border-0">
                      <span className="text-[10px] md:text-sm text-muted-foreground">{row.label}</span>
                      <span className={`text-xs md:text-sm font-medium ${row.mono ? 'font-mono' : ''} ${row.warning ? 'text-orange-600' : ''}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2 px-3">
                  <CardTitle className="text-sm">نیم‌سرورها</CardTitle>
                </CardHeader>
                <CardContent className="px-3 space-y-2">
                  {hostingData.nameservers.map((ns, i) => (
                    <div key={i} className="flex items-center justify-between bg-muted/50 p-2 rounded-lg">
                      <span className="text-xs font-mono truncate">{ns}</span>
                      <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={() => copyToClipboard(ns, 'نیم‌سرور')}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 px-3">
                  <CardTitle className="text-sm">خلاصه منابع</CardTitle>
                </CardHeader>
                <CardContent className="px-3 space-y-3">
                  <ResourceBar label="دیسک" icon={HardDrive} used={hostingData.diskUsed} total={hostingData.diskLimit} unit="GB" percent={hostingData.diskUsagePercent} />
                  <ResourceBar label="ترافیک" icon={Globe} used={hostingData.bandwidthUsed} total={hostingData.bandwidthLimit} unit="GB" percent={hostingData.bandwidthUsagePercent} />
                  <ResourceBar label="Inode" icon={FileText} used={hostingData.inodeUsed} total={hostingData.inodeLimit} unit="" percent={hostingData.inodePercent} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="text-sm">مصرف منابع</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResourceBar label="فضای دیسک" icon={HardDrive} used={hostingData.diskUsed} total={hostingData.diskLimit} unit="GB" percent={hostingData.diskUsagePercent} />
                <ResourceBar label="پهنای باند" icon={Globe} used={hostingData.bandwidthUsed} total={hostingData.bandwidthLimit} unit="GB" percent={hostingData.bandwidthUsagePercent} />
                <ResourceBar label="Inode" icon={FileText} used={hostingData.inodeUsed} total={hostingData.inodeLimit} unit="" percent={hostingData.inodePercent} />
                <ResourceBar label="CPU" icon={Cpu} used={hostingData.cpuUsage} total={hostingData.cpuLimit} unit="%" percent={hostingData.cpuUsage} />
                <ResourceBar label="RAM" icon={MemoryStick} used={hostingData.ramUsed} total={hostingData.ramLimit} unit="MB" percent={hostingData.ramPercent} />
                <ResourceBar label="Entry Process" icon={Zap} used={hostingData.entryProcess} total={hostingData.entryProcessLimit} unit="" percent={(hostingData.entryProcess / hostingData.entryProcessLimit) * 100} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Mail, label: 'ایمیل', used: hostingData.emailAccounts, total: hostingData.emailLimit },
              { icon: Database, label: 'دیتابیس', used: hostingData.databases, total: hostingData.databaseLimit },
              { icon: Globe, label: 'سابدامنه', used: hostingData.subdomains, total: hostingData.subdomainLimit },
              { icon: Globe, label: 'Addon Domain', used: hostingData.addonDomains, total: hostingData.addonDomainLimit },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 bg-muted/30 rounded-lg border">
                <item.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
                <div className="text-lg font-bold">{toPersianDigits(item.used)}</div>
                <div className="text-[9px] text-muted-foreground">از {toPersianDigits(item.total)} {item.label}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* File Management Tab */}
        <TabsContent value="files" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm"><FolderOpen className="w-4 h-4" />مدیریت فایل</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-3">
                <Button className="w-full text-xs h-9" onClick={() => toast.info('در حال باز کردن فایل منیجر...')}>
                  <FolderOpen className="w-3.5 h-3.5 ml-1.5" />
                  باز کردن File Manager
                </Button>
                <p className="text-[10px] text-muted-foreground">مدیریت فایل‌ها، آپلود، دانلود و ویرایش مستقیم از مرورگر</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm"><Upload className="w-4 h-4" />اکانت‌های FTP</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-2">
                <CredentialField label="آدرس FTP" value={hostingData.ftpHostname} />
                <CredentialField label="پورت" value={hostingData.ftpPort} />
                <CredentialField label="نام کاربری" value={hostingData.ftpUsername} />
                <CredentialField label="رمز عبور" value={hostingData.ftpPassword} hidden={!showFtpPassword} onToggle={() => setShowFtpPassword(!showFtpPassword)} />
                <Button variant="outline" className="w-full text-xs h-8 mt-2">
                  <Plus className="w-3 h-3 ml-1" />
                  ایجاد اکانت FTP جدید
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="flex items-center gap-2 text-sm"><Code className="w-4 h-4" />تنظیمات PHP</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">نسخه PHP فعلی</label>
                  <Select defaultValue="8.2">
                    <SelectTrigger className="h-9 text-xs mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['7.4', '8.0', '8.1', '8.2', '8.3'].map(v => (
                        <SelectItem key={v} value={v}>PHP {v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <Button variant="outline" className="text-xs h-9">
                    <Settings className="w-3.5 h-3.5 ml-1" />
                    PHP Extensions
                  </Button>
                  <Button variant="outline" className="text-xs h-9">
                    <Edit className="w-3.5 h-3.5 ml-1" />
                    تنظیمات .htaccess
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm"><Database className="w-4 h-4" />دیتابیس‌های MySQL</CardTitle>
                <Button size="sm" className="text-xs h-8"><Plus className="w-3 h-3 ml-1" />ساخت دیتابیس</Button>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="space-y-2">
                {['exampleir_wp', 'exampleir_shop', 'exampleir_blog'].map((db, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                    <div>
                      <code className="text-xs font-mono font-medium">{db}</code>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{toPersianDigits((i + 1) * 15)} MB</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => window.open(hostingData.phpMyAdminUrl, '_blank')}>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <CredentialField label="هاست دیتابیس" value={hostingData.dbHost} />
                <CredentialField label="نام کاربری" value={hostingData.dbUsername} />
                <CredentialField label="رمز عبور" value={hostingData.dbPassword} hidden={!showDbPassword} onToggle={() => setShowDbPassword(!showDbPassword)} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-xs h-8" onClick={() => window.open(hostingData.phpMyAdminUrl, '_blank')}>
                  <ExternalLink className="w-3 h-3 ml-1" />
                  phpMyAdmin
                </Button>
                <Button variant="outline" className="text-xs h-8">
                  <Key className="w-3 h-3 ml-1" />
                  Remote MySQL
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" />اکانت‌های ایمیل</CardTitle>
                <Button size="sm" className="text-xs h-8"><Plus className="w-3 h-3 ml-1" />ساخت ایمیل</Button>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="space-y-2">
                {[
                  { email: 'info@example.ir', quota: '500 MB', used: '120 MB' },
                  { email: 'admin@example.ir', quota: '500 MB', used: '85 MB' },
                  { email: 'support@example.ir', quota: '250 MB', used: '30 MB' },
                ].map((acc, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                    <div>
                      <code className="text-xs font-mono font-medium" dir="ltr">{acc.email}</code>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{acc.used} / {acc.quota}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => window.open(hostingData.webmailUrl, '_blank')}>
                        <ExternalLink className="w-3 h-3 ml-1" />
                        Webmail
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'Forwarder', icon: Mail },
              { label: 'Autoresponder', icon: RotateCcw },
              { label: 'Email Routing', icon: Globe },
              { label: 'Spam Filter', icon: Shield },
            ].map((item, i) => (
              <Button key={i} variant="outline" className="h-auto py-3 flex-col gap-1.5">
                <item.icon className="w-4 h-4" />
                <span className="text-[10px]">{item.label}</span>
              </Button>
            ))}
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm"><Shield className="w-4 h-4" />SSL / TLS</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="text-xs font-medium">Let's Encrypt SSL فعال</div>
                      <div className="text-[10px] text-muted-foreground">انقضا: {hostingData.sslExpiryDate}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs h-7">تمدید</Button>
                </div>
                <Button variant="outline" className="w-full text-xs h-9">
                  <Upload className="w-3.5 h-3.5 ml-1.5" />
                  نصب SSL اختصاصی
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm"><Lock className="w-4 h-4" />امنیت سرور</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-2">
                {[
                  { label: 'Imunify360', status: true },
                  { label: 'IP Blocker', status: true },
                  { label: 'Hotlink Protection', status: false },
                  { label: 'Password Protect Directory', status: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-muted/50 last:border-0">
                    <span className="text-xs">{item.label}</span>
                    <Badge className={`text-[10px] ${item.status ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                      {item.status ? 'فعال' : 'غیرفعال'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tools Tab */}
        <TabsContent value="tools" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'نصب وردپرس (Softaculous)', icon: Zap, desc: 'نصب خودکار CMS و اسکریپت‌ها' },
              { label: 'بکاپ‌گیری', icon: Download, desc: 'بکاپ‌گیری و ریستور فایل‌ها' },
              { label: 'Cron Job', icon: Clock, desc: 'زمان‌بندی اجرای دستورات' },
              { label: 'Error Log', icon: AlertTriangle, desc: 'مشاهده خطاهای سرور' },
              { label: 'Resource Usage', icon: Cpu, desc: 'گزارش مصرف منابع' },
              { label: 'DNS Zone Editor', icon: Globe, desc: 'مدیریت رکوردهای DNS' },
            ].map((tool, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info(`در حال باز کردن ${tool.label}...`)}>
                <CardContent className="p-3 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <tool.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium">{tool.label}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{tool.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="text-sm">اطلاعات صورتحساب</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="space-y-1.5">
                {[
                  { label: 'دوره پرداخت', value: hostingData.billingCycle },
                  { label: 'تاریخ ثبت', value: formatDate(hostingData.registrationDate, 'fa') },
                  { label: 'تاریخ تمدید', value: formatDate(hostingData.nextDueDate, 'fa'), warning: true },
                  { label: 'مبلغ تمدید', value: `${formatNumber(hostingData.recurringAmount, 'fa')} تومان`, bold: true },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-muted/50 last:border-0">
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className={`text-xs ${row.bold ? 'font-bold text-sm' : ''} ${row.warning ? 'text-orange-600' : ''}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button className="text-xs h-9"><RefreshCw className="w-3.5 h-3.5 ml-1.5" />تمدید سرویس</Button>
                <Button variant="outline" className="text-xs h-9"><CreditCard className="w-3.5 h-3.5 ml-1.5" />ارتقا پلن</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostingManagementPanel;

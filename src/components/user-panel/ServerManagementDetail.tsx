
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Server, Power, RotateCcw, Monitor, Settings, Activity, HardDrive, Cpu, MemoryStick, Network,
  Shield, Database, Terminal, FileText, ArrowRight, Eye, EyeOff, Copy, Download, Upload,
  Globe, Lock, CheckCircle, AlertTriangle, Clock, Zap, RefreshCw, BarChart3, Calendar,
  HardDriveDownload, Plus, Wifi, CreditCard, Disc, Camera, Trash2
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { toPersianDigits } from '@/lib/numberUtils';

interface ServerManagementDetailProps {
  serverId: string;
  serverType?: 'vps' | 'dedicated' | 'cloud' | 'hourly';
  onBack?: () => void;
}

const ServerManagementDetail: React.FC<ServerManagementDetailProps> = ({ serverId, serverType = 'vps', onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline' | 'restarting'>('online');
  const [rebuildDialogOpen, setRebuildDialogOpen] = useState(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);
  const [selectedOS, setSelectedOS] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('');

  const isDedicated = serverType === 'dedicated';
  const isCloud = serverType === 'cloud';
  const isHourly = serverType === 'hourly';

  const operatingSystems = [
    { name: 'Ubuntu', versions: ['24.04 LTS', '22.04 LTS', '20.04 LTS'] },
    { name: 'AlmaLinux', versions: ['9.3', '8.9'] },
    { name: 'Rocky Linux', versions: ['9.3', '8.9'] },
    { name: 'Debian', versions: ['12 (Bookworm)', '11 (Bullseye)'] },
    { name: 'CentOS Stream', versions: ['9', '8'] },
    { name: 'Fedora Server', versions: ['39', '38'] },
    { name: 'openSUSE', versions: ['Leap 15.5', 'Tumbleweed'] },
    { name: 'Arch Linux', versions: ['Latest'] },
    { name: 'Windows Server 2022', versions: ['Standard', 'Datacenter'] },
    { name: 'Windows Server 2019', versions: ['Standard', 'Datacenter'] },
    { name: 'Windows Server 2016', versions: ['Standard'] },
    { name: 'Windows 10 Pro', versions: ['LTSC 2021'] },
    { name: 'MikroTik RouterOS', versions: ['7.x', '6.x'] },
    { name: 'Proxmox VE', versions: ['8.1', '7.4'] },
    { name: 'VMware ESXi', versions: ['8.0 U2', '7.0 U3'] },
  ];

  const serverData = {
    id: serverId,
    name: `سرور-${serverId}`,
    type: isDedicated ? 'اختصاصی' : isCloud ? 'ابری' : isHourly ? 'ساعتی' : 'مجازی',
    status: serverStatus,
    ip: '185.123.45.67',
    ipv6: '2001:db8::1',
    os: 'Ubuntu 22.04 LTS',
    rootPassword: 'SecurePass123!',
    sshPort: 22,
    specs: isDedicated ? {
      cpu: 'Intel Xeon E3-1270v6 (4C/8T)',
      ram: '32 گیگابایت DDR4 ECC',
      disk: '2x 480GB SSD (RAID 1)',
      bandwidth: 'نامحدود',
      network: '1 گیگابیت',
      raidStatus: 'RAID 1 - سالم',
      storageType: 'NVMe SSD',
    } : {
      cpu: '4 هسته Intel Xeon',
      ram: '8 گیگابایت DDR4',
      disk: '80 گیگابایت NVMe SSD',
      bandwidth: '10 ترابایت',
      network: '1 گیگابیت',
    },
    uptime: '25 روز و 14 ساعت',
    location: 'تهران، ایران',
    created: '1402/06/15',
    expiry: '1403/06/15',
    ...(isHourly && { hourlyCost: 2500, totalCostToday: 60000, runningHours: 24 }),
  };

  const [cpuUsage] = useState(35);
  const [ramUsage] = useState(62);
  const [diskUsage] = useState(45);
  const [networkUsage] = useState(28);

  const handlePowerAction = async (action: 'start' | 'stop' | 'restart' | 'hard-reboot' | 'shutdown') => {
    setIsLoading(true);
    setServerStatus('restarting');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (action === 'stop' || action === 'shutdown') {
        setServerStatus('offline');
        toast({ title: "سرور خاموش شد", description: `سرور ${serverData.name} با موفقیت خاموش شد.` });
      } else {
        setServerStatus('online');
        toast({ title: action === 'restart' || action === 'hard-reboot' ? "سرور راه‌اندازی مجدد شد" : "سرور روشن شد", description: `عملیات با موفقیت انجام شد.` });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRebuildServer = async () => {
    if (!selectedOS || !selectedVersion) {
      toast({ title: "خطا", description: "لطفاً سیستم عامل و نسخه را انتخاب کنید.", variant: "destructive" });
      return;
    }
    setRebuildDialogOpen(false);
    setIsLoading(true);
    setServerStatus('restarting');
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast({ title: "نصب مجدد آغاز شد", description: `نصب ${selectedOS} ${selectedVersion} شروع شد.` });
      setTimeout(() => {
        setServerStatus('online');
        toast({ title: "نصب مجدد کامل شد", description: `سرور با ${selectedOS} ${selectedVersion} نصب شد.` });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "کپی شد", description: "متن در کلیپ‌بورد کپی شد." });
  };

  const ResourceBar = ({ label, value, spec }: { label: string; value: number; spec: string }) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{label}</span>
        <span className={`text-xs font-bold ${value >= 80 ? 'text-red-500' : value >= 60 ? 'text-amber-500' : 'text-emerald-500'}`}>
          {toPersianDigits(value)}٪
        </span>
      </div>
      <Progress value={value} className="h-2" />
      <p className="text-[10px] text-muted-foreground">{spec}</p>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="self-start flex items-center gap-1 text-xs">
            <ArrowRight className="w-3.5 h-3.5" />
            بازگشت به سرویس‌ها
          </Button>
        )}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDedicated ? 'bg-red-500' : isCloud ? 'bg-sky-500' : isHourly ? 'bg-amber-500' : 'bg-blue-500'}`}>
            <Server className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base md:text-xl font-bold truncate">{serverData.name}</h1>
              <Badge variant={serverStatus === 'online' ? 'default' : 'destructive'} className="text-[10px]">
                <span className={`w-1.5 h-1.5 rounded-full ml-1 ${serverStatus === 'online' ? 'bg-green-400' : serverStatus === 'offline' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                {serverStatus === 'online' ? 'آنلاین' : serverStatus === 'offline' ? 'آفلاین' : 'در حال ریست'}
              </Badge>
              <Badge variant="outline" className="text-[10px]">سرور {serverData.type}</Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{serverData.os} • {serverData.location} • آپتایم: {serverData.uptime}</p>
          </div>
        </div>
      </div>

      {/* Hourly Billing Alert */}
      {isHourly && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold text-amber-800">💰 صورتحساب لحظه‌ای</h4>
              <p className="text-[10px] text-amber-700 mt-0.5">
                هزینه مصرف: {toPersianDigits('60,000')} تومان • {toPersianDigits(24)} ساعت فعال • {toPersianDigits('2,500')} تومان/ساعت
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs h-7 border-amber-300" onClick={() => handlePowerAction('stop')}>
                توقف بدون حذف
              </Button>
              <Button size="sm" variant="destructive" className="text-xs h-7">حذف سرور</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Offline Alert */}
      {serverStatus === 'offline' && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 text-xs">سرور خاموش است. برای استفاده آن را روشن کنید.</AlertDescription>
        </Alert>
      )}

      {/* Power Controls */}
      <Card>
        <CardHeader className="pb-2 px-3 md:px-6">
          <CardTitle className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4" />کنترل پاور</CardTitle>
        </CardHeader>
        <CardContent className="px-3 md:px-6">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { label: serverStatus === 'online' ? 'خاموش' : 'روشن', icon: Power, action: () => handlePowerAction(serverStatus === 'online' ? 'stop' : 'start'), variant: serverStatus === 'online' ? 'destructive' as const : 'default' as const },
              { label: 'Reboot', icon: RotateCcw, action: () => setRestartDialogOpen(true), variant: 'outline' as const },
              { label: 'Hard Reboot', icon: RefreshCw, action: () => handlePowerAction('hard-reboot'), variant: 'outline' as const },
              { label: 'نصب مجدد', icon: HardDriveDownload, action: () => setRebuildDialogOpen(true), variant: 'outline' as const },
              { label: 'کنسول', icon: Monitor, action: () => toast({ title: "کنسول", description: "در حال باز کردن کنسول HTML5..." }), variant: 'outline' as const },
            ].map((btn, i) => (
              <Button key={i} variant={btn.variant} disabled={isLoading} onClick={btn.action} className="h-auto py-2.5 flex-col gap-1.5 text-[10px] md:text-xs">
                <btn.icon className="w-4 h-4" />
                {btn.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rebuild Dialog */}
      <Dialog open={rebuildDialogOpen} onOpenChange={setRebuildDialogOpen}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm"><HardDriveDownload className="w-4 h-4" />نصب مجدد سیستم عامل</DialogTitle>
            <DialogDescription className="text-xs">توجه: تمام داده‌های سرور پاک خواهد شد.</DialogDescription>
          </DialogHeader>
          <Alert className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 text-xs">هشدار: این عملیات غیرقابل بازگشت است.</AlertDescription>
          </Alert>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">سیستم عامل</Label>
              <Select value={selectedOS} onValueChange={(v) => { setSelectedOS(v); setSelectedVersion(''); }}>
                <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="انتخاب سیستم عامل" /></SelectTrigger>
                <SelectContent>{operatingSystems.map(os => <SelectItem key={os.name} value={os.name}>{os.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {selectedOS && (
              <div className="space-y-1.5">
                <Label className="text-xs">نسخه</Label>
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                  <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="انتخاب نسخه" /></SelectTrigger>
                  <SelectContent>{operatingSystems.find(os => os.name === selectedOS)?.versions.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setRebuildDialogOpen(false)} className="text-xs">انصراف</Button>
            <Button variant="destructive" onClick={handleRebuildServer} disabled={!selectedOS || !selectedVersion} className="text-xs">تأیید و شروع نصب</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restart Dialog */}
      <AlertDialog open={restartDialogOpen} onOpenChange={setRestartDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sm">راه‌اندازی مجدد سرور</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">آیا از راه‌اندازی مجدد سرور اطمینان دارید؟</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">انصراف</AlertDialogCancel>
            <AlertDialogAction className="text-xs" onClick={() => { setRestartDialogOpen(false); handlePowerAction('restart'); }}>راه‌اندازی مجدد</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full overflow-x-auto justify-start gap-0 h-auto p-1 flex-wrap">
          {[
            { value: 'overview', label: 'اطلاعات' },
            { value: 'monitoring', label: 'مانیتورینگ' },
            { value: 'access', label: 'دسترسی' },
            { value: 'network', label: 'شبکه' },
            { value: 'backup', label: 'بکاپ / Snapshot' },
            ...(isDedicated ? [{ value: 'hardware', label: 'سخت‌افزار' }] : []),
            ...(isCloud ? [{ value: 'scale', label: 'مقیاس‌دهی' }] : []),
            { value: 'upgrade', label: 'ارتقا' },
          ].map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-[10px] md:text-xs px-2 md:px-3 py-1.5">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm"><Server className="w-4 h-4" />مشخصات سرور</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6">
                <div className="space-y-1.5">
                  {[
                    { label: 'نوع سرور', value: serverData.type },
                    { label: 'سیستم عامل', value: serverData.os },
                    { label: 'پردازنده', value: serverData.specs.cpu },
                    { label: 'حافظه', value: serverData.specs.ram },
                    { label: 'دیسک', value: serverData.specs.disk },
                    { label: 'پهنای باند', value: serverData.specs.bandwidth },
                    { label: 'مکان', value: serverData.location },
                    { label: 'آپتایم', value: serverData.uptime },
                    { label: 'تاریخ انقضا', value: serverData.expiry, warning: true },
                    ...(isDedicated && serverData.specs.raidStatus ? [{ label: 'RAID', value: serverData.specs.raidStatus }] : []),
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-muted/50 last:border-0">
                      <span className="text-[10px] md:text-xs text-muted-foreground">{row.label}</span>
                      <span className={`text-xs font-medium ${row.warning ? 'text-orange-600' : ''}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm"><BarChart3 className="w-4 h-4" />مصرف منابع</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-4">
                <ResourceBar label="پردازنده" value={cpuUsage} spec={serverData.specs.cpu} />
                <ResourceBar label="حافظه" value={ramUsage} spec={serverData.specs.ram} />
                <ResourceBar label="دیسک" value={diskUsage} spec={serverData.specs.disk} />
                <ResourceBar label="شبکه" value={networkUsage} spec={serverData.specs.network} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'نمودار CPU', icon: Cpu, desc: 'استفاده از پردازنده در 24 ساعت' },
              { title: 'نمودار RAM', icon: MemoryStick, desc: 'مصرف حافظه در 24 ساعت' },
              { title: 'ترافیک شبکه (RX/TX)', icon: Network, desc: 'ترافیک ورودی و خروجی' },
              { title: 'Disk I/O', icon: HardDrive, desc: 'عملیات خواندن/نوشتن دیسک' },
            ].map((chart, i) => (
              <Card key={i}>
                <CardHeader className="pb-2 px-3 md:px-6">
                  <CardTitle className="flex items-center gap-2 text-sm"><chart.icon className="w-4 h-4" />{chart.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-3 md:px-6">
                  <div className="h-32 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                    <div className="text-center">
                      <chart.icon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-[10px] text-muted-foreground">{chart.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Access Tab */}
        <TabsContent value="access" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm"><Terminal className="w-4 h-4" />اطلاعات اتصال</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-2">
                {[
                  { label: 'آی‌پی اصلی', value: serverData.ip },
                  { label: 'IPv6', value: serverData.ipv6 },
                  { label: 'پورت SSH', value: String(serverData.sshPort) },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/50 p-2.5 rounded-lg">
                    <label className="text-[10px] text-muted-foreground">{item.label}</label>
                    <div className="flex items-center justify-between mt-1">
                      <code className="text-xs font-mono">{item.value}</code>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(item.value)}><Copy className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                ))}
                <div className="bg-muted/50 p-2.5 rounded-lg">
                  <label className="text-[10px] text-muted-foreground">رمز root</label>
                  <div className="flex items-center justify-between mt-1 gap-2">
                    <code className="text-xs font-mono flex-1 truncate">{showPassword ? serverData.rootPassword : '••••••••••'}</code>
                    <div className="flex gap-0.5">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(serverData.rootPassword)}><Copy className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="flex items-center gap-2 text-sm"><Monitor className="w-4 h-4" />دسترسی ریموت</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-2">
                {[
                  { label: 'کنسول HTML5', icon: Monitor, desc: 'دسترسی مستقیم از مرورگر' },
                  { label: isDedicated ? 'KVM Remote' : 'VNC', icon: Monitor, desc: isDedicated ? 'دسترسی KVM از راه دور' : 'دسترسی VNC' },
                  { label: 'تغییر رمز Root', icon: Lock, desc: 'بازنشانی رمز عبور ریشه' },
                  { label: 'Reset Network', icon: Network, desc: 'بازنشانی تنظیمات شبکه' },
                  ...(isDedicated ? [{ label: 'Rescue Mode', icon: Shield, desc: 'بوت در حالت نجات' }] : []),
                ].map((item, i) => (
                  <Button key={i} variant="outline" className="w-full justify-start h-auto py-2 text-xs" onClick={() => toast({ title: item.label, description: item.desc })}>
                    <item.icon className="w-4 h-4 ml-2 shrink-0" />
                    <div className="text-right">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Network Tab */}
        <TabsContent value="network" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm"><Globe className="w-4 h-4" />آدرس‌های IP</CardTitle>
                <Button size="sm" className="text-xs h-8"><Plus className="w-3 h-3 ml-1" />افزودن IP</Button>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="space-y-2">
                {[
                  { ip: serverData.ip, type: 'IPv4 اصلی', status: 'فعال' },
                  { ip: serverData.ipv6, type: 'IPv6', status: 'فعال' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                    <div>
                      <code className="text-xs font-mono">{item.ip}</code>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">{item.status}</Badge>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(item.ip)}><Copy className="w-3 h-3" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6"><CardTitle className="text-sm">فایروال</CardTitle></CardHeader>
              <CardContent className="px-3 md:px-6">
                <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium">فایروال فعال</span>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs h-7">مدیریت قوانین</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6"><CardTitle className="text-sm">DNS</CardTitle></CardHeader>
              <CardContent className="px-3 md:px-6">
                <Button variant="outline" className="w-full text-xs h-9"><Settings className="w-3.5 h-3.5 ml-1.5" />تنظیمات DNS</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm"><Camera className="w-4 h-4" />Snapshot ها</CardTitle>
                <Button size="sm" className="text-xs h-8"><Plus className="w-3 h-3 ml-1" />ساخت Snapshot</Button>
              </div>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="space-y-2">
                {[
                  { name: 'snapshot-auto-20240115', date: '1402/10/25', size: '4.2 GB' },
                  { name: 'snapshot-manual-20240110', date: '1402/10/20', size: '3.8 GB' },
                ].map((snap, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                    <div>
                      <code className="text-xs font-mono font-medium">{snap.name}</code>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{snap.date} • {snap.size}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-7 text-[10px]"><RotateCcw className="w-3 h-3 ml-1" />Restore</Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="text-sm">زمان‌بندی بکاپ</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="text-xs font-medium">بکاپ روزانه خودکار</div>
                  <div className="text-[10px] text-muted-foreground">هر روز ساعت 3:00 صبح</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs h-8"><Calendar className="w-3.5 h-3.5 ml-1" />تغییر زمان</Button>
                  <Button size="sm" className="text-xs h-8"><Database className="w-3.5 h-3.5 ml-1" />بکاپ فوری</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hardware Tab (Dedicated only) */}
        {isDedicated && (
          <TabsContent value="hardware" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="text-sm">اطلاعات سخت‌افزار</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6">
                <div className="space-y-1.5">
                  {[
                    { label: 'CPU Model', value: 'Intel Xeon E3-1270v6' },
                    { label: 'RAM', value: '32GB DDR4 ECC' },
                    { label: 'Storage', value: '2x 480GB SSD' },
                    { label: 'RAID', value: 'RAID 1 - سالم' },
                    { label: 'نوع دیسک', value: 'NVMe SSD' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-muted/50 last:border-0">
                      <span className="text-xs text-muted-foreground">{row.label}</span>
                      <span className="text-xs font-medium font-mono">{row.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'نصب کنترل پنل', icon: Settings, desc: 'cPanel / DirectAdmin' },
                { label: 'مانیتورینگ', icon: Activity, desc: 'نظارت سخت‌افزار' },
                { label: 'پشتیبانی سخت‌افزاری', icon: Shield, desc: 'درخواست تعمیر' },
              ].map((item, i) => (
                <Button key={i} variant="outline" className="h-auto py-3 flex-col gap-1.5" onClick={() => toast({ title: item.label })}>
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                  <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        )}

        {/* Scale Tab (Cloud only) */}
        {isCloud && (
          <TabsContent value="scale" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2 px-3 md:px-6">
                <CardTitle className="text-sm">مدیریت منابع لحظه‌ای</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6 space-y-3">
                <p className="text-xs text-muted-foreground">افزایش آنی منابع سرور ابری بدون نیاز به خاموشی</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'افزایش CPU', current: '4 هسته', icon: Cpu },
                    { label: 'افزایش RAM', current: '8 GB', icon: MemoryStick },
                  ].map((item, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-2">فعلی: {item.current}</p>
                      <Button size="sm" className="w-full text-xs h-8">ارتقا</Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full text-xs h-9 mt-2"><Copy className="w-3.5 h-3.5 ml-1.5" />Clone Server</Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Upgrade Tab */}
        <TabsContent value="upgrade" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2 px-3 md:px-6">
              <CardTitle className="text-sm">ارتقا سرور</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'ارتقا RAM', current: serverData.specs.ram, icon: MemoryStick },
                  { label: 'ارتقا CPU', current: serverData.specs.cpu, icon: Cpu },
                  { label: 'افزایش دیسک', current: serverData.specs.disk, icon: HardDrive },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg text-center">
                    <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <h4 className="text-xs font-medium">{item.label}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1 mb-2">فعلی: {item.current}</p>
                    <Button size="sm" className="w-full text-xs h-8"><CreditCard className="w-3 h-3 ml-1" />ارتقا</Button>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Button className="w-full text-xs h-9"><RefreshCw className="w-3.5 h-3.5 ml-1.5" />تمدید سرویس</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServerManagementDetail;

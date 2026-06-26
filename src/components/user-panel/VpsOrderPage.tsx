import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowRight, ArrowLeft, Server, Clock, Cpu, HardDrive, Globe,
  Check, ShoppingCart, Monitor, Shield, Zap, MapPin, ChevronLeft
} from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';
import { toast } from '@/components/ui/use-toast';

interface VpsOrderPageProps {
  onBack?: () => void;
  onAddToCart?: (item: any) => void;
  initialMode?: 'virtual' | 'hourly' | 'multilocation';
}

interface VpsPlan {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  disk: number;
  diskType: string;
  bandwidth: string;
  port: string;
  price: number;
  period: string;
  popular?: boolean;
}

const virtualPlans: VpsPlan[] = [
  { id: 'vp1', name: 'VPS-1', cpu: 1, ram: 1, disk: 20, diskType: 'SSD', bandwidth: '۵۰۰ گیگ', port: '۱ Gbps', price: 199000, period: 'ماهانه' },
  { id: 'vp2', name: 'VPS-2', cpu: 1, ram: 2, disk: 30, diskType: 'SSD', bandwidth: '۱ ترابایت', port: '۱ Gbps', price: 299000, period: 'ماهانه' },
  { id: 'vp3', name: 'VPS-3', cpu: 2, ram: 2, disk: 40, diskType: 'NVMe', bandwidth: '۱ ترابایت', port: '۱ Gbps', price: 399000, period: 'ماهانه', popular: true },
  { id: 'vp4', name: 'VPS-4', cpu: 2, ram: 4, disk: 60, diskType: 'NVMe', bandwidth: '۲ ترابایت', port: '۱ Gbps', price: 599000, period: 'ماهانه' },
  { id: 'vp5', name: 'VPS-5', cpu: 4, ram: 8, disk: 100, diskType: 'NVMe', bandwidth: '۳ ترابایت', port: '۱ Gbps', price: 899000, period: 'ماهانه' },
  { id: 'vp6', name: 'VPS-6', cpu: 4, ram: 12, disk: 150, diskType: 'NVMe', bandwidth: '۵ ترابایت', port: '۱ Gbps', price: 1299000, period: 'ماهانه' },
  { id: 'vp7', name: 'VPS-7', cpu: 6, ram: 16, disk: 200, diskType: 'NVMe', bandwidth: '۵ ترابایت', port: '۱ Gbps', price: 1699000, period: 'ماهانه' },
  { id: 'vp8', name: 'VPS-8', cpu: 8, ram: 32, disk: 300, diskType: 'NVMe', bandwidth: '۱۰ ترابایت', port: '۱ Gbps', price: 2999000, period: 'ماهانه' },
];

const hourlyPlans: VpsPlan[] = [
  { id: 'hp1', name: 'Hourly-1', cpu: 1, ram: 1, disk: 20, diskType: 'SSD', bandwidth: 'نامحدود', port: '۱ Gbps', price: 350, period: 'ساعتی' },
  { id: 'hp2', name: 'Hourly-2', cpu: 1, ram: 2, disk: 30, diskType: 'SSD', bandwidth: 'نامحدود', port: '۱ Gbps', price: 600, period: 'ساعتی' },
  { id: 'hp3', name: 'Hourly-3', cpu: 2, ram: 2, disk: 40, diskType: 'NVMe', bandwidth: 'نامحدود', port: '۱ Gbps', price: 900, period: 'ساعتی', popular: true },
  { id: 'hp4', name: 'Hourly-4', cpu: 2, ram: 4, disk: 60, diskType: 'NVMe', bandwidth: 'نامحدود', port: '۱ Gbps', price: 1400, period: 'ساعتی' },
  { id: 'hp5', name: 'Hourly-5', cpu: 4, ram: 8, disk: 100, diskType: 'NVMe', bandwidth: 'نامحدود', port: '۱ Gbps', price: 2500, period: 'ساعتی' },
  { id: 'hp6', name: 'Hourly-6', cpu: 8, ram: 16, disk: 200, diskType: 'NVMe', bandwidth: 'نامحدود', port: '۱ Gbps', price: 4500, period: 'ساعتی' },
];

const locations = [
  { id: 'iran-asiatech', name: 'ایران', flag: '🇮🇷', datacenter: 'آسیاتک' },
  { id: 'iran-pishgaman', name: 'ایران', flag: '🇮🇷', datacenter: 'پیشگامان' },
  { id: 'iran-shatel', name: 'ایران', flag: '🇮🇷', datacenter: 'شاتل' },
  { id: 'iran-afranet', name: 'ایران', flag: '🇮🇷', datacenter: 'افرانت' },
  { id: 'germany-falkenstein', name: 'آلمان', flag: '🇩🇪', datacenter: 'Hetzner (Falkenstein)' },
  { id: 'germany-nuremberg', name: 'آلمان', flag: '🇩🇪', datacenter: 'Hetzner (Nuremberg)' },
  { id: 'netherlands-amsterdam', name: 'هلند', flag: '🇳🇱', datacenter: 'Serverius' },
  { id: 'france-paris', name: 'فرانسه', flag: '🇫🇷', datacenter: 'OVH' },
  { id: 'uk-london', name: 'انگلستان', flag: '🇬🇧', datacenter: 'Equinix' },
  { id: 'usa-dallas', name: 'آمریکا', flag: '🇺🇸', datacenter: 'ColoCrossing (Dallas)' },
  { id: 'usa-losangeles', name: 'آمریکا', flag: '🇺🇸', datacenter: 'Psychz (LA)' },
  { id: 'canada-montreal', name: 'کانادا', flag: '🇨🇦', datacenter: 'OVH' },
  { id: 'singapore', name: 'سنگاپور', flag: '🇸🇬', datacenter: 'Equinix' },
  { id: 'japan-tokyo', name: 'ژاپن', flag: '🇯🇵', datacenter: 'Equinix' },
  { id: 'turkey-istanbul', name: 'ترکیه', flag: '🇹🇷', datacenter: 'TurkTelekom' },
  { id: 'uae-dubai', name: 'امارات', flag: '🇦🇪', datacenter: 'Khazna' },
];

interface OsOption {
  id: string;
  name: string;
  icon: string;
  versions: string[];
  category: 'linux' | 'windows' | 'other';
}

const operatingSystems: OsOption[] = [
  { id: 'ubuntu', name: 'Ubuntu', icon: '🟠', versions: ['24.04 LTS', '22.04 LTS', '20.04 LTS'], category: 'linux' },
  { id: 'almalinux', name: 'AlmaLinux', icon: '🔵', versions: ['9.3', '8.9'], category: 'linux' },
  { id: 'rocky', name: 'Rocky Linux', icon: '🟢', versions: ['9.3', '8.9'], category: 'linux' },
  { id: 'debian', name: 'Debian', icon: '🔴', versions: ['12 (Bookworm)', '11 (Bullseye)'], category: 'linux' },
  { id: 'centos', name: 'CentOS Stream', icon: '🟣', versions: ['9', '8'], category: 'linux' },
  { id: 'fedora', name: 'Fedora Server', icon: '🔵', versions: ['39', '38'], category: 'linux' },
  { id: 'opensuse', name: 'openSUSE', icon: '🟢', versions: ['Leap 15.5', 'Tumbleweed'], category: 'linux' },
  { id: 'arch', name: 'Arch Linux', icon: '🔵', versions: ['Latest'], category: 'linux' },
  { id: 'windows2022', name: 'Windows Server 2022', icon: '🪟', versions: ['Standard', 'Datacenter'], category: 'windows' },
  { id: 'windows2019', name: 'Windows Server 2019', icon: '🪟', versions: ['Standard', 'Datacenter'], category: 'windows' },
  { id: 'windows2016', name: 'Windows Server 2016', icon: '🪟', versions: ['Standard'], category: 'windows' },
  { id: 'windows10', name: 'Windows 10 Pro', icon: '🪟', versions: ['LTSC 2021'], category: 'windows' },
  { id: 'mikrotik', name: 'MikroTik RouterOS', icon: '⚙️', versions: ['7.x', '6.x'], category: 'other' },
  { id: 'proxmox', name: 'Proxmox VE', icon: '📦', versions: ['8.1', '7.4'], category: 'other' },
  { id: 'esxi', name: 'VMware ESXi', icon: '🖥️', versions: ['8.0 U2', '7.0 U3'], category: 'other' },
];

const multilocationPlans: VpsPlan[] = [
  { id: 'ml1', name: 'Multi-1', cpu: 2, ram: 2, disk: 40, diskType: 'SSD', bandwidth: '۱ ترابایت', port: '۱ Gbps', price: 499000, period: 'ماهانه' },
  { id: 'ml2', name: 'Multi-2', cpu: 2, ram: 4, disk: 60, diskType: 'NVMe', bandwidth: '۲ ترابایت', port: '۱ Gbps', price: 799000, period: 'ماهانه', popular: true },
  { id: 'ml3', name: 'Multi-3', cpu: 4, ram: 8, disk: 100, diskType: 'NVMe', bandwidth: '۳ ترابایت', port: '۱ Gbps', price: 1299000, period: 'ماهانه' },
  { id: 'ml4', name: 'Multi-4', cpu: 6, ram: 16, disk: 200, diskType: 'NVMe', bandwidth: '۵ ترابایت', port: '۱ Gbps', price: 1999000, period: 'ماهانه' },
  { id: 'ml5', name: 'Multi-5', cpu: 8, ram: 32, disk: 300, diskType: 'NVMe', bandwidth: '۱۰ ترابایت', port: '۱ Gbps', price: 3499000, period: 'ماهانه' },
];

const billingPeriods = [
  { id: 'monthly', name: 'ماهانه', multiplier: 1, discount: 0 },
  { id: 'quarterly', name: 'سه‌ماهه', multiplier: 2.7, discount: 10 },
  { id: 'semiannual', name: 'شش‌ماهه', multiplier: 5.1, discount: 15 },
  { id: 'yearly', name: 'سالانه', multiplier: 9.6, discount: 20 },
];

const VpsOrderPage: React.FC<VpsOrderPageProps> = ({ onBack, onAddToCart, initialMode = 'virtual' }) => {
  const [mode, setMode] = useState<'virtual' | 'hourly' | 'multilocation'>(initialMode === 'multilocation' ? 'multilocation' : initialMode === 'hourly' ? 'hourly' : 'virtual');
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<VpsPlan | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedOs, setSelectedOs] = useState<string>('');
  const [selectedOsVersion, setSelectedOsVersion] = useState<string>('');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [osFilter, setOsFilter] = useState<'all' | 'linux' | 'windows' | 'other'>('all');

  const plans = mode === 'multilocation' ? multilocationPlans : mode === 'virtual' ? virtualPlans : hourlyPlans;

  const filteredOs = useMemo(() => {
    if (osFilter === 'all') return operatingSystems;
    return operatingSystems.filter(os => os.category === osFilter);
  }, [osFilter]);

  const selectedOsObj = operatingSystems.find(o => o.id === selectedOs);
  const selectedLocationObj = locations.find(l => l.id === selectedLocation);

  const finalPrice = useMemo(() => {
    if (!selectedPlan) return 0;
    if (mode === 'hourly') return selectedPlan.price;
    const period = billingPeriods.find(p => p.id === billingPeriod);
    return Math.round(selectedPlan.price * (period?.multiplier || 1));
  }, [selectedPlan, billingPeriod, mode]);

  const handleOrder = () => {
    toast({
      title: "افزودن به سبد خرید",
      description: `${selectedPlan?.name} - ${selectedLocationObj?.name} - ${selectedOsObj?.name} ${selectedOsVersion}`,
    });
    onAddToCart?.({
      plan: selectedPlan,
      location: selectedLocation,
      os: selectedOs,
      osVersion: selectedOsVersion,
      billingPeriod,
      price: finalPrice,
    });
  };

  const canProceed = () => {
    if (step === 1) return !!selectedPlan;
    if (step === 2) return !!selectedLocation;
    if (step === 3) return !!selectedOs && !!selectedOsVersion;
    return true;
  };

  const steps = [
    { num: 1, label: 'انتخاب پلن' },
    { num: 2, label: 'لوکیشن' },
    { num: 3, label: 'سیستم‌عامل' },
    { num: 4, label: 'تأیید و سفارش' },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </Button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">سفارش سرور مجازی</h1>
            <p className="text-muted-foreground text-sm">پلن مناسب خود را انتخاب کنید</p>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <Tabs value={mode} onValueChange={(v) => { setMode(v as any); setStep(1); setSelectedPlan(null); }} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="virtual" className="gap-2"><Server className="w-4 h-4" />سرور مجازی</TabsTrigger>
          <TabsTrigger value="hourly" className="gap-2"><Clock className="w-4 h-4" />سرور ساعتی</TabsTrigger>
          <TabsTrigger value="multilocation" className="gap-2"><Globe className="w-4 h-4" />مولتی لوکیشن</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4 overflow-x-auto">
        {steps.map((s, i) => (
          <React.Fragment key={s.num}>
            <button
              onClick={() => s.num < step && setStep(s.num)}
              className={`flex items-center gap-2 shrink-0 ${s.num === step ? 'text-primary font-bold' : s.num < step ? 'text-green-600 cursor-pointer' : 'text-muted-foreground'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                s.num === step ? 'bg-primary text-primary-foreground' : s.num < step ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {s.num < step ? <Check className="w-4 h-4" /> : toPersianDigits(s.num)}
              </div>
              <span className="hidden sm:inline text-sm">{s.label}</span>
            </button>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${s.num < step ? 'bg-green-500' : 'bg-muted'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Select Plan */}
      {step === 1 && (
        <div className="space-y-4">
          {mode === 'hourly' && (
            <Card className="border-amber-200 bg-amber-50/50">
              <CardContent className="p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">سرور ساعتی - پرداخت به ازای مصرف</p>
                  <p className="text-amber-700">فقط به ازای ساعاتی که سرور روشن است هزینه پرداخت می‌کنید. مناسب تست، توسعه و پروژه‌های موقت.</p>
                </div>
              </CardContent>
            </Card>
          )}
          {mode === 'multilocation' && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-4 flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">سرور مولتی لوکیشن - یک سرور با چند IP</p>
                  <p className="text-blue-700">سرور شما با چندین IP از لوکیشن‌های مختلف تنظیم می‌شود. مناسب سرویس‌های بین‌المللی و کاهش تأخیر.</p>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlan?.id === plan.id ? 'border-primary border-2 ring-2 ring-primary/20' : ''
                } ${plan.popular ? 'border-primary' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-br-lg">محبوب</div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {plan.name}
                    {selectedPlan?.id === plan.id && <Check className="w-5 h-5 text-primary" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-blue-500" />
                      <span>{toPersianDigits(plan.cpu)} هسته CPU</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-green-500" />
                      <span>{toPersianDigits(plan.ram)} گیگ RAM</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-purple-500" />
                      <span>{toPersianDigits(plan.disk)} گیگ {plan.diskType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-orange-500" />
                      <span>{plan.bandwidth}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe className="w-3 h-3" />
                    <span>پورت {plan.port}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-xl font-bold text-primary">{toPersianDigits(plan.price.toLocaleString())}</span>
                    <span className="text-sm text-muted-foreground mr-1">تومان / {plan.period}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Location */}
      {step === 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {locations.map((loc) => (
            <Card
              key={loc.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedLocation === loc.id ? 'border-primary border-2 ring-2 ring-primary/20' : ''
              }`}
              onClick={() => setSelectedLocation(loc.id)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-3xl">{loc.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{loc.name}</p>
                  <p className="text-xs text-muted-foreground">{loc.datacenter}</p>
                </div>
                {selectedLocation === loc.id && <Check className="w-5 h-5 text-primary shrink-0" />}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Step 3: Select OS */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'همه' },
              { key: 'linux', label: 'لینوکس' },
              { key: 'windows', label: 'ویندوز' },
              { key: 'other', label: 'سایر' },
            ].map(f => (
              <Button
                key={f.key}
                size="sm"
                variant={osFilter === f.key ? 'default' : 'outline'}
                onClick={() => setOsFilter(f.key as any)}
              >
                {f.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredOs.map((os) => (
              <Card
                key={os.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedOs === os.id ? 'border-primary border-2 ring-2 ring-primary/20' : ''
                }`}
                onClick={() => {
                  if (selectedOs !== os.id) {
                    setSelectedOs(os.id);
                    setSelectedOsVersion(os.versions[0]);
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{os.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium">{os.name}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {os.category === 'linux' ? 'لینوکس' : os.category === 'windows' ? 'ویندوز' : 'سایر'}
                      </Badge>
                    </div>
                    {selectedOs === os.id && <Check className="w-5 h-5 text-primary shrink-0" />}
                  </div>
                  {selectedOs === os.id && (
                    <div onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
                      <Select value={selectedOsVersion} onValueChange={setSelectedOsVersion}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="انتخاب نسخه" />
                        </SelectTrigger>
                        <SelectContent>
                          {os.versions.map(v => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Review & Confirm */}
      {step === 4 && selectedPlan && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader><CardTitle>خلاصه سفارش</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">پلن</p>
                    <p className="font-bold text-lg">{selectedPlan.name}</p>
                    <div className="text-sm space-y-1">
                      <p>{toPersianDigits(selectedPlan.cpu)} هسته CPU</p>
                      <p>{toPersianDigits(selectedPlan.ram)} گیگ RAM</p>
                      <p>{toPersianDigits(selectedPlan.disk)} گیگ {selectedPlan.diskType}</p>
                      <p>پهنای باند: {selectedPlan.bandwidth}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">لوکیشن</p>
                    <p className="font-bold text-lg">{selectedLocationObj?.flag} {selectedLocationObj?.name}</p>
                    <p className="text-sm text-muted-foreground">دیتاسنتر: {selectedLocationObj?.datacenter}</p>
                    <p className="text-sm font-medium text-muted-foreground mt-4">سیستم‌عامل</p>
                    <p className="font-bold">{selectedOsObj?.icon} {selectedOsObj?.name} {selectedOsVersion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing period for virtual (not hourly) */}
            {(mode === 'virtual' || mode === 'multilocation') && (
              <Card>
                <CardHeader><CardTitle>دوره پرداخت</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {billingPeriods.map(p => (
                      <Card
                        key={p.id}
                        className={`cursor-pointer text-center transition-all ${billingPeriod === p.id ? 'border-primary border-2' : ''}`}
                        onClick={() => setBillingPeriod(p.id)}
                      >
                        <CardContent className="p-3">
                          <p className="font-medium text-sm">{p.name}</p>
                          {p.discount > 0 && (
                            <Badge variant="destructive" className="text-xs mt-1">{toPersianDigits(p.discount)}٪ تخفیف</Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Price Card */}
          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">مبلغ قابل پرداخت</p>
                  <p className="text-3xl font-bold text-primary">{toPersianDigits(finalPrice.toLocaleString())}</p>
                  <p className="text-sm text-muted-foreground">تومان / {mode === 'hourly' ? 'ساعتی' : billingPeriods.find(p => p.id === billingPeriod)?.name}</p>
                </div>
                <Button className="w-full gap-2" size="lg" onClick={handleOrder}>
                  <ShoppingCart className="w-5 h-5" />
                  افزودن به سبد خرید
                </Button>
                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>✓ تحویل آنی پس از پرداخت</p>
                  <p>✓ پشتیبانی ۲۴/۷</p>
                  <p>✓ گارانتی بازگشت وجه ۷ روزه</p>
                  {mode === 'multilocation' && <p>✓ چندین IP از لوکیشن‌های مختلف</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          مرحله قبل
        </Button>
        {step < 4 ? (
          <Button
            onClick={() => setStep(s => Math.min(4, s + 1))}
            disabled={!canProceed()}
            className="gap-2"
          >
            مرحله بعد
            <ArrowLeft className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default VpsOrderPage;

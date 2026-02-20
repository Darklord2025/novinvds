import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ArrowRight, ArrowLeft, HardDrive, Check, ShoppingCart, Cpu,
  Monitor, Globe, ChevronLeft, Zap, MapPin, Server, Shield
} from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';
import { toast } from '@/components/ui/use-toast';

interface DedicatedOrderPageProps {
  onBack?: () => void;
  onAddToCart?: (item: any) => void;
  initialRegion?: string;
}

interface DedicatedPlan {
  id: string;
  name: string;
  cpu: string;
  ram: string;
  disk: string;
  bandwidth: string;
  port: string;
  price: number;
  popular?: boolean;
}

const iranPlans: DedicatedPlan[] = [
  { id: 'di1', name: 'IR-E3-1230', cpu: 'Intel Xeon E3-1230 v6 (4C/8T)', ram: '16 GB DDR4', disk: '1×480GB SSD', bandwidth: '۱ ترابایت', port: '۱ Gbps', price: 4500000 },
  { id: 'di2', name: 'IR-E3-1270', cpu: 'Intel Xeon E3-1270 v6 (4C/8T)', ram: '32 GB DDR4 ECC', disk: '2×480GB SSD (RAID 1)', bandwidth: '۲ ترابایت', port: '۱ Gbps', price: 6500000, popular: true },
  { id: 'di3', name: 'IR-E5-2620', cpu: 'Intel Xeon E5-2620 v4 (8C/16T)', ram: '32 GB DDR4 ECC', disk: '2×1TB SSD', bandwidth: '۵ ترابایت', port: '۱ Gbps', price: 8500000 },
  { id: 'di4', name: 'IR-Dual-E5', cpu: '2× Xeon E5-2680 v4 (28C/56T)', ram: '64 GB DDR4 ECC', disk: '4×1TB SSD (RAID 10)', bandwidth: '۱۰ ترابایت', port: '۱ Gbps', price: 14000000 },
];

const internationalPlans: DedicatedPlan[] = [
  { id: 'de1', name: 'EU-E3-1270', cpu: 'Intel Xeon E3-1270 v6 (4C/8T)', ram: '16 GB DDR4', disk: '2×1TB HDD', bandwidth: 'نامحدود', port: '۱ Gbps', price: 3500000 },
  { id: 'de2', name: 'EU-E5-2640', cpu: 'Intel Xeon E5-2640 v4 (10C/20T)', ram: '32 GB DDR4 ECC', disk: '2×2TB SSD', bandwidth: 'نامحدود', port: '۱ Gbps', price: 6000000, popular: true },
  { id: 'de3', name: 'EU-Dual-E5', cpu: '2× Xeon E5-2680 v4 (28C/56T)', ram: '64 GB DDR4 ECC', disk: '4×2TB SSD (RAID 10)', bandwidth: 'نامحدود', port: '۱ Gbps', price: 11000000 },
  { id: 'du1', name: 'US-E3-1270', cpu: 'Intel Xeon E3-1270 v6 (4C/8T)', ram: '16 GB DDR4', disk: '2×1TB HDD', bandwidth: '۱۰ ترابایت', port: '۱ Gbps', price: 3800000 },
  { id: 'du2', name: 'US-E5-2640', cpu: 'Intel Xeon E5-2640 v4 (10C/20T)', ram: '32 GB DDR4 ECC', disk: '2×2TB SSD', bandwidth: '۳۰ ترابایت', port: '۱ Gbps', price: 6500000, popular: true },
  { id: 'da1', name: 'Asia-Ryzen', cpu: 'AMD Ryzen 9 5900X (12C/24T)', ram: '64 GB DDR4', disk: '2×1TB NVMe', bandwidth: 'نامحدود', port: '۱ Gbps', price: 7000000 },
];

const iranLocations = [
  { id: 'ir-asiatech', name: 'آسیاتک', flag: '🇮🇷', datacenter: 'Asiatech' },
  { id: 'ir-pishgaman', name: 'پیشگامان', flag: '🇮🇷', datacenter: 'Pishgaman' },
  { id: 'ir-shatel', name: 'شاتل', flag: '🇮🇷', datacenter: 'Shatel' },
  { id: 'ir-afranet', name: 'افرانت', flag: '🇮🇷', datacenter: 'Afranet' },
];

const internationalLocations = [
  { id: 'de-hetzner', name: 'آلمان', flag: '🇩🇪', datacenter: 'Hetzner' },
  { id: 'nl-serverius', name: 'هلند', flag: '🇳🇱', datacenter: 'Serverius' },
  { id: 'fr-ovh', name: 'فرانسه', flag: '🇫🇷', datacenter: 'OVH' },
  { id: 'us-dallas', name: 'آمریکا - دالاس', flag: '🇺🇸', datacenter: 'ColoCrossing' },
  { id: 'us-la', name: 'آمریکا - لس‌آنجلس', flag: '🇺🇸', datacenter: 'Psychz' },
  { id: 'sg-equinix', name: 'سنگاپور', flag: '🇸🇬', datacenter: 'Equinix' },
  { id: 'jp-equinix', name: 'ژاپن', flag: '🇯🇵', datacenter: 'Equinix' },
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
  { id: 'esxi', name: 'VMware ESXi', icon: '🖥️', versions: ['8.0 U2', '7.0 U3'], category: 'other' },
  { id: 'proxmox', name: 'Proxmox VE', icon: '📦', versions: ['8.1', '7.4'], category: 'other' },
  { id: 'mikrotik', name: 'MikroTik RouterOS', icon: '⚙️', versions: ['7.x', '6.x'], category: 'other' },
];

interface AddonModule {
  id: string;
  name: string;
  price: number;
  period: string;
}

const dedicatedAddons: AddonModule[] = [
  { id: 'cp', name: 'لایسنس cPanel', price: 450000, period: 'ماهانه' },
  { id: 'da', name: 'لایسنس DirectAdmin', price: 250000, period: 'ماهانه' },
  { id: 'plesk', name: 'لایسنس Plesk', price: 350000, period: 'ماهانه' },
  { id: 'cloudlinux', name: 'لایسنس CloudLinux', price: 350000, period: 'ماهانه' },
  { id: 'litespeed', name: 'لایسنس LiteSpeed', price: 300000, period: 'ماهانه' },
  { id: 'extra-ip', name: 'آی‌پی اضافه (IPv4)', price: 50000, period: 'ماهانه' },
  { id: 'backup-50', name: 'فضای بکاپ ۵۰ گیگ', price: 60000, period: 'ماهانه' },
  { id: 'backup-100', name: 'فضای بکاپ ۱۰۰ گیگ', price: 100000, period: 'ماهانه' },
  { id: 'managed', name: 'مدیریت سرور ۲۴/۷', price: 500000, period: 'ماهانه' },
  { id: 'monitoring', name: 'مانیتورینگ پیشرفته', price: 150000, period: 'ماهانه' },
];

const DedicatedOrderPage: React.FC<DedicatedOrderPageProps> = ({ onBack, onAddToCart, initialRegion = 'iran' }) => {
  const [region, setRegion] = useState<'iran' | 'international'>(initialRegion === 'iran' ? 'iran' : 'international');
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<DedicatedPlan | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOs, setSelectedOs] = useState('');
  const [selectedOsVersion, setSelectedOsVersion] = useState('');
  const [osFilter, setOsFilter] = useState<'all' | 'linux' | 'windows' | 'other'>('all');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const plans = region === 'iran' ? iranPlans : internationalPlans;
  const locations = region === 'iran' ? iranLocations : internationalLocations;

  const filteredOs = useMemo(() => {
    if (osFilter === 'all') return operatingSystems;
    return operatingSystems.filter(os => os.category === osFilter);
  }, [osFilter]);

  const selectedOsObj = operatingSystems.find(o => o.id === selectedOs);
  const selectedLocationObj = locations.find(l => l.id === selectedLocation);

  const addonsTotal = useMemo(() => {
    return selectedAddons.reduce((sum, id) => {
      const addon = dedicatedAddons.find(a => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
  }, [selectedAddons]);

  const finalPrice = (selectedPlan?.price || 0) + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

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
      addons: selectedAddons,
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
    { num: 1, label: 'انتخاب سرور' },
    { num: 2, label: 'لوکیشن' },
    { num: 3, label: 'سیستم‌عامل' },
    { num: 4, label: 'ماژول‌های اضافی' },
    { num: 5, label: 'تأیید و سفارش' },
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
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center text-white">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">سفارش سرور اختصاصی</h1>
            <p className="text-muted-foreground text-sm">سرور فیزیکی با منابع اختصاصی</p>
          </div>
        </div>
      </div>

      {/* Region Toggle */}
      <Tabs value={region} onValueChange={(v) => { setRegion(v as any); setStep(1); setSelectedPlan(null); setSelectedLocation(''); }} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="iran" className="gap-2">🇮🇷 ایران</TabsTrigger>
          <TabsTrigger value="international" className="gap-2">🌍 خارج</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Steps */}
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
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedPlan?.id === plan.id ? 'border-primary border-2 ring-2 ring-primary/20' : ''
              } ${plan.popular ? 'border-primary' : ''}`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-br-lg">محبوب</div>
              )}
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {selectedPlan?.id === plan.id && <Check className="w-5 h-5 text-primary shrink-0" />}
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.cpu}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-green-500" />
                      <span>{plan.ram}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-purple-500" />
                      <span>{plan.disk}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-orange-500" />
                      <span>{plan.bandwidth}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-500" />
                      <span>{plan.port}</span>
                    </div>
                  </div>
                  <div className="text-left shrink-0">
                    <span className="text-xl font-bold text-primary">{toPersianDigits(plan.price.toLocaleString())}</span>
                    <span className="text-sm text-muted-foreground mr-1">تومان/ماه</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Step 2: Location */}
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

      {/* Step 3: OS */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'همه' },
              { key: 'linux', label: 'لینوکس' },
              { key: 'windows', label: 'ویندوز' },
              { key: 'other', label: 'سایر' },
            ].map(f => (
              <Button key={f.key} size="sm" variant={osFilter === f.key ? 'default' : 'outline'} onClick={() => setOsFilter(f.key as any)}>
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
                onClick={() => { setSelectedOs(os.id); setSelectedOsVersion(os.versions[0]); }}
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
                    <Select value={selectedOsVersion} onValueChange={setSelectedOsVersion}>
                      <SelectTrigger className="mt-2"><SelectValue placeholder="انتخاب نسخه" /></SelectTrigger>
                      <SelectContent>
                        {os.versions.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Addons */}
      {step === 4 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                ماژول‌های اضافی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">ماژول‌های مورد نیاز خود را انتخاب کنید (اختیاری)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dedicatedAddons.map((addon) => (
                  <div
                    key={addon.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAddons.includes(addon.id) ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <Checkbox checked={selectedAddons.includes(addon.id)} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{addon.name}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {addon.price > 0 ? `${toPersianDigits(addon.price.toLocaleString())} تومان/${addon.period}` : 'رایگان'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && selectedPlan && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader><CardTitle>خلاصه سفارش</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">سرور</p>
                    <p className="font-bold text-lg">{selectedPlan.name}</p>
                    <div className="text-sm space-y-1">
                      <p>{selectedPlan.cpu}</p>
                      <p>{selectedPlan.ram}</p>
                      <p>{selectedPlan.disk}</p>
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
                {selectedAddons.length > 0 && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-2">ماژول‌های اضافی</p>
                    <div className="space-y-1">
                      {selectedAddons.map(id => {
                        const addon = dedicatedAddons.find(a => a.id === id);
                        return addon ? (
                          <div key={id} className="flex justify-between text-sm">
                            <span>{addon.name}</span>
                            <span className="font-medium">{toPersianDigits(addon.price.toLocaleString())} تومان</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">مبلغ قابل پرداخت</p>
                  <p className="text-3xl font-bold text-primary">{toPersianDigits(finalPrice.toLocaleString())}</p>
                  <p className="text-sm text-muted-foreground">تومان / ماهانه</p>
                </div>
                {addonsTotal > 0 && (
                  <div className="text-xs text-muted-foreground text-center">
                    سرور: {toPersianDigits(selectedPlan.price.toLocaleString())} + ماژول‌ها: {toPersianDigits(addonsTotal.toLocaleString())}
                  </div>
                )}
                <Button className="w-full gap-2" size="lg" onClick={handleOrder}>
                  <ShoppingCart className="w-5 h-5" />
                  افزودن به سبد خرید
                </Button>
                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>✓ تحویل ظرف ۱ تا ۲۴ ساعت</p>
                  <p>✓ پشتیبانی ۲۴/۷</p>
                  <p>✓ گارانتی سخت‌افزار</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="gap-2">
          <ArrowRight className="w-4 h-4" />
          مرحله قبل
        </Button>
        {step < 5 ? (
          <Button onClick={() => setStep(s => Math.min(5, s + 1))} disabled={!canProceed()} className="gap-2">
            مرحله بعد
            <ArrowLeft className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default DedicatedOrderPage;

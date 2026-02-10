import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, Search, Filter, ShoppingCart, CreditCard, Server, Globe, 
  Database, HardDrive, Cloud, Cpu, Users, PanelLeft, Wifi, ChevronRight,
  Check, Plus, Settings
} from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';
import { toast } from '@/components/ui/use-toast';

interface ServiceOrderPageProps {
  category: string;
  onBack?: () => void;
  onAddToCart?: (item: any) => void;
}

interface PlanItem {
  id: string;
  name: string;
  specs: string[];
  price: number;
  period: string;
  popular?: boolean;
}

const categoryData: Record<string, { title: string; icon: React.ReactNode; plans: PlanItem[] }> = {
  'order-hosting': {
    title: 'میزبانی وب',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'h1', name: 'هاست لینوکس ECO', specs: ['۱ گیگ فضا', '۱۰ گیگ پهنای باند', 'cPanel'], price: 50000, period: 'ماهانه' },
      { id: 'h2', name: 'هاست لینوکس PRO', specs: ['۵ گیگ فضا', '۵۰ گیگ پهنای باند', 'cPanel'], price: 150000, period: 'ماهانه', popular: true },
      { id: 'h3', name: 'هاست لینوکس VIP', specs: ['۲۰ گیگ فضا', 'نامحدود پهنای باند', 'cPanel'], price: 350000, period: 'ماهانه' },
      { id: 'h4', name: 'هاست وردپرس', specs: ['۱۰ گیگ SSD', '۱۰۰ گیگ پهنای باند', 'بهینه وردپرس'], price: 200000, period: 'ماهانه' },
      { id: 'h5', name: 'هاست ویندوز', specs: ['۵ گیگ فضا', '۵۰ گیگ پهنای باند', 'Plesk'], price: 180000, period: 'ماهانه' },
      { id: 'h6', name: 'هاست دانلود', specs: ['۵۰ گیگ فضا', '۵۰۰ گیگ پهنای باند'], price: 250000, period: 'ماهانه' },
    ]
  },
  'order-vps': {
    title: 'سرور مجازی',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'v1', name: 'VPS پایه', specs: ['۱ هسته CPU', '۱ گیگ رم', '۲۰ گیگ SSD'], price: 199000, period: 'ماهانه' },
      { id: 'v2', name: 'VPS استاندارد', specs: ['۲ هسته CPU', '۴ گیگ رم', '۵۰ گیگ SSD'], price: 399000, period: 'ماهانه', popular: true },
      { id: 'v3', name: 'VPS حرفه‌ای', specs: ['۴ هسته CPU', '۸ گیگ رم', '۱۰۰ گیگ SSD'], price: 799000, period: 'ماهانه' },
      { id: 'v4', name: 'VPS سازمانی', specs: ['۸ هسته CPU', '۱۶ گیگ رم', '۲۰۰ گیگ SSD'], price: 1499000, period: 'ماهانه' },
      { id: 'v5', name: 'VPS ویندوز', specs: ['۲ هسته CPU', '۴ گیگ رم', '۵۰ گیگ SSD', 'لایسنس ویندوز'], price: 499000, period: 'ماهانه' },
    ]
  },
  'order-dedicated': {
    title: 'سرور اختصاصی',
    icon: <HardDrive className="w-6 h-6" />,
    plans: [
      { id: 'd1', name: 'سرور اختصاصی پایه', specs: ['Intel Xeon E3', '۱۶ گیگ رم', '۲×۱ ترا HDD'], price: 3500000, period: 'ماهانه' },
      { id: 'd2', name: 'سرور اختصاصی حرفه‌ای', specs: ['Intel Xeon E5', '۳۲ گیگ رم', '۲×۲ ترا SSD'], price: 6500000, period: 'ماهانه', popular: true },
      { id: 'd3', name: 'سرور اختصاصی سازمانی', specs: ['۲× Intel Xeon', '۶۴ گیگ رم', '۴×۲ ترا SSD'], price: 12000000, period: 'ماهانه' },
    ]
  },
  'order-domain': {
    title: 'دامنه',
    icon: <Globe className="w-6 h-6" />,
    plans: [
      { id: 'dm1', name: 'دامنه .ir', specs: ['ثبت یکساله'], price: 12000, period: 'سالانه' },
      { id: 'dm2', name: 'دامنه .com', specs: ['ثبت یکساله'], price: 390000, period: 'سالانه', popular: true },
      { id: 'dm3', name: 'دامنه .net', specs: ['ثبت یکساله'], price: 420000, period: 'سالانه' },
      { id: 'dm4', name: 'دامنه .org', specs: ['ثبت یکساله'], price: 450000, period: 'سالانه' },
      { id: 'dm5', name: 'دامنه .io', specs: ['ثبت یکساله'], price: 1200000, period: 'سالانه' },
    ]
  },
  'order-network': {
    title: 'خدمات شبکه',
    icon: <Wifi className="w-6 h-6" />,
    plans: [
      { id: 'n1', name: 'ترافیک اضافه ۱۰۰ گیگ', specs: ['ترافیک بین‌الملل'], price: 50000, period: 'یکبار' },
      { id: 'n2', name: 'DNS اختصاصی', specs: ['۴ سرور DNS'], price: 80000, period: 'ماهانه' },
      { id: 'n3', name: 'سرویس پروکسی', specs: ['آی‌پی اختصاصی'], price: 120000, period: 'ماهانه' },
    ]
  },
  'order-panels': {
    title: 'کنترل پنل‌ها',
    icon: <PanelLeft className="w-6 h-6" />,
    plans: [
      { id: 'p1', name: 'لایسنس cPanel', specs: ['ماهانه'], price: 450000, period: 'ماهانه', popular: true },
      { id: 'p2', name: 'لایسنس DirectAdmin', specs: ['ماهانه'], price: 250000, period: 'ماهانه' },
      { id: 'p3', name: 'لایسنس Plesk', specs: ['ماهانه'], price: 350000, period: 'ماهانه' },
      { id: 'p4', name: 'لایسنس aaPanel', specs: ['ماهانه'], price: 150000, period: 'ماهانه' },
    ]
  },
  'order-modules': {
    title: 'ماژول‌های اضافی',
    icon: <Cpu className="w-6 h-6" />,
    plans: [
      { id: 'm1', name: 'هارد اضافه ۵۰ گیگ', specs: ['SSD NVMe'], price: 100000, period: 'ماهانه' },
      { id: 'm2', name: 'رم اضافه ۲ گیگ', specs: ['DDR4'], price: 80000, period: 'ماهانه' },
      { id: 'm3', name: 'آی‌پی اضافه', specs: ['IPv4 اختصاصی'], price: 50000, period: 'ماهانه' },
      { id: 'm4', name: 'پردازنده اضافه ۱ هسته', specs: ['vCPU'], price: 120000, period: 'ماهانه' },
      { id: 'm5', name: 'فضای بکاپ ۵۰ گیگ', specs: ['بکاپ روزانه'], price: 60000, period: 'ماهانه' },
    ]
  },
  'order-support': {
    title: 'پشتیبانی تخصصی',
    icon: <Users className="w-6 h-6" />,
    plans: [
      { id: 's1', name: 'مدیریت سرور', specs: ['پشتیبانی ۲۴/۷', 'مانیتورینگ'], price: 500000, period: 'ماهانه', popular: true },
      { id: 's2', name: 'پشتیبانی اضطراری', specs: ['پاسخ‌دهی فوری'], price: 300000, period: 'یکبار' },
      { id: 's3', name: 'مشاوره تخصصی', specs: ['۱ ساعت مشاوره'], price: 200000, period: 'یکبار' },
    ]
  },
};

const ServiceOrderPage: React.FC<ServiceOrderPageProps> = ({ category, onBack, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular'>('popular');
  
  const data = categoryData[category] || { title: 'سفارش سرویس', icon: <Settings className="w-6 h-6" />, plans: [] };
  
  const filteredPlans = data.plans
    .filter(plan => plan.name.includes(searchQuery) || plan.specs.some(s => s.includes(searchQuery)))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  const handleOrder = (plan: PlanItem) => {
    toast({
      title: "افزودن به سبد خرید",
      description: `${plan.name} با موفقیت به سبد خرید اضافه شد.`,
    });
    if (onAddToCart) {
      onAddToCart(plan);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              بازگشت
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white">
              {data.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">سفارش {data.title}</h1>
              <p className="text-muted-foreground text-sm">
                {toPersianDigits(filteredPlans.length.toString())} پلن موجود
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجوی پلن..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'popular' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('popular')}
              >
                محبوب‌ترین
              </Button>
              <Button
                variant={sortBy === 'price-asc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('price-asc')}
              >
                ارزان‌ترین
              </Button>
              <Button
                variant={sortBy === 'price-desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('price-desc')}
              >
                گران‌ترین
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className={`relative overflow-hidden hover:shadow-lg transition-shadow ${plan.popular ? 'border-primary border-2' : ''}`}>
            {plan.popular && (
              <div className="absolute top-0 left-0 bg-primary text-white text-xs px-3 py-1 rounded-br-lg">
                محبوب
              </div>
            )}
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plan.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">{toPersianDigits(plan.price.toLocaleString())}</span>
                  <span className="text-sm text-muted-foreground mr-1">تومان / {plan.period}</span>
                </div>
              </div>
              <Button className="w-full gap-2" onClick={() => handleOrder(plan)}>
                <ShoppingCart className="w-4 h-4" />
                سفارش
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">پلنی یافت نشد</h3>
            <p className="text-muted-foreground">عبارت جستجو را تغییر دهید</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceOrderPage;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calculator, 
  Server, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Zap,
  ShoppingCart,
  Clock,
  Globe
} from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';

const ServiceCalculatorPage = () => {
  const [serviceType, setServiceType] = useState('vps');
  const [cpu, setCpu] = useState([2]);
  const [ram, setRam] = useState([4]);
  const [storage, setStorage] = useState([50]);
  const [bandwidth, setBandwidth] = useState([1000]);
  const [paymentPeriod, setPaymentPeriod] = useState('monthly');
  const [location, setLocation] = useState('iran');
  const [totalPrice, setTotalPrice] = useState(0);

  const pricingRates = {
    vps: {
      cpu: 50000, // per core per month
      ram: 30000, // per GB per month  
      storage: 2000, // per GB per month
      bandwidth: 1000, // per GB per month
      base: 100000 // base price
    },
    dedicated: {
      cpu: 200000,
      ram: 50000,
      storage: 5000,
      bandwidth: 2000,
      base: 2000000
    },
    hosting: {
      cpu: 20000,
      ram: 15000,
      storage: 1000,
      bandwidth: 500,
      base: 50000
    }
  };

  const paymentMultipliers = {
    hourly: 1 / (30 * 24), // hourly rate
    monthly: 1,
    quarterly: 2.7, // 10% discount for 3 months
    semiannual: 5.1, // 15% discount for 6 months
    yearly: 9.6 // 20% discount for 12 months
  };

  const locations = [
    { id: 'iran', name: 'ایران', multiplier: 1 },
    { id: 'germany', name: 'آلمان', multiplier: 1.2 },
    { id: 'netherlands', name: 'هلند', multiplier: 1.3 },
    { id: 'usa', name: 'آمریکا', multiplier: 1.5 },
    { id: 'france', name: 'فرانسه', multiplier: 1.25 }
  ];

  useEffect(() => {
    const rates = pricingRates[serviceType as keyof typeof pricingRates];
    const locationMultiplier = locations.find(l => l.id === location)?.multiplier || 1;
    
    const monthlyPrice = (
      rates.base +
      (cpu[0] * rates.cpu) +
      (ram[0] * rates.ram) +
      (storage[0] * rates.storage) +
      (bandwidth[0] * rates.bandwidth)
    ) * locationMultiplier;

    const finalPrice = monthlyPrice * paymentMultipliers[paymentPeriod as keyof typeof paymentMultipliers];
    setTotalPrice(Math.round(finalPrice));
  }, [serviceType, cpu, ram, storage, bandwidth, paymentPeriod, location]);

  const formatPrice = (price: number) => {
    return toPersianDigits(new Intl.NumberFormat('fa-IR').format(price));
  };

  const getServiceIcon = () => {
    switch (serviceType) {
      case 'vps': return <Server className="w-6 h-6" />;
      case 'dedicated': return <HardDrive className="w-6 h-6" />;
      case 'hosting': return <Globe className="w-6 h-6" />;
      default: return <Server className="w-6 h-6" />;
    }
  };

  const getServiceName = () => {
    switch (serviceType) {
      case 'vps': return 'سرور مجازی';
      case 'dedicated': return 'سرور اختصاصی';
      case 'hosting': return 'هاستینگ';
      default: return 'سرور مجازی';
    }
  };

  const getPeriodText = () => {
    switch (paymentPeriod) {
      case 'hourly': return 'ساعتی';
      case 'monthly': return 'ماهانه';
      case 'quarterly': return 'سه‌ماهه';
      case 'semiannual': return 'شش‌ماهه';
      case 'yearly': return 'سالانه';
      default: return 'ماهانه';
    }
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          ماشین‌حساب سرویس
        </h1>
        <p className="text-gray-600">محاسبه دقیق هزینه سرویس‌های شما</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>انتخاب سرویس</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={serviceType} onValueChange={setServiceType}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="vps">سرور مجازی</TabsTrigger>
                  <TabsTrigger value="dedicated">سرور اختصاصی</TabsTrigger>
                  <TabsTrigger value="hosting">هاستینگ</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تنظیمات منابع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* CPU */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 font-medium">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    تعداد هسته CPU
                  </label>
                  <Badge variant="outline">{toPersianDigits(cpu[0])} هسته</Badge>
                </div>
                <Slider
                  value={cpu}
                  onValueChange={setCpu}
                  max={serviceType === 'hosting' ? 4 : serviceType === 'vps' ? 16 : 32}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* RAM */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 font-medium">
                    <MemoryStick className="w-4 h-4 text-green-500" />
                    حافظه RAM
                  </label>
                  <Badge variant="outline">{toPersianDigits(ram[0])} گیگابایت</Badge>
                </div>
                <Slider
                  value={ram}
                  onValueChange={setRam}
                  max={serviceType === 'hosting' ? 16 : serviceType === 'vps' ? 64 : 256}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Storage */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 font-medium">
                    <HardDrive className="w-4 h-4 text-purple-500" />
                    فضای ذخیره‌سازی
                  </label>
                  <Badge variant="outline">{toPersianDigits(storage[0])} گیگابایت</Badge>
                </div>
                <Slider
                  value={storage}
                  onValueChange={setStorage}
                  max={serviceType === 'hosting' ? 500 : serviceType === 'vps' ? 2000 : 10000}
                  min={10}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Bandwidth */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 font-medium">
                    <Zap className="w-4 h-4 text-orange-500" />
                    پهنای باند
                  </label>
                  <Badge variant="outline">{toPersianDigits(bandwidth[0])} گیگابایت</Badge>
                </div>
                <Slider
                  value={bandwidth}
                  onValueChange={setBandwidth}
                  max={10000}
                  min={100}
                  step={100}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تنظیمات اضافی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Location */}
              <div>
                <label className="block font-medium mb-2">مکان دیتاسنتر</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Period */}
              <div>
                <label className="block font-medium mb-2">دوره پرداخت</label>
                <Select value={paymentPeriod} onValueChange={setPaymentPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">ساعتی</SelectItem>
                    <SelectItem value="monthly">ماهانه</SelectItem>
                    <SelectItem value="quarterly">سه‌ماهه (10% تخفیف)</SelectItem>
                    <SelectItem value="semiannual">شش‌ماهه (15% تخفیف)</SelectItem>
                    <SelectItem value="yearly">سالانه (20% تخفیف)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getServiceIcon()}
                خلاصه سفارش
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">{getServiceName()}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPU:</span>
                    <span>{toPersianDigits(cpu[0])} هسته</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM:</span>
                    <span>{toPersianDigits(ram[0])} گیگابایت</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ذخیره‌سازی:</span>
                    <span>{toPersianDigits(storage[0])} گیگابایت</span>
                  </div>
                  <div className="flex justify-between">
                    <span>پهنای باند:</span>
                    <span>{toPersianDigits(bandwidth[0])} گیگابایت</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مکان:</span>
                    <span>{locations.find(l => l.id === location)?.name}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">دوره پرداخت:</span>
                  <span className="font-medium">{getPeriodText()}</span>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">قیمت کل</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(totalPrice)} تومان
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {paymentPeriod === 'hourly' ? 'در ساعت' : 
                     paymentPeriod === 'monthly' ? 'در ماه' :
                     paymentPeriod === 'quarterly' ? 'هر سه ماه' :
                     paymentPeriod === 'semiannual' ? 'هر شش ماه' : 'در سال'}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full">
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  افزودن به سبد خرید
                </Button>
                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4 ml-2" />
                  درخواست مشاوره
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                * قیمت‌ها شامل مالیات بر ارزش افزوده است
                <br />
                * امکان تغییر تنظیمات پس از خرید وجود دارد
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceCalculatorPage;
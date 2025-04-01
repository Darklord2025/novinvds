
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface OperatingSystem {
  id: string;
  name: string;
}

interface OperatingSystems {
  linux: OperatingSystem[];
  windows: OperatingSystem[];
  specialized: OperatingSystem[];
}

interface ServiceCalculatorProps {
  operatingSystems?: OperatingSystems;
}

const ServiceCalculator = ({ operatingSystems }: ServiceCalculatorProps) => {
  const [serviceType, setServiceType] = useState('vps');
  const [location, setLocation] = useState('ir');
  const [operatingSystem, setOperatingSystem] = useState('linux');
  const [osVersion, setOsVersion] = useState('ubuntu_22_04');
  const [cpuCount, setCpuCount] = useState(2);
  const [ramSize, setRamSize] = useState(4);
  const [storageSize, setStorageSize] = useState(80);
  const [bandwidth, setBandwidth] = useState(500);
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [ddosProtection, setDdosProtection] = useState(false);
  const [managedSupport, setManagedSupport] = useState(false);
  const [months, setMonths] = useState(1);
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [vatAmount, setVatAmount] = useState(0);
  const [hasAppliedDiscount, setHasAppliedDiscount] = useState(false);
  
  // Base prices
  const prices = {
    cpu: {
      vps: 150000,
      cloud: 200000,
      dedicated: 1200000
    },
    ram: {
      vps: 100000,
      cloud: 150000,
      dedicated: 800000
    },
    storage: {
      vps: 2500,
      cloud: 3000,
      dedicated: 8000
    },
    bandwidth: {
      vps: 500,
      cloud: 400,
      dedicated: 300
    },
    os: {
      linux: 0,
      windows: 300000,
      specialized: 200000
    },
    location: {
      ir: 1,
      de: 1.2,
      us: 1.1,
      tr: 1.05
    },
    backup: {
      vps: 150000,
      cloud: 120000,
      dedicated: 500000
    },
    ddos: {
      vps: 200000,
      cloud: 180000,
      dedicated: 350000
    },
    support: {
      vps: 300000,
      cloud: 400000,
      dedicated: 700000
    }
  };
  
  // Location options
  const locations = [
    { id: 'ir', name: 'ایران - تهران' },
    { id: 'de', name: 'آلمان - فرانکفورت' },
    { id: 'us', name: 'آمریکا - نیویورک' },
    { id: 'tr', name: 'ترکیه - استانبول' }
  ];
  
  // Re-calculate price on any change
  useEffect(() => {
    calculatePrice();
  }, [
    serviceType, location, operatingSystem, osVersion, cpuCount, ramSize, 
    storageSize, bandwidth, backupEnabled, ddosProtection, managedSupport, months
  ]);
  
  // Handle discount code application
  const handleApplyDiscount = () => {
    // This is just a mock implementation
    if (discountCode === 'WELCOME10') {
      setDiscount(Math.round(totalPrice * 0.1));
      setHasAppliedDiscount(true);
    } else if (discountCode === 'VPS20') {
      setDiscount(Math.round(totalPrice * 0.2));
      setHasAppliedDiscount(true);
    } else {
      setDiscount(0);
      alert('کد تخفیف نامعتبر است');
    }
  };
  
  // Calculate total price based on current selections
  const calculatePrice = () => {
    let price = 0;
    
    // Add CPU cost
    price += cpuCount * prices.cpu[serviceType];
    
    // Add RAM cost
    price += ramSize * prices.ram[serviceType];
    
    // Add storage cost
    price += storageSize * prices.storage[serviceType];
    
    // Add bandwidth cost
    price += bandwidth * prices.bandwidth[serviceType];
    
    // Add OS cost
    price += prices.os[operatingSystem];
    
    // Apply location multiplier
    price = price * prices.location[location];
    
    // Add backup if enabled
    if (backupEnabled) {
      price += prices.backup[serviceType];
    }
    
    // Add DDoS protection if enabled
    if (ddosProtection) {
      price += prices.ddos[serviceType];
    }
    
    // Add managed support if enabled
    if (managedSupport) {
      price += prices.support[serviceType];
    }
    
    // Apply duration discount
    let durationDiscount = 0;
    if (months === 3) {
      durationDiscount = 0.05; // 5% off for 3 months
    } else if (months === 6) {
      durationDiscount = 0.1; // 10% off for 6 months
    } else if (months === 12) {
      durationDiscount = 0.15; // 15% off for 12 months
    }
    
    const basePriceWithDuration = price * months;
    const durationDiscountAmount = Math.round(basePriceWithDuration * durationDiscount);
    const priceAfterDurationDiscount = basePriceWithDuration - durationDiscountAmount;
    
    // Calculate VAT (10%)
    const calculatedVat = Math.round(priceAfterDurationDiscount * 0.1);
    
    setTotalPrice(priceAfterDurationDiscount);
    setVatAmount(calculatedVat);
    setFinalPrice(priceAfterDurationDiscount + calculatedVat - discount);
  };
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">محاسبه هزینه سرویس</h1>
      
      <Tabs defaultValue="vps" onValueChange={setServiceType}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="vps">سرور مجازی</TabsTrigger>
          <TabsTrigger value="cloud">سرور ابری</TabsTrigger>
          <TabsTrigger value="dedicated">سرور اختصاصی</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>مشخصات سرویس</CardTitle>
                <CardDescription>منابع مورد نیاز خود را انتخاب کنید</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">مکان سرور</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="انتخاب مکان سرور" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(loc => (
                          <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="os">سیستم عامل</Label>
                    <Select value={operatingSystem} onValueChange={setOperatingSystem}>
                      <SelectTrigger id="os">
                        <SelectValue placeholder="انتخاب سیستم عامل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linux">Linux</SelectItem>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="specialized">سیستم عامل‌های تخصصی</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="os-version">نسخه سیستم عامل</Label>
                  <Select value={osVersion} onValueChange={setOsVersion}>
                    <SelectTrigger id="os-version">
                      <SelectValue placeholder="انتخاب نسخه سیستم عامل" />
                    </SelectTrigger>
                    <SelectContent>
                      {operatingSystem === 'linux' && operatingSystems?.linux.map(os => (
                        <SelectItem key={os.id} value={os.id}>{os.name}</SelectItem>
                      ))}
                      {operatingSystem === 'windows' && operatingSystems?.windows.map(os => (
                        <SelectItem key={os.id} value={os.id}>{os.name}</SelectItem>
                      ))}
                      {operatingSystem === 'specialized' && operatingSystems?.specialized.map(os => (
                        <SelectItem key={os.id} value={os.id}>{os.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>تعداد CPU (هسته): {cpuCount}</Label>
                  <Slider
                    defaultValue={[cpuCount]}
                    min={1}
                    max={serviceType === 'dedicated' ? 32 : 16}
                    step={1}
                    onValueChange={(value) => setCpuCount(value[0])}
                    className="py-4"
                  />
                </div>
                
                <div>
                  <Label>مقدار RAM (گیگابایت): {ramSize}</Label>
                  <Slider
                    defaultValue={[ramSize]}
                    min={1}
                    max={serviceType === 'dedicated' ? 128 : 32}
                    step={1}
                    onValueChange={(value) => setRamSize(value[0])}
                    className="py-4"
                  />
                </div>
                
                <div>
                  <Label>فضای ذخیره‌سازی (گیگابایت): {storageSize}</Label>
                  <Slider
                    defaultValue={[storageSize]}
                    min={20}
                    max={serviceType === 'dedicated' ? 4000 : 1000}
                    step={10}
                    onValueChange={(value) => setStorageSize(value[0])}
                    className="py-4"
                  />
                </div>
                
                <div>
                  <Label>پهنای باند (گیگابایت): {bandwidth}</Label>
                  <Slider
                    defaultValue={[bandwidth]}
                    min={100}
                    max={serviceType === 'dedicated' ? 10000 : 5000}
                    step={100}
                    onValueChange={(value) => setBandwidth(value[0])}
                    className="py-4"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch 
                      id="backup" 
                      checked={backupEnabled}
                      onCheckedChange={setBackupEnabled}
                    />
                    <Label htmlFor="backup">بکاپ گیری خودکار</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch 
                      id="ddos" 
                      checked={ddosProtection}
                      onCheckedChange={setDdosProtection}
                    />
                    <Label htmlFor="ddos">محافظت DDoS</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch 
                      id="support" 
                      checked={managedSupport}
                      onCheckedChange={setManagedSupport}
                    />
                    <Label htmlFor="support">پشتیبانی مدیریت شده</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>پیش فاکتور</CardTitle>
                <CardDescription>هزینه سرویس انتخابی شما</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="duration">مدت زمان</Label>
                  <Select value={months.toString()} onValueChange={(value) => setMonths(parseInt(value))}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="انتخاب مدت زمان" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">یک ماه</SelectItem>
                      <SelectItem value="3">سه ماه (5% تخفیف)</SelectItem>
                      <SelectItem value="6">شش ماه (10% تخفیف)</SelectItem>
                      <SelectItem value="12">یک سال (15% تخفیف)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>هزینه کل:</span>
                    <span>{formatNumber(totalPrice)} تومان</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>تخفیف:</span>
                      <span>- {formatNumber(discount)} تومان</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>مالیات بر ارزش افزوده (10%):</span>
                    <span>{formatNumber(vatAmount)} تومان</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>قابل پرداخت:</span>
                    <span>{formatNumber(finalPrice)} تومان</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Label htmlFor="discount">کد تخفیف</Label>
                  <div className="flex space-x-2 space-x-reverse mt-1">
                    <Input 
                      id="discount" 
                      placeholder="کد تخفیف" 
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      disabled={hasAppliedDiscount}
                    />
                    <Button 
                      variant="outline"
                      onClick={handleApplyDiscount}
                      disabled={hasAppliedDiscount || !discountCode}
                    >
                      اعمال
                    </Button>
                  </div>
                  {hasAppliedDiscount && (
                    <p className="text-green-600 text-sm mt-1">کد تخفیف با موفقیت اعمال شد.</p>
                  )}
                </div>
                
                <Button className="w-full mt-4">ثبت سفارش</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ServiceCalculator;

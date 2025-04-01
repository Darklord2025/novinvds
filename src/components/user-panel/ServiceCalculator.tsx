
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, HardDrive, Cpu, Database, Cloud, CreditCard, MemoryStick, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface ResourcePricing {
  cpu: number;
  ram: number;
  disk: number;
  bandwidth: number;
  location: Record<string, number>;
  os: Record<string, number>;
}

interface OSGroup {
  name: string;
  options: {
    id: string;
    name: string;
    version: string;
    price: number;
  }[];
}

const ServiceCalculator = () => {
  const [serviceType, setServiceType] = useState<'vps' | 'dedicated' | 'cloud'>('vps');
  const [cpu, setCpu] = useState(2);
  const [ram, setRam] = useState(2);
  const [disk, setDisk] = useState(50);
  const [bandwidth, setBandwidth] = useState(1);
  const [location, setLocation] = useState('germany');
  const [os, setOs] = useState('ubuntu-22.04');
  const [osGroup, setOsGroup] = useState('linux');
  const [price, setPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [period, setPeriod] = useState('monthly');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Pricing models for each service type (prices in Toman)
  const pricing: Record<string, ResourcePricing> = {
    vps: {
      cpu: 40000,
      ram: 35000,
      disk: 1500,
      bandwidth: 25000,
      location: {
        germany: 1,
        netherlands: 1.1,
        france: 1.05,
        usa: 1.2,
        uk: 1.15,
        canada: 1.25,
        singapore: 1.3,
        australia: 1.35,
        iran: 0.85,
        turkey: 0.95,
      },
      os: {
        linux: 1,
        windows: 1.15,
        custom: 1,
      }
    },
    dedicated: {
      cpu: 80000,
      ram: 60000,
      disk: 2000,
      bandwidth: 20000,
      location: {
        germany: 1,
        netherlands: 1.1,
        france: 1.05,
        usa: 1.2,
        uk: 1.15,
        canada: 1.25,
        singapore: 1.3,
        australia: 1.35,
        iran: 0.85,
        turkey: 0.95,
      },
      os: {
        linux: 1,
        windows: 1.3,
        custom: 1,
      }
    },
    cloud: {
      cpu: 50000,
      ram: 45000,
      disk: 2500,
      bandwidth: 30000,
      location: {
        germany: 1,
        netherlands: 1.1,
        france: 1.05,
        usa: 1.2,
        uk: 1.15,
        canada: 1.25,
        singapore: 1.3,
        australia: 1.35,
        iran: 0.85,
        turkey: 0.95,
      },
      os: {
        linux: 1,
        windows: 1.2,
        custom: 1,
      }
    }
  };

  // Operating systems options
  const osOptions: OSGroup[] = [
    {
      name: 'لینوکس',
      options: [
        { id: 'ubuntu-22.04', name: 'Ubuntu', version: '22.04 LTS', price: 0 },
        { id: 'ubuntu-20.04', name: 'Ubuntu', version: '20.04 LTS', price: 0 },
        { id: 'ubuntu-18.04', name: 'Ubuntu', version: '18.04 LTS', price: 0 },
        { id: 'debian-11', name: 'Debian', version: '11', price: 0 },
        { id: 'debian-10', name: 'Debian', version: '10', price: 0 },
        { id: 'centos-stream-9', name: 'CentOS Stream', version: '9', price: 0 },
        { id: 'centos-7', name: 'CentOS', version: '7', price: 0 },
        { id: 'fedora-36', name: 'Fedora', version: '36', price: 0 },
        { id: 'rocky-8', name: 'Rocky Linux', version: '8', price: 0 },
        { id: 'alma-8', name: 'AlmaLinux', version: '8', price: 0 },
      ]
    },
    {
      name: 'ویندوز',
      options: [
        { id: 'windows-server-2022', name: 'Windows Server', version: '2022', price: 150000 },
        { id: 'windows-server-2019', name: 'Windows Server', version: '2019', price: 120000 },
        { id: 'windows-server-2016', name: 'Windows Server', version: '2016', price: 100000 },
        { id: 'windows-10', name: 'Windows', version: '10', price: 90000 },
        { id: 'windows-11', name: 'Windows', version: '11', price: 120000 },
      ]
    },
    {
      name: 'سفارشی',
      options: [
        { id: 'custom-os', name: 'سیستم عامل سفارشی', version: '', price: 0 },
        { id: 'no-os', name: 'بدون سیستم عامل', version: '', price: 0 },
      ]
    }
  ];

  // Get OS group based on selected OS
  useEffect(() => {
    const findGroup = () => {
      for (const group of osOptions) {
        if (group.options.some(option => option.id === os)) {
          return group.name === 'لینوکس' ? 'linux' : group.name === 'ویندوز' ? 'windows' : 'custom';
        }
      }
      return 'linux';
    };
    
    setOsGroup(findGroup());
  }, [os]);

  // Get tax rate (9%)
  const taxRate = 0.09;
  
  // Calculate price based on selected resources and service type
  useEffect(() => {
    const model = pricing[serviceType];
    
    // Find OS price
    let osPrice = 0;
    for (const group of osOptions) {
      const selectedOs = group.options.find(option => option.id === os);
      if (selectedOs) {
        osPrice = selectedOs.price;
        break;
      }
    }
    
    let basePrice = (
      cpu * model.cpu +
      ram * model.ram +
      disk * model.disk +
      bandwidth * model.bandwidth +
      osPrice
    );
    
    // Apply location multiplier
    basePrice *= model.location[location];
    
    // Apply OS multiplier
    basePrice *= model.os[osGroup];
    
    // Apply period multiplier
    let periodMultiplier = 1;
    let periodDiscount = 0;
    
    switch (period) {
      case 'hourly':
        periodMultiplier = 0.002; // Converts monthly to hourly
        break;
      case 'quarterly':
        periodMultiplier = 3;
        periodDiscount = 0.05; // 5% discount for quarterly
        break;
      case 'biannual':
        periodMultiplier = 6;
        periodDiscount = 0.1; // 10% discount for biannual
        break;
      case 'annual':
        periodMultiplier = 12;
        periodDiscount = 0.15; // 15% discount for annual
        break;
      case 'biennial':
        periodMultiplier = 24;
        periodDiscount = 0.2; // 20% discount for biennial
        break;
      default:
        periodMultiplier = 1; // Monthly
    }
    
    // Calculate period price with period discount
    let periodPrice = basePrice * periodMultiplier * (1 - periodDiscount);
    
    // Apply discount code if any
    periodPrice *= (1 - discount);
    
    // Calculate tax
    const taxAmount = periodPrice * taxRate;
    
    // Final price with tax
    const finalPrice = periodPrice + taxAmount;
    
    setPrice(Math.round(finalPrice));
  }, [serviceType, cpu, ram, disk, bandwidth, location, os, osGroup, discount, period]);
  
  // Validate and apply discount code
  const applyDiscountCode = () => {
    // Simulate discount codes
    if (discountCode.toLowerCase() === 'novin10') {
      setDiscount(0.1); // 10% discount
    } else if (discountCode.toLowerCase() === 'novin20') {
      setDiscount(0.2); // 20% discount
    } else if (discountCode.toLowerCase() === 'novin30') {
      setDiscount(0.3); // 30% discount
    } else {
      setDiscount(0);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleOrder = () => {
    if (!agreeToTerms) {
      alert('لطفاً با قوانین و مقررات موافقت کنید');
      return;
    }
    
    setShowConfirmation(true);
  };
  
  // Period display text
  const getPeriodText = () => {
    switch (period) {
      case 'hourly': return 'ساعتی';
      case 'monthly': return 'ماهیانه';
      case 'quarterly': return 'سه ماهه';
      case 'biannual': return 'شش ماهه';
      case 'annual': return 'سالیانه';
      case 'biennial': return 'دو ساله';
      default: return 'ماهیانه';
    }
  };
  
  // Get period discount percent
  const getPeriodDiscountPercent = () => {
    switch (period) {
      case 'quarterly': return 5;
      case 'biannual': return 10;
      case 'annual': return 15;
      case 'biennial': return 20;
      default: return 0;
    }
  };
  
  // Get selected OS full name
  const getSelectedOSFullName = () => {
    for (const group of osOptions) {
      const selectedOs = group.options.find(option => option.id === os);
      if (selectedOs) {
        return `${selectedOs.name} ${selectedOs.version}`.trim();
      }
    }
    return '';
  };
  
  // Get the base monthly price before periods, taxes
  const getBaseMonthlyPrice = () => {
    const model = pricing[serviceType];
    
    // Find OS price
    let osPrice = 0;
    for (const group of osOptions) {
      const selectedOs = group.options.find(option => option.id === os);
      if (selectedOs) {
        osPrice = selectedOs.price;
        break;
      }
    }
    
    let basePrice = (
      cpu * model.cpu +
      ram * model.ram +
      disk * model.disk +
      bandwidth * model.bandwidth +
      osPrice
    );
    
    // Apply location multiplier
    basePrice *= model.location[location];
    
    // Apply OS multiplier
    basePrice *= model.os[osGroup];
    
    return Math.round(basePrice);
  };
  
  // Calculate discount amount
  const getDiscountAmount = () => {
    const baseMonthlyPrice = getBaseMonthlyPrice();
    let periodMultiplier = 1;
    
    switch (period) {
      case 'hourly': periodMultiplier = 0.002; break;
      case 'quarterly': periodMultiplier = 3; break;
      case 'biannual': periodMultiplier = 6; break;
      case 'annual': periodMultiplier = 12; break;
      case 'biennial': periodMultiplier = 24; break;
      default: periodMultiplier = 1;
    }
    
    const periodDiscount = getPeriodDiscountPercent() / 100;
    const periodDiscountAmount = baseMonthlyPrice * periodMultiplier * periodDiscount;
    const couponDiscountAmount = baseMonthlyPrice * periodMultiplier * (1 - periodDiscount) * discount;
    
    return Math.round(periodDiscountAmount + couponDiscountAmount);
  };
  
  // Calculate tax amount
  const getTaxAmount = () => {
    const baseMonthlyPrice = getBaseMonthlyPrice();
    let periodMultiplier = 1;
    
    switch (period) {
      case 'hourly': periodMultiplier = 0.002; break;
      case 'quarterly': periodMultiplier = 3; break;
      case 'biannual': periodMultiplier = 6; break;
      case 'annual': periodMultiplier = 12; break;
      case 'biennial': periodMultiplier = 24; break;
      default: periodMultiplier = 1;
    }
    
    const periodDiscount = getPeriodDiscountPercent() / 100;
    const priceAfterPeriodDiscount = baseMonthlyPrice * periodMultiplier * (1 - periodDiscount);
    const priceAfterAllDiscounts = priceAfterPeriodDiscount * (1 - discount);
    
    return Math.round(priceAfterAllDiscounts * taxRate);
  };
  
  // Get location display name
  const getLocationDisplayName = () => {
    switch (location) {
      case 'germany': return 'آلمان';
      case 'netherlands': return 'هلند';
      case 'france': return 'فرانسه';
      case 'usa': return 'آمریکا';
      case 'uk': return 'انگلستان';
      case 'canada': return 'کانادا';
      case 'singapore': return 'سنگاپور';
      case 'australia': return 'استرالیا';
      case 'iran': return 'ایران';
      case 'turkey': return 'ترکیه';
      default: return location;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>محاسبه هزینه سرویس</CardTitle>
        <CardDescription>منابع مورد نیاز خود را انتخاب کنید تا هزینه نهایی محاسبه شود.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Type Selection */}
        <Tabs 
          defaultValue={serviceType} 
          onValueChange={(value) => setServiceType(value as 'vps' | 'dedicated' | 'cloud')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="vps" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span>سرور مجازی</span>
            </TabsTrigger>
            <TabsTrigger value="dedicated" className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              <span>سرور اختصاصی</span>
            </TabsTrigger>
            <TabsTrigger value="cloud" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              <span>سرور ابری</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* CPU Selection */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  CPU (هسته)
                </Label>
                <span className="text-sm font-semibold">{cpu} هسته</span>
              </div>
              <Slider
                value={[cpu]}
                min={1}
                max={serviceType === 'dedicated' ? 32 : 16}
                step={1}
                onValueChange={(value) => setCpu(value[0])}
                className="py-2"
              />
            </div>
            
            {/* RAM Selection */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <MemoryStick className="h-4 w-4" />
                  RAM (گیگابایت)
                </Label>
                <span className="text-sm font-semibold">{ram} GB</span>
              </div>
              <Slider
                value={[ram]}
                min={1}
                max={serviceType === 'dedicated' ? 128 : 64}
                step={1}
                onValueChange={(value) => setRam(value[0])}
                className="py-2"
              />
            </div>
            
            {/* Disk Selection */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  فضای دیسک (گیگابایت)
                </Label>
                <span className="text-sm font-semibold">{disk} GB</span>
              </div>
              <Slider
                value={[disk]}
                min={10}
                max={serviceType === 'dedicated' ? 2000 : 500}
                step={10}
                onValueChange={(value) => setDisk(value[0])}
                className="py-2"
              />
            </div>
            
            {/* Bandwidth Selection */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>پهنای باند (ترابایت)</Label>
                <span className="text-sm font-semibold">{bandwidth} TB</span>
              </div>
              <Slider
                value={[bandwidth]}
                min={1}
                max={100}
                step={1}
                onValueChange={(value) => setBandwidth(value[0])}
                className="py-2"
              />
            </div>

            {/* Billing Period Selection */}
            <div className="space-y-2 mt-4">
              <Label>دوره زمانی</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="انتخاب دوره زمانی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">ساعتی</SelectItem>
                  <SelectItem value="monthly">ماهیانه</SelectItem>
                  <SelectItem value="quarterly">سه ماهه (5% تخفیف)</SelectItem>
                  <SelectItem value="biannual">شش ماهه (10% تخفیف)</SelectItem>
                  <SelectItem value="annual">یکساله (15% تخفیف)</SelectItem>
                  <SelectItem value="biennial">دو ساله (20% تخفیف)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Location Selection */}
            <div className="space-y-2">
              <Label>موقعیت سرور</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="انتخاب موقعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="germany">آلمان</SelectItem>
                  <SelectItem value="netherlands">هلند</SelectItem>
                  <SelectItem value="france">فرانسه</SelectItem>
                  <SelectItem value="usa">آمریکا</SelectItem>
                  <SelectItem value="uk">انگلستان</SelectItem>
                  <SelectItem value="canada">کانادا</SelectItem>
                  <SelectItem value="singapore">سنگاپور</SelectItem>
                  <SelectItem value="australia">استرالیا</SelectItem>
                  <SelectItem value="iran">ایران</SelectItem>
                  <SelectItem value="turkey">ترکیه</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* OS Selection */}
            <div className="space-y-2">
              <Label>سیستم عامل</Label>
              <Accordion type="single" collapsible className="border rounded-md">
                {osOptions.map((group, groupIndex) => (
                  <AccordionItem value={`group-${groupIndex}`} key={groupIndex}>
                    <AccordionTrigger className="px-4">{group.name}</AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <div className="space-y-2">
                        {group.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`flex items-center justify-between rounded-md px-3 py-2 cursor-pointer transition-colors ${
                              os === option.id ? 'bg-blue-50 border-blue-500 border' : 'hover:bg-gray-50 border border-transparent'
                            }`}
                            onClick={() => setOs(option.id)}
                          >
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full mr-2 ${os === option.id ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                              <span>
                                {option.name} {option.version && <span className="text-sm text-gray-500">{option.version}</span>}
                              </span>
                            </div>
                            {option.price > 0 && (
                              <Badge variant="outline" className="text-gray-500">
                                {formatPrice(option.price)}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            {/* Additional Notes */}
            <div className="space-y-2">
              <Label>توضیحات اضافی</Label>
              <textarea
                className="w-full px-3 py-2 h-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="توضیحات یا درخواست‌های خاص خود را وارد کنید..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            {/* Discount Code */}
            <div className="space-y-2">
              <Label>کد تخفیف</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="کد تخفیف خود را وارد کنید"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button onClick={applyDiscountCode} type="button">اعمال</Button>
              </div>
              {discount > 0 && (
                <p className="text-green-600 text-sm">{discount * 100}% تخفیف اعمال شد</p>
              )}
            </div>
            
            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2 space-x-reverse mt-4">
              <Checkbox 
                id="terms" 
                checked={agreeToTerms} 
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)} 
              />
              <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                با <a href="#" className="text-blue-600 hover:underline">قوانین و مقررات</a> موافقم
              </label>
            </div>
            
            {/* Price Display */}
            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>قیمت پایه ({getPeriodText()}):</span>
                  <span>{formatPrice(getBaseMonthlyPrice() * (period === 'hourly' ? 0.002 : period === 'monthly' ? 1 : period === 'quarterly' ? 3 : period === 'biannual' ? 6 : period === 'annual' ? 12 : 24))}</span>
                </div>
                
                {getDiscountAmount() > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span>تخفیف:</span>
                    <span>- {formatPrice(getDiscountAmount())}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>مالیات بر ارزش افزوده (9%):</span>
                  <span>{formatPrice(getTaxAmount())}</span>
                </div>
                
                <div className="border-t pt-2 mt-2"></div>
                
                <div className="flex justify-between items-center font-bold">
                  <span>مبلغ قابل پرداخت:</span>
                  <span>{formatPrice(price)}</span>
                </div>
              </div>
            </div>
            
            {/* Order Button */}
            <Button size="lg" className="w-full mt-4 bg-blue-600" onClick={handleOrder} disabled={!agreeToTerms}>
              <CreditCard className="ml-2 h-4 w-4" />
              سفارش و پرداخت
            </Button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h3 className="text-lg font-bold mb-4">تأیید سفارش</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">نوع سرویس:</span>
                    <span>{serviceType === 'vps' ? 'سرور مجازی' : serviceType === 'dedicated' ? 'سرور اختصاصی' : 'سرور ابری'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">منابع:</span>
                    <span>CPU: {cpu} هسته، RAM: {ram} GB، دیسک: {disk} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">سیستم عامل:</span>
                    <span>{getSelectedOSFullName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">موقعیت:</span>
                    <span>{getLocationDisplayName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">دوره زمانی:</span>
                    <span>{getPeriodText()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">قیمت نهایی:</span>
                    <span className="text-lg font-bold text-blue-600">{formatPrice(price)}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4">
                  <h4 className="font-medium">انتخاب روش پرداخت:</h4>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="border rounded-md p-3 cursor-pointer flex items-center bg-blue-50 border-blue-500">
                      <Wallet className="h-5 w-5 ml-2 text-blue-500" />
                      <span>کیف پول ({formatPrice(330000)})</span>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer flex items-center">
                      <CreditCard className="h-5 w-5 ml-2 text-yellow-500" />
                      <span>زرین‌پال</span>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer flex items-center">
                      <CreditCard className="h-5 w-5 ml-2 text-purple-500" />
                      <span>زیبال</span>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer flex items-center">
                      <Bitcoin className="h-5 w-5 ml-2 text-orange-500" />
                      <span>ارز دیجیتال</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 space-x-reverse mt-6">
                  <Button className="bg-blue-600" onClick={() => alert('سفارش با موفقیت ثبت شد!')}>
                    <Check className="ml-2 h-4 w-4" />
                    تأیید و پرداخت
                  </Button>
                  <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                    انصراف
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCalculator;

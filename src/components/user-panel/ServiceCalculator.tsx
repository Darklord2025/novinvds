
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, HardDrive, Cpu, Database, Cloud, CreditCard, MemoryStick } from 'lucide-react';

interface ResourcePricing {
  cpu: number;
  ram: number;
  disk: number;
  bandwidth: number;
  location: Record<string, number>;
  os: Record<string, number>;
}

const ServiceCalculator = () => {
  const [serviceType, setServiceType] = useState<'vps' | 'dedicated' | 'cloud'>('vps');
  const [cpu, setCpu] = useState(2);
  const [ram, setRam] = useState(2);
  const [disk, setDisk] = useState(50);
  const [bandwidth, setBandwidth] = useState(1);
  const [location, setLocation] = useState('germany');
  const [os, setOs] = useState('linux');
  const [price, setPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
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
      },
      os: {
        linux: 1,
        windows: 1.2,
        custom: 1,
      }
    }
  };
  
  // Calculate price based on selected resources and service type
  useEffect(() => {
    const model = pricing[serviceType];
    let basePrice = (
      cpu * model.cpu +
      ram * model.ram +
      disk * model.disk +
      bandwidth * model.bandwidth
    );
    
    // Apply location and OS multipliers
    basePrice *= model.location[location];
    basePrice *= model.os[os];
    
    // Apply discount if any
    const finalPrice = basePrice * (1 - discount);
    
    setPrice(Math.round(finalPrice));
  }, [serviceType, cpu, ram, disk, bandwidth, location, os, discount]);
  
  // Validate and apply discount code
  const applyDiscountCode = () => {
    // Simulate discount codes
    if (discountCode === 'NOVIN10') {
      setDiscount(0.1); // 10% discount
    } else if (discountCode === 'NOVIN20') {
      setDiscount(0.2); // 20% discount
    } else {
      setDiscount(0);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
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
                </SelectContent>
              </Select>
            </div>
            
            {/* OS Selection */}
            <div className="space-y-2">
              <Label>سیستم عامل</Label>
              <Select value={os} onValueChange={setOs}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="انتخاب سیستم عامل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linux">لینوکس</SelectItem>
                  <SelectItem value="windows">ویندوز</SelectItem>
                  <SelectItem value="custom">سفارشی</SelectItem>
                </SelectContent>
              </Select>
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
            
            {/* Price Display */}
            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">هزینه ماهانه:</span>
                <span className="text-xl font-bold">{formatPrice(price)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">هزینه سالانه:</span>
                <span className="text-lg font-bold">{formatPrice(price * 12 * 0.9)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">با پرداخت سالانه 10% تخفیف دریافت کنید</p>
            </div>
            
            {/* Order Button */}
            <Button size="lg" className="w-full mt-4 bg-blue-600">
              <CreditCard className="ml-2 h-4 w-4" />
              سفارش و پرداخت
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCalculator;

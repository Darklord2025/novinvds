import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Server, ShieldCheck, Cpu, HardDrive, Rocket, Clock, MemoryStick, Zap, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toPersianDigits } from '@/lib/numberUtils';

const VpsCustomOrder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [billingType, setBillingType] = useState<'hourly' | 'daily' | 'monthly'>('monthly');
  const [cpu, setCpu] = useState([2]);
  const [ram, setRam] = useState([4]);
  const [storage, setStorage] = useState([50]);
  const [bandwidth, setBandwidth] = useState([1000]);
  const [location, setLocation] = useState('iran');
  const [os, setOs] = useState('ubuntu');
  const [totalPrice, setTotalPrice] = useState(0);

  // Add-on modules
  const [addons, setAddons] = useState({
    backup: false,
    ddosProtection: false,
    managedSupport: false,
    extraIp: 0,
    controlPanel: 'none',
    ssl: false
  });

  const pricingRates = {
    cpu: 50000,
    ram: 30000,
    storage: 2000,
    bandwidth: 1000,
    base: 100000
  };

  const addonPrices = {
    backup: 50000,
    ddosProtection: 100000,
    managedSupport: 200000,
    extraIp: 30000,
    controlPanel: {
      none: 0,
      cpanel: 150000,
      directadmin: 80000,
      plesk: 120000
    },
    ssl: 25000
  };

  const billingMultipliers = {
    hourly: 1 / (30 * 24),
    daily: 1 / 30,
    monthly: 1
  };

  const locations = [
    { id: 'iran', name: 'ایران - تهران', multiplier: 1 },
    { id: 'germany', name: 'آلمان - فرانکفورت', multiplier: 1.2 },
    { id: 'netherlands', name: 'هلند - آمستردام', multiplier: 1.3 },
    { id: 'usa', name: 'آمریکا - نیویورک', multiplier: 1.5 },
    { id: 'france', name: 'فرانسه - پاریس', multiplier: 1.25 }
  ];

  const operatingSystems = [
    { id: 'ubuntu', name: 'Ubuntu 22.04 LTS', type: 'linux' },
    { id: 'debian', name: 'Debian 12', type: 'linux' },
    { id: 'centos', name: 'CentOS Stream 9', type: 'linux' },
    { id: 'almalinux', name: 'AlmaLinux 9', type: 'linux' },
    { id: 'windows', name: 'Windows Server 2022', type: 'windows' }
  ];

  useEffect(() => {
    const locationMultiplier = locations.find(l => l.id === location)?.multiplier || 1;
    
    const basePrice = (
      pricingRates.base +
      (cpu[0] * pricingRates.cpu) +
      (ram[0] * pricingRates.ram) +
      (storage[0] * pricingRates.storage) +
      (bandwidth[0] * pricingRates.bandwidth)
    ) * locationMultiplier;

    // Add-ons
    let addonsPrice = 0;
    if (addons.backup) addonsPrice += addonPrices.backup;
    if (addons.ddosProtection) addonsPrice += addonPrices.ddosProtection;
    if (addons.managedSupport) addonsPrice += addonPrices.managedSupport;
    if (addons.ssl) addonsPrice += addonPrices.ssl;
    addonsPrice += addons.extraIp * addonPrices.extraIp;
    addonsPrice += addonPrices.controlPanel[addons.controlPanel as keyof typeof addonPrices.controlPanel] || 0;

    const totalMonthly = basePrice + addonsPrice;
    const finalPrice = totalMonthly * billingMultipliers[billingType];
    setTotalPrice(Math.round(finalPrice));
  }, [cpu, ram, storage, bandwidth, location, billingType, addons]);

  const formatPrice = (price: number) => {
    return toPersianDigits(new Intl.NumberFormat('fa-IR').format(price));
  };

  const getBillingLabel = () => {
    switch (billingType) {
      case 'hourly': return 'در ساعت';
      case 'daily': return 'در روز';
      case 'monthly': return 'در ماه';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 lg:p-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">سرور مجازی سفارشی</h1>
              <p className="text-purple-100 text-lg mb-4">
                منابع دلخواه خود را انتخاب کنید و فقط برای آنچه نیاز دارید هزینه پرداخت کنید
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Badge className="bg-white/20 text-white border-none px-4 py-2">
                  <Clock className="w-4 h-4 ml-2" />
                  صورتحساب ساعتی
                </Badge>
                <Badge className="bg-white/20 text-white border-none px-4 py-2">
                  <Rocket className="w-4 h-4 ml-2" />
                  راه‌اندازی آنی
                </Badge>
                <Badge className="bg-white/20 text-white border-none px-4 py-2">
                  <ShieldCheck className="w-4 h-4 ml-2" />
                  بدون قرارداد
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    نوع صورتحساب
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={billingType} onValueChange={(v) => setBillingType(v as any)}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="hourly">ساعتی</TabsTrigger>
                      <TabsTrigger value="daily">روزانه</TabsTrigger>
                      <TabsTrigger value="monthly">ماهانه</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <p className="text-sm text-gray-500 mt-3">
                    {billingType === 'hourly' && 'فقط برای ساعاتی که استفاده می‌کنید پرداخت کنید. مناسب برای تست و پروژه‌های موقت.'}
                    {billingType === 'daily' && 'پرداخت روزانه برای پروژه‌های کوتاه‌مدت. بدون نیاز به تعهد طولانی.'}
                    {billingType === 'monthly' && 'بهترین قیمت برای استفاده مداوم. مناسب پروژه‌های دائمی.'}
                  </p>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>انتخاب منابع</CardTitle>
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
                      max={32}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{toPersianDigits(1)}</span>
                      <span>{toPersianDigits(32)}</span>
                    </div>
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
                      max={128}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{toPersianDigits(1)} GB</span>
                      <span>{toPersianDigits(128)} GB</span>
                    </div>
                  </div>

                  {/* Storage */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center gap-2 font-medium">
                        <HardDrive className="w-4 h-4 text-purple-500" />
                        فضای ذخیره‌سازی NVMe
                      </label>
                      <Badge variant="outline">{toPersianDigits(storage[0])} گیگابایت</Badge>
                    </div>
                    <Slider
                      value={storage}
                      onValueChange={setStorage}
                      max={2000}
                      min={20}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{toPersianDigits(20)} GB</span>
                      <span>{toPersianDigits(2000)} GB</span>
                    </div>
                  </div>

                  {/* Bandwidth */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center gap-2 font-medium">
                        <Zap className="w-4 h-4 text-orange-500" />
                        پهنای باند ماهانه
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
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{toPersianDigits(100)} GB</span>
                      <span>{toPersianDigits(10000)} GB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location & OS */}
              <Card>
                <CardHeader>
                  <CardTitle>موقعیت و سیستم‌عامل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  <div>
                    <label className="block font-medium mb-2">سیستم‌عامل</label>
                    <Select value={os} onValueChange={setOs}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {operatingSystems.map(osItem => (
                          <SelectItem key={osItem.id} value={osItem.id}>
                            {osItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Add-on Modules */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    ماژول‌های اضافی
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={addons.backup}
                          onCheckedChange={(checked) => 
                            setAddons({...addons, backup: checked as boolean})
                          }
                        />
                        <div>
                          <div className="font-medium">بکاپ روزانه</div>
                          <div className="text-sm text-gray-500">{formatPrice(addonPrices.backup)} تومان/ماه</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={addons.ddosProtection}
                          onCheckedChange={(checked) => 
                            setAddons({...addons, ddosProtection: checked as boolean})
                          }
                        />
                        <div>
                          <div className="font-medium">محافظت DDoS</div>
                          <div className="text-sm text-gray-500">{formatPrice(addonPrices.ddosProtection)} تومان/ماه</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={addons.managedSupport}
                          onCheckedChange={(checked) => 
                            setAddons({...addons, managedSupport: checked as boolean})
                          }
                        />
                        <div>
                          <div className="font-medium">پشتیبانی مدیریت‌شده</div>
                          <div className="text-sm text-gray-500">{formatPrice(addonPrices.managedSupport)} تومان/ماه</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={addons.ssl}
                          onCheckedChange={(checked) => 
                            setAddons({...addons, ssl: checked as boolean})
                          }
                        />
                        <div>
                          <div className="font-medium">گواهی SSL</div>
                          <div className="text-sm text-gray-500">{formatPrice(addonPrices.ssl)} تومان/ماه</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Extra IP */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">IP اضافی</div>
                        <div className="text-sm text-gray-500">{formatPrice(addonPrices.extraIp)} تومان/ماه هر IP</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setAddons({...addons, extraIp: Math.max(0, addons.extraIp - 1)})}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{toPersianDigits(addons.extraIp)}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setAddons({...addons, extraIp: addons.extraIp + 1})}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Control Panel */}
                  <div className="p-4 border rounded-lg">
                    <label className="block font-medium mb-2">کنترل پنل</label>
                    <Select 
                      value={addons.controlPanel} 
                      onValueChange={(v) => setAddons({...addons, controlPanel: v})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">بدون کنترل پنل (رایگان)</SelectItem>
                        <SelectItem value="cpanel">cPanel ({formatPrice(150000)} تومان/ماه)</SelectItem>
                        <SelectItem value="directadmin">DirectAdmin ({formatPrice(80000)} تومان/ماه)</SelectItem>
                        <SelectItem value="plesk">Plesk ({formatPrice(120000)} تومان/ماه)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    خلاصه سفارش
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">مشخصات سرور</h3>
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
                        <span>{toPersianDigits(storage[0])} گیگابایت NVMe</span>
                      </div>
                      <div className="flex justify-between">
                        <span>پهنای باند:</span>
                        <span>{toPersianDigits(bandwidth[0])} گیگابایت</span>
                      </div>
                      <div className="flex justify-between">
                        <span>مکان:</span>
                        <span>{locations.find(l => l.id === location)?.name?.split(' - ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>سیستم‌عامل:</span>
                        <span>{operatingSystems.find(o => o.id === os)?.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Addons Summary */}
                  {(addons.backup || addons.ddosProtection || addons.managedSupport || addons.ssl || addons.extraIp > 0 || addons.controlPanel !== 'none') && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-3">ماژول‌های اضافی</h3>
                      <div className="space-y-2 text-sm">
                        {addons.backup && <div className="flex justify-between"><span>بکاپ روزانه</span><Check className="w-4 h-4 text-green-500" /></div>}
                        {addons.ddosProtection && <div className="flex justify-between"><span>محافظت DDoS</span><Check className="w-4 h-4 text-green-500" /></div>}
                        {addons.managedSupport && <div className="flex justify-between"><span>پشتیبانی مدیریت‌شده</span><Check className="w-4 h-4 text-green-500" /></div>}
                        {addons.ssl && <div className="flex justify-between"><span>گواهی SSL</span><Check className="w-4 h-4 text-green-500" /></div>}
                        {addons.extraIp > 0 && <div className="flex justify-between"><span>IP اضافی</span><span>{toPersianDigits(addons.extraIp)} عدد</span></div>}
                        {addons.controlPanel !== 'none' && <div className="flex justify-between"><span>کنترل پنل</span><span>{addons.controlPanel}</span></div>}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg text-center text-white">
                      <div className="text-sm opacity-90 mb-1">قیمت {getBillingLabel()}</div>
                      <div className="text-3xl font-bold">
                        {formatPrice(totalPrice)}
                      </div>
                      <div className="text-sm opacity-90">تومان</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <ShoppingCart className="w-4 h-4 ml-2" />
                      افزودن به سبد خرید
                    </Button>
                    <Link to="/vps">
                      <Button variant="outline" className="w-full">
                        مشاهده پلن‌های آماده
                      </Button>
                    </Link>
                  </div>

                  <div className="text-xs text-gray-500 text-center space-y-1">
                    <p>✓ راه‌اندازی آنی در کمتر از ۵ دقیقه</p>
                    <p>✓ بدون نیاز به قرارداد</p>
                    <p>✓ پشتیبانی ۲۴/۷</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VpsCustomOrder;

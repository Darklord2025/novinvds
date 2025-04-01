
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, Coins, Bitcoin, RefreshCw, Check, Clock, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const WalletPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('zarinpal');
  const [amount, setAmount] = useState('');
  const [isAutoRenew, setIsAutoRenew] = useState(false);
  const { toast } = useToast();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };
  
  const formatNumber = (num: string) => {
    if (!num) return '';
    return Number(num).toLocaleString('fa-IR');
  };

  const handlePayment = () => {
    if (!amount || parseInt(amount) < 10000) {
      toast({
        title: "خطا در پرداخت",
        description: "مبلغ باید حداقل 10,000 تومان باشد",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "در حال انتقال به درگاه پرداخت",
      description: "لطفاً منتظر بمانید...",
    });

    // در اینجا باید به درگاه پرداخت منتقل شویم
    setTimeout(() => {
      toast({
        title: "تست پرداخت موفق",
        description: "افزایش موجودی با موفقیت انجام شد (حالت آزمایشی)",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">کیف پول</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">موجودی کیف پول</CardTitle>
            <CardDescription>موجودی قابل استفاده برای پرداخت</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-500 ml-3" />
              <div>
                <p className="text-2xl font-bold">0 تومان</p>
                <p className="text-sm text-gray-500">قابل استفاده</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">افزایش موجودی</CardTitle>
            <CardDescription>از طریق یکی از روش‌های زیر کیف پول خود را شارژ کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مبلغ (تومان)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="مبلغ به تومان وارد کنید"
                    dir="ltr"
                  />
                  {amount && (
                    <p className="mt-1 text-sm text-gray-500">
                      {formatNumber(amount)} تومان
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">روش پرداخت</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div 
                      className={`border rounded-md p-3 cursor-pointer flex items-center ${paymentMethod === 'zarinpal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('zarinpal')}
                    >
                      <CreditCard className="h-5 w-5 ml-2 text-yellow-500" />
                      <span>زرین‌پال</span>
                    </div>
                    <div 
                      className={`border rounded-md p-3 cursor-pointer flex items-center ${paymentMethod === 'zibal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('zibal')}
                    >
                      <CreditCard className="h-5 w-5 ml-2 text-purple-500" />
                      <span>زیبال</span>
                    </div>
                    <div 
                      className={`border rounded-md p-3 cursor-pointer flex items-center ${paymentMethod === 'crypto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('crypto')}
                    >
                      <Bitcoin className="h-5 w-5 ml-2 text-orange-500" />
                      <span>ارز دیجیتال</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="auto-renewal"
                    checked={isAutoRenew}
                    onChange={() => setIsAutoRenew(!isAutoRenew)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ml-2"
                  />
                  <label htmlFor="auto-renewal" className="text-sm text-gray-700">
                    فعال‌سازی پرداخت خودکار برای تمدید سرویس‌ها
                  </label>
                </div>
              </div>
              
              <Button className="w-full bg-blue-600" onClick={handlePayment}>پرداخت و افزایش موجودی</Button>
            </div>

            {paymentMethod === 'crypto' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">پرداخت با ارز دیجیتال</h4>
                <p className="text-sm text-blue-700 mb-3">برای پرداخت با ارزهای دیجیتال، می‌توانید از یکی از روش‌های زیر استفاده کنید:</p>
                <ul className="text-sm text-blue-700 space-y-2 mr-4 list-disc">
                  <li>بیت‌کوین (BTC)</li>
                  <li>اتریوم (ETH)</li>
                  <li>تتر (USDT)</li>
                  <li>دوج‌کوین (DOGE)</li>
                </ul>
                <p className="text-sm text-blue-700 mt-3">پس از کلیک روی دکمه پرداخت، به صفحه انتخاب ارز و جزئیات پرداخت منتقل خواهید شد.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات پرداخت خودکار</CardTitle>
          <CardDescription>مدیریت تمدید خودکار سرویس‌ها از کیف پول</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h4 className="font-medium">پرداخت خودکار از کیف پول</h4>
                <p className="text-sm text-gray-500">سرویس‌های شما به طور خودکار از موجودی کیف پول تمدید شوند</p>
              </div>
              <div className="flex items-center">
                <label htmlFor="autoPaySwitch" className="sr-only">پرداخت خودکار</label>
                <input
                  type="checkbox"
                  id="autoPaySwitch"
                  checked={isAutoRenew}
                  onChange={() => setIsAutoRenew(!isAutoRenew)}
                  className="h-5 w-10 rounded-full bg-gray-300 focus:ring-blue-500 relative inline-flex items-center transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">سرویس‌های فعال برای تمدید خودکار</h4>
              
              <div className="border rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-blue-500 ml-2" />
                  <div>
                    <h5 className="font-medium">سرور مجازی لینوکس</h5>
                    <p className="text-xs text-gray-500">تاریخ تمدید بعدی: 1402/06/15</p>
                  </div>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              
              <div className="border rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-purple-500 ml-2" />
                  <div>
                    <h5 className="font-medium">هاست وردپرس</h5>
                    <p className="text-xs text-gray-500">تاریخ تمدید بعدی: 1402/07/24</p>
                  </div>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              
              <div className="border rounded-lg p-3 flex justify-between items-center bg-yellow-50">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-amber-500 ml-2" />
                  <div>
                    <h5 className="font-medium">دامنه novinvds.ir</h5>
                    <p className="text-xs text-gray-500">تاریخ تمدید بعدی: 1402/05/10</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-600">
                  <AlertTriangle className="h-5 w-5 ml-1" />
                  <span className="text-xs">موجودی ناکافی</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>تاریخچه تراکنش‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">همه تراکنش‌ها</TabsTrigger>
              <TabsTrigger value="deposits">افزایش موجودی</TabsTrigger>
              <TabsTrigger value="withdrawals">برداشت و پرداخت</TabsTrigger>
              <TabsTrigger value="automatic">پرداخت‌های خودکار</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="text-center py-8 text-gray-500">
                <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>هنوز تراکنشی انجام نداده‌اید.</p>
              </div>
            </TabsContent>
            <TabsContent value="deposits" className="mt-6">
              <div className="text-center py-8 text-gray-500">
                <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>هنوز تراکنش افزایش موجودی انجام نداده‌اید.</p>
              </div>
            </TabsContent>
            <TabsContent value="withdrawals" className="mt-6">
              <div className="text-center py-8 text-gray-500">
                <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>هنوز تراکنش برداشت یا پرداختی انجام نداده‌اید.</p>
              </div>
            </TabsContent>
            <TabsContent value="automatic" className="mt-6">
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>هنوز پرداخت خودکاری انجام نشده است.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;

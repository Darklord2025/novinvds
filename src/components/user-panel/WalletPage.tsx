
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, Coins, Bitcoin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WalletPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('zarinpal');
  const [amount, setAmount] = useState('');
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };
  
  const formatNumber = (num: string) => {
    if (!num) return '';
    return Number(num).toLocaleString('fa-IR');
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
              </div>
              
              <Button className="w-full bg-blue-600">پرداخت و افزایش موجودی</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;

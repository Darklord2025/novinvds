import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Wallet,
  CreditCard,
  Bitcoin,
  DollarSign,
  Info
} from 'lucide-react';

const WalletTopUpPage = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const paymentMethods = [
    { value: 'card', label: 'کارت بانکی', icon: CreditCard },
    { value: 'crypto', label: 'ارز دیجیتال', icon: Bitcoin },
    { value: 'perfect', label: 'پرفکت مانی', icon: DollarSign }
  ];

  const currentBalance = "11,200,000";

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">افزایش موجودی کیف پول</h1>
        <p className="text-gray-600">موجودی کیف پول خود را افزایش دهید</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Balance */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              موجودی فعلی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {currentBalance} تومان
              </div>
              <p className="text-sm text-gray-600">موجودی کیف پول شما</p>
            </div>
          </CardContent>
        </Card>

        {/* Top Up Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>افزایش موجودی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">مبلغ مورد نظر (تومان)</label>
                <Input 
                  type="number" 
                  placeholder="مبلغ را وارد کنید"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-right"
                />
                <div className="flex gap-2 mt-2">
                  {['100000', '500000', '1000000', '2000000'].map((preset) => (
                    <Button 
                      key={preset}
                      variant="outline" 
                      size="sm"
                      onClick={() => setAmount(preset)}
                    >
                      {parseInt(preset).toLocaleString()} تومان
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">روش پرداخت</label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب روش پرداخت" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        <div className="flex items-center gap-2">
                          <method.icon className="w-4 h-4" />
                          {method.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Method Info */}
              {paymentMethod && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      {paymentMethod === 'card' && 'پرداخت از طریق درگاه امن بانکی انجام می‌شود.'}
                      {paymentMethod === 'crypto' && 'پرداخت با ارزهای دیجیتال بیت کوین، اتریوم و تتر پذیرفته می‌شود.'}
                      {paymentMethod === 'perfect' && 'پرداخت از طریق کیف پول پرفکت مانی انجام می‌شود.'}
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>مبلغ:</span>
                  <span>{amount ? parseInt(amount).toLocaleString() : '0'} تومان</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>کارمزد:</span>
                  <span>0 تومان</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>مجموع:</span>
                  <span>{amount ? parseInt(amount).toLocaleString() : '0'} تومان</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                disabled={!amount || !paymentMethod}
              >
                پرداخت و افزایش موجودی
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Top-ups */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>آخرین افزایش موجودی‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '1402/08/04', amount: '+500,000', method: 'کارت بانکی', status: 'موفق' },
              { date: '1402/07/28', amount: '+1,000,000', method: 'ارز دیجیتال', status: 'موفق' },
              { date: '1402/07/20', amount: '+250,000', method: 'پرفکت مانی', status: 'در انتظار' }
            ].map((topup, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">افزایش موجودی</div>
                  <div className="text-xs text-gray-600">{topup.method}</div>
                  <div className="text-xs text-gray-500">{topup.date}</div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm text-green-600">{topup.amount} تومان</div>
                  <div className="text-xs text-gray-600">{topup.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletTopUpPage;
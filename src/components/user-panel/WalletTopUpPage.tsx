import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wallet, 
  CreditCard, 
  Coins, 
  Shield, 
  Clock,
  CheckCircle,
  Info,
  Plus,
  ArrowRight
} from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';

interface WalletTopUpPageProps {
  onBack?: () => void;
}

const WalletTopUpPage: React.FC<WalletTopUpPageProps> = ({ onBack }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const currentBalance = toPersianDigits('11,200,000');
  const presetAmounts = [toPersianDigits('100,000'), toPersianDigits('500,000'), toPersianDigits('1,000,000'), toPersianDigits('2,000,000'), toPersianDigits('5,000,000')];
  const presetAmountsRaw = ['100,000', '500,000', '1,000,000', '2,000,000', '5,000,000'];

  const paymentMethods = [
    {
      id: 'card',
      name: 'کارت بانکی',
      icon: CreditCard,
      fee: 0,
      description: 'پرداخت امن از طریق درگاه بانک',
      processingTime: 'فوری'
    },
    {
      id: 'crypto',
      name: 'ارز دیجیتال',
      icon: Coins,
      fee: 0,
      description: 'پرداخت با بیت‌کوین، اتریوم و سایر ارزها',
      processingTime: '5-30 دقیقه'
    },
    {
      id: 'perfectmoney',
      name: 'Perfect Money',
      icon: Wallet,
      fee: 0,
      description: 'پرداخت از طریق کیف پول Perfect Money',
      processingTime: 'فوری'
    }
  ];

  const recentTopUps = [
    {
      date: toPersianDigits('1402/08/15'),
      amount: toPersianDigits('+2,000,000'),
      method: 'کارت بانکی',
      status: 'Success',
      referenceId: toPersianDigits('REF789123')
    },
    {
      date: toPersianDigits('1402/08/10'),
      amount: toPersianDigits('+1,000,000'),
      method: 'کریپتو',
      status: 'Success',
      referenceId: toPersianDigits('REF789124')
    },
    {
      date: toPersianDigits('1402/08/05'),
      amount: toPersianDigits('+500,000'),
      method: 'Perfect Money',
      status: 'Success',
      referenceId: toPersianDigits('REF789125')
    },
    {
      date: toPersianDigits('1402/08/01'),
      amount: toPersianDigits('+3,000,000'),
      method: 'کارت بانکی',
      status: 'Success',
      referenceId: toPersianDigits('REF789126')
    }
  ];

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);
  const numericAmount = amount.replace(/,/g, '');
  const fee = selectedPaymentMethod ? (parseFloat(numericAmount) * selectedPaymentMethod.fee / 100) : 0;
  const totalAmount = parseFloat(numericAmount) + fee;

  const handleAmountChange = (value: string) => {
    // Remove non-numeric characters and format with commas
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setAmount(formattedValue);
  };

  const handlePresetAmount = (presetAmount: string) => {
    setAmount(presetAmount);
  };

  const handleTopUp = async () => {
    if (!amount || !paymentMethod) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Reset form or show success message
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Success': { className: 'bg-green-500 hover:bg-green-600', text: 'موفق' },
      'Pending': { className: 'bg-yellow-500 hover:bg-yellow-600', text: 'در انتظار' },
      'Failed': { className: 'bg-red-500 hover:bg-red-600', text: 'ناموفق' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { className: 'bg-gray-500', text: status };
    return (
      <Badge className={`${config.className} text-white`}>
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              بازگشت
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold mb-2">افزایش موجودی کیف پول</h1>
            <p className="text-muted-foreground">موجودی کیف پول خود را افزایش دهید</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Top-up Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                افزایش موجودی
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>موجودی فعلی:</span>
                <span className="font-bold text-lg text-green-600">{currentBalance} تومان</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">مبلغ مورد نظر (تومان)</Label>
                <Input
                  id="amount"
                  placeholder="مبلغ را وارد کنید"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="text-lg font-bold"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {presetAmountsRaw.map((presetAmount, index) => (
                    <Button
                      key={presetAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetAmount(presetAmount)}
                      className="text-xs"
                    >
                      {presetAmounts[index]} تومان
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label>روش پرداخت</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label 
                        htmlFor={method.id} 
                        className="flex-1 flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                      >
                        <method.icon className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Clock className="w-3 h-3" />
                            <span>زمان پردازش: {method.processingTime}</span>
                          </div>
                        </div>
                        {method.fee === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            بدون کارمزد
                          </Badge>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Payment Method Info */}
              {selectedPaymentMethod && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {selectedPaymentMethod.name === 'کارت بانکی' && (
                      <>
                        پس از کلیک روی دکمه پرداخت، به درگاه امن بانک منتقل می‌شوید. پرداخت شما توسط پروتکل‌های امنیتی بانک محافظت می‌شود.
                      </>
                    )}
                    {selectedPaymentMethod.name === 'ارز دیجیتال' && (
                      <>
                        آدرس کیف پول برای پرداخت در مرحله بعد نمایش داده خواهد شد. پس از تأیید تراکنش، موجودی شما افزایش می‌یابد.
                      </>
                    )}
                    {selectedPaymentMethod.name === 'Perfect Money' && (
                      <>
                        به سایت Perfect Money منتقل می‌شوید تا پرداخت را از کیف پول خود انجام دهید.
                      </>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Payment Summary */}
              {amount && paymentMethod && (
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>مبلغ درخواستی:</span>
                    <span className="font-bold">{toPersianDigits(amount)} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span>کارمزد:</span>
                    <span className="font-bold">{toPersianDigits(fee.toLocaleString())} تومان</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="text-green-600">{toPersianDigits(totalAmount.toLocaleString())} تومان</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleTopUp}
                disabled={!amount || !paymentMethod || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    در حال پردازش...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 ml-2" />
                    پرداخت و افزایش موجودی
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Top-ups */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                آخرین افزایش موجودی‌ها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTopUps.map((topup, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-bold text-sm text-green-600">{topup.amount} تومان</div>
                      <div className="text-xs text-muted-foreground">{topup.method}</div>
                      <div className="text-xs text-muted-foreground">{topup.date}</div>
                    </div>
                    <div className="text-left">
                      {getStatusBadge(topup.status)}
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        {topup.referenceId}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm mb-1">امنیت پرداخت</div>
                  <div className="text-xs text-muted-foreground">
                    تمامی پرداخت‌ها با استفاده از پروتکل‌های امنیتی معتبر و رمزگذاری SSL انجام می‌شود.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletTopUpPage;
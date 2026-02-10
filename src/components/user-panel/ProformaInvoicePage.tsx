import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowRight, FileText, CreditCard, Wallet, Check, Printer, 
  Download, Clock, ShoppingCart, AlertCircle
} from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';
import { toast } from '@/components/ui/use-toast';

interface ProformaInvoicePageProps {
  onBack?: () => void;
}

const ProformaInvoicePage: React.FC<ProformaInvoicePageProps> = ({ onBack }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'gateway' | 'wallet'>('gateway');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');

  const invoiceId = toPersianDigits('INV-1402-0089');
  const invoiceDate = toPersianDigits('1402/08/15');
  const dueDate = toPersianDigits('1402/08/17');

  const items = [
    { name: 'سرور مجازی استاندارد', specs: '۲ هسته CPU، ۴ گیگ رم، ۵۰ گیگ SSD', period: 'ماهانه', price: 399000 },
    { name: 'example.com', specs: 'ثبت دامنه', period: 'سالانه', price: 390000 },
    { name: 'هاست پایه وردپرس', specs: '۵ گیگ فضا، ۵۰ گیگ پهنای باند', period: 'ماهانه', price: 150000 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = Math.round(subtotal * 0.09);
  const total = subtotal + tax;
  const walletBalance = 11200000;

  const handlePayment = () => {
    if (!acceptTerms) {
      toast({ title: "خطا", description: "لطفاً شرایط سرویس را بپذیرید", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentMethod === 'wallet') {
        toast({ title: "پرداخت موفق", description: "مبلغ از کیف پول کسر شد و سفارش ثبت شد." });
      } else {
        toast({ title: "انتقال به درگاه", description: "در حال انتقال به درگاه بانکی..." });
      }
    }, 2000);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        {onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            بازگشت به سبد خرید
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold">پیش‌فاکتور</h1>
          <p className="text-muted-foreground text-sm">لطفاً پیش‌فاکتور را بررسی و تأیید کنید</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  پیش‌فاکتور {invoiceId}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                    <Clock className="w-3 h-3 ml-1" />
                    در انتظار پرداخت
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Invoice Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/50 rounded-xl p-4">
                <div>
                  <span className="text-xs text-muted-foreground">شماره فاکتور</span>
                  <p className="font-medium">{invoiceId}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">تاریخ صدور</span>
                  <p className="font-medium">{invoiceDate}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">سررسید</span>
                  <p className="font-medium">{dueDate}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">وضعیت</span>
                  <p className="font-medium text-amber-600">پرداخت نشده</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-muted/50 p-3 grid grid-cols-12 text-sm font-medium">
                  <div className="col-span-5">شرح خدمات</div>
                  <div className="col-span-3 text-center">دوره</div>
                  <div className="col-span-4 text-left">مبلغ (تومان)</div>
                </div>
                {items.map((item, index) => (
                  <div key={index} className="p-3 grid grid-cols-12 text-sm border-t items-center">
                    <div className="col-span-5">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.specs}</p>
                    </div>
                    <div className="col-span-3 text-center">
                      <Badge variant="outline">{item.period}</Badge>
                    </div>
                    <div className="col-span-4 text-left font-medium">
                      {toPersianDigits(item.price.toLocaleString())}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 bg-muted/30 rounded-xl p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">جمع کل:</span>
                  <span>{toPersianDigits(subtotal.toLocaleString())} تومان</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">مالیات ({toPersianDigits('9')}٪):</span>
                  <span>{toPersianDigits(tax.toLocaleString())} تومان</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-primary">{toPersianDigits(total.toLocaleString())} تومان</span>
                </div>
              </div>

              {/* Order Notes */}
              <div className="space-y-2">
                <Label>توضیحات سفارش (اختیاری)</Label>
                <Textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="توضیحات اضافی درباره سفارش خود..."
                  className="min-h-[80px] resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Print/Download */}
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              چاپ پیش‌فاکتور
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              دانلود PDF
            </Button>
          </div>
        </div>

        {/* Payment Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="w-5 h-5" />
                روش پرداخت
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payment Methods */}
              <button
                className={`w-full p-4 rounded-xl border-2 text-right transition-all ${
                  paymentMethod === 'gateway' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/30'
                }`}
                onClick={() => setPaymentMethod('gateway')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    paymentMethod === 'gateway' ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">درگاه بانکی</p>
                    <p className="text-xs text-muted-foreground">پرداخت آنلاین با کارت بانکی</p>
                  </div>
                  {paymentMethod === 'gateway' && <Check className="w-5 h-5 text-primary mr-auto" />}
                </div>
              </button>

              <button
                className={`w-full p-4 rounded-xl border-2 text-right transition-all ${
                  paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/30'
                }`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    paymentMethod === 'wallet' ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">کیف پول</p>
                    <p className="text-xs text-muted-foreground">
                      موجودی: {toPersianDigits(walletBalance.toLocaleString())} تومان
                    </p>
                  </div>
                  {paymentMethod === 'wallet' && <Check className="w-5 h-5 text-primary mr-auto" />}
                </div>
              </button>

              {paymentMethod === 'wallet' && total > walletBalance && (
                <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>موجودی کیف پول کافی نیست. لطفاً ابتدا موجودی خود را افزایش دهید.</span>
                </div>
              )}

              <Separator />

              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">مبلغ فاکتور:</span>
                  <span className="font-bold text-primary">{toPersianDigits(total.toLocaleString())} تومان</span>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  شرایط و قوانین سرویس را می‌پذیرم
                </Label>
              </div>

              {/* Pay Button */}
              <Button
                className="w-full py-6 text-lg gap-2"
                disabled={!acceptTerms || isProcessing || (paymentMethod === 'wallet' && total > walletBalance)}
                onClick={handlePayment}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin">●</span>
                    در حال پردازش...
                  </>
                ) : paymentMethod === 'gateway' ? (
                  <>
                    <CreditCard className="w-5 h-5" />
                    پرداخت از درگاه بانکی
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    پرداخت از کیف پول
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4 text-center">
                <CreditCard className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">پرداخت امن</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <Check className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-xs font-medium">تحویل فوری</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProformaInvoicePage;

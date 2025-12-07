import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ArrowRight, RefreshCw, Check, FileText, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toPersianDigits } from '@/lib/numberUtils';
import { toast } from '@/components/ui/use-toast';

interface CheckoutPageProps {
  onBack?: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack }) => {
  const [orderNotes, setOrderNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode] = useState('7J2RNC');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order data
  const orderTotal = 119900;
  const invoiceId = toPersianDigits('INV-1402-0089');
  const trackingId = toPersianDigits('TRK-98765432');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast({
        title: "خطا",
        description: "لطفاً شرایط سرویس را بپذیرید",
        variant: "destructive"
      });
      return;
    }
    if (captchaInput.toUpperCase() !== captchaCode) {
      toast({
        title: "خطا",
        description: "کد امنیتی اشتباه است",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "پرداخت موفق",
        description: "سفارش شما با موفقیت ثبت شد"
      });
    }, 2000);
  };

  const refreshCaptcha = () => {
    toast({
      title: "کپچا بروزرسانی شد",
      description: "لطفاً کد جدید را وارد کنید"
    });
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              بازگشت به سبد خرید
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold mb-2">پرداخت نهایی</h1>
            <p className="text-muted-foreground">
              لطفا اطلاعات شخصی و مالی خود را جهت اتمام مراحل خرید، وارد نمایید
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              خلاصه سفارش
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Order Info */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">شناسه فاکتور:</span>
                  <span className="font-medium">{invoiceId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">شناسه پیگیری:</span>
                  <span className="font-medium">{trackingId}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-muted-foreground">قابل پرداخت:</span>
                  <span className="text-2xl font-bold text-primary">
                    {toPersianDigits(orderTotal.toLocaleString())} تومان
                  </span>
                </div>
              </div>

              {/* Order Notes */}
              <div className="space-y-2">
                <Label htmlFor="orderNotes">توضیحات سفارش</Label>
                <Textarea
                  id="orderNotes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="شما می توانید هر توضیحی که در مورد سفارش خود دارید را در این قسمت وارد کنید."
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Terms Acceptance */}
              <div className="flex items-center justify-center gap-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="cursor-pointer">
                  شرایط سرویس را خواندم و موافقم.
                </Label>
              </div>

              {/* Captcha */}
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">لطفاً حروف زیر را وارد نمایید</p>
                
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-mono text-xl tracking-widest px-6 py-3 rounded-lg select-none"
                      style={{ 
                        fontStyle: 'italic',
                        letterSpacing: '0.3em',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      {captchaCode}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="absolute -left-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <RefreshCw size={20} />
                    </button>
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="کد امنیتی"
                    className="text-center text-lg tracking-wider"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="px-12 py-6 text-lg rounded-xl flex items-center gap-2"
                  disabled={!acceptTerms || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin">●</span>
                      در حال پردازش...
                    </>
                  ) : (
                    <>
                      <ArrowRight size={20} />
                      تکمیل سفارش
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-bold">پرداخت امن</h3>
              <p className="text-muted-foreground text-sm mt-1">اتصال امن به درگاه بانکی</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <FileText className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-bold">فاکتور رسمی</h3>
              <p className="text-muted-foreground text-sm mt-1">صدور فاکتور معتبر</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Check className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-bold">تحویل فوری</h3>
              <p className="text-muted-foreground text-sm mt-1">فعال‌سازی آنی سرویس</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

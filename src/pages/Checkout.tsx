import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, ArrowRight, RefreshCw, Check, FileText, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toPersianDigits } from '@/lib/numberUtils';

const Checkout = () => {
  const [orderNotes, setOrderNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode] = useState('7J2RNC');
  const navigate = useNavigate();

  // Mock order data
  const orderTotal = 119900;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('لطفا شرایط سرویس را بپذیرید');
      return;
    }
    if (captchaInput.toUpperCase() !== captchaCode) {
      alert('کد امنیتی اشتباه است');
      return;
    }
    // Process payment
    console.log('Processing payment...');
    navigate('/user-panel');
  };

  const refreshCaptcha = () => {
    // In real app, generate new captcha
    console.log('Refreshing captcha...');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-primary">خانه</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-primary">سبد خرید</Link>
            <span>/</span>
            <span className="text-primary">پرداخت نهایی</span>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 text-center">پرداخت نهایی</h1>
                <p className="text-gray-600 text-center mt-2">
                  لطفا اطلاعات شخصی و مالی خود را جهت اتمام مراحل خرید، وارد نمایید
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Payment Details */}
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-4">جزئیات پرداخت</h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">قابل پرداخت :</span>
                      <span className="text-2xl font-bold text-gray-800">
                        {toPersianDigits(orderTotal.toLocaleString())} تومان
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-4">توضیحات سفارش</h2>
                  <Textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="شما می توانید هر توضیحی که در مورد سفارش خود دارید را در این قسمت وارد کنید."
                    className="min-h-[120px] border-primary/30 focus:border-primary resize-none"
                  />
                </div>

                {/* Terms Acceptance */}
                <div className="flex items-center justify-center gap-3">
                  <Label htmlFor="terms" className="text-gray-700 cursor-pointer">
                    شرایط سرویس را خواندم و موافقم.
                  </Label>
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* Captcha */}
                <div className="space-y-4">
                  <p className="text-center text-gray-700">لطفاً حروف زیر را وارد نمایید</p>
                  
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
                        className="absolute -left-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    className="px-12 py-6 text-lg bg-primary hover:bg-primary/90 rounded-xl flex items-center gap-2"
                    disabled={!acceptTerms}
                  >
                    <ArrowRight size={20} />
                    تکمیل سفارش
                  </Button>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-bold text-gray-800">پرداخت امن</h3>
                <p className="text-gray-600 text-sm mt-1">اتصال امن به درگاه بانکی</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <FileText className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800">فاکتور رسمی</h3>
                <p className="text-gray-600 text-sm mt-1">صدور فاکتور معتبر</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <Check className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800">تحویل فوری</h3>
                <p className="text-gray-600 text-sm mt-1">فعال‌سازی آنی سرویس</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, CreditCard, Server, Globe, Plus, Minus, HardDrive } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toPersianDigits } from '@/lib/numberUtils';

type CartItem = {
  id: number;
  name: string;
  type: 'domain' | 'vps' | 'hosting';
  price: number;
  period: string;
  quantity: number;
  icon: React.ReactNode;
};

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'سرور مجازی استاندارد',
      type: 'vps',
      price: 399000,
      period: 'ماهانه',
      quantity: 1,
      icon: <Server size={20} />
    },
    {
      id: 2,
      name: 'example.com',
      type: 'domain',
      price: 390000,
      period: 'سالانه',
      quantity: 1,
      icon: <Globe size={20} />
    },
    {
      id: 3,
      name: 'هاست پایه',
      type: 'hosting',
      price: 150000,
      period: 'ماهانه',
      quantity: 1,
      icon: <HardDrive size={20} />
    }
  ]);
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };
  
  const applyDiscount = () => {
    if (discountCode.toLowerCase() === 'novinvds') {
      const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
      setDiscountAmount(subtotal * 0.1);
      setDiscountApplied(true);
    } else {
      setDiscountAmount(0);
      setDiscountApplied(false);
      alert('کد تخفیف نامعتبر است');
    }
  };
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.09);
  const total = subtotal + tax - discountAmount;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold flex items-center">
                    <ShoppingCart size={24} className="ml-2" />
                    سبد خرید شما
                  </h2>
                </div>
                
                {items.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingCart size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">سبد خرید شما خالی است</h3>
                    <p className="text-gray-600 mb-8">
                      هیچ محصولی در سبد خرید شما وجود ندارد.
                    </p>
                    <Link to="/">
                      <Button className="bg-primary hover:bg-primary/90">
                        <ArrowRight size={18} className="ml-2" />
                        مشاهده محصولات
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    {items.map((item) => (
                      <div key={item.id} className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            item.type === 'vps' ? 'bg-blue-100 text-blue-600' : 
                            item.type === 'domain' ? 'bg-green-100 text-green-600' : 
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            <p className="text-gray-500 text-sm">{item.period}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-bold">{toPersianDigits(item.quantity.toString())}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <span className="font-bold text-lg min-w-[120px] text-left">
                            {toPersianDigits((item.price * item.quantity).toLocaleString())} تومان
                          </span>
                          
                          <button 
                            className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-6">
                      <Link to="/" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                        <ArrowRight size={18} />
                        ادامه خرید
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Discount Code */}
              {items.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 mb-4">کد تخفیف</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input 
                        type="text" 
                        placeholder="کد تخفیف خود را وارد کنید"
                        className="flex-1"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <Button 
                        onClick={applyDiscount}
                        disabled={!discountCode}
                        className="bg-primary hover:bg-primary/90"
                      >
                        اعمال کد
                      </Button>
                    </div>
                    {discountApplied && (
                      <div className="flex items-center gap-2 mt-3 p-3 bg-green-50 rounded-lg">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-green-700 font-medium">
                          کد تخفیف با موفقیت اعمال شد! ({toPersianDigits('10')}٪ تخفیف)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            {items.length > 0 && (
              <div className="md:w-1/3">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-28">
                  <div className="bg-gradient-to-r from-primary to-indigo-600 p-6">
                    <h2 className="text-xl font-bold text-white">خلاصه سفارش</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">تعداد آیتم‌ها:</span>
                        <span className="font-medium">{toPersianDigits(items.reduce((sum, item) => sum + item.quantity, 0).toString())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">جمع سبد خرید:</span>
                        <span className="font-medium">{toPersianDigits(subtotal.toLocaleString())} تومان</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">مالیات (۹٪):</span>
                        <span className="font-medium">{toPersianDigits(tax.toLocaleString())} تومان</span>
                      </div>
                      {discountApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>تخفیف:</span>
                          <span className="font-medium">- {toPersianDigits(discountAmount.toLocaleString())} تومان</span>
                        </div>
                      )}
                      <div className="border-t border-dashed pt-4 flex justify-between font-bold text-lg">
                        <span>مبلغ قابل پرداخت:</span>
                        <span className="text-primary">{toPersianDigits(total.toLocaleString())} تومان</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => navigate('/checkout')}
                      className="w-full py-6 text-lg bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700"
                    >
                      <CreditCard size={20} className="ml-2" />
                      ادامه و پرداخت
                    </Button>
                    
                    <div className="mt-4">
                      <p className="text-gray-500 text-sm text-center">
                        با تکمیل خرید، شما <Link to="/terms" className="text-primary hover:underline">قوانین و مقررات</Link> ما را می‌پذیرید.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, CreditCard, Server, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type CartItem = {
  id: number;
  name: string;
  type: 'domain' | 'vps' | 'hosting';
  price: number;
  period: string;
  icon: React.ReactNode;
};

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'سرور مجازی استاندارد',
      type: 'vps',
      price: 399000,
      period: 'ماهانه',
      icon: <Server size={20} />
    },
    {
      id: 2,
      name: 'example.com',
      type: 'domain',
      price: 390000,
      period: 'سالانه',
      icon: <Globe size={20} />
    }
  ]);
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const applyDiscount = () => {
    if (discountCode.toLowerCase() === 'novinvds') {
      const subtotal = items.reduce((total, item) => total + item.price, 0);
      setDiscountAmount(subtotal * 0.1); // 10% discount
      setDiscountApplied(true);
    } else {
      setDiscountAmount(0);
      setDiscountApplied(false);
      alert('کد تخفیف نامعتبر است');
    }
  };
  
  const subtotal = items.reduce((total, item) => total + item.price, 0);
  const tax = Math.round(subtotal * 0.09); // 9% tax
  const total = subtotal + tax - discountAmount;

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">سبد خرید شما خالی است</h3>
                    <p className="text-gray-600 mb-6">
                      هیچ محصولی در سبد خرید شما وجود ندارد.
                    </p>
                    <Link 
                      to="/" 
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center hover:bg-blue-700 transition-colors"
                    >
                      <ArrowRight size={18} className="ml-2" />
                      مشاهده محصولات
                    </Link>
                  </div>
                ) : (
                  <div>
                    {items.map((item) => (
                      <div key={item.id} className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            item.type === 'vps' ? 'bg-blue-100 text-blue-600' : 
                            item.type === 'domain' ? 'bg-green-100 text-green-600' : 
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-gray-600 text-sm">{item.period}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold ml-4">{item.price.toLocaleString()} تومان</span>
                          <button 
                            className="text-red-500 hover:text-red-700 transition-colors"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-6">
                      <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                        <ArrowRight size={18} className="ml-2" />
                        ادامه خرید
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Discount Code */}
              {items.length > 0 && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-bold mb-4">کد تخفیف</h3>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="text" 
                        placeholder="کد تخفیف خود را وارد کنید"
                        className="px-4 py-2 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <button 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={applyDiscount}
                        disabled={!discountCode}
                      >
                        اعمال
                      </button>
                    </div>
                    {discountApplied && (
                      <p className="text-green-600 mt-2">
                        کد تخفیف با موفقیت اعمال شد!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            {items.length > 0 && (
              <div className="md:w-1/3">
                <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-28">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">خلاصه سفارش</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">جمع سبد خرید:</span>
                        <span>{subtotal.toLocaleString()} تومان</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">مالیات (9%):</span>
                        <span>{tax.toLocaleString()} تومان</span>
                      </div>
                      {discountApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>تخفیف:</span>
                          <span>- {discountAmount.toLocaleString()} تومان</span>
                        </div>
                      )}
                      <div className="border-t pt-3 flex justify-between font-bold text-lg">
                        <span>مبلغ قابل پرداخت:</span>
                        <span>{total.toLocaleString()} تومان</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                      <CreditCard size={20} className="ml-2" />
                      پرداخت
                    </button>
                    
                    <div className="mt-4">
                      <p className="text-gray-600 text-sm text-center">
                        با تکمیل خرید، شما <Link to="/terms" className="text-blue-600 hover:underline">قوانین و مقررات</Link> ما را می‌پذیرید.
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


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, User, ArrowRight, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'email') {
      console.log({ email, password, rememberMe });
    } else if (loginMethod === 'phone') {
      if (showOtp) {
        console.log({ phoneNumber, verificationCode, rememberMe });
      } else {
        // In a real app, this would trigger sending OTP to the phone
        setShowOtp(true);
        return; // Don't navigate yet
      }
    }
    navigate('/user-panel');
  };

  const handleRequestOtp = () => {
    // In a real app, this would trigger sending OTP to the phone
    console.log('Sending OTP to', phoneNumber);
    setShowOtp(true);
  };

  const resetOtp = () => {
    setVerificationCode('');
    setShowOtp(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl animate-slide-up">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">ورود به حساب کاربری</h2>
                <p className="text-gray-600 mt-2">
                  به پنل کاربری NovinVDS خوش آمدید
                </p>
              </div>
              
              <Tabs defaultValue="email" className="w-full" onValueChange={setLoginMethod}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email" className="text-sm">ورود با ایمیل</TabsTrigger>
                  <TabsTrigger value="phone" className="text-sm">ورود با شماره موبایل</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        ایمیل
                      </Label>
                      <div className="relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Mail size={18} />
                        </div>
                        <Input 
                          type="email" 
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="ایمیل خود را وارد کنید"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="password" className="block text-gray-700 font-medium">
                          رمز عبور
                        </Label>
                        <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">
                          فراموشی رمز عبور؟
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Lock size={18} />
                        </div>
                        <Input 
                          type="password" 
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="رمز عبور خود را وارد کنید"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="mr-2 text-gray-700">
                        مرا به خاطر بسپار
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      ورود <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        شماره موبایل
                      </Label>
                      <div className="relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Phone size={18} />
                        </div>
                        <Input 
                          type="tel" 
                          id="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="شماره موبایل خود را وارد کنید"
                          required
                          disabled={showOtp}
                        />
                      </div>
                    </div>
                    
                    {showOtp ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="otp" className="block text-gray-700 font-medium">
                            کد تایید
                          </Label>
                          <button 
                            type="button" 
                            onClick={resetOtp}
                            className="text-blue-600 text-sm hover:underline flex items-center"
                          >
                            <X size={14} className="mr-1" /> تغییر شماره
                          </button>
                        </div>
                        <div className="flex justify-center py-2">
                          <InputOTP
                            maxLength={5}
                            value={verificationCode}
                            onChange={(value) => setVerificationCode(value)}
                            render={({ slots }) => (
                              <InputOTPGroup className="gap-2">
                                {slots.map((slot, index) => (
                                  <InputOTPSlot key={index} {...slot} index={index} className="w-10 h-12" />
                                ))}
                              </InputOTPGroup>
                            )}
                          />
                        </div>
                        <div className="text-center text-sm text-gray-500">
                          کد تایید به شماره {phoneNumber} ارسال شد
                        </div>
                      </div>
                    ) : (
                      <Button 
                        type="button" 
                        onClick={handleRequestOtp}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        دریافت کد تایید
                      </Button>
                    )}
                    
                    {showOtp && (
                      <>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="remember-phone"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label htmlFor="remember-phone" className="mr-2 text-gray-700">
                            مرا به خاطر بسپار
                          </label>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          ورود <ArrowRight className="mr-2 h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </form>
                </TabsContent>
              </Tabs>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  حساب کاربری ندارید؟{' '}
                  <Link to="/register" className="text-blue-600 hover:underline">
                    ثبت نام کنید
                  </Link>
                </p>
              </div>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">یا ورود با</span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full flex justify-center items-center gap-2 py-2.5 transition-transform hover:scale-105 duration-200">
                    <img src="https://placehold.co/20x20/333333/FFFFFF/png?text=G" alt="Google" className="w-5 h-5" />
                    گوگل
                  </Button>
                  <Button variant="outline" className="w-full flex justify-center items-center gap-2 py-2.5 transition-transform hover:scale-105 duration-200">
                    <img src="https://placehold.co/20x20/3b5998/FFFFFF/png?text=F" alt="Facebook" className="w-5 h-5" />
                    فیسبوک
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              با ورود به حساب کاربری، شما <Link to="/terms" className="text-blue-600 hover:underline">قوانین و مقررات</Link> سایت را می‌پذیرید.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;

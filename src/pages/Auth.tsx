import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, User, Eye, EyeOff, Shield, Server, Zap, Headphones, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Register state
  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    navigate('/user-panel');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ fullName, registerEmail, mobile, registerPassword, confirmPassword, acceptTerms });
    navigate('/user-panel');
  };

  const features = [
    { icon: Server, title: 'سرورهای قدرتمند', desc: 'سرورهای با کیفیت بالا', color: 'text-blue-400' },
    { icon: Shield, title: 'امنیت پیشرفته', desc: 'محافظت ۲۴/۷', color: 'text-green-400' },
    { icon: Zap, title: 'سرعت بالا', desc: 'دیسک‌های SSD NVMe', color: 'text-yellow-400' },
    { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در کنار شما', color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden" dir="rtl">
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Back to home link */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2 z-20 transition-colors"
      >
        بازگشت به صفحه اصلی
        <ArrowLeft size={18} />
      </Link>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-12">
          
          {/* Right side - Form */}
          <div className="w-full lg:w-1/2 perspective-1000">
            <div 
              className={`relative w-full transition-transform duration-700 transform-style-preserve-3d ${
                !isLogin ? 'rotate-y-180' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Login Form - Front */}
              <div 
                className={`w-full backface-hidden ${!isLogin ? 'hidden' : ''}`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                  {/* Header gradient */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <User size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">ورود به حساب کاربری</h2>
                    <p className="text-white/80 mt-2">خوش آمدید! لطفا وارد شوید</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleLogin} className="p-8 space-y-6">
                    <div>
                      <Label className="text-gray-700 font-medium">ایمیل</Label>
                      <div className="relative mt-2">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pr-10 text-left"
                          placeholder="example@email.com"
                          dir="ltr"
                          required
                        />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-700 font-medium">رمز عبور</Label>
                        <Link to="/forgot-password" className="text-primary text-sm hover:underline">
                          فراموشی رمز؟
                        </Link>
                      </div>
                      <div className="relative mt-2">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10 pl-10"
                          placeholder="رمز عبور خود را وارد کنید"
                          required
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-gray-600 cursor-pointer">
                        مرا به خاطر بسپار
                      </Label>
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      ورود به حساب
                    </Button>

                    <p className="text-center text-gray-600">
                      حساب کاربری ندارید؟{' '}
                      <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className="text-primary font-medium hover:underline"
                      >
                        ثبت نام کنید
                      </button>
                    </p>
                  </form>
                </div>
              </div>

              {/* Register Form - Back */}
              <div 
                className={`w-full backface-hidden ${isLogin ? 'hidden' : ''}`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                  {/* Header gradient - Pink/Purple for register */}
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-center text-white relative">
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="absolute top-4 left-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      ✕
                    </button>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                      <User size={28} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold">ایجاد حساب کاربری</h2>
                    <p className="text-white/80 mt-1 text-sm">به خانواده NovinVDS بپیوندید</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleRegister} className="p-6 space-y-4">
                    <div>
                      <Label className="text-gray-700 font-medium text-sm">نام و نام خانوادگی</Label>
                      <div className="relative mt-1">
                        <Input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pr-10"
                          placeholder="نام کامل خود را وارد کنید"
                          required
                        />
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-700 font-medium text-sm">ایمیل</Label>
                        <div className="relative mt-1">
                          <Input
                            type="email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            className="pr-10 text-left"
                            placeholder="ایمیل"
                            dir="ltr"
                            required
                          />
                          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-700 font-medium text-sm">موبایل</Label>
                        <div className="relative mt-1">
                          <Input
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="pr-10 text-left"
                            placeholder="موبایل"
                            dir="ltr"
                            required
                          />
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-700 font-medium text-sm">رمز عبور</Label>
                        <div className="relative mt-1">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className="pr-10 pl-10"
                            placeholder="رمز عبور"
                            required
                          />
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-700 font-medium text-sm">تکرار رمز</Label>
                        <div className="relative mt-1">
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pr-10 pl-10"
                            placeholder="تکرار رمز"
                            required
                          />
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-gray-600 text-sm cursor-pointer">
                        <Link to="/terms" className="text-primary hover:underline">قوانین و مقررات</Link> را می‌پذیرم
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      disabled={!acceptTerms}
                    >
                      ایجاد حساب کاربری
                    </Button>

                    <p className="text-center text-gray-600 text-sm">
                      قبلا ثبت نام کرده‌اید؟{' '}
                      <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className="text-primary font-medium hover:underline"
                      >
                        وارد شوید
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Left side - Features */}
          <div className="w-full lg:w-1/2 text-center lg:text-right">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              به <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">NovinVDS</span> خوش آمدید
            </h1>
            <p className="text-white/70 mb-8 text-lg">
              با ما، کسب و کار آنلاین شما با بهترین زیرساخت‌های هاستینگ و سرور پشتیبانی می‌شود
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-colors"
                >
                  <feature.icon className={`w-10 h-10 mx-auto mb-3 ${feature.color}`} />
                  <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

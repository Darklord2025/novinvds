
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demonstration purposes, we'll just redirect to the user panel
    console.log({ email, password, rememberMe });
    navigate('/user-panel');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">ورود به حساب کاربری</h2>
                <p className="text-gray-600 mt-2">
                  به پنل کاربری NovinVDS خوش آمدید
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    ایمیل
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail size={20} />
                    </div>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ایمیل خود را وارد کنید"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="block text-gray-700 font-medium">
                      رمز عبور
                    </label>
                    <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">
                      فراموشی رمز عبور؟
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock size={20} />
                    </div>
                    <input 
                      type="password" 
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  ورود
                </button>
                
                <div className="text-center">
                  <p className="text-gray-600">
                    حساب کاربری ندارید؟{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                      ثبت نام کنید
                    </Link>
                  </p>
                </div>
              </form>
              
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
                  <button className="w-full flex justify-center items-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <img src="https://placehold.co/20x20/333333/FFFFFF/png?text=G" alt="Google" className="w-5 h-5" />
                    گوگل
                  </button>
                  <button className="w-full flex justify-center items-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <img src="https://placehold.co/20x20/3b5998/FFFFFF/png?text=F" alt="Facebook" className="w-5 h-5" />
                    فیسبوک
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;

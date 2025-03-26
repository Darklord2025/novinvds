
import React, { useEffect } from 'react';
import { Award, Users, Briefcase, Target, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: 'مهدی محمدی',
      position: 'مدیر عامل',
      image: 'https://placehold.co/300x300/4f46e5/FFFFFF/png?text=CEO&font=Montserrat',
    },
    {
      name: 'علی رضایی',
      position: 'مدیر فنی',
      image: 'https://placehold.co/300x300/3b82f6/FFFFFF/png?text=CTO&font=Montserrat',
    },
    {
      name: 'سارا حسینی',
      position: 'مدیر پشتیبانی',
      image: 'https://placehold.co/300x300/6366f1/FFFFFF/png?text=CSO&font=Montserrat',
    },
    {
      name: 'رضا کریمی',
      position: 'مدیر فروش',
      image: 'https://placehold.co/300x300/8b5cf6/FFFFFF/png?text=CMO&font=Montserrat',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">درباره NovinVDS</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              ارائه دهنده خدمات هاستینگ، سرور مجازی و اختصاصی با بالاترین کیفیت و پشتیبانی حرفه‌ای
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pl-8 mb-8 md:mb-0">
              <img 
                src="https://placehold.co/600x400/3b82f6/FFFFFF/png?text=About+Us&font=Montserrat" 
                alt="درباره ما" 
                className="rounded-xl shadow-lg w-full" 
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">داستان ما</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                شرکت NovinVDS در سال 1390 با هدف ارائه خدمات هاستینگ و سرور با کیفیت بالا به مشتریان ایرانی تأسیس شد. 
                ما با تمرکز بر نوآوری، کیفیت و رضایت مشتری، به یکی از پیشروان صنعت هاستینگ در ایران تبدیل شده‌ایم.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                در طول بیش از یک دهه فعالیت، همواره تلاش کرده‌ایم تا جدیدترین فناوری‌ها و بهترین زیرساخت‌ها را برای مشتریان خود فراهم کنیم. 
                تیم متخصص ما متشکل از کارشناسان مجرب در حوزه‌های مختلف IT، شبکه و امنیت است که با تلاش شبانه‌روزی به مشتریان خدمات‌رسانی می‌کنند.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">+10</h4>
                    <p className="text-gray-600 text-sm">سال تجربه</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">+5,000</h4>
                    <p className="text-gray-600 text-sm">مشتری فعال</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">+10,000</h4>
                    <p className="text-gray-600 text-sm">پروژه موفق</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">99.9%</h4>
                    <p className="text-gray-600 text-sm">رضایت مشتری</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">مأموریت و ارزش‌های ما</h2>
              <p className="text-gray-600">
                ما با تمرکز بر اصول و ارزش‌های زیر به مشتریان خود خدمات ارائه می‌دهیم
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">کیفیت بی‌نظیر</h3>
                <p className="text-gray-600 leading-relaxed">
                  ما به ارائه خدمات با بالاترین کیفیت متعهد هستیم. از بهترین سخت‌افزارها و زیرساخت‌ها استفاده می‌کنیم تا مشتریان ما بهترین عملکرد را تجربه کنند.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">پشتیبانی 24/7</h3>
                <p className="text-gray-600 leading-relaxed">
                  تیم پشتیبانی ما در تمام ساعات شبانه‌روز و در تمام روزهای هفته آماده پاسخگویی و کمک به مشتریان است. ما اعتقاد داریم پشتیبانی سریع و کارآمد کلید رضایت مشتری است.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">نوآوری مداوم</h3>
                <p className="text-gray-600 leading-relaxed">
                  ما همواره به دنبال نوآوری و به‌روزرسانی خدمات خود هستیم. با پیگیری آخرین فناوری‌ها و روندهای صنعت، خدمات خود را مرتباً بهبود می‌بخشیم.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">قیمت مناسب</h3>
                <p className="text-gray-600 leading-relaxed">
                  ما تلاش می‌کنیم خدمات با کیفیت خود را با قیمت‌های مقرون به صرفه ارائه دهیم تا همه بتوانند از مزایای هاستینگ و سرورهای حرفه‌ای بهره‌مند شوند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">تیم ما</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              تیم متخصص و با تجربه ما متشکل از کارشناسان حرفه‌ای در حوزه‌های مختلف IT، شبکه و پشتیبانی است
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                  <div className="mt-3 flex justify-center space-x-3 rtl:space-x-reverse">
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">به دنبال همکاری با ما هستید؟</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            ما همیشه به دنبال افراد با استعداد و متخصص برای پیوستن به تیم خود هستیم. اگر علاقه‌مند به همکاری با ما هستید، رزومه خود را ارسال کنید.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            ارسال رزومه
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;

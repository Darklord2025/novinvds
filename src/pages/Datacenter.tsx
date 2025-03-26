
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DatacenterComparison from '../components/DatacenterComparison';
import { Globe, Shield, Server, Cpu, Gauge } from 'lucide-react';

const Datacenter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">دیتاسنترهای ما</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              دیتاسنترهای پیشرفته با بهترین زیرساخت‌ها در نقاط مختلف جهان
            </p>
          </div>
          
          <DatacenterComparison />
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">مقایسه عملکرد دیتاسنترها</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              آشنایی با عملکرد و ویژگی‌های منحصر به‌فرد هر دیتاسنتر
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-right font-medium text-gray-600">دیتاسنتر</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">آپتایم</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">پهنای باند</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">تاخیر (Ping)</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">فایروال</th>
                  <th className="py-4 px-6 text-center font-medium text-gray-600">حفاظت DDoS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">آلمان (Hetzner)</td>
                  <td className="py-4 px-6 text-center">99.99%</td>
                  <td className="py-4 px-6 text-center">1 گیگابیت</td>
                  <td className="py-4 px-6 text-center">120ms</td>
                  <td className="py-4 px-6 text-center text-green-500"><Globe className="inline" size={18} /></td>
                  <td className="py-4 px-6 text-center text-green-500"><Shield className="inline" size={18} /></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">هلند (LeaseWeb)</td>
                  <td className="py-4 px-6 text-center">99.98%</td>
                  <td className="py-4 px-6 text-center">10 گیگابیت</td>
                  <td className="py-4 px-6 text-center">130ms</td>
                  <td className="py-4 px-6 text-center text-green-500"><Server className="inline" size={18} /></td>
                  <td className="py-4 px-6 text-center text-green-500"><Shield className="inline" size={18} /></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">آمریکا (Vultr)</td>
                  <td className="py-4 px-6 text-center">99.95%</td>
                  <td className="py-4 px-6 text-center">5 گیگابیت</td>
                  <td className="py-4 px-6 text-center">240ms</td>
                  <td className="py-4 px-6 text-center text-green-500"><Cpu className="inline" size={18} /></td>
                  <td className="py-4 px-6 text-center text-red-500">×</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">فرانسه (OVH)</td>
                  <td className="py-4 px-6 text-center">99.97%</td>
                  <td className="py-4 px-6 text-center">1 گیگابیت</td>
                  <td className="py-4 px-6 text-center">140ms</td>
                  <td className="py-4 px-6 text-center text-green-500"><Gauge className="inline" size={18} /></td>
                  <td className="py-4 px-6 text-center text-green-500"><Shield className="inline" size={18} /></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">انگلستان (Linode)</td>
                  <td className="py-4 px-6 text-center">99.98%</td>
                  <td className="py-4 px-6 text-center">10 گیگابیت</td>
                  <td className="py-4 px-6 text-center">150ms</td>
                  <td className="py-4 px-6 text-center text-green-500"><Server className="inline" size={18} /></td>
                  <td className="py-4 px-6 text-center text-red-500">×</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">زیرساخت ابری قدرتمند</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            از زیرساخت‌های ابری پیشرفته ما برای کسب و کار خود بهره‌مند شوید
            و سرویس‌های خود را با بالاترین کیفیت و پایداری ارائه دهید.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              سفارش سرور مجازی
            </button>
            <button className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              مشاوره رایگان
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Datacenter;

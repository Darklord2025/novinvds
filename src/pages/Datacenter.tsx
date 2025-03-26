
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DatacenterComparison from '../components/DatacenterComparison';
import { Globe, Shield, Server, Cpu, Gauge, MapPin, Check } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const datacenterLocations = [
  { id: 1, name: 'آلمان (Hetzner)', lat: 51.1657, lng: 10.4515, uptime: '99.99%', ping: '120ms', bandwidth: '1 گیگابیت' },
  { id: 2, name: 'هلند (LeaseWeb)', lat: 52.1326, lng: 5.2913, uptime: '99.98%', ping: '130ms', bandwidth: '10 گیگابیت' },
  { id: 3, name: 'آمریکا (Vultr)', lat: 37.0902, lng: -95.7129, uptime: '99.95%', ping: '240ms', bandwidth: '5 گیگابیت' },
  { id: 4, name: 'فرانسه (OVH)', lat: 46.2276, lng: 2.2137, uptime: '99.97%', ping: '140ms', bandwidth: '1 گیگابیت' },
  { id: 5, name: 'انگلستان (Linode)', lat: 55.3781, lng: -3.4360, uptime: '99.98%', ping: '150ms', bandwidth: '10 گیگابیت' },
];

const datacenterFeatures = [
  {
    title: "پشتیبانی ۲۴/۷",
    description: "پشتیبانی تخصصی به صورت شبانه‌روزی در تمام روزهای هفته",
    icon: <Globe size={24} />,
    gradient: true
  },
  {
    title: "آپتایم ۹۹.۹٪",
    description: "تضمین دسترسی بالا با کمترین زمان قطعی سرویس",
    icon: <Shield size={24} />,
    gradient: true
  },
  {
    title: "سخت‌افزار پیشرفته",
    description: "سرورهای قدرتمند با پردازنده‌های نسل جدید و حافظه NVMe",
    icon: <Server size={24} />,
    gradient: true
  },
  {
    title: "پهنای باند نامحدود",
    description: "بدون محدودیت ترافیک با سرعت اتصال فوق‌العاده",
    icon: <Cpu size={24} />,
    gradient: true
  },
];

const Datacenter = () => {
  const [activeDatacenter, setActiveDatacenter] = useState(1);
  
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
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="w-full h-[400px] bg-gray-200 rounded-lg relative">
                {datacenterLocations.map((dc) => (
                  <button
                    key={dc.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                      ${activeDatacenter === dc.id 
                        ? 'text-white bg-blue-600' 
                        : 'text-blue-600 bg-white border border-blue-200 hover:bg-blue-50'} 
                      rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300`}
                    style={{ 
                      left: `${(dc.lng + 180) * (100 / 360)}%`, 
                      top: `${(90 - dc.lat) * (100 / 180)}%` 
                    }}
                    onClick={() => setActiveDatacenter(dc.id)}
                  >
                    <MapPin size={activeDatacenter === dc.id ? 16 : 14} />
                  </button>
                ))}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  {datacenterLocations.find(dc => dc.id === activeDatacenter) && (
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {datacenterLocations.find(dc => dc.id === activeDatacenter)?.name}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <Shield size={16} className="text-blue-600 ml-2" />
                          <span className="text-sm">آپتایم: {datacenterLocations.find(dc => dc.id === activeDatacenter)?.uptime}</span>
                        </div>
                        <div className="flex items-center">
                          <Gauge size={16} className="text-blue-600 ml-2" />
                          <span className="text-sm">پینگ: {datacenterLocations.find(dc => dc.id === activeDatacenter)?.ping}</span>
                        </div>
                        <div className="flex items-center">
                          <Server size={16} className="text-blue-600 ml-2" />
                          <span className="text-sm">پهنای باند: {datacenterLocations.find(dc => dc.id === activeDatacenter)?.bandwidth}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {datacenterFeatures.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  gradient={feature.gradient}
                  hoverEffect="glow"
                />
              ))}
            </div>
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

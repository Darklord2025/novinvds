
import React from 'react';
import { Check, X, Globe, Server, Wifi, Cloud, Gauge, LucideIcon } from 'lucide-react';
import FeatureCard from './FeatureCard';

type Datacenter = {
  id: string;
  name: string;
  location: string;
  country: string;
  uptime: string;
  bandwidth: string;
  latency: string;
  icon: React.ReactNode;
  features: {
    name: string;
    available: boolean;
  }[];
};

const datacenters: Datacenter[] = [
  {
    id: 'germany',
    name: 'آلمان Hetzner',
    location: 'فرانکفورت، آلمان',
    country: 'آلمان',
    uptime: '99.99%',
    bandwidth: '1 گیگابیت',
    latency: '120ms',
    icon: <Globe className="h-10 w-10" />,
    features: [
      { name: 'پشتیبانی از IPv6', available: true },
      { name: 'فایروال پیشرفته', available: true },
      { name: 'حفاظت DDoS', available: true },
      { name: 'بکاپ خودکار', available: true },
      { name: 'پهنای باند نامحدود', available: true },
    ]
  },
  {
    id: 'netherlands',
    name: 'هلند LeaseWeb',
    location: 'آمستردام، هلند',
    country: 'هلند',
    uptime: '99.98%',
    bandwidth: '10 گیگابیت',
    latency: '130ms',
    icon: <Server className="h-10 w-10" />,
    features: [
      { name: 'پشتیبانی از IPv6', available: true },
      { name: 'فایروال پیشرفته', available: true },
      { name: 'حفاظت DDoS', available: true },
      { name: 'بکاپ خودکار', available: true },
      { name: 'پهنای باند نامحدود', available: false },
    ]
  },
  {
    id: 'usa',
    name: 'آمریکا Vultr',
    location: 'نیویورک، آمریکا',
    country: 'آمریکا',
    uptime: '99.95%',
    bandwidth: '5 گیگابیت',
    latency: '240ms',
    icon: <Wifi className="h-10 w-10" />,
    features: [
      { name: 'پشتیبانی از IPv6', available: true },
      { name: 'فایروال پیشرفته', available: true },
      { name: 'حفاظت DDoS', available: false },
      { name: 'بکاپ خودکار', available: true },
      { name: 'پهنای باند نامحدود', available: false },
    ]
  },
  {
    id: 'france',
    name: 'فرانسه OVH',
    location: 'پاریس، فرانسه',
    country: 'فرانسه',
    uptime: '99.97%',
    bandwidth: '1 گیگابیت',
    latency: '140ms',
    icon: <Cloud className="h-10 w-10" />,
    features: [
      { name: 'پشتیبانی از IPv6', available: true },
      { name: 'فایروال پیشرفته', available: true },
      { name: 'حفاظت DDoS', available: true },
      { name: 'بکاپ خودکار', available: false },
      { name: 'پهنای باند نامحدود', available: false },
    ]
  },
  {
    id: 'uk',
    name: 'انگلستان Linode',
    location: 'لندن، انگلستان',
    country: 'انگلستان',
    uptime: '99.98%',
    bandwidth: '10 گیگابیت',
    latency: '150ms',
    icon: <Gauge className="h-10 w-10" />,
    features: [
      { name: 'پشتیبانی از IPv6', available: true },
      { name: 'فایروال پیشرفته', available: true },
      { name: 'حفاظت DDoS', available: false },
      { name: 'بکاپ خودکار', available: true },
      { name: 'پهنای باند نامحدود', available: true },
    ]
  },
];

const DatacenterComparison: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datacenters.map((dc) => (
          <div key={dc.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold">{dc.name}</h3>
              {dc.icon}
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                <span className="font-medium">موقعیت:</span> {dc.location}
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">آپتایم</p>
                  <p className="font-bold text-blue-600">{dc.uptime}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">پهنای باند</p>
                  <p className="font-bold text-blue-600">{dc.bandwidth}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">تاخیر</p>
                  <p className="font-bold text-blue-600">{dc.latency}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium mb-2">ویژگی‌ها:</h4>
                {dc.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    {feature.available ? (
                      <Check className="text-green-500 ml-2 flex-shrink-0" size={18} />
                    ) : (
                      <X className="text-red-500 ml-2 flex-shrink-0" size={18} />
                    )}
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  انتخاب این دیتاسنتر
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">ویژگی‌های دیتاسنترهای ما</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="زیرساخت پیشرفته"
            description="تمام دیتاسنترهای ما از جدیدترین تجهیزات و فناوری‌های روز دنیا بهره می‌برند"
            icon={<Server size={24} />}
            gradient={true}
          />
          
          <FeatureCard
            title="امنیت بالا"
            description="سیستم‌های امنیتی پیشرفته برای محافظت از داده‌ها و سرویس‌های شما"
            icon={<Shield size={24} />}
            gradient={true}
          />
          
          <FeatureCard
            title="پشتیبانی 24/7"
            description="پشتیبانی فنی 24 ساعته و 7 روز هفته برای رفع مشکلات احتمالی"
            icon={<Headset size={24} />}
            gradient={true}
          />
        </div>
      </div>
    </div>
  );
};

const Shield: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
};

const Headset: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 11h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H3"></path>
      <path d="M19 11h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"></path>
      <path d="M3 15v-3a8 8 0 0 1 16 0v3"></path>
      <line x1="10" y1="22" x2="14" y2="22"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
    </svg>
  );
};

export default DatacenterComparison;

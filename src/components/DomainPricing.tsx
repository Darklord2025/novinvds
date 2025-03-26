
import React from 'react';
import { Check, X } from 'lucide-react';

type DomainPriceProps = {
  extension: string;
  register: string;
  renew: string;
  transfer: string;
  features?: {
    whois: boolean;
    dns: boolean;
    email: boolean;
  };
};

const DomainPrice: React.FC<DomainPriceProps> = ({ 
  extension, 
  register, 
  renew, 
  transfer,
  features = { whois: true, dns: true, email: false }
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4 font-medium text-lg text-blue-600">{extension}</td>
      <td className="py-4 px-4">{register} تومان</td>
      <td className="py-4 px-4">{renew} تومان</td>
      <td className="py-4 px-4">{transfer} تومان</td>
      <td className="py-4 px-4 text-center">
        {features.whois ? <Check className="inline text-green-500" size={18} /> : <X className="inline text-red-500" size={18} />}
      </td>
      <td className="py-4 px-4 text-center">
        {features.dns ? <Check className="inline text-green-500" size={18} /> : <X className="inline text-red-500" size={18} />}
      </td>
      <td className="py-4 px-4 text-center">
        {features.email ? <Check className="inline text-green-500" size={18} /> : <X className="inline text-red-500" size={18} />}
      </td>
    </tr>
  );
};

const DomainPricing = () => {
  const domains = [
    { extension: '.com', register: '390,000', renew: '420,000', transfer: '390,000', features: { whois: true, dns: true, email: true } },
    { extension: '.net', register: '450,000', renew: '480,000', transfer: '450,000', features: { whois: true, dns: true, email: true } },
    { extension: '.org', register: '490,000', renew: '520,000', transfer: '490,000', features: { whois: true, dns: true, email: true } },
    { extension: '.ir', register: '120,000', renew: '120,000', transfer: '120,000', features: { whois: true, dns: true, email: false } },
    { extension: '.co.ir', register: '80,000', renew: '80,000', transfer: '80,000', features: { whois: true, dns: true, email: false } },
    { extension: '.info', register: '350,000', renew: '380,000', transfer: '350,000', features: { whois: true, dns: true, email: false } },
    { extension: '.io', register: '1,250,000', renew: '1,300,000', transfer: '1,250,000', features: { whois: true, dns: true, email: true } },
    { extension: '.dev', register: '590,000', renew: '620,000', transfer: '590,000', features: { whois: true, dns: true, email: false } },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="py-3 px-4 text-right">پسوند</th>
            <th className="py-3 px-4 text-right">ثبت</th>
            <th className="py-3 px-4 text-right">تمدید</th>
            <th className="py-3 px-4 text-right">انتقال</th>
            <th className="py-3 px-4 text-center">Whois محافظت</th>
            <th className="py-3 px-4 text-center">مدیریت DNS</th>
            <th className="py-3 px-4 text-center">ایمیل رایگان</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((domain) => (
            <DomainPrice 
              key={domain.extension}
              extension={domain.extension}
              register={domain.register}
              renew={domain.renew}
              transfer={domain.transfer}
              features={domain.features}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainPricing;

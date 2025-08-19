
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
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
          افزودن به سبد
        </button>
      </td>
    </tr>
  );
};

const DomainPricing = () => {
  const domains = [
    { extension: '.com', register: '390,000', renew: '420,000', transfer: '390,000', features: { whois: true, dns: true, email: false } },
    { extension: '.net', register: '450,000', renew: '480,000', transfer: '450,000', features: { whois: true, dns: true, email: false } },
    { extension: '.org', register: '490,000', renew: '520,000', transfer: '490,000', features: { whois: true, dns: true, email: false } },
    { extension: '.ir', register: '120,000', renew: '120,000', transfer: '120,000', features: { whois: true, dns: true, email: false } },
    { extension: '.co.ir', register: '80,000', renew: '80,000', transfer: '80,000', features: { whois: true, dns: true, email: false } },
    { extension: '.info', register: '350,000', renew: '380,000', transfer: '350,000', features: { whois: true, dns: true, email: false } },
    { extension: '.io', register: '1,250,000', renew: '1,300,000', transfer: '1,250,000', features: { whois: true, dns: true, email: false } },
    { extension: '.dev', register: '590,000', renew: '620,000', transfer: '590,000', features: { whois: true, dns: true, email: false } },
    { extension: '.app', register: '690,000', renew: '720,000', transfer: '690,000', features: { whois: true, dns: true, email: false } },
    { extension: '.blog', register: '780,000', renew: '810,000', transfer: '780,000', features: { whois: true, dns: true, email: false } },
    { extension: '.shop', register: '890,000', renew: '920,000', transfer: '890,000', features: { whois: true, dns: true, email: false } },
    { extension: '.store', register: '1,490,000', renew: '1,520,000', transfer: '1,490,000', features: { whois: true, dns: true, email: false } },
    { extension: '.tech', register: '1,190,000', renew: '1,220,000', transfer: '1,190,000', features: { whois: true, dns: true, email: false } },
    { extension: '.online', register: '990,000', renew: '1,020,000', transfer: '990,000', features: { whois: true, dns: true, email: false } },
    { extension: '.site', register: '790,000', renew: '820,000', transfer: '790,000', features: { whois: true, dns: true, email: false } },
    { extension: '.website', register: '690,000', renew: '720,000', transfer: '690,000', features: { whois: true, dns: true, email: false } },
    { extension: '.biz', register: '590,000', renew: '620,000', transfer: '590,000', features: { whois: true, dns: true, email: false } },
    { extension: '.co', register: '890,000', renew: '920,000', transfer: '890,000', features: { whois: true, dns: true, email: false } },
    { extension: '.me', register: '790,000', renew: '820,000', transfer: '790,000', features: { whois: true, dns: true, email: false } },
    { extension: '.tv', register: '990,000', renew: '1,020,000', transfer: '990,000', features: { whois: true, dns: true, email: false } },
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
            <th className="py-3 px-4 text-center">عملیات</th>
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

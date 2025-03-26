
import React from 'react';
import { Check, X, Info } from 'lucide-react';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type DatacenterProps = {
  name: string;
  location: string;
  ping: string;
  bandwidth: string;
  reliability: string;
  hasBackup: boolean;
  hasDDOS: boolean;
  price: string;
};

const Datacenter: React.FC<DatacenterProps> = ({
  name,
  location,
  ping,
  bandwidth,
  reliability,
  hasBackup,
  hasDDOS,
  price
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
        <h3 className="font-bold text-xl">{name}</h3>
        <p>{location}</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">پینگ میانگین:</span>
          <span className="font-medium">{ping}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">پهنای باند:</span>
          <span className="font-medium">{bandwidth}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">آپ‌تایم:</span>
          <span className="font-medium">{reliability}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">بکاپ اتوماتیک:</span>
          <span>{hasBackup ? <Check className="text-green-500" size={20} /> : <X className="text-red-500" size={20} />}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <div className="flex items-center">
            <span className="text-gray-600 ml-1">حفاظت DDOS:</span>
            <HoverCard>
              <HoverCardTrigger>
                <Info size={16} className="text-gray-400" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4 text-sm">
                محافظت در برابر حملات DDOS با ظرفیت مقابله با حملات تا 1Tbps
              </HoverCardContent>
            </HoverCard>
          </div>
          <span>{hasDDOS ? <Check className="text-green-500" size={20} /> : <X className="text-red-500" size={20} />}</span>
        </div>
        <div className="text-center pt-2">
          <p className="text-3xl font-bold text-blue-600">{price}</p>
          <p className="text-gray-500 text-sm mt-1">شروع قیمت / ماهانه</p>
        </div>
      </div>
    </div>
  );
};

const DatacenterComparison = () => {
  const datacenters = [
    {
      name: "ایران",
      location: "تهران",
      ping: "10ms-30ms",
      bandwidth: "1Gbps",
      reliability: "99.95%",
      hasBackup: true,
      hasDDOS: true,
      price: "199,000 تومان"
    },
    {
      name: "آلمان",
      location: "فرانکفورت",
      ping: "120ms-150ms",
      bandwidth: "1Gbps",
      reliability: "99.99%",
      hasBackup: true,
      hasDDOS: true,
      price: "299,000 تومان"
    },
    {
      name: "هلند",
      location: "آمستردام",
      ping: "130ms-160ms",
      bandwidth: "1Gbps",
      reliability: "99.99%",
      hasBackup: true,
      hasDDOS: true,
      price: "289,000 تومان"
    },
    {
      name: "ترکیه",
      location: "استانبول",
      ping: "70ms-90ms",
      bandwidth: "1Gbps",
      reliability: "99.9%",
      hasBackup: true,
      hasDDOS: false,
      price: "259,000 تومان"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {datacenters.map((dc) => (
        <Datacenter 
          key={dc.name}
          name={dc.name}
          location={dc.location}
          ping={dc.ping}
          bandwidth={dc.bandwidth}
          reliability={dc.reliability}
          hasBackup={dc.hasBackup}
          hasDDOS={dc.hasDDOS}
          price={dc.price}
        />
      ))}
    </div>
  );
};

export default DatacenterComparison;

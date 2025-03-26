
import React from 'react';
import { Check } from 'lucide-react';

type PricingFeature = {
  text: string;
  available: boolean;
};

type PricingCardProps = {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText?: string;
  onClick?: () => void;
};

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  popular = false,
  buttonText = "سفارش",
  onClick,
}) => {
  return (
    <div 
      className={`relative rounded-2xl transition-all duration-500 h-full
        ${popular 
          ? 'bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-200 shadow-xl scale-105 z-10' 
          : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
        }
      `}
    >
      {popular && (
        <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            پرطرفدار
          </span>
        </div>
      )}
      
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold text-center">{title}</h3>
        
        <div className="my-5 text-center">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-500 text-sm"> / {period}</span>
        </div>
        
        <p className="text-gray-600 text-center mb-6">{description}</p>
        
        <div className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center"
            >
              <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center
                ${feature.available 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
                }`}
              >
                {feature.available ? (
                  <Check size={14} />
                ) : (
                  <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
                )}
              </div>
              <span className={`ml-3 ${feature.available ? 'text-gray-700' : 'text-gray-400'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
        
        <button 
          onClick={onClick}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200
            ${popular 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }
          `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;

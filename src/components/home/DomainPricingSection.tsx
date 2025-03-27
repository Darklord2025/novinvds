
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DomainPricing from '../DomainPricing';

const DomainPricingSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">قیمت دامنه‌ها</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            قیمت برخی از پسوندهای محبوب دامنه ها
          </p>
        </div>
        
        <DomainPricing />
        
        <div className="text-center mt-12">
          <Link to="/domain" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            مشاهده همه پسوندها <ArrowRight size={16} className="mr-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DomainPricingSection;

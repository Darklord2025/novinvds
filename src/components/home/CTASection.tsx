
import React from 'react';
import { Link } from 'react-router-dom';

interface SupportEmail {
  sales: string;
  vps: string;
  dedicated: string;
  hosting: string;
  domain: string;
  network: string;
  support: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  supportEmails: SupportEmail;
}

interface CTASectionProps {
  contactInfo?: ContactInfo;
}

const CTASection: React.FC<CTASectionProps> = ({ contactInfo }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">آماده همکاری با ما هستید؟</h2>
        <p className="max-w-2xl mx-auto mb-8 opacity-90">
          با ما تماس بگیرید تا مشاوران ما به شما در انتخاب بهترین راهکار متناسب با نیازهای کسب و کار شما کمک کنند
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-opacity-95 transition-colors">
            تماس با ما
          </Link>
          <Link to="/services" className="px-8 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
            مشاهده خدمات
          </Link>
        </div>
        
        {contactInfo && (
          <div className="mt-8 text-white">
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <a href={`tel:${contactInfo.phone}`} className="flex items-center opacity-90 hover:opacity-100">
                <span>{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center opacity-90 hover:opacity-100">
                <span>{contactInfo.email}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CTASection;

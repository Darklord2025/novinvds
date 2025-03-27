
import React from 'react';

const DomainSearchSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">دامنه مورد نظر خود را جستجو کنید</h2>
            <p className="text-blue-100">
              بیش از 50 پسوند دامنه با قیمت‌های مناسب
            </p>
          </div>
          
          <form className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="دامنه مورد نظر خود را وارد کنید..." 
                className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                .com
              </div>
            </div>
            
            <button type="submit" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
              جستجو
            </button>
          </form>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.com</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.net</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.org</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.ir</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.co.ir</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">.io</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainSearchSection;

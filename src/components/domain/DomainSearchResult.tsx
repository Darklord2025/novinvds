
import React from 'react';
import { Check } from 'lucide-react';

interface DomainSearchResultProps {
  searchResult: {
    available: boolean;
    domain: string;
    price: string;
  } | null;
}

const DomainSearchResult: React.FC<DomainSearchResultProps> = ({ searchResult }) => {
  if (!searchResult) return null;
  
  return (
    <div className={`p-6 rounded-xl shadow-md mb-8 ${searchResult.available ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">{searchResult.domain}</h3>
          {searchResult.available ? (
            <p className="text-green-600 flex items-center">
              <Check size={18} className="ml-1" /> در دسترس است
            </p>
          ) : (
            <p className="text-red-600">قبلاً ثبت شده است</p>
          )}
        </div>
        {searchResult.available && (
          <div>
            <p className="text-lg font-bold text-blue-600">{searchResult.price} تومان</p>
            <button 
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              onClick={() => {
                // Check if user is logged in (simple check)
                const isLoggedIn = localStorage.getItem('user');
                if (isLoggedIn) {
                  // Redirect to user panel for checkout
                  window.location.href = '/user-panel';
                } else {
                  // Redirect to register page
                  window.location.href = '/register';
                }
              }}
            >
              افزودن به سبد خرید
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainSearchResult;

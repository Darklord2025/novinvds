
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
              className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium shadow-md hover:shadow-lg"
              onClick={() => {
                // Add to cart functionality
                const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
                const newItem = {
                  id: Date.now(),
                  type: 'domain',
                  name: searchResult.domain,
                  price: searchResult.price,
                  period: '1 سال'
                };
                cartItems.push(newItem);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Update cart count
                const cartEvent = new Event('cartUpdated');
                window.dispatchEvent(cartEvent);
                
                // Show success message
                alert(`دامنه ${searchResult.domain} به سبد خرید اضافه شد`);
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

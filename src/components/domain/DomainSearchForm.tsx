
import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';

interface DomainSearchFormProps {
  onSearch: (domain: string, extension: string) => void;
  isSearching: boolean;
}

const DomainSearchForm: React.FC<DomainSearchFormProps> = ({ onSearch, isSearching }) => {
  const [domain, setDomain] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('.com');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    onSearch(domain, selectedExtension);
  };

  const handleExtensionChange = (ext: string) => {
    setSelectedExtension(ext);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input 
              type="text" 
              placeholder="نام دامنه مورد نظر خود را وارد کنید..." 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {selectedExtension}
            </div>
          </div>
        </div>
        <button 
          type="submit" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          disabled={!domain || isSearching}
        >
          {isSearching ? (
            <RefreshCw size={20} className="animate-spin ml-2" />
          ) : (
            <Search size={20} className="ml-2" />
          )}
          جستجو
        </button>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <div 
          onClick={() => handleExtensionChange('.com')} 
          className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.com' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
        >
          .com
        </div>
        <div 
          onClick={() => handleExtensionChange('.net')} 
          className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.net' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
        >
          .net
        </div>
        <div 
          onClick={() => handleExtensionChange('.org')} 
          className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.org' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
        >
          .org
        </div>
        <div 
          onClick={() => handleExtensionChange('.ir')} 
          className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.ir' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
        >
          .ir
        </div>
        <div 
          onClick={() => handleExtensionChange('.co.ir')} 
          className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.co.ir' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
        >
          .co.ir
        </div>
        <div 
          onClick={() => handleExtensionChange('.io')} 
          className={`px-3 py-1 rounded-md cursor-pointer border ${selectedExtension === '.io' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
        >
          .io
        </div>
      </div>
    </div>
  );
};

export default DomainSearchForm;

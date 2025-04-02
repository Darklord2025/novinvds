
import React from 'react';

interface ServerListProps {
  serviceType: string;
}

const ServerList: React.FC<ServerListProps> = ({ serviceType }) => {
  // Your existing ServerList implementation that uses serviceType instead of type
  return (
    <div>
      {/* Render the appropriate content based on serviceType */}
      {serviceType === 'vps' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-medium">سرور آلمان ۱</h3>
              <div className="text-sm text-gray-500 mt-1">IP: 185.220.224.126</div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                فعال
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">مدیریت</button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-medium">سرور هلند ۱</h3>
              <div className="text-sm text-gray-500 mt-1">IP: 94.130.108.159</div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                فعال
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">مدیریت</button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-medium">سرور فرانسه ۱</h3>
              <div className="text-sm text-gray-500 mt-1">IP: 51.89.115.97</div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
                در حال راه‌اندازی
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">مدیریت</button>
            </div>
          </div>
        </div>
      )}
      
      {serviceType === 'domain' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-medium">example.com</h3>
              <div className="text-sm text-gray-500 mt-1">تاریخ انقضا: 1403/02/15</div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                فعال
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">مدیریت</button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-medium">example.net</h3>
              <div className="text-sm text-gray-500 mt-1">تاریخ انقضا: 1402/11/20</div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                نیاز به تمدید
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">مدیریت</button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-medium">example.org</h3>
              <div className="text-sm text-gray-500 mt-1">تاریخ انقضا: 1403/05/10</div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                فعال
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">مدیریت</button>
            </div>
          </div>
        </div>
      )}
      
      {serviceType === 'hosting' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-medium">هاست لینوکس پلن ۱</h3>
              <div className="text-sm text-gray-500 mt-1">دامنه: example.com</div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                فعال
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">مدیریت</button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-medium">هاست ویندوز پلن ۲</h3>
              <div className="text-sm text-gray-500 mt-1">دامنه: example.net</div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                فعال
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">مدیریت</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Empty state if no servers match the serviceType */}
      {!['vps', 'domain', 'hosting'].includes(serviceType) && (
        <div className="text-center py-8">
          <p className="text-gray-500">هیچ سرویسی یافت نشد.</p>
        </div>
      )}
    </div>
  );
};

export default ServerList;

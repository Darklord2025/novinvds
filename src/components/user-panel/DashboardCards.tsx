
import React from 'react';
import { Server, Globe, FileText, MessageSquare, Check } from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">سرورهای فعال</p>
            <h3 className="text-2xl font-bold mt-1">{toPersianDigits(3)}</h3>
          </div>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">
            <Server size={24} />
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-green-500 flex items-center">
            <Check size={16} className="ml-1" /> همه فعال
          </span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">دامنه‌های ثبت شده</p>
            <h3 className="text-2xl font-bold mt-1">{toPersianDigits(5)}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Globe size={24} />
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-yellow-500">
            {toPersianDigits(1)} دامنه در حال انتقال
          </span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">فاکتورهای پرداخت نشده</p>
            <h3 className="text-2xl font-bold mt-1">{toPersianDigits(2)}</h3>
          </div>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400">
            <FileText size={24} />
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-red-500">
            نیاز به پرداخت: {toPersianDigits('1,250,000')} تومان
          </span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">تیکت‌های باز</p>
            <h3 className="text-2xl font-bold mt-1">{toPersianDigits(1)}</h3>
          </div>
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <MessageSquare size={24} />
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          <span className="text-indigo-500">
            آخرین پاسخ: دیروز
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;

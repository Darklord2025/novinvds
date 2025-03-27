
import React from 'react';
import { CreditCard, Server, MessageSquare, Globe } from 'lucide-react';

const ActivityFeed = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h3 className="font-semibold">فعالیت‌های اخیر</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-full mr-4">
              <CreditCard size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">پرداخت فاکتور</p>
              <p className="text-xs text-gray-500">فاکتور شماره #12348 با موفقیت پرداخت شد.</p>
              <p className="text-xs text-gray-400 mt-1">امروز - 10:25</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-full mr-4">
              <Server size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">راه‌اندازی سرور</p>
              <p className="text-xs text-gray-500">سرور آلمان 1 با موفقیت راه‌اندازی شد.</p>
              <p className="text-xs text-gray-400 mt-1">دیروز - 18:30</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-indigo-100 rounded-full mr-4">
              <MessageSquare size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium">تیکت جدید</p>
              <p className="text-xs text-gray-500">تیکت #54321 با موضوع "درخواست ارتقا سرور" ایجاد شد.</p>
              <p className="text-xs text-gray-400 mt-1">دیروز - 14:15</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-yellow-100 rounded-full mr-4">
              <Globe size={16} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium">ثبت دامنه</p>
              <p className="text-xs text-gray-500">دامنه example.com با موفقیت ثبت شد.</p>
              <p className="text-xs text-gray-400 mt-1">1402/12/20 - 09:45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;


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
              <p className="text-xs text-gray-500">فاکتور شماره #۱۲۳۴۸ با موفقیت پرداخت شد.</p>
              <p className="text-xs text-gray-400 mt-1">امروز - ۱۰:۲۵</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-full mr-4">
              <Server size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">راه‌اندازی سرور</p>
              <p className="text-xs text-gray-500">سرور آلمان ۱ با موفقیت راه‌اندازی شد.</p>
              <p className="text-xs text-gray-400 mt-1">دیروز - ۱۸:۳۰</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-indigo-100 rounded-full mr-4">
              <MessageSquare size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium">تیکت جدید</p>
              <p className="text-xs text-gray-500">تیکت #۵۴۳۲۱ با موضوع "درخواست ارتقا سرور" ایجاد شد.</p>
              <p className="text-xs text-gray-400 mt-1">دیروز - ۱۴:۱۵</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-yellow-100 rounded-full mr-4">
              <Globe size={16} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium">ثبت دامنه</p>
              <p className="text-xs text-gray-500">دامنه example.com با موفقیت ثبت شد.</p>
              <p className="text-xs text-gray-400 mt-1">۱۴۰۲/۱۲/۲۰ - ۰۹:۴۵</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;

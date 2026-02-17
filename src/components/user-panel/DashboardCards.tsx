
import React from 'react';
import { Server, Globe, FileText, MessageSquare, Check } from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';

const DashboardCards = () => {
  const cards = [
    {
      title: 'سرورهای فعال',
      value: toPersianDigits(3),
      icon: Server,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400',
      footer: <span className="text-green-500 flex items-center"><Check size={14} className="ml-1" /> همه فعال</span>
    },
    {
      title: 'دامنه‌های ثبت شده',
      value: toPersianDigits(5),
      icon: Globe,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      footer: <span className="text-yellow-500">{toPersianDigits(1)} دامنه در حال انتقال</span>
    },
    {
      title: 'فاکتورهای پرداخت نشده',
      value: toPersianDigits(2),
      icon: FileText,
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-600 dark:text-red-400',
      footer: <span className="text-red-500">نیاز به پرداخت: {toPersianDigits('۱,۲۵۰,۰۰۰')} تومان</span>
    },
    {
      title: 'تیکت‌های باز',
      value: toPersianDigits(1),
      icon: MessageSquare,
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      footer: <span className="text-indigo-500">آخرین پاسخ: دیروز</span>
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 lg:p-6 shadow-sm">
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-gray-500 dark:text-gray-400 text-[10px] md:text-xs lg:text-sm truncate">{card.title}</p>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mt-1">{card.value}</h3>
              </div>
              <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${card.bgColor} rounded-lg flex items-center justify-center ${card.textColor} shrink-0`}>
                <Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            <div className="mt-2 md:mt-3 lg:mt-4 text-[10px] md:text-xs lg:text-sm truncate">
              {card.footer}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;

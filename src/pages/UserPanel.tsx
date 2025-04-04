
import React, { useEffect } from 'react';
import UserPanelLayout from '../components/user-panel/UserPanelLayout';
import { Helmet } from "react-helmet-async";

const UserPanel = () => {
  useEffect(() => {
    // تنظیم جهت و زبان صفحه
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
    
    // اضافه کردن کلاس RTL به بدنه سند
    document.body.classList.add('rtl');
    
    return () => {
      // پاکسازی کلاس RTL هنگام خروج از کامپوننت
      document.body.classList.remove('rtl');
      // بازگرداندن تنظیمات پیش‌فرض
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>پنل کاربری - نوین وی دی اس | مدیریت سرویس‌ها و خدمات</title>
        <meta name="description" content="پنل کاربری نوین وی دی اس برای مدیریت سرویس‌های هاستینگ، سرور مجازی، سرور اختصاصی، سرور ابری، دامنه و غیره" />
        <meta name="keywords" content="پنل کاربری، مدیریت سرویس‌ها، سرور مجازی، هاستینگ، سرور اختصاصی، پشتیبانی، اطلاعیه‌های مهم" />
        <style>
          {`
            body {
              direction: rtl;
              font-family: Vazirmatn, system-ui, sans-serif;
            }
            
            .rtl {
              direction: rtl;
            }

            /* تنظیمات انیمیشن fade-in برای منوها */
            @keyframes fade-in {
              0% {
                opacity: 0;
                transform: translateY(10px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in {
              animation: fade-in 0.3s ease-out forwards;
            }

            /* حالت‌های مختلف کارت‌های سرویس در پنل کاربری */
            .service-card-hover:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }

            .category-card {
              transition: all 0.3s ease;
            }
            
            .category-card:hover {
              transform: translateY(-5px);
            }
          `}
        </style>
      </Helmet>
      <UserPanelLayout />
    </>
  );
};

export default UserPanel;

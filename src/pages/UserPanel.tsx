
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
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>پنل کاربری - نوین وی دی اس | مدیریت سرویس‌ها و خدمات</title>
        <meta name="description" content="پنل کاربری نوین وی دی اس برای مدیریت سرویس‌های هاستینگ، سرور مجازی، سرور اختصاصی، سرور ابری، دامنه و غیره" />
        <meta name="keywords" content="پنل کاربری، مدیریت سرویس‌ها، سرور مجازی، هاستینگ، سرور اختصاصی، پشتیبانی" />
      </Helmet>
      <UserPanelLayout />
    </>
  );
};

export default UserPanel;

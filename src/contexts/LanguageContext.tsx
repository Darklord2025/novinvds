import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fa' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  fa: {
    // Navigation
    dashboard: 'داشبورد',
    services: 'سرویس‌های من',
    domains: 'دامنه‌ها',
    financial: 'امور مالی',
    tickets: 'پشتیبانی',
    profile: 'تنظیمات حساب کاربری',
    
    // Pages
    home: 'صفحه اصلی',
    vps: 'سرور مجازی',
    dedicated: 'سرور اختصاصی',
    hosting: 'هاستینگ',
    domain: 'دامنه',
    ssl: 'گواهینامه SSL',
    about: 'درباره ما',
    contact: 'تماس با ما',
    
    // Common
    login: 'ورود',
    register: 'ثبت نام',
    logout: 'خروج',
    save: 'ذخیره',
    cancel: 'انصراف',
    delete: 'حذف',
    edit: 'ویرایش',
    back: 'بازگشت',
    next: 'بعدی',
    previous: 'قبلی',
    search: 'جستجو',
    loading: 'در حال بارگذاری',
    
    // Server Management
    restart: 'راه‌اندازی مجدد',
    rebuild: 'نصب مجدد',
    manage: 'مدیریت',
    power: 'روشن/خاموش',
    console: 'کنسول',
    
    // Domain Management
    nameservers: 'نیم‌سرورها',
    dnsRecords: 'رکوردهای DNS',
    transfer: 'انتقال',
    renew: 'تمدید',
    
    // Financial
    wallet: 'کیف پول',
    transactions: 'تراکنش‌ها',
    invoices: 'فاکتورها',
    balance: 'موجودی',
    
    // Notifications
    notifications: 'اعلانات',
    announcements: 'اطلاعیه‌ها',
    support: 'پشتیبانی',
    knowledgeBase: 'مرکز دانش',
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    services: 'My Services',
    domains: 'Domains',
    financial: 'Financial',
    tickets: 'Support',
    profile: 'Account Settings',
    
    // Pages
    home: 'Home',
    vps: 'VPS',
    dedicated: 'Dedicated Server',
    hosting: 'Hosting',
    domain: 'Domain',
    ssl: 'SSL Certificate',
    about: 'About Us',
    contact: 'Contact Us',
    
    // Common
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    loading: 'Loading',
    
    // Server Management
    restart: 'Restart',
    rebuild: 'Rebuild',
    manage: 'Manage',
    power: 'Power',
    console: 'Console',
    
    // Domain Management
    nameservers: 'Nameservers',
    dnsRecords: 'DNS Records',
    transfer: 'Transfer',
    renew: 'Renew',
    
    // Financial
    wallet: 'Wallet',
    transactions: 'Transactions',
    invoices: 'Invoices',
    balance: 'Balance',
    
    // Notifications
    notifications: 'Notifications',
    announcements: 'Announcements',
    support: 'Support',
    knowledgeBase: 'Knowledge Base',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

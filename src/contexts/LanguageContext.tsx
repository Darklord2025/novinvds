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
    hosting: 'هاستینگ',
    vps: 'سرور مجازی',
    dedicated: 'سرور اختصاصی',
    
    // Common
    back: 'بازگشت',
    save: 'ذخیره',
    cancel: 'انصراف',
    confirm: 'تایید',
    delete: 'حذف',
    edit: 'ویرایش',
    view: 'مشاهده',
    active: 'فعال',
    inactive: 'غیرفعال',
    
    // Add more translations as needed
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    services: 'My Services',
    domains: 'Domains',
    financial: 'Financial',
    tickets: 'Support',
    profile: 'Account Settings',
    hosting: 'Hosting',
    vps: 'VPS',
    dedicated: 'Dedicated Server',
    
    // Common
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    active: 'Active',
    inactive: 'Inactive',
    
    // Add more translations as needed
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

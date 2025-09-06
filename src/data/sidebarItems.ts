
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  submenu?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'داشبورد', icon: 'home' },
  { id: 'recommendations', label: 'پیشنهادات ویژه', icon: 'star' },
  { id: 'servers', label: 'سرویس‌های من', icon: 'server' },
  { id: 'domains', label: 'دامنه‌ها', icon: 'globe' },
  { 
    id: 'financial', 
    label: 'امور مالی', 
    icon: 'credit-card',
    submenu: [
      { id: 'financial-overview', label: 'نمای کلی', icon: 'layout-dashboard' },
      { id: 'transactions', label: 'تراکنش‌ها', icon: 'repeat' },
      { id: 'invoices', label: 'فاکتورها', icon: 'file-text' },
      { id: 'wallet-topup', label: 'افزایش موجودی', icon: 'plus-circle' },
      { id: 'service-calculator', label: 'ماشین‌حساب سرویس', icon: 'calculator' }
    ]
  },
  { id: 'tickets', label: 'پشتیبانی', icon: 'message-square' },
  { id: 'affiliate', label: 'همکاری در فروش', icon: 'users' },
  { id: 'knowledge-base', label: 'مرکز دانش', icon: 'book-open' },
  { id: 'downloads', label: 'دانلودها', icon: 'download' },
  { id: 'notifications', label: 'اعلان‌ها', icon: 'bell' },
  { id: 'important-announcements', label: 'اطلاعیه‌های مهم', icon: 'megaphone' },
  { id: 'profile', label: 'تنظیمات حساب کاربری', icon: 'settings' },
];

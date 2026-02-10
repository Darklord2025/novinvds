
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  submenu?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'داشبورد', icon: 'home' },
  { 
    id: 'order-services', 
    label: 'سفارش سرویس جدید', 
    icon: 'plus-circle',
    submenu: [
      { id: 'order-hosting', label: 'میزبانی وب', icon: 'database' },
      { id: 'order-vps', label: 'سرور مجازی', icon: 'server' },
      { id: 'order-dedicated', label: 'سرور اختصاصی', icon: 'hard-drive' },
      { id: 'order-domain', label: 'دامنه', icon: 'globe' },
      { id: 'order-network', label: 'خدمات شبکه', icon: 'cloud' },
      { id: 'order-panels', label: 'کنترل پنل‌ها', icon: 'layout-dashboard' },
      { id: 'order-modules', label: 'ماژول‌های اضافی', icon: 'calculator' },
      { id: 'order-support', label: 'پشتیبانی تخصصی', icon: 'users' },
    ]
  },
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

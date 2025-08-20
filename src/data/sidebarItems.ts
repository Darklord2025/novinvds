
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'داشبورد', icon: 'home' },
  { id: 'recommendations', label: 'پیشنهادات ویژه', icon: 'star' },
  { id: 'network-store', label: 'فروشگاه تجهیزات', icon: 'shopping-cart' },
  { id: 'servers', label: 'سرویس‌های من', icon: 'server' },
  { id: 'domains', label: 'دامنه‌ها', icon: 'globe' },
  { id: 'financial', label: 'امور مالی', icon: 'credit-card' },
  { id: 'tickets', label: 'پشتیبانی', icon: 'message-square' },
  { id: 'affiliate', label: 'همکاری در فروش', icon: 'users' },
  { id: 'knowledge-base', label: 'مرکز دانش', icon: 'book-open' },
  { id: 'security-center', label: 'مرکز امنیت', icon: 'shield' },
  { id: 'server-management', label: 'مدیریت سرور', icon: 'hard-drive' },
  { id: 'service-calculator', label: 'ماشین‌حساب سرویس', icon: 'calculator' },
  { id: 'downloads', label: 'دانلودها', icon: 'download' },
  { id: 'notifications', label: 'اعلان‌ها', icon: 'bell' },
  { id: 'important-announcements', label: 'اطلاعیه‌های مهم', icon: 'megaphone' },
  { id: 'settings', label: 'تنظیمات حساب', icon: 'settings' },
];

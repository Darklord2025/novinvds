
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'داشبورد', icon: 'home' },
  { id: 'servers', label: 'خدمات من', icon: 'server' },
  { id: 'domains', label: 'دامنه‌ها', icon: 'globe' },
  { id: 'invoices', label: 'فاکتورها', icon: 'file-text' },
  { id: 'tickets', label: 'پشتیبانی', icon: 'message-square' },
  { id: 'wallet', label: 'کیف پول', icon: 'wallet' },
  { id: 'transactions', label: 'تراکنش‌ها', icon: 'credit-card' },
  { id: 'downloads', label: 'دانلودها', icon: 'download' },
  { id: 'notifications', label: 'اعلان‌ها', icon: 'bell' },
  { id: 'important-announcements', label: 'اطلاعیه‌های مهم', icon: 'megaphone' },
  { id: 'settings', label: 'تنظیمات حساب', icon: 'settings' },
];

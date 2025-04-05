
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'داشبورد', icon: 'home' },
  { id: 'servers', label: 'سرورهای مجازی', icon: 'server' },
  { id: 'dedicated', label: 'سرورهای اختصاصی', icon: 'server-stack' },
  { id: 'cloud', label: 'سرورهای ابری', icon: 'cloud' },
  { id: 'hosting', label: 'هاستینگ', icon: 'database' },
  { id: 'domains', label: 'دامنه‌ها', icon: 'globe' },
  { id: 'tickets', label: 'تیکت‌های پشتیبانی', icon: 'message-square' },
  { id: 'invoices', label: 'فاکتورها', icon: 'file-text' },
  { id: 'wallet', label: 'کیف پول', icon: 'wallet' },
  { id: 'transactions', label: 'تراکنش‌ها', icon: 'credit-card' },
  { id: 'downloads', label: 'دانلودها', icon: 'download' },
  { id: 'notifications', label: 'اعلان‌ها', icon: 'bell' },
  { id: 'important-announcements', label: 'اطلاعیه‌های مهم', icon: 'megaphone' },
  { id: 'settings', label: 'تنظیمات', icon: 'settings' },
];

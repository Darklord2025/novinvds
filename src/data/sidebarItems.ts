
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
      { 
        id: 'order-hosting', 
        label: 'میزبانی وب', 
        icon: 'database',
        submenu: [
          { id: 'order-hosting-linux-eco', label: 'هاست لینوکس ECO', icon: 'hard-drive' },
          { id: 'order-hosting-linux-pro', label: 'هاست لینوکس PRO', icon: 'hard-drive' },
          { id: 'order-hosting-linux-pro-ir', label: 'هاست لینوکس PRO ایران', icon: 'hard-drive' },
          { id: 'order-hosting-linux-vip', label: 'هاست لینوکس VIP', icon: 'hard-drive' },
          { id: 'order-hosting-linux-ir', label: 'هاست لینوکس ایران', icon: 'hard-drive' },
          { id: 'order-hosting-wordpress', label: 'هاست وردپرس', icon: 'hard-drive' },
          { id: 'order-hosting-woocommerce', label: 'هاست ووکامرس', icon: 'hard-drive' },
          { id: 'order-hosting-windows', label: 'هاست ویندوز', icon: 'hard-drive' },
          { id: 'order-hosting-windows-ir', label: 'هاست ویندوز ایران', icon: 'hard-drive' },
          { id: 'order-hosting-python', label: 'هاست پایتون', icon: 'hard-drive' },
          { id: 'order-hosting-nodejs', label: 'هاست Node.js', icon: 'hard-drive' },
          { id: 'order-hosting-download', label: 'هاست دانلود', icon: 'download' },
          { id: 'order-hosting-warez', label: 'هاست وارز', icon: 'hard-drive' },
          { id: 'order-hosting-email', label: 'هاست ایمیل', icon: 'mail' },
          { id: 'order-hosting-custom', label: 'هاست سفارشی', icon: 'settings' },
        ]
      },
      { 
        id: 'order-vps', 
        label: 'سرور مجازی', 
        icon: 'server',
        submenu: [
          { id: 'order-vps-linux', label: 'سرور مجازی لینوکس', icon: 'server' },
          { id: 'order-vps-windows', label: 'سرور مجازی ویندوز', icon: 'server' },
          { id: 'order-vps-ubuntu-desktop', label: 'سرور مجازی اوبونتو دسکتاپ', icon: 'server' },
          { id: 'order-vps-linux-ir', label: 'سرور مجازی لینوکس ایران', icon: 'server' },
          { id: 'order-vps-windows-ir', label: 'سرور مجازی ویندوز ایران', icon: 'server' },
          { id: 'order-vps-mikrotik', label: 'سرور مجازی میکروتیک', icon: 'server' },
          { id: 'order-vps-multilocation', label: 'سرور مجازی مولتی لوکیشن', icon: 'globe' },
          { id: 'order-vps-storage', label: 'سرور مجازی استوریج', icon: 'server' },
          { id: 'order-vps-hourly', label: 'سرور مجازی ساعتی', icon: 'clock' },
          { id: 'order-vps-daily', label: 'سرور مجازی روزانه', icon: 'clock' },
          { id: 'order-vps-managed', label: 'سرور مجازی مدیریت شده', icon: 'server' },
          { id: 'order-vps-custom', label: 'سرور مجازی سفارشی', icon: 'settings' },
        ]
      },
      { 
        id: 'order-dedicated', 
        label: 'سرور اختصاصی', 
        icon: 'hard-drive',
        submenu: [
          { id: 'order-dedicated-iran', label: 'سرور اختصاصی ایران', icon: 'hard-drive' },
          { id: 'order-dedicated-europe', label: 'سرور اختصاصی اروپا', icon: 'hard-drive' },
          { id: 'order-dedicated-usa', label: 'سرور اختصاصی آمریکا', icon: 'hard-drive' },
          { id: 'order-dedicated-asia', label: 'سرور اختصاصی آسیا', icon: 'hard-drive' },
          { id: 'order-dedicated-gpu', label: 'سرور اختصاصی GPU', icon: 'hard-drive' },
          { id: 'order-dedicated-storage', label: 'سرور اختصاصی استوریج', icon: 'hard-drive' },
        ]
      },
      { 
        id: 'order-domain', 
        label: 'دامنه', 
        icon: 'globe',
        submenu: [
          { id: 'order-domain-ir', label: 'دامنه .ir', icon: 'globe' },
          { id: 'order-domain-com', label: 'دامنه .com', icon: 'globe' },
          { id: 'order-domain-net', label: 'دامنه .net', icon: 'globe' },
          { id: 'order-domain-org', label: 'دامنه .org', icon: 'globe' },
          { id: 'order-domain-co', label: 'دامنه .co', icon: 'globe' },
          { id: 'order-domain-io', label: 'دامنه .io', icon: 'globe' },
          { id: 'order-domain-me', label: 'دامنه .me', icon: 'globe' },
          { id: 'order-domain-info', label: 'دامنه .info', icon: 'globe' },
          { id: 'order-domain-biz', label: 'دامنه .biz', icon: 'globe' },
          { id: 'order-domain-shop', label: 'دامنه .shop', icon: 'globe' },
          { id: 'order-domain-app', label: 'دامنه .app', icon: 'globe' },
          { id: 'order-domain-dev', label: 'دامنه .dev', icon: 'globe' },
          { id: 'order-domain-xyz', label: 'دامنه .xyz', icon: 'globe' },
          { id: 'order-domain-online', label: 'دامنه .online', icon: 'globe' },
          { id: 'order-domain-site', label: 'دامنه .site', icon: 'globe' },
          { id: 'order-domain-store', label: 'دامنه .store', icon: 'globe' },
          { id: 'order-domain-asia', label: 'دامنه .asia', icon: 'globe' },
          { id: 'order-domain-co-ir', label: 'دامنه .co.ir', icon: 'globe' },
          { id: 'order-domain-ac-ir', label: 'دامنه .ac.ir', icon: 'globe' },
        ]
      },
      { id: 'order-panels', label: 'کنترل پنل‌ها', icon: 'layout-dashboard' },
      { id: 'order-modules', label: 'ماژول‌های اضافی', icon: 'calculator' },
      { id: 'order-support', label: 'پشتیبانی تخصصی', icon: 'users' },
    ]
  },
  { id: 'cart', label: 'سبد خرید', icon: 'shopping-cart' },
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

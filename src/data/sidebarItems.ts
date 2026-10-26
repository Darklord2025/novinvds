import { countries, datacenters } from "./datacenters";
export interface SidebarItem {
  id: string;
  label: string;
  en?: string;
  icon: string;
  submenu?: SidebarItem[];
}
export const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "داشبورد", en: "Dashboard", icon: "home" },
  {
    id: "order-services",
    label: "سفارش سرویس جدید",
    en: "Order services",
    icon: "plus-circle",
    submenu: [
      {
        id: "order-hosting",
        label: "میزبانی وب",
        en: "Web hosting",
        icon: "database",
        submenu: [
          {
            id: "hosting-iran-group",
            label: "ایران",
            en: "Iran",
            icon: "globe",
            submenu: [
              {
                id: "order-hosting-linux-ir",
                label: "هاست لینوکس",
                en: "Linux hosting",
                icon: "server",
              },
              {
                id: "order-hosting-wordpress-ir",
                label: "هاست وردپرس",
                en: "WordPress hosting",
                icon: "database",
              },
              {
                id: "order-hosting-windows-ir",
                label: "هاست ویندوز",
                en: "Windows hosting",
                icon: "monitor",
              },
              {
                id: "order-hosting-custom-country-ir",
                label: "هاست سفارشی",
                en: "Custom hosting",
                icon: "settings",
              },
            ],
          },
          {
            id: "hosting-international-group",
            label: "خارج",
            en: "International",
            icon: "globe",
            submenu: [
              ...countries
                .filter((c) => c.id !== "ir")
                .map((c) => ({
                  id: "order-hosting-country-" + c.id,
                  label: c.fa,
                  en: c.en,
                  icon: "globe",
                })),
              {
                id: "hosting-custom-group",
                label: "هاست سفارشی",
                en: "Custom hosting",
                icon: "settings",
                submenu: countries
                  .filter((c) => c.id !== "ir")
                  .map((c) => ({
                    id: "order-hosting-custom-country-" + c.id,
                    label: c.fa,
                    en: c.en,
                    icon: "globe",
                  })),
              },
            ],
          },
          ...(
            [
              ["usage", "پرداخت بر اساس مصرف", "Pay as you go", "calculator"],
              ["trial", "تست رایگان ۲۴ ساعته", "Free 24-hour trial", "clock"],
            ] as const
          ).map(([mode, label, en, icon]) => ({
            id: "hosting-" + mode + "-group",
            label,
            en,
            icon,
            submenu: [
              {
                id: "order-hosting-" + mode + "-country-ir",
                label: "ایران",
                en: "Iran",
                icon: "globe",
              },
              {
                id: "hosting-" + mode + "-international",
                label: "خارج",
                en: "International",
                icon: "globe",
                submenu: countries
                  .filter((c) => c.id !== "ir")
                  .map((c) => ({
                    id: "order-hosting-" + mode + "-country-" + c.id,
                    label: c.fa,
                    en: c.en,
                    icon: "globe",
                  })),
              },
            ],
          })),
        ],
      },
      {
        id: "order-vps",
        label: "سرور مجازی",
        en: "Virtual servers",
        icon: "server",
        submenu: [
          {
            id: "order-vps-linux",
            label: "لینوکس",
            en: "Linux VPS",
            icon: "server",
          },
          {
            id: "order-vps-windows",
            label: "ویندوز",
            en: "Windows VPS",
            icon: "monitor",
          },
          {
            id: "order-vps-linux-ir",
            label: "لینوکس ایران",
            en: "Iran Linux VPS",
            icon: "server",
          },
          {
            id: "order-vps-windows-ir",
            label: "ویندوز ایران",
            en: "Iran Windows VPS",
            icon: "monitor",
          },
          {
            id: "order-vps-hourly",
            label: "سرور ساعتی",
            en: "Hourly VPS",
            icon: "clock",
          },
          {
            id: "order-vps-daily",
            label: "سرور روزانه",
            en: "Daily VPS",
            icon: "clock",
          },
          {
            id: "order-vps-multilocation",
            label: "چند لوکیشن",
            en: "Multi-location VPS",
            icon: "globe",
          },
          {
            id: "order-vps-storage",
            label: "ذخیره‌سازی",
            en: "Storage VPS",
            icon: "hard-drive",
          },
          {
            id: "order-vps-managed",
            label: "مدیریت‌شده",
            en: "Managed VPS",
            icon: "settings",
          },
          {
            id: "order-vps-mikrotik",
            label: "میکروتیک",
            en: "MikroTik VPS",
            icon: "network",
          },
          {
            id: "order-vps-custom",
            label: "سفارشی",
            en: "Custom VPS",
            icon: "settings",
          },
        ],
      },
      {
        id: "order-dedicated",
        label: "سرور اختصاصی",
        en: "Dedicated servers",
        icon: "hard-drive",
        submenu: [
          {
            id: "dedicated-iran-group",
            label: "ایران",
            en: "Iran",
            icon: "globe",
            submenu: datacenters
              .filter((dc) => dc.country === "ir")
              .map((dc) => ({
                id: "order-dedicated-dc-" + dc.id,
                label: dc.fa,
                en: dc.en,
                icon: "database",
              })),
          },
          {
            id: "dedicated-international-group",
            label: "خارج",
            en: "International",
            icon: "globe",
            submenu: [
              ...(
                [
                  ["eu", "اروپا", "Europe"],
                  ["na", "آمریکای شمالی", "North America"],
                  ["asia", "آسیا", "Asia"],
                  ["oceania", "اقیانوسیه", "Oceania"],
                ] as const
              ).map(([region, fa, en]) => ({
                id: "dedicated-region-" + region,
                label: fa,
                en,
                icon: "globe",
                submenu: countries
                  .filter((c) => c.region === region)
                  .map((c) => ({
                    id: "order-dedicated-country-" + c.id,
                    label: c.fa,
                    en: c.en,
                    icon: "globe",
                  })),
              })),
              {
                id: "order-dedicated-gpu",
                label: "پلن‌های GPU",
                en: "GPU plans",
                icon: "cpu",
              },
              {
                id: "order-dedicated-storage",
                label: "پلن‌های ذخیره‌سازی",
                en: "Storage plans",
                icon: "hard-drive",
              },
            ],
          },
        ],
      },
      {
        id: "order-domain",
        label: "ثبت، انتقال و اتصال دامنه",
        en: "Register, transfer or connect domain",
        icon: "globe",
      },
      {
        id: "order-modules",
        label: "افزونه و نرم‌افزار سرویس",
        en: "Service add-ons and software",
        icon: "layers",
      },
      {
        id: "order-support",
        label: "پشتیبانی تخصصی",
        en: "Managed support",
        icon: "users",
      },
    ],
  },
  { id: "cart", label: "سبد خرید", en: "Cart", icon: "shopping-cart" },
  { id: "servers", label: "سرویس‌های من", en: "My services", icon: "server" },
  { id: "domains", label: "دامنه‌های من", en: "My domains", icon: "globe" },
  {
    id: "financial",
    label: "امور مالی",
    en: "Finance",
    icon: "credit-card",
    submenu: [
      {
        id: "financial-overview",
        label: "نمای کلی",
        en: "Overview",
        icon: "layout-dashboard",
      },
      {
        id: "transactions",
        label: "تراکنش‌ها",
        en: "Transactions",
        icon: "repeat",
      },
      { id: "invoices", label: "فاکتورها", en: "Invoices", icon: "file-text" },
      {
        id: "wallet",
        label: "مدیریت کیف پول",
        en: "Wallet management",
        icon: "wallet",
      },
      {
        id: "wallet-usage",
        label: "گزارش مصرف",
        en: "Usage report",
        icon: "history",
      },
      {
        id: "service-calculator",
        label: "ماشین‌حساب سرویس",
        en: "Service calculator",
        icon: "calculator",
      },
    ],
  },
  {
    id: "tickets",
    label: "پشتیبانی",
    en: "Support tickets",
    icon: "message-square",
  },
  { id: "affiliate", label: "همکاری در فروش", en: "Affiliates", icon: "users" },
  {
    id: "knowledge-base",
    label: "مرکز دانش",
    en: "Knowledge center",
    icon: "book-open",
  },
  { id: "downloads", label: "دانلودها", en: "Downloads", icon: "download" },
  { id: "notifications", label: "اعلان‌ها", en: "Notifications", icon: "bell" },
  {
    id: "important-announcements",
    label: "اطلاعیه‌های مهم",
    en: "Announcements",
    icon: "megaphone",
  },
  {
    id: "profile",
    label: "تنظیمات حساب کاربری",
    en: "Account settings",
    icon: "settings",
  },
];

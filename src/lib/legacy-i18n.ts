const words: Record<string, string> = {
  داشبورد: "Dashboard",
  "سفارش سرویس جدید": "Order services",
  "میزبانی وب": "Web hosting",
  "سرور مجازی": "Virtual servers",
  "سرور اختصاصی": "Dedicated servers",
  دامنه: "Domains",
  "کنترل پنل‌ها": "Control panels",
  "ماژول‌های اضافی": "Service add-ons",
  "پشتیبانی تخصصی": "Managed support",
  "سبد خرید": "Shopping cart",
  "سرویس‌های من": "My services",
  دامنه‌ها: "My domains",
  "امور مالی": "Billing",
  "نمای کلی": "Overview",
  تراکنش‌ها: "Transactions",
  فاکتورها: "Invoices",
  "مدیریت کیف پول": "Wallet management",
  "گزارش مصرف": "Usage report",
  "ماشین‌حساب سرویس": "Cost calculator",
  پشتیبانی: "Support",
  "همکاری در فروش": "Affiliates",
  "مرکز دانش": "Knowledge base",
  دانلودها: "Downloads",
  اعلان‌ها: "Notifications",
  "اطلاعیه‌های مهم": "Announcements",
  "تنظیمات حساب کاربری": "Account settings",
};
export function translateLegacy(text: string): string {
  return (
    words[text.trim()] ||
    text
      .replace(/هاست/g, "Hosting")
      .replace(/سرور مجازی/g, "VPS")
      .replace(/سرور اختصاصی/g, "Dedicated")
      .replace(/دامنه/g, "Domain")
      .replace(/لینوکس/g, "Linux")
      .replace(/ویندوز/g, "Windows")
      .replace(/ایران/g, "Iran")
      .replace(/ساعتی/g, "Hourly")
      .replace(/روزانه/g, "Daily")
      .replace(/سفارشی/g, "Custom")
      .replace(/استوریج/g, "Storage")
      .replace(/مولتی لوکیشن/g, "Multi-location")
      .replace(/مدیریت شده/g, "Managed")
      .replace(/وردپرس/g, "WordPress")
      .replace(/ووکامرس/g, "WooCommerce")
      .replace(/دانلود/g, "Download")
      .replace(/ایمیل/g, "Email")
      .replace(/اروپا/g, "Europe")
      .replace(/آمریکا/g, "USA")
      .replace(/آسیا/g, "Asia")
      .replace(/میکروتیک/g, "MikroTik")
      .replace(/پایتون/g, "Python")
      .replace(/اوبونتو دسکتاپ/g, "Ubuntu Desktop")
      .replace(/وارز/g, "Warez")
  );
}

## محدوده کار

این درخواست شامل ۱۵+ تغییر مجزا در بخش‌های مختلف پنل کاربری است. برای کیفیت و سرعت بهتر، در ۴ فاز اجرا می‌شود.

---

### فاز ۱ — رفع ایرادهای کوچک و عملکردی (سریع)

1. **تیکت‌ها**
   - فعال‌سازی فیلتر وضعیت (باز / پاسخ‌داده / بسته) در `TicketsPage.tsx`
   - چینش سربرگ‌های Tabs از راست به چپ (افزودن `dir="rtl"` و `flex-row-reverse`)

2. **فاکتورها (`InvoicesPage` / `WHMCSInvoicesPage`)**
   - دکمهٔ «مشاهده» → باز شدن صفحهٔ جزئیات فاکتور
   - دکمهٔ «پرداخت» → هدایت به صفحهٔ پیش‌فاکتور (مدل ParsVDS) و سپس انتخاب روش پرداخت (کیف پول / درگاه)
   - دکمهٔ «دانلود» → خروجی PDF واقعی با `jspdf` + `html2canvas`

3. **دامنه‌ها**
   - دکمهٔ «بازگشت» را با همان الگوی سایر دکمه‌های بازگشت یکدست کن (همان variant و آیکن و `navigate(-1)` یا `setActiveTab`)

4. **سرویس‌ها**
   - رفع دکمهٔ سه‌نقطه (Dropdown) در حالت نمایش فهرستی `ServicesPage`
   - فعال‌سازی جستجوی سراسری در هدر پنل

5. **سرور اختصاصی / VPS مولتی‌لوکیشن / ساعتی**
   - در انتخاب سیستم‌عامل، Select نسخه‌ها نیز قابل انتخاب شود (نه فقط نمایش یکی)
   - دکمهٔ «افزودن به سبد خرید» در DedicatedOrderPage به Cart واقعی متصل شود

---

### فاز ۲ — بازطراحی پنل مدیریت VPS (الهام از ParsVDS)

`ServerManagementDetail.tsx` کامل بازنویسی:

- هدر سرویس با وضعیت، IP، لوکیشن، تاریخ سررسید + دکمه‌های Power (Start/Stop/Reboot/Hard Reboot)
- تب‌ها: نمای کلی، کنسول (HTML5/VNC)، نصب مجدد OS، Snapshot، شبکه/Firewall، نمودار منابع (CPU/RAM/Disk/BW)، **ارتقا/کاهش منابع** (Slider برای CPU/RAM/Disk با محاسبهٔ تفاوت قیمت)، فاکتورها، لاگ‌ها
- همهٔ دکمه‌ها با AlertDialog و toast عملکرد واقعی داشته باشند

---

### فاز ۳ — بازطراحی پنل مدیریت هاست (الهام از ParsVDS/HostIran/AzaronLine)

`HostingManagementPanel.tsx` کامل بازنویسی با ساختار ۸ تبی:

```text
نمای کلی | فایل/FTP | پایگاه داده | ایمیل | امنیت | ابزارها | منابع | صورتحساب
```

- نمای کلی: مشخصات پلن، IP، Nameserver، CPanel/DirectAdmin/CyberPanel/aaPanel + دکمهٔ Auto-Login به پنل اصلی
- فایل: File Manager، FTP accounts، PHP version
- دیتابیس: لیست MySQL + phpMyAdmin
- ایمیل: Webmail، Forwarder، Filter
- امنیت: SSL، Imunify360، Backup/Restore
- ابزار: Softaculous، Cron، DNS Zone
- منابع: ProgressBar برای Disk/BW/Inodes/Email
- صورتحساب: تاریخ سررسید + تمدید سریع

---

### فاز ۴ — هاست و دامنه (صفحات سفارش)

- **HostingPlans**: جزئیات کامل پلن‌ها (CPU/RAM/Disk/BW/Email/DB/Addon Domain/SSL/Backup) با مدل ParsVDS، دکمهٔ «سفارش» مستقیماً به Cart
- **DomainServicesPage**: امکانات دامنه مثل ParsVDS (WHOIS، DNS Management، Lock، Transfer، Nameserver Change، Auto-renew، EPP Code)

---

## یادداشت فنی

- وابستگی جدید: `jspdf` و `html2canvas` برای دانلود PDF فاکتور
- تمام اعداد از `toPersianDigits` عبور می‌کنند
- دکمه‌های بازگشت یک کامپوننت مشترک `BackButton` می‌گیرند تا یکدست شود
- مسیریابی داخلی پنل از طریق `panelNavigationService` و `usePanelState`

---

## تأیید قبل از شروع

به دلیل حجم بالا (احتمالاً ۱۵–۲۰ فایل تغییر/بازنویسی)، آیا با این ترتیب فازها موافقید یا اولویت خاصی دارید (مثلاً اول پنل هاست و VPS، بعد بقیه)؟

# اصلاحات جامع پنل کاربری

## ۱. داشبورد و سرویس‌ها
- افزودن سربرگ «سرور مجازی مولتی‌لوکیشن» در کنار سایر سربرگ‌ها در `Dashboard.tsx` و `DashboardCards.tsx`.
- اطمینان از هم‌ترازی و عدم شکستن متن عنوان سربرگ‌های «سفارش سرویس جدید» (استفاده از `whitespace-nowrap` + `flex-wrap` + `min-w-fit`).

## ۲. تنظیمات تم (Theme)
- انتقال کنترل تم به بخش «تنظیمات حساب» (`ProfileSettingsPage.tsx`) با تب/کارت جدید:
  - انتخاب: روشن / تاریک / خودکار (سیستم) / خودکار زمانی
  - در حالت زمانی: انتخاب ساعت شروع تاریک و روشن (پیش‌فرض ۱۹:۰۰ تا ۰۷:۰۰)
- به‌روزرسانی `ThemeContext` برای پشتیبانی `mode: 'light' | 'dark' | 'system' | 'schedule'` با ذخیره در localStorage و بررسی دوره‌ای زمان.
- دکمه تم در Header همچنان به‌عنوان toggle سریع می‌ماند اما تنظیمات پیشرفته در تنظیمات.
- افزودن دکمه Sun/Moon به صفحه `Auth.tsx` (لاگین).

## ۳. فاکتور و پیش‌فاکتور
- ساخت قالب PDF حرفه‌ای برای دانلود فاکتور و پیش‌فاکتور با jsPDF + autoTable شامل: هدر شرکت، شماره فاکتور، تاریخ، اطلاعات خریدار/فروشنده، جدول اقلام، جمع کل، مالیات ۹٪، مهر وضعیت، فوتر.
- اصلاح دکمه «چاپ پیش‌فاکتور» با `window.print()` روی محتوای dialog و style مخصوص چاپ.
- افزودن روش پرداخت «ارز دیجیتال (کریپتو)» به گزینه‌های پرداخت پیش‌فاکتور و صفحه فاکتور و همسوسازی با روش‌های افزایش موجودی (کارت به کارت، درگاه، کریپتو، حواله).
- یکسان‌سازی UI انتخاب روش پرداخت بین `InvoicesPage` و `WalletTopUpPage`.

## ۴. موبایل — سفارش جدید
- در `ServiceOrderPage.tsx` (و صفحات مرتبط)، اصلاح `TabsList` و کارت‌های نوع سرور با `overflow-x-auto` / `flex-wrap` / `whitespace-nowrap` تا دکمه‌ها از کارت بیرون نزنند.
- یکسان‌سازی رفتار انتخاب سربرگ در تمام انواع سرور (VPS/اختصاصی/هاست/مولتی‌لوکیشن/ساعتی) مطابق الگوی VPS.

## ۵. دامنه‌ها
- یکسان‌سازی آیتم‌های نمایش‌داده‌شده زیر هر دامنه (وضعیت، انقضا، DNS/Nameserver، تمدید خودکار، قفل انتقال) در `DomainManagement.tsx` و `DomainServicesPage.tsx`.
- حذف کامل تب «رکوردهای DNS» و امکان افزودن DNS.
- فقط نگه‌داشتن «تغییر Nameserver» با فرم ساده (ns1..ns4).

## ۶. سایدبار موبایل
- در `Sidebar.tsx` بررسی و حذف دکمه ضربدر تکراری در بالای سایدبار موبایل — نگه‌داشتن فقط یکی.

## ۷. سایر بهبودها (پیشنهادی)
- افزودن toast تأیید هنگام تغییر تم.
- بهبود focus states در دارک مود.
- ری‌فرش دکمه «افزودن روش پرداخت» با آیکون کریپتو.

## فایل‌های تحت تأثیر
- `src/contexts/ThemeContext.tsx` — بازنویسی
- `src/components/user-panel/ProfileSettingsPage.tsx` — بخش تم
- `src/components/user-panel/Dashboard.tsx` / `DashboardCards.tsx` — سربرگ مولتی
- `src/components/user-panel/ServiceOrderPage.tsx` — موبایل + هدر
- `src/components/user-panel/InvoicesPage.tsx` — pdf/چاپ/کریپتو
- `src/lib/invoicePdf.ts` (جدید) — قالب PDF
- `src/components/user-panel/DomainManagement.tsx` — حذف DNS
- `src/components/user-panel/DomainServicesPage.tsx` — هم‌ترازی
- `src/components/user-panel/Sidebar.tsx` — رفع ضربدر تکراری
- `src/pages/Auth.tsx` — دکمه تم

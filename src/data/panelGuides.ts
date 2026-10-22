export const panelGuides = [
  {
    id: "wallet",
    category: "billing",
    title: ["کیف پول و گزارش مصرف", "Wallet and usage reports"],
    body: [
      "از مدیریت کیف پول، واریز را انتخاب کنید. مبلغ و روش پرداخت را مشخص کنید. برای ارز، نرخ معتبر دریافت کنید و معادل تومان را بررسی کنید. موجودی پس از تایید پرداخت قابل استفاده است. گزارش ریز مصرف را بر اساس تاریخ و سرویس فیلتر و سپس دانلود یا چاپ کنید.",
      "Open Wallet management and select Add funds. Choose an amount and payment method. For foreign currency, obtain a valid quote and review the Toman equivalent. Funds become available after payment confirmation. Filter usage by date and service, then export or print it.",
    ],
  },
  {
    id: "renewal",
    category: "services",
    title: ["تمدید سرویس و دامنه", "Renewing services and domains"],
    body: [
      "روی تمدید در کارت یا صفحه سرویس کلیک کنید. دوره را انتخاب و مبلغ و مالیات ۱۰٪ را بررسی کنید. صدور پیش‌فاکتور به معنی تمدید نیست؛ تاریخ سرویس پس از تایید پرداخت و عملیات ارائه‌دهنده تغییر می‌کند. سرویس ساعتی از کیف پول استفاده می‌کند. دامنه منقضی نیازمند استعلام هزینه بازیابی است.",
      "Choose Renew on the service card or management page. Select a term and review the cost and 10% VAT. A proforma does not renew a service; expiry changes after confirmed payment and provider processing. Hourly services use wallet funds. Expired domains require a registrar redemption quote.",
    ],
  },
  {
    id: "mfa",
    category: "security",
    title: ["ورود دو مرحله‌ای", "Two-step authentication"],
    body: [
      "در تنظیمات حساب، راه‌اندازی نرم‌افزار را انتخاب کنید. بارکد را اسکن یا کلید را در نرم‌افزار رمزساز وارد کنید. کلید را امن نگه دارید. کد شش رقمی نرم‌افزار را برای تایید وارد کنید. اگر دسترسی به کد ندارید، بازیابی دو مرحله‌ای را در صفحه ورود انتخاب کنید تا پشتیبانی هویت شما را بررسی کند.",
      "In Account settings, choose Set up authenticator. Scan the QR code or enter the setup key. Keep the key secure. Enter the six-digit app code to confirm setup. If you lose access, choose two-step recovery on the sign-in page so support can verify your identity.",
    ],
  },
  {
    id: "invoice",
    category: "billing",
    title: ["درخواست فاکتور رسمی", "Requesting an official invoice"],
    body: [
      "در فاکتورها، گزینه رسمی کنار سند را انتخاب کنید. نوع حقیقی یا حقوقی و مشخصات خریدار را کامل کنید. درخواست با شماره تیکت پیگیری می‌شود. پیش از پرداخت پیش‌فاکتور ارائه می‌شود؛ صدور سند رسمی نهایی پس از پرداخت و تایید امور مالی انجام می‌شود.",
      "Choose Official beside an invoice. Select Individual or Company and complete the buyer details. A numbered ticket tracks the request. A proforma is available before payment; finance issues the final official document after payment and verification.",
    ],
  },
  {
    id: "domains",
    category: "domains",
    title: ["ثبت و انتقال دامنه", "Domain registration and transfers"],
    body: [
      "در سفارش دامنه، ثبت، انتقال یا استفاده از دامنه خود را انتخاب کنید. نام کامل دامنه را بررسی کنید. نتیجه نمونه، اثبات موجودی واقعی نیست. کد EPP فقط در مرحله نهایی و امن ثبت‌کننده وارد می‌شود. پیش از درخواست تغییر نیم‌سرور، نام دامنه انتخاب‌شده را بررسی کنید.",
      "In Domain ordering, choose Register, Transfer or Use existing. Check the full domain name. A sample result does not verify live availability. Enter EPP credentials only at the registrar secure final step. Check the selected domain before a nameserver change request.",
    ],
  },
] as const;

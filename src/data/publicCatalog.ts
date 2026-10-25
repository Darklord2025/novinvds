import { sidebarItems, type SidebarItem } from "./sidebarItems";
import { serviceAddons } from "./serviceAddons";

export type PublicFamily =
  | "vps"
  | "dedicated"
  | "hosting"
  | "domain"
  | "addons"
  | "network"
  | "support";
export const publicFamilies: {
  id: PublicFamily;
  path: string;
  title: readonly [string, string];
  description: readonly [string, string];
  tag: string;
  color: string;
}[] = [
  {
    id: "vps",
    path: "/vps",
    title: ["سرور مجازی", "Virtual servers"],
    description: [
      "از لینوکس و ویندوز تا منابع سفارشی؛ فضای اجرای پروژهٔ بعدی شما.",
      "Linux, Windows and custom resources. A home for your next application.",
    ],
    tag: "COMPUTE",
    color: "blue",
  },
  {
    id: "dedicated",
    path: "/dedicated",
    title: ["سرور اختصاصی", "Dedicated servers"],
    description: [
      "سخت‌افزار فیزیکی برای پردازش، ذخیره‌سازی و نیازهای تخصصی.",
      "Physical hardware for compute, storage and specialist workloads.",
    ],
    tag: "BARE METAL",
    color: "violet",
  },
  {
    id: "hosting",
    path: "/hosting",
    title: ["میزبانی وب", "Web hosting"],
    description: [
      "خانهٔ وب‌سایت شما؛ با پلن آماده یا منابعی که خودتان انتخاب می‌کنید.",
      "Your website’s home, with a ready-made plan or resources you choose.",
    ],
    tag: "HOSTING",
    color: "teal",
  },
  {
    id: "domain",
    path: "/domain",
    title: ["دامنه", "Domain names"],
    description: [
      "نامی برای شروع؛ ثبت، انتقال و اتصال دامنه در یک مسیر روشن.",
      "A name to start with. Register, transfer or connect your domain.",
    ],
    tag: "DOMAINS",
    color: "orange",
  },
  {
    id: "addons",
    path: "/addons",
    title: ["نرم‌افزار و افزونه", "Software & add-ons"],
    description: [
      "کنترل‌پنل، لایسنس، پشتیبان‌گیری و ابزارهای مکمل سرویس شما.",
      "Control panels, licensing, backups and tools to complete your service.",
    ],
    tag: "TOOLKIT",
    color: "rose",
  },
  {
    id: "network",
    path: "/network",
    title: ["شبکه و IP", "Networking & IP"],
    description: [
      "گزینه‌های IP، چند لوکیشن و ابزارهای شبکه متناسب با سرویس.",
      "IP options, multiple locations and networking tools for your service.",
    ],
    tag: "NETWORK",
    color: "cyan",
  },
  {
    id: "support",
    path: "/support",
    title: ["پشتیبانی تخصصی", "Managed services"],
    description: [
      "راه‌اندازی، انتقال و مدیریت سرویس، با محدودهٔ کار مشخص.",
      "Setup, migration and management, with a clearly defined scope.",
    ],
    tag: "EXPERTISE",
    color: "green",
  },
];

export interface PublicVariant {
  id: string;
  family: PublicFamily;
  title: readonly [string, string];
  href: string;
}
const familyFor: Record<string, PublicFamily> = {
  "order-vps": "vps",
  "order-hosting": "hosting",
  "order-dedicated": "dedicated",
  "order-domain": "domain",
  "order-modules": "addons",
  "order-support": "support",
};
export function variantHref(id: string, family: PublicFamily) {
  const base =
    family === "vps"
      ? "/vps-plans"
      : family === "dedicated"
        ? "/dedicated-plans"
        : family === "hosting"
          ? "/hosting-plans"
          : publicFamilies.find((v) => v.id === family)!.path;
  return ["vps", "dedicated", "hosting"].includes(family)
    ? base + "?profile=" + encodeURIComponent(id)
    : base;
}
function collect(
  item: SidebarItem,
  family: PublicFamily,
  trail: SidebarItem[] = [],
): PublicVariant[] {
  if (item.submenu)
    return item.submenu.flatMap((child) =>
      collect(child, family, [...trail, item]),
    );
  return [
    {
      id: item.id,
      family,
      title: [
        trail
          .slice(1)
          .map((v) => v.label)
          .concat(item.label)
          .join(" / "),
        trail
          .slice(1)
          .map((v) => v.en || v.label)
          .concat(item.en || item.label)
          .join(" / "),
      ],
      href: variantHref(item.id, family),
    },
  ];
}
// Read the actual order menu rather than maintaining an incomplete second service list.
const orderVariants: PublicVariant[] = (
  sidebarItems.find((i) => i.id === "order-services")?.submenu || []
).flatMap((item) => collect(item, familyFor[item.id]));
export const publicVariants: PublicVariant[] = [
  ...orderVariants,
  ...serviceAddons.map(
    (addon): PublicVariant => ({
      id: "addon-" + addon.id,
      family: addon.category === "network" ? "network" : "addons",
      title: [addon.name, addon.name],
      href:
        addon.category === "network"
          ? "/network"
          : "/addons?category=" + encodeURIComponent(addon.category),
    }),
  ),
];
export const variantsFor = (family: PublicFamily) =>
  publicVariants.filter((v) => v.family === family);
export function panelOrderHref(
  tab: string,
  options: Record<string, string> = {},
) {
  return "/user-panel?" + new URLSearchParams({ ...options, tab }).toString();
}

export const publicFaqs = [
  [
    "از کدام سرویس شروع کنم؟",
    "Which service should I start with?",
    "برای سایت و فروشگاه معمولی، هاست را بررسی کنید. برای دسترسی مدیریتی و اجرای برنامه، سرور مجازی و برای سخت‌افزار فیزیکی، سرور اختصاصی مناسب بررسی است. مشخصات برنامه و مصرف واقعی معیار انتخاب‌اند.",
    "Explore hosting for a website or shop, VPS for administrative access and applications, and dedicated servers for physical hardware. Application requirements and measured use should guide the choice.",
  ],
  [
    "قیمت نمایش‌داده‌شده قطعی است؟",
    "Are displayed prices final?",
    "مبالغ کاتالوگ برآورد اولیه و پیش از مالیات هستند. قیمت نهایی، ظرفیت و امکان ارائهٔ سرویس پیش از پرداخت تأیید می‌شوند. پیش‌فاکتور شامل جزئیات و مالیات ۱۰ درصد است.",
    "Catalog amounts are initial estimates before tax. Final pricing, capacity and service availability are confirmed before payment. Your proforma includes the breakdown and 10% VAT.",
  ],
  [
    "سفارش بدون از دست رفتن انتخاب‌ها ادامه پیدا می‌کند؟",
    "Will my configuration survive sign-in?",
    "با ادامهٔ سفارش به پنل منتقل می‌شوید. در صورت نیاز، ابتدا وارد حساب شوید؛ مسیر سفارش، منابع و محل انتخاب‌شده برای ادامه حفظ می‌شود.",
    "Continue to the panel to place your request. If needed, sign in first; the order destination, resources and selected location are retained.",
  ],
  [
    "هاست سفارشی و پرداخت مصرفی چه تفاوتی دارند؟",
    "How do custom and usage-based hosting differ?",
    "در هاست سفارشی منابع را انتخاب می‌کنید. در حالت مصرفی، برآورد بر اساس ساعت تخصیص، فضای نگهداری‌شده، ترافیک و سایت اضافه محاسبه می‌شود؛ اندازه‌گیری و تسویهٔ واقعی نیازمند اتصال ارائه‌دهنده است.",
    "Custom hosting lets you choose resources. Usage estimates account for allocation hours, retained storage, transfer and extra sites. Actual metering and settlement require the provider integration.",
  ],
  [
    "تست هاست چگونه فعال می‌شود؟",
    "How does the hosting trial work?",
    "درخواست تست ۲۴ ساعته با منابع محدود از حساب کاربری ثبت می‌شود. فعال‌سازی به تأیید ظرفیت و ارائه‌دهنده وابسته است و برای هر حساب یک بار قابل درخواست است.",
    "Request a low-resource 24-hour hosting trial from your account. Activation depends on capacity and provider approval; each account can request it once.",
  ],
  [
    "پروفایل سخت‌افزار یعنی سرور موجود است؟",
    "Does a hardware profile confirm stock?",
    "خیر. مدل‌ها و قطعات ایران، پروفایل مرجع و پلن‌های خارجی، نمونهٔ تأمین‌کننده هستند. موجودی، سازگاری قطعات، قیمت و زمان تحویل باید برای همان دستگاه تأیید شوند.",
    "No. Iran models are reference profiles and international cards are supplier examples. Stock, component compatibility, pricing and delivery must be verified for the actual machine.",
  ],
];

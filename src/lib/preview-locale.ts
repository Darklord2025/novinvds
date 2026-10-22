import { englishText } from "@/components/LegacyLocale";
import type { PanelSnapshot } from "./panel-model";
const fixtureEnglish: Record<string, string> = {
  "سؤال درباره صورتحساب": "Billing question",
  "کاربر نمونه": "Sample user",
  "سرور لینوکس ۱": "Linux server 1",
  "سرور ویندوز ۱": "Windows server 1",
  "سرور اختصاصی ایران": "Iran dedicated server",
  "سرور ساعتی ۱": "Hourly server 1",
  "سرور مولتی‌لوکیشن": "Multi-location server",
  "سرور مجازی لینوکس PRO": "Linux VPS Pro",
  "سرور مجازی ویندوز VIP": "Windows VPS VIP",
  "سرور اختصاصی E3": "Dedicated E3 server",
  "سرور ساعتی": "Hourly server",
  "سرور ابری": "Cloud server",
  "سرور مولتی لوکیشن": "Multi-location server",
  "هاست لینوکس PRO": "Linux hosting Pro",
  "هاست لینوکس VIP": "Linux hosting VIP",
  "هاستینگ اشتراکی": "Shared hosting",
  "سرورهای مجازی": "Virtual servers",
  "سرورهای اختصاصی": "Dedicated servers",
  "سرور ابری تجاری": "Business cloud server",
  "دیتاسنتر آسیاتک": "Asiatech datacenter",
  "پکیج حرفه‌ای": "Professional package",
  "پکیج VIP": "VIP package",
  "پلن حرفه‌ای": "Professional plan",
  "پلن ویژه": "Premium plan",
  "ساعتی پیشرفته": "Advanced hourly",
  "ابری تجاری": "Business cloud",
  "مولتی حرفه‌ای": "Multi-location Pro",
  "بررسی سرویس مجازی": "Virtual server review",
  "درخواست فاکتور نمونه": "Sample invoice request",
  "لطفاً وضعیت سرویس نمونه بررسی شود.":
    "Please review the sample service status.",
  "این پیام فقط نمونه‌ای از طراحی گفتگو است.":
    "This is a sample support conversation.",
  "این تیکت نمونه بسته شده است.": "This sample ticket is closed.",
  "واریز نمونه": "Sample wallet deposit",
  "تمدید سرور مجازی": "VPS renewal",
  "میزبانی وب": "Web hosting",
  دامنه: "Domain",
  ایرنیک: "IRNIC",
  بین‌المللی: "International",
  "نوین بذر": "Novin Seed",
  "نوین رویش": "Novin Sprout",
  "نوین شکوفا": "Novin Bloom",
  "نوین گستره": "Novin Horizon",
};
// Only presentation fixtures are translated. Real names and customer messages remain as entered.
export function localizedPreviewSnapshot(
  snapshot: PanelSnapshot,
  fa: boolean,
): PanelSnapshot {
  if (fa) return snapshot;
  function visit(value: any): any {
    if (typeof value === "string") {
      if (value.startsWith("سرویس نمونه "))
        return "Sample service " + englishText(value.slice(11));
      return fixtureEnglish[value] || englishText(value);
    }
    if (Array.isArray(value)) return value.map(visit);
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, visit(item)]),
      );
    return value;
  }
  return visit(snapshot);
}

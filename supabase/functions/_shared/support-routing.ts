// Shared by the ticket UI and Edge Function. Resource identity is resolved on the server.
export const supportDepartments = [
  {
    id: "technical",
    title: ["پشتیبانی فنی", "Technical support"],
    description: [
      "اتصال، منابع و تنظیمات سرویس",
      "Connectivity, resources and configuration",
    ],
  },
  {
    id: "billing",
    title: ["امور مالی", "Billing"],
    description: ["پرداخت، کیف پول و فاکتور", "Payments, wallet and invoices"],
  },
  {
    id: "sales",
    title: ["فروش و مشاوره", "Sales & advice"],
    description: [
      "انتخاب پلن، ارتقا و سفارش جدید",
      "Plans, upgrades and new orders",
    ],
  },
  {
    id: "security",
    title: ["امنیت حساب", "Account security"],
    description: [
      "ورود، احراز هویت و بازیابی دسترسی",
      "Sign-in, verification and recovery",
    ],
  },
] as const;
export type SupportDepartment = (typeof supportDepartments)[number]["id"];
export const supportResourceCategories = [
  { id: "vps", title: ["سرور مجازی", "Virtual servers"] },
  { id: "dedicated", title: ["سرور اختصاصی", "Dedicated servers"] },
  { id: "hosting", title: ["میزبانی وب", "Web hosting"] },
  { id: "domain", title: ["دامنه", "Domains"] },
  { id: "license", title: ["لایسنس و افزونه", "Licenses & add-ons"] },
  { id: "network", title: ["خدمات شبکه", "Network services"] },
  { id: "support", title: ["پشتیبانی مدیریت‌شده", "Managed support"] },
  { id: "general", title: ["عمومی و حساب کاربری", "General & account"] },
] as const;
export function supportCategoryForKind(kind?: string) {
  if (["vps", "cloud", "hourly", "multilocation"].includes(kind || ""))
    return "vps";
  if (["license", "ssl", "addon"].includes(kind || "")) return "license";
  return supportResourceCategories.some((v) => v.id === kind)
    ? kind!
    : "general";
}
export function routedDepartment(base: string, kind?: string) {
  return base === "technical" && kind
    ? "technical-" + supportCategoryForKind(kind)
    : base;
}
export function baseDepartment(id: string) {
  return id.startsWith("technical-") ? "technical" : id;
}
export interface TicketContext {
  resourceId?: string;
  resourceKind?: string;
  resourceName?: string;
  issueId?: string;
}
export async function resolveSupportContext(
  department: string,
  input: TicketContext | undefined,
  findOwned: (
    id: string,
  ) => Promise<{ id: string; kind: string; name: string }>,
): Promise<TicketContext> {
  const context: TicketContext = {};
  if (input?.resourceId) {
    if (typeof input.resourceId !== "string" || input.resourceId.length > 253)
      throw Error("Invalid service ID");
    const resource = await findOwned(input.resourceId);
    if (!resource || resource.id !== input.resourceId)
      throw Error("Service not found on this account");
    context.resourceId = resource.id;
    context.resourceKind = resource.kind;
    context.resourceName = resource.name;
  }
  if (input?.issueId) {
    if (typeof input.issueId !== "string" || input.issueId.length > 80)
      throw Error("Invalid issue");
    context.issueId = input.issueId;
  }
  return validateSupportContext(department, context);
}
export function technicalTeam(kind?: string): readonly string[] {
  const category = supportCategoryForKind(kind);
  if (category === "vps")
    return ["پشتیبانی سرور مجازی", "Virtual server support"];
  if (category === "dedicated")
    return ["پشتیبانی سرور اختصاصی", "Dedicated server support"];
  if (category === "domain")
    return ["پشتیبانی دامنه و DNS", "Domains & DNS support"];
  if (category === "hosting")
    return ["پشتیبانی میزبانی وب", "Web hosting support"];
  if (category === "license")
    return ["پشتیبانی لایسنس و افزونه", "Licenses & add-ons support"];
  if (category === "network")
    return ["پشتیبانی خدمات شبکه", "Network services support"];
  if (category === "support")
    return ["تیم پشتیبانی مدیریت‌شده", "Managed support team"];
  return supportDepartments[0].title;
}
export const supportIssues: {
  id: string;
  department: SupportDepartment;
  kinds: string[];
  title: string[];
  tips: string[];
  article: string;
}[] = [
  {
    id: "connection",
    department: "technical",
    kinds: ["vps", "dedicated", "hourly", "cloud", "multilocation", "network"],
    title: ["به سرور متصل نمی‌شوم", "I cannot connect to my server"],
    tips: [
      "وضعیت سرویس و IP را بررسی کنید. اتصال را از شبکه دیگری امتحان کنید و زمان و متن خطا را یادداشت کنید. بدون دسترسی جایگزین، فایروال یا شبکه سرور را تغییر ندهید.",
      "Check the service status and IP. Try another network and note the time and exact error. Do not change the firewall or networking without an alternative access path.",
    ],
    article: "choose-infrastructure",
  },
  {
    id: "website",
    department: "technical",
    kinds: ["hosting"],
    title: [
      "سایت باز نمی‌شود یا خطا دارد",
      "My website is unavailable or shows an error",
    ],
    tips: [
      "دامنه و وضعیت سرویس را بررسی کنید. متن خطا، آدرس صفحه و زمان شروع مشکل را ثبت کنید. پیش از تغییر فایل یا افزونه، از نسخه پشتیبان مطمئن شوید.",
      "Check the domain and service status. Record the error, page URL and when it started. Confirm you have a backup before changing files or plugins.",
    ],
    article: "choose-infrastructure",
  },
  {
    id: "dns",
    department: "technical",
    kinds: ["domain", "hosting"],
    title: ["دامنه یا DNS درست کار نمی‌کند", "Domain or DNS is not working"],
    tips: [
      "اعتبار دامنه و نیم‌سرورها را بررسی کنید. زمان آخرین تغییر و نوع رکورد DNS را اعلام کنید؛ رکوردهای قبلی را بدون بررسی حذف نکنید.",
      "Check domain expiry and nameservers. Note the last DNS change and record type. Do not delete existing records without reviewing them.",
    ],
    article: "renewal",
  },
  {
    id: "license",
    department: "technical",
    kinds: ["license", "addon", "ssl"],
    title: [
      "فعال‌سازی یا نصب انجام نشده",
      "Activation or installation is incomplete",
    ],
    tips: [
      "نام محصول، نسخه و متن خطا را آماده کنید. کلید لایسنس یا اطلاعات ورود را در متن تیکت قرار ندهید.",
      "Prepare the product name, version and error. Do not include license secrets or sign-in details.",
    ],
    article: "choose-infrastructure",
  },
  {
    id: "payment",
    department: "billing",
    kinds: [],
    title: ["پرداخت یا موجودی ثبت نشده", "A payment or balance is missing"],
    tips: [
      "گزارش تراکنش‌ها و فاکتور را بررسی کنید. شماره پیگیری، مبلغ و زمان پرداخت کافی است؛ شماره کامل کارت، رمز یا کد یک‌بارمصرف نفرستید.",
      "Review transactions and invoices. Include the reference, amount and time, without full card numbers, passwords or one-time codes.",
    ],
    article: "wallet",
  },
  {
    id: "invoice",
    department: "billing",
    kinds: [],
    title: [
      "فاکتور رسمی یا تمدید می‌خواهم",
      "I need an official invoice or renewal",
    ],
    tips: [
      "برای تمدید از صفحه سرویس و برای فاکتور رسمی از بخش فاکتورها اقدام کنید. اگر خطایی وجود دارد، شماره سند را درج کنید.",
      "Use the service page for renewal and Invoices for an official document. Include the document number if an error occurs.",
    ],
    article: "invoice",
  },
  {
    id: "upgrade",
    department: "sales",
    kinds: [],
    title: [
      "برای انتخاب یا ارتقا راهنمایی می‌خواهم",
      "I need help choosing or upgrading",
    ],
    tips: [
      "نوع برنامه، منابع، کشور و بودجه را مشخص کنید. امکان ارائه و هزینه نهایی پس از بررسی تأیید می‌شود.",
      "Describe the application, resources, country and budget. Availability and final pricing are confirmed after review.",
    ],
    article: "choose-infrastructure",
  },
  {
    id: "access",
    department: "security",
    kinds: [],
    title: [
      "مشکل ورود یا احراز دو مرحله‌ای دارم",
      "I have a sign-in or two-step verification issue",
    ],
    tips: [
      "از بازیابی در صفحه ورود استفاده کنید. رمز، کلید رمزساز یا کد یک‌بارمصرف را نفرستید؛ بازیابی نیازمند بررسی هویت است.",
      "Use recovery on the sign-in page. Never send passwords, authenticator keys or one-time codes. Recovery requires identity verification.",
    ],
    article: "mfa",
  },
];
export function issuesFor(department: string, kind?: string) {
  return supportIssues.filter(
    (v) =>
      v.department === baseDepartment(department) &&
      (!v.kinds.length || v.kinds.includes(kind || "")),
  );
}
export function validateSupportContext(
  department: string,
  context: TicketContext,
) {
  if (!supportDepartments.some((v) => v.id === baseDepartment(department)))
    throw Error("Invalid support department");
  if (
    department.startsWith("technical-") &&
    department !== routedDepartment("technical", context.resourceKind)
  )
    throw Error("Support team does not match the owned service");
  if (
    context.issueId &&
    context.issueId !== "other" &&
    !issuesFor(department, context.resourceKind).some(
      (v) => v.id === context.issueId,
    )
  )
    throw Error("Issue does not match the service and department");
  return context;
}

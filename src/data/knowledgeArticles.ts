import { panelGuides } from "./panelGuides";
export interface KnowledgeArticle {
  id: string;
  category: string;
  title: readonly string[];
  summary: readonly string[];
  minutes: number;
  sections: { heading: readonly string[]; body: readonly string[] }[];
}
export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "choose-infrastructure",
    category: "services",
    title: [
      "هاست، سرور مجازی یا اختصاصی؛ کدام مناسب شماست؟",
      "Hosting, VPS or dedicated: which fits your workload?",
    ],
    summary: [
      "منابع، سطح مدیریت و رشد سرویس را قبل از انتخاب بررسی کنید.",
      "Compare resources, management responsibilities and growth before choosing.",
    ],
    minutes: 5,
    sections: [
      {
        heading: ["از نیاز واقعی شروع کنید", "Start with the workload"],
        body: [
          "تعداد بازدیدکننده به‌تنهایی معیار انتخاب سرور نیست. نوع برنامه، مصرف حافظه، حجم داده، تعداد درخواست هم‌زمان و نیاز به دسترسی مدیریتی را مشخص کنید. اگر سرویس فعلی دارید، مصرف واقعی در ساعات شلوغ را مبنا قرار دهید.",
          "Visitor count alone does not determine server requirements. Identify the application, memory use, data size, concurrent requests and administrative access needs. For an existing service, measure usage during busy periods.",
        ],
      },
      {
        heading: ["میزبانی اشتراکی", "Shared hosting"],
        body: [
          "برای وب‌سایتی که به ابزارهای متداول میزبانی و مدیریت ساده نیاز دارد، هاست می‌تواند انتخاب مناسبی باشد. حدود مصرف، نسخه نرم‌افزارها، ظرفیت پشتیبان و امکان اجرای برنامه مورد نظر را در مشخصات پلن بررسی کنید.",
          "Hosting can suit websites that need familiar tools and simple management. Check resource limits, software versions, backup capacity and support for your application in the plan details.",
        ],
      },
      {
        heading: ["سرور مجازی", "Virtual servers"],
        body: [
          "سرور مجازی دسترسی و انعطاف بیشتری برای اجرای برنامه فراهم می‌کند. مدیریت سیستم‌عامل، به‌روزرسانی، پشتیبان و امنیت باید مسئول مشخص داشته باشد. منابع مجازی را با ظرفیت فیزیکی یک سرور اختصاصی یکسان فرض نکنید.",
          "A VPS offers more control and flexibility for applications. Assign responsibility for operating system administration, updates, backups and security. Virtual resources should not be treated as the physical capacity of a dedicated machine.",
        ],
      },
      {
        heading: ["سرور اختصاصی", "Dedicated servers"],
        body: [
          "در انتخاب اختصاصی، مدل دستگاه، نسل، پردازنده فیزیکی، نوع حافظه، دیسک و کنترلر اهمیت دارند. گزینه‌های ارتقا باید با مادربرد، فریمور، برق و خنک‌سازی همان دستگاه بررسی شوند. پروفایل مرجع یک خانواده سخت‌افزاری به معنی موجودی یا سازگاری تاییدشده دستگاه شما نیست.",
          "For dedicated servers, review the model, generation, physical CPU, memory, drives and controller. Upgrade options depend on the actual motherboard, firmware, power and cooling. A reference hardware profile does not verify stock or compatibility for your machine.",
        ],
      },
    ],
  },
  {
    id: "dedicated-hardware",
    category: "hardware",
    title: [
      "راهنمای بررسی ارتقای سخت‌افزار سرور اختصاصی",
      "Reviewing dedicated server hardware upgrades",
    ],
    summary: [
      "ارتقا بر اساس نسل، مدل قطعات و شواهد دستگاه واقعی انجام می‌شود.",
      "Upgrades depend on generation, component models and evidence from the actual device.",
    ],
    minutes: 6,
    sections: [
      {
        heading: [
          "پردازنده فیزیکی به جای تعداد هسته مجازی",
          "Physical CPU models, not virtual core increments",
        ],
        body: [
          "ارتقای پردازنده اختصاصی با انتخاب مدل فیزیکی سازگار انجام می‌شود. گزینه‌ای مانند «دو هسته بیشتر» برای توضیح تعویض CPU کافی نیست. تعداد سوکت، خانواده پردازنده و محدودیت‌های مادربرد و BIOS باید مشخص باشند.",
          "A dedicated CPU upgrade selects a compatible physical processor. An option such as “two more cores” does not describe a CPU replacement adequately. Socket count, CPU family, motherboard limits and BIOS requirements must be known.",
        ],
      },
      {
        heading: ["حافظه و دیسک", "Memory and drives"],
        body: [
          "ظرفیت رم، نوع DDR، چینش DIMM و محدودیت‌های پشتیبانی‌شده باید با دستگاه تطبیق داده شوند. برای دیسک نیز نوع رابط، ابعاد، بک‌پلین، کنترلر و سیاست RAID اهمیت دارند. انتخاب ظرفیت صرفاً هدف بررسی است و تایید سازگاری نیست.",
          "Match RAM capacity, DDR generation, DIMM layout and supported limits to the machine. Drive interface, form factor, backplane, controller and RAID policy also matter. Selecting a capacity is a review target, not compatibility approval.",
        ],
      },
      {
        heading: [
          "چه اطلاعاتی برای تایید نیاز است؟",
          "Evidence required for approval",
        ],
        body: [
          "مدل کامل، نسل، شماره قطعه مادربرد، CPU فعلی، ماژول‌های رم، دیسک‌ها، بک‌پلین، کنترلر، نسخه فریمور، منبع تغذیه و وضعیت خنک‌سازی را از پرونده تحویل یا اپراتور دریافت کنید. سپس درخواست بررسی ارتقا را با همان شناسه سرویس ثبت کنید.",
          "Obtain the full model, generation, motherboard part number, current CPU, DIMMs, drives, backplane, controller, firmware, power supplies and cooling details from the delivery record or operator. Submit the upgrade review against that service ID.",
        ],
      },
    ],
  },
  ...panelGuides.map((g) => ({
    id: g.id,
    category: g.category,
    title: g.title,
    summary: g.body.map((b) => b.split(". ")[0] + "."),
    minutes: 3,
    sections: [
      { heading: ["راهنمای استفاده", "How it works"], body: g.body },
      {
        heading: ["پیگیری درخواست", "Track your request"],
        body: [
          "شماره سرویس، فاکتور یا تیکت را برای پیگیری نگه دارید. اگر وضعیت ارائه‌دهنده یا پرداخت تایید نشده است، نتیجه پیش‌نمایش را به معنی انجام عملیات واقعی ندانید. از بخش پشتیبانی همان حساب برای بررسی کمک بگیرید.",
          "Keep the service, invoice or ticket reference for follow-up. A preview is not confirmation of provider processing or payment. Contact support from the same account if you need help verifying the result.",
        ],
      },
    ],
  })),
];

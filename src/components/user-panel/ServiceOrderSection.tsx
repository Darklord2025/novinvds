import {
  Server,
  Database,
  HardDrive,
  Globe,
  Layers,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePanelCopy, PanelHeading } from "./PanelPrimitives";
export default function ServiceOrderSection({
  navigateToServiceOrderPage: go,
}: {
  navigateToServiceOrderPage: (path: string) => void;
}) {
  const { s } = usePanelCopy();
  const groups = [
    {
      id: "hosting",
      icon: Database,
      color: "from-violet-500 to-purple-700",
      fa: "میزبانی وب",
      en: "Web hosting",
      desc: s(
        "پلن، سفارشی، مصرفی و تست ۲۴ ساعته",
        "Plans, custom resources, metered and 24-hour trial",
      ),
      links: [
        ["hosting", "پلن‌ها و لوکیشن‌ها", "Plans and locations"],
        ["hosting-custom", "منابع سفارشی", "Custom resources"],
        ["hosting-usage", "پرداخت به ازای مصرف", "Pay as you go"],
        ["hosting-trial", "تست رایگان", "Free trial"],
      ],
    },
    {
      id: "vps",
      icon: Server,
      color: "from-blue-500 to-indigo-700",
      fa: "سرور مجازی",
      en: "Virtual servers",
      desc: s(
        "ابتدا منابع، سپس خانواده و نسخه سیستم‌عامل",
        "Resources first, then OS family and release",
      ),
      links: [
        ["vps", "پیکربندی سرور", "Configure server"],
        ["vps-hourly", "ساعتی", "Hourly"],
        ["vps-multilocation", "چند لوکیشن", "Multi-location"],
      ],
    },
    {
      id: "dedicated",
      icon: HardDrive,
      color: "from-rose-500 to-red-700",
      fa: "سرور اختصاصی",
      en: "Dedicated servers",
      desc: s(
        "CPU، ماژول رم، درایو و کارت توسعه با تعداد",
        "CPU, DIMMs, drives and expansion card quantities",
      ),
      links: [["dedicated", "درخواست کانفیگ", "Request configuration"]],
    },
    {
      id: "domain",
      icon: Globe,
      color: "from-amber-500 to-orange-700",
      fa: "دامنه",
      en: "Domains",
      desc: s(
        "عملیات مشخص به جای فهرست تکراری پسوندها",
        "Distinct operations instead of duplicate extension menus",
      ),
      links: [
        [
          "domain",
          "ثبت، انتقال و اتصال دامنه",
          "Register, transfer or connect domain",
        ],
        ["domain-pricing", "تعرفه پسوندها", "Extension prices"],
      ],
    },
    {
      id: "modules",
      icon: Layers,
      color: "from-cyan-500 to-teal-700",
      fa: "افزونه و نرم‌افزار سرویس",
      en: "Service add-ons and software",
      desc: s(
        "کنترل‌پنل، بکاپ و شبکه در کنار سرویس سازگار",
        "Control panels, backup and network options for compatible services",
      ),
      links: [["modules", "انتخاب برای سرویس من", "Choose for my service"]],
    },
    {
      id: "support",
      icon: Users,
      color: "from-emerald-500 to-green-700",
      fa: "پشتیبانی تخصصی",
      en: "Managed services",
      desc: s(
        "بررسی نیاز و محدوده خدمات",
        "Review your requirements and support scope",
      ),
      links: [["support", "خدمات پشتیبانی", "Support options"]],
    },
  ];
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s("انتخاب سرویس جدید", "Choose a new service")}
        subtitle={s(
          "مسیر سفارش هر سرویس با تنظیمات مخصوص خودش",
          "Each service has its own configuration flow",
        )}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {groups.map((g) => (
          <article
            key={g.id}
            className="rounded-2xl border bg-card overflow-hidden"
          >
            <header className={"p-5 text-white bg-gradient-to-br " + g.color}>
              <g.icon className="mb-3" />
              <h2 className="text-lg font-bold">{s(g.fa, g.en)}</h2>
              <p className="text-sm text-white/80 mt-2">{g.desc}</p>
            </header>
            <div className="p-4 flex flex-wrap gap-2">
              {g.links.map(([id, f, en]) => (
                <Button
                  key={id}
                  variant="outline"
                  onClick={() => go("/order/" + id)}
                >
                  {s(f, en)}
                </Button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

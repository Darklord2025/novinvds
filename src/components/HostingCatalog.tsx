import DatacenterPicker from "./user-panel/DatacenterPicker";
import {countries,countryFromCategory,validDatacenter} from "@/data/datacenters";
import React from "react";
import { normalizeDigits } from "@/lib/localized-number";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Globe,
  Sprout,
  SlidersHorizontal,
  Timer,
  Gauge,
  Check,
  ShoppingCart,
} from "lucide-react";
import {
  hostingPlans,
  hostingTrial,
  hostingRates,
  hostingEstimate,
  validHostingResources,
  type HostingResources,
  type HostingLocation,
  type HostingBilling,
} from "@/data/hostingCatalog";
import { useCart } from "@/contexts/CartContext";
import { usePanelCopy } from "./user-panel/PanelPrimitives";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
const HostingTrialRequest = React.lazy(
  () => import("./user-panel/HostingTrialRequest"),
);
export default function HostingCatalog({
  inPanel = false,
  initialCategory = "",
  onCart,
}: {
  inPanel?: boolean;
  initialCategory?: string;
  onCart?: () => void;
}) {
  const { s, n, money, fa } = usePanelCopy();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const form = useRef<HTMLElement>(null);
  const params = new URLSearchParams(location.search);
  const initial =
    hostingPlans.find((p) => p.id === params.get("plan")) || hostingPlans[0];
  const [selected, setSelected] = useState(
    params.get("plan") === "custom" || initialCategory.includes("custom")
      ? "custom"
      : params.get("billing") === "trial" || initialCategory.includes("trial")
        ? "trial"
        : (initial.id as string),
  );
  const initialCountry=countryFromCategory(initialCategory,params.get('location')==='eu'?'de':'ir');
  const [country,setCountry]=useState(countries.some(c=>c.id===params.get('country'))?params.get('country')!:initialCountry);
  const [datacenter,setDatacenter]=useState(params.get('datacenterId')||params.get('datacenter')||'');
  const region:HostingLocation=country==='ir'?'ir':'eu';
  const setRegion=(r:HostingLocation)=>{setCountry(r==='ir'?'ir':'de');setDatacenter('');};
  const [billing, setBilling] = useState<HostingBilling>(
    ["monthly", "yearly", "usage", "trial"].includes(
      params.get("billing") || "",
    )
      ? (params.get("billing") as HostingBilling)
      : initialCategory.includes("usage")
        ? "usage"
        : initialCategory.includes("trial")
          ? "trial"
          : "monthly",
  );
  const [resources, setResources] = useState<HostingResources>(() => {
    const r = {
      cpu: Number(params.get("cpu") || initial.cpu),
      ramGB: Number(params.get("ram") || initial.ramGB),
      diskGB: Number(params.get("disk") || initial.diskGB),
      trafficGB: Number(params.get("traffic") || initial.trafficGB),
      sites: Number(params.get("sites") || initial.sites),
    };
    return validHostingResources(r) ? r : { ...initial };
  });
  const [workload, setWorkload] = useState(
    params.get("workload") ||
      (initialCategory.includes("windows")
        ? "windows"
        : initialCategory.includes("wordpress") ||
            initialCategory.includes("woocommerce")
          ? "wordpress"
          : initialCategory.includes("python")
            ? "python"
            : initialCategory.includes("nodejs")
              ? "nodejs"
              : "linux"),
  );
  const [message, setMessage] = useState("");
  const trial = billing === "trial",
    custom = selected === "custom" || billing === "usage";
  const current = trial ? hostingTrial : resources;
  const preset = hostingPlans.find((p) => p.id === selected);
  const valid =
    validHostingResources(current) &&
    (!trial || ["linux", "wordpress"].includes(workload));
  const monthly = valid
    ? custom
      ? hostingEstimate(current, region)
      : preset?.[region] || hostingEstimate(current, region)
    : 0;
  const amount = trial ? 0 : billing === "yearly" ? monthly * 12 : monthly;
  function pick(id: string) {
    const p = hostingPlans.find((p) => p.id === id);
    setSelected(id);
    setMessage("");
    if (p) setResources({ ...p });
    if (id === "trial") {
      setBilling("trial");
      setWorkload("linux");
    } else if (billing === "trial") setBilling("monthly");
    form.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function submit() {
    if (!valid||!validDatacenter(country,datacenter)) return;
    if (!inPanel) {
      const q = new URLSearchParams({
        tab: "order-hosting",
        plan: selected,
        location: region, country, datacenterId:datacenter,
        billing,
        cpu: String(current.cpu),
        ram: String(current.ramGB),
        disk: String(current.diskGB),
        traffic: String(current.trafficGB),
        sites: String(current.sites),
        workload,
      });
      navigate("/user-panel?" + q);
      return;
    }
    addItem({
      id: `hosting-${Date.now()}`,
      type: "hosting",
      name: trial
        ? s("نوین تجربه — تست ۲۴ ساعته", "Novin Experience — 24-hour trial")
        : preset
          ? s(preset.fa, preset.en)
          : s("نوین انعطاف — هاست سفارشی", "Novin Flex — custom hosting"),
      price: amount,
      period: trial
        ? s("۲۴ ساعت", "24 hours")
        : billing === "usage"
          ? s("برآورد ماهانه مصرف", "Monthly usage estimate")
          : billing === "yearly"
            ? s("سالانه", "Yearly")
            : s("ماهانه", "Monthly"),
      specs: [
        `${current.cpu} vCPU · ${current.ramGB} GB RAM · ${current.diskGB} GB NVMe`,
        `${current.trafficGB} GB · ${current.sites} ${s("وب‌سایت", "sites")}`,
        s(countries.find(c=>c.id===country)!.fa,countries.find(c=>c.id===country)!.en),
        workload,
      ],
      meta: {
        catalogId: trial ? "novin-trial" : selected,
        location: region, country, datacenterId:datacenter,
        billing,
        resources: current,
        workload,
        trialHours: trial ? 24 : undefined,
        requiresQuote: true,
        pricingStatus: "proposal",
        metered: billing === "usage",
        inventoryVerified: false,
      },
    });
    setMessage(
      s(
        "پیش‌نویس سفارش به سبد اضافه شد. قیمت و ظرفیت پیش از پرداخت از ارائه‌دهنده تایید می‌شود.",
        "Order draft added. Provider pricing and capacity must be confirmed before payment.",
      ),
    );
  }
  const fields = [
    ["cpu", s("سهم پردازنده — vCPU", "CPU allocation — vCPU"), 1, 8, 1],
    ["ramGB", s("حافظه — GB", "Memory — GB"), 0.5, 16, 0.5],
    ["diskGB", s("فضای NVMe — GB", "NVMe storage — GB"), 0.5, 200, 0.5],
    ["trafficGB", s("ترافیک — GB", "Transfer — GB"), 1, 2000, 1],
    ["sites", s("تعداد وب‌سایت", "Website count"), 1, 20, 1],
  ] as const;
  return (
    <div dir={fa ? "rtl" : "ltr"} className="space-y-6 min-w-0">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold">
            {s("میزبانی وب، به اندازه رشد شما", "Hosting that grows with you")}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {s(
              "یک کاتالوگ مشترک برای انتخاب پلن و سفارش؛ نام‌ها و تعرفه‌های پیشنهادی نوین",
              "One catalog for plans and ordering, with original Novin names and proposed tariffs",
            )}
          </p>
        </div>
        <div className="flex rounded-xl border p-1 gap-1">
          {(["ir", "eu"] as const).map((r) => (
            <Button
              key={r}
              variant={region === r ? "default" : "ghost"}
              onClick={() => setRegion(r)}
            >
              <Globe size={16} className="me-2" />
              {r === "ir" ? s("ایران", "Iran") : s("خارج از ایران", "International")}
            </Button>
          ))}
        </div>
      </div>
      <p className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 text-sm">
        {s(
          "تعرفه‌ها پیشنهاد اولیه نوین و بدون مالیات هستند؛ فعال بودن لوکیشن، منابع و قیمت نهایی هنوز به تایید ارائه‌دهنده نیاز دارد.",
          "Tariffs are Novin proposals before tax. Location availability, resources and final pricing require provider confirmation.",
        )}
      </p>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {hostingPlans.map((p, i) => (
          <article
            key={p.id}
            className={
              "rounded-2xl border bg-card p-5 space-y-4 relative overflow-hidden " +
              (selected === p.id ? "ring-2 ring-blue-500" : "")
            }
          >
            <div
              className={
                "absolute top-0 inset-x-0 h-1 " +
                [
                  "bg-blue-500",
                  "bg-emerald-500",
                  "bg-violet-500",
                  "bg-amber-500",
                ][i]
              }
            />
            <Sprout className="text-emerald-500" />
            <h3 className="font-bold text-lg">{s(p.fa, p.en)}</h3>
            <p className="text-2xl font-extrabold">
              {money(p[region])}
              <small className="text-xs block font-normal text-muted-foreground mt-2">
                {s("پیشنهادی / ماهانه", "Proposed / month")}
              </small>
            </p>
            <ul className="space-y-2 text-sm">
              {[
                `${n(p.cpu)} vCPU`,
                `${n(p.ramGB)} GB RAM`,
                `${n(p.diskGB)} GB NVMe`,
                `${n(p.trafficGB)} GB ${s("ترافیک", "transfer")}`,
                `${n(p.sites)} ${s("وب‌سایت", "websites")}`,
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>
            <Button className="w-full" onClick={() => pick(p.id)}>
              {s("انتخاب و سفارش", "Select and order")}
            </Button>
          </article>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          [
            "custom",
            SlidersHorizontal,
            s("نوین انعطاف", "Novin Flex"),
            s("منابع را خودتان تعیین کنید", "Choose your own resources"),
          ],
          [
            "usage",
            Gauge,
            s("نوین سنجش", "Novin Meter"),
            s(
              "پرداخت بر اساس مصرف اندازه‌گیری‌شده",
              "Pay for measured consumption",
            ),
          ],
          [
            "trial",
            Timer,
            s(
              "نوین تجربه — ۲۴ ساعت رایگان",
              "Novin Experience — 24 hours free",
            ),
            s(
              "۵۱۲ مگابایت رم و فضا، یک وب‌سایت",
              "512 MB memory and storage, one website",
            ),
          ],
        ].map(([id, Icon, title, desc]) => {
          const I = Icon as typeof Timer;
          return (
            <button
              key={String(id)}
              className="rounded-2xl border bg-card p-5 text-start hover:border-blue-500"
              onClick={() => {
                pick(id === "usage" ? "custom" : String(id));
                if (id === "usage") setBilling("usage");
              }}
            >
              <I className="text-blue-500 mb-3" />
              <strong>{String(title)}</strong>
              <p className="text-sm text-muted-foreground mt-2">
                {String(desc)}
              </p>
            </button>
          );
        })}
      </div>
      <section
        ref={form}
        className="scroll-mt-28 rounded-2xl border bg-card p-5 md:p-7 space-y-5"
      >
        <h3 className="text-xl font-bold">
          {s("پیکربندی و بررسی سفارش هاست", "Configure and review hosting")}
        </h3>
        {country!=='ir'&&<label className="block text-sm font-semibold">{s('کشور محل میزبانی','Hosting country')}<select aria-label={s('کشور محل میزبانی','Hosting country')} className="mt-2 block w-full rounded-xl border bg-card p-3" value={country} onChange={e=>{setCountry(e.target.value);setDatacenter('');}}>{countries.filter(c=>c.id!=='ir').map(c=><option key={c.id} value={c.id}>{s(c.fa,c.en)}</option>)}</select></label>}
        <DatacenterPicker country={country} value={datacenter} onChange={setDatacenter}/>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="space-y-2 text-sm block">
            {s("مدل پرداخت", "Billing model")}
            <select
              className="block border p-3 rounded-xl bg-background w-full"
              value={billing}
              onChange={(e) => {
                const b = e.target.value as HostingBilling;
                setBilling(b);
                if (b === "trial") {
                  setSelected("trial");
                  setWorkload("linux");
                } else if (selected === "trial") {
                  setSelected("custom");
                  setResources({ ...hostingPlans[0] });
                }
                if (b === "usage") setSelected("custom");
              }}
            >
              {[
                ["monthly", "ماهانه", "Monthly"],
                ["yearly", "سالانه", "Yearly"],
                ["usage", "پرداخت به ازای مصرف", "Pay as you go"],
                ["trial", "تست رایگان ۲۴ ساعته", "Free 24-hour trial"],
              ].map(([id, f, en]) => (
                <option key={id} value={id}>
                  {s(f, en)}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm block">
            {s("کاربری هاست", "Hosting workload")}
            <select
              className="block border p-3 rounded-xl bg-background w-full"
              value={workload}
              onChange={(e) => setWorkload(e.target.value)}
            >
              {[
                ["linux", "وب‌سایت لینوکسی / PHP", "Linux / PHP"],
                ["wordpress", "وردپرس و فروشگاه", "WordPress / commerce"],
                ["windows", "ویندوز / ASP.NET", "Windows / ASP.NET"],
                ["python", "پایتون", "Python"],
                ["nodejs", "Node.js", "Node.js"],
                ["download", "دانلود و فایل", "Download / files"],
              ].map(([id, f, en]) => (
                <option
                  key={id}
                  value={id}
                  disabled={trial && !["linux", "wordpress"].includes(id)}
                >
                  {s(f, en)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map(([key, label, min, max, step]) => (
            <label key={key} className="text-sm space-y-2">
              {label}
              {key === "ramGB" && !trial ? (
                <select
                  aria-label={label}
                  value={current[key]}
                  className="block w-full border bg-background p-3 rounded-xl"
                  onChange={(e) => {
                    setResources({
                      ...resources,
                      [key]: Number(
                        normalizeDigits(e.target.value).replace(/,/g, ""),
                      ),
                    });
                    setSelected("custom");
                  }}
                >
                  {[0.5, 1, 2, 4, 8, 16].map((v) => (
                    <option key={v} value={v}>
                      {n(v)}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  aria-label={label}
                  type="text"
                  inputMode="decimal"
                  min={min}
                  max={max}
                  step={step}
                  disabled={trial}
                  value={n(current[key])}
                  onChange={(e) => {
                    setResources({
                      ...resources,
                      [key]: Number(
                        normalizeDigits(e.target.value).replace(/,/g, ""),
                      ),
                    });
                    setSelected("custom");
                  }}
                />
              )}
            </label>
          ))}
        </div>
        {billing === "usage" && (
          <div className="rounded-xl bg-blue-500/5 p-4 text-sm space-y-2">
            <p>
              {s("نرخ‌های پیشنهادی مصرف", "Proposed usage rates")}:{" "}
              {money(hostingRates[region].cpuHour)} / vCPU·h ·{" "}
              {money(hostingRates[region].ramGBHour)} / GB·h ·{" "}
              {money(hostingRates[region].diskGBMonth)} / GB·month ·{" "}
              {money(hostingRates[region].trafficGB)} / GB
            </p>
            <p>
              {s(
                "برآورد زیر برای ۷۳۰ ساعت تخصیص منابع و ترافیک انتخابی است. صورتحساب واقعی بر اساس ساعت تخصیص CPU/RAM، فضای نگهداری‌شده و ترافیک مصرفی محاسبه می‌شود؛ توقف پردازش به‌تنهایی هزینه فضای باقی‌مانده را قطع نمی‌کند.",
                "The estimate assumes 730 allocation hours and selected traffic. Actual billing meters CPU/RAM allocation time, stored capacity and transferred traffic. Stopping compute alone does not stop storage charges.",
              )}
            </p>
          </div>
        )}
        {trial && (
          <p className="rounded-xl bg-emerald-500/10 p-4 text-sm">
            {s(
              "تست ۲۴ ساعته: یک حساب تاییدشده، یک بار، بدون تمدید یا برداشت خودکار. پس از پایان متوقف می‌شود؛ ایمیل خروجی و ارتقای منابع تا انتخاب سرویس پولی محدود است. فعال‌سازی به ظرفیت و تایید ارائه‌دهنده نیاز دارد.",
              "24-hour trial: one verified account, one use, no automatic billing or renewal. It stops at expiry; outbound email and upgrades are restricted until a paid plan is chosen. Activation requires provider capacity and approval.",
            )}
          </p>
        )}
        {!valid && (
          <p role="alert" className="text-destructive">
            {s(
              "منابع را در محدوده مجاز وارد کنید.",
              "Choose resources within the allowed limits.",
            )}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <div>
            <strong className="text-2xl">
              {trial ? s("رایگان", "Free") : money(amount)}
            </strong>
            <p className="text-xs text-muted-foreground mt-2">
              {trial
                ? s(
                    "صرفاً دوره تست، بدون خرید خودکار",
                    "Trial only, no automatic purchase",
                  )
                : s(
                    "برآورد پیش از مالیات ۱۰٪؛ نیازمند تایید قیمت",
                    "Estimate before 10% VAT; price confirmation required",
                  )}
            </p>
          </div>
          {inPanel && trial ? (
            <React.Suspense fallback={null}>
              <HostingTrialRequest location={region} workload={workload} country={country} datacenterId={datacenter} />
            </React.Suspense>
          ) : (
            <Button disabled={!valid||!validDatacenter(country,datacenter)} onClick={submit}>
              <ShoppingCart size={17} className="me-2" />
              {inPanel
                ? s("افزودن پیش‌نویس به سبد", "Add draft to cart")
                : s("ادامه سفارش در پنل", "Continue order in panel")}
            </Button>
          )}
        </div>
        <p role="status" className="text-sm">
          {message}
        </p>
        {message && onCart && (
          <Button variant="outline" onClick={onCart}>
            {s("مشاهده سبد خرید", "View cart")}
          </Button>
        )}
      </section>
    </div>
  );
}

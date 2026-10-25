import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Check,
  Cpu,
  Database,
  Globe,
  HardDrive,
  LayoutGrid,
  Timer,
} from "lucide-react";
import {
  countries,
  countryFromCategory,
  datacenters,
  validDatacenter,
} from "@/data/datacenters";
import {
  hostingCostLines,
  hostingEstimate,
  hostingPlans,
  hostingTrial,
  validHostingResources,
  type HostingResources,
} from "@/data/hostingCatalog";
import { useCart } from "@/contexts/CartContext";
import { panelOrderHref } from "@/data/publicCatalog";
import { normalizeDigits } from "@/lib/localized-number";
import { useSiteCopy } from "./site-copy";
import { DirectionArrow } from "./SiteLayout";

export default function PublicHostingOrder({ profile }: { profile: string }) {
  const { s, n, money } = useSiteCopy(),
    [params] = useSearchParams(),
    navigate = useNavigate(),
    { addItem } = useCart();
  const country = countryFromCategory(profile, "ir"),
    location = country === "ir" ? "ir" : "eu",
    trial = profile.includes("trial"),
    usage = profile.includes("usage"),
    custom = profile.includes("custom") || usage;
  const preset =
    hostingPlans.find((p) => p.id === params.get("plan")) || hostingPlans[0];
  const [planId, setPlanId] = useState<string>(custom ? "custom" : preset.id),
    [dc, setDc] = useState(""),
    [period, setPeriod] = useState("monthly"),
    [hours, setHours] = useState(730),
    [workload, setWorkload] = useState(
      profile.includes("wordpress")
        ? "wordpress"
        : profile.includes("windows")
          ? "windows"
          : "linux",
    ),
    [error, setError] = useState("");
  const [resources, setResources] = useState<HostingResources>({ ...preset });
  const [drafts, setDrafts] = useState<
    Partial<Record<keyof HostingResources, string>>
  >({});
  const selected = hostingPlans.find((p) => p.id === planId),
    editable = custom || planId === "custom",
    current = trial ? hostingTrial : resources;
  const valid =
    validHostingResources(current) &&
    Number.isFinite(hours) &&
    hours >= 0 &&
    hours <= 744;
  const monthly = !valid
    ? 0
    : editable
      ? hostingEstimate(current, location, usage ? hours : 730)
      : selected?.[location] || 0;
  const total = trial ? 0 : monthly * (period === "yearly" && !usage ? 12 : 1);
  const billing = trial ? "trial" : usage ? "usage" : period;
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid || !validDatacenter(country, dc)) {
      setError(
        s(
          "منابع و مرکز داده را بررسی کنید.",
          "Review your resources and datacenter.",
        ),
      );
      return;
    }
    if (trial) {
      navigate(
        panelOrderHref("order-hosting", {
          billing: "trial",
          country,
          location,
          datacenterId: dc,
          workload: workload === "wordpress" ? "wordpress" : "linux",
          plan: "trial",
        }),
      );
      return;
    }
    addItem({
      id: "hosting-" + Date.now(),
      type: "hosting",
      name: editable
        ? s("هاست سفارشی", "Custom hosting")
        : s(selected!.fa, selected!.en),
      price: total,
      period: usage
        ? s("برآورد ماهانهٔ مصرف", "Monthly usage estimate")
        : period === "yearly"
          ? s("سالانه", "Yearly")
          : s("ماهانه", "Monthly"),
      specs: [
        `${current.cpu} vCPU · ${current.ramGB} GB RAM · ${current.diskGB} GB NVMe`,
        `${current.trafficGB} GB · ${current.sites} ${s("وب‌سایت", "sites")}`,
        s(
          countries.find((c) => c.id === country)!.fa,
          countries.find((c) => c.id === country)!.en,
        ),
        workload,
      ],
      meta: {
        catalogId: editable ? "custom" : planId,
        location,
        country,
        datacenterId: dc,
        billing,
        estimatedAllocationHours: usage ? hours : undefined,
        resources: { ...current },
        workload,
        requiresQuote: true,
        pricingStatus: "proposal",
        metered: usage,
        inventoryVerified: false,
      },
    });
    navigate(panelOrderHref("cart"));
  }
  const fields = [
    ["cpu", s("پردازندهٔ مجازی", "Virtual CPU"), 1, 8, 1, "vCPU", Cpu],
    ["ramGB", s("حافظه", "Memory"), 0.5, 16, 0.5, "GB", Database],
    ["diskGB", s("فضای NVMe", "NVMe storage"), 0.5, 200, 0.5, "GB", HardDrive],
    [
      "trafficGB",
      s("ترافیک ماهانه", "Monthly transfer"),
      1,
      2000,
      1,
      "GB",
      Globe,
    ],
    [
      "sites",
      s("تعداد وب‌سایت", "Website count"),
      1,
      20,
      1,
      s("سایت", "sites"),
      LayoutGrid,
    ],
  ] as const;
  const costLines = valid
    ? hostingCostLines(current, location, usage ? hours : 730)
    : [];
  return (
    <form className="nv-hosting-config" onSubmit={submit}>
      <div className="nv-hosting-inputs">
        <div className="nv-section-heading">
          <div>
            <span className="nv-eyebrow">YOUR HOSTING WORKSPACE</span>
            <h2>
              {trial
                ? s("شروع با تست ۲۴ ساعته", "Start with a 24-hour trial")
                : editable
                  ? s(
                      "منابع را خودتان انتخاب کنید.",
                      "Choose the resources you need.",
                    )
                  : s(
                      "پلن و جزئیات میزبانی شما",
                      "Your hosting plan & details",
                    )}
            </h2>
          </div>
        </div>
        <div className="nv-hosting-options">
          {!trial && !custom && (
            <label>
              {s("پلن میزبانی", "Hosting plan")}
              <select
                value={planId}
                onChange={(e) => {
                  setPlanId(e.target.value);
                  setDrafts({});
                  const p = hostingPlans.find((p) => p.id === e.target.value);
                  if (p) setResources({ ...p });
                }}
              >
                {hostingPlans.map((p) => (
                  <option value={p.id} key={p.id}>
                    {s(p.fa, p.en)}
                  </option>
                ))}
                <option value="custom">
                  {s("منابع سفارشی", "Custom resources")}
                </option>
              </select>
            </label>
          )}
          <label>
            {s("مرکز داده در ", "Datacenter in ") +
              s(
                countries.find((c) => c.id === country)!.fa,
                countries.find((c) => c.id === country)!.en,
              )}
            <select
              aria-label={
                s("مرکز داده در ", "Datacenter in ") +
                s(
                  countries.find((c) => c.id === country)!.fa,
                  countries.find((c) => c.id === country)!.en,
                )
              }
              value={dc}
              onChange={(e) => setDc(e.target.value)}
              required
            >
              <option value="">
                {s("مرکز داده را انتخاب کنید", "Choose a datacenter")}
              </option>
              {datacenters
                .filter((d) => d.country === country)
                .map((d) => (
                  <option key={d.id} value={d.id}>
                    {s(d.fa, d.en)}
                  </option>
                ))}
            </select>
          </label>
          <label>
            {s("کاربری سایت", "Website workload")}
            <select
              value={workload}
              onChange={(e) => setWorkload(e.target.value)}
            >
              {[
                ["linux", "لینوکس", "Linux"],
                ["wordpress", "وردپرس", "WordPress"],
                ...(!trial
                  ? [
                      ["windows", "ویندوز", "Windows"],
                      ["python", "پایتون", "Python"],
                      ["nodejs", "نود جی‌اس", "Node.js"],
                    ]
                  : []),
              ].map(([id, fa, en]) => (
                <option key={id} value={id}>
                  {s(fa, en)}
                </option>
              ))}
            </select>
          </label>
          {!trial && !usage && (
            <label>
              {s("دورهٔ پرداخت", "Billing period")}
              <select
                aria-label={s("دورهٔ پرداخت", "Billing period")}
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="monthly">{s("ماهانه", "Monthly")}</option>
                <option value="yearly">{s("سالانه", "Yearly")}</option>
              </select>
            </label>
          )}
        </div>
        <div className="nv-resource-inputs">
          {fields.map(([key, label, min, max, step, unit, Icon]) => (
            <div key={key} className="nv-resource-row">
              <div>
                <Icon size={17} />
                <label htmlFor={"nv-resource-" + key}>{label}</label>
                <span>
                  {n(current[key])} {unit}
                </span>
              </div>
              {editable && !trial ? (
                <div className="nv-resource-controls">
                  <input
                    type="range"
                    aria-label={label + s("؛ لغزنده", " slider")}
                    min={min}
                    max={max}
                    step={step}
                    value={current[key]}
                    onChange={(e) => {
                      setResources({
                        ...current,
                        [key]: Number(e.target.value),
                      });
                      setDrafts({ ...drafts, [key]: undefined });
                    }}
                  />
                  <input
                    id={"nv-resource-" + key}
                    type="text"
                    inputMode="decimal"
                    value={
                      drafts[key] ??
                      (Number.isFinite(current[key]) ? n(current[key]) : "")
                    }
                    aria-label={label}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setDrafts({ ...drafts, [key]: raw });
                      setResources({
                        ...current,
                        [key]: raw.trim()
                          ? Number(normalizeDigits(raw).replace("٫", "."))
                          : NaN,
                      });
                    }}
                    onBlur={() => setDrafts({ ...drafts, [key]: undefined })}
                  />
                </div>
              ) : (
                <p>{s("در این پلن مشخص شده است.", "Included in this plan.")}</p>
              )}
            </div>
          ))}
        </div>
        {usage && (
          <label className="nv-hours-label">
            <Timer size={17} />
            {s(
              "ساعت تخصیص در برآورد ماهانه",
              "Allocation hours in the monthly estimate",
            )}
            <input
              type="number"
              min={0}
              max={744}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
          </label>
        )}
        {!valid && (
          <p role="alert" className="text-sm text-red-600">
            {s(
              "منابع باید در محدودهٔ مجاز باشند و ساعت بین صفر تا ۷۴۴ باشد.",
              "Resources must be within the allowed limits, with hours between 0 and 744.",
            )}
          </p>
        )}
        <p className="nv-reference-note">
          {trial
            ? s(
                "تست کم‌منبع، یک بار برای هر حساب و پس از تأیید ارائه‌دهنده فعال می‌شود. ثبت درخواست، فعال‌سازی فوری نیست.",
                "This low-resource trial can be requested once per account and requires provider approval. Requesting it does not activate a device.",
              )
            : s(
                "موقعیت‌ها و تعرفه‌ها مرجع پیشنهادی‌اند؛ ظرفیت، لایسنس و قیمت نهایی پیش از پرداخت تأیید می‌شوند.",
                "Locations and tariffs are proposed references. Capacity, licensing and final pricing are confirmed before payment.",
              )}
        </p>
      </div>
      <aside className="nv-order-summary">
        <span className="nv-icon nv-blue">
          <HardDrive />
        </span>
        <h2>{s("خلاصهٔ انتخاب شما", "Your configuration")}</h2>
        <p>
          {s(
            countries.find((c) => c.id === country)!.fa,
            countries.find((c) => c.id === country)!.en,
          )}{" "}
          ·{" "}
          {trial
            ? s("تست ۲۴ ساعته", "24-hour trial")
            : usage
              ? s("پرداخت مصرفی", "Usage-based")
              : period === "yearly"
                ? s("سالانه", "Yearly")
                : s("ماهانه", "Monthly")}
        </p>
        {!trial && (
          <div className="nv-cost-breakdown">
            {(editable ? costLines : [{ key: "plan", total: monthly }]).map(
              (line) => (
                <div key={line.key}>
                  <span>
                    {s(
                      (
                        {
                          cpu: "پردازنده",
                          ramGB: "حافظه",
                          diskGB: "ذخیره‌سازی",
                          trafficGB: "ترافیک",
                          sites: "سایت اضافه",
                          plan: "پلن",
                        } as Record<string, string>
                      )[line.key] || line.key,
                      (
                        {
                          cpu: "Compute",
                          ramGB: "Memory",
                          diskGB: "Storage",
                          trafficGB: "Transfer",
                          sites: "Extra sites",
                          plan: "Plan",
                        } as Record<string, string>
                      )[line.key] || line.key,
                    )}
                  </span>
                  <bdi>
                    {money(
                      line.total * (period === "yearly" && !usage ? 12 : 1),
                    )}
                  </bdi>
                </div>
              ),
            )}
          </div>
        )}
        <div className="nv-price">
          {trial
            ? s("بدون هزینهٔ تست", "No trial charge")
            : valid
              ? money(total)
              : "—"}
          <small>
            {trial
              ? s(
                  "فعال‌سازی پس از تأیید ظرفیت",
                  "Activation subject to capacity approval",
                )
              : s(
                  "برآورد اولیه؛ مالیات در پیش‌فاکتور",
                  "Initial estimate; tax shown on the proforma",
                )}
          </small>
        </div>
        <button type="submit" className="nv-button" disabled={!valid}>
          {trial
            ? s("ورود و درخواست تست", "Sign in & request trial")
            : s("ادامهٔ سفارش", "Continue order")}
          <DirectionArrow />
        </button>
        {error && (
          <p role="alert" className="text-red-600 text-sm">
            {error}
          </p>
        )}
        <p className="nv-summary-note">
          <ShieldCheckIcon />
          {s(
            "قیمت قطعی و امکان ارائه پیش از پرداخت تأیید می‌شود.",
            "Final pricing and availability are confirmed before payment.",
          )}
        </p>
      </aside>
    </form>
  );
}
function ShieldCheckIcon() {
  return <Check size={14} />;
}

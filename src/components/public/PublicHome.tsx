import { locationHref } from "@/lib/public-location";
import CountryFlag from "./CountryFlag";
import { WorkloadShowcase } from "./PublicExperience";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Layers3,
  Network,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";
import SiteLayout, {
  DirectionArrow,
  FamilyIcon,
  PricingNote,
  SectionHeading,
  ServiceCta,
} from "./SiteLayout";
import { useSiteCopy } from "./site-copy";
import { publicFamilies, publicFaqs } from "@/data/publicCatalog";
import { virtualPlans } from "@/data/vpsCatalog";
import { hostingPlans } from "@/data/hostingCatalog";
import { countries } from "@/data/datacenters";
import { knowledgeArticles } from "@/data/knowledgeArticles";
import { validDomain, canonicalDomain } from "@/lib/panel-model";

export function InfrastructureArt() {
  const { s } = useSiteCopy();
  return (
    <div
      className="nv-hero-art"
      role="img"
      aria-label={s(
        "تصویر مفهومی اتصال سرور، شبکه و فضای ذخیره‌سازی",
        "Conceptual illustration of connected compute, network and storage",
      )}
    >
      <svg viewBox="0 0 560 445" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id="nv-top"
            x1="170"
            y1="50"
            x2="420"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e3efff" />
            <stop offset="1" stopColor="#bfd6ff" />
          </linearGradient>
          <linearGradient
            id="nv-left"
            x1="170"
            y1="200"
            x2="340"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5a8af0" />
            <stop offset="1" stopColor="#2459d5" />
          </linearGradient>
          <linearGradient
            id="nv-right"
            x1="330"
            y1="140"
            x2="430"
            y2="350"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2a5ec8" />
            <stop offset="1" stopColor="#133d91" />
          </linearGradient>
          <filter id="nv-shadow">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <ellipse
          cx="288"
          cy="370"
          rx="166"
          ry="22"
          fill="#92b4e3"
          opacity=".25"
          filter="url(#nv-shadow)"
        />
        <ellipse
          cx="280"
          cy="271"
          rx="253"
          ry="129"
          stroke="#dce7f7"
          strokeDasharray="5 8"
        />
        <ellipse cx="280" cy="271" rx="202" ry="101" stroke="#d5e3f7" />
        <path
          d="M54 274H115L158 315H213M357 319H404L450 273H504M277 76V114"
          stroke="#a4c0ee"
          strokeWidth="1.5"
          strokeDasharray="5 7"
        />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${i * 65})`}>
            <path
              d="m166 133 121-65 122 65-122 66-121-66Z"
              fill="url(#nv-top)"
              stroke="#edf4ff"
            />
            <path d="m166 133 121 66v58l-121-67v-57Z" fill="url(#nv-left)" />
            <path d="m287 199 122-66v57l-122 67v-58Z" fill="url(#nv-right)" />
            <path
              d="m185 159 75 41"
              stroke="#b7d5ff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity=".7"
            />
            <path
              d="m185 176 47 25"
              stroke="#98bbf8"
              strokeWidth="3"
              strokeLinecap="round"
              opacity=".7"
            />
            <circle cx="386" cy="173" r="3" fill="#65e6c8" />
            <circle cx="373" cy="180" r="3" fill="#79b1ff" />
          </g>
        ))}
        <path d="m241 135 45-24 44 24-44 24-45-24Z" fill="#fff" opacity=".7" />
        <path
          d="m264 135 12 7v-18l23 31v-30l11 6"
          stroke="#3168d8"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <circle
          cx="54"
          cy="274"
          r="8"
          fill="#fff"
          stroke="#6290df"
          strokeWidth="2"
        />
        <circle
          cx="504"
          cy="274"
          r="7"
          fill="#fff"
          stroke="#6290df"
          strokeWidth="2"
        />
        <circle
          className="nv-orbit-point"
          cx="448"
          cy="365"
          r="7"
          fill="#56c9b5"
        />
        <circle
          className="nv-orbit-point"
          cx="103"
          cy="204"
          r="5"
          fill="#7b9de6"
        />
        <circle
          cx="277"
          cy="76"
          r="8"
          fill="#edf5ff"
          stroke="#a3bfe9"
          strokeWidth="2"
        />
      </svg>
      <span className="nv-art-tag">
        <Cpu size={17} /> COMPUTE / NVMe
      </span>
      <span className="nv-art-tag">
        <Network size={17} /> CONNECTED BY DESIGN
      </span>
    </div>
  );
}

export function PublicPlanCards({
  kind = "vps",
}: {
  kind?: "vps" | "hosting" | "dedicated";
}) {
  const { s, n, money } = useSiteCopy();
  if (kind === "dedicated")
    return (
      <div className="nv-feature-grid">
        <article className="nv-feature">
          <span className="nv-icon nv-violet">
            <Cpu />
          </span>
          <h3>{s("سخت‌افزار اختصاصی ایران", "Dedicated hardware in Iran")}</h3>
          <p>
            {s(
              "مدل و نسل، تعداد پردازنده، ماژول‌های حافظه و نوع دیسک را برای بررسی انتخاب کنید. خانواده‌های DL360 و DL380 در کاتالوگ مرجع قرار دارند.",
              "Choose a model, generation, CPU count, memory modules and drive type for review. The reference catalog includes DL360 and DL380 families.",
            )}
          </p>
          <Link to="/dedicated-plans" className="nv-text-link">
            {s("بررسی پیکربندی", "Review configurations")}
            <DirectionArrow />
          </Link>
          <div className="nv-reference-note">
            {s(
              "پروفایل مرجع؛ موجودی و سازگاری دستگاه باید تأیید شود.",
              "Reference profiles; device stock and compatibility need verification.",
            )}
          </div>
        </article>
        <article className="nv-feature">
          <span className="nv-icon nv-blue">
            <Globe />
          </span>
          <h3>{s("پلن ثابت خارج از ایران", "Fixed international plans")}</h3>
          <p>
            {s(
              "کشور و پلن تأمین‌کننده را انتخاب کنید. ترکیب منابع پلن خارجی ثابت است و قیمت ارزی با نرخ مرجع به تومان برآورد می‌شود.",
              "Choose a country and supplier plan. International resource bundles are fixed; foreign-currency pricing is estimated in Toman using reference FX.",
            )}
          </p>
          <Link
            to="/dedicated-plans?profile=order-dedicated-country-de"
            className="nv-text-link"
          >
            {s("مشاهدهٔ پلن‌ها", "Explore plans")}
            <DirectionArrow />
          </Link>
          <div className="nv-reference-note">
            {s(
              "نمونهٔ نمایشی تأمین‌کننده؛ موجودی و قیمت فروش تأیید نشده است.",
              "Supplier demonstrations; stock and sale prices are unverified.",
            )}
          </div>
        </article>
      </div>
    );
  const plans =
    kind === "hosting"
      ? hostingPlans.map((p) => ({
          id: p.id,
          name: s(p.fa, p.en),
          cpu: p.cpu,
          ram: p.ramGB,
          disk: p.diskGB,
          price: p.ir,
          detail: n(p.sites) + " " + s("وب‌سایت", "websites"),
          href:
            "/hosting-plans?plan=" + p.id + "&profile=order-hosting-linux-ir",
        }))
      : virtualPlans.slice(0, 4).map((p) => ({
          id: p.id,
          name: p.name,
          cpu: p.cpu,
          ram: p.ram,
          disk: p.disk,
          price: p.price,
          detail:
            s(
              p.bandwidth,
              p.bandwidth
                .replace(/[۰-۹]/g, (v) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(v)))
                .replace("گیگ", "GB")
                .replace("ترابایت", "TB"),
            ) +
            " " +
            s("ترافیک", "transfer"),
          href: "/vps-plans?profile=order-vps-linux-ir",
        }));
  return (
    <div className="nv-plan-grid">
      {plans.map((p, i) => (
        <article
          key={p.id}
          className={"nv-plan " + (i === 1 ? "nv-plan-featured" : "")}
        >
          {i === 1 && (
            <span className="nv-plan-label">
              {s("برای شروع رشد", "Room to grow")}
            </span>
          )}
          <h3>{n(p.name)}</h3>
          <p className="nv-plan-kind">
            {kind === "hosting"
              ? s("هاست لینوکس ایران", "Iran Linux hosting")
              : s("سرور مجازی لینوکس", "Linux virtual server")}
          </p>
          <div className="nv-price">
            {money(p.price)}
            <small>
              {s(
                "برآورد ماهانه · پیش از مالیات",
                "Monthly estimate · before tax",
              )}
            </small>
          </div>
          <ul>
            <li>
              <Check size={15} />
              {n(p.cpu)} {s("پردازندهٔ مجازی", "vCPU")}
            </li>
            <li>
              <Check size={15} />
              {n(p.ram)} GB {s("حافظه", "memory")}
            </li>
            <li>
              <Check size={15} />
              {n(p.disk)} GB {s("فضای ذخیره‌سازی", "storage")}
            </li>
            <li>
              <Check size={15} />
              {n(p.detail)}
            </li>
          </ul>
          <Link
            className={"nv-button " + (i === 1 ? "" : "nv-button-outline")}
            to={p.href}
          >
            {s("بررسی و پیکربندی", "Review & configure")}
            <DirectionArrow size={14} />
          </Link>
        </article>
      ))}
    </div>
  );
}
export function FaqList({ limit = publicFaqs.length }: { limit?: number }) {
  const { s } = useSiteCopy();
  return (
    <div className="nv-faq">
      {publicFaqs.slice(0, limit).map(([f, en, answer, english]) => (
        <details key={en}>
          <summary>{s(f, en)}</summary>
          <p>{s(answer, english)}</p>
        </details>
      ))}
    </div>
  );
}

export default function PublicHome() {
  const { s, text, n, fa } = useSiteCopy(),
    navigate = useNavigate(),
    [domain, setDomain] = useState(""),
    [error, setError] = useState(""),
    [plan, setPlan] = useState<"vps" | "hosting" | "dedicated">("vps");
  function searchDomain(e: FormEvent) {
    e.preventDefault();
    if (!validDomain(domain)) {
      setError(
        s(
          "نام کامل دامنه را وارد کنید؛ مانند example.com",
          "Enter a full domain, such as example.com.",
        ),
      );
      return;
    }
    navigate("/domain?domain=" + encodeURIComponent(canonicalDomain(domain)));
  }
  return (
    <SiteLayout
      title={s("میزبانی ایده‌های بزرگ شما", "A home for your next big idea")}
      description={s(
        "سرور مجازی و اختصاصی، هاست سفارشی، دامنه و خدمات مدیریت‌شده؛ تمام انتخاب‌های نوین وی‌دی‌اس در یک مسیر روشن.",
        "Virtual and dedicated servers, custom hosting, domains and managed services. Explore the complete NovinVDS catalog.",
      )}
    >
      <section className="nv-hero">
        <div className="nv-container">
          <div className="nv-hero-grid">
            <div className="nv-hero-copy">
              <span className="nv-eyebrow">
                {s(
                  "نوین وی‌دی‌اس / برای آنچه می‌سازید",
                  "NOVINVDS / BUILT AROUND YOUR NEXT IDEA",
                )}
              </span>
              <h1>
                {s("ایدهٔ شما،", "Your next big idea.")}
                <br />
                <span>{s("روی زیرساخت نوین.", "Your own space to grow.")}</span>
              </h1>
              <p>
                {s(
                  "برای اولین سایت، پروژهٔ در حال رشد یا یک زیرساخت اختصاصی؛ سرویس متناسب با نیازتان را انتخاب کنید و همه‌چیز را از یک پنل مدیریت کنید.",
                  "Your first website, a growing application or dedicated infrastructure. Find the right fit and manage your services from one place.",
                )}
              </p>
              <div className="nv-button-row">
                <Link to="/services" className="nv-button">
                  {s("سرویس خود را پیدا کنید", "Find your service")}
                  <DirectionArrow />
                </Link>
                <Link to="/calculator" className="nv-button nv-button-outline">
                  <SlidersHorizontal size={17} />
                  {s("محاسبهٔ منابع دلخواه", "Build your configuration")}
                </Link>
              </div>
              <div className="nv-hero-note">
                <ShieldCheck size={16} />
                {s(
                  "انتخاب روشن، جزئیات هزینه، مدیریت یکپارچه",
                  "Clear choices. Itemized estimates. One client area.",
                )}
              </div>
            </div>
            <InfrastructureArt />
          </div>
          <div className="nv-hero-ribbon">
            <div>
              <Globe />
              {s(
                "انتخاب ایران و خارج از ایران",
                "Iran & international locations",
              )}
            </div>
            <div>
              <Layers3 />
              {s("پلن آماده یا منابع سفارشی", "Ready-made or custom resources")}
            </div>
            <div>
              <Sparkles />
              {s(
                "تست هاست ۲۴ ساعته با تأیید ظرفیت",
                "24-hour hosting trial, subject to capacity",
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="nv-domain-strip">
        <div className="nv-container nv-domain-inner">
          <div className="nv-domain-title">
            {s("نام ایده‌تان را انتخاب کنید.", "Give your idea a name.")}
          </div>
          <form className="nv-domain-form" onSubmit={searchDomain}>
            <input
              type="text"
              dir="ltr"
              aria-label={s("جستجوی نام دامنه", "Search a domain name")}
              placeholder="your-next-idea.com"
              value={domain}
              maxLength={253}
              onChange={(e) => {
                setDomain(e.target.value);
                setError("");
              }}
              required
            />
            <button className="nv-button nv-button-small" type="submit">
              {s("بررسی دامنه", "Explore domain")}
              <DirectionArrow size={14} />
            </button>
          </form>
          <div className="nv-domain-extensions">
            <b>.com</b>
            <span>.ir</span>
            <span>.net</span>
          </div>
        </div>
        {error && (
          <p role="alert" className="nv-container text-sm text-red-600 pb-4">
            {error}
          </p>
        )}
      </section>
      <WorkloadShowcase />
      <section className="nv-section">
        <div className="nv-container">
          <SectionHeading
            eyebrow="FIND YOUR FOUNDATION"
            title={s(
              "هر ایده، زیرساخت خودش را می‌خواهد.",
              "Every idea needs the right foundation.",
            )}
            description={s(
              "از میزبانی ساده تا سخت‌افزار اختصاصی؛ مجموعه‌ای که همراه با نیاز شما شکل می‌گیرد.",
              "From straightforward hosting to dedicated hardware. A toolkit shaped around what you are building.",
            )}
            action={
              <Link className="nv-text-link" to="/services">
                {s("همهٔ خدمات", "All services")}
                <DirectionArrow />
              </Link>
            }
          />
          <div className="nv-service-grid">
            {publicFamilies.map((f) => (
              <Link to={f.path} key={f.id} className="nv-service-card">
                <span className={"nv-icon nv-" + f.color}>
                  <FamilyIcon family={f.id} />
                </span>
                <small>{f.tag}</small>
                <h3>{text(f.title)}</h3>
                <p>{text(f.description)}</p>
                <span className="nv-text-link">
                  {s("کشف این سرویس", "Explore this service")}
                  <DirectionArrow size={14} />
                </span>
              </Link>
            ))}
            <Link to="/calculator" className="nv-service-card nv-custom-card">
              <span className="nv-icon">
                <SlidersHorizontal />
              </span>
              <small>MADE FOR YOU</small>
              <h3>{s("دقیقاً به اندازهٔ نیازتان.", "Make it your own.")}</h3>
              <p>
                {s(
                  "منابع را خودتان تنظیم کنید و برآورد هزینه را همان لحظه ببینید.",
                  "Choose the resources you need and see the estimate as you go.",
                )}
              </p>
              <span className="nv-text-link">
                {s("ساخت پیکربندی", "Build a configuration")}
                <DirectionArrow size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="nv-section nv-section-soft">
        <div className="nv-container">
          <SectionHeading
            eyebrow="A CLEARER START"
            title={s(
              "از یک انتخاب روشن شروع کنید.",
              "Start with a clear choice.",
            )}
            description={s(
              "چند نقطهٔ شروع از کاتالوگ مشترک سایت و پنل؛ منابع و جزئیات کامل را پیش از سفارش بررسی کنید.",
              "Starting points from the catalog shared by the website and client area. Review the full resources and details before ordering.",
            )}
          />
          <div
            className="nv-tabs"
            role="tablist"
            aria-label={s("مقایسهٔ خدمات", "Compare services")}
            onKeyDown={(event) => {
              const ids = ["vps", "hosting", "dedicated"] as const;
              let next = ids.indexOf(plan);
              if (event.key === "Home") next = 0;
              else if (event.key === "End") next = ids.length - 1;
              else if (event.key === "ArrowRight") next += fa ? -1 : 1;
              else if (event.key === "ArrowLeft") next += fa ? 1 : -1;
              else return;
              event.preventDefault();
              const id = ids[(next + ids.length) % ids.length];
              setPlan(id);
              document.getElementById("nv-plan-tab-" + id)?.focus();
            }}
          >
            {(["vps", "hosting", "dedicated"] as const).map((id) => (
              <button
                key={id}
                role="tab"
                id={"nv-plan-tab-" + id}
                aria-selected={plan === id}
                tabIndex={plan === id ? 0 : -1}
                aria-controls="nv-plan-content"
                onClick={() => setPlan(id)}
              >
                {text(publicFamilies.find((f) => f.id === id)!.title)}
              </button>
            ))}
          </div>
          <div
            id="nv-plan-content"
            role="tabpanel"
            aria-labelledby={"nv-plan-tab-" + plan}
          >
            <PublicPlanCards kind={plan} />
          </div>
          <PricingNote />
        </div>
      </section>
      <section className="nv-section">
        <div className="nv-container">
          <div className="nv-feature-grid">
            <article className="nv-feature">
              <span className="nv-icon nv-teal">
                <SlidersHorizontal />
              </span>
              <h3>
                {s(
                  "با نیازتان شروع کنید. با رشدتان ادامه دهید.",
                  "Start with your needs. Grow from there.",
                )}
              </h3>
              <p>
                {s(
                  "برای هاست و VPS، منابع دلخواهتان را انتخاب کنید. هاست فعال هم می‌تواند پس از تأیید ارائه‌دهنده با محاسبهٔ مابه‌التفاوت زمان باقی‌مانده ارتقا پیدا کند.",
                  "Choose your own hosting and VPS resources. Active hosting can request an upgrade with a provider-verified difference for the remaining billing period.",
                )}
              </p>
              <Link to="/calculator" className="nv-text-link">
                {s("ساخت سرویس سفارشی", "Build a custom service")}
                <DirectionArrow />
              </Link>
              <ul>
                <li>
                  <Check size={16} />
                  {s(
                    "پردازنده، حافظه و فضای قابل انتخاب",
                    "Choose compute, memory and storage",
                  )}
                </li>
                <li>
                  <Check size={16} />
                  {s(
                    "نمایش جزءبه‌جزء برآورد هزینه",
                    "See an itemized cost estimate",
                  )}
                </li>
              </ul>
            </article>
            <article className="nv-feature">
              <span className="nv-icon nv-blue">
                <Layers3 />
              </span>
              <h3>
                {s(
                  "ابزار آشنا. انتخاب‌های بیشتر.",
                  "Familiar tools. More possibilities.",
                )}
              </h3>
              <p>
                {s(
                  "خانوادهٔ سیستم‌عامل، توزیع و نسخه را انتخاب کنید؛ سپس کنترل‌پنل و افزونهٔ سازگار را بررسی کنید. درخواست نصب و لایسنس متناسب با سرویس تأیید می‌شود.",
                  "Choose an operating system family, distribution and version. Then explore compatible control panels and add-ons, with installation and licensing verified for your service.",
                )}
              </p>
              <Link to="/addons" className="nv-text-link">
                {s("کنترل‌پنل‌ها و افزونه‌ها", "Control panels & add-ons")}
                <DirectionArrow />
              </Link>
              <div className="nv-os-tags">
                <span>Ubuntu</span>
                <span>Windows</span>
                <span>Debian</span>
                <span>aaPanel</span>
                <span>cPanel</span>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="nv-location-section">
        <div className="nv-container">
          <SectionHeading
            eyebrow="CLOSER TO YOUR AUDIENCE"
            title={s(
              "جایی نزدیک‌تر به مخاطب شما.",
              "Closer to the people you serve.",
            )}
            description={s(
              "کشور و مرکز داده را در مسیر انتخاب سرویس بررسی کنید؛ ایران و موقعیت‌های بین‌المللی در کاتالوگ حضور دارند.",
              "Explore countries and datacenters as you choose your service. The catalog includes Iran and international locations.",
            )}
            action={
              <Link to="/datacenter" className="nv-text-link text-blue-200">
                {s("بررسی موقعیت‌ها", "Explore locations")}
                <DirectionArrow />
              </Link>
            }
          />
          <div className="nv-country-list">
            {countries.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                className="nv-country-link"
                to={locationHref(c.id)}
              >
                <span aria-hidden="true">
                  <CountryFlag code={c.id} />
                </span>
                <span>{s(c.fa, c.en)}</span>
              </Link>
            ))}
          </div>
          <p className="nv-location-note">
            {s(
              "موقعیت‌ها مرجع کاتالوگ هستند؛ ظرفیت و امکان ارائه برای هر سرویس جداگانه تأیید می‌شود.",
              "Locations are catalog references. Capacity and availability are verified separately for each service.",
            )}
          </p>
        </div>
      </section>
      <section className="nv-section">
        <div className="nv-container">
          <SectionHeading
            eyebrow="LEARN. BUILD. GROW."
            title={s(
              "انتخاب بهتر، با شناخت بیشتر.",
              "Better decisions start with understanding.",
            )}
            action={
              <Link to="/blog" className="nv-text-link">
                {s("بلاگ و آموزش", "Blog & guides")}
                <DirectionArrow />
              </Link>
            }
          />
          <div className="nv-article-grid">
            {knowledgeArticles.slice(0, 3).map((a, i) => (
              <Link to={"/blog/" + a.id} key={a.id} className="nv-article">
                <div className="nv-article-art">
                  {i === 0 ? (
                    <Layers3 size={54} />
                  ) : i === 1 ? (
                    <Cpu size={54} />
                  ) : (
                    <BookOpen size={54} />
                  )}
                </div>
                <div className="nv-article-body">
                  <small>
                    {s("راهنمای انتخاب", "A practical guide")} · {n(a.minutes)}{" "}
                    {s("دقیقه مطالعه", "min read")}
                  </small>
                  <h3>{text(a.title)}</h3>
                  <p>{text(a.summary)}</p>
                  <span className="nv-text-link">
                    {s("مطالعهٔ راهنما", "Read the guide")}
                    <DirectionArrow size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="nv-section nv-section-soft">
        <div className="nv-container">
          <SectionHeading
            title={s(
              "پیش از شروع، بیشتر بدانید.",
              "A few things to know before you start.",
            )}
            action={
              <Link className="nv-text-link" to="/faq">
                {s("همهٔ پرسش‌ها", "All questions")}
                <DirectionArrow />
              </Link>
            }
          />
          <FaqList limit={4} />
        </div>
      </section>
      <div className="nv-section pb-0">
        <ServiceCta />
      </div>
    </SiteLayout>
  );
}

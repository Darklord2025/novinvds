import CountryFlag from "./CountryFlag";
import { offerCountry } from "@/data/publicGeography";
import OfferExplorer from "./OfferExplorer";
import PublicNetwork from "./PublicNetwork";
import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  Check,
  Headphones,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import SiteLayout, {
  DirectionArrow,
  FamilyIcon,
  PageHero,
  PricingNote,
  SectionHeading,
  ServiceCta,
} from "./SiteLayout";
import {
  publicFamilies,
  publicVariants,
  variantsFor,
  panelOrderHref,
  type PublicFamily,
  type PublicVariant,
} from "@/data/publicCatalog";
import { serviceAddons, addonCategories } from "@/data/serviceAddons";
import { useSiteCopy } from "./site-copy";
import { FaqList, PublicPlanCards } from "./PublicHome";

export function VariantLinks({ items }: { items: PublicVariant[] }) {
  const { text } = useSiteCopy();
  return (
    <div className="nv-variant-grid">
      {items.map((v) => (
        <Link to={v.href} key={v.id} className="nv-variant">
          <span
            className={
              "nv-icon nv-" +
              publicFamilies.find((f) => f.id === v.family)!.color
            }
          >
            {offerCountry(v) ? (
              <CountryFlag code={offerCountry(v)} />
            ) : (
              <FamilyIcon family={v.family} size={19} />
            )}
          </span>
          <span>{text(v.title)}</span>
          <DirectionArrow size={15} />
        </Link>
      ))}
    </div>
  );
}
export function PublicServices() {
  const { s, text } = useSiteCopy(),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState("");
  const rows = publicVariants.filter((v) =>
    (text(v.title) + " " + v.id)
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <SiteLayout title={s("خدمات نوین وی‌دی‌اس", "NovinVDS services")}>
      <PageHero
        eyebrow="FIND YOUR FIT"
        title={s(
          "انتخاب درست، قدم به قدم.",
          "Find your fit. One step at a time.",
        )}
        description={s(
          "اول سرویس را انتخاب کنید، سپس منطقه و کشور را ببینید.",
          "Choose a service first, then explore its regions and countries.",
        )}
      />
      <section className="nv-section">
        <div className="nv-container">
          <div className="nv-search mb-7">
            <Search size={18} />
            <input
              aria-label={s("جستجوی خدمات", "Search services")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={s(
                "دنبال چه سرویسی هستید؟",
                "What are you looking for?",
              )}
            />
          </div>
          {query ? (
            <div className="nv-search-results">
              {publicFamilies.map((f) => {
                const group = rows.filter((v) => v.family === f.id);
                return (
                  !!group.length && (
                    <section key={f.id}>
                      <h2>{text(f.title)}</h2>
                      <VariantLinks items={group} />
                    </section>
                  )
                );
              })}
              {!rows.length && (
                <p>{s("نتیجه‌ای پیدا نشد.", "No results found.")}</p>
              )}
            </div>
          ) : (
            <>
              <div
                className="nv-family-picker"
                role="group"
                aria-label={s("دسته‌بندی خدمات", "Service categories")}
              >
                {publicFamilies.map((f) => (
                  <button
                    type="button"
                    key={f.id}
                    aria-pressed={selected === f.id}
                    onClick={() => setSelected(f.id)}
                  >
                    <span className={"nv-icon nv-" + f.color}>
                      <FamilyIcon family={f.id} />
                    </span>
                    <strong>{text(f.title)}</strong>
                  </button>
                ))}
              </div>
              {selected && (
                <div className="mt-8">
                  {["vps", "hosting", "dedicated"].includes(selected) ? (
                    <OfferExplorer
                      key={selected}
                      items={publicVariants.filter(
                        (v) => v.family === selected,
                      )}
                    />
                  ) : (
                    <Link
                      className="nv-button"
                      to={publicFamilies.find((f) => f.id === selected)!.path}
                    >
                      {s("مشاهده خدمات این بخش", "Explore this category")}
                      <DirectionArrow />
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <ServiceCta />
    </SiteLayout>
  );
}

export function AddonProducts({
  networkOnly = false,
}: {
  networkOnly?: boolean;
}) {
  const { s, n, money } = useSiteCopy(),
    route = useLocation(),
    [params] = useSearchParams(),
    [category, setCategory] = useState(() =>
      route.pathname === "/license"
        ? "panel"
        : Object.prototype.hasOwnProperty.call(
              addonCategories,
              params.get("category") || "",
            )
          ? params.get("category")!
          : "all",
    );
  const names: Record<string, readonly [string, string]> = {
    "backup-50": ["پشتیبان‌گیری ۵۰ گیگابایت", "50 GB backup"],
    "backup-100": ["پشتیبان‌گیری ۱۰۰ گیگابایت", "100 GB backup"],
    "extra-ip": ["آی‌پی IPv4 اضافه", "Additional IPv4"],
    managed: ["پشتیبانی مدیریت‌شده", "Managed support"],
    monitoring: ["مانیتورینگ", "Monitoring"],
    malware: ["بررسی بدافزار", "Malware scanning"],
  };
  const rows = serviceAddons.filter((a) =>
    networkOnly
      ? a.category === "network"
      : category === "all" || a.category === category,
  );
  return (
    <>
      {!networkOnly && (
        <div
          className="nv-filter-buttons mb-7"
          role="group"
          aria-label={s("دسته‌بندی افزونه", "Add-on categories")}
        >
          <button
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            {s("همه", "All")}
          </button>
          {Object.entries(addonCategories).map(([id, title]) => (
            <button
              key={id}
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
            >
              {s(title[0], title[1])}
            </button>
          ))}
        </div>
      )}
      <div className="nv-addons-grid">
        {rows.map((a) => (
          <article key={a.id}>
            <span className="nv-icon nv-violet">
              {a.category === "network" ? (
                <Network />
              ) : a.category === "management" ? (
                <Headphones />
              ) : (
                <Layers3 />
              )}
            </span>
            <h3>{names[a.id] ? s(...names[a.id]) : a.name}</h3>
            <p>
              {s(
                "انتخاب برای سرویس سازگار؛ نوع لایسنس، هزینهٔ نصب و محدودهٔ ارائه پیش از سفارش بررسی می‌شود.",
                "Choose for a compatible service. Licensing, installation fees and delivery scope are reviewed before ordering.",
              )}
            </p>
            <div className="nv-price">
              {a.price
                ? money(a.price)
                : s("بدون هزینهٔ لایسنس", "No license fee")}
              <small>
                {a.price
                  ? s("تعرفهٔ پیشنهادی", "Proposed tariff")
                  : s(
                      "هزینهٔ نصب احتمالی جداگانه بررسی می‌شود",
                      "Any installation fee is reviewed separately",
                    )}
                {a.price
                  ? " · " +
                    s(a.period, a.period === "یکبار" ? "one-time" : "monthly")
                  : ""}
              </small>
            </div>
            <Link
              className="nv-button nv-button-outline"
              to={panelOrderHref("order-modules")}
            >
              {s("انتخاب سرویس و ادامه", "Choose a service & continue")}
              <DirectionArrow size={14} />
            </Link>
          </article>
        ))}
      </div>
      <PricingNote />
    </>
  );
}

export function PublicProduct({ family }: { family: PublicFamily }) {
  const { s, text } = useSiteCopy(),
    [query, setQuery] = useState(""),
    [expanded, setExpanded] = useState(false);
  const f = publicFamilies.find((f) => f.id === family)!;
  if (family === "network") return <PublicNetwork />;
  const all = variantsFor(family).filter((v) =>
      text(v.title).toLowerCase().includes(query.toLowerCase().trim()),
    ),
    items = expanded || query ? all : all.slice(0, 12);
  const cta =
    family === "vps"
      ? "/vps-plans"
      : family === "dedicated"
        ? "/dedicated-plans"
        : family === "hosting"
          ? "/hosting-plans"
          : panelOrderHref(
              family === "support" ? "order-support" : "order-modules",
            );
  return (
    <SiteLayout title={text(f.title)} description={text(f.description)}>
      <PageHero
        eyebrow={f.tag + " / NOVINVDS"}
        title={
          family === "vps"
            ? s("فضای اجرای ایده‌های شما.", "A place to run your next idea.")
            : family === "hosting"
              ? s(
                  "خانه‌ای برای رشد وب‌سایت شما.",
                  "A home for your website to grow.",
                )
              : family === "dedicated"
                ? s(
                    "قدرتی که برای کار شما انتخاب می‌شود.",
                    "Hardware chosen around your workload.",
                  )
                : text(f.title)
        }
        description={text(f.description)}
      >
        <div className="nv-button-row">
          <a href="#nv-product-options" className="nv-button">
            {s("مشاهدهٔ گزینه‌ها", "Explore options")}
            <DirectionArrow />
          </a>
          <Link to={cta} className="nv-button nv-button-outline">
            {family === "support"
              ? s("ثبت درخواست بررسی", "Request an assessment")
              : s("شروع سفارش", "Start an order")}
          </Link>
        </div>
      </PageHero>
      <section className="nv-section">
        <div className="nv-container">
          <div className="nv-info-grid">
            {[
              [
                SlidersHorizontal,
                s("متناسب با کار شما", "Shaped around your work"),
                s(
                  "نوع سرویس، محل و منابع را بر اساس نیاز واقعی انتخاب کنید.",
                  "Choose your service, location and resources around the actual workload.",
                ),
              ],
              [
                ShieldCheck,
                s("جزئیات قبل از تصمیم", "Details before the decision"),
                s(
                  "قیمت، امکانات، لایسنس و محدودهٔ ارائه را پیش از پرداخت بررسی کنید.",
                  "Review pricing, features, licensing and delivery scope before payment.",
                ),
              ],
              [
                Layers3,
                s("یک مسیر تا مدیریت", "One path to management"),
                s(
                  "سفارش و پیگیری را در همان حسابی ادامه دهید که سرویس را مدیریت می‌کنید.",
                  "Order and follow up in the same account where you manage the service.",
                ),
              ],
            ].map(([Icon, title, body]) => {
              const I = Icon as typeof Check;
              return (
                <article className="nv-info-card" key={String(title)}>
                  <span className={"nv-icon nv-" + f.color}>
                    <I />
                  </span>
                  <h2>{String(title)}</h2>
                  <p>{String(body)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section id="nv-product-options" className="nv-section nv-section-soft">
        <div className="nv-container">
          <SectionHeading
            title={
              family === "hosting"
                ? s("میزبانی به سبک خودتان.", "Hosting, your way.")
                : family === "vps"
                  ? s(
                      "برای هر نوع پروژه، یک انتخاب.",
                      "A choice for every kind of project.",
                    )
                  : s("گزینه‌های این سرویس", "Explore your options")
            }
            description={
              family === "dedicated"
                ? s(
                    "ایران: انتخاب مدل و سخت‌افزار مرجع در مرکز داده؛ خارج: پلن ثابت کشور و تأمین‌کننده. موجودی واقعی جداگانه تأیید می‌شود.",
                    "Iran: reference hardware configurations by datacenter. International: fixed country/supplier plans. Actual stock requires separate confirmation.",
                  )
                : undefined
            }
          />
          {(["vps", "dedicated", "hosting"] as string[]).includes(family) && (
            <OfferExplorer key={family} items={variantsFor(family)} />
          )}
          {family === "addons" && <AddonProducts />}
          {family === "support" && (
            <div className="nv-addons-grid">
              {[
                [
                  "راه‌اندازی و انتقال",
                  "Setup & migration",
                  "انتقال وب‌سایت، آماده‌سازی سیستم‌عامل و شروع سرویس.",
                  "Website migration, operating system preparation and service setup.",
                ],
                [
                  "عیب‌یابی تخصصی",
                  "Specialist troubleshooting",
                  "بررسی مشکل با اطلاعات سرویس و شواهد فنی شما.",
                  "Investigate an issue using your service details and technical evidence.",
                ],
                [
                  "مدیریت دوره‌ای",
                  "Ongoing management",
                  "تعریف برنامهٔ نگهداری، به‌روزرسانی و پایش متناسب با نیاز شما.",
                  "Define maintenance, updates and monitoring around your requirements.",
                ],
              ].map(([fa, en, d, de]) => (
                <article key={en}>
                  <span className="nv-icon nv-teal">
                    <Headphones />
                  </span>
                  <h3>{s(fa, en)}</h3>
                  <p>{s(d, de)}</p>
                  <div className="nv-price">
                    {s("پس از بررسی", "Quoted after review")}
                  </div>
                  <Link
                    className="nv-button nv-button-outline"
                    to={panelOrderHref("order-support")}
                  >
                    {s("شرح نیاز و درخواست", "Describe your requirements")}
                    <DirectionArrow />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      {(family === "hosting" || family === "vps") && (
        <section className="nv-section">
          <div className="nv-container">
            <SectionHeading
              title={s("نقطه‌های شروع پیشنهادی", "Starting points to explore")}
            />
            <PublicPlanCards kind={family} />
            <PricingNote />
            {family === "hosting" && (
              <div className="nv-reference-note">
                <Link
                  to="/hosting-plans?profile=order-hosting-trial-country-ir"
                  className="nv-text-link"
                >
                  {s(
                    "هاست آزمایشی ۲۴ ساعته با منابع محدود؛ درخواست پس از ورود",
                    "Low-resource 24-hour hosting trial; request after sign-in",
                  )}
                  <DirectionArrow />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
      {family === "dedicated" && (
        <section className="nv-section">
          <div className="nv-container">
            <PublicPlanCards kind="dedicated" />
          </div>
        </section>
      )}
      <section className="nv-section nv-section-soft">
        <div className="nv-container">
          <SectionHeading
            title={s("پرسش‌های پیش از سفارش", "Before you order")}
          />
          <FaqList limit={family === "dedicated" ? 6 : 4} />
        </div>
      </section>
      <div className="nv-section pb-0">
        <ServiceCta />
      </div>
    </SiteLayout>
  );
}

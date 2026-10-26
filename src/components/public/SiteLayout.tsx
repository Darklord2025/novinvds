import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, ShoppingBag } from "lucide-react";
import {
  PublicBack,
  DepartmentContact,
  PwaInstall,
  MobileDock,
} from "./PublicExperience";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  BookOpen,
  Check,
  ChevronDown,
  Cpu,
  Globe,
  HardDrive,
  Headphones,
  Layers3,
  Menu,
  Network,
  Server,
  Sparkles,
  X,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LanguageControl from "@/components/LanguageControl";
import CurrencyControl from "@/components/CurrencyControl";
import {
  publicFamilies,
  panelOrderHref,
  type PublicFamily,
} from "@/data/publicCatalog";
import { useSiteCopy } from "./site-copy";
import "./public-site.css";
import "./catalog-experience.css";
import "./equipment-store.css";
import "./public-dark.css";

const icons = {
  vps: Server,
  dedicated: Cpu,
  hosting: HardDrive,
  domain: Globe,
  addons: Layers3,
  network: Network,
  support: Headphones,
};
export function FamilyIcon({
  family,
  size = 24,
}: {
  family: PublicFamily;
  size?: number;
}) {
  const Icon = icons[family];
  return <Icon size={size} strokeWidth={1.7} />;
}
export function DirectionArrow({ size = 17 }: { size?: number }) {
  const { fa } = useSiteCopy();
  return fa ? <ArrowLeft size={size} /> : <ArrowRight size={size} />;
}
export function SiteHeader() {
  const theme = useTheme();
  const { s, text } = useSiteCopy(),
    location = useLocation(),
    [menu, setMenu] = useState<string | null>(null),
    [mobile, setMobile] = useState(false),
    ref = useRef<HTMLElement>(null);
  const inShop =
    location.pathname.startsWith("/network-store") ||
    location.pathname.startsWith("/shop/");
  useEffect(() => {
    setMenu(null);
    setMobile(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    const close = (e: PointerEvent) => {
        if (!ref.current?.contains(e.target as Node)) {
          setMenu(null);
          setMobile(false);
        }
      },
      key = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMenu(null);
          setMobile(false);
        }
      };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", key);
    };
  }, []);
  const groups = [
    {
      id: "servers",
      label: s("سرورها", "Servers"),
      families: ["vps", "dedicated", "network"],
    },
    {
      id: "hosting",
      label: s("میزبانی و دامنه", "Hosting & domains"),
      families: ["hosting", "domain"],
    },
    {
      id: "more",
      label: s("خدمات بیشتر", "More services"),
      families: ["addons", "support"],
    },
  ];
  return (
    <header className="nv-public-header" ref={ref}>
      <div className="nv-topline">
        <div className="nv-container">
          <span>
            {s(
              "زیرساختی برای قدم بعدی شما",
              "Infrastructure for your next step",
            )}
          </span>
          <div>
            <Link to="/knowledge">{s("راهنمای شروع", "Getting started")}</Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact">{s("ارتباط با ما", "Contact")}</Link>
          </div>
        </div>
      </div>
      <div className="nv-container nv-navigation">
        <Link
          to="/"
          className="nv-brand"
          aria-label={s("نوین وی‌دی‌اس؛ صفحهٔ اصلی", "NovinVDS home")}
        >
          <BrandLogo />
        </Link>
        <nav
          className="nv-desktop-nav"
          aria-label={s("ناوبری اصلی", "Main navigation")}
        >
          {groups.map((group) => (
            <div key={group.id} className="nv-nav-item">
              <button
                type="button"
                aria-expanded={menu === group.id}
                aria-controls={"nv-menu-" + group.id}
                onClick={() => setMenu(menu === group.id ? null : group.id)}
              >
                {group.label}
                <ChevronDown size={13} />
              </button>
              {menu === group.id && (
                <div className="nv-mega" id={"nv-menu-" + group.id}>
                  <div className="nv-mega-heading">
                    <span>
                      {s("برای نیاز خودتان انتخاب کنید", "Find the right fit")}
                    </span>
                    <Link to="/services">
                      {s("همهٔ خدمات", "All services")}
                      <DirectionArrow />
                    </Link>
                  </div>
                  <div className="nv-mega-grid">
                    {publicFamilies
                      .filter((f) => group.families.includes(f.id))
                      .map((f) => (
                        <Link to={f.path} key={f.id} className="nv-mega-link">
                          <span className={"nv-icon nv-" + f.color}>
                            <FamilyIcon family={f.id} />
                          </span>
                          <span>
                            <strong>{text(f.title)}</strong>
                            <small>{text(f.description)}</small>
                          </span>
                        </Link>
                      ))}
                  </div>
                  <div className="nv-mega-bottom">
                    <Sparkles size={16} />
                    <Link to="/calculator">
                      {s(
                        "منابع دلخواهتان را محاسبه کنید",
                        "Calculate your own resources",
                      )}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/datacenter">{s("موقعیت‌ها", "Locations")}</Link>
          <Link to="/network-store" className="nv-store-nav">
            <ShoppingBag size={16} />
            {s("فروشگاه", "Shop")}
          </Link>
          <Link to="/blog">{s("یاد بگیرید", "Learn")}</Link>
        </nav>
        <div className="nv-header-actions">
          <button
            className="nv-theme-toggle"
            type="button"
            onClick={theme.toggleTheme}
            aria-label={
              theme.theme === "dark"
                ? s("تم روشن", "Light theme")
                : s("تم تیره", "Dark theme")
            }
          >
            {theme.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <LanguageControl />
          <span className="nv-header-currency">
            <CurrencyControl />
          </span>
          <Link
            className="nv-button nv-button-small"
            to={inShop ? "/shop/account" : "/user-panel"}
          >
            {inShop
              ? s("پنل فروشگاه", "Shop account")
              : s("ورود به پنل", "Client area")}
            <DirectionArrow size={14} />
          </Link>
          <button
            type="button"
            className="nv-mobile-toggle"
            aria-label={s("منوی سایت", "Site menu")}
            aria-expanded={mobile}
            aria-controls="nv-mobile-navigation"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav
          className="nv-mobile-navigation"
          id="nv-mobile-navigation"
          aria-label={s("ناوبری موبایل", "Mobile navigation")}
        >
          {publicFamilies.map((f) => (
            <Link to={f.path} key={f.id}>
              <FamilyIcon family={f.id} size={19} />
              {text(f.title)}
              <DirectionArrow size={14} />
            </Link>
          ))}
          <Link to="/network-store">
            <ShoppingBag size={19} />
            {s("فروشگاه تجهیزات شبکه", "Network equipment shop")}
          </Link>
          <Link to="/services">{s("همهٔ خدمات", "All services")}</Link>
          <Link to="/datacenter">{s("موقعیت‌ها", "Locations")}</Link>
          <Link to="/blog">{s("بلاگ و راهنما", "Blog & guides")}</Link>
          <Link to="/calculator">
            {s("ماشین‌حساب سرویس", "Service calculator")}
          </Link>
        </nav>
      )}
    </header>
  );
}
export function SiteFooter() {
  const { s, text, n } = useSiteCopy();
  return (
    <footer className="nv-footer">
      <div className="nv-container">
        <div className="nv-footer-top">
          <div>
            <Link to="/" className="nv-footer-logo">
              <BrandLogo />
            </Link>
            <h2>
              {s(
                "جایی برای ایده‌های بزرگ شما.",
                "A place for your next big idea.",
              )}
            </h2>
            <p>
              {s(
                "از اولین وب‌سایت تا زیرساخت اختصاصی؛ مسیر انتخاب و مدیریت سرویس را ساده می‌کنیم.",
                "From your first website to dedicated infrastructure. A clearer way to choose and manage your services.",
              )}
            </p>
            <a href="mailto:info@novinvds.ir" dir="ltr">
              info@novinvds.ir <ArrowUpLeft size={16} />
            </a>
          </div>
          <div>
            <h3>{s("خدمات", "Products")}</h3>
            {publicFamilies.map((f) => (
              <Link to={f.path} key={f.id}>
                {text(f.title)}
              </Link>
            ))}
          </div>
          <div>
            <h3>{s("همراه شما", "Resources")}</h3>
            <Link to="/network-store">
              {s("فروشگاه تجهیزات شبکه", "Network equipment shop")}
            </Link>
            <Link to="/knowledge">{s("مرکز دانش", "Knowledge center")}</Link>
            <Link to="/faq">{s("سؤالات متداول", "FAQ")}</Link>
            <Link to="/blog">{s("بلاگ", "Blog")}</Link>
            <Link to="/downloads">
              {s("دانلودها و مستندات", "Downloads & documentation")}
            </Link>
            <Link to="/calculator">{s("ماشین‌حساب", "Calculator")}</Link>
            <Link to={panelOrderHref("affiliate")}>
              {s("همکاری در فروش", "Affiliates")}
            </Link>
          </div>
          <div>
            <h3>{s("نوین وی‌دی‌اس", "NovinVDS")}</h3>
            <Link to="/about">{s("دربارهٔ ما", "About")}</Link>
            <Link to="/contact">{s("تماس با ما", "Contact")}</Link>
            <Link to="/datacenter">
              {s("موقعیت‌های کاتالوگ", "Catalog locations")}
            </Link>
            <Link to="/user-panel">{s("ناحیهٔ کاربری", "Client area")}</Link>
            <Link to={panelOrderHref("tickets")}>
              {s("ارسال تیکت", "Open a ticket")}
            </Link>
          </div>
        </div>
        <div className="nv-footer-bottom">
          <span>© {n(new Date().getFullYear())} NOVINVDS</span>
          <span>
            {s(
              "قیمت، ظرفیت و زمان تحویل پیش از پرداخت تأیید می‌شوند.",
              "Pricing, capacity and delivery are confirmed before payment.",
            )}
          </span>
          <a href="#nv-main">{s("بازگشت به بالا", "Back to top")} ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function SiteLayout({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description?: string;
}) {
  const { fa, s } = useSiteCopy(),
    location = useLocation();
  useEffect(() => {
    document.body.classList.add("nv-public-active");
    return () => document.body.classList.remove("nv-public-active");
  }, []);
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search, location.hash]);
  return (
    <div className="nv-site" dir={fa ? "rtl" : "ltr"}>
      <Helmet>
        <title>{title} | NovinVDS</title>
        <meta
          name="description"
          content={
            description ||
            s(
              "هاست، سرور مجازی و اختصاصی، دامنه و خدمات تخصصی نوین وی‌دی‌اس.",
              "Explore NovinVDS hosting, virtual and dedicated servers, domains and managed services.",
            )
          }
        />
        <meta property="og:title" content={title + " | NovinVDS"} />
        <meta property="og:description" content={description || title} />
      </Helmet>
      <a className="nv-skip" href="#nv-main">
        {s("رفتن به محتوا", "Skip to content")}
      </a>
      <SiteHeader />
      <PublicBack title={title} />
      <main id="nv-main" tabIndex={-1}>
        {children}
      </main>
      <DepartmentContact />
      <PwaInstall />
      <SiteFooter />
      <MobileDock />
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="nv-section-heading">
      <div>
        {eyebrow && <span className="nv-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="nv-page-hero">
      <div className="nv-page-illustration" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
        <i />
      </div>
      <div className="nv-container">
        <span className="nv-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}
export function ServiceCta() {
  const { s } = useSiteCopy();
  return (
    <section className="nv-container nv-bottom-cta">
      <div>
        <span className="nv-eyebrow">YOUR NEXT CHAPTER</span>
        <h2>
          {s("قدم بعدی را با هم برداریم.", "Let’s build what comes next.")}
        </h2>
        <p>
          {s(
            "از سرویس مناسب شروع کنید؛ برای نیازهای تخصصی، درخواست بررسی بفرستید.",
            "Start with the right service, or request a review for a specialist workload.",
          )}
        </p>
      </div>
      <div className="nv-button-row">
        <Link to="/services" className="nv-button nv-button-white">
          {s("انتخاب سرویس", "Explore services")}
          <DirectionArrow />
        </Link>
        <Link to="/support" className="nv-button nv-button-ghost">
          {s("بررسی نیاز من", "Discuss my needs")}
        </Link>
      </div>
    </section>
  );
}
export function PricingNote() {
  const { s } = useSiteCopy();
  return (
    <p className="nv-pricing-note">
      <Check size={15} />
      {s(
        "قیمت‌های کاتالوگ برآورد اولیه و بدون مالیات‌اند؛ قیمت نهایی و امکان ارائه پیش از پرداخت تأیید می‌شود.",
        "Catalog prices are initial estimates before tax. Final pricing and availability are confirmed before payment.",
      )}
    </p>
  );
}

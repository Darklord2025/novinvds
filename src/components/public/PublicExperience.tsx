import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Layers3,
  Headphones,
  Wallet,
  ShieldCheck,
  ShoppingBag,
  Download,
  Smartphone,
  Share2,
  X,
  Server,
  Globe,
  Code2,
  ChevronRight,
} from "lucide-react";
import { useSiteCopy } from "./site-copy";
import { supportDepartments } from "../../../supabase/functions/_shared/support-routing";
import { panelOrderHref } from "@/data/publicCatalog";

export function PublicBack({ title }: { title: string }) {
  const { s, fa } = useSiteCopy(),
    location = useLocation(),
    navigate = useNavigate();
  if (location.pathname === "/") return null;
  const fallback = location.pathname.includes("vps-")
    ? "/vps"
    : location.pathname.includes("dedicated-")
      ? "/dedicated"
      : location.pathname.includes("hosting-")
        ? "/hosting"
        : location.pathname.startsWith("/blog/")
          ? "/blog"
          : location.pathname === "/calculator"
            ? "/services"
            : "/";
  return (
    <div className="nv-container nv-backbar">
      <button
        type="button"
        className="nv-back-button"
        onClick={() => {
          if (Number(window.history.state?.idx) > 0) navigate(-1);
          else navigate(fallback);
        }}
      >
        {fa ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}{" "}
        {s("بازگشت", "Back")}
      </button>
      <nav aria-label={s("مسیر صفحه", "Breadcrumb")}>
        <Link to="/">{s("خانه", "Home")}</Link>
        <span aria-hidden="true">/</span>
        <span>{title}</span>
      </nav>
    </div>
  );
}
export function DepartmentContact() {
  const { s, fa } = useSiteCopy(),
    icons = [Headphones, Wallet, ShoppingBag, ShieldCheck];
  return (
    <section className="nv-departments">
      <div className="nv-container">
        <div className="nv-department-heading">
          <span className="nv-icon nv-blue">
            <Headphones size={27} />
          </span>
          <div>
            <span className="nv-eyebrow">
              {s("ارتباط با تیم نوین", "PEOPLE BEHIND THE PLATFORM")}
            </span>
            <h2>
              {s("مستقیم به بخش مربوطه برسید.", "Talk to the right team.")}
            </h2>
            <p>
              {s(
                "راهنمایی پیش از خرید یا پیگیری سرویس؛ مسیر گفتگو را انتخاب کنید.",
                "From choosing a plan to looking after your service. Choose your conversation.",
              )}
            </p>
          </div>
          <Link to="/contact" className="nv-text-link">
            {s("راه‌های ارتباط", "Contact options")}
            {fa ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>
        <div className="nv-department-grid">
          {supportDepartments.map((d, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={d.id}
                className={"nv-department nv-department-" + d.id}
                to={panelOrderHref("tickets", {
                  newTicket: "1",
                  department: d.id,
                })}
              >
                <span className="nv-department-icon">
                  <Icon size={25} />
                </span>
                <strong>{d.title[fa ? 0 : 1]}</strong>
                <small>{d.description[fa ? 0 : 1]}</small>
                <span className="nv-text-link">
                  {s("شروع گفتگو", "Start a conversation")}
                  {fa ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                </span>
              </Link>
            );
          })}
        </div>
        <p className="nv-department-note">
          {s(
            "درخواست‌ها پس از ورود به حساب، با شماره تیکت قابل پیگیری‌اند.",
            "Sign in to send a request and follow it with a ticket number.",
          )}
        </p>
      </div>
    </section>
  );
}
interface InstallPrompt extends Event {
  prompt: () => Promise<{ outcome: string }>;
}
let pendingInstall: InstallPrompt | null = null;
const subscribers = new Set<() => void>();
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  pendingInstall = e as InstallPrompt;
  subscribers.forEach((fn) => fn());
});
window.addEventListener("appinstalled", () => {
  pendingInstall = null;
  subscribers.forEach((fn) => fn());
});
export function PwaInstall() {
  const { s } = useSiteCopy(),
    [prompt, setPrompt] = useState(pendingInstall),
    [help, setHelp] = useState(false),
    [notice, setNotice] = useState("");
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone;
  useEffect(() => {
    const update = () => setPrompt(pendingInstall);
    subscribers.add(update);
    return () => {
      subscribers.delete(update);
    };
  }, []);
  if (standalone) return null;
  return (
    <div className="nv-container nv-install">
      <span className="nv-install-icon">
        <Smartphone size={30} />
      </span>
      <div>
        <h2>
          {s("نوین، همیشه دم دست شما.", "NovinVDS, always within reach.")}
        </h2>
        <p>
          {s(
            "نسخه وب‌اپ را روی گوشی یا رایانه اضافه کنید؛ بدون نیاز به فروشگاه برنامه.",
            "Add the web app to your phone or desktop. No app store needed.",
          )}
        </p>
      </div>
      <button
        type="button"
        className="nv-button nv-button-outline"
        onClick={async () => {
          if (prompt) {
            try {
              const result = await prompt.prompt();
              setNotice(
                result.outcome === "accepted"
                  ? s("درخواست نصب تأیید شد.", "Installation accepted.")
                  : s(
                      "نصب انجام نشد؛ هر زمان از منوی مرورگر اقدام کنید.",
                      "Installation dismissed. You can try again from your browser menu.",
                    ),
              );
            } catch {
              setHelp(true);
            } finally {
              pendingInstall = null;
              setPrompt(null);
            }
          } else setHelp(!help);
        }}
      >
        <Download size={17} />
        {s("نصب وب‌اپ", "Install web app")}
      </button>
      {help && (
        <div className="nv-install-help">
          <button
            type="button"
            aria-label={s("بستن راهنمای نصب", "Close installation help")}
            onClick={() => setHelp(false)}
          >
            <X size={18} />
          </button>
          <strong>{s("افزودن به صفحه اصلی", "Add to your home screen")}</strong>
          <p>
            <Share2 size={15} />
            {s(
              "آیفون: در Safari دکمه اشتراک‌گذاری ← افزودن به صفحه اصلی.",
              "iPhone: in Safari, choose Share → Add to Home Screen.",
            )}
          </p>
          <p>
            {s(
              "اندروید و رایانه: از منوی Chrome یا Edge گزینه نصب برنامه / افزودن به صفحه اصلی را انتخاب کنید.",
              "Android and desktop: use Install app / Add to Home Screen in the Chrome or Edge menu.",
            )}
          </p>
          <small>
            {s(
              "برای مشاهده حساب، قیمت نهایی و ثبت سفارش به اینترنت نیاز دارید.",
              "Account access, final prices and orders require an internet connection.",
            )}
          </small>
        </div>
      )}
      {notice && <p role="status">{notice}</p>}
    </div>
  );
}
export function MobileDock() {
  const { s } = useSiteCopy(),
    location = useLocation();
  return (
    <nav
      className="nv-mobile-dock"
      aria-label={s("دسترسی سریع موبایل", "Mobile quick navigation")}
    >
      {[
        { to: "/", label: s("خانه", "Home"), Icon: Home },
        { to: "/services", label: s("خدمات", "Services"), Icon: Layers3 },
        { to: "/contact", label: s("ارتباط", "Contact"), Icon: Headphones },
        {
          to: "/user-panel",
          label: s("حساب من", "My account"),
          Icon: Smartphone,
        },
      ].map(({ to, label, Icon }) => (
        <Link
          key={to}
          to={to}
          aria-current={location.pathname === to ? "page" : undefined}
        >
          <Icon size={21} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
export function WorkloadShowcase() {
  const { s, fa } = useSiteCopy();
  return (
    <section className="nv-workloads nv-container">
      <div className="nv-workload-intro">
        <span className="nv-eyebrow">
          {s("از ایده تا اجرا", "FROM IDEA TO LAUNCH")}
        </span>
        <h2>
          {s(
            "شما بسازید.\nجا برای رشدش اینجاست.",
            "You build it.\nWe make room for it.",
          )}
        </h2>
        <p>
          {s(
            "برای پروژه‌ای که در ذهن دارید، از مسیر درست شروع کنید.",
            "Start with the right foundation for the project you have in mind.",
          )}
        </p>
        <Link to="/calculator" className="nv-text-link">
          {s("منابع خودم را می‌سازم", "Build my own configuration")}
          {fa ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
        </Link>
      </div>
      <div className="nv-workload-cards">
        {[
          {
            id: "web",
            Icon: Globe,
            to: "/hosting",
            title: s("یک سایت، هزار فرصت", "One website. New possibilities."),
            body: s(
              "وب‌سایت، فروشگاه و وردپرس",
              "Websites, storefronts & WordPress",
            ),
          },
          {
            id: "app",
            Icon: Code2,
            to: "/vps",
            title: s(
              "ایده را به محصول تبدیل کنید",
              "Turn your idea into a product.",
            ),
            body: s("برنامه، API و محیط توسعه", "Apps, APIs & development"),
          },
          {
            id: "power",
            Icon: Server,
            to: "/dedicated",
            title: s(
              "قدرتی برای قدم‌های بزرگ‌تر",
              "Space for your next big move.",
            ),
            body: s(
              "سخت‌افزار و منابع اختصاصی",
              "Dedicated hardware & resources",
            ),
          },
        ].map(({ id, Icon, to, title, body }) => (
          <Link
            to={to}
            key={id}
            className={"nv-workload-card nv-workload-" + id}
          >
            <div className="nv-workload-art" aria-hidden="true">
              <span className="nv-visual-window">
                <i />
                <i />
                <i />
                <span>
                  <Icon size={42} />
                </span>
                <b />
                <b />
                <b />
              </span>
              <span className="nv-visual-orbit" />
              <span className="nv-visual-chip">
                <Icon size={19} />
              </span>
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
            <span className="nv-text-link">
              {s("دیدن راهکارها", "Explore solutions")}
              {fa ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

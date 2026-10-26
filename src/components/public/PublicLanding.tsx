import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpLeft,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Server,
  Cpu,
  HardDrive,
  Globe,
  Layers3,
  Network,
  Headphones,
  Check,
  Code2,
  Sparkles,
  SlidersHorizontal,
  BookOpen,
  Search,
  ChevronDown,
} from "lucide-react";
import SiteLayout, {
  DirectionArrow,
  FamilyIcon,
  PricingNote,
} from "./SiteLayout";
import { useSiteCopy } from "./site-copy";
import { publicFamilies } from "@/data/publicCatalog";
import { countries } from "@/data/datacenters";
import { publicRegions } from "@/data/publicGeography";
import { knowledgeArticles } from "@/data/knowledgeArticles";
import { locationHref } from "@/lib/public-location";
import { canonicalDomain, validDomain } from "@/lib/panel-model";
import { PublicPlanCards, FaqList } from "./PublicHome";
import CountryFlag from "./CountryFlag";
import "./launch-site.css";

function InfrastructureStage({
  focus,
}: {
  focus: "vps" | "hosting" | "dedicated";
}) {
  const { s } = useSiteCopy(),
    host = useRef<HTMLDivElement>(null),
    frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const labels = {
    vps: s("سرور مجازی", "VIRTUAL SERVER"),
    hosting: s("میزبانی وب", "WEB HOSTING"),
    dedicated: s("سرور اختصاصی", "DEDICATED SERVER"),
  };
  return (
    <div
      className={"nv-stage nv-stage-" + focus}
      ref={host}
      onPointerMove={(e) => {
        if (
          e.pointerType !== "mouse" ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect(),
          x = ((e.clientX - r.left) / r.width - 0.5) * 12,
          y = ((e.clientY - r.top) / r.height - 0.5) * 12;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          host.current?.style.setProperty("--px", x + "px");
          host.current?.style.setProperty("--py", y + "px");
        });
      }}
      onPointerLeave={() => {
        cancelAnimationFrame(frame.current);
        host.current?.style.setProperty("--px", "0px");
        host.current?.style.setProperty("--py", "0px");
      }}
    >
      <div className="nv-stage-canvas" aria-hidden="true">
        <div className="nv-stage-grid" />
        <div className="nv-stage-orbit nv-stage-orbit-one" />
        <div className="nv-stage-orbit nv-stage-orbit-two" />
        <svg className="nv-stage-paths" viewBox="0 0 580 500">
          <path d="M70 125C185 40 345 330 510 150M85 380C230 485 375 50 500 365" />
          <circle cx="70" cy="125" r="5" />
          <circle cx="500" cy="365" r="5" />
        </svg>
        <div className="nv-core">
          <div className="nv-core-top">
            <img src="/brand/favicon.png" alt="" width="80" height="80" />
          </div>
          {[0, 1, 2].map((i) => (
            <div className={"nv-core-layer nv-core-layer-" + i} key={i}>
              <span />
              <span />
              <span />
              <i />
            </div>
          ))}
        </div>
        <span className="nv-stage-chip nv-stage-chip-code">
          <Code2 size={24} />
        </span>
        <span className="nv-stage-chip nv-stage-chip-network">
          <Network size={25} />
        </span>
        <span className="nv-stage-spark nv-stage-spark-one" />
        <span className="nv-stage-spark nv-stage-spark-two" />
      </div>
      <div className="nv-stage-label">
        <span className="nv-stage-label-dot" />
        {s("نمای مفهومی زیرساخت", "INFRASTRUCTURE, VISUALIZED")}
      </div>
      <div className="nv-stage-spec" key={focus}>
        <span className="nv-stage-spec-icon">
          {focus === "vps" ? (
            <Server size={24} />
          ) : focus === "hosting" ? (
            <Globe size={24} />
          ) : (
            <Cpu size={24} />
          )}
        </span>
        <span>
          <small>{s("برای آنچه می‌سازید", "FOR WHAT YOU BUILD")}</small>
          <strong>{labels[focus]}</strong>
        </span>
        <span className="nv-stage-spec-lines">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <span className="nv-stage-footnote">COMPUTE · CONNECT · CREATE</span>
    </div>
  );
}
function ServiceSketch({ kind }: { kind: string }) {
  return (
    <div
      className={"nv-service-sketch nv-service-sketch-" + kind}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
      <i />
      <i />
    </div>
  );
}
export default function PublicLanding() {
  const { s, text, n, fa } = useSiteCopy(),
    navigate = useNavigate(),
    root = useRef<HTMLDivElement>(null),
    [focus, setFocus] = useState<"vps" | "hosting" | "dedicated">("vps"),
    [plan, setPlan] = useState<"vps" | "hosting" | "dedicated">("vps"),
    [region, setRegion] = useState("eu"),
    [domain, setDomain] = useState(""),
    [error, setError] = useState("");
  useEffect(() => {
    const element = root.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("nv-is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    element
      .querySelectorAll("[data-reveal]")
      .forEach((target) => observer.observe(target));
    element.classList.add("nv-reveal-ready");
    return () => observer.disconnect();
  }, []);
  function searchDomain(e: FormEvent) {
    e.preventDefault();
    if (!validDomain(domain)) {
      setError(
        s(
          "نام کامل دامنه را وارد کنید؛ مثل example.com",
          "Enter a complete domain, such as example.com.",
        ),
      );
      return;
    }
    navigate("/domain?domain=" + encodeURIComponent(canonicalDomain(domain)));
  }
  const focusNames = {
    vps: s("سرور مجازی", "Virtual servers"),
    hosting: s("میزبانی وب", "Web hosting"),
    dedicated: s("سرور اختصاصی", "Dedicated servers"),
  };
  return (
    <SiteLayout
      title={s(
        "زیرساختی برای ایدهٔ بعدی شما",
        "Infrastructure for your next idea",
      )}
    >
      <div className="nv-landing" ref={root}>
        <section className="nv-launch-hero">
          <div className="nv-container nv-launch-hero-grid">
            <div className="nv-launch-copy">
              <div className="nv-launch-kicker">
                <span />
                {s(
                  "نوین وی‌دی‌اس / فضای رشد شما",
                  "NOVINVDS / YOUR SPACE TO GROW",
                )}
              </div>
              <h1>
                {s("ایده را بسازید.", "Build your idea.")}
                <br />
                <span>{s("بزرگ‌تر فکر کنید.", "Think bigger.")}</span>
              </h1>
              <p>
                {s(
                  "وب‌سایت، برنامه یا زیرساخت بعدی شما؛ از سرویس مناسب شروع کنید و با خیال روشن‌تری قدم بعدی را بردارید.",
                  "Your next website, application or infrastructure. Start with the right service and move forward with a clearer picture.",
                )}
              </p>
              <div className="nv-launch-actions">
                <Link to="/services" className="nv-launch-primary">
                  {s("سرویس مناسب من", "Find my service")}
                  <DirectionArrow size={19} />
                </Link>
                <Link to="/calculator" className="nv-launch-secondary">
                  <SlidersHorizontal size={19} />
                  {s("منابع را خودم می‌سازم", "Build my configuration")}
                </Link>
              </div>
              <div
                className="nv-launch-focus"
                role="group"
                aria-label={s("نمای زیرساخت", "Infrastructure preview")}
              >
                {(["vps", "hosting", "dedicated"] as const).map((id) => (
                  <button
                    type="button"
                    key={id}
                    aria-pressed={focus === id}
                    onClick={() => setFocus(id)}
                  >
                    {focusNames[id]}
                  </button>
                ))}
              </div>
              <a className="nv-launch-scroll" href="#nv-launch-services">
                <ChevronDown size={17} />
                {s(
                  "انتخاب شما از اینجا شروع می‌شود",
                  "Your next step starts here",
                )}
              </a>
            </div>
            <InfrastructureStage focus={focus} />
          </div>
          <div className="nv-container nv-launch-rail">
            <span>
              {s("با ابزارهایی که می‌شناسید", "WORK WITH FAMILIAR TOOLS")}
            </span>
            <b>Linux</b>
            <b>Windows</b>
            <b>WordPress</b>
            <b>Docker</b>
            <b>aaPanel</b>
            <Link to="/addons">
              {s("نرم‌افزارها و افزونه‌ها", "Software & add-ons")}
              <DirectionArrow size={14} />
            </Link>
          </div>
        </section>
        <section
          id="nv-launch-services"
          className="nv-container nv-launch-section"
          data-reveal
        >
          <div className="nv-launch-heading">
            <div>
              <span className="nv-launch-eyebrow">
                {s("یک انتخاب برای هر مرحله", "A TOOLKIT FOR EVERY STAGE")}
              </span>
              <h2>
                {s("برای شروع. برای رشد.", "For starting. For growing.")}
                <br />
                {s("برای قدم بزرگ بعدی.", "For your next big move.")}
              </h2>
            </div>
            <p>
              {s(
                "از یک وب‌سایت ساده تا منابع اختصاصی؛ مسیر خودتان را انتخاب کنید.",
                "From your first website to dedicated resources. Choose your own path.",
              )}
            </p>
          </div>
          <div className="nv-service-mosaic">
            {publicFamilies
              .filter((f) => f.id !== "domain")
              .map((f) => (
                <Link
                  key={f.id}
                  to={f.path}
                  className={"nv-mosaic-card nv-mosaic-" + f.id}
                >
                  <div className="nv-mosaic-top">
                    <span className="nv-mosaic-icon">
                      <FamilyIcon family={f.id} />
                    </span>
                    <span className="nv-mosaic-arrow">
                      {fa ? (
                        <ArrowUpLeft size={21} />
                      ) : (
                        <ArrowUpRight size={21} />
                      )}
                    </span>
                  </div>
                  <div className="nv-mosaic-copy">
                    <span>{f.tag}</span>
                    <h3>{text(f.title)}</h3>
                    <p>{text(f.description)}</p>
                  </div>
                  <ServiceSketch kind={f.id} />
                  <span className="nv-mosaic-action">
                    {s("دیدن راهکارها", "Explore solutions")}
                    <DirectionArrow size={15} />
                  </span>
                </Link>
              ))}
          </div>
        </section>
        <section className="nv-container nv-launch-domain" data-reveal>
          <div>
            <span className="nv-launch-eyebrow">
              YOUR IDEA STARTS WITH A NAME
            </span>
            <h2>
              {s(
                "اسم قدم بعدی‌تان چیست؟",
                "What will you call your next idea?",
              )}
            </h2>
            <p>
              {s(
                "نام دامنه را وارد کنید و ثبت، انتقال یا اتصال آن را ادامه دهید.",
                "Enter a domain to explore registration, transfer or connection.",
              )}
            </p>
          </div>
          <form onSubmit={searchDomain}>
            <label className="nv-launch-domain-field">
              <Globe size={23} />
              <input
                dir="ltr"
                aria-label={s("جستجوی نام دامنه", "Search a domain name")}
                placeholder="your-next-idea.com"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setError("");
                }}
                required
                maxLength={253}
              />
              <button
                type="submit"
                aria-label={s("بررسی دامنه", "Explore domain")}
              >
                <Search size={21} />
              </button>
            </label>
            <div className="nv-domain-endings">
              <span>.com</span>
              <span>.ir</span>
              <span>.net</span>
              <Link to="/domain">
                {s("ثبت یا انتقال دامنه", "Register or transfer")}
                <DirectionArrow size={14} />
              </Link>
            </div>
            {error && <p role="alert">{error}</p>}
          </form>
        </section>
        <section className="nv-launch-pricing" data-reveal>
          <div className="nv-container">
            <div className="nv-launch-heading">
              <div>
                <span className="nv-launch-eyebrow">
                  {s("اول نیازتان، بعد انتخابتان", "START WITH YOUR WORKLOAD")}
                </span>
                <h2>
                  {s("اندازهٔ پروژهٔ شما.", "Sized around your project.")}
                </h2>
              </div>
              <Link className="nv-launch-text-link" to="/calculator">
                {s("محاسبهٔ منابع سفارشی", "Calculate custom resources")}
                <DirectionArrow />
              </Link>
            </div>
            <div
              className="nv-launch-tabs"
              role="tablist"
              aria-label={s("نمونه پلن‌ها", "Plan examples")}
            >
              {(["vps", "hosting", "dedicated"] as const).map((id, i) => (
                <button
                  key={id}
                  id={"nv-launch-tab-" + id}
                  type="button"
                  role="tab"
                  aria-selected={plan === id}
                  aria-controls="nv-launch-plan-content"
                  tabIndex={plan === id ? 0 : -1}
                  onClick={() => setPlan(id)}
                  onKeyDown={(e) => {
                    const ids = ["vps", "hosting", "dedicated"] as const;
                    let at = i;
                    if (e.key === "Home") at = 0;
                    else if (e.key === "End") at = 2;
                    else if (e.key === "ArrowRight")
                      at = (i + (fa ? 2 : 1)) % 3;
                    else if (e.key === "ArrowLeft") at = (i + (fa ? 1 : 2)) % 3;
                    else return;
                    e.preventDefault();
                    setPlan(ids[at]);
                    document
                      .getElementById("nv-launch-tab-" + ids[at])
                      ?.focus();
                  }}
                >
                  {focusNames[id]}
                </button>
              ))}
            </div>
            <div
              role="tabpanel"
              id="nv-launch-plan-content"
              aria-labelledby={"nv-launch-tab-" + plan}
            >
              <PublicPlanCards kind={plan} />
            </div>
            <PricingNote />
          </div>
        </section>
        <section
          className="nv-container nv-launch-section nv-launch-locations"
          data-reveal
        >
          <div className="nv-launch-heading">
            <div>
              <span className="nv-launch-eyebrow">CLOSER TO YOUR AUDIENCE</span>
              <h2>
                {s("یک قدم نزدیک‌تر،", "A little closer.")}
                <br />
                <span>{s("به مخاطب شما.", "To your audience.")}</span>
              </h2>
            </div>
            <p>
              {s(
                "کشور را انتخاب کنید؛ صفحهٔ بعد فقط مراکز داده و مسیر سفارش همان کشور را نشان می‌دهد.",
                "Choose a country. The next page shows that country’s datacenters and ordering paths.",
              )}
            </p>
          </div>
          <div className="nv-launch-atlas">
            <div className="nv-atlas-visual" aria-hidden="true">
              <svg viewBox="0 0 500 390" fill="none">
                <defs>
                  <radialGradient id="nv-earth-fill">
                    <stop stopColor="#395285" />
                    <stop offset="1" stopColor="#142238" />
                  </radialGradient>
                </defs>
                <circle cx="250" cy="195" r="154" fill="url(#nv-earth-fill)" />
                <g stroke="#8ea4d4" opacity=".23">
                  <ellipse cx="250" cy="195" rx="154" ry="55" />
                  <ellipse cx="250" cy="195" rx="154" ry="108" />
                  <ellipse cx="250" cy="195" rx="55" ry="154" />
                  <ellipse cx="250" cy="195" rx="108" ry="154" />
                  <path d="M96 195h308M250 41v308" />
                </g>
                <g stroke="#adc1e8" strokeWidth="1.4" opacity=".7">
                  <path
                    d="m129 119 32-14 32 8 18 22-18 20-12 12-10 41-20-8-16-38-13-17 7-26Zm49 104 25 12 9 31-16 36-9-12-3-35-6-32Zm60-101 26-22 37 9 24-9 43 27 16 42-31-6-17 17-21-9-13 12-16-20-26-7-15-20-7-14Zm24 56 26-7 24 20-10 49-26 22-21-38 7-46Zm70 89 31-14 23 24-11 21-38-8-5-23Z"
                    fill="#90a6cb"
                    opacity=".5"
                  />
                </g>
                <g
                  className="nv-atlas-route"
                  stroke="#77d3ca"
                  strokeWidth="1.5"
                >
                  <path d="M166 150Q245 14 300 170M300 170Q354 184 374 278M300 170Q230 190 268 139" />
                </g>
                {[
                  [166, 150],
                  [268, 139],
                  [300, 170],
                  [374, 278],
                ].map(([x, y]) => (
                  <g key={x}>
                    <circle cx={x} cy={y} r="10" fill="#8ce9d0" opacity=".16" />
                    <circle cx={x} cy={y} r="4" fill="#b5f3dd" />
                  </g>
                ))}
              </svg>
              <span className="nv-atlas-caption">
                <Globe size={17} />
                {s("موقعیت را انتخاب کنید", "CHOOSE YOUR LOCATION")}
              </span>
            </div>
            <div className="nv-atlas-picker">
              <div
                className="nv-atlas-regions"
                role="group"
                aria-label={s("منطقهٔ لوکیشن", "Location region")}
              >
                {publicRegions.map((r) => (
                  <button
                    type="button"
                    aria-pressed={region === r.id}
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                  >
                    {text(r.title)}
                  </button>
                ))}
              </div>
              <div className="nv-atlas-countries" key={region}>
                {countries
                  .filter((c) => c.region === region)
                  .map((c) => (
                    <Link
                      key={c.id}
                      to={locationHref(c.id)}
                      aria-label={s(
                        "مشاهده موقعیت " + c.fa,
                        "Explore " + c.en + " location",
                      )}
                    >
                      <CountryFlag code={c.id} />
                      <span>{s(c.fa, c.en)}</span>
                      <DirectionArrow size={16} />
                    </Link>
                  ))}
              </div>
              <Link className="nv-launch-text-link" to="/datacenter">
                {s("همهٔ موقعیت‌ها", "All locations")}
                <DirectionArrow />
              </Link>
              <p>
                {s(
                  "مراکز داده مرجع‌اند؛ ظرفیت و امکان ارائه پیش از سفارش تأیید می‌شود.",
                  "Datacenters are references. Capacity and availability require confirmation before ordering.",
                )}
              </p>
            </div>
          </div>
        </section>
        <section className="nv-container nv-launch-workflow" data-reveal>
          <div className="nv-launch-workflow-copy">
            <span className="nv-launch-eyebrow">
              FROM FIRST CLICK TO YOUR NEXT RELEASE
            </span>
            <h2>
              {s("از انتخاب تا مدیریت،", "From choosing to managing,")}
              <br />
              {s("همه‌چیز در مسیر شما.", "a clearer path forward.")}
            </h2>
            <p>
              {s(
                "سرویس را بشناسید، منابع و هزینه را بررسی کنید و سفارش و پشتیبانی را از حساب خودتان دنبال کنید.",
                "Explore the service, review resources and costs, then track orders and support in your account.",
              )}
            </p>
            <Link className="nv-launch-primary" to="/user-panel">
              {s("ورود به پنل سرویس‌ها", "Open the services panel")}
              <DirectionArrow />
            </Link>
            <Link className="nv-launch-text-link" to="/network-store">
              {s("فروشگاه تجهیزات شبکه", "Network equipment shop")}
              <DirectionArrow />
            </Link>
          </div>
          <ol>
            {[
              [
                Search,
                s("سرویس مناسب را پیدا کنید", "Find your fit"),
                s(
                  "بر اساس نوع پروژه، کشور و منابع.",
                  "Choose by workload, country and resources.",
                ),
              ],
              [
                SlidersHorizontal,
                s("جزئیات را کنار هم ببینید", "Review the details"),
                s(
                  "منابع، لایسنس و برآورد هزینه، قبل از پرداخت.",
                  "Resources, licensing and cost estimates before payment.",
                ),
              ],
              [
                Layers3,
                s("با همان حساب ادامه دهید", "Continue in your account"),
                s(
                  "مدیریت، پیگیری سفارش و گفتگو با تیم مرتبط.",
                  "Manage services, track orders and reach the right team.",
                ),
              ],
            ].map(([Icon, title, body], i) => {
              const I = Icon as typeof Search;
              return (
                <li key={String(title)}>
                  <span className="nv-workflow-step">{n(i + 1)}</span>
                  <span className="nv-workflow-icon">
                    <I size={24} />
                  </span>
                  <div>
                    <h3>{String(title)}</h3>
                    <p>{String(body)}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
        <section className="nv-container nv-launch-section" data-reveal>
          <div className="nv-launch-heading">
            <div>
              <span className="nv-launch-eyebrow">
                {s("یک قدم آگاهانه‌تر", "A LITTLE MORE KNOW-HOW")}
              </span>
              <h2>
                {s("برای چیزی که می‌سازید،", "For what you are building,")}
                <br />
                {s("بیشتر بدانید.", "keep learning.")}
              </h2>
            </div>
            <Link to="/knowledge" className="nv-launch-text-link">
              {s("مرکز دانش", "Knowledge center")}
              <DirectionArrow />
            </Link>
          </div>
          <div className="nv-launch-articles">
            {knowledgeArticles.slice(0, 3).map((a, i) => (
              <Link key={a.id} to={"/blog/" + a.id}>
                <div
                  className={"nv-article-visual nv-article-visual-" + i}
                  aria-hidden="true"
                >
                  {i === 0 ? (
                    <Server size={48} />
                  ) : i === 1 ? (
                    <Cpu size={48} />
                  ) : (
                    <BookOpen size={48} />
                  )}
                  <span />
                  <span />
                </div>
                <div className="nv-launch-article-copy">
                  <small>
                    {n(a.minutes)} {s("دقیقه مطالعه", "min read")}
                  </small>
                  <h3>{text(a.title)}</h3>
                  <p>{text(a.summary)}</p>
                  <span>
                    {s("بخوانید", "Read article")}
                    <DirectionArrow size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="nv-container nv-launch-faq" data-reveal>
          <div>
            <span className="nv-launch-eyebrow">BEFORE YOUR NEXT STEP</span>
            <h2>{s("هنوز سؤالی دارید؟", "Still have a question?")}</h2>
            <p>{s("از همین‌جا شروع کنیم.", "Let’s start here.")}</p>
            <Link to="/contact" className="nv-launch-text-link">
              {s("گفتگو با تیم نوین", "Talk to our team")}
              <DirectionArrow />
            </Link>
          </div>
          <FaqList limit={4} />
        </section>
      </div>
    </SiteLayout>
  );
}

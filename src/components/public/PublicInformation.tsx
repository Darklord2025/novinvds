import CountryFlag from "./CountryFlag";
import { publicRegions } from "@/data/publicGeography";
import { useState, type FormEvent } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Download,
  ExternalLink,
  Globe,
  Headphones,
  Layers3,
  Mail,
  Search,
  ShieldCheck,
} from "lucide-react";
import SiteLayout, {
  DirectionArrow,
  PageHero,
  SectionHeading,
  ServiceCta,
} from "./SiteLayout";
import { useSiteCopy } from "./site-copy";
import { FaqList } from "./PublicHome";
import { canonicalDomain, validDomain } from "@/lib/panel-model";
import { panelOrderHref } from "@/data/publicCatalog";
import DomainPricing from "@/components/DomainPricing";
import { countries, datacenters } from "@/data/datacenters";
import { knowledgeArticles } from "@/data/knowledgeArticles";
import { panelGuides } from "@/data/panelGuides";
import { downloadText } from "@/lib/report-export";

export function PublicDomain() {
  const { s } = useSiteCopy(),
    navigate = useNavigate(),
    [params] = useSearchParams(),
    [mode, setMode] = useState(
      ["register", "transfer", "existing"].includes(params.get("mode") || "")
        ? params.get("mode")!
        : "register",
    ),
    [domain, setDomain] = useState(params.get("domain") || ""),
    [error, setError] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!validDomain(domain)) {
      setError(
        s(
          "نام کامل دامنه را درست وارد کنید؛ مانند example.com",
          "Enter a valid full domain, such as example.com.",
        ),
      );
      return;
    }
    navigate(
      panelOrderHref("order-domain", { mode, domain: canonicalDomain(domain) }),
    );
  }
  return (
    <SiteLayout
      title={s(
        "ثبت، انتقال و اتصال دامنه",
        "Register, transfer & connect domains",
      )}
    >
      <PageHero
        eyebrow="A NAME FOR YOUR NEXT IDEA"
        title={s(
          "شروع هر ایده، یک نام خوب است.",
          "Every idea starts with a great name.",
        )}
        description={s(
          "دامنهٔ جدیدتان را انتخاب کنید، دامنهٔ فعلی را منتقل کنید یا همان نامی را که دارید به سرویس متصل کنید.",
          "Find your new domain, transfer an existing one or connect the name you already own.",
        )}
      />
      <section className="nv-section">
        <div className="nv-container">
          <form className="nv-feature" onSubmit={submit}>
            <div
              className="nv-tabs"
              role="group"
              aria-label={s("عملیات دامنه", "Domain operation")}
            >
              {[
                ["register", "ثبت دامنه", "Register"],
                ["transfer", "انتقال دامنه", "Transfer"],
                ["existing", "اتصال دامنه", "Connect"],
              ].map(([id, fa, en]) => (
                <button
                  type="button"
                  key={id}
                  aria-pressed={mode === id}
                  className={
                    mode === id ? "bg-white text-blue-700 shadow-sm" : ""
                  }
                  onClick={() => {
                    setMode(id);
                    setError("");
                  }}
                >
                  {s(fa, en)}
                </button>
              ))}
            </div>
            <label className="block text-sm mb-3" htmlFor="nv-domain-name">
              {s("نام کامل دامنه", "Full domain name")}
            </label>
            <div className="nv-domain-form">
              <input
                id="nv-domain-name"
                dir="ltr"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setError("");
                }}
                placeholder="your-next-idea.com"
                maxLength={253}
                required
              />
              <button type="submit" className="nv-button">
                {mode === "transfer"
                  ? s("ادامهٔ انتقال", "Continue transfer")
                  : mode === "existing"
                    ? s("ادامهٔ اتصال", "Continue connection")
                    : s("بررسی و ادامه", "Review & continue")}
                <DirectionArrow />
              </button>
            </div>
            {error && (
              <p role="alert" className="text-red-600 mt-3 text-sm">
                {error}
              </p>
            )}
            <p>
              {mode === "transfer"
                ? s(
                    "پیش از انتقال، مالکیت و شرایط انتقال از ثبت‌کننده بررسی می‌شود؛ کد انتقال را فقط در محیط امن حساب وارد کنید.",
                    "Ownership and transfer eligibility are checked with the registrar. Enter authorization codes only in your secure account.",
                  )
                : mode === "existing"
                  ? s(
                      "اتصال دامنه به‌معنای خرید یا انتقال آن نیست؛ تنظیمات DNS و سرویس مقصد در پنل بررسی می‌شوند.",
                      "Connecting a domain does not purchase or transfer it. DNS and the destination service are reviewed in the panel.",
                    )
                  : s(
                      "جستجوی این صفحه تضمین آزاد بودن دامنه نیست. موجودی و قیمت نهایی باید از ثبت‌کننده استعلام شود.",
                      "This form does not guarantee availability. Final availability and pricing require a registrar check.",
                    )}
            </p>
          </form>
        </div>
      </section>
      <section className="nv-section nv-section-soft">
        <div className="nv-container">
          <SectionHeading
            title={s(
              "نام‌ها متفاوت‌اند؛ هزینه‌ها هم شفاف باشند.",
              "Different names. Clearer pricing.",
            )}
            description={s(
              "ثبت، تمدید و انتقال را جداگانه مقایسه کنید. دامنه‌های بین‌المللی یک‌ساله و دامنهٔ ir با دورهٔ یک یا پنج سال بررسی می‌شوند.",
              "Compare registration, renewal and transfer separately. International orders are for one year; ir supports one- or five-year review periods.",
            )}
          />
          <DomainPricing />
        </div>
      </section>
      <section className="nv-section">
        <div className="nv-container">
          <SectionHeading
            title={s("پرسش‌های پیش از سفارش", "Before you order")}
          />
          <FaqList limit={3} />
        </div>
      </section>
      <ServiceCta />
    </SiteLayout>
  );
}

export function PublicLocations() {
  const { s } = useSiteCopy();
  return (
    <SiteLayout title={s("کشورها و مراکز داده", "Countries & datacenters")}>
      <PageHero
        eyebrow="WHERE YOUR IDEAS LIVE"
        title={s(
          "موقعیت را بر اساس مخاطب انتخاب کنید.",
          "Choose a location around your audience.",
        )}
        description={s(
          "مرجع کشورها و مراکز دادهٔ کاتالوگ را ببینید و برای هر سرویس، ظرفیت همان موقعیت را بررسی کنید.",
          "Explore the catalog’s country and datacenter references, then check availability for your chosen service.",
        )}
      />
      <section className="nv-section">
        <div className="nv-container">
          <div className="nv-reference-note">
            {s(
              "این فهرست، مرجع موقعیت است؛ قرارداد تأمین، موجودی سرویس، شبکه و IP هر سفارش باید جداگانه تأیید شوند.",
              "This is a location reference. Supplier contracts, service stock, networking and IP allocation require separate order verification.",
            )}
          </div>
          {publicRegions.map((region) => (
            <section className="nv-location-region" key={region.id}>
              <h2 className="nv-region-title">
                {s(region.title[0], region.title[1])}
              </h2>
              <div className="nv-location-cards">
                {countries
                  .filter((c) => c.region === region.id)
                  .map((c) => (
                    <article className="nv-location-card" key={c.id}>
                      <h2>
                        <CountryFlag code={c.id} />
                        {s(c.fa, c.en)}
                      </h2>
                      <ul>
                        {datacenters
                          .filter((dc) => dc.country === c.id)
                          .map((dc) => (
                            <li key={dc.id}>
                              <a
                                href={dc.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2"
                              >
                                {s(dc.fa, dc.en)}
                                <ExternalLink size={12} />
                              </a>
                            </li>
                          ))}
                      </ul>
                      <Link
                        to={
                          c.id === "ir"
                            ? "/dedicated-plans"
                            : "/dedicated-plans?profile=order-dedicated-country-" +
                              c.id
                        }
                        className="nv-text-link"
                      >
                        {s("بررسی سرور اختصاصی", "Explore dedicated servers")}
                        <DirectionArrow />
                      </Link>
                      <Link
                        to={
                          "/hosting-plans?profile=" +
                          (c.id === "ir"
                            ? "order-hosting-linux-ir"
                            : "order-hosting-country-" + c.id)
                        }
                        className="nv-text-link mt-4"
                      >
                        {s("بررسی میزبانی وب", "Explore web hosting")}
                        <DirectionArrow />
                      </Link>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <ServiceCta />
    </SiteLayout>
  );
}

export function PublicResources({
  view = "blog",
}: {
  view?: "blog" | "knowledge" | "faq" | "downloads";
}) {
  const { s, text, n } = useSiteCopy(),
    { slug } = useParams(),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState(view === "knowledge" ? "guide" : "all"),
    [message, setMessage] = useState("");
  const title =
    view === "faq"
      ? s("سؤالات متداول", "Frequently asked questions")
      : view === "downloads"
        ? s("دانلودها و مستندات", "Downloads & documentation")
        : view === "knowledge"
          ? s("مرکز دانش", "Knowledge center")
          : s("بلاگ و آموزش", "Blog & guides");
  const article = knowledgeArticles.find((a) => a.id === slug),
    rows = knowledgeArticles.filter(
      (a) =>
        (category === "all" ||
          (category === "guide"
            ? panelGuides.some((g) => g.id === a.id)
            : a.category === category)) &&
        (text(a.title) + " " + text(a.summary))
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
    );
  const categories = [
    ["all", "همه", "All"],
    ["services", "انتخاب سرویس", "Choosing services"],
    ["hardware", "سخت‌افزار", "Hardware"],
    ["billing", "مالی", "Billing"],
    ["security", "امنیت", "Security"],
    ["domains", "دامنه", "Domains"],
    ["guide", "راهنمای پنل", "Panel guides"],
  ];
  const articleText = article
    ? text(article.title) +
      "\n\n" +
      article.sections
        .map((sec) => text(sec.heading) + "\n" + text(sec.body))
        .join("\n\n")
    : "";
  return (
    <SiteLayout
      title={
        slug
          ? article
            ? text(article.title)
            : s("مقاله یافت نشد", "Article not found")
          : title
      }
    >
      <PageHero
        eyebrow="THE NOVINVDS FIELD GUIDE"
        title={
          slug
            ? article
              ? text(article.title)
              : s("این مقاله پیدا نشد.", "We couldn’t find this article.")
            : title
        }
        description={
          article
            ? text(article.summary)
            : s(
                "از شناخت سرویس تا مدیریت روزمره؛ راهنماهایی برای انتخاب و استفادهٔ بهتر.",
                "From choosing infrastructure to everyday management. Practical guides to help you build with confidence.",
              )
        }
      />
      <section className="nv-section">
        <div className="nv-container">
          <nav
            className="nv-learn-tabs"
            aria-label={s("بخش‌های یادگیری", "Learning sections")}
          >
            {[
              ["/blog", "بلاگ", "Blog", "blog"],
              ["/knowledge", "مرکز دانش", "Knowledge center", "knowledge"],
              ["/faq", "پرسش‌های متداول", "FAQ", "faq"],
              ["/downloads", "دانلودها", "Downloads", "downloads"],
            ].map(([href, f, en, id]) => (
              <Link
                key={id}
                to={href}
                aria-current={view === id && !slug ? "page" : undefined}
              >
                {s(f, en)}
              </Link>
            ))}
          </nav>
          {slug ? (
            article ? (
              <article className="nv-long-copy">
                <p className="text-xs">
                  {n(article.minutes)} {s("دقیقه مطالعه", "min read")}
                </p>
                {article.sections.map((sec, i) => (
                  <section key={i} id={"section-" + i}>
                    <h2>{text(sec.heading)}</h2>
                    <p>{text(sec.body)}</p>
                  </section>
                ))}
                <div className="nv-button-row mt-8">
                  <button
                    className="nv-button nv-button-outline"
                    onClick={() =>
                      downloadText(article.id + ".txt", articleText)
                    }
                  >
                    <Download size={16} />
                    {s("دانلود متن", "Download text")}
                  </button>
                  <button
                    className="nv-button nv-button-outline"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(location.href);
                        setMessage(s("پیوند کپی شد.", "Link copied."));
                      } catch {
                        setMessage(
                          s(
                            "پیوند را از نوار آدرس کپی کنید.",
                            "Copy the link from the address bar.",
                          ),
                        );
                      }
                    }}
                  >
                    <Copy size={16} />
                    {s("کپی پیوند", "Copy link")}
                  </button>
                </div>
                <p role="status" className="text-xs mt-3">
                  {message}
                </p>
              </article>
            ) : (
              <Link to="/blog" className="nv-button">
                {s("بازگشت به مقاله‌ها", "Back to articles")}
                <DirectionArrow />
              </Link>
            )
          ) : view === "faq" ? (
            <FaqList />
          ) : view === "downloads" ? (
            <>
              <SectionHeading
                title={s("مستقیم از منبع اصلی.", "Straight from the source.")}
                description={s(
                  "نصب‌کننده‌ها و مستندات را از وب‌سایت رسمی سازنده دریافت کنید. امکان نصب روی سرویس انتخابی جداگانه بررسی می‌شود.",
                  "Get installers and documentation from the vendor’s official website. Installation availability is checked for the selected service.",
                )}
              />
              <div className="nv-downloads">
                {[
                  ["Ubuntu", "https://ubuntu.com/download/server"],
                  ["Debian", "https://www.debian.org/distrib/"],
                  ["Rocky Linux", "https://rockylinux.org/download"],
                  ["AlmaLinux", "https://almalinux.org/get-almalinux/"],
                  [
                    "Windows Server",
                    "https://www.microsoft.com/en-us/evalcenter",
                  ],
                  ["MikroTik", "https://mikrotik.com/download"],
                ].map(([name, href]) => (
                  <a
                    href={href}
                    key={name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <strong>{name}</strong>
                      <small>
                        {s("وب‌سایت رسمی سازنده", "Official vendor website")}
                      </small>
                    </span>
                    <ExternalLink size={18} />
                  </a>
                ))}
              </div>
              <div className="nv-reference-note">
                {s(
                  "دانلود نرم‌افزار به‌معنای داشتن مجوز تجاری آن نیست؛ شرایط سازنده و لایسنس سرویس را بررسی کنید.",
                  "Downloading software does not grant a commercial license. Review the vendor’s terms and your service license.",
                )}
              </div>
            </>
          ) : (
            <>
              <div className="nv-catalog-tools">
                <div className="nv-search">
                  <Search size={18} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label={s(
                      "جستجوی مقاله و راهنما",
                      "Search articles & guides",
                    )}
                    placeholder={s(
                      "دنبال چه موضوعی هستید؟",
                      "What would you like to learn?",
                    )}
                  />
                </div>
                <div
                  className="nv-filter-buttons"
                  role="group"
                  aria-label={s("موضوع مقاله", "Article topic")}
                >
                  {categories.map(([id, f, en]) => (
                    <button
                      key={id}
                      aria-pressed={category === id}
                      onClick={() => setCategory(id)}
                    >
                      {s(f, en)}
                    </button>
                  ))}
                </div>
              </div>
              {view === "knowledge" && (
                <div className="nv-reference-note">
                  {s(
                    "راهنمای استفاده از حساب، کیف پول، سفارش، تمدید و امنیت را در موضوع «راهنمای پنل» پیدا کنید.",
                    "Find account, wallet, ordering, renewal and security walkthroughs under Panel guides.",
                  )}
                </div>
              )}
              <div className="nv-article-grid">
                {rows.map((a) => (
                  <Link className="nv-article" to={"/blog/" + a.id} key={a.id}>
                    <div className="nv-article-art">
                      <BookOpen size={45} />
                    </div>
                    <div className="nv-article-body">
                      <small>
                        {n(a.minutes)} {s("دقیقه مطالعه", "min read")}
                      </small>
                      <h3>{text(a.title)}</h3>
                      <p>{text(a.summary)}</p>
                      <span className="nv-text-link">
                        {s("مطالعهٔ راهنما", "Read the guide")}
                        <DirectionArrow />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              {!rows.length && (
                <p className="nv-empty">
                  {s("مقاله‌ای پیدا نشد.", "No articles found.")}
                </p>
              )}
            </>
          )}
        </div>
      </section>
      <ServiceCta />
    </SiteLayout>
  );
}

export function PublicCompany({
  page,
}: {
  page: "about" | "contact" | "affiliate" | "notfound";
}) {
  const { s } = useSiteCopy();
  const contact = page === "contact",
    affiliate = page === "affiliate",
    notfound = page === "notfound";
  const title = notfound
    ? s("صفحه پیدا نشد", "Page not found")
    : contact
      ? s("از اینجا در ارتباط باشیم.", "Let’s start a conversation.")
      : affiliate
        ? s(
            "رشد شما و همراهانتان، کنار هم.",
            "Grow alongside the people you introduce.",
          )
        : s("فضایی برای ساختن قدم بعدی.", "Room to build what comes next.");
  return (
    <SiteLayout title={title}>
      <PageHero
        eyebrow={
          notfound
            ? "404"
            : contact
              ? "LET’S TALK"
              : affiliate
                ? "GROW TOGETHER"
                : "ABOUT NOVINVDS"
        }
        title={title}
        description={
          notfound
            ? s(
                "این نشانی در سایت پیدا نشد. از فهرست خدمات یا صفحهٔ اصلی ادامه دهید.",
                "This address could not be found. Continue from the service catalog or home page.",
              )
            : contact
              ? s(
                  "برای سفارش، بررسی فنی یا پیگیری سرویس، مسیر مناسب را انتخاب کنید.",
                  "Choose the right route for a new order, technical review or existing service.",
                )
              : affiliate
                ? s(
                    "معرفی مشتری، تأیید خرید و پورسانت قابل پیگیری در کیف پول؛ با شرایط تأییدشدهٔ هر حساب.",
                    "Introduce customers and track approved commission in your wallet, under the terms approved for your account.",
                  )
                : s(
                    "نوین وی‌دی‌اس خدمات میزبانی، سرور، دامنه و مدیریت زیرساخت را در یک مسیر انتخاب و یک حساب کاربری کنار هم می‌آورد.",
                    "NovinVDS brings hosting, servers, domains and infrastructure management together through one selection process and one client account.",
                  )
        }
      />
      <section className="nv-section">
        <div className="nv-container">
          {notfound ? (
            <div className="nv-button-row">
              <Link className="nv-button" to="/">
                {s("صفحهٔ اصلی", "Home")}
              </Link>
              <Link className="nv-button nv-button-outline" to="/services">
                {s("همهٔ خدمات", "All services")}
              </Link>
            </div>
          ) : contact ? (
            <div className="nv-contact-grid">
              <article className="nv-info-card">
                <span className="nv-icon nv-blue">
                  <Mail />
                </span>
                <h2>{s("گفتگو دربارهٔ سفارش جدید", "Discuss a new order")}</h2>
                <p>
                  {s(
                    "برای معرفی نیاز یا هماهنگی اولیه از ایمیل استفاده کنید؛ برای ثبت و پیگیری رسمی درخواست، تیکت مناسب‌تر است.",
                    "Use email for an introduction or initial coordination. For a request you can track in your account, open a ticket.",
                  )}
                </p>
                <a
                  className="nv-text-link"
                  href="mailto:info@novinvds.ir"
                  dir="ltr"
                >
                  info@novinvds.ir
                  <ArrowUpRight size={16} />
                </a>
              </article>
              <article className="nv-info-card">
                <span className="nv-icon nv-teal">
                  <Headphones />
                </span>
                <h2>
                  {s(
                    "پیگیری امن در حساب شما",
                    "Follow up securely in your account",
                  )}
                </h2>
                <p>
                  {s(
                    "شناسهٔ سرویس و شرح مشکل را در تیکت ثبت کنید. رمز عبور، کد دومرحله‌ای و اطلاعات پرداخت را در ایمیل عمومی نفرستید.",
                    "Include the service ID and issue details in a ticket. Keep passwords, two-factor codes and payment details out of public email.",
                  )}
                </p>
                <Link className="nv-button" to={panelOrderHref("tickets")}>
                  {s("ورود و ارسال تیکت", "Sign in & open a ticket")}
                  <DirectionArrow />
                </Link>
              </article>
            </div>
          ) : affiliate ? (
            <>
              <div className="nv-info-grid">
                {[
                  [
                    "معرفی کنید",
                    "Introduce",
                    "لینک اختصاصی را از بخش همکاری در فروش حساب خود دریافت کنید.",
                    "Get your account’s referral link from the affiliate section.",
                  ],
                  [
                    "خرید تأیید شود",
                    "Verify the purchase",
                    "سفارش و پرداخت واجد شرایط طبق قرارداد برنامه بررسی می‌شوند.",
                    "Eligible orders and payments are reviewed under the program agreement.",
                  ],
                  [
                    "در کیف پول پیگیری کنید",
                    "Track your wallet",
                    "پورسانت تأییدشده برای خرید سرویس یا درخواست برداشت در کیف پول قرار می‌گیرد.",
                    "Approved commission becomes wallet credit for service purchases or withdrawal requests.",
                  ],
                ].map(([f, en, d, de]) => (
                  <article className="nv-info-card" key={en}>
                    <span className="nv-icon nv-teal">
                      <Check />
                    </span>
                    <h2>{s(f, en)}</h2>
                    <p>{s(d, de)}</p>
                  </article>
                ))}
              </div>
              <div className="nv-reference-note">
                {s(
                  "نرخ پورسانت، شرایط تأیید و برداشت بر اساس قرارداد حساب شما تعیین می‌شوند؛ درآمد ثابت یا تضمینی وعده داده نمی‌شود.",
                  "Commission rates, approval and withdrawals follow your account agreement. No fixed or guaranteed earnings are promised.",
                )}
              </div>
              <Link className="nv-button" to={panelOrderHref("affiliate")}>
                {s("مشاهدهٔ شرایط و شروع", "Review terms & get started")}
                <DirectionArrow />
              </Link>
            </>
          ) : (
            <>
              <div className="nv-long-copy">
                <h2>
                  {s(
                    "از انتخاب تا مدیریت، یک تجربهٔ پیوسته.",
                    "One connected experience, from choice to management.",
                  )}
                </h2>
                <p>
                  {s(
                    "هدف سایت، ساده‌تر کردن انتخاب سرویس است: گزینه‌های منابع، کشور، مرکز داده، سیستم‌عامل و هزینه در کنار هم دیده شوند و سفارش در همان حسابی ادامه پیدا کند که مدیریت و پشتیبانی آن انجام می‌شود.",
                    "The website makes service selection easier by bringing resources, countries, datacenters, operating systems and costs into view. Ordering continues in the account used for management and support.",
                  )}
                </p>
                <h2>
                  {s(
                    "آنچه می‌بینید، با وضعیت مشخص.",
                    "Know the status of what you see.",
                  )}
                </h2>
                <p>
                  {s(
                    "کاتالوگ، نیاز و انتخاب شما را ثبت می‌کند. ظرفیت، قیمت نهایی، سخت‌افزار و زمان ارائه باید از تأمین‌کننده تأیید شوند. پروفایل مرجع یا برآورد اولیه را به‌جای موجودی یا تعهد قطعی معرفی نمی‌کنیم.",
                    "The catalog helps capture your requirements. Capacity, final pricing, hardware and delivery timing must be confirmed with the supplier. Reference profiles and initial estimates are identified clearly.",
                  )}
                </p>
                <div className="nv-button-row mt-7">
                  <Link className="nv-button" to="/services">
                    {s("آشنایی با خدمات", "Explore services")}
                    <DirectionArrow />
                  </Link>
                  <Link className="nv-button nv-button-outline" to="/contact">
                    {s("ارتباط با ما", "Contact us")}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {!notfound && <ServiceCta />}
    </SiteLayout>
  );
}

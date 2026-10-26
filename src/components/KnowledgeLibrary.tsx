import { panelGuides } from "@/data/panelGuides";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { knowledgeArticles } from "@/data/knowledgeArticles";
import { usePanelCopy } from "@/components/user-panel/PanelPrimitives";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/user-panel/BackButton";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Search,
  Clock,
  ArrowLeft,
  ArrowRight,
  Copy,
  Download,
} from "lucide-react";
import { downloadText } from "@/lib/report-export";
export default function KnowledgeLibrary({
  panel = false,
}: {
  panel?: boolean;
}) {
  const { fa, s, n } = usePanelCopy(),
    params = useParams();
  const [section, setSection] = useState(panel ? "guides" : "blog");
  const guideIds = new Set<string>(panelGuides.map((g) => g.id));
  const visibleArticles = knowledgeArticles.filter((a) =>
    section === "guides" ? guideIds.has(a.id) : !guideIds.has(a.id),
  );
  const faqs = [
    [
      "چطور سرویس را تمدید کنم؟",
      "How do I renew a service?",
      "از کارت سرویس، تمدید را انتخاب و دوره را مشخص کنید. پس از تأیید پرداخت و ارائه‌دهنده، تاریخ سرویس تغییر می‌کند.",
      "Select Renew on the service card and choose a term. Expiry changes after payment and provider confirmation.",
    ],
    [
      "موجودی کیف پول چه زمانی افزایش می‌یابد؟",
      "When is my wallet credited?",
      "پس از تأیید واریز توسط درگاه؛ مبلغ رمزارز با نرخ معتبر پرداخت به تومان ثبت می‌شود.",
      "After gateway verification. Crypto deposits are recorded in Toman using the verified payment quote.",
    ],
    [
      "قیمت دامنه برای چند سال است؟",
      "What term do domain prices cover?",
      "تعرفه جدول برای یک سال است. برای دامنه‌های ir دوره یک یا پنج ساله با استعلام ثبت‌کننده ارائه می‌شود.",
      "Table prices cover one year. IR domains offer one or five years subject to registrar confirmation.",
    ],
    [
      "سرور خارج قابل تغییر است؟",
      "Can international hardware be changed?",
      "خیر، پلن‌های خارج کانفیگ ثابت دارند. پلن‌های فعلی نمایشی‌اند و موجودی و قیمت نهایی پس از تأمین اعلام می‌شود.",
      "International plans have fixed configurations. Current examples are demonstrations; availability and final pricing follow supplier confirmation.",
    ],
    [
      "درآمد معرفی کجا واریز می‌شود؟",
      "Where is referral income credited?",
      "پورسانت واجد شرایط پس از تأیید خرید و نرخ همکاری به کیف پول واریز می‌شود و قابل خرید یا درخواست برداشت است.",
      "Eligible commission is credited to your wallet after purchase verification and program-rate approval; use it for services or withdrawal requests.",
    ],
  ];
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("all"),
    [selected, setSelected] = useState(""),
    [message, setMessage] = useState("");
  const id = panel ? selected : params.slug,
    article = knowledgeArticles.find((a) => a.id === id);
  const categories = [
    ["all", "همه مطالب", "All articles"],
    ["services", "سرویس‌ها", "Services"],
    ["hardware", "سخت‌افزار", "Hardware"],
    ["billing", "مالی", "Billing"],
    ["security", "امنیت", "Security"],
    ["domains", "دامنه", "Domains"],
  ];
  if (id && !article)
    return (
      <section className="rounded-2xl border p-8">
        <h1>{s("مقاله یافت نشد.", "Article not found.")}</h1>
        <Link to="/blog">{s("بازگشت به وبلاگ", "Back to blog")}</Link>
      </section>
    );
  if (article)
    return (
      <article className="max-w-4xl mx-auto space-y-7" dir={fa ? "rtl" : "ltr"}>
        {panel ? (
          <BackButton onClick={() => setSelected("")}>
            {s("بازگشت به مرکز دانش", "Back to knowledge base")}
          </BackButton>
        ) : (
          <Button
            asChild
            variant="outline"
            className="panel-back-button rounded-xl border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300"
          >
            <Link to="/blog">{s("بازگشت به وبلاگ", "Back to blog")}</Link>
          </Button>
        )}
        <header className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-7 md:p-10">
          <BookOpen className="h-10 w-10 opacity-70 mb-5" />
          <h1 className="text-2xl md:text-3xl font-extrabold leading-relaxed">
            {article.title[fa ? 0 : 1]}
          </h1>
          <p className="text-blue-100 mt-5 leading-8">
            {article.summary[fa ? 0 : 1]}
          </p>
          <p className="text-xs text-blue-200 mt-6">
            {s("راهنمای نوین وی‌دی‌اس", "NovinVDS guide")} ·{" "}
            {n(article.minutes)} {s("دقیقه مطالعه", "min read")}
          </p>
        </header>
        <div className="grid md:grid-cols-[1fr_220px] gap-7 items-start">
          <div className="space-y-7">
            {article.sections.map((section, i) => (
              <section
                key={i}
                id={"section-" + i}
                className="rounded-2xl border bg-card p-6 space-y-4"
              >
                <h2 className="text-lg font-bold">
                  {section.heading[fa ? 0 : 1]}
                </h2>
                <p className="text-sm md:text-base leading-9 text-muted-foreground">
                  {section.body[fa ? 0 : 1]}
                </p>
              </section>
            ))}
          </div>
          <aside className="rounded-2xl border bg-card p-5 space-y-4 md:sticky md:top-24">
            <strong>{s("در این مقاله", "On this page")}</strong>
            {article.sections.map((sec, i) => (
              <a
                key={i}
                className="block text-sm text-primary leading-7"
                href={"#section-" + i}
              >
                {n(i + 1)}. {sec.heading[fa ? 0 : 1]}
              </a>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                downloadText(
                  article.id + "-" + (fa ? "fa" : "en") + ".txt",
                  article.title[fa ? 0 : 1] +
                    "\n\n" +
                    article.sections
                      .map(
                        (sec) =>
                          sec.heading[fa ? 0 : 1] + "\n" + sec.body[fa ? 0 : 1],
                      )
                      .join("\n\n"),
                )
              }
            >
              <Download size={15} />
              {s("دانلود مقاله", "Download article")}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  location.origin + "/blog/" + article.id,
                );
                setMessage(s("لینک کپی شد.", "Link copied."));
              }}
            >
              <Copy size={15} />
              {s("اشتراک‌گذاری", "Share")}
            </Button>
            <p role="status" className="text-xs">
              {message}
            </p>
          </aside>
        </div>
        <h2 className="font-bold">{s("مطالب مرتبط", "Related articles")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {knowledgeArticles
            .filter((a) => a.id !== article.id)
            .slice(0, 2)
            .map((a) => (
              <Link
                key={a.id}
                to={"/blog/" + a.id}
                className="border rounded-2xl p-5 bg-card"
              >
                {a.title[fa ? 0 : 1]}
              </Link>
            ))}
        </div>
      </article>
    );
  const rows = visibleArticles.filter(
    (a) =>
      (category === "all" || a.category === category) &&
      (a.title[fa ? 0 : 1] + " " + a.summary[fa ? 0 : 1])
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-7" dir={fa ? "rtl" : "ltr"}>
      <header className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 text-white p-7 md:p-10">
        <BookOpen size={36} />
        <h1 className="text-2xl md:text-3xl font-extrabold mt-5">
          {panel
            ? s("مرکز دانش نوین وی‌دی‌اس", "NovinVDS knowledge base")
            : s("وبلاگ و آموزش نوین وی‌دی‌اس", "NovinVDS blog & guides")}
        </h1>
        <p className="text-blue-100 mt-4 text-sm leading-7">
          {s(
            "راهنمای انتخاب سرویس، مدیریت زیرساخت و استفاده بهتر از پنل",
            "Guides for choosing services, managing infrastructure and getting more from your panel",
          )}
        </p>
        <Input
          className="mt-6 max-w-2xl bg-white text-slate-900 h-12"
          placeholder={s(
            "دنبال چه موضوعی هستید؟",
            "What would you like to learn?",
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>
      {panel && (
        <nav
          aria-label={s("بخش‌های مرکز دانش", "Knowledge sections")}
          className="grid sm:grid-cols-3 gap-3"
        >
          {[
            ["guides", "راهنمای سایت", "Site guide"],
            ["faq", "سؤالات متداول", "Frequently asked questions"],
            ["blog", "وبلاگ", "Blog"],
          ].map(([id, f, en]) => (
            <Button
              key={id}
              variant={section === id ? "default" : "outline"}
              onClick={() => {
                setSection(id);
                setCategory("all");
                setQuery("");
              }}
            >
              {s(f, en)}
            </Button>
          ))}
        </nav>
      )}
      {section === "faq" ? (
        <section className="space-y-3">
          {faqs
            .filter((q) =>
              (q[fa ? 0 : 1] + q[fa ? 2 : 3])
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((q, i) => (
              <details key={i} className="rounded-2xl border bg-card p-5">
                <summary className="cursor-pointer font-bold">
                  {q[fa ? 0 : 1]}
                </summary>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                  {q[fa ? 2 : 3]}
                </p>
              </details>
            ))}
        </section>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {categories.map(([key, f, en]) => (
              <Button
                key={key}
                variant={category === key ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setCategory(key)}
              >
                {s(f, en)}{" "}
                <small className="ms-2">
                  {n(
                    key === "all"
                      ? visibleArticles.length
                      : visibleArticles.filter((a) => a.category === key)
                          .length,
                  )}
                </small>
              </Button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {rows.map((a, i) => (
              <article
                key={a.id}
                className="rounded-2xl border bg-card overflow-hidden hover:shadow-md"
              >
                <div
                  className={
                    "h-32 p-6 text-white flex items-center justify-between bg-gradient-to-br " +
                    [
                      "from-blue-500 to-indigo-700",
                      "from-violet-500 to-fuchsia-700",
                      "from-teal-500 to-emerald-700",
                    ][i % 3]
                  }
                >
                  <BookOpen className="h-14 w-14 opacity-60" />
                  <span className="text-xs tracking-widest">
                    NOVINVDS / GUIDE
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <h2 className="font-bold leading-7">{a.title[fa ? 0 : 1]}</h2>
                  <p className="text-sm text-muted-foreground leading-7 line-clamp-3">
                    {a.summary[fa ? 0 : 1]}
                  </p>
                  <div className="text-xs text-muted-foreground flex gap-1 items-center">
                    <Clock size={14} />
                    {n(a.minutes)} {s("دقیقه مطالعه", "min read")}
                  </div>
                  {panel ? (
                    <Button variant="outline" onClick={() => setSelected(a.id)}>
                      {s("مطالعه راهنما", "Read guide")}
                    </Button>
                  ) : (
                    <Button asChild variant="outline">
                      <Link to={"/blog/" + a.id}>
                        {s("مطالعه مقاله", "Read article")}
                        {fa ? (
                          <ArrowLeft size={15} />
                        ) : (
                          <ArrowRight size={15} />
                        )}
                      </Link>
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
          {!rows.length && (
            <p className="border rounded-2xl p-8 text-sm">
              {s(
                "مطلبی با این جستجو یافت نشد.",
                "No articles match your search.",
              )}
            </p>
          )}
        </>
      )}
    </div>
  );
}

import { useState, lazy, Suspense } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  Heart,
  Plus,
  Minus,
  Trash2,
  ArrowLeftRight,
  Check,
  Package,
  Truck,
  CreditCard,
  Wallet,
  FileText,
  UserRound,
  ShieldCheck,
  ChevronDown,
  X,
} from "lucide-react";
import SiteLayout, { DirectionArrow } from "./SiteLayout";
import { useSiteCopy } from "./site-copy";
import {
  equipmentProfiles,
  equipmentCategories,
  equipmentTotals,
  shopAccountModels,
  type EquipmentProfile,
  type ShopAccountModel,
} from "@/data/equipmentStore";

const AccountPreview = lazy(() =>
  import("../shop/ShopAccountLayout").then((m) => ({
    default: m.ShopAccountPreview,
  })),
);
export function EquipmentArt({
  product,
  large = false,
}: {
  product: EquipmentProfile;
  large?: boolean;
}) {
  const category = product.category,
    wireless = category === "wireless",
    optics = category === "optics";
  return (
    <div
      className={
        "nv-equipment-art nv-device-" +
        product.color +
        (large ? " nv-equipment-large" : "")
      }
      role="img"
      aria-label={product.name[1]}
    >
      <svg viewBox="0 0 360 230" fill="none" aria-hidden="true">
        <ellipse
          cx="182"
          cy="195"
          rx="125"
          ry="15"
          fill="currentColor"
          opacity=".1"
        />
        {wireless ? (
          <>
            <ellipse cx="180" cy="115" rx="102" ry="50" fill="#cbd7e6" />
            <ellipse cx="180" cy="105" rx="102" ry="50" fill="#fff" />
            <ellipse
              cx="180"
              cy="105"
              rx="69"
              ry="34"
              stroke="#dde8f1"
              strokeWidth="2"
            />
            <path
              d="M164 109q16-17 32 0m-24 6q8-9 16 0"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="180" cy="122" r="3" fill="currentColor" />
            <path
              d="M102 52q78-54 156 0"
              stroke="currentColor"
              opacity=".15"
              strokeWidth="3"
            />{" "}
          </>
        ) : optics ? (
          <>
            <path d="m90 130 125-45 59 33-124 49-60-37Z" fill="#eef3f8" />
            <path d="m90 130 60 37v26l-60-36v-27Z" fill="#92a5be" />
            <path d="m150 167 124-49v27l-124 48v-26Z" fill="#647b9b" />
            <path d="m91 130-28 9v26l28-9v-26Z" fill="currentColor" />
            <path d="m69 146 15-5v12l-15 5v-12Z" fill="#14233d" />
            <path d="m141 116 67-24 24 13-67 26-24-15Z" fill="white" />
            <path
              d="m155 118 45-17"
              stroke="currentColor"
              strokeWidth="3"
              opacity=".6"
            />
          </>
        ) : (
          <>
            <path d="m48 90 216-30 51 44-217 34-50-48Z" fill="#f3f7fc" />
            <path d="m48 90 50 48v47l-50-47V90Z" fill="#647b9a" />
            <path d="m98 138 217-34v48L98 185v-47Z" fill="#203858" />
            {Array.from(
              {
                length:
                  category === "switch" || category === "accessories" ? 12 : 6,
              },
              (_, i) => (
                <g key={i}>
                  <path
                    d={`m${113 + i * 15} ${149 - i * 2.3} 10-1.5v13l-10 1.5v-13Z`}
                    fill="#081b30"
                    stroke="#8a9fb8"
                    strokeWidth=".7"
                  />
                  <path
                    d={`m${115 + i * 15} ${159 - i * 2.3} 6-.8`}
                    stroke={i % 3 ? "#6bbbc5" : "#ffbd61"}
                    strokeWidth="1.4"
                  />
                </g>
              ),
            )}
            <path d="m155 94 80-11" stroke="#b0c1d5" strokeWidth="2" />
            <path d="m149 104 90-13" stroke="#c6d3e3" strokeWidth="2" />
            {category === "router" && (
              <>
                <path
                  d="M95 95V32m167 45V19"
                  stroke="#243d5c"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </>
            )}
            {category === "firewall" && (
              <path
                d="m191 73 16 6v10q-2 13-16 20-14-3-16-15V81l16-8Z"
                fill="currentColor"
                opacity=".8"
              />
            )}
            <circle cx="296" cy="138" r="2.5" fill="#6ed8c1" />
          </>
        )}
      </svg>
      <span className="nv-device-orbit" />
      <span className="nv-device-label">{product.id.toUpperCase()}</span>
    </div>
  );
}
export default function EquipmentStore() {
  const { s, text, n, money, fa } = useSiteCopy(),
    [params, setParams] = useSearchParams(),
    view = params.get("view") || "shop",
    product = equipmentProfiles.find((v) => v.id === params.get("product"));
  const [category, setCategory] = useState("all"),
    [query, setQuery] = useState(""),
    [sort, setSort] = useState("featured"),
    [cart, setCart] = useState<{ id: string; quantity: number }[]>([]),
    [favorites, setFavorites] = useState<string[]>([]),
    [compare, setCompare] = useState<string[]>([]),
    [model] = useState<ShopAccountModel>("shared"),
    [payment, setPayment] = useState("gateway"),
    [step, setStep] = useState(0),
    [notice, setNotice] = useState(""),
    [delivery, setDelivery] = useState("shipping");
  const totals = equipmentTotals(cart),
    count = cart.reduce((sum, v) => sum + v.quantity, 0),
    rows = equipmentProfiles
      .filter(
        (p) =>
          (category === "all" || p.category === category) &&
          (text(p.name) + " " + p.id)
            .toLowerCase()
            .includes(query.toLowerCase()),
      )
      .sort((a, b) =>
        sort === "low"
          ? a.price - b.price
          : sort === "high"
            ? b.price - a.price
            : 0,
      );
  const go = (next: string, id?: string) => {
    setNotice("");
    setParams(
      next === "shop" ? {} : { view: next, ...(id ? { product: id } : {}) },
    );
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const add = (id: string) => {
    setCart((v) => {
      const exists = v.find((i) => i.id === id);
      return exists
        ? v.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i,
          )
        : [...v, { id, quantity: 1 }];
    });
    setNotice(s("به سبد نمایشی اضافه شد.", "Added to the preview cart."));
  };
  const toggle = (
    id: string,
    list: string[],
    set: (v: string[]) => void,
    max = 99,
  ) => {
    if (list.includes(id)) set(list.filter((v) => v !== id));
    else if (list.length < max) set([...list, id]);
    else
      setNotice(
        s(
          "برای مقایسه حداکثر سه محصول انتخاب کنید.",
          "Compare up to three products.",
        ),
      );
  };
  const labels = equipmentCategories.filter((c) => c.id !== "all");
  if (view === "account-preview")
    return (
      <Suspense fallback={<div aria-busy="true" />}>
        <AccountPreview />
      </Suspense>
    );
  return (
    <SiteLayout title={s("فروشگاه تجهیزات شبکه", "Network equipment shop")}>
      <div className="nv-shop-shell">
        <div className="nv-shop-preview-note">
          <span>{s("پیش‌نمایش فروشگاه", "SHOP PREVIEW")}</span>
          {s(
            "محصولات، قیمت و موجودی نمونه‌اند؛ خرید واقعی فعال نیست.",
            "Products, prices and availability are examples. Live purchasing is not enabled.",
          )}
        </div>
        <div className="nv-container nv-shop-toolbar">
          <button
            type="button"
            className="nv-shop-brand"
            onClick={() => go("shop")}
          >
            <ShoppingBag size={26} />
            <span>
              <strong>{s("تجهیزات شبکه", "NETWORK GEAR")}</strong>
              <small>NovinVDS / STORE</small>
            </span>
          </button>
          <div className="nv-shop-toolbar-actions">
            <button type="button" onClick={() => go("compare")}>
              <ArrowLeftRight size={18} />
              {s("مقایسه", "Compare")} <b>{n(compare.length)}</b>
            </button>
            <button
              type="button"
              className="nv-shop-cart-button"
              onClick={() => {
                go("checkout");
                setStep(0);
              }}
            >
              <ShoppingCart size={19} />
              {s("سبد خرید", "Cart")}
              <b>{n(count)}</b>
            </button>
          </div>
        </div>
        {view === "shop" ? (
          <>
            <section className="nv-store-hero">
              <div className="nv-container">
                <div>
                  <span className="nv-eyebrow">BUILD YOUR NEXT CONNECTION</span>
                  <h1>
                    {s("اتصال‌های بهتر،", "Better connections.")}
                    <br />
                    <em>
                      {s(
                        "از انتخاب بهتر شروع می‌شوند.",
                        "Start with better gear.",
                      )}
                    </em>
                  </h1>
                  <p>
                    {s(
                      "برای دفتر، شعبه یا زیرساخت بعدی‌تان؛ تجهیزات را ببینید، مقایسه کنید و کنار هم بچینید.",
                      "For your office, branch or next infrastructure project. Explore, compare and build your setup.",
                    )}
                  </p>
                  <a className="nv-button" href="#nv-equipment-catalog">
                    {s("کشف تجهیزات", "Explore the gear")}
                    <DirectionArrow />
                  </a>
                  <button
                    type="button"
                    className="nv-text-link"
                    onClick={() => go("checkout")}
                  >
                    {s(
                      "دیدن طرح تسویه و حساب",
                      "Preview checkout & account options",
                    )}
                    <DirectionArrow />
                  </button>
                </div>
                <div className="nv-store-hero-art">
                  <EquipmentArt product={equipmentProfiles[1]} large />
                  <span className="nv-store-floating nv-store-floating-one">
                    <ShieldCheck size={19} />
                    {s(
                      "انتخاب با بررسی سازگاری",
                      "Choose with compatibility review",
                    )}
                  </span>
                  <span className="nv-store-floating nv-store-floating-two">
                    <NetworkDots />
                    {s("شبکه را به هم وصل کنید", "Connect your network")}
                  </span>
                </div>
              </div>
            </section>
            <section className="nv-container nv-store-benefits">
              {[
                [
                  Package,
                  s(
                    "دسته‌بندی تخصصی تجهیزات",
                    "Specialist equipment categories",
                  ),
                ],
                [
                  ArrowLeftRight,
                  s("مقایسه قبل از انتخاب", "Compare before choosing"),
                ],
                [
                  ShieldCheck,
                  s("استعلام قیمت و سازگاری", "Price & compatibility review"),
                ],
                [
                  Truck,
                  s(
                    "ارسال پس از تأیید سفارش",
                    "Delivery after order confirmation",
                  ),
                ],
              ].map(([Icon, label]) => {
                const I = Icon as typeof Package;
                return (
                  <div key={String(label)}>
                    <I size={22} />
                    {String(label)}
                  </div>
                );
              })}
            </section>
            <section
              className="nv-container nv-store-catalog"
              id="nv-equipment-catalog"
            >
              <div className="nv-shop-section-heading">
                <div>
                  <span className="nv-eyebrow">FIND YOUR NEXT PIECE</span>
                  <h2>
                    {s(
                      "یک شبکه، انتخاب‌های دقیق.",
                      "A network built with the right pieces.",
                    )}
                  </h2>
                </div>
                <span>
                  {n(rows.length)} {s("پروفایل نمایشی", "example profiles")}
                </span>
              </div>
              <div
                className="nv-equipment-categories"
                role="group"
                aria-label={s("دسته تجهیزات", "Equipment category")}
              >
                {equipmentCategories.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    aria-pressed={category === c.id}
                    onClick={() => setCategory(c.id)}
                  >
                    {text(c.title)}
                  </button>
                ))}
              </div>
              <div className="nv-store-search-row">
                <div className="nv-search">
                  <Search size={19} />
                  <input
                    aria-label={s("جستجوی تجهیزات", "Search equipment")}
                    placeholder={s(
                      "روتر، سوئیچ، اکسس‌پوینت…",
                      "Router, switch, access point…",
                    )}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <label>
                  {s("مرتب‌سازی", "Sort")}
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    aria-label={s("مرتب‌سازی تجهیزات", "Sort equipment")}
                  >
                    <option value="featured">
                      {s("پیشنهادی", "Featured")}
                    </option>
                    <option value="low">
                      {s(
                        "قیمت نمونه: کم به زیاد",
                        "Example price: low to high",
                      )}
                    </option>
                    <option value="high">
                      {s(
                        "قیمت نمونه: زیاد به کم",
                        "Example price: high to low",
                      )}
                    </option>
                  </select>
                </label>
              </div>
              <div className="nv-equipment-grid">
                {rows.map((p) => (
                  <article className="nv-equipment-card" key={p.id}>
                    <button
                      type="button"
                      className="nv-favorite"
                      aria-pressed={favorites.includes(p.id)}
                      aria-label={s("علاقه‌مندی: ", "Save: ") + text(p.name)}
                      onClick={() => toggle(p.id, favorites, setFavorites)}
                    >
                      <Heart
                        size={18}
                        fill={
                          favorites.includes(p.id) ? "currentColor" : "none"
                        }
                      />
                    </button>
                    <button
                      type="button"
                      className="nv-product-art-button"
                      aria-label={s("جزئیات: ", "Details: ") + text(p.name)}
                      onClick={() => go("product", p.id)}
                    >
                      <EquipmentArt product={p} />
                    </button>
                    <div className="nv-equipment-body">
                      <span className="nv-product-category">
                        {text(labels.find((c) => c.id === p.category)!.title)}
                      </span>
                      <button
                        type="button"
                        className="nv-equipment-title"
                        onClick={() => go("product", p.id)}
                      >
                        {text(p.name)}
                      </button>
                      <ul>
                        {p.specs.map((spec) => (
                          <li key={spec[1]}>
                            <Check size={13} />
                            {text(spec)}
                          </li>
                        ))}
                      </ul>
                      <span className="nv-example-price">
                        {s("قیمت نمونه", "Example price")}
                      </span>
                      <strong className="nv-equipment-price">
                        {money(p.price)}
                      </strong>
                      <div className="nv-equipment-actions">
                        <button
                          type="button"
                          className="nv-button"
                          onClick={() => add(p.id)}
                        >
                          <Plus size={17} />
                          {s("سبد نمایشی", "Preview cart")}
                        </button>
                        <button
                          type="button"
                          className="nv-compare-toggle"
                          aria-label={s("مقایسه: ", "Compare: ") + text(p.name)}
                          aria-pressed={compare.includes(p.id)}
                          onClick={() => toggle(p.id, compare, setCompare, 3)}
                        >
                          <ArrowLeftRight size={19} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {!rows.length && (
                <p className="nv-empty">
                  {s("محصولی پیدا نشد.", "No products found.")}
                </p>
              )}
            </section>
            <section className="nv-container nv-store-consult">
              <div>
                <h2>
                  {s(
                    "تجهیزات و تنظیمات، کنار هم.",
                    "Your equipment. Configured to fit.",
                  )}
                </h2>
                <p>
                  {s(
                    "اگر برای انتخاب یا تنظیم شبکه به راهنمایی نیاز دارید، نیازتان را با تیم خدمات شبکه در میان بگذارید.",
                    "Need help choosing or configuring your network? Discuss your needs with the network services team.",
                  )}
                </p>
              </div>
              <Link to="/network" className="nv-button nv-button-outline">
                {s("خدمات شبکه از راه دور", "Remote network services")}
                <DirectionArrow />
              </Link>
            </section>
          </>
        ) : view === "product" && product ? (
          <section className="nv-container nv-product-detail">
            <button
              type="button"
              className="nv-back-button"
              onClick={() => go("shop")}
            >
              {fa ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}{" "}
              {s("بازگشت به فروشگاه", "Back to shop")}
            </button>
            <div className="nv-product-detail-grid">
              <EquipmentArt product={product} large />
              <div>
                <span className="nv-eyebrow">
                  {text(labels.find((c) => c.id === product.category)!.title)}
                </span>
                <h1>{text(product.name)}</h1>
                <p>{text(product.description)}</p>
                <ul>
                  {product.specs.map((v) => (
                    <li key={v[1]}>
                      <Check size={17} />
                      {text(v)}
                    </li>
                  ))}
                </ul>
                <small>
                  {s(
                    "پروفایل نمایشی · موجودی تأییدنشده",
                    "Example profile · inventory unverified",
                  )}
                </small>
                <span className="nv-example-price">
                  {s("قیمت نمونه، پیش از مالیات", "Example price before tax")}
                </span>
                <strong className="nv-detail-price">
                  {money(product.price)}
                </strong>
                <div className="nv-button-row">
                  <button
                    type="button"
                    className="nv-button"
                    onClick={() => add(product.id)}
                  >
                    <ShoppingCart size={18} />
                    {s("افزودن به سبد نمایشی", "Add to preview cart")}
                  </button>
                  <button
                    type="button"
                    className="nv-button nv-button-outline"
                    onClick={() => {
                      go("checkout");
                      setStep(0);
                    }}
                  >
                    {s("دیدن سبد خرید", "View cart")}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : view === "compare" ? (
          <section className="nv-container nv-shop-compare">
            <h1>{s("مقایسه تجهیزات", "Compare equipment")}</h1>
            <button
              type="button"
              className="nv-text-link"
              onClick={() => go("shop")}
            >
              {s("بازگشت به تجهیزات", "Back to equipment")}
              <DirectionArrow />
            </button>
            {compare.length ? (
              <div className="nv-compare-grid">
                {compare.map((id) => {
                  const p = equipmentProfiles.find((v) => v.id === id)!;
                  return (
                    <article key={id}>
                      <EquipmentArt product={p} />
                      <h2>{text(p.name)}</h2>
                      {p.specs.map((v) => (
                        <p key={v[1]}>{text(v)}</p>
                      ))}
                      <strong>{money(p.price)}</strong>
                      <button
                        type="button"
                        className="nv-button"
                        onClick={() => add(id)}
                      >
                        {s("افزودن به سبد نمایشی", "Add to preview cart")}
                      </button>
                      <button
                        type="button"
                        className="nv-text-link"
                        onClick={() =>
                          setCompare(compare.filter((v) => v !== id))
                        }
                      >
                        {s("حذف از مقایسه", "Remove from comparison")}
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="nv-choice-empty">
                <ArrowLeftRight size={40} />
                <p>
                  {s(
                    "از فهرست، دو یا سه محصول را برای مقایسه انتخاب کنید.",
                    "Select two or three products from the catalog to compare.",
                  )}
                </p>
              </div>
            )}
          </section>
        ) : (
          <section className="nv-container nv-equipment-checkout">
            <div className="nv-shop-section-heading">
              <div>
                <span className="nv-eyebrow">
                  CHECKOUT EXPERIENCE / PREVIEW
                </span>
                <h1>
                  {s(
                    "حساب مشترک، خرید منظم.",
                    "One account. A clearer purchase.",
                  )}
                </h1>
                <p>
                  {s(
                    "مدل حساب مشترک با پنل جدا انتخاب شد. تسویه تجهیزات تا تأیید کاتالوگ و اتصال پرداخت همچنان نمایشی است.",
                    "A shared identity with a separate shop account is selected. Equipment checkout remains a preview until inventory and payment integration.",
                  )}
                </p>
              </div>
              <button
                type="button"
                className="nv-back-button"
                onClick={() => go("shop")}
              >
                {s("ادامه انتخاب تجهیزات", "Continue shopping")}
                <DirectionArrow />
              </button>
            </div>
            <div className="nv-selected-account-model">
              <div>
                <span className="nv-eyebrow">
                  {s("مدل انتخاب‌شده", "SELECTED ACCOUNT MODEL")}
                </span>
                <h2>
                  {s(
                    "یک حساب؛ دو پنل مستقل.",
                    "One account. Two separate panels.",
                  )}
                </h2>
                <p>
                  {s(
                    "همان ورود و کیف پول؛ محیط فروشگاه برای خرید تجهیزات و محیط سرویس‌ها برای مدیریت زیرساخت.",
                    "One sign-in and wallet. A dedicated shop account for equipment and a services panel for infrastructure.",
                  )}
                </p>
              </div>
              <div>
                <Link className="nv-button" to="/shop/account">
                  {s("ورود به پنل فروشگاه", "Open shop account")}
                  <DirectionArrow />
                </Link>
                <button
                  type="button"
                  className="nv-button nv-button-outline"
                  onClick={() => go("account-preview")}
                >
                  {s("دیدن پیش‌نمایش پنل فروشگاه", "Preview shop account")}
                </button>
                <Link className="nv-text-link" to="/user-panel">
                  {s("رفتن به پنل سرویس‌ها", "Open services panel")}
                </Link>
              </div>
            </div>
            <ol className="nv-checkout-steps">
              {[
                s("سبد خرید", "Cart"),
                s("تحویل و حساب", "Delivery & account"),
                s("پرداخت", "Payment"),
              ].map((label, i) => (
                <li key={label} aria-current={step === i ? "step" : undefined}>
                  <button type="button" onClick={() => setStep(i)}>
                    {n(i + 1)} · {label}
                  </button>
                </li>
              ))}
            </ol>
            <div className="nv-checkout-layout">
              <div className="nv-checkout-main">
                {step === 0 ? (
                  <>
                    <h2>{s("سبد خرید تجهیزات", "Equipment cart")}</h2>
                    {cart.length ? (
                      cart.map((line) => {
                        const p = equipmentProfiles.find(
                          (v) => v.id === line.id,
                        )!;
                        return (
                          <article
                            className="nv-equipment-cart-line"
                            key={line.id}
                          >
                            <EquipmentArt product={p} />
                            <div>
                              <strong>{text(p.name)}</strong>
                              <small>
                                {money(p.price)} ·{" "}
                                {s("قیمت نمونه", "Example price")}
                              </small>
                              <div className="nv-quantity-controls">
                                <button
                                  type="button"
                                  disabled={line.quantity <= 1}
                                  aria-label={
                                    s("کاهش تعداد ", "Decrease quantity ") +
                                    text(p.name)
                                  }
                                  onClick={() =>
                                    setCart(
                                      cart.map((v) =>
                                        v.id === line.id
                                          ? { ...v, quantity: v.quantity - 1 }
                                          : v,
                                      ),
                                    )
                                  }
                                >
                                  <Minus size={15} />
                                </button>
                                <b>{n(line.quantity)}</b>
                                <button
                                  type="button"
                                  disabled={line.quantity >= 99}
                                  aria-label={
                                    s("افزایش تعداد ", "Increase quantity ") +
                                    text(p.name)
                                  }
                                  onClick={() =>
                                    setCart(
                                      cart.map((v) =>
                                        v.id === line.id
                                          ? { ...v, quantity: v.quantity + 1 }
                                          : v,
                                      ),
                                    )
                                  }
                                >
                                  <Plus size={15} />
                                </button>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="nv-remove-equipment"
                              aria-label={s("حذف ", "Remove ") + text(p.name)}
                              onClick={() =>
                                setCart(cart.filter((v) => v.id !== line.id))
                              }
                            >
                              <Trash2 size={18} />
                            </button>
                          </article>
                        );
                      })
                    ) : (
                      <div className="nv-choice-empty">
                        <ShoppingBag size={42} />
                        <strong>
                          {s(
                            "سبد نمایشی شما خالی است.",
                            "Your preview cart is empty.",
                          )}
                        </strong>
                        <button
                          type="button"
                          className="nv-button"
                          onClick={() => go("shop")}
                        >
                          {s("انتخاب تجهیزات", "Choose equipment")}
                        </button>
                      </div>
                    )}
                  </>
                ) : step === 1 ? (
                  <>
                    <h2>
                      {s(
                        "تحویل و اطلاعات خریدار",
                        "Delivery & buyer information",
                      )}
                    </h2>
                    <p className="nv-prototype-hint">
                      {s(
                        "این فرم ارسال نمی‌شود؛ فقط اطلاعات نمونه وارد کنید.",
                        "This form is not submitted. Use example information only.",
                      )}
                    </p>
                    <div className="nv-preview-identity">
                      <UserRound size={24} />
                      <div>
                        <strong>
                          {text(
                            shopAccountModels.find((v) => v.id === model)!
                              .title,
                          )}
                        </strong>
                        <p>
                          {model === "shared"
                            ? s(
                                "ورود با همان حساب پنل؛ آدرس‌های ثبت‌شده و سفارش‌های تجهیزات در دسترس خواهند بود.",
                                "Use the existing client sign-in. Saved addresses and equipment orders would live in that account.",
                              )
                            : model === "separate"
                              ? s(
                                  "ورود یا ساخت حساب مخصوص فروشگاه؛ کیف پول جداگانه در صورت انتخاب شما.",
                                  "Sign in or create a store-specific account. A separate wallet would depend on your choice.",
                                )
                              : s(
                                  "ایمیل تأییدشده و کد پیگیری برای دریافت وضعیت سفارش؛ بدون ساخت حساب کامل.",
                                  "Verified email and an order reference for tracking, without creating a full account.",
                                )}
                        </p>
                      </div>
                    </div>
                    <div className="nv-demo-fields">
                      <label>
                        {s("نام گیرنده نمونه", "Example recipient")}
                        <input
                          placeholder={s("نام و نام خانوادگی", "Full name")}
                          autoComplete="off"
                        />
                      </label>
                      {model === "guest" && (
                        <label>
                          {s(
                            "ایمیل نمونه برای پیگیری",
                            "Example tracking email",
                          )}
                          <input
                            type="email"
                            placeholder="buyer@example.com"
                            autoComplete="off"
                          />
                        </label>
                      )}
                      <label>
                        {s("شهر نمونه", "Example city")}
                        <input
                          placeholder={s("تهران", "Tehran")}
                          autoComplete="off"
                        />
                      </label>
                      <label className="nv-wide-field">
                        {s("نشانی نمونه", "Example address")}
                        <textarea
                          placeholder={s(
                            "نشانی فقط برای بررسی ظاهر فرم",
                            "Example address for reviewing this layout",
                          )}
                          rows={3}
                        />
                      </label>
                    </div>
                    <fieldset className="nv-delivery-choices">
                      <legend>{s("نحوه تحویل", "Delivery method")}</legend>
                      {[
                        ["shipping", s("ارسال به نشانی", "Ship to address")],
                        [
                          "pickup",
                          s("تحویل هماهنگ‌شده", "Arranged collection"),
                        ],
                      ].map(([id, title]) => (
                        <label key={id}>
                          <input
                            type="radio"
                            name="delivery"
                            checked={delivery === id}
                            onChange={() => setDelivery(id)}
                          />
                          <Truck size={19} />
                          {title}
                        </label>
                      ))}
                    </fieldset>
                    <p className="nv-prototype-hint">
                      {s(
                        "روش، محل و هزینه تحویل پس از اتصال تأمین‌کننده تعیین می‌شود.",
                        "Delivery methods, locations and charges require supplier integration.",
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <h2>{s("انتخاب روش پرداخت", "Choose a payment method")}</h2>
                    <p className="nv-prototype-hint">
                      {s(
                        "پیش‌نمایش مسیر پرداخت؛ هیچ وجهی دریافت نمی‌شود.",
                        "Payment flow preview. No money will be collected.",
                      )}
                    </p>
                    <div className="nv-demo-payment-options">
                      {[
                        [
                          "gateway",
                          CreditCard,
                          s("درگاه بانکی", "Bank gateway"),
                          s(
                            "پس از تأیید موجودی و مبلغ نهایی",
                            "After stock and final totals are confirmed",
                          ),
                        ],
                        ...(model === "shared"
                          ? [
                              [
                                "wallet",
                                Wallet,
                                s(
                                  "کیف پول حساب فعلی",
                                  "Existing account wallet",
                                ),
                                s(
                                  "همان کیف پول پنل، با ثبت تراکنش تجهیزات",
                                  "The panel wallet, with an equipment transaction",
                                ),
                              ],
                            ]
                          : []),
                        [
                          "proforma",
                          FileText,
                          s("پیش‌فاکتور سازمانی", "Business proforma"),
                          s(
                            "تأیید مشخصات و صدور پیش‌فاکتور پیش از پرداخت",
                            "Buyer review and proforma before payment",
                          ),
                        ],
                      ].map(([id, Icon, title, desc]) => {
                        const I = Icon as typeof Wallet;
                        return (
                          <label key={String(id)}>
                            <input
                              type="radio"
                              name="payment"
                              checked={payment === id}
                              onChange={() => setPayment(String(id))}
                            />
                            <I size={23} />
                            <span>
                              <strong>{String(title)}</strong>
                              <small>{String(desc)}</small>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <div className="nv-payment-preview">
                      <ShieldCheck size={25} />
                      <p>
                        {s(
                          "در نسخه واقعی، رزرو موجودی، هزینه ارسال و قیمت باید در سرور تأیید شوند؛ سپس پرداخت انجام می‌شود.",
                          "In the live store, stock reservation, shipping and totals must be confirmed by the server before payment.",
                        )}
                      </p>
                    </div>
                  </>
                )}
                <div className="nv-checkout-navigation">
                  {step > 0 && (
                    <button
                      type="button"
                      className="nv-button nv-button-outline"
                      onClick={() => setStep(step - 1)}
                    >
                      {s("مرحله قبل", "Previous step")}
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      type="button"
                      className="nv-button"
                      disabled={!cart.length}
                      onClick={() => setStep(step + 1)}
                    >
                      {s("ادامه", "Continue")}
                      <DirectionArrow />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="nv-button"
                      disabled={!cart.length}
                      onClick={() =>
                        setNotice(
                          s(
                            "این پایان پیش‌نمایش است. هیچ سفارش یا پرداختی ثبت نشده؛ برای خرید واقعی باید قیمت، موجودی و ارسال تأیید و درگاه متصل شود.",
                            "This completes the preview. No order or payment was created. Live purchasing requires verified prices, stock, delivery and a payment gateway.",
                          ),
                        )
                      }
                    >
                      {s("دیدن پایان پیش‌نمایش", "Finish the preview")}
                      <Check size={17} />
                    </button>
                  )}
                </div>
              </div>
              <aside className="nv-equipment-summary">
                <span className="nv-eyebrow">
                  {s("خلاصه سبد نمایشی", "PREVIEW ORDER SUMMARY")}
                </span>
                <h2>
                  {n(count)} {s("عدد تجهیزات", "items")}
                </h2>
                <dl>
                  <div>
                    <dt>{s("جمع قیمت نمونه", "Example subtotal")}</dt>
                    <dd>{money(totals.subtotal)}</dd>
                  </div>
                  <div>
                    <dt>{s("مالیات نمونه ۱۰٪", "Example VAT 10%")}</dt>
                    <dd>{money(totals.tax)}</dd>
                  </div>
                  <div>
                    <dt>{s("ارسال", "Delivery")}</dt>
                    <dd>{s("پس از استعلام", "Quoted later")}</dd>
                  </div>
                  <div className="nv-total">
                    <dt>
                      {s(
                        "جمع نمونه بدون ارسال",
                        "Example total before delivery",
                      )}
                    </dt>
                    <dd>{money(totals.total)}</dd>
                  </div>
                </dl>
                <p>
                  {s(
                    "این مبلغ قابل پرداخت نیست. قیمت و موجودی واقعی هنوز تعیین نشده‌اند.",
                    "This amount cannot be paid. Real pricing and stock are not configured.",
                  )}
                </p>
              </aside>
            </div>
          </section>
        )}
        {notice && (
          <div className="nv-shop-notice" role="status">
            <Check size={19} />
            <span>{notice}</span>
            <button
              type="button"
              aria-label={s("بستن پیام", "Dismiss message")}
              onClick={() => setNotice("")}
            >
              <X size={17} />
            </button>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
function NetworkDots() {
  return (
    <span className="nv-network-dots">
      <i />
      <i />
      <i />
    </span>
  );
}

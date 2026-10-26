import { Link } from "react-router-dom";
import {
  Network,
  ShieldCheck,
  Activity,
  Monitor,
  Layers3,
  Wifi,
  ArrowUpRight,
  ShoppingBag,
  Check,
} from "lucide-react";
import { networkOfferings } from "@/data/networkOfferings";
import { panelOrderHref } from "@/data/publicCatalog";
import SiteLayout, {
  PageHero,
  DirectionArrow,
  SectionHeading,
} from "./SiteLayout";
import { useSiteCopy } from "./site-copy";
export default function PublicNetwork() {
  const { s, text, n } = useSiteCopy(),
    icons = {
      routing: Network,
      shield: ShieldCheck,
      activity: Activity,
      monitor: Monitor,
      layers: Layers3,
      wifi: Wifi,
    };
  return (
    <SiteLayout title={s("خدمات شبکه از راه دور", "Remote network services")}>
      <PageHero
        eyebrow="REMOTE NETWORK SERVICES"
        title={s(
          "شبکه‌ای که برای کار شما تنظیم می‌شود.",
          "A network configured around your work.",
        )}
        description={s(
          "از مسیریابی تا پایش؛ محدوده کار، دسترسی و برنامه بازگشت را پیش از شروع مشخص می‌کنیم.",
          "From routing to monitoring. Agree on scope, access and rollback before work begins.",
        )}
      >
        <Link
          className="nv-button"
          to={panelOrderHref("tickets", {
            newTicket: "1",
            department: "sales",
          })}
        >
          {s("شرح نیاز و درخواست بررسی", "Describe your needs")}
          <DirectionArrow />
        </Link>
      </PageHero>
      <section className="nv-section">
        <div className="nv-container">
          <SectionHeading
            title={s(
              "چه کاری برای شبکه‌تان نیاز دارید؟",
              "What does your network need?",
            )}
          />
          <div className="nv-network-grid">
            {networkOfferings.map((v, i) => {
              const Icon = icons[v.icon];
              return (
                <article key={v.id}>
                  <span className="nv-network-number">{n(i + 1)}</span>
                  <span className="nv-icon nv-cyan">
                    <Icon size={28} />
                  </span>
                  <h2>{text(v.title)}</h2>
                  <p>{text(v.description)}</p>
                  <Link
                    className="nv-text-link"
                    to={panelOrderHref("tickets", {
                      newTicket: "1",
                      department: "sales",
                    })}
                  >
                    {s("درخواست بررسی و برآورد", "Request assessment & quote")}
                    <DirectionArrow size={15} />
                  </Link>
                </article>
              );
            })}
          </div>
          <div className="nv-network-process">
            {[
              s("شرح نیاز و وضعیت فعلی", "Describe the current setup"),
              s(
                "توافق روی دسترسی، هزینه و زمان",
                "Agree on access, cost & timing",
              ),
              s(
                "اجرا با نسخه پشتیبان و امکان بازگشت",
                "Implement with backup & rollback",
              ),
            ].map((v) => (
              <span key={v}>
                <Check size={19} />
                {v}
              </span>
            ))}
          </div>
          <div className="nv-shop-promo">
            <div className="nv-shop-promo-art" aria-hidden="true">
              <Network size={64} />
              <Wifi size={42} />
              <ShieldCheck size={36} />
            </div>
            <div>
              <span className="nv-eyebrow">
                {s("تجهیزات شبکه", "NETWORK EQUIPMENT")}
              </span>
              <h2>
                {s(
                  "برای شبکه‌تان، ابزار مناسب انتخاب کنید.",
                  "Find the right gear for your network.",
                )}
              </h2>
              <p>
                {s(
                  "پیش‌نمایش فروشگاه تجهیزات؛ روتر، سوئیچ، اکسس‌پوینت و لوازم جانبی.",
                  "Explore the equipment shop preview: routers, switches, access points and accessories.",
                )}
              </p>
              <Link to="/network-store" className="nv-button">
                <ShoppingBag size={18} />
                {s("ورود به فروشگاه", "Explore the shop")}
                <DirectionArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

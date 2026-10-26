import {countries,countryFromCategory} from "@/data/datacenters";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { usePanelCopy } from "./user-panel/PanelPrimitives";
import VpsOrderPage from "./user-panel/VpsOrderPage";
import DedicatedOrderPage from "./user-panel/DedicatedOrderPage";
import { useCart } from "@/contexts/CartContext";
export default function PublicServerCatalog({
  kind,
}: {
  kind: "vps" | "dedicated";
}) {
  const { s, fa } = usePanelCopy(),
    navigate = useNavigate(),
    { addItem } = useCart();
  const options =
    kind === "vps"
      ? [
          ["order-vps-linux", "لینوکس", "Linux"],
          ["order-vps-windows", "ویندوز", "Windows"],
          ["order-vps-linux-ir", "لینوکس ایران", "Iran Linux"],
          ["order-vps-windows-ir", "ویندوز ایران", "Iran Windows"],
          ["order-vps-hourly", "ساعتی", "Hourly"],
          ["order-vps-daily", "روزانه", "Daily"],
          ["order-vps-multilocation", "چند لوکیشن", "Multi-location"],
          ["order-vps-storage", "ذخیره‌سازی", "Storage"],
          ["order-vps-managed", "مدیریت‌شده", "Managed"],
          ["order-vps-mikrotik", "میکروتیک", "MikroTik"],
          ["order-vps-custom", "سفارشی", "Custom"],
        ]
      : [['order-dedicated-iran','ایران','Iran'],...countries.filter(c=>c.id!=='ir').map(c=>['order-dedicated-country-'+c.id,c.fa,c.en]),['order-dedicated-gpu','GPU خارج','International GPU'],['order-dedicated-storage','ذخیره‌سازی خارج','International storage']];
  const requested =
    new URLSearchParams(location.search).get("profile") ||
    (location.pathname === "/vps-custom"
      ? "order-vps-custom"
      : location.pathname === "/vps-hourly"
        ? "order-vps-hourly"
        : null);
  const [profile, setProfile] = useState(
    options.some((o) => o[0] === requested) ? requested! : options[0][0],
  );
  const title =
    kind === "vps"
      ? s("سرور مجازی نوین", "Novin virtual servers")
      : s("سرور اختصاصی نوین", "Novin dedicated servers");
  const order = (it: any) => {
    addItem({
      id: kind + "-" + (it.supplierPlanId || it.plan?.id || Date.now()),
      name: title + " — " + (it.plan?.name || ""),
      type: kind,
      price: it.price || 0,
      period:
        kind === "vps" ? it.period || it.plan?.period || "ماهانه" : "ماهانه",
      specs:
        kind === "vps"
          ? [
              it.plan?.cpu + " vCPU",
              it.plan?.ram + " GB RAM",
              it.plan?.disk + " GB " + it.plan?.diskType,
            ]
          : [it.plan?.cpu, it.plan?.ram, it.plan?.disk].filter(Boolean),
      meta: { ...it, requiresQuote: true },
    });
    navigate("/user-panel?tab=cart");
  };
  return (
    <>
      <Helmet>
        <title>{title} | NovinVDS</title>
      </Helmet>
      <Navbar />
      <main
        dir={fa ? "rtl" : "ltr"}
        className="pt-28 pb-16 bg-background min-h-screen"
      >
        <div className="container mx-auto px-4 max-w-7xl space-y-7">
          <header className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 p-7 md:p-10 text-white">
            <p className="text-blue-100 text-sm">
              NOVINVDS / {kind.toUpperCase()}
            </p>
            <h1 className="text-3xl font-extrabold mt-4">{title}</h1>
            <p className="text-blue-100 leading-8 mt-4">
              {s(
                "نوع سرویس را انتخاب کنید و مشخصات مخصوص همان سرویس را بررسی کنید. قیمت و موجودی پیش از پرداخت تأیید می‌شود.",
                "Choose a service type and review its own configuration. Pricing and availability are verified before payment.",
              )}
            </p>
          </header>
          <nav
            aria-label={s("نوع سرور", "Server type")}
            className="flex flex-wrap gap-2"
          >
            {options.map(([id, f, en]) => (
              <Button
                key={id}
                variant={profile === id ? "default" : "outline"}
                onClick={() => setProfile(id)}
              >
                {s(f, en)}
              </Button>
            ))}
          </nav>
          {kind === "vps" ? (
            <VpsOrderPage
              key={profile}
              initialProfile={profile}
              initialFamily={
                profile.includes("windows")
                  ? "windows"
                  : profile.includes("mikrotik")
                    ? "appliance"
                    : "linux"
              }
              initialMode={
                profile.includes("hourly")
                  ? "hourly"
                  : profile.includes("multilocation")
                    ? "multilocation"
                    : "virtual"
              }
              onAddToCart={order}
            />
          ) : (
            <DedicatedOrderPage
              key={profile}
              initialProfile={
                profile.includes("gpu")
                  ? "gpu"
                  : profile.includes("storage")
                    ? "storage"
                    : "standard"
              }
              initialCountry={countryFromCategory(profile,profile.includes('gpu')||profile.includes('storage')?'de':'ir')}
              initialRegion={countryFromCategory(profile,profile.includes('gpu')||profile.includes('storage')?'de':'ir')==='ir'?'iran':'international'}
              onAddToCart={order}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

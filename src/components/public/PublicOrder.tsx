import OfferExplorer from "./OfferExplorer";
import {
  offerCountry,
  countriesForOffers,
  offerMode,
} from "@/data/publicGeography";
import { lazy, Suspense, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SiteLayout, { PageHero, PricingNote } from "./SiteLayout";
import { useSiteCopy } from "./site-copy";
import {
  publicFamilies,
  variantsFor,
  type PublicFamily,
} from "@/data/publicCatalog";
import { countryFromCategory } from "@/data/datacenters";
import { useCart } from "@/contexts/CartContext";
import LegacyLocale from "@/components/LegacyLocale";
const VpsOrder = lazy(() => import("@/components/user-panel/VpsOrderPage"));
const DedicatedOrder = lazy(
  () => import("@/components/user-panel/DedicatedOrderPage"),
);
const HostingOrder = lazy(() => import("./PublicHostingOrder"));
type OrderFamily = Extract<PublicFamily, "vps" | "dedicated" | "hosting">;

export default function PublicOrder({
  kind,
  calculator = false,
}: {
  kind: OrderFamily;
  calculator?: boolean;
}) {
  const [selectionPending, setSelectionPending] = useState(false);
  const { s, text } = useSiteCopy(),
    route = useLocation(),
    navigate = useNavigate(),
    { addItem } = useCart(),
    params = new URLSearchParams(route.search);
  const family = publicFamilies.find((f) => f.id === kind)!,
    options = variantsFor(kind);
  const requested =
    params.get("profile") ||
    (calculator
      ? kind === "vps"
        ? "order-vps-custom"
        : "order-hosting-custom-country-ir"
      : route.pathname === "/vps-custom"
        ? "order-vps-custom"
        : route.pathname === "/vps-hourly"
          ? "order-vps-hourly"
          : "");
  const selected = options.find((v) => v.id === requested) || options[0],
    profile = selected.id;
  const country = countryFromCategory(
      profile,
      /gpu|storage/.test(profile) ? "de" : "ir",
    ),
    dc = profile.startsWith("order-dedicated-dc-")
      ? profile.slice("order-dedicated-dc-".length)
      : "";
  const requestedCountry = params.get("country") || "",
    selectedCountry = countriesForOffers([selected], offerMode(selected)).some(
      (c) => c.id === requestedCountry,
    )
      ? requestedCountry
      : offerCountry(selected),
    canConfigure = !!selectedCountry;
  useEffect(() => setSelectionPending(false), [route.search]);
  function order(it: any) {
    addItem({
      id: kind + "-" + (it.supplierPlanId || it.plan?.id || Date.now()),
      name: text(family.title) + " — " + (it.plan?.name || ""),
      type: kind,
      price: it.price || 0,
      period:
        kind === "vps"
          ? it.period || it.plan?.period || s("ماهانه", "Monthly")
          : s("ماهانه", "Monthly"),
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
  }
  return (
    <SiteLayout
      title={
        calculator
          ? s("ماشین‌حساب سرویس", "Service calculator")
          : s("پیکربندی ", "Configure ") + text(family.title)
      }
    >
      <PageHero
        eyebrow={calculator ? "BUILD YOUR OWN" : "CONFIGURE / " + family.tag}
        title={
          calculator
            ? s("منابع شما. انتخاب شما.", "Your resources. Your choice.")
            : text(selected.title)
        }
        description={s(
          "منابع، موقعیت و جزئیات سرویس را بررسی کنید. با ادامهٔ سفارش، انتخاب‌ها در حساب کاربری دنبال می‌شوند.",
          "Review resources, location and service details. Continue your configuration in your account.",
        )}
      />
      <section className="nv-container nv-configurator">
        {calculator && (
          <nav
            className="nv-learn-tabs"
            aria-label={s("نوع ماشین‌حساب", "Calculator type")}
          >
            {(["vps", "hosting", "dedicated"] as const).map((id) => (
              <Link
                aria-current={id === kind ? "page" : undefined}
                key={id}
                to={"/calculator?kind=" + id}
              >
                {text(publicFamilies.find((f) => f.id === id)!.title)}
              </Link>
            ))}
          </nav>
        )}
        <OfferExplorer
          key={profile + "-" + selectedCountry}
          items={options}
          initialId={profile}
          initialCountry={selectedCountry}
          onSelectionChange={() => setSelectionPending(true)}
          onChoose={(href) => {
            setSelectionPending(false);
            const q = new URLSearchParams(href.split("?")[1]);
            if (calculator) q.set("kind", kind);
            navigate(route.pathname + "?" + q.toString());
          }}
        />
        {canConfigure && !selectionPending && (
          <div className="nv-configure-area">
            <Suspense
              fallback={<div className="nv-form-skeleton" aria-busy="true" />}
            >
              <LegacyLocale>
                {kind === "hosting" ? (
                  <HostingOrder key={route.search} profile={profile} />
                ) : kind === "vps" ? (
                  <VpsOrder
                    key={profile + selectedCountry}
                    countryFilter={selectedCountry}
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
                  <DedicatedOrder
                    key={profile}
                    initialProfile={
                      profile.includes("gpu")
                        ? "gpu"
                        : profile.includes("storage")
                          ? "storage"
                          : "standard"
                    }
                    initialRegion={country === "ir" ? "iran" : "international"}
                    initialCountry={country}
                    initialDatacenter={dc}
                    onAddToCart={order}
                  />
                )}
              </LegacyLocale>
            </Suspense>
          </div>
        )}
        <PricingNote />
      </section>
    </SiteLayout>
  );
}

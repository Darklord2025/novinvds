import DatacenterPicker from "./DatacenterPicker";
import { countries, validDatacenter } from "@/data/datacenters";
import BackButton from "./BackButton";
import { useState } from "react";
import { useMarketRates } from "@/hooks/useMarketRates";
import { usePanelCopy, PanelHeading } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import { Server, Globe, ShoppingCart } from "lucide-react";
export default function InternationalDedicatedPlans({
  initialRegion = "eu",
  initialCountry = "de",
  profile = "standard",
  onBack,
  onAddToCart,
}: {
  initialRegion?: string;
  initialCountry?: string;
  profile?: string;
  onBack?: () => void;
  onAddToCart?: (item: any) => void;
}) {
  const { s, n, money } = usePanelCopy();
  const { rates } = useMarketRates();
  const [datacenter, setDatacenter] = useState("");
  const country =
    countries.find((c) => c.id === initialCountry) ||
    countries.find((c) => c.id === "de")!;
  const [region, setRegion] = useState(initialRegion),
    [message, setMessage] = useState("");
  const regionExtra =
    country.region === "na"
      ? 15
      : country.region === "asia" || country.region === "oceania"
        ? 35
        : 0;
  const plans =
    profile === "gpu"
      ? [
          {
            id: "gpu",
            name: "Atlas GPU",
            cpu: "Intel Xeon Silver 4410Y",
            ram: 128,
            drives: "2 × 1920 GB NVMe",
            gpu: "NVIDIA L4 24 GB",
            usd: 449,
          },
        ]
      : profile === "storage"
        ? [
            {
              id: "storage",
              name: "Atlas Storage",
              cpu: "AMD EPYC 9354P",
              ram: 64,
              drives: "4 × 8 TB SATA HDD + 2 × 960 GB SSD",
              gpu: "—",
              usd: 169,
            },
          ]
        : [
            {
              id: "s",
              name: "Atlas S",
              cpu: "AMD EPYC 9354P",
              ram: 64,
              drives: "2 × 960 GB SSD",
              gpu: "—",
              usd: 89,
            },
            {
              id: "m",
              name: "Atlas M",
              cpu: "Intel Xeon Gold 6530",
              ram: 128,
              drives: "2 × 1920 GB NVMe",
              gpu: "—",
              usd: 139,
            },
            {
              id: "l",
              name: "Atlas L",
              cpu: "AMD EPYC 9455P",
              ram: 256,
              drives: "2 × 3840 GB NVMe",
              gpu: "—",
              usd: 229,
            },
          ];
  const fx =
    rates?.usdToman &&
    rates.fxAsOf &&
    Date.now() - Date.parse(rates.fxAsOf) < 172800000
      ? rates.usdToman
      : undefined;
  return (
    <div className="space-y-6">
      <PanelHeading
        title={s(
          "سرور اختصاصی خارج — پلن ثابت",
          "International dedicated — fixed plans",
        )}
        subtitle={s(
          "نمونه طراحی برای نمایش پلن تامین‌کننده؛ کانفیگ قابل ویرایش نیست",
          "Design samples of supplier plans; hardware configurations are fixed",
        )}
        action={
          onBack && (
            <BackButton variant="outline" onClick={onBack}>
              {s("بازگشت", "Back")}
            </BackButton>
          )
        }
      />
      <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
        {s(
          "همه پلن‌های این صفحه نمایشی‌اند؛ موجودی، مدل، قیمت دلاری و کشور تامین‌کننده هنوز تایید نشده است. پس از تامین، مشخصات واقعی جایگزین می‌شوند.",
          "Every plan here is a design sample. Supplier stock, model, USD price and country are unverified. Replace these with actual supplier plans when sourced.",
        )}
      </p>
      <p className="font-semibold">
        {s("کشور انتخابی", "Selected country")}: {s(country.fa, country.en)}
      </p>
      <DatacenterPicker
        country={country.id}
        value={datacenter}
        onChange={setDatacenter}
      />
      <div className="grid lg:grid-cols-3 gap-5">
        {plans.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border bg-card overflow-hidden"
          >
            <header className="bg-gradient-to-br from-blue-600 to-violet-700 p-6 text-white">
              <Server />
              <span className="text-xs block mt-3">
                {s(
                  "پلن نمایشی؛ آماده تحویل نیست",
                  "Demo plan; not ready for delivery",
                )}
              </span>
              <h2 className="text-xl font-extrabold mt-2">{p.name}</h2>
              <p className="text-3xl font-bold mt-4" dir="ltr">
                ${n(p.usd + regionExtra)}
                <small className="text-sm"> / {s("ماه", "month")}</small>
              </p>
            </header>
            <div className="p-5 space-y-4">
              <dl className="space-y-3 text-sm">
                {[
                  ["CPU", n(p.cpu)],
                  ["RAM", n(p.ram) + " GB"],
                  [s("ذخیره‌سازی", "Storage"), n(p.drives)],
                  ["GPU", n(p.gpu)],
                  [s("پورت", "Port"), n("1 Gbps")],
                  [s("ترافیک", "Transfer"), n("10 TB")],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-3 border-b pb-2"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium text-end">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-blue-600 font-bold">
                {fx
                  ? money(Math.ceil((p.usd + regionExtra) * fx))
                  : s("در انتظار نرخ آنلاین ارز", "Waiting for online FX rate")}
              </p>
              <p className="text-xs text-muted-foreground">
                {s(
                  "برآورد با دلار مرجع؛ نرخ نهایی تامین‌کننده و مالیات در استعلام مشخص می‌شود.",
                  "Estimate using reference USD. Supplier settlement rate and taxes require a final quote.",
                )}
              </p>
              <Button
                className="w-full"
                disabled={!validDatacenter(country.id, datacenter)}
                onClick={() => {
                  onAddToCart?.({
                    plan: {
                      name: p.name + " " + region,
                      cpu: p.cpu,
                      ram: p.ram + " GB",
                      disk: p.drives,
                    },
                    supplierPlanId: "demo-" + country.id + "-" + p.id,
                    location: region,
                    country: country.id,
                    datacenterId: datacenter,
                    usdPrice: p.usd + regionExtra,
                    exchangeRate: fx,
                    exchangeAsOf: rates?.fxAsOf,
                    price: fx ? Math.ceil((p.usd + regionExtra) * fx) : 0,
                    requiresQuote: true,
                    inventoryVerified: false,
                    demo: true,
                    fixedConfiguration: true,
                  });
                  setMessage(
                    s(
                      "درخواست پلن نمایشی به سبد اضافه شد؛ برای پرداخت به تامین و استعلام واقعی نیاز دارد.",
                      "Demo plan request added. Sourcing and an actual quote are required before payment.",
                    ),
                  );
                }}
              >
                <ShoppingCart size={16} className="me-2" />
                {s("درخواست همین پلن", "Request this plan")}
              </Button>
            </div>
          </article>
        ))}
      </div>
      <p role="status" className="text-sm">
        {message}
      </p>
    </div>
  );
}

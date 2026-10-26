import DatacenterPicker from "./DatacenterPicker";
import { datacentersFor, validDatacenter } from "@/data/datacenters";
import BackButton from "./BackButton";
import InternationalDedicatedPlans from "./InternationalDedicatedPlans";
import { normalizeDigits } from "@/lib/localized-number";
import { useState } from "react";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Server,
  ShoppingCart,
} from "lucide-react";
import {
  dedicatedModels,
  newDedicatedConfig,
  dedicatedErrors,
  dedicatedEstimate,
  dedicatedDriveLimit,
  dedicatedUnitPrices,
  driveCapacities,
  driveUnitPrice,
  type DedicatedConfig,
  type DriveType,
} from "@/data/dedicatedCatalog";
import {
  emptyOs,
  validOs,
  osLabel,
  type OsSelection,
} from "@/data/operatingSystems";
import OperatingSystemPicker from "./OperatingSystemPicker";
import { Button } from "@/components/ui/button";
import { usePanelCopy, PanelHeading } from "./PanelPrimitives";
import { Input } from "@/components/ui/input";
export default function DedicatedOrderPage({
  onBack,
  onAddToCart,
  initialRegion = "iran",
  reviewOnly = false,
  initialProfile = "standard",
  initialCountry,
  initialDatacenter = "",
}: {
  onBack?: () => void;
  onAddToCart?: (item: any) => void;
  initialRegion?: string;
  reviewOnly?: boolean;
  initialProfile?: string;
  initialCountry?: string;
  initialDatacenter?: string;
}) {
  const { s, n, money, fa } = usePanelCopy();
  const [step, setStep] = useState(1);
  const [datacenter, setDatacenter] = useState(initialDatacenter);
  const [c, setC] = useState(newDedicatedConfig());
  const [os, setOs] = useState<OsSelection>({ ...emptyOs });
  const [panel, setPanel] = useState("");
  const [region, setRegion] = useState(
    initialRegion === "iran"
      ? "ir"
      : initialRegion === "usa"
        ? "us"
        : initialRegion === "asia"
          ? "asia"
          : "eu",
  );
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const model = dedicatedModels.find((m) => m.id === c.modelId)!;
  const units = dedicatedUnitPrices(c);
  const errors = dedicatedErrors(c);
  const estimate = errors.length ? 0 : dedicatedEstimate(c);
  function patch(v: Partial<DedicatedConfig>) {
    setC({ ...c, ...v });
    setSubmitted(false);
  }
  const select = (
    label: string,
    value: string | number,
    options: (string | number | { value: string; label: string })[],
    change: (v: string) => void,
  ) => (
    <label className="text-sm space-y-2 block">
      {label}
      <select
        aria-label={label}
        className="w-full block rounded-xl border bg-background p-3"
        value={value}
        onChange={(e) => change(e.target.value)}
      >
        {options.map((o) =>
          typeof o === "object" ? (
            <option key={o.value} value={o.value}>
              {n(o.label)}
            </option>
          ) : (
            <option key={o} value={o}>
              {n(o)}
            </option>
          ),
        )}
      </select>
    </label>
  );
  const qty = (
    label: string,
    value: number,
    max: number,
    change: (v: number) => void,
    min = 1,
  ) => (
    <label className="block text-sm space-y-2">
      {label}
      <Input
        aria-label={label}
        type="text"
        inputMode="decimal"
        min={min}
        max={max}
        step={1}
        value={n(value)}
        onChange={(e) =>
          change(Number(normalizeDigits(e.target.value).replace(/,/g, "")))
        }
      />
      <small className="text-muted-foreground">
        {s("حد مجاز: ", "Allowed: ")}
        {n(min)}–{n(max)}
      </small>
    </label>
  );
  const unit = (price: number) => (
    <small className="block text-muted-foreground mt-2">
      {s("هر عدد / ماه: ", "Each / month: ")}
      {money(price)} · {s("پیشنهادی", "proposal")}
    </small>
  );
  if (region !== "ir" && !reviewOnly)
    return (
      <InternationalDedicatedPlans
        initialRegion={region}
        initialCountry={
          initialCountry ||
          (region === "us" ? "us" : region === "asia" ? "sg" : "de")
        }
        profile={initialProfile}
        onBack={onBack}
        onAddToCart={onAddToCart}
      />
    );
  return (
    <div className="space-y-6" dir={fa ? "rtl" : "ltr"}>
      <PanelHeading
        title={s(
          "درخواست کانفیگ سرور اختصاصی",
          "Dedicated server configuration request",
        )}
        subtitle={s(
          "مدل سرور، تعداد قطعات و برآورد جزءبه‌جزء",
          "Server model, component quantities and itemized estimates",
        )}
        action={
          onBack && (
            <BackButton variant="outline" onClick={onBack}>
              {s("بازگشت", "Back")}
            </BackButton>
          )
        }
      />
      <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-7">
        {s(
          "مدل‌ها و قیمت‌ها مرجع و پیشنهادی‌اند؛ موجودی تایید نشده است. انتخاب نسل یا مدل به معنی سازگاری قطعی نیست. SKU دستگاه، بک‌پلین، کنترلر، ظرفیت اسلات‌ها، برق، خنک‌کاری، رایزر و فریمور قبل از اعلام قیمت نهایی بررسی می‌شوند.",
          "Models and prices are reference proposals; stock is unverified. Generation or model alone does not prove compatibility. Device SKU, backplane, controller, slots, power, cooling, risers and firmware require operator verification before a final quote.",
        )}
      </p>
      {!reviewOnly && (
        <nav
          aria-label={s("مراحل سفارش سرور", "Server order steps")}
          className="grid grid-cols-4 gap-2 rounded-2xl border bg-card p-3"
        >
          {[
            [1, s("انتخاب سرور", "Select server")],
            [2, s("منابع و قطعات", "Hardware")],
            [3, s("سیستم‌عامل", "OS")],
            [4, s("بررسی سفارش", "Review")],
          ].map(([number, label]) => (
            <button
              key={number}
              onClick={() => Number(number) < step && setStep(Number(number))}
              aria-current={step === number ? "step" : undefined}
              className={
                "rounded-xl p-3 text-sm flex flex-col sm:flex-row items-center justify-center gap-2 " +
                (step === number
                  ? "bg-blue-600 text-white"
                  : "bg-muted/50 text-muted-foreground")
              }
            >
              <span className="font-bold">{n(number)}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
      <div hidden={!reviewOnly && step !== 1} className="space-y-5">
        {!reviewOnly && !validDatacenter("ir", initialDatacenter) && (
          <DatacenterPicker
            country="ir"
            value={datacenter}
            onChange={setDatacenter}
          />
        )}
        <section className="rounded-2xl border bg-card p-5 space-y-5">
          <h2 className="font-bold flex gap-2">
            <Server className="text-blue-500" />
            {s("مدل", "Model")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {dedicatedModels.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setC(newDedicatedConfig(m.id));
                    setSubmitted(false);
                  }}
                  className={
                    "rounded-2xl border p-5 text-start transition-all " +
                    (m.id === c.modelId
                      ? "bg-blue-500/10 border-blue-500 ring-1 ring-blue-500"
                      : "bg-card hover:border-blue-400")
                  }
                >
                  <Server className="text-blue-500 mb-3" />
                  <strong className="block leading-7">{n(m.name)}</strong>
                  <p className="text-xs text-muted-foreground mt-2 leading-6">
                    {n(m.sockets)} {s("سوکت پردازنده", "CPU sockets")} ·{" "}
                    {m.profile.memory}
                  </p>
                  <p className="text-xs text-amber-600 mt-3">
                    {s(
                      "مدل مرجع؛ موجودی تأیید نشده",
                      "Reference model; stock unverified",
                    )}
                  </p>
                </button>
              ))}
            </div>
            {select(
              s("محفظه درایو درخواستی", "Requested drive chassis"),
              c.chassis,
              model.chassisOptions.map((value) => ({
                value,
                label:
                  value === "SFF8"
                    ? s("۸ جایگاه ۲.۵ اینچ", "8 × 2.5-inch bays")
                    : value === "LFF4"
                      ? s("۴ جایگاه ۳.۵ اینچ", "4 × 3.5-inch bays")
                      : s("۱۲ جایگاه ۳.۵ اینچ", "12 × 3.5-inch bays"),
              })),
              (v) =>
                patch({
                  chassis: v as DedicatedConfig["chassis"],
                  drives: [{ type: "SATA SSD", capacityGB: 480, count: 1 }],
                  raid: "none",
                }),
            )}
            <div className="rounded-xl bg-blue-500/5 p-4 text-sm">
              <p>
                {s("اجاره پایه شاسی: ", "Base chassis rental: ")}
                {money(units.base)} / {s("ماه", "month")}
              </p>
              <a
                href={model.profile.source}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline block mt-3"
              >
                {s("مشخصات مرجع سازنده", "Vendor reference specifications")}
              </a>
            </div>
          </div>
        </section>
      </div>
      <div hidden={!reviewOnly && step !== 2} className="space-y-5">
        <div className="grid lg:grid-cols-2 gap-5">
          <section className="rounded-2xl border bg-card p-5 space-y-4">
            <h2 className="font-bold flex gap-2">
              <Cpu className="text-violet-500" />
              {s("پردازنده فیزیکی", "Physical processors")}
            </h2>
            {select(
              s(
                "مدل CPU سازگار با این خانواده",
                "CPU model for this server family",
              ),
              c.cpu,
              model.profile.cpuModels,
              (v) => patch({ cpu: v }),
            )}
            {unit(units.cpu)}
            {qty(s("تعداد CPU", "CPU count"), c.cpuCount, model.sockets, (v) =>
              patch({
                cpuCount: v,
                ramCount: Math.min(c.ramCount, v * model.dimmsPerCpu),
              }),
            )}
            <p className="text-xs text-muted-foreground">
              {s(
                "یک یا دو پردازنده همسان؛ پردازنده نسل جدید روی سوکت نسل قدیمی قابل انتخاب نیست.",
                "Choose one or two matching CPUs. New CPU generations are not offered on incompatible old sockets.",
              )}
            </p>
          </section>
          <section className="rounded-2xl border bg-card p-5 space-y-4">
            <h2 className="font-bold flex gap-2">
              <MemoryStick className="text-emerald-500" />
              {s("ماژول‌های حافظه", "Memory modules")}
            </h2>
            {select(
              s("ظرفیت هر ماژول رم", "Capacity per memory module"),
              c.ramGB,
              model.ramModules.map((g) => ({
                value: String(g),
                label: g + " GB " + model.profile.memory + " ECC RDIMM",
              })),
              (v) => patch({ ramGB: Number(v) }),
            )}
            {unit(units.ram)}
            {qty(
              s("تعداد ماژول رم", "Memory module count"),
              c.ramCount,
              c.cpuCount * model.dimmsPerCpu,
              (v) => patch({ ramCount: v }),
            )}
            <p className="text-sm font-bold">
              {s("مجموع رم: ", "Total RAM: ")}
              {n(c.ramGB * c.ramCount)} GB
            </p>
            <p className="text-xs text-muted-foreground">
              {s(
                "تعداد اسلات با تعداد CPU تغییر می‌کند. چینش کانال و نوع دقیق DIMM پس از بررسی SKU تایید می‌شود.",
                "Available slots depend on CPU count. Channel population and exact DIMM type require SKU verification.",
              )}
            </p>
          </section>
        </div>
        <section className="rounded-2xl border bg-card p-5 space-y-4">
          <h2 className="font-bold flex gap-2">
            <HardDrive className="text-amber-500" />
            {s(
              "نوع، ظرفیت و تعداد درایوها",
              "Drive type, capacity and quantity",
            )}
          </h2>
          {c.drives.map((d, index) => (
            <div
              key={index}
              className="rounded-xl border p-4 grid sm:grid-cols-3 gap-4"
            >
              {select(
                s("نوع درایو", "Drive type") + " " + n(index + 1),
                d.type,
                model.driveTypes.filter(
                  (t) =>
                    driveCapacities(t, c.chassis).length &&
                    (t !== "NVMe SSD" || c.chassis === "SFF8"),
                ),
                (v) => {
                  const type = v as DriveType;
                  patch({
                    drives: c.drives.map((x, i) =>
                      i === index
                        ? {
                            type,
                            capacityGB: driveCapacities(type, c.chassis)[0],
                            count: 1,
                          }
                        : x,
                    ),
                  });
                },
              )}
              {select(
                s("ظرفیت هر درایو", "Capacity per drive") + " " + n(index + 1),
                d.capacityGB,
                driveCapacities(d.type, c.chassis).map((v) => ({
                  value: String(v),
                  label: v + " GB",
                })),
                (v) =>
                  patch({
                    drives: c.drives.map((x, i) =>
                      i === index ? { ...x, capacityGB: Number(v) } : x,
                    ),
                  }),
              )}
              {qty(
                s("تعداد درایو", "Drive count") + " " + n(index + 1),
                d.count,
                dedicatedDriveLimit(c),
                (v) =>
                  patch({
                    drives: c.drives.map((x, i) =>
                      i === index ? { ...x, count: v } : x,
                    ),
                  }),
              )}
              <div className="sm:col-span-3 flex flex-wrap gap-4 justify-between">
                {unit(driveUnitPrice(d))}
                {c.drives.length > 1 && (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      patch({ drives: c.drives.filter((_, i) => i !== index) })
                    }
                  >
                    {s("حذف این گروه", "Remove group")}
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            disabled={c.drives.length >= 4}
            onClick={() =>
              patch({
                drives: [
                  ...c.drives,
                  { type: "SATA SSD", capacityGB: 480, count: 1 },
                ],
              })
            }
          >
            {s("افزودن گروه درایو", "Add drive group")}
          </Button>
          <p className="text-sm">
            {s("جایگاه استفاده‌شده: ", "Requested bays: ")}
            {n(c.drives.reduce((a, d) => a + d.count, 0))} /{" "}
            {n(dedicatedDriveLimit(c))}
          </p>
          {select(
            s("آرایش RAID درخواستی", "Requested RAID layout"),
            c.raid,
            ["none", "RAID1", "RAID10"],
            (v) => patch({ raid: v }),
          )}
          <p className="text-xs text-muted-foreground">
            {s(
              "ظرفیت‌ها هدف درخواست هستند؛ نوع درایو، رابط، کنترلر و تبدیل SFF در شاسی LFF نیازمند بررسی‌اند. ظرفیت خام با فضای قابل استفاده بعد از RAID متفاوت است.",
              "Capacities are review targets. Drive interface, controller and SFF carriers in LFF chassis need verification. Raw capacity differs from usable capacity after RAID.",
            )}
          </p>
        </section>
        <section className="rounded-2xl border bg-card p-5 space-y-5">
          <h2 className="font-bold flex gap-2">
            <Network className="text-cyan-500" />
            {s(
              "شبکه، گرافیک و امکانات تکمیلی",
              "Network, GPU and additional options",
            )}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              {select(
                s("سرعت کارت شبکه — Gbps", "Network adapter speed — Gbps"),
                c.nicGbps,
                [
                  1,
                  10,
                  ...(model.generation >= 9 ? [25] : []),
                  ...(model.generation >= 11 ? [100] : []),
                ],
                (v) => patch({ nicGbps: Number(v) }),
              )}
              {unit(units.nic)}
              {qty(
                s("تعداد کارت شبکه", "Network adapter count"),
                c.nicCount,
                2,
                (v) => patch({ nicCount: v }),
              )}
            </div>
            <div>
              {select(
                s("حافظه کارت گرافیک درخواستی", "Requested GPU memory"),
                c.gpu,
                ["none", "16GB", "24GB", "48GB"],
                (v) => patch({ gpu: v, gpuCount: v === "none" ? 0 : 1 }),
              )}
              {unit(units.gpu)}
              {qty(
                s("تعداد GPU", "GPU count"),
                c.gpuCount,
                c.gpu === "none" ? 0 : model.maxGpuCount,
                (v) => patch({ gpuCount: v }),
                c.gpu === "none" ? 0 : 1,
              )}
            </div>
            <div>
              {qty(
                s("تعداد منبع تغذیه", "Power supply count"),
                c.psuCount,
                2,
                (v) => patch({ psuCount: v }),
              )}
              {unit(units.psu)}
            </div>
            <div>
              {qty(s("تعداد IPv4", "IPv4 count"), c.ipCount, 16, (v) =>
                patch({ ipCount: v }),
              )}
              {unit(units.ip)}
            </div>
            <div>
              {select(
                s("پورت اینترنت — Mbps", "Internet port — Mbps"),
                c.bandwidthMbps,
                [100, 1000, 10000],
                (v) => patch({ bandwidthMbps: Number(v) }),
              )}
              {unit(units.bandwidth)}
            </div>
            <div>
              {select(
                s("بکاپ — GB", "Backup — GB"),
                c.backupGB,
                [0, 100, 500, 1000],
                (v) => patch({ backupGB: Number(v) }),
              )}
              {unit(units.backup)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {s(
              "مدل GPU و NIC، تعداد اسلات و توان مصرفی با دستگاه نهایی بررسی می‌شوند؛ انتخاب این بخش رزرو قطعه نیست. سرعت پورت به معنی ترافیک نامحدود نیست.",
              "GPU/NIC model, slot availability and power budget require final device review; this is not a stock reservation. Port speed does not imply unlimited traffic.",
            )}
          </p>
        </section>
      </div>
      <div hidden={!reviewOnly && step !== 3}>
        <OperatingSystemPicker
          value={os}
          onChange={setOs}
          panel={panel}
          onPanelChange={setPanel}
        />
      </div>
      <section
        hidden={!reviewOnly && step !== 4}
        className="rounded-2xl border bg-card p-5 space-y-4"
      >
        <dl className="grid sm:grid-cols-2 gap-3 rounded-xl bg-blue-500/5 p-4 text-sm">
          <div>
            <dt className="text-muted-foreground">
              {s("مدل انتخابی", "Selected model")}
            </dt>
            <dd className="mt-2 font-semibold">{n(model.name)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">
              {s("منابع انتخابی", "Selected resources")}
            </dt>
            <dd className="mt-2">
              {n(c.cpuCount)} × {n(c.cpu)} · {n(c.ramCount)} × {n(c.ramGB)} GB
              RAM
            </dd>
          </div>
        </dl>
        <label className="text-sm block space-y-2">
          {s(
            "نیازهای دیگر؛ مجازی‌سازی، RAID خاص، مدیریت، مدل GPU یا NIC",
            "Additional needs: virtualization, RAID, management, GPU or NIC model",
          )}
          <textarea
            value={notes}
            maxLength={2000}
            onChange={(e) => setNotes(e.target.value)}
            className="block border rounded-xl bg-background p-3 w-full min-h-24"
          />
        </label>
        <h2 className="text-xl font-bold">
          {s("برآورد اجاره ماهانه", "Monthly rental estimate")}:{" "}
          {money(estimate)}
        </h2>
        <p className="text-sm text-muted-foreground">
          {s(
            "جمع قیمت‌های پیشنهادی قطعات و شاسی، پیش از مالیات و هزینه لایسنس/نصب. استعلام تاییدشده اپراتور مبنای پرداخت است.",
            "Sum of proposed chassis and component rates before tax and software/installation fees. Payment uses the operator’s verified quote.",
          )}
        </p>
        {errors.length > 0 && (
          <p role="alert" className="text-destructive text-sm">
            {s(
              "تعداد یا آرایش قطعات معتبر نیست. تعداد اسلات، درایو و شرایط RAID را بررسی کنید.",
              "Invalid component quantity or layout. Review slots, drives and RAID requirements.",
            )}
          </p>
        )}
        <Button
          disabled={
            !!errors.length ||
            !validOs(os) ||
            (!reviewOnly && !validDatacenter("ir", datacenter))
          }
          onClick={() => {
            onAddToCart?.({
              plan: {
                name: model.name,
                cpu: `${c.cpuCount} × ${c.cpu}`,
                ram: `${c.ramCount} × ${c.ramGB} GB ${model.profile.memory}`,
                disk: c.drives
                  .map((d) => `${d.count} × ${d.capacityGB} GB ${d.type}`)
                  .join(" + "),
              },
              hardware: c,
              hardwareProfileId: model.profile.id,
              location: region,
              country: "ir",
              datacenterId: datacenter,
              os: osLabel(os),
              osSelection: os,
              controlPanel: panel,
              notes,
              price: estimate,
              requiresQuote: true,
              inventoryVerified: false,
              pricingStatus: "proposal",
            });
            setSubmitted(true);
          }}
        >
          <ShoppingCart className="me-2" size={17} />
          {reviewOnly
            ? s("آماده‌سازی خلاصه کانفیگ", "Prepare configuration summary")
            : s(
                "افزودن درخواست کانفیگ به سبد",
                "Add configuration request to cart",
              )}
        </Button>
        {submitted && (
          <p role="status" className="text-emerald-600">
            {s(
              reviewOnly
                ? "خلاصه بررسی آماده شد؛ درخواست ثبت یا اعمال نشده است."
                : "پیش‌نویس درخواست به سبد اضافه شد؛ تا تایید موجودی و قیمت قابل پرداخت نیست.",
              reviewOnly
                ? "Review summary prepared; nothing was submitted or applied."
                : "Request draft added. Inventory and pricing must be confirmed before payment.",
            )}
          </p>
        )}
      </section>
      {!reviewOnly && (
        <footer className="flex items-center justify-between gap-3 rounded-2xl border bg-card p-4">
          <Button
            variant="outline"
            disabled={step === 1}
            onClick={() => setStep((v) => v - 1)}
          >
            {s("مرحله قبل", "Previous step")}
          </Button>
          <p className="text-sm text-muted-foreground">
            {n(step)} / {n(4)}
          </p>
          {step < 4 && (
            <Button
              disabled={
                step === 1
                  ? !validDatacenter("ir", datacenter)
                  : step === 2
                    ? !!errors.length
                    : !validOs(os)
              }
              onClick={() => setStep((v) => v + 1)}
            >
              {s("مرحله بعد", "Next step")}
            </Button>
          )}
        </footer>
      )}
    </div>
  );
}

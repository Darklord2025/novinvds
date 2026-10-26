import { useState } from "react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { usePanelCopy, PanelHeading } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
export default function ManagedSupportOrder() {
  const { data, action, preview } = usePanelData();
  const { s, fa } = usePanelCopy();
  const [service, setService] = useState(""),
    [topic, setTopic] = useState("consult"),
    [details, setDetails] = useState(""),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const options = [
    ["consult", "مشاوره و عیب‌یابی", "Consultation and troubleshooting"],
    ["migration", "انتقال و راه‌اندازی", "Migration and setup"],
    ["managed", "مدیریت دوره‌ای سرور", "Ongoing server management"],
  ];
  return (
    <div className="space-y-5">
      <PanelHeading
        title={s("پشتیبانی تخصصی", "Managed support")}
        subtitle={s(
          "درخواست بررسی و پیشنهاد خدمات؛ جدا از فروش افزونه‌ها",
          "Request an assessment and service proposal, separate from add-ons",
        )}
      />
      <div className="grid md:grid-cols-3 gap-4">
        {options.map(([id, f, en]) => (
          <button
            key={id}
            onClick={() => setTopic(id)}
            className={
              "rounded-2xl border p-6 text-start " +
              (topic === id ? "bg-teal-500/10 border-teal-500" : "bg-card")
            }
          >
            <strong>{s(f, en)}</strong>
            <p className="text-sm text-muted-foreground mt-3">
              {s(
                "محدوده کار، زمان و هزینه پس از بررسی اعلام می‌شود.",
                "Scope, timing and pricing follow review.",
              )}
            </p>
          </button>
        ))}
      </div>
      <form
        className="rounded-2xl border bg-card p-5 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            const ticket = await action("ticket-create", {
              subject: options.find((o) => o[0] === topic)![fa ? 1 : 2],
              department: "technical",
              body: `Service: ${service || "general"}\n${details}`,
            });
            setMessage(
              (preview
                ? s("درخواست نمونه ایجاد شد.", "Sample request created.")
                : s("تیکت درخواست ثبت شد.", "Request ticket created.")) +
                " " +
                (ticket?.number || ticket?.id || ""),
            );
          } catch (e) {
            setMessage((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <label className="block text-sm">
          {s("سرویس مرتبط", "Related service")}
          <select
            className="block w-full border rounded-xl bg-background p-3 mt-2"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">
              {s("مشاوره عمومی", "General consultation")}
            </option>
            {data.services.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {v.id}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          {s("شرح نیاز", "Requirements")}
          <textarea
            required
            minLength={5}
            maxLength={4000}
            className="w-full border bg-background rounded-xl p-3 mt-2 min-h-36"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <Button disabled={busy || details.trim().length < 5}>
          {s("ثبت درخواست پشتیبانی", "Submit support request")}
        </Button>
        <p role="status" className="text-sm">
          {message}
        </p>
      </form>
    </div>
  );
}
function faIndex(lang: string) {
  return lang === "fa" ? 1 : 2;
}

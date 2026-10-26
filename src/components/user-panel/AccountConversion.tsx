import { useState } from "react";
import { Building2, UserRoundCheck } from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { officialDetailsValid } from "@/lib/panel-model";
import { normalizeDigits } from "@/lib/localized-number";
export default function AccountConversion() {
  const { data, action } = usePanelData(),
    { s, n } = usePanelCopy();
  const company = data.profile.kind === "company";
  const [form, setForm] = useState({
      ...data.profile,
      kind: "company" as const,
    }),
    [reason, setReason] = useState(""),
    [accepted, setAccepted] = useState(false),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const pending = data.requests.some(
    (r) =>
      r.kind === (company ? "representative-change" : "account-conversion") &&
      ["pending", "preview", "approved"].includes(r.status),
  );
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!accepted) return;
        setBusy(true);
        try {
          if (!company && !officialDetailsValid(form))
            throw Error(
              s(
                "مشخصات حقوقی را کامل و صحیح وارد کنید.",
                "Complete the company details.",
              ),
            );
          const result = await action(
            company ? "representative-change" : "account-conversion",
            company
              ? { name: form.name, nationalId: form.nationalId, reason }
              : { profile: form },
          );
          setMessage(
            result.preview
              ? s(
                  "درخواست فقط در پیش‌نمایش ثبت شد.",
                  "Request recorded in preview only.",
                )
              : s(
                  "درخواست احراز با تیکت ثبت شد: ",
                  "Verification request created. Ticket: ",
                ) + n(result.ticketNumber),
          );
        } catch (e) {
          setMessage((e as Error).message);
        } finally {
          setBusy(false);
        }
      }}
      className="rounded-2xl border border-violet-500/20 bg-card p-5 space-y-5"
    >
      <h2 className="flex gap-2 font-bold">
        {company ? (
          <UserRoundCheck className="text-violet-500" />
        ) : (
          <Building2 className="text-violet-500" />
        )}
        {company
          ? s("تغییر نماینده حساب حقوقی", "Change company representative")
          : s(
              "تبدیل حساب حقیقی به حقوقی",
              "Convert individual account to company",
            )}
      </h2>
      <p className="text-sm text-muted-foreground leading-7">
        {company
          ? s(
              "نام نماینده در پنل نمایش داده می‌شود. تغییر نماینده پس از بررسی اختیار نمایندگی و احراز هویت توسط پشتیبانی انجام می‌شود.",
              "The representative name appears in the panel. Changes require support verification of identity and company authorization.",
            )
          : s(
              "این تبدیل پس از تایید مدارک، فقط یک‌بار انجام می‌شود و بازگشت به حساب حقیقی از پنل ممکن نیست. اطلاعات ثبت‌شده شرکت و نماینده مجاز باید با مدارک تطابق داشته باشد.",
              "This conversion is performed once after document verification. It cannot be reversed from the panel. Company details and the authorized representative must match supporting records.",
            )}
      </p>
      {pending ? (
        <p className="rounded-xl bg-amber-500/10 p-4 text-sm">
          {s(
            "درخواست در حال بررسی است. وضعیت را از تیکت مربوطه پیگیری کنید.",
            "A request is under review. Track it through the related ticket.",
          )}
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            {(company
              ? [
                  ["name", "نام نماینده جدید", "New representative name"],
                  [
                    "nationalId",
                    "کد ملی نماینده",
                    "Representative national ID",
                  ],
                ]
              : [
                  ["company", "نام کامل شرکت", "Registered company name"],
                  ["nationalId", "شناسه ملی شرکت", "Company national ID"],
                  ["economicCode", "کد اقتصادی", "Economic code"],
                  ["registrationNumber", "شماره ثبت", "Registration number"],
                  ["postalCode", "کد پستی شرکت", "Company postal code"],
                  ["address", "نشانی ثبتی شرکت", "Registered company address"],
                  [
                    "name",
                    "نام نماینده مجاز",
                    "Authorized representative name",
                  ],
                ]
            ).map(([key, f, en]) => (
              <Label key={key}>
                {s(f, en)}
                <Input
                  className="mt-2"
                  value={String(form[key as keyof typeof form])}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: [
                        "nationalId",
                        "postalCode",
                        "economicCode",
                        "registrationNumber",
                      ].includes(key)
                        ? normalizeDigits(e.target.value)
                        : e.target.value,
                    })
                  }
                  required
                />
              </Label>
            ))}
          </div>
          {company && (
            <Label className="block">
              {s(
                "علت تغییر و مرجع اختیار نمایندگی",
                "Reason and authorization reference",
              )}
              <textarea
                className="border bg-background p-3 rounded-xl w-full mt-2"
                value={reason}
                minLength={20}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Label>
          )}
          <p className="text-xs leading-7 text-muted-foreground">
            {s(
              "پشتیبانی تصویر مدارک ثبتی، آگهی رسمی و معرفی‌نامه نماینده را از مسیر امن تیکت دریافت و بررسی می‌کند. ارسال این فرم، احراز یا تبدیل خودکار نیست.",
              "Support obtains and verifies registration documents, official notices and representative authorization through a secure ticket process. Submitting this form does not automatically verify or convert the account.",
            )}
          </p>
          <label className="flex gap-2 items-start text-sm">
            <input
              className="mt-1"
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              required
            />
            <span>
              {s(
                "صحت اطلاعات و اختیار ثبت این درخواست را تایید می‌کنم.",
                "I confirm the information is accurate and I am authorized to submit this request.",
              )}
            </span>
          </label>
          <Button disabled={busy || !accepted}>
            {s("ثبت درخواست احراز", "Submit verification request")}
          </Button>
        </>
      )}
      <p role="status" className="text-sm">
        {message}
      </p>
    </form>
  );
}

import { normalizeDigits } from "@/lib/localized-number";
import React, { useState } from "react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { officialDetailsValid, type AccountProfile } from "@/lib/panel-model";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function OfficialInvoiceRequest({
  invoiceId,
  open,
  onClose,
}: {
  invoiceId: string;
  open: boolean;
  onClose: () => void;
}) {
  const { data, action, preview, createTicket } = usePanelData();
  const { s } = usePanelCopy();
  const [profile, setProfile] = useState<AccountProfile>(data.profile),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [done, setDone] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!officialDetailsValid(profile)) {
      setError(
        s(
          "اطلاعات هویتی، کد پستی و نشانی را کامل کنید.",
          "Complete your identity, postal code and address.",
        ),
      );
      return;
    }
    setBusy(true);
    try {
      const r = await action("official-invoice", { invoiceId, profile });
      if (preview) {
        const t = await createTicket(
          s("درخواست فاکتور رسمی ", "Official invoice request ") + invoiceId,
          "billing",
          s("درخواست پیش‌نمایش برای فاکتور ", "Preview request for invoice ") +
            invoiceId,
        );
        setDone(
          s("درخواست نمونه با تیکت شماره ", "Preview request with ticket ") +
            t.number,
        );
      } else
        setDone(
          s("درخواست ثبت شد. شماره تیکت: ", "Request submitted. Ticket: ") +
            r.ticketNumber,
        );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const fields: [keyof AccountProfile, string, string][] = [
    ["name", "نام و نام خانوادگی", "Full name"],
    ...(profile.kind === "company"
      ? ([
          ["company", "نام شرکت", "Company"],
          ["economicCode", "کد اقتصادی", "Economic code"],
          ["registrationNumber", "شماره ثبت", "Registration number"],
        ] as [keyof AccountProfile, string, string][])
      : []),
    [
      "nationalId",
      profile.kind === "company" ? "شناسه ملی شرکت" : "کد ملی",
      profile.kind === "company" ? "Company national ID" : "National ID",
    ],
    ["postalCode", "کد پستی", "Postal code"],
    ["address", "نشانی کامل", "Full address"],
  ];
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-xl max-h-[90dvh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {s("درخواست فاکتور رسمی", "Request an official invoice")}
          </DialogTitle>
          <DialogDescription>
            {s(
              "درخواست در امور مالی و به شکل یک تیکت پیگیری می‌شود. سند نهایی پس از تایید و پرداخت صادر می‌شود.",
              "A billing ticket tracks your request. The final document requires verification and payment.",
            )}
          </DialogDescription>
        </DialogHeader>
        {done ? (
          <>
            <p
              role="status"
              className="rounded-xl bg-emerald-500/10 text-emerald-600 p-4"
            >
              {done}
            </p>
            <Button onClick={onClose}>{s("بستن", "Close")}</Button>
          </>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <p className="text-sm">
              {profile.kind === "company"
                ? s(
                    "فاکتور حقوقی مطابق حساب تاییدشده",
                    "Company invoice for your verified account",
                  )
                : s(
                    "فاکتور حقیقی مطابق نوع حساب",
                    "Individual invoice for your account",
                  )}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {fields.map(([key, fa, en]) => (
                <Label key={key}>
                  {s(fa, en)}
                  <Input
                    required={key !== "registrationNumber"}
                    value={String(profile[key])}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        [key]: [
                          "nationalId",
                          "postalCode",
                          "economicCode",
                          "registrationNumber",
                        ].includes(key)
                          ? normalizeDigits(e.target.value)
                          : e.target.value,
                      }))
                    }
                  />
                </Label>
              ))}
            </div>
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
            <Button disabled={busy} className="w-full">
              {s(
                "ثبت درخواست و ایجاد تیکت",
                "Submit request and create ticket",
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

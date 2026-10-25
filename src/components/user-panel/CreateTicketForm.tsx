import React, { useRef, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Headphones,
  Wallet,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PanelHeading, usePanelCopy } from "./PanelPrimitives";
import {
  supportDepartments,
  technicalTeam,
  issuesFor,
  type SupportDepartment,
} from "../../../supabase/functions/_shared/support-routing";
export default function CreateTicketForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (...args: any[]) => void;
  onCancel: () => void;
}) {
  const { data, createTicket } = usePanelData(),
    { s, fa, n } = usePanelCopy();
  const [step, setStep] = useState(0),
    [resourceId, setResourceId] = useState(""),
    [department, setDepartment] = useState<SupportDepartment>(() => {
      const d = new URLSearchParams(location.search).get("department");
      return supportDepartments.find((v) => v.id === d)?.id || "technical";
    }),
    [issueId, setIssueId] = useState(""),
    [subject, setSubject] = useState(""),
    [body, setBody] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const resources = [
    ...data.services.map((v) => ({ id: v.id, name: v.name, kind: v.kind })),
    ...data.domains.map((v) => ({ id: v.id, name: v.domain, kind: "domain" })),
  ];
  const resource = resources.find((v) => v.id === resourceId),
    issues = issuesFor(department, resource?.kind),
    issue = issues.find((v) => v.id === issueId);
  const text = (v: readonly string[]) => v[fa ? 0 : 1];
  const move = (v: number) => {
    setError("");
    setStep(v);
    requestAnimationFrame(() => {
      titleRef.current?.focus();
      titleRef.current?.scrollIntoView({ block: "nearest" });
    });
  };
  const icons = [Headphones, Wallet, ShoppingBag, ShieldCheck];
  const deptLabel = (id: string) =>
    text(
      id === "technical"
        ? technicalTeam(resource?.kind)
        : supportDepartments.find((d) => d.id === id)!.title,
    );
  return (
    <div className="space-y-5 max-w-4xl">
      <PanelHeading
        title={s("ثبت تیکت جدید", "Open a support ticket")}
        action={
          <Button variant="outline" onClick={onCancel}>
            {fa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}{" "}
            {s("بازگشت به تیکت‌ها", "Back to tickets")}
          </Button>
        }
      />
      <ol
        aria-label={s("مراحل ثبت تیکت", "Ticket steps")}
        className="grid grid-cols-3 gap-2"
      >
        {[
          s("سرویس و دپارتمان", "Service & department"),
          s("راهنمای حل مشکل", "Troubleshooting"),
          s("ثبت درخواست", "Submit request"),
        ].map((label, i) => (
          <li
            key={label}
            aria-current={step === i ? "step" : undefined}
            className={
              "rounded-xl p-3 text-xs sm:text-sm border " +
              (step === i
                ? "bg-blue-600 text-white border-blue-600"
                : step > i
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-card text-muted-foreground")
            }
          >
            <span className="me-2">{n(i + 1)}</span>
            {label}
          </li>
        ))}
      </ol>
      <div className="rounded-2xl border bg-card p-5 sm:p-7 space-y-5">
        <h2
          ref={titleRef}
          tabIndex={-1}
          className="text-lg font-bold outline-none"
        >
          {step === 0
            ? s("در چه زمینه‌ای کمک می‌خواهید؟", "What do you need help with?")
            : step === 1
              ? s("مشکل شما چیست؟", "What is the issue?")
              : s("جزئیات درخواست را بنویسید", "Tell us about your request")}
        </h2>
        {step === 0 ? (
          <>
            <Label htmlFor="ticket-service">
              {s("سرویس مرتبط", "Related service")}
            </Label>
            <select
              id="ticket-service"
              className="w-full rounded-xl border bg-background p-3"
              value={resourceId}
              onChange={(e) => {
                setResourceId(e.target.value);
                setIssueId("");
              }}
            >
              <option value="">
                {s(
                  "درخواست عمومی / پیش از خرید / حساب کاربری",
                  "General / pre-sales / account request",
                )}
              </option>
              {resources.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} · {v.id}
                </option>
              ))}
            </select>
            {!resources.length && (
              <p className="text-sm text-muted-foreground">
                {s(
                  "سرویسی در حساب شما ثبت نشده؛ درخواست عمومی در دسترس است.",
                  "There are no services on your account. You can open a general request.",
                )}
              </p>
            )}
            <fieldset>
              <legend className="mb-3 text-sm font-medium">
                {s("دپارتمان مربوطه", "Relevant department")}
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {supportDepartments.map((d, i) => {
                  const Icon = icons[i];
                  return (
                    <label
                      key={d.id}
                      className={
                        "cursor-pointer rounded-xl border p-4 flex items-start gap-3 " +
                        (department === d.id
                          ? "border-blue-500 bg-blue-50 text-blue-950"
                          : "")
                      }
                    >
                      <input
                        type="radio"
                        name="department"
                        value={d.id}
                        checked={department === d.id}
                        onChange={() => {
                          setDepartment(d.id);
                          setIssueId("");
                        }}
                        className="mt-1"
                      />
                      <Icon size={21} className="shrink-0 text-blue-600" />
                      <span>
                        <strong className="block text-sm">
                          {deptLabel(d.id)}
                        </strong>
                        <small className="text-muted-foreground">
                          {text(d.description)}
                        </small>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <Button type="button" onClick={() => move(1)}>
              {s("ادامه و بررسی راهنما", "Continue to troubleshooting")}
            </Button>
          </>
        ) : step === 1 ? (
          <>
            <p className="text-sm text-muted-foreground">
              {s(
                "موضوع نزدیک به مشکل خود را انتخاب کنید. اگر راهنما کافی نبود، درخواستتان را ارسال کنید.",
                "Choose the closest issue. If the guide does not help, continue to submit your request.",
              )}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {issues.map((v) => (
                <button
                  type="button"
                  key={v.id}
                  aria-pressed={issueId === v.id}
                  onClick={() => setIssueId(v.id)}
                  className={
                    "p-4 border rounded-xl text-start flex gap-3 items-center " +
                    (issueId === v.id
                      ? "border-blue-500 bg-blue-50 text-blue-950"
                      : "")
                  }
                >
                  <BookOpen size={20} className="shrink-0 text-blue-600" />
                  {text(v.title)}
                </button>
              ))}
              <button
                type="button"
                aria-pressed={issueId === "other"}
                onClick={() => setIssueId("other")}
                className={
                  "p-4 border rounded-xl text-start " +
                  (issueId === "other"
                    ? "border-blue-500 bg-blue-50 text-blue-950"
                    : "")
                }
              >
                {s(
                  "موضوع دیگری دارم / در فهرست نیست",
                  "Something else / my issue is not listed",
                )}
              </button>
            </div>
            {issue && (
              <div
                className="rounded-xl bg-blue-50 text-blue-950 p-5 space-y-4"
                role="region"
                aria-label={s("راهنمای پیشنهادی", "Suggested help")}
              >
                <h3 className="font-bold">{text(issue.title)}</h3>
                <p className="text-sm leading-7">{text(issue.tips)}</p>
                <a
                  href={"/blog/" + issue.article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  {s(
                    "مطالعه راهنما در صفحه جدید",
                    "Open the guide in a new tab",
                  )}
                </a>
                <div>
                  <Button type="button" variant="outline" onClick={onCancel}>
                    <CheckCircle2 size={16} />
                    {s(
                      "مشکل حل شد؛ بازگشت به تیکت‌ها",
                      "Solved — return to tickets",
                    )}
                  </Button>
                </div>
              </div>
            )}
            <div className="flex gap-3 flex-wrap">
              <Button type="button" variant="outline" onClick={() => move(0)}>
                {s("مرحله قبل", "Previous step")}
              </Button>
              <Button
                type="button"
                disabled={!issueId}
                onClick={() => {
                  if (!subject && issue) setSubject(text(issue.title));
                  move(2);
                }}
              >
                {s("نیاز به ارسال تیکت دارم", "Continue to ticket form")}
              </Button>
            </div>
          </>
        ) : (
          <form
            className="space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              if (busy) return;
              setError("");
              setBusy(true);
              try {
                await createTicket(subject, department, body, {
                  resourceId: resource?.id,
                  resourceKind: resource?.kind,
                  issueId,
                });
                onSubmit();
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            <div className="rounded-xl bg-muted p-4 text-sm space-y-1">
              <p>
                <strong>{s("سرویس: ", "Service: ")}</strong>
                {resource?.name || s("درخواست عمومی", "General request")}
              </p>
              <p>
                <strong>{s("دپارتمان: ", "Department: ")}</strong>
                {deptLabel(department)}
              </p>
            </div>
            <Label className="block space-y-2">
              {s("موضوع", "Subject")}
              <Input
                required
                minLength={3}
                maxLength={200}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Label>
            <Label className="block space-y-2">
              {s("متن درخواست", "Your message")}
              <Textarea
                required
                minLength={5}
                maxLength={12000}
                rows={7}
                placeholder={s(
                  "شرح مشکل، زمان شروع، متن خطا و کارهایی که امتحان کرده‌اید…",
                  "Describe the issue, when it started, the error and what you tried…",
                )}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Label>
            <p className="text-xs text-muted-foreground">
              {s(
                "رمز عبور، کد یک‌بارمصرف یا کلید محرمانه را در تیکت نفرستید.",
                "Do not include passwords, one-time codes or secret keys.",
              )}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button
                type="button"
                disabled={busy}
                variant="outline"
                onClick={() => move(1)}
              >
                {s("مرحله قبل", "Previous step")}
              </Button>
              <Button
                disabled={
                  busy || subject.trim().length < 3 || body.trim().length < 5
                }
              >
                {busy
                  ? s("در حال ثبت…", "Submitting…")
                  : s("ثبت تیکت", "Create ticket")}
              </Button>
            </div>
            {error && (
              <p role="alert" className="text-red-600">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

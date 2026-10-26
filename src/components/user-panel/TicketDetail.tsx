import {
  supportDepartments,
  technicalTeam,
  baseDepartment,
} from "../../../supabase/functions/_shared/support-routing";
import BackButton from "./BackButton";
import TicketSurvey from "./TicketSurvey";
import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Lock, Send, MessageSquare } from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePanelCopy } from "./PanelPrimitives";
export default function TicketDetail({
  ticketId,
  onBack,
}: {
  ticketId: string;
  onBack: () => void;
}) {
  const { data, reply, closeTicket } = usePanelData();
  const { fa, s, n } = usePanelCopy();
  const [body, setBody] = useState(""),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const ticket = data.tickets.find((t) => t.id === ticketId);
  if (!ticket)
    return (
      <div>
        <BackButton onClick={onBack}>
          {s("بازگشت به تیکت‌ها", "Back to tickets")}
        </BackButton>
        <p>{s("تیکت در دسترس نیست.", "Ticket unavailable.")}</p>
      </div>
    );
  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    try {
      await reply(ticketId, body);
      setBody("");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-5" dir={fa ? "rtl" : "ltr"}>
      <header className="flex justify-between flex-wrap gap-3">
        <BackButton variant="outline" onClick={onBack} className="rounded-xl">
          {fa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}{" "}
          {s("بازگشت به تیکت‌ها", "Back to tickets")}
        </BackButton>
        {ticket.status !== "closed" && (
          <Button
            variant="outline"
            className="text-rose-500 rounded-xl"
            onClick={async () => {
              try {
                await closeTicket(ticketId);
              } catch (e) {
                setMessage((e as Error).message);
              }
            }}
          >
            <Lock size={16} />
            {s("بستن تیکت", "Close ticket")}
          </Button>
        )}
      </header>
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white">
        <p className="text-xs opacity-80">
          {s("تیکت شماره", "Ticket number")} {n(ticket.number)}
        </p>
        <h1 className="text-xl font-bold mt-2">{ticket.subject}</h1>
        <p className="text-sm mt-3">
          {(baseDepartment(ticket.department) === "technical"
            ? technicalTeam(ticket.context?.resourceKind)
            : supportDepartments.find((v) => v.id === ticket.department)
                ?.title)?.[fa ? 0 : 1] || ticket.department}
          {ticket.context?.resourceName
            ? " · " + ticket.context.resourceName
            : ""}
        </p>
        <p className="text-sm mt-3 opacity-80">
          {ticket.status === "closed"
            ? s("بسته شده", "Closed")
            : s("گفتگو با پشتیبانی", "Support conversation")}
        </p>
      </div>
      <div className="space-y-4">
        {ticket.messages.map((m, i) => (
          <article
            key={i}
            className={
              "rounded-2xl border p-5 " +
              (m.sender === "support"
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "bg-card")
            }
          >
            <div className="flex justify-between text-xs text-muted-foreground mb-3">
              <strong>
                {m.sender === "support"
                  ? s("تیم پشتیبانی", "Support team")
                  : s("شما", "You")}
              </strong>
              <span>{new Date(m.at).toLocaleString(s("fa-IR", "en-US"))}</span>
            </div>
            <p className="text-sm leading-7 whitespace-pre-wrap break-words">
              {m.body}
            </p>
          </article>
        ))}
      </div>
      {ticket.status !== "closed" ? (
        <form
          onSubmit={send}
          className="rounded-2xl border bg-card p-5 space-y-3"
        >
          <h2 className="font-bold">{s("ارسال پاسخ", "Send a reply")}</h2>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={5}
          />
          <Button disabled={busy || !body.trim()}>
            <Send size={16} />
            {s("ارسال پاسخ", "Send reply")}
          </Button>
        </form>
      ) : (
        <p className="rounded-xl bg-muted p-4 text-sm">
          {s(
            "این گفتگو بسته شده است. برای موضوع تازه، تیکت جدید بسازید.",
            "This conversation is closed. Create a new ticket for a new issue.",
          )}
        </p>
      )}
      <TicketSurvey key={ticketId} ticketId={ticketId} />
      <p role="alert">{message}</p>
    </div>
  );
}

import { localizedDigits } from "./localized-number";
import { csvText } from "./report-export";
import type { PanelTicket } from "./panel-model";
export function ticketReport(tickets: PanelTicket[], fa: boolean) {
  return csvText(
    fa
      ? ["شماره", "موضوع", "بخش", "وضعیت", "تاریخ", "امتیاز"]
      : ["Number", "Subject", "Department", "Status", "Date", "Rating"],
    tickets.map((t) => [
      localizedDigits(t.number, fa),
      t.subject,
      (
        {
          technical: fa ? "فنی" : "Technical",
          billing: fa ? "مالی" : "Billing",
          sales: fa ? "فروش" : "Sales",
          security: fa ? "امنیت" : "Security",
        } as Record<string, string>
      )[t.department] || t.department,
      {
        open: fa ? "باز" : "Open",
        answered: fa ? "پاسخ داده شده" : "Answered",
        closed: fa ? "بسته" : "Closed",
      }[t.status],
      localizedDigits(t.createdAt, fa),
      localizedDigits(t.survey?.rating ?? "", fa),
    ]),
  );
}

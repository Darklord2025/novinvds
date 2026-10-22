import { useState } from "react";
import { Star, MessageSquareHeart } from "lucide-react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
export default function TicketSurvey({ ticketId }: { ticketId: string }) {
  const { data, action, preview } = usePanelData(),
    { s, n } = usePanelCopy();
  const ticket = data.tickets.find((t) => t.id === ticketId);
  const [rating, setRating] = useState(ticket?.survey?.rating || 0),
    [comment, setComment] = useState(ticket?.survey?.comment || ""),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <form
      className="rounded-2xl border border-amber-500/20 bg-card p-5 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          await action("ticket-survey", { id: ticketId, rating, comment });
          setMessage(
            preview
              ? s("نظر در پیش‌نمایش ثبت شد.", "Feedback saved in preview.")
              : s("از ثبت نظر شما سپاسگزاریم.", "Thank you for your feedback."),
          );
        } catch (e) {
          setMessage((e as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <h2 className="font-bold flex gap-2">
        <MessageSquareHeart className="text-amber-500" />
        {s("ارزیابی پاسخ‌گویی پشتیبانی", "Rate your support experience")}
      </h2>
      <div
        className="flex gap-2"
        role="radiogroup"
        aria-label={s("امتیاز پشتیبانی", "Support rating")}
      >
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            type="button"
            key={v}
            role="radio"
            aria-checked={rating === v}
            aria-label={s("امتیاز ", "Rating ") + n(v)}
            onClick={() => setRating(v)}
            className="p-2"
          >
            <Star
              className={
                v <= rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground"
              }
              size={28}
            />
          </button>
        ))}
      </div>
      <Textarea
        aria-label={s("توضیح نظر", "Feedback comment")}
        placeholder={s(
          "چه چیزی خوب بود و چه چیزی بهتر شود؟",
          "What worked well and what could improve?",
        )}
        value={comment}
        maxLength={2000}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button disabled={!rating || busy} variant="outline">
        {ticket?.survey
          ? s("به‌روزرسانی نظر", "Update feedback")
          : s("ثبت نظر", "Submit feedback")}
      </Button>
      <p role="status" className="text-sm">
        {message}
      </p>
    </form>
  );
}

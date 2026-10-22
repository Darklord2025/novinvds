import { useState } from "react";
import DedicatedOrderPage from "./DedicatedOrderPage";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
export default function DedicatedHardwareReview({
  serviceId,
}: {
  serviceId: string;
}) {
  const { s } = usePanelCopy();
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");
  return (
    <section className="space-y-4">
      <p className="text-sm text-amber-600">
        {s(
          "پروفایل مرجع / موجودی تأیید نشده",
          "Reference profile / unverified inventory",
        )}
      </p>
      <DedicatedOrderPage
        reviewOnly
        onAddToCart={(configuration) =>
          setSummary(
            JSON.stringify(
              { serviceId, request: configuration, submitted: false },
              null,
              2,
            ),
          )
        }
      />
      {summary && (
        <>
          <textarea
            className="w-full border bg-background rounded-xl p-4 min-h-56"
            dir="ltr"
            aria-label={s("خلاصه بررسی", "Review summary")}
            value={summary}
            readOnly
          />
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(summary);
                setMessage(s("کپی شد", "Copied"));
              } catch {
                setMessage(s("کپی ناموفق", "Copy failed"));
              }
            }}
          >
            {s("کپی خلاصه", "Copy summary")}
          </Button>
          <p role="status">{message}</p>
        </>
      )}
    </section>
  );
}

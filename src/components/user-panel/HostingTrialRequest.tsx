import {validDatacenter} from "@/data/datacenters";
import { useState } from "react";
import { usePanelData } from "@/contexts/PanelDataContext";
import { usePanelCopy } from "./PanelPrimitives";
import { Button } from "@/components/ui/button";
export default function HostingTrialRequest({
  location,
  workload, country, datacenterId,
}: {
  location: string;
  workload: string; country:string;datacenterId:string;
}) {
  const { action, preview } = usePanelData();
  const { s } = usePanelCopy();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-3">
      <Button
        disabled={busy||!validDatacenter(country,datacenterId)}
        onClick={async () => {
          setBusy(true);
          setMessage("");
          try {
            const result = await action("hosting-trial-request", {
              location,
              workload, country, datacenterId,
            });
            setMessage(
              preview
                ? s(
                    "درخواست تست فقط در پیش‌نمایش ثبت شد؛ سرویس واقعی ایجاد نشده است.",
                    "Trial request recorded in preview only; no real service was created.",
                  )
                : s(
                    "درخواست تست ثبت شد و منتظر بررسی ظرفیت است.",
                    "Trial requested; capacity review is pending.",
                  ) +
                    " " +
                    (result?.id || ""),
            );
          } catch (e) {
            setMessage((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        {s("درخواست تست رایگان ۲۴ ساعته", "Request a free 24-hour trial")}
      </Button>
      <p role="status" className="text-sm">
        {message}
      </p>
    </div>
  );
}

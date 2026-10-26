import { Link } from "react-router-dom";
import { virtualPlans } from "@/data/vpsCatalog";
import { usePanelCopy } from "../user-panel/PanelPrimitives";
import { Button } from "../ui/button";
import { Server } from "lucide-react";
export default function VpsPlansSection() {
  const { s, n, money } = usePanelCopy();
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h2 className="text-3xl font-bold">
            {s("سرور مجازی برای رشد شما", "Virtual servers for your growth")}
          </h2>
          <p className="text-muted-foreground">
            {s(
              "پلن‌های نمونه؛ قیمت و موجودی پس از استعلام ارائه‌دهنده تأیید می‌شود.",
              "Sample plans; final prices and availability require provider confirmation.",
            )}
          </p>
        </header>
        <div className="grid md:grid-cols-3 gap-5">
          {[virtualPlans[0], virtualPlans[3], virtualPlans[4]].map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border bg-card p-6 space-y-5"
            >
              <Server className="text-blue-500" />
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-2xl font-extrabold text-blue-600">
                {money(p.price)}
                <small className="block mt-2 text-xs font-normal text-muted-foreground">
                  {s(
                    "برآورد ماهانه، بدون مالیات",
                    "Estimated monthly, before tax",
                  )}
                </small>
              </p>
              <ul className="text-sm space-y-2">
                <li>{n(p.cpu)} vCPU</li>
                <li>{n(p.ram)} GB RAM</li>
                <li>
                  {n(p.disk)} GB {p.diskType}
                </li>
                <li>{n(p.bandwidth)}</li>
              </ul>
              <Button asChild className="w-full">
                <Link to={"/vps?profile=order-vps-linux&plan=" + p.id}>
                  {s("بررسی و انتخاب سرویس", "Review and select service")}
                </Link>
              </Button>
            </article>
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link to="/vps">
              {s("همه انواع سرور مجازی", "All virtual server types")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePanelCopy } from "@/components/user-panel/PanelPrimitives";
import { Mail, Ticket } from "lucide-react";
export default function Contact() {
  const { s } = usePanelCopy();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-5 pt-32 pb-24">
        <h1 className="text-3xl font-extrabold text-center">
          {s("ارتباط با نوین وی‌دی‌اس", "Contact NovinVDS")}
        </h1>
        <p className="text-center mt-4 text-muted-foreground">
          {s(
            "درخواست خود را از مسیر مرتبط ثبت کنید.",
            "Choose the right channel for your request.",
          )}
        </p>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {[
            ["sales@novinvds.ir", "فروش و مشاوره", "Sales enquiries"],
            ["info@novinvds.ir", "اطلاعات عمومی", "General enquiries"],
          ].map(([email, fa, en]) => (
            <a
              key={email}
              href={"mailto:" + email}
              className="rounded-2xl border p-7 bg-card"
            >
              <Mail className="text-blue-500 mb-4" />
              <h2 className="font-bold">{s(fa, en)}</h2>
              <p dir="ltr" className="mt-3 text-sm">
                {email}
              </p>
            </a>
          ))}
          <Link to="/user-panel" className="rounded-2xl border p-7 bg-card">
            <Ticket className="text-violet-500 mb-4" />
            <h2 className="font-bold">
              {s("پشتیبانی سرویس‌ها", "Service support")}
            </h2>
            <p className="mt-3 text-sm">
              {s("ورود به پنل و ثبت تیکت", "Sign in and open a ticket")}
            </p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

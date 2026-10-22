import AccountChallenge from "@/components/AccountChallenge";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import UserPanelLayout from "@/components/user-panel/UserPanelLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
export default function UserPanel() {
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState<"loading" | "in" | "out">("loading");
  const { language } = useLanguage();
  useEffect(() => {
    let live = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (live) setStatus(!error && data.session ? "in" : "out");
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (live) {
        setStatus(session ? "in" : "out");
        if (!session) setVerified(false);
      }
    });
    return () => {
      live = false;
      subscription.unsubscribe();
    };
  }, []);
  if (status === "loading")
    return (
      <p className="p-6" role="status">
        {language === "fa" ? "" : ""}
      </p>
    );
  if (status === "out")
    return (
      <Navigate
        to={
          "/auth?next=" +
          encodeURIComponent(location.pathname + location.search)
        }
        replace
      />
    );
  if (!verified)
    return (
      <main className="min-h-screen grid place-items-center bg-background p-5">
        <AccountChallenge onVerified={() => setVerified(true)} />
      </main>
    );
  return (
    <div dir={language === "fa" ? "rtl" : "ltr"}>
      <Helmet>
        <title>
          {language === "fa"
            ? "پنل کاربری | نوین وی‌دی‌اس"
            : "User panel | NovinVDS"}
        </title>
      </Helmet>
      <UserPanelLayout />
    </div>
  );
}

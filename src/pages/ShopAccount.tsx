import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import AccountChallenge from "@/components/AccountChallenge";
import { PanelDataProvider } from "@/contexts/PanelDataContext";
import ShopAccountLayout from "@/components/shop/ShopAccountLayout";
export default function ShopAccount() {
  const [status, setStatus] = useState<"loading" | "in" | "out">("loading"),
    [verified, setVerified] = useState(false),
    identity = useRef("");
  useEffect(() => {
    let live = true;
    const update = (id: string) => {
      if (!live) return;
      if (identity.current !== id) {
        identity.current = id;
        setVerified(false);
      }
      setStatus(id ? "in" : "out");
    };
    void supabase.auth
      .getSession()
      .then(({ data, error }) =>
        update(!error ? data.session?.user.id || "" : ""),
      );
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      update(session?.user.id || ""),
    );
    return () => {
      live = false;
      subscription.unsubscribe();
    };
  }, []);
  if (status === "loading")
    return <div className="min-h-screen bg-background" aria-busy="true" />;
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
    <>
      <Helmet>
        <title>NovinVDS | Shop account</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <PanelDataProvider>
        <ShopAccountLayout />
      </PanelDataProvider>
    </>
  );
}

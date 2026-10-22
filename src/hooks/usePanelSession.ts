import { useEffect, useState } from "react";
export const SESSION_LENGTH = 60 * 60 * 1000,
  SESSION_GRACE = 30 * 1000;
export const sessionPhase = (deadline: number, now: number) =>
  now < deadline
    ? "active"
    : now < deadline + SESSION_GRACE
      ? "prompt"
      : "expired";
export function usePanelSession(
  onLogout: () => Promise<void>,
  preview = false,
) {
  const [deadline, setDeadline] = useState(() => {
      const saved = Number(sessionStorage.getItem("novin.panel.deadline"));
      return saved > 0 ? saved : Date.now() + SESSION_LENGTH;
    }),
    [now, setNow] = useState(Date.now()),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    sessionStorage.setItem("novin.panel.deadline", String(deadline));
  }, [deadline]);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const id = window.setInterval(tick, 1000);
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  const phase = preview ? "active" : sessionPhase(deadline, now);
  useEffect(() => {
    if (phase === "expired") void onLogout();
  }, [phase]);
  const extend = async () => {
    setBusy(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.auth.refreshSession();
      if (error || !data.session) throw error || Error("Session unavailable");
      setDeadline(Date.now() + SESSION_LENGTH);
      setNow(Date.now());
    } catch {
      await onLogout();
    } finally {
      setBusy(false);
    }
  };
  const seconds = Math.max(0, Math.ceil((deadline - now) / 1000));
  return {
    time: `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`,
    prompt: phase === "prompt",
    grace: Math.max(0, Math.ceil((deadline + SESSION_GRACE - now) / 1000)),
    extend,
    busy,
  };
}

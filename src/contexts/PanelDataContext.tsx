import {useLanguage} from "./LanguageContext";
import {localizedPreviewSnapshot} from "@/lib/preview-locale";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  emptySnapshot,
  type PanelSnapshot,
  type PanelTicket,
  type AccountProfile,
  type PanelPreferences,
} from "@/lib/panel-model";
import { previewSnapshot } from "@/lib/panel-demo";
interface PanelData {
  data: PanelSnapshot;
  preview: boolean;
  error: string;
  ready: boolean;
  refresh: () => Promise<void>;
  action: (name: string, payload: Record<string, unknown>) => Promise<any>;
  createTicket: (
    subject: string,
    department: string,
    body: string,
  ) => Promise<PanelTicket>;
  closeTicket: (id: string) => Promise<void>;
  reply: (id: string, body: string) => Promise<void>;
  saveProfile: (profile: AccountProfile) => Promise<void>;
  savePreferences: (preferences: PanelPreferences) => Promise<void>;
}
const Context = createContext<PanelData | null>(null);
const api = async (name: string, payload: Record<string, unknown>) => {
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase.functions.invoke("panel-action", {
    body: { action: name, ...payload },
  });
  if (error)
    throw Error(
      "ارتباط با سرویس حساب برقرار نشد / Account service unavailable",
    );
  if (data?.error) throw Error(data.error);
  return data;
};
export function PanelDataProvider({
  children,
  preview = false,
}: {
  children: React.ReactNode;
  preview?: boolean;
}) {
  const {language}=useLanguage();
  const [data, setData] = useState<PanelSnapshot>(() =>
      preview ? previewSnapshot() : emptySnapshot(),
    ),
    [error, setError] = useState(""),
    [ready, setReady] = useState(preview);
  const refresh = useCallback(async () => {
    if (preview) return;
    try {
      const result = await api("snapshot", {});
      setData(result);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setReady(true);
    }
  }, [preview]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  const action = async (name: string, payload: Record<string, unknown>) => {
    if (!preview) {
      const result = await api(name, payload);
      await refresh();
      return result;
    }
    const id = crypto.randomUUID();
    if (name === "discount-preview") {
      if (payload.code !== "DEMO-REWARD") throw Error("Invalid sample code");
      return { percent: 5, capToman: 100000, preview: true };
    }
    if (name === "domain-check")
      return {
        id,
        available: true,
        priceToman: 320000 * Number(payload.years || 1),
        preview: true,
      };
    if (name === "deposit-quote") {
      const rateToman = (
        {
          USD: 65000,
          EUR: 70000,
          USDT: 65000,
          BTC: 4000000000,
          ETH: 180000000,
        } as Record<string, number>
      )[String(payload.currency)];
      if (!rateToman) throw Error("Invalid currency");
      return {
        id,
        rateToman,
        amountToman: Math.round(Number(payload.amount) * rateToman),
        expiresAt: new Date(Date.now() + 120000).toISOString(),
        preview: true,
      };
    }
    if (name === "ticket-create") {
      const t: PanelTicket = {
        id,
        number: Math.max(1000, ...data.tickets.map((t) => t.number)) + 1,
        subject: String(payload.subject),
        department: String(payload.department),
        status: "open",
        createdAt: new Date().toISOString(),
        messages: [
          {
            body: String(payload.body),
            at: new Date().toISOString(),
            sender: "customer",
          },
        ],
      };
      setData((d) => ({ ...d, tickets: [t, ...d.tickets] }));
      return t;
    }
    if (name === "ticket-close")
      setData((d) => ({
        ...d,
        tickets: d.tickets.map((t) =>
          t.id === payload.id ? { ...t, status: "closed" } : t,
        ),
      }));
    if (name === "ticket-reply")
      setData((d) => ({
        ...d,
        tickets: d.tickets.map((t) =>
          t.id === payload.id
            ? {
                ...t,
                status: "open",
                messages: [
                  ...t.messages,
                  {
                    body: String(payload.body),
                    at: new Date().toISOString(),
                    sender: "customer",
                  },
                ],
              }
            : t,
        ),
      }));
    if (name === "notifications-read") {
      setData((d) => ({
        ...d,
        notifications: d.notifications?.map((n) =>
          (payload.ids as string[]).includes(n.id) ? { ...n, read: true } : n,
        ),
      }));
      return { preview: true };
    }
    if (name === "ticket-survey") {
      setData((d) => ({
        ...d,
        tickets: d.tickets.map((t) =>
          t.id === payload.id
            ? {
                ...t,
                survey: {
                  rating: Number(payload.rating),
                  comment: String(payload.comment),
                  at: new Date().toISOString(),
                },
              }
            : t,
        ),
      }));
      return { preview: true };
    }
    if (name === "profile")
      setData((d) => ({ ...d, profile: payload.profile as AccountProfile }));
    if (name === "preferences")
      setData((d) => ({
        ...d,
        preferences: payload.preferences as PanelPreferences,
      }));
    if (
      [
        "withdraw",
        "renewal",
        "official-invoice",
        "domain-order",
        "domain-request",
        "deposit",
        "account-conversion",
        "representative-change",
        "bank-save",
        "hosting-trial-request",
        "hosting-upgrade",
      ].includes(name)
    )
      setData((d) => ({
        ...d,
        requests: [
          {
            id,
            kind: name,
            status: "preview",
            createdAt: new Date().toISOString(),
          },
          ...d.requests,
        ],
      }));
    return { id, status: "preview", preview: true };
  };
  return (
    <Context.Provider
      value={{
        data:preview?localizedPreviewSnapshot(data,language==="fa"):data,
        preview,
        error,
        ready,
        refresh,
        action,
        createTicket: (subject, department, body) =>
          action("ticket-create", { subject, department, body }),
        closeTicket: (id) => action("ticket-close", { id }),
        reply: (id, body) => action("ticket-reply", { id, body }),
        saveProfile: (profile) => action("profile", { profile }),
        savePreferences: (preferences) =>
          action("preferences", { preferences }),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function usePanelData() {
  const context = useContext(Context);
  if (!context) throw Error("PanelDataProvider required");
  return context;
}

export function useServiceCatalog() {
  const { data, preview } = usePanelData();
  return {
    userServices: data.services,
    userDomains: data.domains,
    getServiceById: (id: string) => data.services.find((s) => s.id === id),
    getDomainById: (id: string) => data.domains.find((d) => d.id === id),
    preview,
  };
}

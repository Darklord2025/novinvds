import { managementTab } from "@/lib/serviceIdentity";
import { toast } from "@/components/ui/use-toast";
export interface NavigationHandlers {
  navigateToServiceOrderPage: (path: string) => void;
  handleSidebarClick: (tab: string) => void;
  handleViewAllNotifications: () => void;
  handleViewImportantAnnouncements: () => void;
  handleViewNotification: (v: any) => void;
  handleViewAnnouncement: (v: any) => void;
  handleViewTicket: (id: string) => void;
  handleCreateNewTicket: () => void;
  handleResetServer: (kind: string, id: string) => void;
  handleRenewService: (kind: string, id: string) => void;
  handleManageService: (id: string, kind?: string) => void;
  handleViewInvoice: (id: string, paid?: boolean) => void;
  handleDownloadInvoice: (id: string) => void;
  handlePayInvoice: (id: string) => void;
}
export function createNavigationHandlers(
  tab: (v: string) => void,
  service: (v: string | null) => void,
  newTicket: (v: boolean) => void,
  ticket: (v: string | null) => void,
  notification: (v: any) => void,
  announcement: (v: any) => void,
  resolveKind?: (id: string) => string | undefined,
): NavigationHandlers {
  const sidebar = (id: string) => {
    service(null);
    ticket(null);
    notification(null);
    announcement(null);
    newTicket(false);
    tab(id);
  };
  const viewTicket = (id: string) => {
    ticket(id);
    newTicket(false);
    tab("ticket-details");
  };
  const createTicket = () => {
    ticket(null);
    newTicket(true);
    tab("tickets");
  };
  const manage = (id: string, kind?: string) => {
    kind = kind || resolveKind?.(id);
    const actual =
      [
        "vps",
        "hosting",
        "host",
        "cloud",
        "dedicated",
        "hourly",
        "domain",
        "multilocation",
        "license",
        "ssl",
        "network",
        "addon",
        "support",
      ].includes(id) && kind
        ? kind
        : id;
    service(actual);
    tab(
      managementTab(actual) === "service-unavailable" &&
        kind &&
        [
          "vps",
          "hosting",
          "cloud",
          "dedicated",
          "hourly",
          "domain",
          "multilocation",
          "license",
          "ssl",
          "network",
          "addon",
          "support",
        ].includes(kind)
        ? kind + "-management"
        : managementTab(actual),
    );
  };
  const renew = (_kind: string, id: string) => {
    service(id);
    tab("service-renewal");
  };
  const invoice = (id: string, pay = false) => {
    service(id);
    tab(pay ? "invoice-payment" : "invoice-detail");
  };
  const navigate = (path: string) => {
    const p = path.split("/").filter(Boolean).map(decodeURIComponent);
    if (p[0] === "manage") return manage(p[2], p[1]);
    if (p[0] === "renew") return renew(p[1], p[2]);
    if (p[0]?.endsWith("-management") && p[1])
      return manage(p[1], p[0].replace("-management", ""));
    if (p[0] === "tickets" && p[1] === "new") return createTicket();
    if (p[0] === "tickets" && p[1]) return viewTicket(p[1]);
    if (p[0] === "invoices" && p[1]) return invoice(p[1], p.includes("pay"));
    if (p[0] === "order") return sidebar("order-" + (p[1] || "vps"));
    const aliases: Record<string, string> = {
      settings: "profile",
      billing: "financial-overview",
      services: "servers",
      knowledge: "knowledge-base",
      announcements: "important-announcements",
    };
    sidebar(aliases[p[0]] || p[0] || "dashboard");
  };
  return {
    navigateToServiceOrderPage: navigate,
    handleSidebarClick: sidebar,
    handleViewTicket: viewTicket,
    handleCreateNewTicket: createTicket,
    handleManageService: manage,
    handleRenewService: renew,
    handleViewAllNotifications: () => sidebar("notifications"),
    handleViewImportantAnnouncements: () => sidebar("important-announcements"),
    handleViewNotification: (v) => {
      notification(v);
      tab("notification-details");
    },
    handleViewAnnouncement: (v) => {
      announcement(v);
      tab("announcement-details");
    },
    handleResetServer: () =>
      toast({ title: "عملیات دستگاه متصل نیست / Device API unavailable" }),
    handleViewInvoice: (id) => invoice(id),
    handleDownloadInvoice: (id) => invoice(id),
    handlePayInvoice: (id) => invoice(id, true),
  };
}

import {PanelBackHost} from "./BackButton";
import { PanelDataProvider, usePanelData } from "@/contexts/PanelDataContext";
import { usePanelSession } from "@/hooks/usePanelSession";
import { usePanelCopy } from "./PanelPrimitives";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PanelContent, { preloadPanelViews } from "./PanelContent";
import PanelFooter from "./PanelFooter";
import { usePanelState } from "@/hooks/usePanelState";
import { createNavigationHandlers } from "@/services/panelNavigationService";
import { sidebarItems } from "@/data/sidebarItems";
import { TooltipProvider } from "@/components/ui/tooltip";

export const UserPanelLayout: React.FC = () => {
  const navigate = useNavigate();
  const { s, n } = usePanelCopy();
  const { error, preview, data } = usePanelData();
  const logout = async () => {
    sessionStorage.removeItem("novin.panel.deadline");
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };
  const session = usePanelSession(logout, preview);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    activeTab,
    setActiveTab,
    selectedService,
    setSelectedService,
    searchQuery,
    setSearchQuery,
    selectedNotification,
    setSelectedNotification,
    selectedAnnouncement,
    setSelectedAnnouncement,
    selectedTicket,
    setSelectedTicket,
    isNewTicket,
    setIsNewTicket,
    handleSidebarItemClick,
  } = usePanelState();

  React.useEffect(() => {
    void preloadPanelViews();
  }, []);
  React.useLayoutEffect(() => {
    document
      .getElementById("panel-main")
      ?.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);
  const navigationHandlers = createNavigationHandlers(
    setActiveTab,
    setSelectedService,
    setIsNewTicket,
    setSelectedTicket,
    setSelectedNotification,
    setSelectedAnnouncement,
    (id) =>
      data.services.find((v) => v.id === id)?.kind ||
      (data.domains.some((v) => v.id === id) ? "domain" : undefined),
  );

  const handleMobileSidebarClick = (itemId: string) => {
    handleSidebarItemClick(itemId);
    setIsMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <TooltipProvider>
      <div className="panel-shell flex h-dvh overflow-hidden bg-background w-full">
        {/* Desktop Sidebar */}
        <Sidebar
          items={sidebarItems}
          activeTab={activeTab}
          onItemClick={handleSidebarItemClick}
          className="hidden md:flex"
          isMobile={false}
        />

        {/* Mobile Sidebar */}
        <Sidebar
          items={sidebarItems}
          activeTab={activeTab}
          onItemClick={handleMobileSidebarClick}
          isMobile={true}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        <div className="flex flex-col flex-1 min-w-0 min-h-0">
          <Header
            sessionTimeLeft={session.time}
            activeTab={activeTab}
            onNavigate={handleSidebarItemClick}
            onToggleMobileSidebar={toggleMobileSidebar}
          />

          <main
            id="panel-main"
            className="bg-background p-3 md:p-4 lg:p-6 min-w-0 min-h-0 flex-1 overflow-y-auto overscroll-contain"
          >
            <div className="container mx-auto max-w-full px-2 md:px-0">
              {preview && <p role="status" className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs">{s('پیش‌نمایش طراحی با اطلاعات نمونه؛ حساب، پرداخت و دستگاه واقعی متصل نیست.','Design preview with sample data; no real account, payment or device is connected.')}</p>}
              {error && (
                <p
                  role="alert"
                  className="mb-4 rounded-xl bg-amber-500/10 p-3 text-sm"
                >
                  {error}
                </p>
              )}
              <PanelBackHost enabled={activeTab!=="dashboard"} onFallback={()=>navigationHandlers.handleSidebarClick("dashboard")}>
              <React.Suspense
                fallback={<div className="min-h-64" aria-busy="true" />}
              >
                <div key={activeTab} className="panel-content-motion">
                <PanelContent
                  activeTab={activeTab}
                  selectedService={selectedService}
                  selectedNotification={selectedNotification}
                  selectedAnnouncement={selectedAnnouncement}
                  selectedTicket={selectedTicket}
                  isNewTicket={isNewTicket}
                  navigationHandlers={navigationHandlers}
                />
                </div>
              </React.Suspense>
              </PanelBackHost>
            </div>
          </main>

          <PanelFooter />
          <Dialog open={session.prompt}>
            <DialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
              className="[&>button]:hidden"
            >
              <DialogTitle>
                {s("تمدید نشست کاربری", "Extend your session")}
              </DialogTitle>
              <DialogDescription>
                {s(
                  "برای ادامه، نشست را تمدید کنید. در صورت عدم پاسخ به‌صورت خودکار خارج می‌شوید.",
                  "Extend your session to continue. You will be signed out automatically if you do not respond.",
                )}{" "}
                ({n(session.grace)})
              </DialogDescription>
              <Button disabled={session.busy} onClick={session.extend}>
                {s("تمدید نشست", "Extend session")}
              </Button>
              <Button variant="outline" onClick={logout}>
                {s("خروج", "Sign out")}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default function UserPanel() {
  return (
    <PanelDataProvider>
      <UserPanelLayout />
    </PanelDataProvider>
  );
}

import {sidebarItems} from "@/data/sidebarItems";
import { useState, useEffect, startTransition } from "react";

export interface PanelState {
  activeTab: string;
  selectedService: string | null;
  searchQuery: string;
  selectedNotification: any;
  selectedAnnouncement: any;
  selectedTicket: string | null;
  isNewTicket: boolean;
  sessionTimeLeft: string;
}

export const usePanelState = () => {
  const leaves=(items:typeof sidebarItems):string[]=>items.flatMap(i=>i.submenu?leaves(i.submenu):[i.id]);
  const [activeTab, setActiveTabState] = useState(() =>
    [...leaves(sidebarItems),
      "order-domain",
      "order-hosting",
      "security",
      "cart",
      "domains",
      "wallet",
      "financial-overview",
      "transactions",
      "knowledge-base",
      "downloads",
      "affiliate",
      "order-support",
      "order-dedicated-europe",
      "order-dedicated-usa",
      "order-dedicated-asia",
      "order-dedicated-gpu",
      "order-dedicated-storage",
      "order-vps-windows",
      "order-vps-storage",
      "order-vps-daily",
    ].includes(new URLSearchParams(location.search).get("tab") || "")
      ? new URLSearchParams(location.search).get("tab")!
      : "dashboard",
  );
  const setActiveTab = (tab: string) =>
    startTransition(() => setActiveTabState(tab));
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // State for notifications and details
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isNewTicket, setIsNewTicket] = useState(() => new URLSearchParams(location.search).get("tab")==="tickets" && new URLSearchParams(location.search).get("newTicket")==="1");

  const handleSidebarItemClick = (itemId: string) => {
    // Reset sub-states when changing main tab
    setSelectedNotification(null);
    setSelectedAnnouncement(null);
    setSelectedTicket(null);
    setIsNewTicket(false);
    setActiveTab(itemId);
  };

  return {
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
  };
};


// Add any missing exports here if needed
export interface DashboardProps {
  navigateToServiceOrderPage: (serviceLink: string) => void;
  onResetRequest?: (serviceType: string, serviceId: string) => void;
}

export interface PanelContentProps {
  activeTab: string;
  selectedService: string | null;
  selectedNotification: any;
  selectedAnnouncement: any;
  selectedTicket: string | null;
  isNewTicket: boolean;
  navigationHandlers: any;
}

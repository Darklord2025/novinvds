
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

export interface SidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  items?: Array<{id: string; label: string; icon: string}>;
  onItemClick?: (itemId: string) => void;
  onHomeClick?: () => void;
  className?: string;
}

export interface ServicePlanProps {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  imageUrl?: string;
  currency?: string;
  period?: string;
  ctaText?: string;
  onOrder?: () => void;
}

export interface DevelopmentMessageProps {
  title?: string;
  message?: string;
  onBack?: () => void;
}

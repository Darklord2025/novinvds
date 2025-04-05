
// Interfaces for UserPanelLayout components

export interface DomainManagementProps {
  domainId: string;
  onBack: () => void;
}

export interface CreateTicketFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export interface TicketDetailProps {
  ticketId: string;
  onBack: () => void;
}

export interface SidebarProps {
  activeTab: string;
  items?: Array<{ id: string; label: string; icon: string }>;
  onItemClick?: (itemId: string) => void;
  setActiveTab?: (tab: string) => void;
  onHomeClick?: () => void;
  className?: string;
}

export interface HeaderProps {
  activeTab: string;
  sidebarItems: Array<{ id: string; label: string; icon: string }>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sessionTimeLeft?: string;
  onSidebarItemClick?: (itemId: string) => void;
  onViewAllNotifications?: () => void;
  onViewImportantAnnouncements?: () => void;
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

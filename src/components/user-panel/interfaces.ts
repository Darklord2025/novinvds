
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

export interface ServiceOrderProps {
  serviceType: string;
  onManage?: (id: string) => void;
  onReset?: (id: string) => void;
  onRenew?: (id: string) => void;
}

export interface ServerListProps {
  serviceType: 'vps' | 'dedicated' | 'cloud' | 'domain' | 'hosting';
  onManage?: (id: string) => void;
  onReset?: (id: string) => void;
  onRenew?: (id: string) => void;
  filter?: string;
}

export interface DashboardProps {
  serviceCategories?: ServiceCategory[];
  navigateToServiceOrderPage: (serviceLink: string) => void;
  operatingSystems?: OperatingSystems;
}

export interface ServiceCategory {
  title: string;
  services: Array<{
    name: string;
    link: string;
  }>;
}

export interface OperatingSystem {
  id: string;
  name: string;
}

export interface OperatingSystems {
  linux: OperatingSystem[];
  windows: OperatingSystem[];
  specialized: OperatingSystem[];
}

export interface ServicesPageProps {
  serviceType: string;
  operatingSystems?: OperatingSystems;
  onManage?: (serviceType: string, id: string) => void;
  onReset?: (serviceType: string, id: string) => void;
  onRenew?: (serviceType: string, id: string) => void;
}

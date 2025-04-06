
import { toast } from "@/components/ui/use-toast";

export interface NavigationHandlers {
  navigateToServiceOrderPage: (serviceLink: string) => void;
  handleViewAllNotifications: () => void;
  handleViewImportantAnnouncements: () => void;
  handleViewNotification: (notification: any) => void;
  handleViewAnnouncement: (announcement: any) => void;
  handleViewTicket: (ticketId: string) => void;
  handleCreateNewTicket: () => void;
  handleResetServer: (serviceType: string, serviceId: string) => void;
  handleRenewService: (serviceType: string, serviceId: string) => void;
  handleManageService: (serviceType: string, serviceId: string) => void;
}

export const createNavigationHandlers = (
  setActiveTab: (tab: string) => void,
  setSelectedService: (service: string | null) => void,
  setIsNewTicket: (isNew: boolean) => void,
  setSelectedTicket: (ticketId: string | null) => void,
  setSelectedNotification: (notification: any) => void,
  setSelectedAnnouncement: (announcement: any) => void
): NavigationHandlers => {
  
  const navigateToServiceOrderPage = (serviceLink: string) => {
    if (!serviceLink) return;
    
    // Handle navigation to service pages
    if (serviceLink.startsWith('/manage/')) {
      const parts = serviceLink.split('/');
      if (parts.length < 4) return; // Ensure we have enough parts
      
      const serviceType = parts[2];
      const serviceId = parts[3];
      
      toast({
        title: `مدیریت سرویس ${serviceId}`,
        description: `در حال بارگیری پنل مدیریت ${serviceType} با شناسه ${serviceId}`,
      });
      
      // For domain management, show the DomainManagement component
      if (serviceType === 'domain') {
        setSelectedService(serviceId);
        setActiveTab('domain-management');
      } else {
        // For other services, navigate to the service page
        window.location.href = serviceLink;
      }
    } else if (serviceLink === '/tickets/new') {
      setIsNewTicket(true);
      setActiveTab('tickets');
    } else if (serviceLink.startsWith('/tickets/')) {
      const parts = serviceLink.split('/');
      if (parts.length < 3) return; // Ensure we have enough parts
      
      const ticketId = parts[2];
      setSelectedTicket(ticketId);
      setActiveTab('ticket-details');
    } else if (serviceLink === '/tickets') {
      setActiveTab('tickets');
    } else if (serviceLink === '/invoices') {
      setActiveTab('invoices');
    } else if (serviceLink.startsWith('/invoices/')) {
      setActiveTab('invoices');
    } else {
      // For ordering new services, we'll navigate to the actual URL
      window.location.href = serviceLink;
    }
  };
  
  const handleViewAllNotifications = () => {
    setActiveTab('notifications');
  };
  
  const handleViewImportantAnnouncements = () => {
    setActiveTab('important-announcements');
  };
  
  const handleViewNotification = (notification: any) => {
    if (!notification) return;
    
    setSelectedNotification(notification);
    setActiveTab('notification-details');
  };
  
  const handleViewAnnouncement = (announcement: any) => {
    if (!announcement) return;
    
    setSelectedAnnouncement(announcement);
    setActiveTab('announcement-details');
  };
  
  const handleViewTicket = (ticketId: string) => {
    if (!ticketId) return;
    
    setSelectedTicket(ticketId);
    setIsNewTicket(false);
    setActiveTab('ticket-details');
  };
  
  const handleCreateNewTicket = () => {
    setIsNewTicket(true);
    setSelectedTicket(null);
    setActiveTab('tickets');
  };
  
  const handleManageService = (serviceType: string, serviceId: string) => {
    if (!serviceType || !serviceId) return;
    
    toast({
      title: `مدیریت سرویس`,
      description: `در حال بارگیری پنل مدیریت ${serviceType} با شناسه ${serviceId}`,
    });
    
    // Handle different service types
    if (serviceType === 'domain') {
      setSelectedService(serviceId);
      setActiveTab('domain-management');
    } else {
      // For other services, navigate to a management page
      window.location.href = `/manage/${serviceType}/${serviceId}`;
    }
  };
  
  const handleResetServer = (serviceType: string, serviceId: string) => {
    if (!serviceType || !serviceId) return;
    
    toast({
      title: `ریست سرور`,
      description: `در حال ریست سرور ${serviceType} با شناسه ${serviceId}. لطفاً صبر کنید...`,
    });
    
    // Simulate reset process
    setTimeout(() => {
      toast({
        title: "ریست سرور انجام شد",
        description: `سرور ${serviceId} با موفقیت ریست شد.`,
      });
    }, 3000);
  };
  
  const handleRenewService = (serviceType: string, serviceId: string) => {
    if (!serviceType || !serviceId) return;
    
    toast({
      title: `تمدید سرویس`,
      description: `درخواست تمدید سرویس ${serviceType} با شناسه ${serviceId} ثبت شد.`,
    });
    
    // Simulate renewal process
    setTimeout(() => {
      window.location.href = `/renew/${serviceType}/${serviceId}`;
    }, 1000);
  };

  return {
    navigateToServiceOrderPage,
    handleViewAllNotifications,
    handleViewImportantAnnouncements,
    handleViewNotification,
    handleViewAnnouncement,
    handleViewTicket,
    handleCreateNewTicket,
    handleResetServer,
    handleRenewService,
    handleManageService
  };
};

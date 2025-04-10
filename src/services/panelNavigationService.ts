
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
    // Handle navigation to service pages
    if (serviceLink && serviceLink.startsWith('/manage/')) {
      const parts = serviceLink.split('/');
      if (parts && parts.length >= 3) {
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
        } else if (serviceType === 'vps') {
          setSelectedService(serviceId);
          setActiveTab('vps-management');
        } else if (serviceType === 'dedicated') {
          setSelectedService(serviceId);
          setActiveTab('dedicated-management');
        } else if (serviceType === 'cloud') {
          setSelectedService(serviceId);
          setActiveTab('cloud-management');
        } else if (serviceType === 'hosting') {
          setSelectedService(serviceId);
          setActiveTab('hosting-management');
        } else {
          // For other services, navigate to the service page
          window.location.href = serviceLink;
        }
      }
    } else if (serviceLink === '/tickets/new') {
      setIsNewTicket(true);
      setActiveTab('tickets');
    } else if (serviceLink && serviceLink.startsWith('/tickets/')) {
      const ticketId = serviceLink.split('/')[2];
      setSelectedTicket(ticketId);
      setActiveTab('ticket-details');
    } else if (serviceLink === '/tickets') {
      setActiveTab('tickets');
    } else if (serviceLink === '/invoices') {
      setActiveTab('invoices');
    } else if (serviceLink && serviceLink.startsWith('/invoices/')) {
      const invoiceId = serviceLink.split('/')[2];
      // Handle invoice details page if needed
      setActiveTab('invoices');
      // If you want to implement invoice details page later:
      // setSelectedInvoice(invoiceId);
      // setActiveTab('invoice-details');
    } else if (serviceLink && serviceLink.startsWith('/announcements/')) {
      const announcementId = serviceLink.split('/')[2];
      // Create a dummy announcement object with the ID
      const announcement = { id: announcementId, title: `اطلاعیه ${announcementId}`, content: "محتوای اطلاعیه" };
      setSelectedAnnouncement(announcement);
      setActiveTab('announcement-details');
    } else if (serviceLink === '/announcements') {
      setActiveTab('important-announcements');
    } else if (serviceLink && serviceLink.startsWith('/order/') || 
               serviceLink && serviceLink.startsWith('/hosting/') || 
               serviceLink && serviceLink.startsWith('/vps/') || 
               serviceLink && serviceLink.startsWith('/dedicated/') || 
               serviceLink && serviceLink.startsWith('/cloud/') || 
               serviceLink && serviceLink.startsWith('/domain/') || 
               serviceLink && serviceLink.startsWith('/security/') || 
               serviceLink && serviceLink.startsWith('/network/') || 
               serviceLink && serviceLink.startsWith('/modules/') || 
               serviceLink && serviceLink.startsWith('/design/') || 
               serviceLink && serviceLink.startsWith('/panels/') || 
               serviceLink && serviceLink.startsWith('/support/')) {
      // For ordering new services - simulate redirection for now
      toast({
        title: "انتقال به صفحه سفارش",
        description: `در حال انتقال به صفحه سفارش ${serviceLink}...`,
      });
      
      // Simulate external navigation
      setTimeout(() => {
        toast({
          title: "انتقال به صفحه سفارش",
          description: "صفحه سفارش در حال بارگذاری است...",
        });
      }, 1000);
    } else {
      // For any other links
      toast({
        title: "انتقال به صفحه",
        description: `در حال انتقال به ${serviceLink}...`,
      });
    }
  };
  
  const handleViewAllNotifications = () => {
    setActiveTab('notifications');
  };
  
  const handleViewImportantAnnouncements = () => {
    setActiveTab('important-announcements');
  };
  
  const handleViewNotification = (notification: any) => {
    if (notification) {
      setSelectedNotification(notification);
      setActiveTab('notification-details');
    }
  };
  
  const handleViewAnnouncement = (announcement: any) => {
    if (announcement) {
      setSelectedAnnouncement(announcement);
      setActiveTab('announcement-details');
    }
  };
  
  const handleViewTicket = (ticketId: string) => {
    if (ticketId) {
      setSelectedTicket(ticketId);
      setIsNewTicket(false);
      setActiveTab('ticket-details');
    }
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
    } else if (serviceType === 'vps') {
      setSelectedService(serviceId);
      setActiveTab('vps-management');
    } else if (serviceType === 'dedicated') {
      setSelectedService(serviceId);
      setActiveTab('dedicated-management');
    } else if (serviceType === 'cloud') {
      setSelectedService(serviceId);
      setActiveTab('cloud-management');
    } else if (serviceType === 'hosting') {
      setSelectedService(serviceId);
      setActiveTab('hosting-management');
    } else {
      // For other services, navigate to a management page
      toast({
        title: "مدیریت سرویس",
        description: `در حال انتقال به صفحه مدیریت ${serviceType} با شناسه ${serviceId}...`,
      });
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
      toast({
        title: "انتقال به صفحه پرداخت",
        description: "در حال انتقال به صفحه پرداخت برای تمدید سرویس...",
      });
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

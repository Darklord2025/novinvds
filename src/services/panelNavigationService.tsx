import { managementTab } from '@/lib/serviceIdentity';

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export interface NavigationHandlers {
  navigateToServiceOrderPage: (serviceLink: string) => void;
  handleSidebarClick: (tabId: string) => void;
  handleViewAllNotifications: () => void;
  handleViewImportantAnnouncements: () => void;
  handleViewNotification: (notification: any) => void;
  handleViewAnnouncement: (announcement: any) => void;
  handleViewTicket: (ticketId: string) => void;
  handleCreateNewTicket: () => void;
  handleResetServer: (serviceType: string, serviceId: string) => void;
  handleRenewService: (serviceType: string, serviceId: string) => void;
  handleManageService: (serviceId: string, serviceType?: string) => void;
  handleViewInvoice: (invoiceId: string, isPaid?: boolean) => void;
  handleDownloadInvoice: (invoiceId: string) => void;
  handlePayInvoice: (invoiceId: string) => void;
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
        
        // For different management pages
        handleManageService(serviceId, serviceType);
      }
    } else if (serviceLink === '/tickets/new') {
      setIsNewTicket(true);
      setActiveTab('tickets');
      
      toast({
        title: "ایجاد تیکت جدید",
        description: "در حال انتقال به صفحه ایجاد تیکت جدید...",
      });
    } else if (serviceLink && serviceLink.startsWith('/tickets/')) {
      const ticketId = serviceLink.split('/')[2];
      handleViewTicket(ticketId);
    } else if (serviceLink === '/tickets') {
      setActiveTab('tickets');
      
      toast({
        title: "تیکت‌های پشتیبانی",
        description: "در حال بارگذاری لیست تیکت‌ها...",
      });
    } else if (serviceLink === '/invoices') {
      setActiveTab('invoices');
      
      toast({
        title: "فاکتورهای شما",
        description: "در حال بارگذاری لیست فاکتورها...",
      });
    } else if (serviceLink && serviceLink.startsWith('/invoices/')) {
      const invoiceId = serviceLink.split('/')[2];
      // Handle invoice details page
      if (serviceLink.includes('/pay/')) {
        // Handle payment page
        handlePayInvoice(invoiceId);
      } else {
        // Handle invoice details
        handleViewInvoice(invoiceId);
      }
    } else if (serviceLink && serviceLink.startsWith('/announcement-details/')) {
      const announcementId = serviceLink.split('/')[2];
      // Create a dummy announcement object with the ID
      const announcement = { 
        id: announcementId, 
        title: `اطلاعیه ${announcementId}`, 
        content: "محتوای اطلاعیه",
        date: "1402/06/01",
        type: "info"
      };
      setSelectedAnnouncement(announcement);
      setActiveTab('announcement-details');
      
      toast({
        title: "مشاهده اطلاعیه",
        description: `در حال بارگذاری جزئیات اطلاعیه ${announcementId}...`,
      });
    } else if (serviceLink === '/important-announcements' || serviceLink === '/announcements') {
      setActiveTab('important-announcements');
      
      toast({
        title: "اطلاعیه‌های مهم",
        description: "در حال بارگذاری لیست اطلاعیه‌ها...",
      });
    } else if (serviceLink === '/notifications') {
      setActiveTab('notifications');
      
      toast({
        title: "اعلان‌های سیستم",
        description: "در حال بارگذاری لیست اعلان‌ها...",
      });
    } else if (serviceLink === '/transactions' || serviceLink === 'transactions') {
      setActiveTab('transactions');
      
      toast({
        title: "تراکنش‌های مالی",
        description: "در حال بارگذاری لیست تراکنش‌ها...",
      });
    } else if (serviceLink === '/financial-overview' || serviceLink === 'financial-overview') {
      setActiveTab('financial-overview');
      
      toast({
        title: "نمای کلی امور مالی",
        description: "در حال بارگذاری اطلاعات مالی...",
      });
    } else if (serviceLink === '/wallet') {
      setActiveTab('wallet');
      
      toast({
        title: "کیف پول",
        description: "در حال بارگذاری اطلاعات کیف پول شما...",
      });
    } else if (serviceLink === '/wallet-topup') {
      setActiveTab('wallet-topup');
      
      toast({
        title: "افزایش موجودی",
        description: "در حال بارگذاری صفحه افزایش موجودی...",
      });
    } else if (serviceLink === '/servers' || serviceLink === 'servers') {
      setActiveTab('servers');
    } else if (serviceLink === '/hosting' || serviceLink === 'hosting') {
      setActiveTab('hosting');
    } else if (serviceLink === '/dedicated' || serviceLink === 'dedicated') {
      setActiveTab('dedicated');
    } else if (serviceLink === '/domains' || serviceLink === 'domains') {
      setActiveTab('domains');
    } else if (serviceLink === '/settings') {
      setActiveTab('settings');
      
      toast({
        title: "تنظیمات",
        description: "در حال بارگذاری تنظیمات حساب کاربری...",
      });
    } else if (serviceLink === '/downloads') {
      setActiveTab('downloads');
      
      toast({
        title: "دانلودها",
        description: "در حال بارگذاری لیست دانلودها...",
      });
    } else if (serviceLink === '/profile') {
      setActiveTab('profile');
      
      toast({
        title: "پروفایل",
        description: "در حال بارگذاری اطلاعات پروفایل...",
      });
    } else if (serviceLink && (serviceLink.startsWith('/vps-management/') || 
                               serviceLink.startsWith('/dedicated-management/') || 
                               serviceLink.startsWith('/cloud-management/') || 
                               serviceLink.startsWith('/hourly-management/') ||
                               serviceLink.startsWith('/multilocation-management/') ||
                               serviceLink.startsWith('/hosting-management/') || 
                               serviceLink.startsWith('/domain-management/'))) {
      const parts = serviceLink.split('/');
      const serviceType = parts[1].split('-')[0]; // Extract 'vps', 'dedicated', etc.
      const serviceId = parts[2];
      
      handleManageService(serviceId, serviceType);
    } else if (serviceLink && serviceLink.startsWith('/renew/')) {
      const parts = serviceLink.split('/');
      if (parts && parts.length >= 4) {
        const serviceType = parts[2];
        const serviceId = parts[3];
        
        handleRenewService(serviceType, serviceId);
      }
    } else if (serviceLink && (serviceLink.startsWith('/order/') || 
               serviceLink.startsWith('/hosting/') || 
               serviceLink.startsWith('/vps/') || 
               serviceLink.startsWith('/dedicated/') || 
               serviceLink.startsWith('/cloud/') || 
               serviceLink.startsWith('/domain/') || 
               serviceLink.startsWith('/security/') || 
               serviceLink.startsWith('/network/') || 
               serviceLink.startsWith('/modules/') || 
               serviceLink.startsWith('/design/') || 
               serviceLink.startsWith('/panels/') || 
               serviceLink.startsWith('/support/') || 
               serviceLink.startsWith('/special-offers') ||
               serviceLink.startsWith('/compare-plans') ||
               serviceLink.startsWith('/quick-order'))) {
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
          action: (
            <Button variant="outline" onClick={() => toast({ title: "بازگشت به داشبورد" })}>
              بازگشت
            </Button>
          ),
        });
      }, 1000);
      
      // If it's a simple category page without specific service
      if (serviceLink === '/hosting' || serviceLink === '/vps' || 
          serviceLink === '/dedicated' || serviceLink === '/cloud' || 
          serviceLink === '/domain' || serviceLink === '/security' ||
          serviceLink === '/network' || serviceLink === '/modules' ||
          serviceLink === '/design' || serviceLink === '/panels' || 
          serviceLink === '/support') {
        
        console.log("Navigating to service category:", serviceLink);
      }
    } else {
      // For any other links
      toast({
        title: "انتقال به صفحه",
        description: `در حال انتقال به ${serviceLink}...`,
      });
    }
  };
  
  const handleSidebarClick = (tabId: string) => {
    setSelectedService(null);
    setIsNewTicket(false);
    setSelectedTicket(null);
    setSelectedNotification(null);
    setSelectedAnnouncement(null);
    setActiveTab(tabId);
  };

  const handleViewAllNotifications = () => {
    setActiveTab('notifications');
    
    toast({
      title: "اعلان‌های سیستم",
      description: "در حال بارگذاری لیست اعلان‌ها...",
    });
  };
  
  const handleViewImportantAnnouncements = () => {
    setActiveTab('important-announcements');
    
    toast({
      title: "اطلاعیه‌های مهم",
      description: "در حال بارگذاری لیست اطلاعیه‌ها...",
    });
  };
  
  const handleViewNotification = (notification: any) => {
    if (notification) {
      setSelectedNotification(notification);
      setActiveTab('notification-details');
      
      toast({
        title: "مشاهده اعلان",
        description: `در حال بارگذاری جزئیات اعلان ${notification.id || ''}...`,
      });
    }
  };
  
  const handleViewAnnouncement = (announcement: any) => {
    if (announcement) {
      setSelectedAnnouncement(announcement);
      setActiveTab('announcement-details');
      
      toast({
        title: "مشاهده اطلاعیه",
        description: `در حال بارگذاری جزئیات اطلاعیه ${announcement.id || ''}...`,
      });
    }
  };
  
  const handleViewTicket = (ticketId: string) => {
    if (ticketId) {
      setSelectedTicket(ticketId);
      setIsNewTicket(false);
      setActiveTab('ticket-details');
      
      toast({
        title: "مشاهده تیکت",
        description: `در حال بارگذاری جزئیات تیکت ${ticketId}...`,
      });
    }
  };
  
  const handleCreateNewTicket = () => {
    setIsNewTicket(true);
    setSelectedTicket(null);
    setActiveTab('tickets');
    
    toast({
      title: "ایجاد تیکت جدید",
      description: "در حال انتقال به صفحه ایجاد تیکت جدید...",
    });
  };
  
  const handleManageService = (serviceId: string, serviceType?: string) => {
    // Older callers passed (kind, id); normalize, then trust catalog identity only.
    const kinds = ['hosting','host','vps','dedicated','cloud','hourly','multilocation','domain'];
    const id = kinds.includes(serviceId) && serviceType ? serviceType : serviceId;
    if (!id) return;
    setSelectedService(id);
    setActiveTab(managementTab(id));
  };
  const handleResetServer = (_type: string, _id: string) => {
    toast({ title: 'عملیات متصل نیست', description: 'هیچ عملیات دستگاهی اجرا نشد.' });
  };
  const handleRenewService = (type: string, id: string) => {
    handleManageService(id, type);
    toast({ title: 'تمدید متصل نیست', description: 'هیچ درخواست یا پرداختی ثبت نشد.' });
  };
  const openInvoice = (id: string, mode: 'view' | 'pay') => {
    setSelectedService(id); setActiveTab(mode === 'pay' ? 'invoice-payment' : 'invoice-detail');
  };
  const handleViewInvoice = (id: string, _paid = false) => openInvoice(id, 'view');
  const handleDownloadInvoice = (id: string) => openInvoice(id, 'view');
  const handlePayInvoice = (id: string) => openInvoice(id, 'pay');

  return {
    navigateToServiceOrderPage,
    handleSidebarClick,
    handleViewAllNotifications,
    handleViewImportantAnnouncements,
    handleViewNotification,
    handleViewAnnouncement,
    handleViewTicket,
    handleCreateNewTicket,
    handleResetServer,
    handleRenewService,
    handleManageService,
    handleViewInvoice,
    handleDownloadInvoice,
    handlePayInvoice
  };
};


import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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
  handleManageService: (serviceId: string) => void;
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
        handleManageService(serviceId);
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
                               serviceLink.startsWith('/hosting-management/') || 
                               serviceLink.startsWith('/domain-management/'))) {
      const parts = serviceLink.split('/');
      const serviceType = parts[1].split('-')[0]; // Extract 'vps', 'dedicated', etc.
      const serviceId = parts[2];
      
      handleManageService(serviceId);
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
  
  const handleManageService = (serviceId: string) => {
    if (!serviceId) return;
    
    toast({
      title: `مدیریت سرویس`,
      description: `در حال بارگیری پنل مدیریت سرویس ${serviceId}...`,
    });
    
    // Navigate to VPS management by default (most common case)
    setSelectedService(serviceId);
    setActiveTab('vps-management');
  };
  
  const handleResetServer = (serviceType: string, serviceId: string) => {
    if (!serviceType || !serviceId) return;
    
    toast({
      title: `ریست سرور`,
      description: `در حال ریست سرور ${serviceType} با شناسه ${serviceId}. لطفاً صبر کنید...`,
    });
    
    // Simulate reset process
    setTimeout(() => {
      const resetToast = {
        title: "ریست سرور انجام شد",
        description: `سرور ${serviceId} با موفقیت ریست شد.`,
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      };
      toast(resetToast);
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
      const renewalToast = {
        title: "انتقال به صفحه پرداخت",
        description: "در حال انتقال به صفحه پرداخت برای تمدید سرویس...",
        action: (
          <Button variant="outline" onClick={() => toast({ title: "پرداخت موفق" })}>
            ادامه
          </Button>
        )
      };
      toast(renewalToast);
    }, 1000);
  };

  const handleViewInvoice = (invoiceId: string, isPaid: boolean = false) => {
    toast({
      title: isPaid ? "مشاهده فاکتور پرداخت شده" : "مشاهده فاکتور پرداخت نشده",
      description: `در حال بارگیری فاکتور شماره ${invoiceId}...`,
    });
    
    setTimeout(() => {
      setActiveTab('invoices');
      // Additional logic for viewing specific invoice could be added here
    }, 500);
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "دانلود فاکتور",
      description: "فاکتور در حال دانلود است...",
    });
    
    // Simulate download process
    setTimeout(() => {
      toast({
        title: "دانلود انجام شد",
        description: "فاکتور با موفقیت دانلود شد.",
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
    }, 1500);
  };

  const handlePayInvoice = (invoiceId: string) => {
    toast({
      title: "پرداخت فاکتور",
      description: "در حال انتقال به درگاه پرداخت...",
    });
    
    setTimeout(() => {
      toast({
        title: "انتقال به درگاه پرداخت",
        description: "در حال اتصال به درگاه پرداخت، لطفاً صبر کنید...",
        action: (
          <Button variant="outline" onClick={() => toast({ 
            title: "پرداخت موفق", 
            description: "پرداخت با موفقیت انجام شد."
          })}>
            تکمیل پرداخت
          </Button>
        )
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
    handleManageService,
    handleViewInvoice,
    handleDownloadInvoice,
    handlePayInvoice
  };
};

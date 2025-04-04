
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import ProfilePage from './ProfilePage';
import ServicesPage from './ServicesPage';
import TicketsPage from './TicketsPage';
import InvoicesPage from './InvoicesPage';
import WalletPage from './WalletPage';
import NotificationsPage from './NotificationsPage';
import ImportantAnnouncementsPage from './ImportantAnnouncementsPage';
import TransactionsPage from './TransactionsPage';
import DownloadsPage from './DownloadsPage';
import SettingsPage from './SettingsPage';
import NotificationDetails from './NotificationDetails';
import TicketDetail from './TicketDetail';
import DomainManagement from './DomainManagement';
import CreateTicketForm from './CreateTicketForm';
import { toast } from "@/components/ui/use-toast";

const UserPanelLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for notifications and details
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isNewTicket, setIsNewTicket] = useState(false);

  // Mock session time left
  const [sessionTimeLeft, setSessionTimeLeft] = useState('60:00');

  useEffect(() => {
    let timer: number;
    
    // Simulate session countdown
    if (sessionTimeLeft !== '00:00') {
      timer = window.setInterval(() => {
        const [minutes, seconds] = sessionTimeLeft.split(':').map(Number);
        
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        
        if (newMinutes < 0) {
          newMinutes = 0;
          newSeconds = 0;
        }
        
        const newSessionTimeLeft = `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        setSessionTimeLeft(newSessionTimeLeft);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sessionTimeLeft]);

  const sidebarItems = [
    { id: 'dashboard', label: 'داشبورد', icon: 'home' },
    { id: 'servers', label: 'سرورهای مجازی', icon: 'server' },
    { id: 'dedicated', label: 'سرورهای اختصاصی', icon: 'server-stack' },
    { id: 'cloud', label: 'سرورهای ابری', icon: 'cloud' },
    { id: 'hosting', label: 'هاستینگ', icon: 'database' },
    { id: 'domains', label: 'دامنه‌ها', icon: 'globe' },
    { id: 'tickets', label: 'تیکت‌های پشتیبانی', icon: 'message-square' },
    { id: 'invoices', label: 'فاکتورها', icon: 'file-text' },
    { id: 'wallet', label: 'کیف پول', icon: 'wallet' },
    { id: 'transactions', label: 'تراکنش‌ها', icon: 'credit-card' },
    { id: 'downloads', label: 'دانلودها', icon: 'download' },
    { id: 'notifications', label: 'اعلان‌ها', icon: 'bell' },
    { id: 'important-announcements', label: 'اطلاعیه‌های مهم', icon: 'megaphone' },
    { id: 'settings', label: 'تنظیمات', icon: 'settings' },
  ];
  
  const handleSidebarItemClick = (itemId: string) => {
    // Reset sub-states when changing main tab
    setSelectedNotification(null);
    setSelectedAnnouncement(null);
    setSelectedTicket(null);
    setIsNewTicket(false);
    setActiveTab(itemId);
  };
  
  const navigateToServiceOrderPage = (serviceLink: string) => {
    // Handle navigation to service pages
    if (serviceLink.startsWith('/manage/')) {
      const [, , serviceType, serviceId] = serviceLink.split('/');
      
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
      const ticketId = serviceLink.split('/')[2];
      setSelectedTicket(ticketId);
      setActiveTab('tickets');
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
    setSelectedNotification(notification);
    setActiveTab('notification-details');
  };
  
  const handleViewAnnouncement = (announcement: any) => {
    setSelectedAnnouncement(announcement);
    setActiveTab('announcement-details');
  };
  
  const handleViewTicket = (ticketId: string) => {
    setSelectedTicket(ticketId);
    setIsNewTicket(false);
    setActiveTab('ticket-details');
  };
  
  const handleCreateNewTicket = () => {
    setIsNewTicket(true);
    setSelectedTicket(null);
    setActiveTab('tickets');
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard navigateToServiceOrderPage={navigateToServiceOrderPage} />;
      case 'profile':
        return <ProfilePage />;
      case 'servers':
        return <ServicesPage serviceType="servers" onManage={navigateToServiceOrderPage} onReset={(type, id) => handleResetServer(type, id)} onRenew={(type, id) => handleRenewService(type, id)} />;
      case 'dedicated':
        return <ServicesPage serviceType="dedicated" onManage={navigateToServiceOrderPage} onReset={(type, id) => handleResetServer(type, id)} onRenew={(type, id) => handleRenewService(type, id)} />;
      case 'cloud':
        return <ServicesPage serviceType="cloud" onManage={navigateToServiceOrderPage} onReset={(type, id) => handleResetServer(type, id)} onRenew={(type, id) => handleRenewService(type, id)} />;
      case 'hosting':
        return <ServicesPage serviceType="hosting" onManage={navigateToServiceOrderPage} onRenew={(type, id) => handleRenewService(type, id)} />;
      case 'domains':
        return <ServicesPage serviceType="domains" onManage={navigateToServiceOrderPage} onRenew={(type, id) => handleRenewService(type, id)} />;
      case 'domain-management':
        return <DomainManagement domainId={selectedService || ''} onBack={() => setActiveTab('domains')} />;
      case 'tickets':
        return isNewTicket ? 
          <CreateTicketForm onCancel={() => setIsNewTicket(false)} onSubmit={() => setIsNewTicket(false)} /> : 
          <TicketsPage onViewTicket={handleViewTicket} onCreateNewTicket={handleCreateNewTicket} />;
      case 'ticket-details':
        return <TicketDetail ticketId={selectedTicket || ''} onBack={() => setActiveTab('tickets')} />;
      case 'invoices':
        return <InvoicesPage />;
      case 'wallet':
        return <WalletPage />;
      case 'notifications':
        return <NotificationsPage onViewNotification={handleViewNotification} />;
      case 'notification-details':
        return <NotificationDetails notification={selectedNotification} onBack={() => setActiveTab('notifications')} />;
      case 'important-announcements':
        return <ImportantAnnouncementsPage onViewAnnouncement={handleViewAnnouncement} />;
      case 'announcement-details':
        return <NotificationDetails notification={selectedAnnouncement} onBack={() => setActiveTab('important-announcements')} />;
      case 'transactions':
        return <TransactionsPage />;
      case 'downloads':
        return <DownloadsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard navigateToServiceOrderPage={navigateToServiceOrderPage} />;
    }
  };
  
  const handleResetServer = (serviceType: string, serviceId: string) => {
    toast({
      title: `ریست سرور`,
      description: `در حال ریست سرور ${serviceType} با شناسه ${serviceId}. لطفاً صبر کنید...`,
    });
    
    // Simulate reset process
    setTimeout(() => {
      toast({
        title: "ریست سرور انجام شد",
        description: `سرور ${serviceId} با موفقیت ریست شد.`,
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        ),
      });
    }, 3000);
  };
  
  const handleRenewService = (serviceType: string, serviceId: string) => {
    toast({
      title: `تمدید سرویس`,
      description: `درخواست تمدید سرویس ${serviceType} با شناسه ${serviceId} ثبت شد.`,
    });
    
    // Simulate renewal process
    setTimeout(() => {
      window.location.href = `/renew/${serviceType}/${serviceId}`;
    }, 1000);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        items={sidebarItems} 
        activeTab={activeTab}
        onItemClick={handleSidebarItemClick}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          activeTab={activeTab}
          sidebarItems={sidebarItems}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sessionTimeLeft={sessionTimeLeft}
          onSidebarItemClick={handleSidebarItemClick}
          onViewAllNotifications={handleViewAllNotifications}
          onViewImportantAnnouncements={handleViewImportantAnnouncements}
        />
        
        <main className="flex-1 overflow-auto bg-gray-100 p-4 md:p-6">
          <div className="container mx-auto">
            {renderContent()}
          </div>
        </main>
        
        <footer className="bg-white border-t p-4 text-center text-sm text-gray-600">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <p>© نوین وی‌دی‌اس ۱۴۰۲ - تمامی حقوق محفوظ است</p>
              </div>
              <div className="mt-2 md:mt-0">
                <div className="flex space-x-4 space-x-reverse">
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <span className="sr-only">توییتر</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <span className="sr-only">اینستاگرام</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.104 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.013 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772c-.5.509-1.104.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.013-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 01-1.772-1.153 4.903 4.903 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.903 4.903 0 011.153-1.772A4.903 4.903 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserPanelLayout;

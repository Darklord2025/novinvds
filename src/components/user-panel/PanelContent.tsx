
import React, { useState } from 'react';
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
import { NavigationHandlers } from '@/services/panelNavigationService';
import { PanelContentProps } from './interfaces';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import DevelopmentMessage from './DevelopmentMessage';

const PanelContent: React.FC<PanelContentProps> = ({
  activeTab,
  selectedService,
  selectedNotification,
  selectedAnnouncement,
  selectedTicket,
  isNewTicket,
  navigationHandlers
}) => {
  const {
    navigateToServiceOrderPage,
    handleViewTicket,
    handleCreateNewTicket,
    handleResetServer,
    handleRenewService,
    handleManageService
  } = navigationHandlers;
  
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [serverToReset, setServerToReset] = useState({ type: '', id: '' });
  
  const handleResetRequest = (type: string, id: string) => {
    setServerToReset({ type, id });
    setResetDialogOpen(true);
  };
  
  const confirmReset = () => {
    setResetDialogOpen(false);
    if (handleResetServer) {
      handleResetServer(serverToReset.type, serverToReset.id);
    }
    
    // Show progress toast
    toast({
      title: "در حال ریست سرور",
      description: `لطفاً صبر کنید... سرور ${serverToReset.id} در حال ریست است.`
    });
    
    // Simulate reset process
    setTimeout(() => {
      toast({
        title: "ریست سرور انجام شد",
        description: `ریست سرور ${serverToReset.id} با موفقیت انجام شد.`,
        action: (
          <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
            تأیید
          </Button>
        )
      });
    }, 3000);
  };

  switch (activeTab) {
    case 'dashboard':
      return (
        <>
          <Dashboard 
            navigateToServiceOrderPage={navigateToServiceOrderPage} 
            onResetRequest={handleResetRequest}
          />
          
          <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>تأیید ریست سرور</AlertDialogTitle>
                <AlertDialogDescription>
                  آیا از ریست سرور {serverToReset.id} اطمینان دارید؟ تمام اطلاعات و تنظیمات به حالت اولیه بازخواهند گشت.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction onClick={confirmReset} className="bg-red-600 hover:bg-red-700">
                  تأیید ریست
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    case 'profile':
      return <ProfilePage />;
    case 'servers':
      return <ServicesPage 
        serviceType="servers" 
        onManage={(id) => handleManageService('vps', id)} 
        onReset={(type, id) => handleResetRequest(type, id)} 
        onRenew={(type, id) => handleRenewService(type, id)} 
      />;
    case 'dedicated':
      return <ServicesPage 
        serviceType="dedicated" 
        onManage={(id) => handleManageService('dedicated', id)} 
        onReset={(type, id) => handleResetRequest(type, id)} 
        onRenew={(type, id) => handleRenewService(type, id)} 
      />;
    case 'cloud':
      return <ServicesPage 
        serviceType="cloud" 
        onManage={(id) => handleManageService('cloud', id)} 
        onReset={(type, id) => handleResetRequest(type, id)} 
        onRenew={(type, id) => handleRenewService(type, id)} 
      />;
    case 'hosting':
      return <ServicesPage 
        serviceType="hosting" 
        onManage={(id) => handleManageService('hosting', id)} 
        onRenew={(type, id) => handleRenewService(type, id)} 
      />;
    case 'domains':
      return <ServicesPage 
        serviceType="domains" 
        onManage={(id) => handleManageService('domain', id)} 
        onRenew={(type, id) => handleRenewService(type, id)} 
      />;
    case 'domain-management':
      return <DomainManagement domainId={selectedService || ''} onBack={() => navigateToServiceOrderPage('/domains')} />;
    case 'vps-management':
      return <DevelopmentMessage title={`مدیریت سرور مجازی ${selectedService}`} message="پنل مدیریت سرور مجازی در حال آماده‌سازی است. به زودی قابل دسترس خواهد بود." onBack={() => navigateToServiceOrderPage('/servers')} />;
    case 'dedicated-management':
      return <DevelopmentMessage title={`مدیریت سرور اختصاصی ${selectedService}`} message="پنل مدیریت سرور اختصاصی در حال آماده‌سازی است. به زودی قابل دسترس خواهد بود." onBack={() => navigateToServiceOrderPage('/dedicated')} />;
    case 'cloud-management':
      return <DevelopmentMessage title={`مدیریت سرور ابری ${selectedService}`} message="پنل مدیریت سرور ابری در حال آماده‌سازی است. به زودی قابل دسترس خواهد بود." onBack={() => navigateToServiceOrderPage('/cloud')} />;
    case 'hosting-management':
      return <DevelopmentMessage title={`مدیریت هاستینگ ${selectedService}`} message="پنل مدیریت هاستینگ در حال آماده‌سازی است. به زودی قابل دسترس خواهد بود." onBack={() => navigateToServiceOrderPage('/hosting')} />;
    case 'tickets':
      return isNewTicket ? 
        <CreateTicketForm onSubmit={() => navigateToServiceOrderPage('/tickets')} onCancel={() => navigateToServiceOrderPage('/tickets')} /> : 
        <TicketsPage onViewTicket={handleViewTicket} onCreateNewTicket={handleCreateNewTicket} />;
    case 'ticket-details':
      return <TicketDetail ticketId={selectedTicket || ''} onBack={() => navigateToServiceOrderPage('/tickets')} />;
    case 'invoices':
      return <InvoicesPage />;
    case 'wallet':
      return <WalletPage />;
    case 'notifications':
      return <NotificationsPage onViewNotification={navigationHandlers.handleViewNotification} />;
    case 'notification-details':
      return <NotificationDetails notification={selectedNotification} onBack={() => navigationHandlers.handleViewAllNotifications()} />;
    case 'important-announcements':
      return <ImportantAnnouncementsPage onViewAnnouncement={navigationHandlers.handleViewAnnouncement} />;
    case 'announcement-details':
      return <NotificationDetails notification={selectedAnnouncement} onBack={() => navigationHandlers.handleViewImportantAnnouncements()} />;
    case 'transactions':
      return <TransactionsPage />;
    case 'downloads':
      return <DownloadsPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <Dashboard 
        navigateToServiceOrderPage={navigateToServiceOrderPage}
        onResetRequest={handleResetRequest}
      />;
  }
};

export default PanelContent;

import React from 'react';
import Dashboard from './Dashboard';
import WHMCSServicesPage from './WHMCSServicesPage';
import WHMCSInvoicesPage from './WHMCSInvoicesPage';
import TicketsPage from './TicketsPage';
import WalletPage from './WalletPage';
import NotificationsPage from './NotificationsPage';
import ImportantAnnouncementsPage from './ImportantAnnouncementsPage';
import DownloadsPage from './DownloadsPage';
import ProfileSettingsPage from './ProfileSettingsPage';
import NotificationDetails from './NotificationDetails';
import TicketDetail from './TicketDetail';
import DomainManagement from './DomainManagement';
import CreateTicketForm from './CreateTicketForm';
import DomainServicesPage from './DomainServicesPage';
import AffiliateCenter from './AffiliateCenter';
import KnowledgeBase from './KnowledgeBase';
import NetworkStoreSection from './NetworkStoreSection';
import RecommendationSection from './RecommendationSection';
import ServerManagementDetail from './ServerManagementDetail';
import HostingManagementDetail from './HostingManagementDetail';
import HostingManagementPanel from './HostingManagementPanel';
import HostingGateway from './HostingGateway';
import CartPage from './CartPage';
import BillingOverviewPage from './BillingOverviewPage';
import TransactionsPage from './TransactionsPage';
import InvoicesPage from './InvoicesPage';
import WalletTopUpPage from './WalletTopUpPage';
import ServerManagementPage from './ServerManagementPage';
import ServiceCalculatorPage from './ServiceCalculatorPage';
import SecurityCenterPage from './SecurityCenterPage';
import ProformaInvoicePage from './ProformaInvoicePage';
import ServiceOrderPage from './ServiceOrderPage';
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
    handleManageService,
    handleViewInvoice,
    handleDownloadInvoice,
    handlePayInvoice
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

  // WHMCS-specific handlers
  const handleSuspendService = (serviceId: string) => {
    toast({
      title: "تعلیق خدمت",
      description: `خدمت ${serviceId} با موفقیت تعلیق شد.`,
    });
  };

  const handleUnsuspendService = (serviceId: string) => {
    toast({
      title: "فعال‌سازی خدمت",
      description: `خدمت ${serviceId} با موفقیت فعال شد.`,
    });
  };

  const handleTerminateService = (serviceId: string) => {
    toast({
      title: "خاتمه خدمت",
      description: `درخواست خاتمه خدمت ${serviceId} ثبت شد.`,
    });
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
    case 'recommendations':
      return <RecommendationSection />;
    case 'cart':
      return <CartPage onCheckout={() => navigationHandlers.handleSidebarClick('checkout')} />;
    case 'checkout':
      return <ProformaInvoicePage onBack={() => navigationHandlers.handleSidebarClick('cart')} />;
    case 'order-hosting':
    case 'order-hosting-linux-eco':
    case 'order-hosting-linux-pro':
    case 'order-hosting-linux-pro-ir':
    case 'order-hosting-linux-vip':
    case 'order-hosting-linux-ir':
    case 'order-hosting-wordpress':
    case 'order-hosting-woocommerce':
    case 'order-hosting-windows':
    case 'order-hosting-windows-ir':
    case 'order-hosting-python':
    case 'order-hosting-nodejs':
    case 'order-hosting-download':
    case 'order-hosting-warez':
    case 'order-hosting-email':
    case 'order-hosting-custom':
    case 'order-vps':
    case 'order-vps-linux':
    case 'order-vps-windows':
    case 'order-vps-ubuntu-desktop':
    case 'order-vps-linux-ir':
    case 'order-vps-windows-ir':
    case 'order-vps-mikrotik':
    case 'order-vps-storage':
    case 'order-vps-hourly':
    case 'order-vps-daily':
    case 'order-vps-managed':
    case 'order-vps-custom':
    case 'order-dedicated':
    case 'order-dedicated-iran':
    case 'order-dedicated-europe':
    case 'order-dedicated-usa':
    case 'order-dedicated-asia':
    case 'order-dedicated-gpu':
    case 'order-dedicated-storage':
    case 'order-domain':
    case 'order-domain-ir':
    case 'order-domain-com':
    case 'order-domain-net':
    case 'order-domain-org':
    case 'order-domain-co':
    case 'order-domain-io':
    case 'order-domain-me':
    case 'order-domain-info':
    case 'order-domain-biz':
    case 'order-domain-shop':
    case 'order-domain-app':
    case 'order-domain-dev':
    case 'order-domain-xyz':
    case 'order-domain-online':
    case 'order-domain-site':
    case 'order-domain-store':
    case 'order-domain-asia':
    case 'order-domain-co-ir':
    case 'order-domain-ac-ir':
    case 'order-ssl':
    case 'order-network':
    case 'order-panels':
    case 'order-modules':
    case 'order-support':
      return <ServiceOrderPage 
        category={activeTab} 
        onBack={() => navigationHandlers.handleSidebarClick('dashboard')}
      />;
    case 'profile':
      return <ProfileSettingsPage />;
    case 'servers':
    case 'dedicated':
    case 'cloud':
    case 'hosting':
      return <WHMCSServicesPage 
        onManageService={handleManageService}
        onRenewService={handleRenewService}
        onSuspendService={handleSuspendService}
        onUnsuspendService={handleUnsuspendService}
        onTerminateService={handleTerminateService}
        onViewInvoice={handleViewInvoice}
        onBack={() => navigationHandlers.handleSidebarClick('dashboard')}
      />;
    case 'domains':
      return <DomainServicesPage 
        onManageDomain={handleManageService}
        onRenewDomain={handleRenewService}
      />;
    case 'domain-management':
      return selectedService ? 
        <DomainManagement 
          domainId={selectedService} 
          onBack={() => navigationHandlers.handleSidebarClick('domains')} 
        /> : null;
    case 'vps-management':
      return selectedService ? 
        <ServerManagementDetail 
          serverId={selectedService}
          serverType="vps"
          onBack={() => navigationHandlers.handleSidebarClick('servers')} 
        /> : null;
    case 'dedicated-management':
      return selectedService ? 
        <ServerManagementDetail 
          serverId={selectedService}
          serverType="dedicated"
          onBack={() => navigationHandlers.handleSidebarClick('servers')} 
        /> : null;
    case 'cloud-management':
      return selectedService ? 
        <ServerManagementDetail 
          serverId={selectedService}
          serverType="cloud"
          onBack={() => navigationHandlers.handleSidebarClick('servers')} 
        /> : null;
    case 'hourly-management':
      return selectedService ? 
        <ServerManagementDetail 
          serverId={selectedService}
          serverType="hourly"
          onBack={() => navigationHandlers.handleSidebarClick('servers')} 
        /> : null;
    case 'hosting-management':
      return selectedService ? 
        <HostingManagementPanel 
          serviceId={selectedService} 
          onBack={() => navigationHandlers.handleSidebarClick('hosting')} 
        /> : null;
    case 'hosting-gateway':
      return selectedService ? 
        <HostingGateway 
          serviceId={selectedService} 
          onBack={() => navigationHandlers.handleSidebarClick('servers')}
          onEnterPanel={() => navigationHandlers.handleManageService('hosting', selectedService)}
        /> : null;
    case 'tickets':
      return isNewTicket ? 
        <CreateTicketForm onSubmit={() => navigateToServiceOrderPage('/tickets')} onCancel={() => navigateToServiceOrderPage('/tickets')} /> : 
        <TicketsPage onViewTicket={handleViewTicket} onCreateNewTicket={handleCreateNewTicket} />;
    case 'ticket-details':
      return selectedTicket ? 
        <TicketDetail ticketId={selectedTicket} onBack={() => navigateToServiceOrderPage('/tickets')} /> : null;
    case 'whmcs-invoices':
      return <WHMCSInvoicesPage 
        onViewInvoice={handleViewInvoice}
        onPayInvoice={handlePayInvoice}
        onDownloadInvoice={handleDownloadInvoice}
      />;
    case 'wallet':
      return <WalletPage />;
    case 'affiliate':
      return <AffiliateCenter />;
    case 'knowledge-base':
      return <KnowledgeBase />;
    case 'security':
      return <SecurityCenterPage />;
    case 'financial':
    case 'financial-overview':
      return <BillingOverviewPage 
        navigateToServiceOrderPage={navigateToServiceOrderPage}
        onNavigateToTransactions={() => navigateToServiceOrderPage('/transactions')}
        onNavigateToInvoices={() => navigateToServiceOrderPage('/invoices')}
      />;
    case 'transactions':
      return <TransactionsPage onBack={() => navigationHandlers.navigateToServiceOrderPage('/financial-overview')} />;
    case 'invoices':
      return <InvoicesPage onBack={() => navigationHandlers.navigateToServiceOrderPage('/financial-overview')} />;
    case 'wallet-topup':
      return <WalletTopUpPage onBack={() => navigationHandlers.navigateToServiceOrderPage('/financial-overview')} />;
    case 'server-management':
      return <ServerManagementPage />;
    case 'service-calculator':
      return <ServiceCalculatorPage />;
    case 'downloads':
      return <DownloadsPage />;
    case 'notifications':
      return <NotificationsPage onViewNotification={navigationHandlers.handleViewNotification} />;
    case 'notification-details':
      return selectedNotification ? 
        <NotificationDetails notification={selectedNotification} onBack={() => navigationHandlers.handleViewAllNotifications()} /> : null;
    case 'important-announcements':
      return <ImportantAnnouncementsPage onViewAnnouncement={navigationHandlers.handleViewAnnouncement} />;
    case 'announcement-details':
      return selectedAnnouncement ? 
        <NotificationDetails notification={selectedAnnouncement} onBack={() => navigationHandlers.handleViewImportantAnnouncements()} /> : null;
    default:
      return <Dashboard 
        navigateToServiceOrderPage={navigateToServiceOrderPage}
        onResetRequest={handleResetRequest}
      />;
  }
};

export default PanelContent;
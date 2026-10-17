import React from 'react';
const Dashboard = React.lazy(() => import('./Dashboard'));
const WHMCSServicesPage = React.lazy(() => import('./WHMCSServicesPage'));
const WHMCSInvoicesPage = React.lazy(() => import('./WHMCSInvoicesPage'));
const TicketsPage = React.lazy(() => import('./TicketsPage'));
const WalletPage = React.lazy(() => import('./WalletPage'));
const NotificationsPage = React.lazy(() => import('./NotificationsPage'));
const ImportantAnnouncementsPage = React.lazy(() => import('./ImportantAnnouncementsPage'));
const DownloadsPage = React.lazy(() => import('./DownloadsPage'));
const ProfileSettingsPage = React.lazy(() => import('./ProfileSettingsPage'));
const NotificationDetails = React.lazy(() => import('./NotificationDetails'));
const TicketDetail = React.lazy(() => import('./TicketDetail'));
const DomainManagement = React.lazy(() => import('./DomainManagement'));
const CreateTicketForm = React.lazy(() => import('./CreateTicketForm'));
const DomainServicesPage = React.lazy(() => import('./DomainServicesPage'));
const AffiliateCenter = React.lazy(() => import('./AffiliateCenter'));
const KnowledgeBase = React.lazy(() => import('./KnowledgeBase'));
const NetworkStoreSection = React.lazy(() => import('./NetworkStoreSection'));
const RecommendationSection = React.lazy(() => import('./RecommendationSection'));
const ServerManagementDetail = React.lazy(() => import('./ServerManagementDetail'));
const HostingManagementDetail = React.lazy(() => import('./HostingManagementDetail'));
const HostingManagementPanel = React.lazy(() => import('./HostingManagementPanel'));
const HostingGateway = React.lazy(() => import('./HostingGateway'));
const CartPage = React.lazy(() => import('./CartPage'));
const BillingOverviewPage = React.lazy(() => import('./BillingOverviewPage'));
const TransactionsPage = React.lazy(() => import('./TransactionsPage'));
const InvoicesPage = React.lazy(() => import('./InvoicesPage'));
const WalletTopUpPage = React.lazy(() => import('./WalletTopUpPage'));
const ServerManagementPage = React.lazy(() => import('./ServerManagementPage'));
const ServiceCalculatorPage = React.lazy(() => import('./ServiceCalculatorPage'));
const SecurityCenterPage = React.lazy(() => import('./SecurityCenterPage'));
const ProformaInvoicePage = React.lazy(() => import('./ProformaInvoicePage'));
const ServiceOrderPage = React.lazy(() => import('./ServiceOrderPage'));
import { NavigationHandlers } from '@/services/panelNavigationService';
import { PanelContentProps } from './interfaces';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useState } from 'react';
const DevelopmentMessage = React.lazy(() => import('./DevelopmentMessage'));

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
  
  const confirmReset = () => { setResetDialogOpen(false); handleResetServer?.(serverToReset.type, serverToReset.id); };
  const unavailable = () => toast({ title: 'عملیات متصل نیست', description: 'درخواستی ذخیره یا اجرا نشده است.' });
  const handleSuspendService = unavailable;
  const handleUnsuspendService = unavailable;
  const handleTerminateService = unavailable;

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
      return <CartPage onCheckout={() => navigationHandlers.handleSidebarClick('checkout')} onBrowseServices={() => navigationHandlers.handleSidebarClick('order-vps')} />;
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
    case 'order-vps-multilocation':
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
    case 'hosting': {
      const kindMap: Record<string, any> = { servers: 'all', dedicated: 'dedicated', cloud: 'cloud', hosting: 'hosting' };
      return <WHMCSServicesPage 
        onManageService={handleManageService}
        onRenewService={(id, kind) => handleRenewService(kind, id)}
        onSuspendService={handleSuspendService}
        onUnsuspendService={handleUnsuspendService}
        onTerminateService={handleTerminateService}
        onViewInvoice={handleViewInvoice}
        onBack={() => navigationHandlers.handleSidebarClick('dashboard')}
        initialKind={kindMap[activeTab]}
      />;
    }
    case 'domains':
      return <DomainServicesPage 
        onManageDomain={handleManageService}
        onRenewDomain={handleRenewService}
        onBack={() => navigationHandlers.handleSidebarClick('dashboard')}
      />;
    case 'service-unavailable':
      return <div className="space-y-4"><p>سرویس در دسترس نیست / Service unavailable</p><Button variant="outline" onClick={() => navigationHandlers.handleSidebarClick('servers')}>بازگشت به سرویس‌ها</Button></div>;
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
    case 'multilocation-management':
      return selectedService ? <ServerManagementDetail key={selectedService} serverId={selectedService} serverType="multilocation" onBack={() => navigationHandlers.handleSidebarClick('servers')} /> : null;
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
    case 'invoice-detail':
    case 'invoice-payment':
      return <InvoicesPage key={`${activeTab}-${selectedService}`} initialInvoiceId={selectedService ?? undefined} initialMode={activeTab === 'invoice-payment' ? 'pay' : 'view'} onBack={() => navigationHandlers.handleSidebarClick('invoices')} />;
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
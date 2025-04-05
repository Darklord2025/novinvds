
import React from 'react';
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
    handleRenewService
  } = navigationHandlers;

  switch (activeTab) {
    case 'dashboard':
      return <Dashboard navigateToServiceOrderPage={navigateToServiceOrderPage} />;
    case 'profile':
      return <ProfilePage />;
    case 'servers':
      return <ServicesPage serviceType="servers" onManage={(id) => navigateToServiceOrderPage(`/manage/vps/${id}`)} onReset={(type, id) => handleResetServer(type, id)} onRenew={(type, id) => handleRenewService(type, id)} />;
    case 'dedicated':
      return <ServicesPage serviceType="dedicated" onManage={(id) => navigateToServiceOrderPage(`/manage/dedicated/${id}`)} onReset={(type, id) => handleResetServer(type, id)} onRenew={(type, id) => handleRenewService(type, id)} />;
    case 'cloud':
      return <ServicesPage serviceType="cloud" onManage={(id) => navigateToServiceOrderPage(`/manage/cloud/${id}`)} onReset={(type, id) => handleResetServer(type, id)} onRenew={(type, id) => handleRenewService(type, id)} />;
    case 'hosting':
      return <ServicesPage serviceType="hosting" onManage={(id) => navigateToServiceOrderPage(`/manage/hosting/${id}`)} onRenew={(type, id) => handleRenewService(type, id)} />;
    case 'domains':
      return <ServicesPage serviceType="domains" onManage={(id) => navigateToServiceOrderPage(`/manage/domain/${id}`)} onRenew={(type, id) => handleRenewService(type, id)} />;
    case 'domain-management':
      return <DomainManagement domainId={selectedService || ''} onBack={() => navigateToServiceOrderPage('/domains')} />;
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
      return <Dashboard navigateToServiceOrderPage={navigateToServiceOrderPage} />;
  }
};

export default PanelContent;

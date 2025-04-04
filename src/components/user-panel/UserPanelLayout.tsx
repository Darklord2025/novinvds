
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PanelContent from './PanelContent';
import PanelFooter from './PanelFooter';
import { usePanelState } from '@/hooks/usePanelState';
import { createNavigationHandlers } from '@/services/panelNavigationService';
import { sidebarItems } from '@/data/sidebarItems';

const UserPanelLayout = () => {
  const {
    activeTab,
    setActiveTab,
    selectedService,
    setSelectedService,
    searchQuery,
    setSearchQuery,
    selectedNotification,
    setSelectedNotification,
    selectedAnnouncement,
    setSelectedAnnouncement,
    selectedTicket,
    setSelectedTicket,
    isNewTicket,
    setIsNewTicket,
    sessionTimeLeft,
    handleSidebarItemClick
  } = usePanelState();
  
  const navigationHandlers = createNavigationHandlers(
    setActiveTab,
    setSelectedService,
    setIsNewTicket,
    setSelectedTicket,
    setSelectedNotification,
    setSelectedAnnouncement
  );
  
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
          onViewAllNotifications={navigationHandlers.handleViewAllNotifications}
          onViewImportantAnnouncements={navigationHandlers.handleViewImportantAnnouncements}
        />
        
        <main className="flex-1 overflow-auto bg-gray-100 p-4 md:p-6">
          <div className="container mx-auto">
            <PanelContent
              activeTab={activeTab}
              selectedService={selectedService}
              selectedNotification={selectedNotification}
              selectedAnnouncement={selectedAnnouncement}
              selectedTicket={selectedTicket}
              isNewTicket={isNewTicket}
              navigationHandlers={navigationHandlers}
            />
          </div>
        </main>
        
        <PanelFooter />
      </div>
    </div>
  );
};

export default UserPanelLayout;

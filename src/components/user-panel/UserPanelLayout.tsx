
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PanelContent from './PanelContent';
import PanelFooter from './PanelFooter';
import { usePanelState } from '@/hooks/usePanelState';
import { createNavigationHandlers } from '@/services/panelNavigationService';
import { sidebarItems } from '@/data/sidebarItems';
import { TooltipProvider } from '@/components/ui/tooltip';

const UserPanelLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
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

  const handleMobileSidebarClick = (itemId: string) => {
    handleSidebarItemClick(itemId);
    setIsMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        {/* Desktop Sidebar */}
        <Sidebar 
          items={sidebarItems} 
          activeTab={activeTab}
          onItemClick={handleSidebarItemClick}
          className="hidden md:flex"
          isMobile={false}
        />
        
        {/* Mobile Sidebar */}
        <Sidebar 
          items={sidebarItems} 
          activeTab={activeTab}
          onItemClick={handleMobileSidebarClick}
          isMobile={true}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
        
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <Header 
            activeTab={activeTab}
            onNavigate={handleSidebarItemClick}
            onToggleMobileSidebar={toggleMobileSidebar}
          />
          
          <main className="flex-1 overflow-auto bg-gray-100 p-3 md:p-4 lg:p-6">
            <div className="container mx-auto max-w-full px-2 md:px-0">
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
    </TooltipProvider>
  );
};

export default UserPanelLayout;

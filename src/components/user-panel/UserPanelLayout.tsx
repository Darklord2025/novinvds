
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
      <div className="flex min-h-screen bg-background w-full items-start">
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
        
        <div className="flex flex-col flex-1 min-w-0">
          <Header 
            activeTab={activeTab}
            onNavigate={handleSidebarItemClick}
            onToggleMobileSidebar={toggleMobileSidebar}
          />
          
          <main className="bg-background p-3 md:p-4 lg:p-6 min-w-0">
            <div className="container mx-auto max-w-full px-2 md:px-0">
              <React.Suspense fallback={<p role="status">در حال بارگذاری…</p>}>
              <PanelContent
                activeTab={activeTab}
                selectedService={selectedService}
                selectedNotification={selectedNotification}
                selectedAnnouncement={selectedAnnouncement}
                selectedTicket={selectedTicket}
                isNewTicket={isNewTicket}
                navigationHandlers={navigationHandlers}
              />
              </React.Suspense>
            </div>
          </main>
          
          <PanelFooter />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default UserPanelLayout;

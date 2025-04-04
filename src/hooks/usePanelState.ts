
import { useState, useEffect } from 'react';

export interface PanelState {
  activeTab: string;
  selectedService: string | null;
  searchQuery: string;
  selectedNotification: any;
  selectedAnnouncement: any;
  selectedTicket: string | null;
  isNewTicket: boolean;
  sessionTimeLeft: string;
}

export function usePanelState() {
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

  const handleSidebarItemClick = (itemId: string) => {
    // Reset sub-states when changing main tab
    setSelectedNotification(null);
    setSelectedAnnouncement(null);
    setSelectedTicket(null);
    setIsNewTicket(false);
    setActiveTab(itemId);
  };

  return {
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
  };
}

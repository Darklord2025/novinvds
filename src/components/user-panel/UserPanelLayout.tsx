
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import DevelopmentMessage from './DevelopmentMessage';
import ProfilePage from './ProfilePage';
import TicketsPage from './TicketsPage';
import WalletPage from './WalletPage';
import ServicesPage from './ServicesPage';
import DownloadsPage from './DownloadsPage';
import ServiceCalculator from './ServiceCalculator';

const sidebarItems = [
  { id: 'dashboard', label: 'داشبورد' },
  { id: 'servers', label: 'سرورهای مجازی' },
  { id: 'dedicated', label: 'سرورهای اختصاصی' },
  { id: 'domains', label: 'دامنه‌ها' },
  { id: 'hosting', label: 'هاستینگ' },
  { id: 'cloud', label: 'سرور ابری' },
  { id: 'calculator', label: 'محاسبه هزینه' },
  { id: 'tickets', label: 'تیکت‌ها' },
  { id: 'invoices', label: 'فاکتورها' },
  { id: 'transactions', label: 'تراکنش‌ها' },
  { id: 'wallet', label: 'کیف پول' },
  { id: 'downloads', label: 'دانلودها' },
  { id: 'profile', label: 'پروفایل' },
  { id: 'settings', label: 'تنظیمات' },
];

const UserPanelLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1">
        <Header 
          activeTab={activeTab} 
          sidebarItems={sidebarItems} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <main className="p-6">
          {activeTab === 'dashboard' ? (
            <Dashboard />
          ) : activeTab === 'profile' ? (
            <ProfilePage />
          ) : activeTab === 'tickets' ? (
            <TicketsPage />
          ) : activeTab === 'wallet' ? (
            <WalletPage />
          ) : activeTab === 'downloads' ? (
            <DownloadsPage />
          ) : activeTab === 'calculator' ? (
            <ServiceCalculator />
          ) : activeTab === 'servers' || activeTab === 'dedicated' || activeTab === 'hosting' || activeTab === 'domains' || activeTab === 'cloud' ? (
            <ServicesPage serviceType={activeTab} />
          ) : (
            <DevelopmentMessage />
          )}
        </main>
      </div>
    </div>
  );
};

export default UserPanelLayout;


import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import DevelopmentMessage from './DevelopmentMessage';
import ProfilePage from './ProfilePage';

const sidebarItems = [
  { id: 'dashboard', label: 'داشبورد' },
  { id: 'servers', label: 'سرورهای مجازی' },
  { id: 'dedicated', label: 'سرورهای اختصاصی' },
  { id: 'domains', label: 'دامنه‌ها' },
  { id: 'invoices', label: 'فاکتورها' },
  { id: 'transactions', label: 'تراکنش‌ها' },
  { id: 'tickets', label: 'تیکت‌ها' },
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
          ) : (
            <DevelopmentMessage />
          )}
        </main>
      </div>
    </div>
  );
};

export default UserPanelLayout;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Server, 
  HardDrive, 
  Globe, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  LogOut, 
  LayoutDashboard, 
  ChevronRight,
  ChevronLeft,
  Wallet,
  Download,
  Database,
  Cloud
} from 'lucide-react';

type SidebarItemType = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems: SidebarItemType[] = [
    { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard size={20} /> },
    { id: 'servers', label: 'سرورهای مجازی', icon: <Server size={20} /> },
    { id: 'dedicated', label: 'سرورهای اختصاصی', icon: <HardDrive size={20} /> },
    { id: 'cloud', label: 'سرور ابری', icon: <Cloud size={20} /> },
    { id: 'hosting', label: 'هاستینگ', icon: <Database size={20} /> },
    { id: 'domains', label: 'دامنه‌ها', icon: <Globe size={20} /> },
    { id: 'tickets', label: 'تیکت‌ها', icon: <MessageSquare size={20} /> },
    { id: 'invoices', label: 'فاکتورها', icon: <FileText size={20} /> },
    { id: 'transactions', label: 'تراکنش‌ها', icon: <CreditCard size={20} /> },
    { id: 'wallet', label: 'کیف پول', icon: <Wallet size={20} /> },
    { id: 'downloads', label: 'دانلودها', icon: <Download size={20} /> },
    { id: 'profile', label: 'پروفایل', icon: <User size={20} /> },
    { id: 'settings', label: 'تنظیمات', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`bg-white shadow-md transition-all duration-300 h-screen sticky top-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className={`flex items-center ${collapsed ? 'mr-8' : ''}`}>
            {!collapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NovinVDS
              </span>
            )}
          </Link>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {sidebarItems.map(item => (
              <li key={item.id}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === item.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <div className="flex items-center justify-center">
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <span className="mr-3 font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t">
          <button 
            className={`flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} />
            {!collapsed && <span className="mr-3 font-medium">خروج</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

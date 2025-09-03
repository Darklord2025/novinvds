
import React from 'react';
import { LayoutDashboard, Server, HardDrive, Globe, Database, Cloud, Calculator, TicketCheck, Receipt, History, Wallet, Download, User, Settings, LogOut, Home, Bell, Megaphone } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarProps } from './interfaces';
import { SidebarItem } from '@/data/sidebarItems';

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  items = [], 
  onItemClick, 
  onHomeClick, 
  className 
}) => {
  // Handle item clicks for both interfaces
  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    } else if (setActiveTab) {
      setActiveTab(itemId);
    }
  };

  const getIcon = (iconName: string, className: string = "h-5 w-5") => {
    switch (iconName) {
      case 'home': return <LayoutDashboard className={className} />;
      case 'server': return <Server className={className} />;
      case 'server-stack': return <HardDrive className={className} />;
      case 'globe': return <Globe className={className} />;
      case 'database': return <Database className={className} />;
      case 'cloud': return <Cloud className={className} />;
      case 'calculator': return <Calculator className={className} />;
      case 'message-square': return <TicketCheck className={className} />;
      case 'file-text': return <Receipt className={className} />;
      case 'credit-card': return <History className={className} />;
      case 'wallet': return <Wallet className={className} />;
      case 'download': return <Download className={className} />;
      case 'user': return <User className={className} />;
      case 'settings': return <Settings className={className} />;
      case 'bell': return <Bell className={className} />;
      case 'megaphone': return <Megaphone className={className} />;
      default: return <div className={className} />;
    }
  };

  return (
    <div className={cn("w-64 bg-white border-l shadow-sm hidden md:flex md:flex-col", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600">نوین وی‌دی‌اس</h2>
          {onHomeClick && (
            <Button 
              variant="ghost" 
              size="icon" 
              title="بازگشت به صفحه اصلی"
              onClick={onHomeClick}
            >
              <Home className="h-5 w-5" />
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">پنل کاربری</p>
      </div>
      
      <div className="py-4 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                className={cn(
                  "w-full flex items-center px-4 py-2 text-sm text-right rounded-lg transition-colors",
                  activeTab === item.id
                    ? "text-blue-600 bg-blue-50 font-medium border-r-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => handleItemClick(item.id)}
              >
                <span className="ml-2">{getIcon(item.icon)}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t mt-auto">
        <button
          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5 ml-2" />
          <span>خروج از حساب</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

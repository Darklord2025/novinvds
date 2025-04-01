
import React from 'react';
import { LayoutDashboard, Server, HardDrive, Globe, Database, Cloud, Calculator, TicketCheck, Receipt, History, Wallet, Download, User, Settings, LogOut, ChevronRight, Home } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  items?: Array<{ id: string; label: string; icon: string }>;
  onHomeClick?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, items = [], onHomeClick, className }) => {
  const getIcon = (iconName: string, className: string = "h-5 w-5") => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard className={className} />;
      case 'Server': return <Server className={className} />;
      case 'HardDrive': return <HardDrive className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Database': return <Database className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'Calculator': return <Calculator className={className} />;
      case 'TicketCheck': return <TicketCheck className={className} />;
      case 'Receipt': return <Receipt className={className} />;
      case 'History': return <History className={className} />;
      case 'Wallet': return <Wallet className={className} />;
      case 'Download': return <Download className={className} />;
      case 'User': return <User className={className} />;
      case 'Settings': return <Settings className={className} />;
      default: return <div className={className} />;
    }
  };

  return (
    <div className={cn("w-64 bg-white border-l shadow-sm hidden md:block", className)}>
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
      
      <div className="py-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                className={cn(
                  "w-full flex items-center px-4 py-2 text-sm text-right transition-colors",
                  activeTab === item.id
                    ? "text-blue-600 bg-blue-50 font-medium border-r-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="ml-2">{getIcon(item.icon)}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto p-4 border-t">
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

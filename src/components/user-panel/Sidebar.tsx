
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Server, 
  HardDrive, 
  Globe, 
  Database, 
  Cloud, 
  Calculator, 
  TicketCheck, 
  Receipt, 
  History, 
  Wallet, 
  Download, 
  User, 
  Settings, 
  LogOut, 
  Home, 
  Bell, 
  Megaphone,
  Star,
  Users,
  BookOpen,
  Shield,
  Repeat,
  FileText,
  PlusCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarProps, SidebarItem } from './interfaces';

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

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getIcon = (iconName: string, className: string = "h-5 w-5") => {
    const coloredClass = className.includes('text-') ? className : `${className} text-blue-500`;
    
    switch (iconName) {
      case 'home': return <LayoutDashboard className={`${className} text-blue-500`} />;
      case 'server': return <Server className={`${className} text-green-500`} />;
      case 'server-stack': return <HardDrive className={`${className} text-purple-500`} />;
      case 'hard-drive': return <HardDrive className={`${className} text-purple-500`} />;
      case 'globe': return <Globe className={`${className} text-cyan-500`} />;
      case 'database': return <Database className={`${className} text-orange-500`} />;
      case 'cloud': return <Cloud className={`${className} text-indigo-500`} />;
      case 'calculator': return <Calculator className={`${className} text-yellow-500`} />;
      case 'message-square': return <TicketCheck className={`${className} text-red-500`} />;
      case 'file-text': return <FileText className={`${className} text-gray-500`} />;
      case 'credit-card': return <History className={`${className} text-teal-500`} />;
      case 'wallet': return <Wallet className={`${className} text-emerald-500`} />;
      case 'download': return <Download className={`${className} text-blue-600`} />;
      case 'user': return <User className={`${className} text-pink-500`} />;
      case 'settings': return <Settings className={`${className} text-gray-600`} />;
      case 'bell': return <Bell className={`${className} text-yellow-600`} />;
      case 'megaphone': return <Megaphone className={`${className} text-orange-600`} />;
      case 'star': return <Star className={`${className} text-amber-500`} />;
      case 'users': return <Users className={`${className} text-violet-500`} />;
      case 'book-open': return <BookOpen className={`${className} text-green-600`} />;
      case 'shield': return <Shield className={`${className} text-red-600`} />;
      case 'repeat': return <Repeat className={`${className} text-blue-400`} />;
      case 'layout-dashboard': return <LayoutDashboard className={`${className} text-cyan-600`} />;
      case 'plus-circle': return <PlusCircle className={`${className} text-green-400`} />;
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
              {item.submenu ? (
                <div>
                  <button
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2 text-sm text-right rounded-lg transition-colors",
                      "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => toggleExpanded(item.id)}
                  >
                    <div className="flex items-center">
                      <span className="ml-2">{getIcon(item.icon)}</span>
                      <span>{item.label}</span>
                    </div>
                    {expandedItems.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.id) && (
                    <ul className="mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            className={cn(
                              "w-full flex items-center px-8 py-2 text-sm text-right rounded-lg transition-colors",
                              activeTab === subItem.id
                                ? "text-blue-600 bg-blue-50 font-medium border-r-4 border-blue-600"
                                : "text-gray-600 hover:bg-gray-100"
                            )}
                            onClick={() => handleItemClick(subItem.id)}
                          >
                            <span className="ml-2">{getIcon(subItem.icon, "h-4 w-4")}</span>
                            <span>{subItem.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
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
              )}
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

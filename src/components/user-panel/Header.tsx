
import React, { useState } from 'react';
import { Bell, Search, Menu, User, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  activeTab: string;
  sidebarItems: Array<{ id: string; label: string; icon: string }>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sessionTimeLeft?: string;
  onSidebarItemClick?: (itemId: string) => void;
  onViewAllNotifications?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  sidebarItems, 
  searchQuery, 
  setSearchQuery, 
  sessionTimeLeft = "60:00",
  onSidebarItemClick,
  onViewAllNotifications
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const getPageTitle = () => {
    const item = sidebarItems.find(item => item.id === activeTab);
    return item ? item.label : 'داشبورد';
  };
  
  const handleSidebarItemClick = (itemId: string) => {
    if (onSidebarItemClick) {
      onSidebarItemClick(itemId);
    }
  };
  
  const handleViewAllNotifications = () => {
    if (onViewAllNotifications) {
      onViewAllNotifications();
    }
  };
  
  return (
    <header className="bg-white border-b px-4 py-3 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" title="منو">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-0">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-blue-600">نوین وی‌دی‌اس</h2>
              <p className="text-sm text-gray-500 mt-1">پنل کاربری</p>
            </div>
            <div className="py-4">
              <ul className="space-y-1">
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className={
                        activeTab === item.id
                          ? "w-full flex items-center px-4 py-2 text-sm text-right text-blue-600 bg-blue-50 font-medium border-r-4 border-blue-600"
                          : "w-full flex items-center px-4 py-2 text-sm text-right text-gray-700 hover:bg-gray-100"
                      }
                      onClick={() => handleSidebarItemClick(item.id)}
                    >
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="flex-1 md:flex-initial">
        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
      </div>
      
      <div className="hidden md:flex flex-1 max-w-md mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="جستجو..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1 text-gray-700">
          <Clock className="h-4 w-4 ml-1" />
          <span className="text-sm">{sessionTimeLeft}</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>اعلان‌های شما</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <span className="font-medium">تیکت جدید پاسخ داده شد</span>
                <span className="text-sm text-gray-500 mt-1">تیکت شما با موضوع "مشکل در اتصال به سرور" پاسخ داده شد.</span>
                <span className="text-xs text-gray-400 mt-2">۱۵ دقیقه پیش</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <span className="font-medium">فاکتور جدید</span>
                <span className="text-sm text-gray-500 mt-1">فاکتور جدیدی برای تمدید سرور مجازی شما صادر شده است.</span>
                <span className="text-xs text-gray-400 mt-2">۲ ساعت پیش</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <span className="font-medium">رویداد سیستم</span>
                <span className="text-sm text-gray-500 mt-1">عملیات نگهداری برنامه‌ریزی شده در تاریخ ۲۵ خرداد ۱۴۰۲</span>
                <span className="text-xs text-gray-400 mt-2">دیروز</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-blue-600 justify-center" onClick={handleViewAllNotifications}>
              مشاهده همه اعلان‌ها
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user1.png" />
                <AvatarFallback>کا</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>حساب کاربری</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="ml-2 h-4 w-4" />
              <span>پروفایل</span>
            </DropdownMenuItem>
            <DropdownMenuItem>تنظیمات</DropdownMenuItem>
            <DropdownMenuItem>پشتیبانی</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">خروج از حساب</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

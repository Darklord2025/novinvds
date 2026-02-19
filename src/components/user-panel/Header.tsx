
import React, { useState } from 'react';
import { Bell, Search, Menu, User, Clock, MegaphoneIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toPersianDigits } from '@/lib/numberUtils';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

interface HeaderProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onToggleMobileSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onNavigate,
  onToggleMobileSidebar
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const sessionTimeLeft = "۶۰:۰۰";
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };
  
  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'dashboard': 'داشبورد',
      'cart': 'سبد خرید',
      'checkout': 'پرداخت نهایی',
      'recommendations': 'پیشنهادات ویژه',
      'services': 'سرویس‌ها',
      'tickets': 'تیکت‌ها',
      'billing': 'امور مالی',
      'downloads': 'دانلودها',
      'profile': 'تنظیمات حساب',
      'notifications': 'اعلان‌ها',
      'announcements': 'اطلاعیه‌های مهم',
      'knowledge': 'مرکز دانش',
      'security': 'مرکز امنیت',
      'affiliate': 'معرفی و کسب درآمد',
    };
    return titles[activeTab || 'dashboard'] || 'داشبورد';
  };
  
  const handleNavigate = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };
  
  const handleViewAllNotifications = () => {
    handleNavigate('notifications');
  };
  
  const handleViewImportantAnnouncements = () => {
    handleNavigate('announcements');
  };
  
  return (
    <header className="bg-white border-b px-4 py-3 flex justify-between items-center sticky top-0 z-10">
      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" title="منو" onClick={onToggleMobileSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
            >
              <MegaphoneIcon className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                ۲
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>اطلاعیه‌های مهم</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <span className="font-medium">به‌روزرسانی سرورهای ابری</span>
                <span className="text-sm text-gray-500 mt-1">سرورهای ابری در تاریخ ۱۵ شهریور بروزرسانی خواهند شد.</span>
                <span className="text-xs text-gray-400 mt-2">۱ روز پیش</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <span className="font-medium">اختلال موقت سرویس DNS</span>
                <span className="text-sm text-gray-500 mt-1">سرویس DNS ممکن است با اختلال موقت مواجه شود.</span>
                <span className="text-xs text-gray-400 mt-2">۳ روز پیش</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-blue-600 justify-center" onClick={handleViewImportantAnnouncements}>
              مشاهده همه اطلاعیه‌ها
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                ۳
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
            <DropdownMenuItem onClick={() => handleNavigate('profile')}>
              <User className="ml-2 h-4 w-4" />
              <span>پروفایل کاربری</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate('tickets')}>پشتیبانی</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              <LogOut className="ml-2 h-4 w-4" />
              خروج از حساب
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

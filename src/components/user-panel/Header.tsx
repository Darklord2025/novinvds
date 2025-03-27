
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HeaderProps {
  activeTab: string;
  sidebarItems: { id: string; label: string }[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({ activeTab, sidebarItems, searchQuery, setSearchQuery }: HeaderProps) => {
  const activeTabLabel = sidebarItems.find(item => item.id === activeTab)?.label || '';

  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">{activeTabLabel}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="w-64 pl-10"
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>حساب کاربری</DropdownMenuLabel>
            <DropdownMenuItem>پروفایل</DropdownMenuItem>
            <DropdownMenuItem>تنظیمات</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">خروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

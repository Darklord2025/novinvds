
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Server } from 'lucide-react';

type HeaderProps = {
  activeTab: string;
  sidebarItems: { id: string; label: string }[];
};

const Header = ({ activeTab, sidebarItems }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-xl font-semibold">
            {sidebarItems.find(item => item.id === activeTab)?.label}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>خدمات</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-indigo-600 p-6 no-underline outline-none focus:shadow-md"
                          href="/vps"
                        >
                          <Server className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            سرورهای مجازی
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            سرورهای مجازی قدرتمند با بهترین کیفیت و پشتیبانی ۲۴/۷
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link to="/dedicated" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600">
                        <div className="text-sm font-medium leading-none">سرور اختصاصی</div>
                        <p className="line-clamp-2 text-xs leading-snug text-gray-500">
                          سرورهای فیزیکی اختصاصی با کنترل کامل
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/hosting" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600">
                        <div className="text-sm font-medium leading-none">هاستینگ</div>
                        <p className="line-clamp-2 text-xs leading-snug text-gray-500">
                          هاستینگ‌های پرقدرت با کنترل پنل‌های متنوع
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/domain" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600">
                        <div className="text-sm font-medium leading-none">دامنه</div>
                        <p className="line-clamp-2 text-xs leading-snug text-gray-500">
                          ثبت و انتقال انواع دامنه‌ها با قیمت استثنایی
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
                      
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger className="p-2 rounded-full relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </MenubarTrigger>
              <MenubarContent align="end">
                <div className="p-2 text-sm text-gray-500 border-b">
                  اعلان‌های شما
                </div>
                <MenubarItem className="p-2 cursor-pointer">
                  <div className="flex flex-col">
                    <div className="font-medium text-xs">فاکتور جدید</div>
                    <div className="text-xs text-gray-500">فاکتور شماره #12345 صادر شد</div>
                    <div className="text-[10px] text-gray-400 mt-1">۱۰ دقیقه پیش</div>
                  </div>
                </MenubarItem>
                <MenubarItem className="p-2 cursor-pointer">
                  <div className="flex flex-col">
                    <div className="font-medium text-xs">پاسخ به تیکت</div>
                    <div className="text-xs text-gray-500">تیکت شماره #54321 پاسخ داده شد</div>
                    <div className="text-[10px] text-gray-400 mt-1">۳۰ دقیقه پیش</div>
                  </div>
                </MenubarItem>
                <MenubarItem className="p-2 cursor-pointer">
                  <div className="flex flex-col">
                    <div className="font-medium text-xs">اتمام اعتبار</div>
                    <div className="text-xs text-gray-500">سرور شما تا ۳ روز دیگر منقضی می‌شود</div>
                    <div className="text-[10px] text-gray-400 mt-1">۲ ساعت پیش</div>
                  </div>
                </MenubarItem>
                <MenubarItem className="text-xs text-blue-600 p-2 cursor-pointer text-center">
                  مشاهده همه اعلان‌ها
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                ک
              </div>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left">
              <div className="p-3 border-b">
                <div className="font-medium">کاربر نمونه</div>
                <div className="text-xs text-gray-500">user@example.com</div>
              </div>
              <ul className="py-2">
                <li>
                  <Link to="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    پروفایل
                  </Link>
                </li>
                <li>
                  <Link to="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    تنظیمات
                  </Link>
                </li>
                <li>
                  <button className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    خروج
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

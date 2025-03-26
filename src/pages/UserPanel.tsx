
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
  Bell, 
  LogOut, 
  LayoutDashboard, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
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

const UserPanel = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard size={20} /> },
    { id: 'servers', label: 'سرورهای مجازی', icon: <Server size={20} /> },
    { id: 'dedicated', label: 'سرورهای اختصاصی', icon: <HardDrive size={20} /> },
    { id: 'domains', label: 'دامنه‌ها', icon: <Globe size={20} /> },
    { id: 'invoices', label: 'فاکتورها', icon: <FileText size={20} /> },
    { id: 'transactions', label: 'تراکنش‌ها', icon: <CreditCard size={20} /> },
    { id: 'tickets', label: 'تیکت‌ها', icon: <MessageSquare size={20} /> },
    { id: 'profile', label: 'پروفایل', icon: <User size={20} /> },
    { id: 'settings', label: 'تنظیمات', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-md transition-all duration-300 h-screen sticky top-0 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className={`flex items-center ${sidebarCollapsed ? 'mr-8' : ''}`}>
              {!sidebarCollapsed && (
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  NovinVDS
                </span>
              )}
            </Link>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
                    {!sidebarCollapsed && (
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
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut size={20} />
              {!sidebarCollapsed && <span className="mr-3 font-medium">خروج</span>}
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
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
        
        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">سرورهای فعال</p>
                      <h3 className="text-2xl font-bold mt-1">3</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      <Server size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-green-500 flex items-center">
                      <Check size={16} className="mr-1" /> همه فعال
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">دامنه‌های ثبت شده</p>
                      <h3 className="text-2xl font-bold mt-1">5</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Globe size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-yellow-500">
                      1 دامنه در حال انتقال
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">فاکتورهای پرداخت نشده</p>
                      <h3 className="text-2xl font-bold mt-1">2</h3>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                      <FileText size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-red-500">
                      نیاز به پرداخت: 1,250,000 تومان
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">تیکت‌های باز</p>
                      <h3 className="text-2xl font-bold mt-1">1</h3>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                      <MessageSquare size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-indigo-500">
                      آخرین پاسخ: دیروز
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="font-semibold">سرورهای اخیر</h3>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام سرور</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">IP</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">پلن</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاریخ انقضا</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">سرور آلمان 1</td>
                            <td className="px-4 py-3 text-sm text-gray-500">37.27.10.156</td>
                            <td className="px-4 py-3 text-sm text-gray-500">VPS-4G</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                فعال
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">1402/12/25</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">سرور هلند 1</td>
                            <td className="px-4 py-3 text-sm text-gray-500">217.65.43.12</td>
                            <td className="px-4 py-3 text-sm text-gray-500">VPS-8G</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                فعال
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">1403/02/15</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">سرور آمریکا 1</td>
                            <td className="px-4 py-3 text-sm text-gray-500">144.126.59.87</td>
                            <td className="px-4 py-3 text-sm text-gray-500">VPS-2G</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                فعال
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">1403/01/05</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="font-semibold">فعالیت‌های اخیر</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-100 rounded-full mr-4">
                          <CreditCard size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">پرداخت فاکتور</p>
                          <p className="text-xs text-gray-500">فاکتور شماره #12348 با موفقیت پرداخت شد.</p>
                          <p className="text-xs text-gray-400 mt-1">امروز - 10:25</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 bg-green-100 rounded-full mr-4">
                          <Server size={16} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">راه‌اندازی سرور</p>
                          <p className="text-xs text-gray-500">سرور آلمان 1 با موفقیت راه‌اندازی شد.</p>
                          <p className="text-xs text-gray-400 mt-1">دیروز - 18:30</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 bg-indigo-100 rounded-full mr-4">
                          <MessageSquare size={16} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">تیکت جدید</p>
                          <p className="text-xs text-gray-500">تیکت #54321 با موضوع "درخواست ارتقا سرور" ایجاد شد.</p>
                          <p className="text-xs text-gray-400 mt-1">دیروز - 14:15</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 bg-yellow-100 rounded-full mr-4">
                          <Globe size={16} className="text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">ثبت دامنه</p>
                          <p className="text-xs text-gray-500">دامنه example.com با موفقیت ثبت شد.</p>
                          <p className="text-xs text-gray-400 mt-1">1402/12/20 - 09:45</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="text-lg font-medium mb-2">
                در حال توسعه...
              </div>
              <p className="text-gray-500">
                این بخش در حال توسعه است و به زودی در دسترس قرار خواهد گرفت.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserPanel;

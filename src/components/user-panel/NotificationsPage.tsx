
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Server, 
  Shield, 
  CreditCard, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Info, 
  X,
  ChevronLeft,
  LucideIcon
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'system' | 'payment' | 'security' | 'service';
  icon: LucideIcon;
  priority: 'high' | 'medium' | 'low';
}

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Sample notifications data
  const notifications: Notification[] = [
    {
      id: 'notif-1',
      title: 'سرور مجازی شما به‌روزرسانی شد',
      message: 'سرور مجازی vps-123 با موفقیت به‌روزرسانی شد. تغییرات شامل به‌روزرسانی کرنل و بسته‌های امنیتی می‌باشد. در صورت بروز هرگونه مشکل، با پشتیبانی تماس بگیرید.\n\nتغییرات انجام شده:\n- به‌روزرسانی کرنل به نسخه 5.15\n- به‌روزرسانی بسته‌های امنیتی\n- بهبود عملکرد سیستم\n\nبرای اطلاعات بیشتر به پنل مدیریت سرور مراجعه کنید.',
      date: '2024-02-28 14:30',
      read: false,
      type: 'service',
      icon: Server,
      priority: 'medium'
    },
    {
      id: 'notif-2',
      title: 'فاکتور جدید صادر شد',
      message: 'فاکتور جدید با شماره INV-1235 برای تمدید سرویس هاستینگ شما صادر شده است. لطفاً در اسرع وقت نسبت به پرداخت آن اقدام فرمایید تا سرویس شما بدون وقفه ادامه یابد.\n\nجزئیات فاکتور:\n- شماره فاکتور: INV-1235\n- تاریخ صدور: 2024-02-28\n- مبلغ: 1,250,000 تومان\n- مهلت پرداخت: 2024-03-05\n\nبرای پرداخت فاکتور به بخش فاکتورهای پنل کاربری مراجعه کنید.',
      date: '2024-02-28 10:15',
      read: true,
      type: 'payment',
      icon: CreditCard,
      priority: 'high'
    },
    {
      id: 'notif-3',
      title: 'هشدار امنیتی: تلاش برای ورود ناموفق',
      message: 'تلاش ناموفق برای ورود به پنل کاربری شما از IP نامعتبر ثبت شده است. لطفاً در صورتی که این تلاش توسط شما نبوده، رمز عبور خود را تغییر دهید و احراز هویت دو مرحله‌ای را فعال کنید.\n\nجزئیات تلاش ورود:\n- تاریخ و زمان: 2024-02-27 23:45\n- آدرس IP: 185.124.56.78\n- موقعیت تقریبی: روسیه، مسکو\n- تعداد تلاش: 3 بار\n\nبرای تغییر رمز عبور و فعال‌سازی احراز هویت دو مرحله‌ای به بخش تنظیمات امنیتی حساب کاربری مراجعه کنید.',
      date: '2024-02-27 23:50',
      read: false,
      type: 'security',
      icon: Shield,
      priority: 'high'
    },
    {
      id: 'notif-4',
      title: 'به‌روزرسانی قوانین و مقررات',
      message: 'قوانین و مقررات استفاده از خدمات نوین وی دی اس به‌روزرسانی شده است. لطفاً نسخه جدید را مطالعه فرمایید. تغییرات شامل بندهای جدید در خصوص نحوه استفاده از سرویس‌ها و شرایط بازپرداخت می‌باشد.\n\nتغییرات مهم:\n- به‌روزرسانی شرایط استفاده از سرویس‌های ابری\n- تغییر در سیاست‌های بازپرداخت\n- اضافه شدن بندهای مربوط به مالکیت معنوی\n- تغییر در شرایط پشتیبانی 24/7\n\nبرای مطالعه نسخه کامل قوانین جدید، به بخش قوانین و مقررات در سایت مراجعه کنید.',
      date: '2024-02-25 09:30',
      read: true,
      type: 'system',
      icon: Info,
      priority: 'medium'
    },
    {
      id: 'notif-5',
      title: 'برنامه نگهداری سرورها',
      message: 'به اطلاع می‌رساند در تاریخ 5 اسفند 1402 از ساعت 2 تا 5 بامداد، عملیات نگهداری دوره‌ای بر روی سرورهای دیتاسنتر آلمان انجام خواهد شد. در این بازه زمانی، ممکن است سرویس‌های شما با اختلال موقت مواجه شوند.\n\nجزئیات نگهداری:\n- تاریخ: 5 اسفند 1402\n- زمان: 2 تا 5 بامداد به وقت ایران\n- دیتاسنتر: فرانکفورت، آلمان\n- سرویس‌های تحت تأثیر: سرورهای مجازی و اختصاصی در این دیتاسنتر\n\nاز صبر و شکیبایی شما سپاسگزاریم.',
      date: '2024-02-20 11:00',
      read: false,
      type: 'system',
      icon: Clock,
      priority: 'medium'
    },
    {
      id: 'notif-6',
      title: 'خطای پرداخت فاکتور',
      message: 'متأسفانه پرداخت فاکتور شماره INV-1232 با خطا مواجه شده است. لطفاً مجدداً تلاش کنید یا از روش‌های پرداخت دیگر استفاده نمایید.\n\nخطای دریافت شده: "تراکنش توسط بانک صادرکننده کارت لغو شده است."\n\nدر صورت ادامه مشکل، با بخش مالی تماس بگیرید.',
      date: '2024-02-15 16:20',
      read: true,
      type: 'payment',
      icon: AlertTriangle,
      priority: 'high'
    },
    {
      id: 'notif-7',
      title: 'دامنه شما با موفقیت تمدید شد',
      message: 'دامنه example.com با موفقیت برای مدت 1 سال تمدید شد. تاریخ انقضای جدید: 15 فوردین 1404\n\nبا تشکر از اعتماد شما به نوین وی دی اس.',
      date: '2024-02-10 09:45',
      read: true,
      type: 'service',
      icon: CheckCircle2,
      priority: 'low'
    }
  ];

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    if (activeTab === 'all') {
      return notifications;
    }
    return notifications.filter(notif => notif.type === activeTab);
  };

  // Get count of unread notifications for each type
  const getUnreadCount = (type: string) => {
    if (type === 'all') {
      return notifications.filter(notif => !notif.read).length;
    }
    return notifications.filter(notif => notif.type === type && !notif.read).length;
  };

  // Get priority badge style
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle notification click to view details
  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    // Mark as read
    notifications.map(notif => {
      if (notif.id === notification.id) {
        notif.read = true;
      }
      return notif;
    });
  };

  // Handle close detail view
  const handleCloseDetail = () => {
    setSelectedNotification(null);
  };

  // Render the notification list view
  const renderNotificationList = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">اعلان‌ها</h1>
        <Button variant="outline" size="sm">
          علامت‌گذاری همه به‌عنوان خوانده‌شده
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="relative">
            همه
            {getUnreadCount('all') > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getUnreadCount('all')}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="system" className="relative">
            سیستم
            {getUnreadCount('system') > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getUnreadCount('system')}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="payment" className="relative">
            پرداخت
            {getUnreadCount('payment') > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getUnreadCount('payment')}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="security" className="relative">
            امنیتی
            {getUnreadCount('security') > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getUnreadCount('security')}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="service" className="relative">
            سرویس‌ها
            {getUnreadCount('service') > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getUnreadCount('service')}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {getFilteredNotifications().length > 0 ? (
              getFilteredNotifications().map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${!notification.read ? 'border-r-4 border-r-blue-500' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-4 ${!notification.read ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        <notification.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority === 'high' ? 'ضروری' : 
                             notification.priority === 'medium' ? 'متوسط' : 'عادی'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-400">{notification.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">اعلانی یافت نشد</h3>
                <p className="mt-1 text-sm text-gray-500">هیچ اعلانی در این دسته وجود ندارد.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  // Render the notification detail view
  const renderNotificationDetail = () => {
    if (!selectedNotification) return null;
    
    return (
      <div>
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleCloseDetail} className="ml-2">
            <ChevronLeft size={18} />
            <span>بازگشت</span>
          </Button>
          <h1 className="text-xl font-bold flex-1">{selectedNotification.title}</h1>
          <Button variant="ghost" size="icon" onClick={handleCloseDetail}>
            <X size={18} />
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  selectedNotification.type === 'security' ? 'bg-red-100 text-red-600' :
                  selectedNotification.type === 'payment' ? 'bg-green-100 text-green-600' :
                  selectedNotification.type === 'service' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <selectedNotification.icon size={20} />
                </div>
                <CardTitle className="text-lg">{selectedNotification.title}</CardTitle>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(selectedNotification.priority)}`}>
                {selectedNotification.priority === 'high' ? 'ضروری' : 
                  selectedNotification.priority === 'medium' ? 'متوسط' : 'عادی'}
              </span>
            </div>
            <CardDescription className="text-xs mt-1">
              تاریخ: {selectedNotification.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 whitespace-pre-line">
              {selectedNotification.message}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleCloseDetail}>
                بستن
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div>
      {selectedNotification ? renderNotificationDetail() : renderNotificationList()}
    </div>
  );
};

export default NotificationsPage;

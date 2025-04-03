
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Info, AlertCircle, Bell, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import NotificationDetails from './NotificationDetails';

// Mock data for notifications
const mockNotifications = [
  {
    id: '1',
    title: 'سرویس جدید فعال شد',
    message: 'سرویس سرور مجازی Ubuntu شما با موفقیت فعال شد و هم‌اکنون قابل استفاده است.',
    type: 'success' as const,
    date: new Date(2024, 2, 15, 10, 30),
    isRead: true
  },
  {
    id: '2',
    title: 'یادآوری تمدید سرویس',
    message: 'سرویس هاستینگ شما تا 7 روز دیگر منقضی می‌شود. لطفاً نسبت به تمدید آن اقدام کنید.',
    type: 'warning' as const,
    date: new Date(2024, 2, 20, 14, 45),
    isRead: false
  },
  {
    id: '3',
    title: 'صدور فاکتور جدید',
    message: 'فاکتور جدیدی برای شما صادر شده است. لطفاً نسبت به پرداخت آن اقدام کنید.',
    type: 'info' as const,
    date: new Date(2024, 2, 25, 9, 15),
    isRead: false
  },
  {
    id: '4',
    title: 'قطعی موقت سرویس',
    message: 'به دلیل بروزرسانی سرورها، سرویس شما به مدت 30 دقیقه با اختلال مواجه خواهد بود.',
    type: 'error' as const,
    date: new Date(2024, 3, 1, 3, 0),
    isRead: true
  },
  {
    id: '5',
    title: 'بروزرسانی کنترل پنل',
    message: 'کنترل پنل هاستینگ شما به آخرین نسخه بروزرسانی شد.',
    type: 'info' as const,
    date: new Date(2024, 3, 5, 11, 20),
    isRead: false
  },
  {
    id: '6',
    title: 'ارتقای ترافیک سرور',
    message: 'به مناسبت عید نوروز، ترافیک سرور شما به مدت یک ماه 50% افزایش یافت.',
    type: 'success' as const,
    date: new Date(2024, 3, 10, 16, 0),
    isRead: false
  },
  {
    id: '7',
    title: 'اطلاعیه امنیتی',
    message: 'لطفاً در اسرع وقت رمز عبور پنل کاربری خود را تغییر دهید.',
    type: 'warning' as const,
    date: new Date(2024, 3, 12, 8, 30),
    isRead: true
  },
  {
    id: '8',
    title: 'تیکت پشتیبانی پاسخ داده شد',
    message: 'تیکت شماره 254789 شما توسط کارشناسان پشتیبانی پاسخ داده شد.',
    type: 'success' as const,
    date: new Date(2024, 3, 15, 13, 45),
    isRead: false
  }
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState<typeof mockNotifications[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    return notification.type === activeTab;
  });

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    toast({
      title: "همه اعلان‌ها خوانده شد",
      description: "تمام اعلان‌های شما به عنوان خوانده شده علامت‌گذاری شدند.",
    });
  };

  // Mark a single notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
    toast({
      title: "اعلان خوانده شد",
      description: "اعلان مورد نظر به عنوان خوانده شده علامت‌گذاری شد.",
    });
  };

  // View notification details
  const handleViewDetails = (notification: typeof mockNotifications[0]) => {
    setSelectedNotification(notification);
    setDetailsOpen(true);
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" />;
      case 'error':
        return <AlertCircle className="text-red-500" />;
      case 'info':
      default:
        return <Info className="text-blue-500" />;
    }
  };

  // Get background color based on notification type
  const getNotificationBg = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-gray-50';
    
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-amber-50';
      case 'error':
        return 'bg-red-50';
      case 'info':
      default:
        return 'bg-blue-50';
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">اعلان‌های سیستم</h1>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="ml-1 h-4 w-4" />
              علامت‌گذاری همه به‌عنوان خوانده‌شده
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>اعلان‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                همه
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="mr-2">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">خوانده نشده</TabsTrigger>
              <TabsTrigger value="success">موفقیت</TabsTrigger>
              <TabsTrigger value="warning">هشدار</TabsTrigger>
              <TabsTrigger value="info">اطلاعات</TabsTrigger>
              <TabsTrigger value="error">خطا</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredNotifications.length === 0 ? (
                <div className="text-center p-8">
                  <Bell className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">اعلانی وجود ندارد</h3>
                  <p className="mt-1 text-sm text-gray-500">در حال حاضر اعلانی در این بخش وجود ندارد.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`${getNotificationBg(notification.type, notification.isRead)} p-4 rounded-lg cursor-pointer transition hover:shadow-md`}
                      onClick={() => handleViewDetails(notification)}
                    >
                      <div className="flex items-start">
                        <div className="ml-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium">{notification.title}</h3>
                            <span className="text-xs text-gray-500">
                              {format(notification.date, 'yyyy/MM/dd')}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="mr-2">
                            <span className="block h-2 w-2 rounded-full bg-blue-600"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <NotificationDetails 
        notification={selectedNotification}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default NotificationsPage;

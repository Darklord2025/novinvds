
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Info, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

// Define notification types
type NotificationType = 'info' | 'warning' | 'success' | 'error';

interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  type: NotificationType;
  read: boolean;
}

const NotificationsPage = () => {
  // Sample notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'سرویس شما نیاز به تمدید دارد',
      content: 'سرور مجازی شما با شناسه VPS-124578 تا ۱۰ روز دیگر منقضی می‌شود. لطفا نسبت به تمدید آن اقدام کنید.',
      date: '۱۴۰۲/۱۱/۱۵',
      type: 'warning',
      read: false
    },
    {
      id: 2,
      title: 'پرداخت موفق',
      content: 'پرداخت شما به مبلغ ۱,۲۰۰,۰۰۰ تومان با موفقیت انجام شد. فاکتور خرید به ایمیل شما ارسال شده است.',
      date: '۱۴۰۲/۱۱/۱۴',
      type: 'success',
      read: true
    },
    {
      id: 3,
      title: 'تیکت پشتیبانی پاسخ داده شد',
      content: 'تیکت شماره #12458 با موضوع "مشکل در اتصال به سرور" توسط کارشناسان پشتیبانی پاسخ داده شد.',
      date: '۱۴۰۲/۱۱/۱۰',
      type: 'info',
      read: false
    },
    {
      id: 4,
      title: 'هشدار استفاده از منابع',
      content: 'سرور شما بیش از ۹۰٪ از منابع CPU را در ۲۴ ساعت گذشته استفاده کرده است. لطفا این موضوع را بررسی کنید.',
      date: '۱۴۰۲/۱۱/۰۵',
      type: 'error',
      read: false
    },
    {
      id: 5,
      title: 'ارتقاء سرویس',
      content: 'ارتقاء سرویس هاستینگ شما با موفقیت انجام شد. منابع جدید از هم‌اکنون در دسترس هستند.',
      date: '۱۴۰۲/۱۱/۰۱',
      type: 'success',
      read: true
    },
    {
      id: 6,
      title: 'به‌روزرسانی نرم‌افزاری',
      content: 'یک به‌روزرسانی امنیتی مهم برای سرور شما موجود است. توصیه می‌کنیم در اسرع وقت سرور خود را به‌روزرسانی کنید.',
      date: '۱۴۰۲/۱۰/۲۵',
      type: 'warning',
      read: true
    },
    {
      id: 7,
      title: 'تخفیف ویژه',
      content: 'به مناسبت عید نوروز، ۳۰٪ تخفیف برای تمامی سرویس‌های میزبانی وب اعمال شده است. از کد تخفیف NOWRUZ1403 استفاده کنید.',
      date: '۱۴۰۲/۱۰/۲۰',
      type: 'info',
      read: true
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <Info size={18} className="text-blue-500" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-yellow-500" />;
      case 'success':
        return <Check size={18} className="text-green-500" />;
      case 'error':
        return <X size={18} className="text-red-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
    setIsDialogOpen(true);
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">اعلان‌ها</h1>
          <p className="text-gray-500">مدیریت اعلان‌های سیستم</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              خواندن همه
            </Button>
          )}
          <Badge variant="secondary">{unreadCount} اعلان خوانده نشده</Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {notifications.map(notification => (
          <Card 
            key={notification.id} 
            className={`cursor-pointer transition-colors hover:bg-gray-50 ${!notification.read ? 'border-r-4 border-blue-500' : ''}`}
            onClick={() => handleNotificationClick(notification)}
          >
            <CardContent className="p-4 flex items-start">
              <div className="flex-shrink-0 ml-4 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className={`font-semibold ${!notification.read ? 'text-blue-600' : ''}`}>{notification.title}</h3>
                  <span className="text-sm text-gray-500">{notification.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <Bell className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-500">هیچ اعلانی وجود ندارد</h3>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedNotification && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {getNotificationIcon(selectedNotification.type)}
                <span className="mr-2">{selectedNotification.title}</span>
              </DialogTitle>
              <DialogDescription className="text-left text-gray-500">
                {selectedNotification.date}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-gray-700">{selectedNotification.content}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <DialogClose asChild>
                <Button variant="outline">بستن</Button>
              </DialogClose>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default NotificationsPage;

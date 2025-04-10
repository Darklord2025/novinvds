
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Mail, Search, Trash2, Bell, AlertCircle, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
  important: boolean;
}

interface NotificationsPageProps {
  onViewNotification: (notification: Notification) => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onViewNotification }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);
  const [markAllReadDialogOpen, setMarkAllReadDialogOpen] = useState<boolean>(false);

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'به‌روزرسانی سرورها',
      content: 'سرورهای ابری در تاریخ 15 شهریور بروزرسانی خواهند شد. لطفاً برای جلوگیری از اختلال در سرویس، تمهیدات لازم را در نظر بگیرید. این به‌روزرسانی شامل ارتقای سیستم عامل و به‌روزرسانی‌های امنیتی است. زمان تقریبی اختلال: 2 ساعت.',
      date: '1402/06/01',
      type: 'info',
      read: false,
      important: true
    },
    {
      id: '2',
      title: 'افزایش ظرفیت دیتاسنتر',
      content: 'به اطلاع می‌رساند ظرفیت جدید سرورهای اختصاصی در دیتاسنتر اضافه شده است. برای سفارش سرورهای جدید با پشتیبانی تماس بگیرید یا از طریق پنل کاربری اقدام نمایید.',
      date: '1402/05/20',
      type: 'info',
      read: true,
      important: true
    },
    {
      id: '3',
      title: 'سرویس شما نیاز به تمدید دارد',
      content: 'سرویس هاستینگ شما با شناسه HOSTxxxx تا 10 روز دیگر منقضی خواهد شد. لطفاً نسبت به تمدید آن اقدام نمایید تا در سرویس‌دهی شما اختلالی ایجاد نشود.',
      date: '1402/06/10',
      type: 'alert',
      read: false,
      important: false
    },
    {
      id: '4',
      title: 'فاکتور جدید صادر شد',
      content: 'فاکتور جدیدی برای سرویس سرور مجازی شما صادر شده است. لطفاً نسبت به پرداخت آن اقدام نمایید.',
      date: '1402/06/12',
      type: 'info',
      read: false,
      important: false
    },
    {
      id: '5',
      title: 'تیکت شما پاسخ داده شد',
      content: 'تیکت شماره TICKxxxx توسط کارشناسان پشتیبانی پاسخ داده شد. برای مشاهده پاسخ به بخش تیکت‌ها مراجعه نمایید.',
      date: '1402/06/15',
      type: 'success',
      read: true,
      important: false
    },
    {
      id: '6',
      title: 'اختلال موقت در سرویس DNS',
      content: 'به اطلاع می‌رساند به دلیل عملیات به‌روزرسانی، سرویس DNS ممکن است با اختلال موقت مواجه شود. این اختلال از ساعت 2 تا 4 بامداد فردا خواهد بود.',
      date: '1402/06/18',
      type: 'alert',
      read: false,
      important: true
    },
    {
      id: '7',
      title: 'ارتقاء سطح امنیتی',
      content: 'سطح امنیتی تمامی سرورها و خدمات ارتقاء یافته است. توصیه می‌شود رمزهای عبور خود را تغییر دهید و از احراز هویت دو مرحله‌ای استفاده نمایید.',
      date: '1402/06/05',
      type: 'info',
      read: true,
      important: false
    }
  ]);

  // Filter notifications based on search query and active tab
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           notification.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && !notification.read;
    if (activeTab === 'important') return matchesSearch && notification.important;
    
    return matchesSearch;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    toast({
      title: "اعلان خوانده شد",
      description: "این اعلان به عنوان خوانده شده علامت‌گذاری شد.",
    });
  };
  
  const handleMarkAsUnread = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: false } : notification
    ));
    
    toast({
      title: "اعلان خوانده نشده",
      description: "این اعلان به عنوان خوانده نشده علامت‌گذاری شد.",
    });
  };
  
  const handleMarkAllAsRead = () => {
    setMarkAllReadDialogOpen(true);
  };
  
  const confirmMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setMarkAllReadDialogOpen(false);
    
    toast({
      title: "تمام اعلان‌ها خوانده شدند",
      description: "تمام اعلان‌ها به عنوان خوانده شده علامت‌گذاری شدند.",
      action: (
        <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
          تأیید
        </Button>
      )
    });
  };

  const handleDeleteNotification = (id: string) => {
    setNotificationToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteNotification = () => {
    if (notificationToDelete) {
      setNotifications(notifications.filter(notification => notification.id !== notificationToDelete));
      setDeleteDialogOpen(false);
      
      toast({
        title: "اعلان حذف شد",
        description: "اعلان مورد نظر با موفقیت حذف شد.",
      });
    }
  };

  const getNotificationIcon = (type: string, read: boolean) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className={`h-5 w-5 ${read ? 'text-gray-400' : 'text-red-500'}`} />;
      case 'success':
        return <Check className={`h-5 w-5 ${read ? 'text-gray-400' : 'text-green-500'}`} />;
      case 'info':
      default:
        return <Info className={`h-5 w-5 ${read ? 'text-gray-400' : 'text-blue-500'}`} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">اعلان‌ها</h1>
          <p className="text-gray-500">مدیریت و مشاهده اعلان‌های سیستم</p>
        </div>
        
        <div className="flex gap-2 self-stretch md:self-auto">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">همه: {notifications.length}</Badge>
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">خوانده نشده: {notifications.filter(n => !n.read).length}</Badge>
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">مهم: {notifications.filter(n => n.important).length}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>مدیریت اعلان‌ها</CardTitle>
              <CardDescription>لیست تمام اعلان‌های سیستم</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="جستجو در اعلان‌ها..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              <Button variant="outline" onClick={handleMarkAllAsRead} className="whitespace-nowrap">
                <Mail className="ml-2 h-4 w-4" />
                علامت همه به عنوان خوانده شده
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">همه اعلان‌ها</TabsTrigger>
              <TabsTrigger value="unread">خوانده نشده</TabsTrigger>
              <TabsTrigger value="important">اعلان‌های مهم</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div>
                          {getNotificationIcon(notification.type, notification.read)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                              {notification.title}
                              {notification.important && (
                                <span className="mr-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">مهم</span>
                              )}
                            </h3>
                            <span className="text-xs text-gray-500">{notification.date}</span>
                          </div>
                          <p className={`text-sm line-clamp-2 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                            {notification.content}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewNotification(notification)}
                            >
                              مشاهده جزئیات
                            </Button>
                            
                            {notification.read ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsUnread(notification.id)}
                              >
                                علامت به عنوان خوانده نشده
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="ml-1 h-4 w-4" />
                                علامت به عنوان خوانده شده
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              onClick={() => handleDeleteNotification(notification.id)}
                            >
                              <Trash2 className="ml-1 h-4 w-4" />
                              حذف
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 mx-auto text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">اعلانی یافت نشد</h3>
                    <p className="mt-2 text-gray-500">
                      {searchQuery ? "جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت جستجو را تغییر دهید." : "در حال حاضر اعلانی وجود ندارد."}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Delete Notification Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف اعلان</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از حذف این اعلان اطمینان دارید؟ این عمل قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteNotification}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="ml-2 h-4 w-4" />
              تأیید حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Mark All as Read Dialog */}
      <AlertDialog open={markAllReadDialogOpen} onOpenChange={setMarkAllReadDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>علامت‌گذاری همه اعلان‌ها</AlertDialogTitle>
            <AlertDialogDescription>
              آیا مطمئن هستید که می‌خواهید همه اعلان‌ها را به عنوان خوانده شده علامت‌گذاری کنید؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMarkAllAsRead}>
              <Check className="ml-2 h-4 w-4" />
              تأیید علامت‌گذاری
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NotificationsPage;

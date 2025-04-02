
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, MegaphoneIcon, Trash2, CalendarIcon, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'critical' | 'maintenance' | 'update' | 'promotion';
  read: boolean;
  expiryDate?: string;
}

const ImportantAnnouncementsPage = () => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'بروزرسانی سرورهای هاستینگ',
      message: 'در تاریخ 25 خرداد 1402 از ساعت 2 تا 5 صبح، سرورهای هاستینگ برای بروزرسانی نرم‌افزاری موقتاً در دسترس نخواهند بود. لطفاً برنامه‌ریزی لازم را انجام دهید.',
      date: '1402/03/20',
      type: 'maintenance',
      read: false,
      expiryDate: '1402/03/25'
    },
    {
      id: '2',
      title: 'اطلاعیه قطعی اینترنت',
      message: 'به دلیل مشکلات فنی در مرکز داده، ممکن است سرویس‌های شما در تاریخ 22 خرداد با اختلال مواجه شوند. تیم فنی ما در تلاش برای به حداقل رساندن این اختلال است.',
      date: '1402/03/18',
      type: 'critical',
      read: false,
      expiryDate: '1402/03/22'
    },
    {
      id: '3',
      title: 'تخفیف ویژه عید فطر',
      message: 'به مناسبت عید سعید فطر، 30% تخفیف ویژه برای تمامی سرویس‌های هاستینگ و سرور مجازی تا تاریخ 1 تیر 1402 در نظر گرفته شده است.',
      date: '1402/03/15',
      type: 'promotion',
      read: true,
      expiryDate: '1402/04/01'
    },
    {
      id: '4',
      title: 'بروزرسانی امنیتی دامنه‌ها',
      message: 'بروزرسانی مهم امنیتی برای سیستم مدیریت دامنه‌ها اعمال شده است. لطفاً نسبت به تغییر رمز عبور پنل مدیریت دامنه‌های خود اقدام فرمایید.',
      date: '1402/03/10',
      type: 'update',
      read: true
    },
    {
      id: '5',
      title: 'سرویس جدید امنیت ابری',
      message: 'سرویس جدید امنیت ابری نوین وی‌دی‌اس با قابلیت محافظت در برابر حملات DDoS و امنیت لایه اپلیکیشن راه‌اندازی شد. برای اطلاعات بیشتر با پشتیبانی تماس بگیرید.',
      date: '1402/03/05',
      type: 'update',
      read: true
    }
  ]);
  
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  
  const markAllAsRead = () => {
    setAnnouncements(announcements.map(announcement => ({
      ...announcement,
      read: true
    })));
    
    toast({
      title: "خوانده شدن اطلاعیه‌ها",
      description: "تمام اطلاعیه‌های مهم به عنوان خوانده شده علامت‌گذاری شدند.",
    });
  };
  
  const clearReadAnnouncements = () => {
    setAnnouncements(announcements.filter(announcement => !announcement.read));
    toast({
      title: "پاکسازی اطلاعیه‌ها",
      description: "تمام اطلاعیه‌های خوانده شده با موفقیت حذف شدند.",
    });
  };
  
  const markAsRead = (id: string) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, read: true } : announcement
    ));
  };
  
  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    setSelectedAnnouncement(null);
    
    toast({
      title: "حذف اطلاعیه",
      description: "اطلاعیه با موفقیت حذف شد.",
    });
  };
  
  const getAnnouncementIcon = (type: string) => {
    switch(type) {
      case 'maintenance': return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case 'critical': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'update': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'promotion': default: return <MegaphoneIcon className="h-5 w-5 text-green-500" />;
    }
  };
  
  const getAnnouncementTypeBadge = (type: string) => {
    switch(type) {
      case 'maintenance': 
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-300">تعمیرات</Badge>;
      case 'critical': 
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-300">بحرانی</Badge>;
      case 'update': 
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300">بروزرسانی</Badge>;
      case 'promotion': 
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-300">تخفیف</Badge>;
      default: 
        return null;
    }
  };
  
  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    
    const today = new Date();
    const expiry = new Date(expiryDate.split('/').reverse().join('/'));
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 && diffDays <= 3;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">اطلاعیه‌های مهم</h1>
        <div className="space-x-2 space-x-reverse">
          <Button variant="outline" onClick={markAllAsRead} className="flex items-center">
            <CheckCircle className="ml-2 h-4 w-4" />
            خواندن همه
          </Button>
          <Button variant="outline" onClick={clearReadAnnouncements} className="flex items-center">
            <Trash2 className="ml-2 h-4 w-4" />
            پاک کردن خوانده شده‌ها
          </Button>
        </div>
      </div>
      
      {announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                !announcement.read ? 'bg-blue-50 border-blue-200' : ''
              } ${isExpiringSoon(announcement.expiryDate) ? 'border-red-300' : ''}`}
            >
              <CardContent className="p-4" onClick={() => {
                setSelectedAnnouncement(announcement);
                markAsRead(announcement.id);
              }}>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="p-2 rounded-full bg-gray-100">
                    {getAnnouncementIcon(announcement.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <h3 className="font-medium">{announcement.title}</h3>
                        {getAnnouncementTypeBadge(announcement.type)}
                      </div>
                      <span className="text-xs text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{announcement.message}</p>
                    {announcement.expiryDate && (
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <CalendarIcon className="h-3 w-3 ml-1" />
                        <span>
                          {isExpiringSoon(announcement.expiryDate) 
                            ? <span className="text-red-500">تاریخ انقضا: {announcement.expiryDate}</span> 
                            : <span>تاریخ انقضا: {announcement.expiryDate}</span>
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <MegaphoneIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ اطلاعیه مهمی یافت نشد</h3>
          <p className="text-gray-500">در حال حاضر هیچ اطلاعیه مهمی برای نمایش وجود ندارد.</p>
        </div>
      )}
      
      {/* دیالوگ جزئیات اطلاعیه */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={(open) => !open && setSelectedAnnouncement(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAnnouncement?.title}
              {selectedAnnouncement && getAnnouncementTypeBadge(selectedAnnouncement.type)}
            </DialogTitle>
            <DialogDescription className="text-right flex justify-between">
              <span>تاریخ انتشار: {selectedAnnouncement?.date}</span>
              {selectedAnnouncement?.expiryDate && (
                <span className={isExpiringSoon(selectedAnnouncement.expiryDate) ? "text-red-500" : ""}>
                  تاریخ انقضا: {selectedAnnouncement.expiryDate}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm">
            {selectedAnnouncement?.message}
          </div>
          <DialogFooter className="sm:justify-start flex items-center justify-between">
            <Button variant="destructive" onClick={() => selectedAnnouncement && deleteAnnouncement(selectedAnnouncement.id)}>
              <Trash2 className="h-4 w-4 ml-2" />
              حذف اطلاعیه
            </Button>
            <DialogClose asChild>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 ml-2" />
                بستن
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportantAnnouncementsPage;

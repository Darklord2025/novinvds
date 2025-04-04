
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, X, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Mock data for announcements
const mockAnnouncements = [
  {
    id: '1',
    title: 'بروزرسانی سرورها',
    message: 'به اطلاع می‌رسانیم که در تاریخ 15 فروردین 1403 از ساعت 2 الی 4 بامداد، سرورهای ما تحت عملیات بروزرسانی قرار خواهند گرفت. در این بازه زمانی ممکن است خدمات با اختلال مواجه شود. از صبر و شکیبایی شما سپاسگزاریم.',
    date: new Date(2024, 3, 10, 10, 0),
    importance: 'high',
    isRead: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'تغییر در قیمت‌گذاری سرویس‌ها',
    message: 'به اطلاع مشتریان گرامی می‌رسانیم که از تاریخ 1 اردیبهشت 1403، تغییراتی در قیمت‌گذاری سرویس‌های ما اعمال خواهد شد. برای اطلاعات بیشتر به صفحه قیمت‌گذاری مراجعه کنید. سرویس‌های فعلی تا پایان دوره سرویس با قیمت قبلی محاسبه خواهند شد.',
    date: new Date(2024, 3, 15, 14, 30),
    importance: 'medium',
    isRead: true,
    type: 'info'
  },
  {
    id: '3',
    title: 'معرفی سرویس جدید سرور ابری',
    message: 'با افتخار، سرویس جدید سرور ابری با قابلیت‌های منحصر به فرد و قدرت پردازشی بالا را معرفی می‌کنیم. این سرویس با امکان مقیاس‌پذیری لحظه‌ای و پرداخت بر اساس مصرف، گزینه‌ای ایده‌آل برای کسب و کارهای در حال رشد است. برای آشنایی بیشتر با این سرویس، به صفحه سرور ابری مراجعه کنید.',
    date: new Date(2024, 3, 20, 9, 0),
    importance: 'medium',
    isRead: false,
    type: 'success'
  },
  {
    id: '4',
    title: 'هشدار امنیتی: بروزرسانی رمز عبور',
    message: 'به دلیل افزایش حملات امنیتی در فضای مجازی، از تمامی کاربران درخواست می‌کنیم رمز عبور خود را تغییر دهند. برای حفظ امنیت بیشتر، از رمزهای عبور پیچیده (شامل حروف بزرگ و کوچک، اعداد و علائم) استفاده کنید و از تکرار رمز عبور در سایت‌های مختلف خودداری کنید.',
    date: new Date(2024, 3, 25, 12, 0),
    importance: 'critical',
    isRead: false,
    type: 'warning'
  },
  {
    id: '5',
    title: 'تعطیلات نوروزی',
    message: 'ضمن تبریک سال نو، به اطلاع می‌رسانیم که دفتر مرکزی ما از 29 اسفند 1402 تا 15 فروردین 1403 تعطیل خواهد بود. در این مدت، پشتیبانی فنی به صورت آنلاین و 24 ساعته از طریق تیکت‌ها در دسترس است. برای موارد اضطراری می‌توانید با شماره پشتیبانی اضطراری تماس بگیرید.',
    date: new Date(2024, 2, 18, 11, 0),
    importance: 'medium',
    isRead: true,
    type: 'info'
  }
];

interface ImportantAnnouncementsPageProps {
  onViewAnnouncement?: (announcement: any) => void;
}

const ImportantAnnouncementsPage: React.FC<ImportantAnnouncementsPageProps> = ({ onViewAnnouncement }) => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof mockAnnouncements[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Mark an announcement as read
  const handleMarkAsRead = (id: string) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, isRead: true } : announcement
    ));
  };

  // View announcement details
  const handleViewDetails = (announcement: typeof mockAnnouncements[0]) => {
    if (onViewAnnouncement) {
      onViewAnnouncement(announcement);
    } else {
      setSelectedAnnouncement(announcement);
      setDetailsOpen(true);
      handleMarkAsRead(announcement.id);
    }
  };

  // Get background color based on importance
  const getAnnouncementBg = (importance: string, isRead: boolean) => {
    if (isRead) return 'bg-gray-50';
    
    switch (importance) {
      case 'critical':
        return 'bg-red-50';
      case 'high':
        return 'bg-amber-50';
      case 'medium':
      default:
        return 'bg-blue-50';
    }
  };

  // Get badge based on importance
  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'critical':
        return <span className="bg-red-100 text-red-800 text-xs py-1 px-2 rounded">بحرانی</span>;
      case 'high':
        return <span className="bg-amber-100 text-amber-800 text-xs py-1 px-2 rounded">مهم</span>;
      case 'medium':
      default:
        return <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">اطلاعیه</span>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">اطلاعیه‌های مهم</h1>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>اطلاعیه‌های سیستم</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <div className="text-center p-8">
              <Megaphone className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">اطلاعیه‌ای وجود ندارد</h3>
              <p className="mt-1 text-sm text-gray-500">در حال حاضر اطلاعیه مهمی وجود ندارد.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className={`${getAnnouncementBg(announcement.importance, announcement.isRead)} p-4 rounded-lg cursor-pointer transition hover:shadow-md`}
                  onClick={() => handleViewDetails(announcement)}
                >
                  <div className="flex items-start">
                    <div className="ml-3">
                      <Megaphone className={announcement.importance === 'critical' ? 'text-red-500' : announcement.importance === 'high' ? 'text-amber-500' : 'text-blue-500'} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium ml-2">{announcement.title}</h3>
                          {getImportanceBadge(announcement.importance)}
                        </div>
                        <span className="text-xs text-gray-500">
                          {format(announcement.date, 'yyyy/MM/dd')}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {announcement.message}
                      </p>
                    </div>
                    {!announcement.isRead && (
                      <div className="mr-2">
                        <span className="block h-2 w-2 rounded-full bg-blue-600"></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Announcement details dialog - only show when not using external handler */}
      {!onViewAnnouncement && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {selectedAnnouncement?.importance === 'critical' ? (
                    <AlertTriangle className="h-6 w-6 text-red-500 ml-2" />
                  ) : (
                    <Megaphone className="h-6 w-6 text-blue-500 ml-2" />
                  )}
                  <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
                </div>
                {selectedAnnouncement && getImportanceBadge(selectedAnnouncement?.importance || 'medium')}
              </div>
              <DialogDescription>
                {selectedAnnouncement && format(selectedAnnouncement.date, 'yyyy/MM/dd - HH:mm')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-2">
              <p className="text-gray-800 whitespace-pre-line">{selectedAnnouncement?.message}</p>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDetailsOpen(false)}
              >
                <X className="ml-2 h-4 w-4" />
                بستن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ImportantAnnouncementsPage;

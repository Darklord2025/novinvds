
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Calendar, MegaphoneIcon } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "error" | "info" | "warning" | "success";
  date: string;
  read: boolean;
}

interface ImportantAnnouncementsPageProps {
  onViewAnnouncement: (announcement: Announcement) => void;
}

const ImportantAnnouncementsPage: React.FC<ImportantAnnouncementsPageProps> = ({ onViewAnnouncement }) => {
  // Mock data for announcements
  const announcements: Announcement[] = [
    {
      id: 'ann-1',
      title: 'بروزرسانی زیرساخت سرورهای هاستینگ',
      content: '<p>به اطلاع مشترکین محترم می‌رساند، در تاریخ 5 اردیبهشت 1402 از ساعت 2 تا 4 بامداد، عملیات بروزرسانی زیرساخت سرورهای هاستینگ انجام خواهد شد. در این بازه زمانی ممکن است سرویس‌های هاستینگ با اختلال موقت مواجه شوند.</p><p>از شکیبایی شما سپاسگزاریم.</p>',
      type: 'warning',
      date: '1402/02/01',
      read: false
    },
    {
      id: 'ann-2',
      title: 'افزایش ظرفیت دیتاسنتر اروپا',
      content: '<p>با توجه به استقبال مشتریان گرامی، ظرفیت دیتاسنتر اروپا افزایش یافته و سرویس‌های جدید با سخت‌افزارهای پیشرفته‌تر و قیمت‌های رقابتی در دسترس قرار گرفته است. برای مشاهده سرویس‌های جدید به بخش سفارش سرور مجازی مراجعه فرمایید.</p>',
      type: 'info',
      date: '1402/01/25',
      read: true
    },
  ];
  
  const handleViewAnnouncement = (announcement: Announcement) => {
    if (onViewAnnouncement) {
      onViewAnnouncement(announcement);
    }
  };
  
  const getAnnouncementBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">اطلاعیه</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">هشدار</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">اضطراری</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">اطلاعیه</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">اطلاعیه‌های مهم</h1>
          <p className="text-gray-500 mt-1">اطلاعیه‌های مهم در مورد سرویس‌ها و خدمات</p>
        </div>
        
        <div className="flex items-center gap-2">
          <MegaphoneIcon className="h-5 w-5 text-red-600" />
          <Badge className="bg-red-100 text-red-800">{announcements.filter(a => !a.read).length} اطلاعیه جدید</Badge>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>اطلاعیه‌های سیستم</CardTitle>
          <CardDescription>آخرین اطلاعیه‌های مهم در مورد سرویس‌ها و برنامه‌های نگهداری</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <div className="text-center py-8">
                <MegaphoneIcon className="h-12 w-12 mx-auto text-gray-300" />
                <p className="mt-4 text-gray-500">اطلاعیه‌ای برای نمایش وجود ندارد</p>
              </div>
            ) : (
              announcements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className={`border rounded-lg p-4 ${!announcement.read ? 'bg-amber-50 border-amber-200' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="p-2 bg-white rounded-full border">
                        <MegaphoneIcon className={`h-5 w-5 ${announcement.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{announcement.title}</h4>
                          {!announcement.read && <span className="h-2 w-2 bg-amber-500 rounded-full"></span>}
                          {getAnnouncementBadge(announcement.type)}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {announcement.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                        </p>
                        <div className="flex items-center text-xs text-gray-400">
                          <Calendar className="h-3 w-3 ml-1" />
                          {announcement.date}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewAnnouncement(announcement)}
                    >
                      مشاهده
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportantAnnouncementsPage;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paperclip, Send, Lock, CheckCircle, Clock, AlertCircle, Inbox } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Label } from '@/components/ui/label';

interface TicketDetailProps {
  ticketId: string;
  onClose?: () => void; // Keep for backward compatibility
  onBack?: () => void;  // Add the onBack prop
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId, onClose, onBack }) => {
  const [reply, setReply] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const { toast } = useToast();
  
  // Handle both onBack and onClose for backward compatibility
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onClose) {
      onClose();
    }
  };
  
  // Mock ticket data - this would come from an API in a real app
  const ticketData = {
    id: ticketId,
    status: ticketId === '#4321' || ticketId === '#3965' ? 'open' : 
           ticketId === '#4225' || ticketId === '#3912' ? 'answered' :
           ticketId === '#3998' ? 'pending' : 'closed',
    title: ticketId === '#4321' ? 'مشکل در اتصال به سرور مجازی' :
           ticketId === '#4225' ? 'درخواست افزایش منابع سرور' :
           ticketId === '#4112' ? 'مشکل در تمدید دامنه' :
           ticketId === '#3998' ? 'درخواست بازیابی اطلاعات' :
           ticketId === '#3965' ? 'مشکل در پنل کنترل سرور ابری' :
           ticketId === '#3912' ? 'درخواست تغییر IP سرور' :
           ticketId === '#3876' ? 'سوال در مورد لایسنس SQL Server' :
           'مشکل در ست کردن رکورد DNS',
    department: ticketId === '#4321' || ticketId === '#3912' ? 'سرور مجازی' :
                ticketId === '#4225' ? 'سرور اختصاصی' :
                ticketId === '#4112' || ticketId === '#3811' ? 'دامنه' :
                ticketId === '#3998' ? 'هاستینگ' :
                ticketId === '#3965' ? 'سرور ابری' : 'لایسنس',
    date: ticketId === '#4321' ? '1402/03/15' :
          ticketId === '#4225' ? '1402/03/10' :
          ticketId === '#4112' ? '1402/02/25' :
          ticketId === '#3998' ? '1402/02/18' :
          ticketId === '#3965' ? '1402/02/10' :
          ticketId === '#3912' ? '1402/02/05' :
          ticketId === '#3876' ? '1402/01/28' : '1402/01/20',
    messages: [
      {
        id: 1,
        user: 'کاربر',
        userType: 'client',
        date: ticketId === '#4321' ? '1402/03/15 14:25' : '1402/01/20 09:15',
        message: ticketId === '#4321' ? 
          'سلام، بنده در اتصال به سرور مجازی خود مشکل دارم. هنگام اتصال با SSH خطای Connection refused دریافت می‌کنم. لطفا راهنمایی کنید.' : 
          'سلام وقت بخیر، مشکلی در تنظیمات رکوردهای DNS دامنه خود دارم. رکوردهای MX را به درستی تنظیم کرده‌ام اما هنوز ایمیل‌ها دریافت نمی‌شوند.',
        attachments: [],
        avatar: '/avatars/user1.png'
      },
      {
        id: 2,
        user: 'کارشناس پشتیبانی',
        userType: 'staff',
        date: ticketId === '#4321' ? '1402/03/15 15:10' : '1402/01/20 11:30',
        message: ticketId === '#4321' ? 
          'سلام، لطفا موارد زیر را بررسی کنید:\n\n1. اطمینان حاصل کنید که سرور روشن است.\n2. تنظیمات فایروال سرور را بررسی کنید تا پورت 22 باز باشد.\n3. از صحت آی‌پی سرور اطمینان حاصل کنید.\n\nدر صورتی که مشکل همچنان باقی است، جزئیات بیشتری از خطای دریافتی را ارسال کنید.' : 
          'سلام، تنظیمات رکوردهای MX شما بررسی شد. مشکل از TTL بالای رکوردهاست. لطفا 24 ساعت صبر کنید تا تغییرات به‌طور کامل اعمال شود. اگر بعد از این مدت مشکل همچنان وجود داشت، اطلاع دهید.',
        attachments: [],
        avatar: '/avatars/support1.png'
      },
      {
        id: 3,
        user: 'کاربر',
        userType: 'client',
        date: ticketId === '#4321' ? '1402/03/15 16:45' : '1402/01/21 08:45',
        message: ticketId === '#4321' ? 
          'ممنون از پاسخ شما. من تمام موارد را چک کردم.\n\nسرور روشن است و از طریق پنل مدیریت قابل دسترسی است. در فایروال هم پورت 22 باز است. خطای کامل به این صورت است:\n\nssh: connect to host 185.220.x.x port 22: Connection refused' : 
          'با تشکر از راهنمایی شما. پس از گذشت 24 ساعت، مشکل حل شد و ایمیل‌ها به درستی دریافت می‌شوند. از پشتیبانی خوب شما سپاسگزارم.',
        attachments: [
          { name: 'screenshot.png', size: '320 KB' }
        ],
        avatar: '/avatars/user1.png'
      },
      {
        id: 4,
        user: 'کارشناس پشتیبانی',
        userType: 'staff',
        date: ticketId === '#4321' ? '1402/03/15 17:20' : '1402/01/21 09:30',
        message: ticketId === '#4321' ? 
          'با تشکر از ارائه جزئیات بیشتر. با توجه به خطای شما، به نظر می‌رسد سرویس SSH روی سرور در حال اجرا نیست. من سرویس را مجدداً راه‌اندازی کردم. لطفاً الان تلاش کنید و نتیجه را به ما اطلاع دهید.' : 
          'خوشحالم که مشکل حل شده است. در صورت بروز هرگونه مشکل دیگر، خوشحال می‌شویم به شما کمک کنیم.',
        attachments: [],
        avatar: '/avatars/support2.png'
      }
    ]
  };
  
  const handleReply = () => {
    if (reply.trim() === '') {
      toast({
        title: "خطا",
        description: "متن پاسخ نمی‌تواند خالی باشد.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would send the reply to your API
    toast({
      title: "پاسخ ارسال شد",
      description: "پاسخ شما با موفقیت به تیکت ارسال شد.",
    });
    
    // Reset the form
    setReply('');
    setFile(null);
    
    // If the ticket was closed, reopen it
    if (ticketData.status === 'closed') {
      toast({
        title: "تیکت مجدداً باز شد",
        description: "با ارسال پاسخ جدید، تیکت به وضعیت باز تغییر وضعیت داد.",
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleCloseTicket = () => {
    setIsClosing(true);
    
    // Simulate closing ticket
    setTimeout(() => {
      toast({
        title: "تیکت بسته شد",
        description: "تیکت شما با موفقیت بسته شد.",
      });
      setIsClosing(false);
      handleBack();
    }, 1000);
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open': return <Inbox className="h-5 w-5 text-blue-500" />;
      case 'closed': return <Lock className="h-5 w-5 text-gray-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'answered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Inbox className="h-5 w-5" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'open': return 'باز';
      case 'closed': return 'بسته شده';
      case 'pending': return 'در انتظار بررسی';
      case 'answered': return 'پاسخ داده شده';
      default: return status;
    }
  };
  
  return (
    <div className="flex flex-col h-full space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          {getStatusIcon(ticketData.status)}
          <div className="space-y-1">
            <h3 className="font-medium">{ticketData.title}</h3>
            <div className="flex items-center text-sm text-gray-500 space-x-3 space-x-reverse">
              <span>شماره: {ticketData.id}</span>
              <span>دپارتمان: {ticketData.department}</span>
              <span>تاریخ: {ticketData.date}</span>
              <span>وضعیت: {getStatusText(ticketData.status)}</span>
            </div>
          </div>
        </div>
        
        {/* Only show close button for open tickets */}
        {(ticketData.status === 'open' || ticketData.status === 'answered' || ticketData.status === 'pending') && (
          <Button variant="outline" onClick={handleCloseTicket} disabled={isClosing}>
            {isClosing ? "در حال بستن تیکت..." : "بستن تیکت"}
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mb-4">
          <TabsTrigger value="messages">پیام‌ها</TabsTrigger>
          <TabsTrigger value="attachments">پیوست‌ها</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="flex-1 overflow-auto h-[300px] p-4 border rounded-md">
          <div className="space-y-6">
            {ticketData.messages.map((message) => (
              <div key={message.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback>{message.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{message.user}</div>
                    <div className="text-sm text-gray-500">{message.date}</div>
                  </div>
                  <div className="text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
                    {message.message}
                  </div>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2">
                      {message.attachments.map((attachment, idx) => (
                        <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                          <Paperclip className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {attachment.name} ({attachment.size})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="attachments" className="flex-1 overflow-auto h-[300px] p-4 border rounded-md">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">پیوست‌های تیکت</h3>
            {ticketData.messages.flatMap(message => 
              message.attachments.map((attachment, idx) => (
                <div key={`${message.id}-${idx}`} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{attachment.name}</p>
                      <p className="text-sm text-gray-500">آپلود شده توسط: {message.user} - {message.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    دانلود
                  </Button>
                </div>
              ))
            )}
            
            {ticketData.messages.flatMap(message => message.attachments).length === 0 && (
              <p className="text-gray-500 text-center py-8">هیچ پیوستی برای این تیکت وجود ندارد.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Reply Form - Only show if ticket is not closed */}
      {ticketData.status !== 'closed' ? (
        <div className="border rounded-md p-4 space-y-4">
          <Label htmlFor="reply">پاسخ شما</Label>
          <Textarea 
            id="reply"
            placeholder="پاسخ خود را اینجا بنویسید..." 
            value={reply} 
            onChange={(e) => setReply(e.target.value)}
            className="min-h-[120px]"
          />
          
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex items-center">
              <input 
                type="file"
                id="attachment"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="attachment" className="cursor-pointer flex items-center">
                  <Paperclip className="mr-2 h-4 w-4" />
                  افزودن فایل
                </label>
              </Button>
              {file && (
                <span className="mr-2 text-sm text-gray-600">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </span>
              )}
            </div>
            
            <Button onClick={handleReply} className="bg-blue-600">
              <Send className="mr-2 h-4 w-4" />
              ارسال پاسخ
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-center">
          <p className="text-yellow-800">این تیکت بسته شده است. برای ارسال پاسخ جدید، تیکت را مجدداً باز کنید.</p>
          <Button className="mt-2" onClick={() => {
            toast({
              title: "تیکت مجدداً باز شد",
              description: "اکنون می‌توانید پاسخ خود را ارسال کنید.",
            });
          }}>
            بازگشایی تیکت
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;

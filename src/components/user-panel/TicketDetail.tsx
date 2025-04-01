
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, Download, MessageSquare, Paperclip, SendHorizonal, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  senderName: string;
  timestamp: string;
  attachments?: { name: string; size: string; url: string }[];
}

interface TicketDetailProps {
  ticketId: string;
  onClose: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId, onClose }) => {
  const [reply, setReply] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [ticketStatus, setTicketStatus] = useState<'open' | 'closed' | 'pending' | 'answered'>('open');
  const { toast } = useToast();
  
  // Sample data - in a real app this would come from an API
  const ticketDetails = {
    id: ticketId,
    title: 'مشکل در اتصال به سرور مجازی',
    department: 'سرور مجازی',
    status: ticketStatus,
    priority: 'متوسط',
    createdAt: '1402/03/15 14:30',
    lastUpdated: '1402/03/16 10:45',
  };
  
  const messages: Message[] = [
    {
      id: '1',
      content: 'سلام، اخیراً در اتصال SSH به سرور لینوکس مشکل دارم. هر بار تلاش می‌کنم با خطای Connection Refused مواجه می‌شوم. فایروال سرور را بررسی کردم و پورت 22 باز است. لطفاً راهنمایی کنید.',
      sender: 'user',
      senderName: 'محمد امینی',
      timestamp: '1402/03/15 14:30',
      attachments: [
        { name: 'error-log.txt', size: '45 KB', url: '#' }
      ]
    },
    {
      id: '2',
      content: 'با سلام و احترام. از گزارش شما متشکریم. لطفاً یک بررسی اولیه انجام دهید:\n\n1. آیا سرور روشن است و در حال کار است؟\n2. آیا تنظیمات SSH در سرور تغییر کرده است؟\n3. آیا IP شما مسدود نشده است؟\n\nلطفاً نتایج دستور زیر را برای ما ارسال کنید:\n`netstat -tulpn | grep ssh`',
      sender: 'support',
      senderName: 'پشتیبانی NovinVDS',
      timestamp: '1402/03/15 16:45'
    },
    {
      id: '3',
      content: 'ممنون از پاسخ سریع. سرور روشن است و سایر سرویس‌ها کار می‌کنند. خروجی دستور درخواستی به پیوست ارسال شد. همچنین مشاهده کردم پورت SSH از 22 به 2222 تغییر کرده است. احتمالاً هنگام آپدیت اخیر تغییر کرده است.',
      sender: 'user',
      senderName: 'محمد امینی',
      timestamp: '1402/03/16 10:45',
      attachments: [
        { name: 'netstat-output.txt', size: '12 KB', url: '#' }
      ]
    }
  ];
  
  const handleReply = () => {
    // Check if ticket is closed, reopen it when replying
    if (ticketStatus === 'closed') {
      setTicketStatus('open');
      toast({
        title: "تیکت مجدداً باز شد",
        description: "تیکت با ارسال پاسخ جدید مجدداً باز شد.",
        variant: "default"
      });
    }

    // In a real app, this would send the reply to an API
    toast({
      title: "پاسخ ارسال شد",
      description: "پاسخ شما با موفقیت ثبت شد.",
    });
    
    setReply('');
    setAttachments([]);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments([...attachments, ...fileArray]);
    }
  };
  
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  
  const handleCloseTicket = () => {
    setTicketStatus('closed');
    toast({
      title: "تیکت بسته شد",
      description: "تیکت با موفقیت بسته شد.",
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'closed': return <CheckCircle className="h-5 w-5 text-gray-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'answered': return <MessageSquare className="h-5 w-5 text-green-500" />;
      default: return <AlertCircle className="h-5 w-5" />;
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
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">{ticketDetails.title}</h2>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
            <span>شماره: {ticketDetails.id}</span>
            <span>دپارتمان: {ticketDetails.department}</span>
            <span>اولویت: {ticketDetails.priority}</span>
            <span>ایجاد: {ticketDetails.createdAt}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="flex items-center gap-1">
            {getStatusIcon(ticketDetails.status)}
            {getStatusText(ticketDetails.status)}
          </Badge>
          
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4 ml-1" />
            بستن
          </Button>
        </div>
      </div>
      
      {/* Messages - Fixed to ensure content is visible */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex gap-4 ${message.sender === 'support' ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <Avatar className={message.sender === 'support' ? 'bg-blue-100' : 'bg-gray-100'}>
              <AvatarFallback>
                {message.sender === 'support' ? 'پش' : 'کا'}
              </AvatarFallback>
            </Avatar>
            
            <div 
              className={`flex-1 p-4 rounded-lg ${
                message.sender === 'support' 
                  ? 'bg-blue-50 rounded-tr-none' 
                  : 'bg-gray-50 rounded-tl-none'
              }`}
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{message.senderName}</span>
                <span className="text-sm text-gray-500">{message.timestamp}</span>
              </div>
              
              {/* Ensure content is properly displayed */}
              <div className="whitespace-pre-wrap text-gray-800">{message.content}</div>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-500 mb-2">فایل‌های پیوست:</p>
                  <div className="space-y-2">
                    {message.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                        <div className="flex items-center">
                          <Paperclip className="h-4 w-4 ml-2 text-gray-400" />
                          <span>{file.name}</span>
                          <span className="text-xs text-gray-500 mr-2">({file.size})</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Reply Box - Updated for closed tickets and reopening */}
      {ticketStatus === 'closed' ? (
        <Card className="mt-4 bg-gray-50">
          <CardContent className="py-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium mb-1">این تیکت بسته شده است</h3>
              <p className="text-gray-500 mb-4">برای ادامه گفتگو، می‌توانید پاسخ جدیدی ارسال کنید تا تیکت مجدداً باز شود.</p>
              <Button 
                onClick={() => setTicketStatus('open')}
                className="bg-blue-600"
              >
                <MessageSquare className="h-4 w-4 ml-2" />
                باز کردن مجدد تیکت
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">پاسخ به تیکت</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="پاسخ خود را بنویسید..." 
              className="min-h-[120px]"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center">
                      <Paperclip className="h-4 w-4 ml-2" />
                      <span>{file.name}</span>
                      <span className="text-xs text-gray-500 mr-2">({Math.round(file.size / 1024)} KB)</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0" 
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <input 
                type="file" 
                id="file-upload" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer" type="button" asChild>
                  <span>
                    <Paperclip className="ml-2 h-4 w-4" />
                    افزودن فایل
                  </span>
                </Button>
              </label>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mr-2">
                    <X className="ml-2 h-4 w-4" />
                    بستن تیکت
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>بستن تیکت</DialogTitle>
                    <DialogDescription>
                      آیا از بستن این تیکت اطمینان دارید؟ می‌توانید با ارسال پاسخ جدید، تیکت را مجدداً باز کنید.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2 space-x-reverse pt-4">
                    <Button variant="destructive" onClick={handleCloseTicket}>
                      بستن تیکت
                    </Button>
                    <Button variant="outline">
                      انصراف
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <Button onClick={handleReply} disabled={!reply.trim()}>
              <SendHorizonal className="ml-2 h-4 w-4" />
              ارسال پاسخ
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default TicketDetail;


import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface TicketDetailProps {
  ticketId: string;
  onBack: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId, onBack }) => {
  const [replyText, setReplyText] = React.useState('');
  
  // Mock ticket data
  const ticketData = {
    id: ticketId,
    subject: `تیکت شماره ${ticketId}`,
    department: 'پشتیبانی فنی',
    priority: 'متوسط',
    status: 'در انتظار پاسخ',
    createdAt: '2023-05-12T10:30:00',
    messages: [
      {
        id: '1',
        sender: 'کاربر',
        senderType: 'client',
        content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.',
        timestamp: '2023-05-12T10:30:00'
      },
      {
        id: '2',
        sender: 'پشتیبان',
        senderType: 'admin',
        content: 'سلام، درخواست شما بررسی شد. لطفا اطلاعات بیشتری ارائه دهید.',
        timestamp: '2023-05-12T14:45:00'
      },
      {
        id: '3',
        sender: 'کاربر',
        senderType: 'client',
        content: 'با تشکر از پاسخ شما. اطلاعات بیشتر به شرح زیر است... لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        timestamp: '2023-05-13T09:15:00'
      }
    ]
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyText.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً متن پیام را وارد کنید.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would send the reply to the server
    console.log("Sending reply:", replyText);
    
    toast({
      title: "پیام ارسال شد",
      description: "پاسخ شما با موفقیت ثبت شد.",
    });
    
    setReplyText('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{ticketData.subject}</h1>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${ticketData.status === 'باز' ? 'bg-green-100 text-green-800' : 
          ticketData.status === 'در انتظار پاسخ' ? 'bg-blue-100 text-blue-800' : 
          ticketData.status === 'بسته شده' ? 'bg-gray-100 text-gray-800' : 
          'bg-yellow-100 text-yellow-800'}
        `}>
          {ticketData.status}
        </span>
      </div>

      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">جزئیات تیکت</CardTitle>
            <Button variant="outline" size="sm" onClick={onBack}>
              بازگشت به لیست تیکت‌ها
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">دپارتمان</span>
              <span className="font-medium">{ticketData.department}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">اولویت</span>
              <span className="font-medium">{ticketData.priority}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">تاریخ ایجاد</span>
              <span className="font-medium">{formatDate(ticketData.createdAt)}</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {ticketData.messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderType === 'client' ? 'justify-end' : ''}`}>
                <div className={`flex max-w-[80%] ${message.senderType === 'client' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className={`h-10 w-10 ${message.senderType === 'client' ? 'mr-4' : 'ml-4'}`}>
                    <AvatarImage src={message.senderType === 'admin' ? "/images/support-avatar.png" : ""} />
                    <AvatarFallback>{message.senderType === 'admin' ? 'SP' : 'UN'}</AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-4 ${message.senderType === 'client' ? 'bg-blue-50' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendReply} className="w-full">
            <div className="space-y-4">
              <div className="flex items-start">
                <Textarea 
                  placeholder="پاسخ خود را بنویسید..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 focus:border-blue-400"
                  rows={3}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>
                        <Paperclip className="ml-2 h-4 w-4" />
                        پیوست فایل
                      </span>
                    </Button>
                  </label>
                  <input id="file-upload" type="file" className="hidden" />
                </div>
                <Button type="submit">
                  <Send className="ml-2 h-4 w-4" />
                  ارسال پاسخ
                </Button>
              </div>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketDetail;

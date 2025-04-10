
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertCircle, ArrowLeft, PaperclipIcon, Send, Ticket } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CreateTicketFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ onSubmit, onCancel }) => {
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('');
  const [relatedService, setRelatedService] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!subject || !department || !priority || !message) {
      toast({
        title: "خطا در ارسال تیکت",
        description: "لطفاً تمامی فیلدهای ضروری را تکمیل کنید.",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccessDialogOpen(true);
    }, 1500);
  };
  
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Check file size (max 5MB)
      const oversizedFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast({
          title: "خطا در آپلود فایل",
          description: "حجم هر فایل باید کمتر از 5 مگابایت باشد.",
          variant: "destructive",
        });
        return;
      }
      
      // Check total files (max 3)
      if (attachments.length + newFiles.length > 3) {
        toast({
          title: "خطا در آپلود فایل",
          description: "حداکثر 3 فایل می‌توانید آپلود کنید.",
          variant: "destructive",
        });
        return;
      }
      
      setAttachments([...attachments, ...newFiles]);
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const handleConfirmTicket = () => {
    setSuccessDialogOpen(false);
    
    toast({
      title: "تیکت با موفقیت ارسال شد",
      description: "تیکت شما با موفقیت ثبت شد و کارشناسان ما در اسرع وقت به آن رسیدگی خواهند کرد.",
      action: (
        <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
          تأیید
        </Button>
      )
    });
    
    onSubmit();
  };
  
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">ارسال تیکت جدید</h1>
            <p className="text-gray-500 mt-1">از طریق فرم زیر می‌توانید درخواست پشتیبانی جدید ارسال کنید</p>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="flex items-center"
          >
            <ArrowLeft className="ml-2 h-4 w-4" />
            بازگشت
          </Button>
        </div>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            پیش از ارسال تیکت، لطفاً بخش پرسش‌های متداول را بررسی کنید. ممکن است پاسخ سؤال شما در آنجا موجود باشد.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات تیکت</CardTitle>
            <CardDescription>
              لطفاً اطلاعات خواسته شده را به دقت تکمیل نمایید تا رسیدگی به درخواست شما سریع‌تر انجام شود.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="ticketForm" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">موضوع <span className="text-red-500">*</span></Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="موضوع تیکت را وارد کنید"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">دپارتمان <span className="text-red-500">*</span></Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دپارتمان" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">پشتیبانی فنی</SelectItem>
                      <SelectItem value="billing">مالی و صورتحساب</SelectItem>
                      <SelectItem value="sales">فروش</SelectItem>
                      <SelectItem value="general">عمومی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="priority">اولویت <span className="text-red-500">*</span></Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب اولویت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">کم</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="high">زیاد</SelectItem>
                      <SelectItem value="critical">بحرانی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relatedService">سرویس مرتبط (اختیاری)</Label>
                  <Select value={relatedService} onValueChange={setRelatedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب سرویس مرتبط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vps-linux-1">سرور مجازی لینوکس (Lx452)</SelectItem>
                      <SelectItem value="dedicated-1">سرور اختصاصی (Dx781)</SelectItem>
                      <SelectItem value="hosting-1">هاستینگ (Hx293)</SelectItem>
                      <SelectItem value="domain-1">دامنه example.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">متن پیام <span className="text-red-500">*</span></Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="توضیحات کاملی از مشکل یا درخواست خود ارائه دهید..."
                  rows={5}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attachments">فایل‌های پیوست (اختیاری)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex flex-col items-center justify-center">
                    <PaperclipIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">فایل‌های خود را اینجا رها کنید یا کلیک کنید</p>
                    <p className="text-xs text-gray-500 mb-3">حداکثر 3 فایل (هر فایل حداکثر 5 مگابایت)</p>
                    <Input
                      id="attachments"
                      type="file"
                      onChange={handleAttachmentChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('attachments')?.click()}
                    >
                      انتخاب فایل
                    </Button>
                  </div>
                  
                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium">فایل‌های انتخاب شده:</p>
                      <ul className="space-y-2">
                        {attachments.map((file, index) => (
                          <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name} ({(file.size / 1024).toFixed(1)} کیلوبایت)</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              حذف
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              انصراف
            </Button>
            
            <Button
              type="submit"
              form="ticketForm"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="animate-spin mr-2">●</span>
                  در حال ارسال...
                </>
              ) : (
                <>
                  <Send className="ml-2 h-4 w-4" />
                  ارسال تیکت
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <AlertDialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-green-500" />
              تیکت با موفقیت ارسال شد
            </AlertDialogTitle>
            <AlertDialogDescription>
              تیکت شما با موفقیت ثبت شد و شناسه آن TICK-{Math.floor(100000 + Math.random() * 900000)} می‌باشد. کارشناسان ما در اسرع وقت به آن رسیدگی خواهند کرد و نتیجه را به شما اطلاع خواهند داد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirmTicket}>
              تأیید
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateTicketForm;

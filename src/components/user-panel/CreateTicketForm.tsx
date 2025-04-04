
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Paperclip, X } from 'lucide-react';

interface Department {
  value: string;
  label: string;
}

interface CreateTicketFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  departments?: Department[];
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ onSubmit, onCancel, departments = [] }) => {
  // Add default departments if none provided
  const ticketDepartments = departments.length > 0 ? departments : [
    { value: 'technical', label: 'پشتیبانی فنی' },
    { value: 'billing', label: 'امور مالی' },
    { value: 'sales', label: 'فروش' },
    { value: 'general', label: 'عمومی' }
  ];

  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('متوسط');
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit the form data to an API
    console.log({
      subject,
      department,
      message,
      priority,
      attachments
    });
    
    alert('تیکت با موفقیت ثبت شد');
    onSubmit();
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
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">موضوع</Label>
        <Input 
          id="subject" 
          placeholder="موضوع تیکت را وارد کنید" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">دپارتمان</Label>
          <Select value={department} onValueChange={setDepartment} required>
            <SelectTrigger id="department">
              <SelectValue placeholder="انتخاب دپارتمان" />
            </SelectTrigger>
            <SelectContent>
              {ticketDepartments.map(dept => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority">اولویت</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="انتخاب اولویت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="کم">کم</SelectItem>
              <SelectItem value="متوسط">متوسط</SelectItem>
              <SelectItem value="زیاد">زیاد</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">متن پیام</Label>
        <Textarea 
          id="message" 
          placeholder="توضیحات خود را وارد کنید..." 
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      
      <div>
        <input 
          type="file" 
          id="file-upload" 
          multiple 
          className="hidden" 
          onChange={handleFileChange}
        />
        <Label htmlFor="file-upload" className="block mb-2">فایل‌های پیوست</Label>
        <div className="flex">
          <label htmlFor="file-upload">
            <Button type="button" variant="outline" className="cursor-pointer" asChild>
              <span>
                <Paperclip className="ml-2 h-4 w-4" />
                افزودن فایل
              </span>
            </Button>
          </label>
        </div>
        
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
      </div>
      
      <div className="flex justify-end space-x-2 space-x-reverse pt-4">
        <Button type="submit">ثبت تیکت</Button>
        <Button type="button" variant="outline" onClick={onCancel}>انصراف</Button>
      </div>
    </form>
  );
};

export default CreateTicketForm;

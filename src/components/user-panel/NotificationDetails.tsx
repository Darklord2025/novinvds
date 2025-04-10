
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Bell, Calendar, Check, Info, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

interface NotificationDetailsProps {
  notification: {
    id: string;
    title: string;
    content: string;
    date: string;
    type?: 'alert' | 'info' | 'success';
    read?: boolean;
    important?: boolean;
  };
  onBack: () => void;
}

const NotificationDetails: React.FC<NotificationDetailsProps> = ({ notification, onBack }) => {
  const { id, title, content, date, type = 'info', read = false, important = false } = notification;

  const handleDelete = () => {
    toast({
      title: "اعلان حذف شد",
      description: "اعلان با موفقیت حذف شد.",
    });
    
    onBack();
  };
  
  const getTypeText = (type: string) => {
    switch (type) {
      case 'alert':
        return 'هشدار';
      case 'success':
        return 'موفقیت';
      case 'info':
      default:
        return 'اطلاعیه';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="ml-2 h-4 w-4" />
          بازگشت به اعلان‌ها
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {date}
          </span>
          
          {important && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              مهم
            </span>
          )}
        </div>
      </div>
      
      <Card className="border-t-4 shadow-lg" style={{ borderTopColor: type === 'alert' ? '#ef4444' : type === 'success' ? '#22c55e' : '#3b82f6' }}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              {getTypeIcon(type)}
              <div>
                <span className={`text-xs inline-block px-2 py-1 rounded ${getTypeColor(type)}`}>
                  {getTypeText(type)}
                </span>
                <CardTitle className="mt-2">{title}</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-gray-700 leading-relaxed">{content}</p>
          
          <div className="mt-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm text-gray-500">شناسه اعلان: {id}</span>
              <span className="text-sm text-gray-500">وضعیت: {read ? 'خوانده شده' : 'خوانده نشده'}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            بستن
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
          >
            <Trash2 className="ml-1 h-4 w-4" />
            حذف اعلان
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex justify-center mt-8">
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Bell className="h-4 w-4" />
          مرکز اعلان‌های نوین وی‌دی‌اس
        </span>
      </div>
    </div>
  );
};

export default NotificationDetails;

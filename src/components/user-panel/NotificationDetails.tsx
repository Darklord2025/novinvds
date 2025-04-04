
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface NotificationDetailsProps {
  notification: {
    id: string;
    title: string;
    content?: string;
    message?: string; // For backward compatibility
    type: "error" | "info" | "warning" | "success";
    date: Date | string;
    read?: boolean;
    isRead?: boolean; // For backward compatibility
  };
  onBack: () => void;
}

const NotificationDetails: React.FC<NotificationDetailsProps> = ({ notification, onBack }) => {
  // Handle different notification formats by normalizing the data
  const normalizedNotification = {
    id: notification.id,
    title: notification.title,
    content: notification.content || notification.message || '',
    type: notification.type,
    date: typeof notification.date === 'string' 
      ? notification.date 
      : notification.date instanceof Date 
        ? notification.date.toLocaleDateString('fa-IR') 
        : '',
    read: notification.read !== undefined ? notification.read : (notification.isRead !== undefined ? notification.isRead : false)
  };
  
  // Map notification types to UI classes
  const typeClasses = {
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    success: "bg-green-50 text-green-800 border-green-200",
    info: "bg-blue-50 text-blue-800 border-blue-200"
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Button 
        variant="outline" 
        onClick={onBack} 
        className="mb-4 flex items-center"
      >
        <ArrowRight className="ml-2 h-4 w-4" />
        بازگشت به لیست
      </Button>
      
      <Card className={`border ${typeClasses[normalizedNotification.type]}`}>
        <CardHeader>
          <CardTitle>{normalizedNotification.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            تاریخ: {normalizedNotification.date}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              className="prose prose-sm max-w-none" 
              dangerouslySetInnerHTML={{ __html: normalizedNotification.content }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onBack}>بستن</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationDetails;

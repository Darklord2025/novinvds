
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bell, CheckCircle, Info } from "lucide-react";

// Updated interface to match both notification formats used in the app
interface NotificationDetailsProps {
  notification: {
    id: string;
    title: string;
    content?: string; // Make content optional
    message?: string; // Add message as optional
    type: "info" | "warning" | "success" | "error";
    date: string | Date; // Accept both string and Date
    read?: boolean; // Make read optional
    isRead?: boolean; // Add isRead as optional
  } | null;
  onClose: () => void;
  onMarkAsRead?: (id?: string) => void; // Make id parameter optional
  isOpen?: boolean; // Add isOpen prop
}

const NotificationDetails = ({ notification, onClose, onMarkAsRead, isOpen }: NotificationDetailsProps) => {
  if (!notification) return null;
  
  const getIcon = () => {
    switch (notification.type) {
      case "warning":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      case "info":
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };
  
  // Function to handle content from different notification formats
  const getContent = () => {
    if (notification.content) {
      return notification.content;
    }
    if (notification.message) {
      return notification.message;
    }
    return "";
  };
  
  // Function to handle read status from different notification formats
  const isNotificationRead = () => {
    if (notification.read !== undefined) {
      return notification.read;
    }
    if (notification.isRead !== undefined) {
      return notification.isRead;
    }
    return false;
  };
  
  // Format date if it's a Date object
  const getFormattedDate = () => {
    if (notification.date instanceof Date) {
      return notification.date.toLocaleDateString('fa-IR');
    }
    return notification.date;
  };
  
  const handleMarkAsRead = () => {
    if (onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {getIcon()}
        <CardTitle>{notification.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2 space-y-4">
          <div 
            className="text-gray-700 text-sm leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: getContent() }}
          />
          <div className="text-sm text-gray-500 mt-4">
            تاریخ: {getFormattedDate()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {!isNotificationRead() && onMarkAsRead && (
          <Button variant="outline" onClick={handleMarkAsRead}>
            علامت‌گذاری به عنوان خوانده شده
          </Button>
        )}
        <Button onClick={onClose}>بستن</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationDetails;

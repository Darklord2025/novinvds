
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bell, CheckCircle, Info } from "lucide-react";

interface NotificationDetailsProps {
  notification: {
    id: string;
    title: string;
    content: string;
    type: "info" | "warning" | "success" | "error";
    date: string;
    read: boolean;
  };
  onClose: () => void;
  onMarkAsRead?: () => void;
}

const NotificationDetails = ({ notification, onClose, onMarkAsRead }: NotificationDetailsProps) => {
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
            dangerouslySetInnerHTML={{ __html: notification.content }}
          />
          <div className="text-sm text-gray-500 mt-4">
            تاریخ: {notification.date}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {!notification.read && onMarkAsRead && (
          <Button variant="outline" onClick={onMarkAsRead}>
            علامت‌گذاری به عنوان خوانده شده
          </Button>
        )}
        <Button onClick={onClose}>بستن</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationDetails;

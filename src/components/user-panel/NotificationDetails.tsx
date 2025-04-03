
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface NotificationDetailsProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
    date: Date;
    isRead: boolean;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationDetails: React.FC<NotificationDetailsProps> = ({
  notification,
  isOpen,
  onClose,
  onMarkAsRead
}) => {
  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-8 w-8 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-8 w-8 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-amber-50';
      case 'error':
        return 'bg-red-50';
      case 'info':
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center">
            {getIcon()}
            <DialogTitle className="mr-2 text-lg">{notification.title}</DialogTitle>
          </div>
          <DialogDescription>
            {format(notification.date, 'yyyy/MM/dd - HH:mm')}
          </DialogDescription>
        </DialogHeader>
        
        <div className={`${getBgColor()} p-4 rounded-md my-2`}>
          <p className="text-gray-800">{notification.message}</p>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={onClose}
          >
            <X className="ml-2 h-4 w-4" />
            بستن
          </Button>
          
          {!notification.isRead && (
            <Button
              variant="default"
              onClick={() => {
                onMarkAsRead(notification.id);
                onClose();
              }}
            >
              <CheckCircle className="ml-2 h-4 w-4" />
              علامت‌گذاری به‌عنوان خوانده‌شده
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetails;

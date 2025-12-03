
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, MessageSquare, AlertCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toPersianDigits } from '@/lib/numberUtils';

interface TicketsPageProps {
  onViewTicket: (ticketId: string) => void;
  onCreateNewTicket: () => void;
}

const TicketsPage: React.FC<TicketsPageProps> = ({ onViewTicket, onCreateNewTicket }) => {
  const tickets = [
    {
      id: "TKT-" + toPersianDigits(100423),
      subject: "مشکل در اتصال به سرور",
      department: "پشتیبانی فنی",
      status: "open",
      priority: "بالا",
      lastReply: "پشتیبانی",
      createdAt: toPersianDigits("1402/03/15"),
      lastUpdate: toPersianDigits("1402/03/16")
    },
    {
      id: "TKT-" + toPersianDigits(100422),
      subject: "سوال در مورد تمدید دامنه",
      department: "فروش",
      status: "answered",
      priority: "متوسط",
      lastReply: "پشتیبانی",
      createdAt: toPersianDigits("1402/03/10"),
      lastUpdate: toPersianDigits("1402/03/11")
    },
    {
      id: "TKT-" + toPersianDigits(100421),
      subject: "افزایش منابع سرور",
      department: "فروش",
      status: "closed",
      priority: "متوسط",
      lastReply: "کاربر",
      createdAt: toPersianDigits("1402/02/25"),
      lastUpdate: toPersianDigits("1402/02/28")
    },
    {
      id: "TKT-" + toPersianDigits(100420),
      subject: "مشکل در نصب نرم افزار روی سرور",
      department: "پشتیبانی فنی",
      status: "answered",
      priority: "کم",
      lastReply: "پشتیبانی",
      createdAt: toPersianDigits("1402/02/15"),
      lastUpdate: toPersianDigits("1402/02/16")
    },
    {
      id: "TKT-" + toPersianDigits(100419),
      subject: "سوال در مورد فاکتور پرداخت نشده",
      department: "مالی",
      status: "closed",
      priority: "متوسط",
      lastReply: "سیستم",
      createdAt: toPersianDigits("1402/02/05"),
      lastUpdate: toPersianDigits("1402/02/08")
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500">باز</Badge>;
      case 'answered':
        return <Badge className="bg-green-500">پاسخ داده شده</Badge>;
      case 'customer-reply':
        return <Badge className="bg-amber-500">پاسخ مشتری</Badge>;
      case 'in-progress':
        return <Badge className="bg-purple-500">در حال بررسی</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">بسته شده</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'بالا':
        return 'text-red-600';
      case 'متوسط':
        return 'text-amber-600';
      case 'کم':
        return 'text-green-600';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تیکت‌های پشتیبانی</h1>
        <Button onClick={onCreateNewTicket}>
          <Plus className="ml-2 h-4 w-4" />
          تیکت جدید
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
            <CardTitle>همه تیکت‌ها</CardTitle>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="جستجو در تیکت‌ها..."
                  className="pr-10 w-56 h-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40 h-9">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue placeholder="وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="open">باز</SelectItem>
                  <SelectItem value="answered">پاسخ داده شده</SelectItem>
                  <SelectItem value="in-progress">در حال بررسی</SelectItem>
                  <SelectItem value="closed">بسته شده</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="open">باز</TabsTrigger>
              <TabsTrigger value="answered">پاسخ داده شده</TabsTrigger>
              <TabsTrigger value="in-progress">در حال بررسی</TabsTrigger>
              <TabsTrigger value="closed">بسته شده</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="rounded-md border overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">شماره</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">موضوع</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">دپارتمان</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">وضعیت</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">اولویت</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">آخرین پاسخ</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">تاریخ ایجاد</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">آخرین بروزرسانی</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.length > 0 ? tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ticket.status)}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${getPriorityClass(ticket.priority)}`}>
                          {ticket.priority}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastReply}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm" onClick={() => onViewTicket(ticket.id)}>
                            <MessageSquare className="h-4 w-4 ml-1" />
                            مشاهده
                          </Button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={9} className="px-6 py-10 text-center">
                          <AlertCircle className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-gray-500">هیچ تیکتی یافت نشد.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="open" className="mt-0">
              <div className="rounded-md border overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">شماره</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">موضوع</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">دپارتمان</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">وضعیت</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">اولویت</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">آخرین پاسخ</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">تاریخ ایجاد</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">آخرین بروزرسانی</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.filter(t => t.status === 'open').map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ticket.status)}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${getPriorityClass(ticket.priority)}`}>
                          {ticket.priority}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastReply}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm" onClick={() => onViewTicket(ticket.id)}>
                            <MessageSquare className="h-4 w-4 ml-1" />
                            مشاهده
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {['answered', 'in-progress', 'closed'].map((status) => (
              <TabsContent key={status} value={status} className="mt-0">
                <div className="rounded-md border overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">شماره</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">موضوع</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">دپارتمان</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">وضعیت</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">اولویت</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">آخرین پاسخ</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">تاریخ ایجاد</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">آخرین بروزرسانی</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tickets.filter(t => t.status === status).map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ticket.status)}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${getPriorityClass(ticket.priority)}`}>
                            {ticket.priority}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastReply}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.createdAt}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Button variant="outline" size="sm" onClick={() => onViewTicket(ticket.id)}>
                              <MessageSquare className="h-4 w-4 ml-1" />
                              مشاهده
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketsPage;

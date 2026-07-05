import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, MessageSquare, AlertCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toPersianDigits } from '@/lib/numberUtils';

interface TicketsPageProps {
  onViewTicket: (ticketId: string) => void;
  onCreateNewTicket: () => void;
}

const TABS = [
  { value: 'all', label: 'همه' },
  { value: 'open', label: 'باز' },
  { value: 'answered', label: 'پاسخ داده شده' },
  { value: 'in-progress', label: 'در حال بررسی' },
  { value: 'closed', label: 'بسته شده' },
];

const TicketsPage: React.FC<TicketsPageProps> = ({ onViewTicket, onCreateNewTicket }) => {
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const tickets = [
    { id: "TKT-" + toPersianDigits(100423), subject: "مشکل در اتصال به سرور", department: "پشتیبانی فنی", status: "open", priority: "بالا", lastReply: "پشتیبانی", createdAt: toPersianDigits("1402/03/15"), lastUpdate: toPersianDigits("1402/03/16") },
    { id: "TKT-" + toPersianDigits(100422), subject: "سوال در مورد تمدید دامنه", department: "فروش", status: "answered", priority: "متوسط", lastReply: "پشتیبانی", createdAt: toPersianDigits("1402/03/10"), lastUpdate: toPersianDigits("1402/03/11") },
    { id: "TKT-" + toPersianDigits(100421), subject: "افزایش منابع سرور", department: "فروش", status: "closed", priority: "متوسط", lastReply: "کاربر", createdAt: toPersianDigits("1402/02/25"), lastUpdate: toPersianDigits("1402/02/28") },
    { id: "TKT-" + toPersianDigits(100420), subject: "مشکل در نصب نرم افزار روی سرور", department: "پشتیبانی فنی", status: "answered", priority: "کم", lastReply: "پشتیبانی", createdAt: toPersianDigits("1402/02/15"), lastUpdate: toPersianDigits("1402/02/16") },
    { id: "TKT-" + toPersianDigits(100419), subject: "سوال در مورد فاکتور پرداخت نشده", department: "مالی", status: "in-progress", priority: "متوسط", lastReply: "سیستم", createdAt: toPersianDigits("1402/02/05"), lastUpdate: toPersianDigits("1402/02/08") },
    { id: "TKT-" + toPersianDigits(100418), subject: "درخواست ارتقا هاست", department: "فروش", status: "closed", priority: "کم", lastReply: "کاربر", createdAt: toPersianDigits("1402/01/20"), lastUpdate: toPersianDigits("1402/01/22") },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge className="bg-blue-500 hover:bg-blue-500">باز</Badge>;
      case 'answered': return <Badge className="bg-green-500 hover:bg-green-500">پاسخ داده شده</Badge>;
      case 'in-progress': return <Badge className="bg-purple-500 hover:bg-purple-500">در حال بررسی</Badge>;
      case 'closed': return <Badge className="bg-gray-500 hover:bg-gray-500">بسته شده</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getPriorityClass = (p: string) => p === 'بالا' ? 'text-red-600' : p === 'متوسط' ? 'text-amber-600' : 'text-green-600';

  const filtered = tickets.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (searchQuery && !t.subject.includes(searchQuery) && !t.id.includes(searchQuery)) return false;
    return true;
  });

  const counts = TABS.reduce<Record<string, number>>((acc, t) => {
    acc[t.value] = t.value === 'all' ? tickets.length : tickets.filter((k) => k.status === t.value).length;
    return acc;
  }, {});

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-xl md:text-2xl font-bold">تیکت‌های پشتیبانی</h1>
        <Button onClick={onCreateNewTicket} size="sm">
          <Plus className="ml-1 h-4 w-4" /> تیکت جدید
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <CardTitle className="text-base">همه تیکت‌ها ({toPersianDigits(filtered.length)})</CardTitle>
            <div className="flex items-center gap-2 flex-1 md:flex-none md:min-w-[380px]">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="جستجو در تیکت‌ها…" className="pr-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 md:w-40"><Filter className="h-4 w-4 ml-1" /><SelectValue placeholder="وضعیت" /></SelectTrigger>
                <SelectContent>
                  {TABS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          {/* Horizontal scrollable filter tabs (RTL, mobile-safe) */}
          <div className="mb-4 overflow-x-auto scrollbar-hide -mx-1 px-1">
            <div className="flex gap-1.5 min-w-max" dir="rtl">
              {TABS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setStatusFilter(t.value)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors border whitespace-nowrap ${
                    statusFilter === t.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {t.label} <span className="opacity-70">({toPersianDigits(counts[t.value])})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop table */}
          <div className="rounded-md border overflow-x-auto hidden md:block">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">شماره</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">موضوع</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">دپارتمان</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">وضعیت</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">اولویت</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">آخرین پاسخ</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">تاریخ ایجاد</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">آخرین بروزرسانی</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length > 0 ? filtered.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-muted/40">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{ticket.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{ticket.subject}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{ticket.department}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(ticket.status)}</td>
                    <td className={`px-4 py-3 whitespace-nowrap text-sm ${getPriorityClass(ticket.priority)}`}>{ticket.priority}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{ticket.lastReply}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{ticket.createdAt}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{ticket.lastUpdate}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <Button variant="outline" size="sm" onClick={() => onViewTicket(ticket.id)}>
                        <MessageSquare className="h-4 w-4 ml-1" /> مشاهده
                      </Button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={9} className="px-6 py-10 text-center">
                    <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground/40 mb-2" />
                    <p className="text-muted-foreground">هیچ تیکتی یافت نشد.</p>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="text-muted-foreground text-sm">هیچ تیکتی یافت نشد.</p>
              </div>
            ) : filtered.map((t) => (
              <div key={t.id} className="border rounded-lg p-3 space-y-2 bg-card">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{t.subject}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{t.id} • {t.department}</p>
                  </div>
                  {getStatusBadge(t.status)}
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className={getPriorityClass(t.priority)}>اولویت: {t.priority}</span>
                  <span>{t.lastUpdate}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => onViewTicket(t.id)}>
                  <MessageSquare className="h-4 w-4 ml-1" /> مشاهده جزئیات
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketsPage;

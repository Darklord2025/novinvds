
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Inbox, CheckCircle, Clock, AlertCircle, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TicketDetail from './TicketDetail';
import CreateTicketForm from './CreateTicketForm';

interface Ticket {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed' | 'pending' | 'answered';
  lastUpdated: string;
}

const TicketsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  
  const ticketsData: Ticket[] = [
    { id: '#4321', title: 'مشکل در اتصال به سرور مجازی', department: 'سرور مجازی', status: 'open', lastUpdated: '1402/03/15' },
    { id: '#4225', title: 'درخواست افزایش منابع سرور', department: 'سرور اختصاصی', status: 'answered', lastUpdated: '1402/03/10' },
    { id: '#4112', title: 'مشکل در تمدید دامنه', department: 'دامنه', status: 'closed', lastUpdated: '1402/02/25' },
    { id: '#3998', title: 'درخواست بازیابی اطلاعات', department: 'هاستینگ', status: 'pending', lastUpdated: '1402/02/18' },
    { id: '#3965', title: 'مشکل در پنل کنترل سرور ابری', department: 'سرور ابری', status: 'open', lastUpdated: '1402/02/10' },
    { id: '#3912', title: 'درخواست تغییر IP سرور', department: 'سرور مجازی', status: 'answered', lastUpdated: '1402/02/05' },
    { id: '#3876', title: 'سوال در مورد لایسنس SQL Server', department: 'لایسنس', status: 'closed', lastUpdated: '1402/01/28' },
    { id: '#3811', title: 'مشکل در ست کردن رکورد DNS', department: 'دامنه', status: 'closed', lastUpdated: '1402/01/20' },
  ];
  
  const departments = [
    { value: 'all', label: 'همه دپارتمان‌ها' },
    { value: 'سرور مجازی', label: 'سرور مجازی' },
    { value: 'سرور اختصاصی', label: 'سرور اختصاصی' },
    { value: 'سرور ابری', label: 'سرور ابری' },
    { value: 'هاستینگ', label: 'هاستینگ' },
    { value: 'دامنه', label: 'دامنه' },
    { value: 'لایسنس', label: 'لایسنس' },
    { value: 'مالی', label: 'مالی' },
    { value: 'فنی', label: 'فنی' },
  ];
  
  const filteredTickets = ticketsData.filter(ticket => {
    // Filter by status
    if (activeTab !== 'all' && ticket.status !== activeTab) {
      return false;
    }
    
    // Filter by department
    if (departmentFilter !== 'all' && ticket.department !== departmentFilter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !ticket.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open': return <Inbox className="h-4 w-4 text-blue-500" />;
      case 'closed': return <CheckCircle className="h-4 w-4 text-gray-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'answered': return <AlertCircle className="h-4 w-4 text-green-500" />;
      default: return <Inbox className="h-4 w-4" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'open': return 'باز';
      case 'closed': return 'بسته شده';
      case 'pending': return 'در انتظار بررسی';
      case 'answered': return 'پاسخ داده شده';
      default: return status;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تیکت‌های پشتیبانی</h1>
        <Button className="bg-blue-600" onClick={() => setShowCreateTicket(true)}>
          <PlusCircle className="ml-2 h-4 w-4" /> تیکت جدید
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="جستجو در تیکت‌ها..." 
            className="pl-10 pr-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>
        
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger>
            <SelectValue placeholder="همه دپارتمان‌ها" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept.value} value={dept.value}>
                {dept.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="open">باز</TabsTrigger>
          <TabsTrigger value="answered">پاسخ داده شده</TabsTrigger>
          <TabsTrigger value="pending">در انتظار</TabsTrigger>
          <TabsTrigger value="closed">بسته شده</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">شماره</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">موضوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">دپارتمان</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخرین بروزرسانی</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr 
                      key={ticket.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center">
                          {getStatusIcon(ticket.status)}
                          <span className="mr-2">{getStatusText(ticket.status)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdated}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      تیکتی با این وضعیت وجود ندارد.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Ticket Detail Dialog */}
      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
            <TicketDetail 
              ticketId={selectedTicket} 
              onClose={() => setSelectedTicket(null)} 
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* Create Ticket Dialog */}
      <Dialog open={showCreateTicket} onOpenChange={setShowCreateTicket}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ثبت تیکت جدید</DialogTitle>
            <DialogDescription>
              لطفاً اطلاعات مورد نیاز برای ثبت تیکت را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          <CreateTicketForm 
            onSubmit={() => setShowCreateTicket(false)} 
            departments={departments.filter(d => d.value !== 'all')} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketsPage;

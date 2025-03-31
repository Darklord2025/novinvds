
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Inbox, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'closed' | 'pending' | 'answered';
  lastUpdated: string;
}

const TicketsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const ticketsData: Ticket[] = [
    { id: '#4321', title: 'مشکل در اتصال به سرور مجازی', department: 'سرور مجازی', status: 'open', lastUpdated: '1402/03/15' },
    { id: '#4225', title: 'درخواست افزایش منابع سرور', department: 'سرور اختصاصی', status: 'answered', lastUpdated: '1402/03/10' },
    { id: '#4112', title: 'مشکل در تمدید دامنه', department: 'دامنه', status: 'closed', lastUpdated: '1402/02/25' },
    { id: '#3998', title: 'درخواست بازیابی اطلاعات', department: 'هاستینگ', status: 'pending', lastUpdated: '1402/02/18' },
  ];
  
  const filteredTickets = activeTab === 'all' ? 
    ticketsData : 
    ticketsData.filter(ticket => 
      activeTab === 'open' ? ticket.status === 'open' || ticket.status === 'answered' || ticket.status === 'pending' : 
      ticket.status === activeTab
    );
  
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
        <Button className="bg-blue-600">
          <PlusCircle className="ml-2 h-4 w-4" /> تیکت جدید
        </Button>
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
                    <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer">
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
    </div>
  );
};

export default TicketsPage;

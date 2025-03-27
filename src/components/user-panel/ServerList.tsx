
import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const serverData = [
  { 
    id: 1, 
    name: 'سرور آلمان 1', 
    ip: '37.27.10.156', 
    plan: 'VPS-4G', 
    status: 'فعال', 
    expiry: '1402/12/25' 
  },
  { 
    id: 2, 
    name: 'سرور هلند 1', 
    ip: '217.65.43.12', 
    plan: 'VPS-8G', 
    status: 'فعال', 
    expiry: '1403/02/15' 
  },
  { 
    id: 3, 
    name: 'سرور آمریکا 1', 
    ip: '144.126.59.87', 
    plan: 'VPS-2G', 
    status: 'فعال', 
    expiry: '1403/01/05' 
  },
  { 
    id: 4, 
    name: 'سرور فرانسه 1', 
    ip: '195.88.123.45', 
    plan: 'VPS-16G', 
    status: 'در انتظار', 
    expiry: '1403/03/10' 
  },
  { 
    id: 5, 
    name: 'سرور انگلیس 1', 
    ip: '82.47.192.75', 
    plan: 'VPS-32G', 
    status: 'غیرفعال', 
    expiry: '1402/10/15' 
  }
];

const ServerList = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const filteredServers = useMemo(() => {
    return serverData.filter(server => {
      const matchesSearch = 
        server.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
        server.ip.includes(searchFilter);
      
      const matchesStatus = statusFilter === 'all' || server.status === statusFilter;
      const matchesPlan = planFilter === 'all' || server.plan === planFilter;
      
      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [searchFilter, statusFilter, planFilter]);

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h3 className="font-semibold">سرورهای اخیر</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3 relative">
            <label className="text-sm font-medium mb-1 block">جستجو</label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="جستجو بر اساس نام یا IP" 
                className="pr-10" 
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <label className="text-sm font-medium mb-1 block">وضعیت</label>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="همه وضعیت‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                <SelectItem value="فعال">فعال</SelectItem>
                <SelectItem value="غیرفعال">غیرفعال</SelectItem>
                <SelectItem value="در انتظار">در انتظار</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/4">
            <label className="text-sm font-medium mb-1 block">پلن</label>
            <Select 
              value={planFilter} 
              onValueChange={setPlanFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="همه پلن‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه پلن‌ها</SelectItem>
                <SelectItem value="VPS-2G">VPS-2G</SelectItem>
                <SelectItem value="VPS-4G">VPS-4G</SelectItem>
                <SelectItem value="VPS-8G">VPS-8G</SelectItem>
                <SelectItem value="VPS-16G">VPS-16G</SelectItem>
                <SelectItem value="VPS-32G">VPS-32G</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="icon" onClick={() => {
            setSearchFilter('');
            setStatusFilter('all');
            setPlanFilter('all');
          }}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">نام سرور</TableHead>
                <TableHead className="text-right">IP</TableHead>
                <TableHead className="text-right">پلن</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right">تاریخ انقضا</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServers.length > 0 ? (
                filteredServers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell className="font-medium">{server.name}</TableCell>
                    <TableCell className="text-gray-500">{server.ip}</TableCell>
                    <TableCell className="text-gray-500">{server.plan}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        server.status === 'فعال' 
                          ? 'bg-green-100 text-green-800' 
                          : server.status === 'غیرفعال'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {server.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500">{server.expiry}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">مدیریت</Button>
                        <Button variant="outline" size="sm" className="ml-2">تمدید</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    هیچ سروری با این مشخصات یافت نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ServerList;

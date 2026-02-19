import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ArrowRight, Search, ShoppingCart, Server, Globe, 
  Database, HardDrive, Cpu, Users, PanelLeft, Wifi, Shield,
  Check, Settings, Clock, Download, Mail
} from 'lucide-react';
import { toPersianDigits } from '@/lib/numberUtils';
import { toast } from '@/components/ui/use-toast';
import VpsOrderPage from './VpsOrderPage';

interface ServiceOrderPageProps {
  category: string;
  onBack?: () => void;
  onAddToCart?: (item: any) => void;
}

interface PlanItem {
  id: string;
  name: string;
  specs: string[];
  price: number;
  period: string;
  popular?: boolean;
  discount?: number;
}

const categoryData: Record<string, { title: string; icon: React.ReactNode; plans: PlanItem[] }> = {
  // === HOSTING ===
  'order-hosting': {
    title: 'میزبانی وب',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'h1', name: 'هاست لینوکس ECO', specs: ['۱ گیگ فضا SSD', '۱۰ گیگ پهنای باند', 'cPanel', 'SSL رایگان'], price: 50000, period: 'ماهانه' },
      { id: 'h2', name: 'هاست لینوکس PRO', specs: ['۵ گیگ فضا SSD', '۵۰ گیگ پهنای باند', 'cPanel', 'SSL رایگان', 'بکاپ روزانه'], price: 150000, period: 'ماهانه', popular: true },
      { id: 'h3', name: 'هاست لینوکس VIP', specs: ['۲۰ گیگ فضا NVMe', 'نامحدود پهنای باند', 'cPanel', 'SSL رایگان', 'بکاپ روزانه', 'LiteSpeed'], price: 350000, period: 'ماهانه' },
      { id: 'h4', name: 'هاست وردپرس', specs: ['۱۰ گیگ SSD', '۱۰۰ گیگ پهنای باند', 'بهینه وردپرس', 'کش اختصاصی'], price: 200000, period: 'ماهانه' },
      { id: 'h5', name: 'هاست ووکامرس', specs: ['۲۰ گیگ NVMe', '۲۰۰ گیگ پهنای باند', 'بهینه ووکامرس', 'LiteSpeed'], price: 300000, period: 'ماهانه' },
      { id: 'h6', name: 'هاست ویندوز', specs: ['۵ گیگ فضا', '۵۰ گیگ پهنای باند', 'Plesk', 'ASP.NET'], price: 180000, period: 'ماهانه' },
      { id: 'h7', name: 'هاست دانلود', specs: ['۵۰ گیگ فضا', '۵۰۰ گیگ پهنای باند', 'بهینه دانلود'], price: 250000, period: 'ماهانه' },
      { id: 'h8', name: 'هاست پایتون', specs: ['۵ گیگ SSD', '۵۰ گیگ پهنای باند', 'Python 3.x', 'Django/Flask'], price: 220000, period: 'ماهانه' },
      { id: 'h9', name: 'هاست Node.js', specs: ['۵ گیگ SSD', '۵۰ گیگ پهنای باند', 'Node.js LTS', 'PM2'], price: 220000, period: 'ماهانه' },
      { id: 'h10', name: 'هاست ایمیل', specs: ['۱۰ گیگ فضا', '۵۰ اکانت ایمیل', 'ضد اسپم', 'IMAP/POP3'], price: 100000, period: 'ماهانه' },
      { id: 'h11', name: 'هاست سفارشی', specs: ['منابع دلخواه', 'انتخاب پنل', 'پیکربندی سفارشی'], price: 0, period: 'متغیر' },
    ]
  },
  'order-hosting-linux-eco': {
    title: 'هاست لینوکس ECO',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'le1', name: 'ECO-1', specs: ['۵۰۰ مگ فضا SSD', '۵ گیگ پهنای باند', '۱ دیتابیس', 'cPanel'], price: 25000, period: 'ماهانه' },
      { id: 'le2', name: 'ECO-2', specs: ['۱ گیگ فضا SSD', '۱۰ گیگ پهنای باند', '۲ دیتابیس', 'cPanel'], price: 50000, period: 'ماهانه', popular: true },
      { id: 'le3', name: 'ECO-3', specs: ['۲ گیگ فضا SSD', '۲۰ گیگ پهنای باند', '۵ دیتابیس', 'cPanel'], price: 80000, period: 'ماهانه' },
      { id: 'le4', name: 'ECO-4', specs: ['۵ گیگ فضا SSD', '۵۰ گیگ پهنای باند', '۱۰ دیتابیس', 'cPanel'], price: 120000, period: 'ماهانه' },
    ]
  },
  'order-hosting-linux-pro': {
    title: 'هاست لینوکس PRO',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'lp1', name: 'PRO-1', specs: ['۵ گیگ NVMe', '۵۰ گیگ پهنای باند', '۱۰ دیتابیس', 'LiteSpeed'], price: 150000, period: 'ماهانه' },
      { id: 'lp2', name: 'PRO-2', specs: ['۱۰ گیگ NVMe', '۱۰۰ گیگ پهنای باند', '۲۰ دیتابیس', 'LiteSpeed'], price: 250000, period: 'ماهانه', popular: true },
      { id: 'lp3', name: 'PRO-3', specs: ['۲۰ گیگ NVMe', '۲۰۰ گیگ پهنای باند', 'نامحدود دیتابیس', 'LiteSpeed'], price: 400000, period: 'ماهانه' },
    ]
  },
  'order-hosting-linux-pro-ir': {
    title: 'هاست لینوکس PRO ایران',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'lpi1', name: 'PRO ایران ۱', specs: ['۵ گیگ NVMe', '۵۰ گیگ پهنای باند', 'دیتاسنتر ایران', 'LiteSpeed'], price: 180000, period: 'ماهانه' },
      { id: 'lpi2', name: 'PRO ایران ۲', specs: ['۱۰ گیگ NVMe', '۱۰۰ گیگ پهنای باند', 'دیتاسنتر ایران', 'LiteSpeed'], price: 300000, period: 'ماهانه', popular: true },
      { id: 'lpi3', name: 'PRO ایران ۳', specs: ['۲۰ گیگ NVMe', 'نامحدود پهنای باند', 'دیتاسنتر ایران', 'LiteSpeed'], price: 500000, period: 'ماهانه' },
    ]
  },
  'order-hosting-linux-vip': {
    title: 'هاست لینوکس VIP',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'lv1', name: 'VIP-1', specs: ['۱۰ گیگ NVMe', 'نامحدود پهنای باند', 'LiteSpeed', 'بکاپ روزانه'], price: 350000, period: 'ماهانه' },
      { id: 'lv2', name: 'VIP-2', specs: ['۲۰ گیگ NVMe', 'نامحدود پهنای باند', 'LiteSpeed', 'بکاپ روزانه', 'ایمیل نامحدود'], price: 550000, period: 'ماهانه', popular: true },
      { id: 'lv3', name: 'VIP-3', specs: ['۵۰ گیگ NVMe', 'نامحدود پهنای باند', 'LiteSpeed', 'بکاپ روزانه', 'منابع اختصاصی'], price: 900000, period: 'ماهانه' },
    ]
  },
  'order-hosting-linux-ir': {
    title: 'هاست لینوکس ایران',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'li1', name: 'ایران ۱', specs: ['۱ گیگ SSD', '۱۰ گیگ پهنای باند', 'دیتاسنتر تهران'], price: 60000, period: 'ماهانه' },
      { id: 'li2', name: 'ایران ۲', specs: ['۵ گیگ SSD', '۵۰ گیگ پهنای باند', 'دیتاسنتر تهران'], price: 150000, period: 'ماهانه', popular: true },
      { id: 'li3', name: 'ایران ۳', specs: ['۱۰ گیگ SSD', '۱۰۰ گیگ پهنای باند', 'دیتاسنتر تهران'], price: 250000, period: 'ماهانه' },
    ]
  },
  'order-hosting-wordpress': {
    title: 'هاست وردپرس',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'wp1', name: 'وردپرس استارتر', specs: ['۵ گیگ NVMe', '۵۰ گیگ پهنای باند', 'کش وردپرس', 'نصب خودکار'], price: 120000, period: 'ماهانه' },
      { id: 'wp2', name: 'وردپرس حرفه‌ای', specs: ['۱۰ گیگ NVMe', '۱۰۰ گیگ پهنای باند', 'LiteSpeed Cache', 'بکاپ روزانه'], price: 200000, period: 'ماهانه', popular: true },
      { id: 'wp3', name: 'وردپرس سازمانی', specs: ['۲۰ گیگ NVMe', 'نامحدود پهنای باند', 'منابع اختصاصی', 'پشتیبانی VIP'], price: 400000, period: 'ماهانه' },
    ]
  },
  'order-hosting-woocommerce': {
    title: 'هاست ووکامرس',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'wc1', name: 'ووکامرس پایه', specs: ['۱۰ گیگ NVMe', '۱۰۰ گیگ پهنای باند', 'بهینه فروشگاه'], price: 200000, period: 'ماهانه' },
      { id: 'wc2', name: 'ووکامرس حرفه‌ای', specs: ['۲۰ گیگ NVMe', '۲۰۰ گیگ پهنای باند', 'LiteSpeed', 'SSL رایگان'], price: 350000, period: 'ماهانه', popular: true },
      { id: 'wc3', name: 'ووکامرس سازمانی', specs: ['۵۰ گیگ NVMe', 'نامحدود پهنای باند', 'منابع اختصاصی', 'پشتیبانی VIP'], price: 600000, period: 'ماهانه' },
    ]
  },
  'order-hosting-windows': {
    title: 'هاست ویندوز',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'hw1', name: 'ویندوز پایه', specs: ['۲ گیگ SSD', '۲۰ گیگ پهنای باند', 'Plesk', 'ASP.NET'], price: 120000, period: 'ماهانه' },
      { id: 'hw2', name: 'ویندوز استاندارد', specs: ['۵ گیگ SSD', '۵۰ گیگ پهنای باند', 'Plesk', 'MSSQL'], price: 200000, period: 'ماهانه', popular: true },
      { id: 'hw3', name: 'ویندوز حرفه‌ای', specs: ['۱۰ گیگ SSD', '۱۰۰ گیگ پهنای باند', 'Plesk', 'MSSQL نامحدود'], price: 350000, period: 'ماهانه' },
    ]
  },
  'order-hosting-windows-ir': {
    title: 'هاست ویندوز ایران',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'hwi1', name: 'ویندوز ایران ۱', specs: ['۲ گیگ SSD', '۲۰ گیگ پهنای باند', 'دیتاسنتر ایران'], price: 150000, period: 'ماهانه' },
      { id: 'hwi2', name: 'ویندوز ایران ۲', specs: ['۵ گیگ SSD', '۵۰ گیگ پهنای باند', 'دیتاسنتر ایران'], price: 250000, period: 'ماهانه', popular: true },
    ]
  },
  'order-hosting-python': {
    title: 'هاست پایتون',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'py1', name: 'پایتون استارتر', specs: ['۲ گیگ SSD', 'Python 3.x', 'Django/Flask', 'SSH'], price: 150000, period: 'ماهانه' },
      { id: 'py2', name: 'پایتون حرفه‌ای', specs: ['۱۰ گیگ SSD', 'Python 3.x', 'منابع بیشتر', 'SSH'], price: 300000, period: 'ماهانه', popular: true },
    ]
  },
  'order-hosting-nodejs': {
    title: 'هاست Node.js',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'nj1', name: 'Node.js استارتر', specs: ['۲ گیگ SSD', 'Node.js LTS', 'PM2', 'SSH'], price: 150000, period: 'ماهانه' },
      { id: 'nj2', name: 'Node.js حرفه‌ای', specs: ['۱۰ گیگ SSD', 'Node.js LTS', 'منابع بیشتر', 'SSH'], price: 300000, period: 'ماهانه', popular: true },
    ]
  },
  'order-hosting-download': {
    title: 'هاست دانلود',
    icon: <Download className="w-6 h-6" />,
    plans: [
      { id: 'dl1', name: 'دانلود ۵۰ گیگ', specs: ['۵۰ گیگ فضا', '۵۰۰ گیگ پهنای باند', 'بهینه دانلود'], price: 200000, period: 'ماهانه' },
      { id: 'dl2', name: 'دانلود ۱۰۰ گیگ', specs: ['۱۰۰ گیگ فضا', '۱ ترا پهنای باند', 'بهینه دانلود'], price: 350000, period: 'ماهانه', popular: true },
      { id: 'dl3', name: 'دانلود ۵۰۰ گیگ', specs: ['۵۰۰ گیگ فضا', '۵ ترا پهنای باند', 'بهینه دانلود'], price: 800000, period: 'ماهانه' },
    ]
  },
  'order-hosting-warez': {
    title: 'هاست وارز',
    icon: <Database className="w-6 h-6" />,
    plans: [
      { id: 'wz1', name: 'وارز پایه', specs: ['۱۰۰ گیگ فضا', '۱ ترا پهنای باند', 'DMCA Free', 'Offshore'], price: 500000, period: 'ماهانه' },
      { id: 'wz2', name: 'وارز حرفه‌ای', specs: ['۵۰۰ گیگ فضا', '۵ ترا پهنای باند', 'DMCA Free', 'Offshore'], price: 1200000, period: 'ماهانه', popular: true },
      { id: 'wz3', name: 'وارز سازمانی', specs: ['۱ ترابایت فضا', '۱۰ ترا پهنای باند', 'DMCA Free', 'Offshore'], price: 2000000, period: 'ماهانه' },
    ]
  },
  'order-hosting-email': {
    title: 'هاست ایمیل',
    icon: <Mail className="w-6 h-6" />,
    plans: [
      { id: 'em1', name: 'ایمیل پایه', specs: ['۵ گیگ فضا', '۱۰ اکانت ایمیل', 'ضد اسپم'], price: 60000, period: 'ماهانه' },
      { id: 'em2', name: 'ایمیل حرفه‌ای', specs: ['۲۰ گیگ فضا', '۵۰ اکانت ایمیل', 'ضد اسپم', 'Webmail'], price: 150000, period: 'ماهانه', popular: true },
      { id: 'em3', name: 'ایمیل سازمانی', specs: ['۱۰۰ گیگ فضا', 'نامحدود اکانت', 'ضد اسپم', 'آرشیو ایمیل'], price: 350000, period: 'ماهانه' },
    ]
  },
  'order-hosting-custom': {
    title: 'هاست سفارشی',
    icon: <Settings className="w-6 h-6" />,
    plans: [
      { id: 'hc1', name: 'سفارشی پایه', specs: ['انتخاب فضای دلخواه', 'انتخاب پهنای باند', 'انتخاب پنل مدیریت'], price: 0, period: 'متغیر' },
    ]
  },
  // === VPS ===
  'order-vps': {
    title: 'سرور مجازی',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'v1', name: 'VPS پایه', specs: ['۱ هسته CPU', '۱ گیگ رم', '۲۰ گیگ SSD'], price: 199000, period: 'ماهانه' },
      { id: 'v2', name: 'VPS استاندارد', specs: ['۲ هسته CPU', '۴ گیگ رم', '۵۰ گیگ SSD'], price: 399000, period: 'ماهانه', popular: true },
      { id: 'v3', name: 'VPS حرفه‌ای', specs: ['۴ هسته CPU', '۸ گیگ رم', '۱۰۰ گیگ SSD'], price: 799000, period: 'ماهانه' },
      { id: 'v4', name: 'VPS سازمانی', specs: ['۸ هسته CPU', '۱۶ گیگ رم', '۲۰۰ گیگ SSD'], price: 1499000, period: 'ماهانه' },
    ]
  },
  'order-vps-linux': {
    title: 'سرور مجازی لینوکس',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'vl1', name: 'لینوکس ۱', specs: ['۱ هسته CPU', '۱ گیگ رم', '۲۰ گیگ SSD', 'Ubuntu/CentOS'], price: 199000, period: 'ماهانه' },
      { id: 'vl2', name: 'لینوکس ۲', specs: ['۲ هسته CPU', '۲ گیگ رم', '۴۰ گیگ SSD', 'Ubuntu/CentOS'], price: 299000, period: 'ماهانه', popular: true },
      { id: 'vl3', name: 'لینوکس ۳', specs: ['۲ هسته CPU', '۴ گیگ رم', '۶۰ گیگ SSD', 'Ubuntu/CentOS'], price: 399000, period: 'ماهانه' },
      { id: 'vl4', name: 'لینوکس ۴', specs: ['۴ هسته CPU', '۸ گیگ رم', '۱۰۰ گیگ SSD', 'Ubuntu/CentOS'], price: 699000, period: 'ماهانه' },
      { id: 'vl5', name: 'لینوکس ۵', specs: ['۶ هسته CPU', '۱۲ گیگ رم', '۱۵۰ گیگ SSD', 'Ubuntu/CentOS'], price: 999000, period: 'ماهانه' },
      { id: 'vl6', name: 'لینوکس ۶', specs: ['۸ هسته CPU', '۱۶ گیگ رم', '۲۰۰ گیگ SSD', 'Ubuntu/CentOS'], price: 1399000, period: 'ماهانه' },
    ]
  },
  'order-vps-windows': {
    title: 'سرور مجازی ویندوز',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'vw1', name: 'ویندوز ۱', specs: ['۱ هسته CPU', '۲ گیگ رم', '۴۰ گیگ SSD', 'لایسنس ویندوز'], price: 349000, period: 'ماهانه' },
      { id: 'vw2', name: 'ویندوز ۲', specs: ['۲ هسته CPU', '۴ گیگ رم', '۶۰ گیگ SSD', 'لایسنس ویندوز'], price: 499000, period: 'ماهانه', popular: true },
      { id: 'vw3', name: 'ویندوز ۳', specs: ['۴ هسته CPU', '۸ گیگ رم', '۱۰۰ گیگ SSD', 'لایسنس ویندوز'], price: 899000, period: 'ماهانه' },
      { id: 'vw4', name: 'ویندوز ۴', specs: ['۸ هسته CPU', '۱۶ گیگ رم', '۲۰۰ گیگ SSD', 'لایسنس ویندوز'], price: 1599000, period: 'ماهانه' },
    ]
  },
  'order-vps-ubuntu-desktop': {
    title: 'سرور مجازی اوبونتو دسکتاپ',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'vud1', name: 'اوبونتو دسکتاپ ۱', specs: ['۲ هسته CPU', '۴ گیگ رم', '۶۰ گیگ SSD', 'GUI دسکتاپ'], price: 449000, period: 'ماهانه' },
      { id: 'vud2', name: 'اوبونتو دسکتاپ ۲', specs: ['۴ هسته CPU', '۸ گیگ رم', '۱۰۰ گیگ SSD', 'GUI دسکتاپ'], price: 799000, period: 'ماهانه', popular: true },
    ]
  },
  'order-vps-linux-ir': {
    title: 'سرور مجازی لینوکس ایران',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'vli1', name: 'لینوکس ایران ۱', specs: ['۱ هسته CPU', '۱ گیگ رم', '۲۰ گیگ SSD', 'دیتاسنتر ایران'], price: 250000, period: 'ماهانه' },
      { id: 'vli2', name: 'لینوکس ایران ۲', specs: ['۲ هسته CPU', '۲ گیگ رم', '۴۰ گیگ SSD', 'دیتاسنتر ایران'], price: 399000, period: 'ماهانه', popular: true },
      { id: 'vli3', name: 'لینوکس ایران ۳', specs: ['۴ هسته CPU', '۴ گیگ رم', '۸۰ گیگ SSD', 'دیتاسنتر ایران'], price: 599000, period: 'ماهانه' },
    ]
  },
  'order-vps-windows-ir': {
    title: 'سرور مجازی ویندوز ایران',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'vwi1', name: 'ویندوز ایران ۱', specs: ['۱ هسته CPU', '۲ گیگ رم', '۴۰ گیگ SSD', 'دیتاسنتر ایران'], price: 399000, period: 'ماهانه' },
      { id: 'vwi2', name: 'ویندوز ایران ۲', specs: ['۲ هسته CPU', '۴ گیگ رم', '۶۰ گیگ SSD', 'دیتاسنتر ایران'], price: 599000, period: 'ماهانه', popular: true },
    ]
  },
  'order-vps-mikrotik': {
    title: 'سرور مجازی میکروتیک',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'vmk1', name: 'میکروتیک ۱', specs: ['۱ هسته CPU', '۵۱۲ مگ رم', '۵ گیگ SSD', 'RouterOS'], price: 150000, period: 'ماهانه' },
      { id: 'vmk2', name: 'میکروتیک ۲', specs: ['۲ هسته CPU', '۱ گیگ رم', '۱۰ گیگ SSD', 'RouterOS'], price: 250000, period: 'ماهانه', popular: true },
    ]
  },
  'order-vps-storage': {
    title: 'سرور مجازی استوریج',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'vs1', name: 'استوریج ۵۰۰ گیگ', specs: ['۱ هسته CPU', '۲ گیگ رم', '۵۰۰ گیگ HDD'], price: 299000, period: 'ماهانه' },
      { id: 'vs2', name: 'استوریج ۱ ترا', specs: ['۲ هسته CPU', '۴ گیگ رم', '۱ ترابایت HDD'], price: 499000, period: 'ماهانه', popular: true },
      { id: 'vs3', name: 'استوریج ۲ ترا', specs: ['۴ هسته CPU', '۸ گیگ رم', '۲ ترابایت HDD'], price: 899000, period: 'ماهانه' },
    ]
  },
  'order-vps-hourly': {
    title: 'سرور مجازی ساعتی',
    icon: <Clock className="w-6 h-6" />,
    plans: [
      { id: 'vh1', name: 'ساعتی پایه', specs: ['۱ هسته CPU', '۱ گیگ رم', '۲۰ گیگ SSD', 'پرداخت ساعتی'], price: 500, period: 'ساعتی' },
      { id: 'vh2', name: 'ساعتی استاندارد', specs: ['۲ هسته CPU', '۲ گیگ رم', '۴۰ گیگ SSD', 'پرداخت ساعتی'], price: 900, period: 'ساعتی', popular: true },
      { id: 'vh3', name: 'ساعتی حرفه‌ای', specs: ['۴ هسته CPU', '۴ گیگ رم', '۸۰ گیگ SSD', 'پرداخت ساعتی'], price: 1500, period: 'ساعتی' },
      { id: 'vh4', name: 'ساعتی سازمانی', specs: ['۸ هسته CPU', '۸ گیگ رم', '۱۶۰ گیگ SSD', 'پرداخت ساعتی'], price: 2800, period: 'ساعتی' },
    ]
  },
  'order-vps-daily': {
    title: 'سرور مجازی روزانه',
    icon: <Clock className="w-6 h-6" />,
    plans: [
      { id: 'vd1', name: 'روزانه پایه', specs: ['۱ هسته CPU', '۱ گیگ رم', '۲۰ گیگ SSD', 'پرداخت روزانه'], price: 10000, period: 'روزانه' },
      { id: 'vd2', name: 'روزانه استاندارد', specs: ['۲ هسته CPU', '۲ گیگ رم', '۴۰ گیگ SSD', 'پرداخت روزانه'], price: 18000, period: 'روزانه', popular: true },
      { id: 'vd3', name: 'روزانه حرفه‌ای', specs: ['۴ هسته CPU', '۴ گیگ رم', '۸۰ گیگ SSD', 'پرداخت روزانه'], price: 30000, period: 'روزانه' },
    ]
  },
  'order-vps-managed': {
    title: 'سرور مجازی مدیریت شده',
    icon: <Server className="w-6 h-6" />,
    plans: [
      { id: 'vm1', name: 'مدیریت شده ۱', specs: ['۲ هسته CPU', '۴ گیگ رم', '۵۰ گیگ SSD', 'مدیریت ۲۴/۷'], price: 599000, period: 'ماهانه' },
      { id: 'vm2', name: 'مدیریت شده ۲', specs: ['۴ هسته CPU', '۸ گیگ رم', '۱۰۰ گیگ SSD', 'مدیریت ۲۴/۷'], price: 999000, period: 'ماهانه', popular: true },
    ]
  },
  'order-vps-custom': {
    title: 'سرور مجازی سفارشی',
    icon: <Settings className="w-6 h-6" />,
    plans: [
      { id: 'vc1', name: 'سفارشی', specs: ['CPU دلخواه', 'رم دلخواه', 'فضا دلخواه', 'سیستم‌عامل دلخواه'], price: 0, period: 'متغیر' },
    ]
  },
  // === DEDICATED ===
  'order-dedicated': {
    title: 'سرور اختصاصی',
    icon: <HardDrive className="w-6 h-6" />,
    plans: [
      { id: 'd1', name: 'سرور اختصاصی پایه', specs: ['Intel Xeon E3', '۱۶ گیگ رم', '۲×۱ ترا HDD', 'ESXi / Proxmox / Linux / Windows'], price: 3500000, period: 'ماهانه' },
      { id: 'd2', name: 'سرور اختصاصی حرفه‌ای', specs: ['Intel Xeon E5', '۳۲ گیگ رم', '۲×۲ ترا SSD', 'ESXi / Proxmox / Linux / Windows'], price: 6500000, period: 'ماهانه', popular: true },
      { id: 'd3', name: 'سرور اختصاصی سازمانی', specs: ['۲× Intel Xeon', '۶۴ گیگ رم', '۴×۲ ترا SSD', 'ESXi / Proxmox / Linux / Windows'], price: 12000000, period: 'ماهانه' },
    ]
  },
  'order-dedicated-iran': {
    title: 'سرور اختصاصی ایران',
    icon: <HardDrive className="w-6 h-6" />,
    plans: [
      { id: 'di1', name: 'ایران E3', specs: ['Intel Xeon E3-1230', '۱۶ گیگ رم', '۱ ترا SSD', 'دیتاسنتر تهران'], price: 4500000, period: 'ماهانه' },
      { id: 'di2', name: 'ایران E5', specs: ['Intel Xeon E5-2620', '۳۲ گیگ رم', '۲ ترا SSD', 'دیتاسنتر تهران'], price: 7500000, period: 'ماهانه', popular: true },
      { id: 'di3', name: 'ایران Dual', specs: ['۲× Xeon E5-2680', '۶۴ گیگ رم', '۴ ترا SSD', 'دیتاسنتر تهران'], price: 14000000, period: 'ماهانه' },
    ]
  },
  'order-dedicated-europe': {
    title: 'سرور اختصاصی اروپا',
    icon: <HardDrive className="w-6 h-6" />,
    plans: [
      { id: 'de1', name: 'اروپا E3', specs: ['Intel Xeon E3-1270', '۱۶ گیگ رم', '۲×۱ ترا HDD', 'آلمان/هلند'], price: 3500000, period: 'ماهانه' },
      { id: 'de2', name: 'اروپا E5', specs: ['Intel Xeon E5-2640', '۳۲ گیگ رم', '۲×۲ ترا SSD', 'آلمان/هلند'], price: 6000000, period: 'ماهانه', popular: true },
      { id: 'de3', name: 'اروپا Dual', specs: ['۲× Xeon E5', '۶۴ گیگ رم', '۴×۲ ترا SSD', 'آلمان/هلند'], price: 11000000, period: 'ماهانه' },
    ]
  },
  'order-dedicated-usa': {
    title: 'سرور اختصاصی آمریکا',
    icon: <HardDrive className="w-6 h-6" />,
    plans: [
      { id: 'du1', name: 'آمریکا E3', specs: ['Intel Xeon E3-1270', '۱۶ گیگ رم', '۲×۱ ترا HDD', 'دالاس/لس‌آنجلس'], price: 3800000, period: 'ماهانه' },
      { id: 'du2', name: 'آمریکا E5', specs: ['Intel Xeon E5-2640', '۳۲ گیگ رم', '۲×۲ ترا SSD', 'دالاس/لس‌آنجلس'], price: 6500000, period: 'ماهانه', popular: true },
    ]
  },
  'order-dedicated-asia': {
    title: 'سرور اختصاصی آسیا',
    icon: <HardDrive className="w-6 h-6" />,
    plans: [
      { id: 'da1', name: 'آسیا E3', specs: ['Intel Xeon E3', '۱۶ گیگ رم', '۱ ترا SSD', 'سنگاپور/توکیو'], price: 4000000, period: 'ماهانه' },
      { id: 'da2', name: 'آسیا E5', specs: ['Intel Xeon E5', '۳۲ گیگ رم', '۲ ترا SSD', 'سنگاپور/توکیو'], price: 7000000, period: 'ماهانه', popular: true },
    ]
  },
  'order-dedicated-gpu': {
    title: 'سرور اختصاصی GPU',
    icon: <HardDrive className="w-6 h-6" />,
    plans: [
      { id: 'dg1', name: 'GPU A4000', specs: ['۸ هسته CPU', '۳۲ گیگ رم', 'NVIDIA A4000', '۱ ترا NVMe'], price: 15000000, period: 'ماهانه' },
      { id: 'dg2', name: 'GPU A100', specs: ['۱۶ هسته CPU', '۱۲۸ گیگ رم', 'NVIDIA A100', '۲ ترا NVMe'], price: 45000000, period: 'ماهانه', popular: true },
    ]
  },
  'order-dedicated-storage': {
    title: 'سرور اختصاصی استوریج',
    icon: <HardDrive className="w-6 h-6" />,
    plans: [
      { id: 'ds1', name: 'استوریج ۱۰ ترا', specs: ['Xeon E3', '۱۶ گیگ رم', '۱۰ ترابایت HDD'], price: 5000000, period: 'ماهانه' },
      { id: 'ds2', name: 'استوریج ۲۰ ترا', specs: ['Xeon E5', '۳۲ گیگ رم', '۲۰ ترابایت HDD'], price: 8000000, period: 'ماهانه', popular: true },
    ]
  },
  // === DOMAIN ===
  'order-domain': {
    title: 'دامنه',
    icon: <Globe className="w-6 h-6" />,
    plans: [
      { id: 'dm1', name: '.ir', specs: ['ثبت یکساله', 'تمدید خودکار'], price: 12000, period: 'سالانه' },
      { id: 'dm2', name: '.com', specs: ['ثبت یکساله', 'WHOIS Privacy'], price: 390000, period: 'سالانه', popular: true },
      { id: 'dm3', name: '.net', specs: ['ثبت یکساله', 'WHOIS Privacy'], price: 420000, period: 'سالانه' },
      { id: 'dm4', name: '.org', specs: ['ثبت یکساله', 'WHOIS Privacy'], price: 450000, period: 'سالانه' },
      { id: 'dm5', name: '.io', specs: ['ثبت یکساله', 'WHOIS Privacy'], price: 1200000, period: 'سالانه' },
      { id: 'dm6', name: '.co', specs: ['ثبت یکساله', 'WHOIS Privacy'], price: 850000, period: 'سالانه' },
      { id: 'dm7', name: '.me', specs: ['ثبت یکساله'], price: 550000, period: 'سالانه' },
      { id: 'dm8', name: '.info', specs: ['ثبت یکساله'], price: 350000, period: 'سالانه' },
      { id: 'dm9', name: '.biz', specs: ['ثبت یکساله'], price: 400000, period: 'سالانه' },
      { id: 'dm10', name: '.shop', specs: ['ثبت یکساله'], price: 120000, period: 'سالانه', discount: 70 },
      { id: 'dm11', name: '.app', specs: ['ثبت یکساله', 'SSL اجباری'], price: 550000, period: 'سالانه' },
      { id: 'dm12', name: '.dev', specs: ['ثبت یکساله', 'SSL اجباری'], price: 480000, period: 'سالانه' },
      { id: 'dm13', name: '.xyz', specs: ['ثبت یکساله'], price: 50000, period: 'سالانه', discount: 80 },
      { id: 'dm14', name: '.online', specs: ['ثبت یکساله'], price: 80000, period: 'سالانه', discount: 60 },
      { id: 'dm15', name: '.site', specs: ['ثبت یکساله'], price: 90000, period: 'سالانه' },
      { id: 'dm16', name: '.store', specs: ['ثبت یکساله'], price: 150000, period: 'سالانه' },
      { id: 'dm17', name: '.asia', specs: ['ثبت یکساله'], price: 400000, period: 'سالانه' },
      { id: 'dm18', name: '.co.ir', specs: ['ثبت یکساله'], price: 8000, period: 'سالانه' },
      { id: 'dm19', name: '.ac.ir', specs: ['ثبت یکساله', 'ویژه دانشگاهی'], price: 8000, period: 'سالانه' },
    ]
  },
  // === SSL ===
  'order-ssl': {
    title: 'گواهی SSL',
    icon: <Shield className="w-6 h-6" />,
    plans: [
      { id: 'ssl1', name: 'SSL DV', specs: ['اعتبارسنجی دامنه', 'صدور فوری', 'قفل سبز مرورگر'], price: 250000, period: 'سالانه' },
      { id: 'ssl2', name: 'SSL OV', specs: ['اعتبارسنجی سازمان', 'نام شرکت در گواهی'], price: 800000, period: 'سالانه', popular: true },
      { id: 'ssl3', name: 'SSL EV', specs: ['اعتبارسنجی گسترده', 'نوار سبز مرورگر', 'بالاترین اعتبار'], price: 2500000, period: 'سالانه' },
      { id: 'ssl4', name: 'Wildcard SSL', specs: ['تمام ساب‌دامین‌ها', 'اعتبارسنجی دامنه'], price: 1200000, period: 'سالانه' },
      { id: 'ssl5', name: 'Multi-Domain SSL', specs: ['تا ۱۰ دامنه', 'SAN Certificate'], price: 1500000, period: 'سالانه' },
    ]
  },
  // === NETWORK ===
  'order-network': {
    title: 'خدمات شبکه',
    icon: <Wifi className="w-6 h-6" />,
    plans: [
      { id: 'n1', name: 'ترافیک اضافه ۱۰۰ گیگ', specs: ['ترافیک بین‌الملل'], price: 50000, period: 'یکبار' },
      { id: 'n2', name: 'ترافیک اضافه ۵۰۰ گیگ', specs: ['ترافیک بین‌الملل'], price: 200000, period: 'یکبار' },
      { id: 'n3', name: 'DNS اختصاصی', specs: ['۴ سرور DNS', 'GeoDNS'], price: 80000, period: 'ماهانه' },
      { id: 'n4', name: 'سرویس پروکسی', specs: ['آی‌پی اختصاصی', 'ترافیک نامحدود'], price: 120000, period: 'ماهانه' },
      { id: 'n5', name: 'CDN', specs: ['شبکه توزیع محتوا', 'کش هوشمند'], price: 200000, period: 'ماهانه' },
      { id: 'n6', name: 'فایروال اختصاصی', specs: ['محافظت DDoS', 'قوانین سفارشی'], price: 300000, period: 'ماهانه' },
    ]
  },
  // === PANELS ===
  'order-panels': {
    title: 'کنترل پنل‌ها',
    icon: <PanelLeft className="w-6 h-6" />,
    plans: [
      { id: 'p1', name: 'لایسنس cPanel', specs: ['ماهانه', 'نصب رایگان'], price: 450000, period: 'ماهانه', popular: true },
      { id: 'p2', name: 'لایسنس DirectAdmin', specs: ['ماهانه', 'نصب رایگان'], price: 250000, period: 'ماهانه' },
      { id: 'p3', name: 'لایسنس Plesk', specs: ['ماهانه', 'نصب رایگان'], price: 350000, period: 'ماهانه' },
      { id: 'p4', name: 'لایسنس aaPanel', specs: ['ماهانه', 'رایگان'], price: 0, period: 'ماهانه' },
      { id: 'p5', name: 'لایسنس CyberPanel', specs: ['ماهانه', 'OpenLiteSpeed'], price: 0, period: 'ماهانه' },
      { id: 'p6', name: 'لایسنس WHM/cPanel', specs: ['تا ۱۰۰ اکانت'], price: 900000, period: 'ماهانه' },
      { id: 'p7', name: 'لایسنس CloudLinux', specs: ['ماهانه'], price: 350000, period: 'ماهانه' },
      { id: 'p8', name: 'لایسنس LiteSpeed', specs: ['وب‌سرور'], price: 300000, period: 'ماهانه' },
      { id: 'p9', name: 'لایسنس WHMCS', specs: ['اتوماسیون هاستینگ'], price: 500000, period: 'ماهانه' },
    ]
  },
  // === MODULES ===
  'order-modules': {
    title: 'ماژول‌های اضافی',
    icon: <Cpu className="w-6 h-6" />,
    plans: [
      { id: 'm1', name: 'هارد اضافه ۵۰ گیگ SSD', specs: ['NVMe'], price: 100000, period: 'ماهانه' },
      { id: 'm2', name: 'هارد اضافه ۱۰۰ گیگ SSD', specs: ['NVMe'], price: 180000, period: 'ماهانه' },
      { id: 'm3', name: 'رم اضافه ۲ گیگ', specs: ['DDR4'], price: 80000, period: 'ماهانه' },
      { id: 'm4', name: 'رم اضافه ۴ گیگ', specs: ['DDR4'], price: 150000, period: 'ماهانه' },
      { id: 'm5', name: 'آی‌پی اضافه', specs: ['IPv4 اختصاصی'], price: 50000, period: 'ماهانه' },
      { id: 'm6', name: 'پردازنده اضافه ۱ هسته', specs: ['vCPU'], price: 120000, period: 'ماهانه' },
      { id: 'm7', name: 'فضای بکاپ ۵۰ گیگ', specs: ['بکاپ روزانه'], price: 60000, period: 'ماهانه' },
      { id: 'm8', name: 'فضای بکاپ ۱۰۰ گیگ', specs: ['بکاپ روزانه'], price: 100000, period: 'ماهانه' },
      { id: 'm9', name: 'پهنای باند اضافه ۱۰۰ گیگ', specs: ['بین‌الملل'], price: 50000, period: 'یکبار' },
      { id: 'm10', name: 'ترافیک داخلی ۱ ترا', specs: ['ایران'], price: 30000, period: 'یکبار' },
    ]
  },
  // === SUPPORT ===
  'order-support': {
    title: 'پشتیبانی تخصصی',
    icon: <Users className="w-6 h-6" />,
    plans: [
      { id: 's1', name: 'مدیریت سرور', specs: ['پشتیبانی ۲۴/۷', 'مانیتورینگ', 'به‌روزرسانی'], price: 500000, period: 'ماهانه', popular: true },
      { id: 's2', name: 'پشتیبانی اضطراری', specs: ['پاسخ‌دهی فوری', 'حل مشکل بحرانی'], price: 300000, period: 'یکبار' },
      { id: 's3', name: 'مشاوره تخصصی', specs: ['۱ ساعت مشاوره', 'معماری و بهینه‌سازی'], price: 200000, period: 'یکبار' },
    ]
  },
};

// Map sub-category IDs to their parent category data
const getDataForCategory = (category: string) => {
  // Direct match
  if (categoryData[category]) return categoryData[category];
  
  // For domain sub-items, show filtered domain page
  if (category.startsWith('order-domain-')) {
    const ext = category.replace('order-domain-', '').replace(/-/g, '.');
    const domainData = categoryData['order-domain'];
    const filtered = domainData.plans.filter(p => p.name.toLowerCase().includes(ext));
    if (filtered.length > 0) {
      return { ...domainData, title: `دامنه .${ext}`, plans: filtered };
    }
    return domainData;
  }
  
  return { title: 'سفارش سرویس', icon: <Settings className="w-6 h-6" />, plans: [] };
};

const ServiceOrderPage: React.FC<ServiceOrderPageProps> = ({ category, onBack, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular'>('popular');
  
  // Use dedicated VPS order page for main VPS and hourly categories
  const isVpsOrder = category === 'order-vps' || category === 'order-vps-hourly';
  
  if (isVpsOrder) {
    return (
      <VpsOrderPage 
        onBack={onBack} 
        onAddToCart={onAddToCart} 
        initialMode={category === 'order-vps-hourly' ? 'hourly' : 'virtual'} 
      />
    );
  }
  
  const data = getDataForCategory(category);
  const isDomain = category.startsWith('order-domain');
  
  const filteredPlans = data.plans
    .filter(plan => plan.name.includes(searchQuery) || plan.specs.some(s => s.includes(searchQuery)))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  const handleOrder = (plan: PlanItem) => {
    toast({
      title: "افزودن به سبد خرید",
      description: `${plan.name} با موفقیت به سبد خرید اضافه شد.`,
    });
    if (onAddToCart) {
      onAddToCart(plan);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              بازگشت
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white">
              {data.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">سفارش {data.title}</h1>
              <p className="text-muted-foreground text-sm">
                {toPersianDigits(filteredPlans.length.toString())} پلن موجود
              </p>
            </div>
          </div>
        </div>
      </div>




      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجوی پلن..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={sortBy === 'popular' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('popular')}>محبوب‌ترین</Button>
              <Button variant={sortBy === 'price-asc' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('price-asc')}>ارزان‌ترین</Button>
              <Button variant={sortBy === 'price-desc' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('price-desc')}>گران‌ترین</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className={`relative overflow-hidden hover:shadow-lg transition-shadow ${plan.popular ? 'border-primary border-2' : ''}`}>
            {plan.popular && (
              <div className="absolute top-0 left-0 bg-primary text-white text-xs px-3 py-1 rounded-br-lg">
                محبوب
              </div>
            )}
            {plan.discount && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                {toPersianDigits(plan.discount.toString())}٪ تخفیف
              </div>
            )}
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {isDomain ? (
                  <span>دامنه <span dir="ltr" className="inline-block">{plan.name}</span></span>
                ) : plan.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plan.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  {plan.price > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-primary">{toPersianDigits(plan.price.toLocaleString())}</span>
                      <span className="text-sm text-muted-foreground mr-1">تومان / {plan.period}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-primary">قیمت متغیر</span>
                  )}
                </div>
              </div>
              <Button className="w-full gap-2" onClick={() => handleOrder(plan)}>
                <ShoppingCart className="w-4 h-4" />
                سفارش
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">پلنی یافت نشد</h3>
            <p className="text-muted-foreground">عبارت جستجو را تغییر دهید</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceOrderPage;


import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import DevelopmentMessage from './DevelopmentMessage';
import ProfilePage from './ProfilePage';
import TicketsPage from './TicketsPage';
import WalletPage from './WalletPage';
import ServicesPage from './ServicesPage';
import DownloadsPage from './DownloadsPage';
import ServiceCalculator from './ServiceCalculator';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// داده‌های منوی سایدبار
const sidebarItems = [
  { id: 'dashboard', label: 'داشبورد', icon: 'LayoutDashboard' },
  { id: 'servers', label: 'سرورهای مجازی', icon: 'Server' },
  { id: 'dedicated', label: 'سرورهای اختصاصی', icon: 'HardDrive' },
  { id: 'domains', label: 'دامنه‌ها', icon: 'Globe' },
  { id: 'hosting', label: 'هاستینگ', icon: 'Database' },
  { id: 'cloud', label: 'سرور ابری', icon: 'Cloud' },
  { id: 'calculator', label: 'محاسبه هزینه', icon: 'Calculator' },
  { id: 'tickets', label: 'تیکت‌ها', icon: 'TicketCheck' },
  { id: 'invoices', label: 'فاکتورها', icon: 'Receipt' },
  { id: 'transactions', label: 'تراکنش‌ها', icon: 'History' },
  { id: 'wallet', label: 'کیف پول', icon: 'Wallet' },
  { id: 'downloads', label: 'دانلودها', icon: 'Download' },
  { id: 'profile', label: 'پروفایل', icon: 'User' },
  { id: 'settings', label: 'تنظیمات', icon: 'Settings' },
];

// دسته‌بندی خدمات
const serviceCategories = [
  { 
    title: 'خدمات میزبانی وب',
    services: [
      { name: 'هاست لینوکس', link: '/hosting?type=linux' },
      { name: 'هاست ویندوز', link: '/hosting?type=windows' },
      { name: 'سرور مجازی', link: '/vps' },
      { name: 'سرور اختصاصی', link: '/dedicated' },
      { name: 'سرور ابری', link: '/cloud' },
    ]
  },
  {
    title: 'خدمات دامنه',
    services: [
      { name: 'ثبت دامنه', link: '/domain' },
      { name: 'انتقال دامنه', link: '/domain/transfer' },
      { name: 'تمدید دامنه', link: '/domain/renew' },
    ]
  },
  {
    title: 'خدمات امنیتی',
    services: [
      { name: 'گواهی SSL', link: '/ssl' },
      { name: 'آنتی ویروس', link: '/security/antivirus' },
      { name: 'فایروال', link: '/security/firewall' },
      { name: 'بکاپ گیری', link: '/security/backup' },
    ]
  },
  {
    title: 'خدمات شبکه',
    services: [
      { name: 'IP اختصاصی', link: '/network/ip' },
      { name: 'VPN سازمانی', link: '/network/vpn' },
      { name: 'ترافیک اضافه', link: '/network/traffic' },
      { name: 'CDN', link: '/network/cdn' },
    ]
  },
  {
    title: 'سایر خدمات',
    services: [
      { name: 'فروش سخت‌افزار', link: '/hardware' },
      { name: 'طراحی سایت', link: '/webdesign' },
      { name: 'سئو و بهینه‌سازی', link: '/seo' },
      { name: 'مشاوره IT', link: '/consulting' },
    ]
  },
];

// اطلاعات تماس
const contactInfo = {
  phone: "09335732119",
  email: "info@novinvds.ir",
  supportEmails: {
    sales: "sales@novinvds.ir",
    vps: "vps@novinvds.ir",
    dedicated: "dedicated@novinvds.ir",
    hosting: "hosting@novinvds.ir",
    domain: "domain@novinvds.ir",
    network: "network@novinvds.ir",
    support: "support@novinvds.ir"
  }
};

const UserPanelLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [whmcsStatus, setWhmcsStatus] = useState('connected'); // connected, disconnected, connecting
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // اتصال به WHMCS در زمان بارگذاری
    // این بخش در حالت واقعی با استفاده از API به WHMCS متصل می‌شود
    const timer = setTimeout(() => {
      setWhmcsStatus('connected');
      toast({
        title: "اتصال به WHMCS برقرار شد",
        description: "اطلاعات سرویس‌ها و فاکتورهای شما با موفقیت بارگذاری شد.",
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  // نمایش پیام برای سرویس‌های در دست توسعه
  const showDevelopmentToast = (feature: string) => {
    toast({
      title: "در دست توسعه",
      description: `بخش ${feature} در حال توسعه است و به زودی راه‌اندازی می‌شود.`,
      duration: 3000,
    });
  };
  
  // بازگشت به صفحه اصلی
  const handleReturnToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        items={sidebarItems}
        onHomeClick={handleReturnToHome}
      />
      
      <div className="flex-1">
        <Header 
          activeTab={activeTab} 
          sidebarItems={sidebarItems} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {whmcsStatus === 'connecting' && (
          <Alert className="m-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>در حال اتصال به WHMCS</AlertTitle>
            <AlertDescription>
              لطفاً صبر کنید، در حال برقراری ارتباط با سیستم مدیریت مشتریان هستیم...
            </AlertDescription>
          </Alert>
        )}
        
        {whmcsStatus === 'disconnected' && (
          <Alert variant="destructive" className="m-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطا در اتصال به WHMCS</AlertTitle>
            <AlertDescription>
              اتصال به سیستم مدیریت مشتریان با مشکل مواجه شد. لطفاً صفحه را مجدداً بارگذاری کنید یا با پشتیبانی تماس بگیرید.
            </AlertDescription>
          </Alert>
        )}
        
        <main className="p-6">
          {activeTab === 'dashboard' ? (
            <Dashboard serviceCategories={serviceCategories} />
          ) : activeTab === 'profile' ? (
            <ProfilePage />
          ) : activeTab === 'tickets' ? (
            <TicketsPage />
          ) : activeTab === 'wallet' ? (
            <WalletPage />
          ) : activeTab === 'downloads' ? (
            <DownloadsPage />
          ) : activeTab === 'calculator' ? (
            <ServiceCalculator />
          ) : activeTab === 'servers' || activeTab === 'dedicated' || activeTab === 'hosting' || activeTab === 'domains' || activeTab === 'cloud' ? (
            <ServicesPage serviceType={activeTab} />
          ) : (
            <DevelopmentMessage />
          )}
        </main>
        
        {/* فوتر پنل کاربری */}
        <footer className="bg-white border-t p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {serviceCategories.map((category, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-3">{category.title}</h4>
                <ul className="space-y-2">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex}>
                      <a 
                        href={service.link} 
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          showDevelopmentToast(service.name);
                        }}
                      >
                        {service.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t text-center text-gray-500">
            <p>تمام حقوق برای نوین وی دی اس محفوظ است © {new Date().getFullYear()}</p>
            <div className="mt-2 flex justify-center space-x-4 space-x-reverse">
              <a 
                href={`tel:${contactInfo.phone}`} 
                className="hover:text-blue-600 transition-colors"
              >
                {contactInfo.phone}
              </a>
              <span>|</span>
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="hover:text-blue-600 transition-colors"
              >
                {contactInfo.email}
              </a>
              <span>|</span>
              <span className="text-green-600">وضعیت WHMCS: {whmcsStatus === 'connected' ? 'متصل' : whmcsStatus === 'connecting' ? 'در حال اتصال' : 'قطع'}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserPanelLayout;

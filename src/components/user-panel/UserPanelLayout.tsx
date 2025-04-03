import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import DevelopmentMessage from './DevelopmentMessage';
import ProfilePage from './ProfilePage';
import TicketsPage from './TicketsPage';
import TicketDetail from './TicketDetail';
import WalletPage from './WalletPage';
import ServicesPage from './ServicesPage';
import DownloadsPage from './DownloadsPage';
import ServiceCalculator from './ServiceCalculator';
import InvoicesPage from './InvoicesPage';
import TransactionsPage from './TransactionsPage';
import CreateTicketForm from './CreateTicketForm';
import NotificationsPage from './NotificationsPage';
import ImportantAnnouncementsPage from './ImportantAnnouncementsPage';
import SettingsPage from './SettingsPage';
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
  { id: 'notifications', label: 'اعلان‌ها', icon: 'Bell' },
  { id: 'announcements', label: 'اطلاعیه‌های مهم', icon: 'MegaphoneIcon' }
];

// دسته‌بندی خدمات
const serviceCategories = [
  { 
    title: 'خدمات میزبانی وب',
    services: [
      { name: 'هاست لینوکس ECO', link: '/hosting?type=linux-eco' },
      { name: 'هاست لینوکس PRO', link: '/hosting?type=linux-pro' },
      { name: 'هاست لینوکس ایران', link: '/hosting?type=linux-iran' },
      { name: 'هاست وردپرس', link: '/hosting?type=wordpress' },
      { name: 'هاست ویندوز', link: '/hosting?type=windows' },
    ]
  },
  {
    title: 'سرور مجازی',
    services: [
      { name: 'سرور مجازی لینوکس', link: '/vps?type=linux' },
      { name: 'سرور مجازی ویندوز', link: '/vps?type=windows' },
      { name: 'سرور مجازی لینوکس ایران', link: '/vps?type=linux-iran' },
      { name: 'سرور مجازی ویندوز ایران', link: '/vps?type=windows-iran' },
      { name: 'سرور مجازی روزانه', link: '/vps?type=daily' },
    ]
  },
  {
    title: 'سرور اختصاصی',
    services: [
      { name: 'سرور اختصاصی ایران', link: '/dedicated?location=iran' },
      { name: 'سرور اختصاصی اروپا', link: '/dedicated?location=europe' },
      { name: 'سرور اختصاصی آمریکا', link: '/dedicated?location=america' },
      { name: 'سرور اختصاصی آسیا', link: '/dedicated?location=asia' },
    ]
  },
  {
    title: 'خدمات دامنه',
    services: [
      { name: 'ثبت دامنه', link: '/domain/register' },
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

// تنظیمات سیستم‌عامل های قابل انتخاب
const operatingSystems = {
  linux: [
    { id: 'ubuntu_22_04', name: 'Ubuntu 22.04 LTS' },
    { id: 'ubuntu_20_04', name: 'Ubuntu 20.04 LTS' },
    { id: 'ubuntu_18_04', name: 'Ubuntu 18.04 LTS' },
    { id: 'debian_11', name: 'Debian 11' },
    { id: 'debian_10', name: 'Debian 10' },
    { id: 'centos_9_stream', name: 'CentOS Stream 9' },
    { id: 'centos_8_stream', name: 'CentOS Stream 8' },
    { id: 'almalinux_9', name: 'AlmaLinux 9' },
    { id: 'almalinux_8', name: 'AlmaLinux 8' },
    { id: 'rocky_9', name: 'Rocky Linux 9' },
    { id: 'rocky_8', name: 'Rocky Linux 8' },
    { id: 'fedora_37', name: 'Fedora 37' }
  ],
  windows: [
    { id: 'win_2022', name: 'Windows Server 2022' },
    { id: 'win_2019', name: 'Windows Server 2019' },
    { id: 'win_2016', name: 'Windows Server 2016' },
    { id: 'win_10', name: 'Windows 10' },
    { id: 'win_11', name: 'Windows 11' }
  ],
  specialized: [
    { id: 'proxmox_7', name: 'Proxmox VE 7' },
    { id: 'proxmox_8', name: 'Proxmox VE 8' },
    { id: 'esxi_7', name: 'VMware ESXi 7.0' },
    { id: 'esxi_8', name: 'VMware ESXi 8.0' },
    { id: 'mikrotik_7', name: 'MikroTik RouterOS 7' },
    { id: 'freebsd_13', name: 'FreeBSD 13' },
    { id: 'openbsd_7', name: 'OpenBSD 7.3' },
    { id: 'pfsense_2_6', name: 'pfSense 2.6' }
  ]
};

const UserPanelLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [whmcsStatus, setWhmcsStatus] = useState('connected'); // connected, disconnected, connecting
  const [showWhcmsNotification, setShowWhcmsNotification] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(3600); // 1 hour in seconds
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set page direction to RTL and language to Farsi
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
    document.body.classList.add('rtl');
    
    // اتصال به WHMCS در زمان بارگذاری
    // این بخش در حالت واقعی با استفاده از API به WHMCS متصل می‌شود
    setWhmcsStatus('connecting');
    const timer = setTimeout(() => {
      setWhmcsStatus('connected');
      // فقط در صورت تغییر وضعیت اعلان نمایش داده شود
      setShowWhcmsNotification(true);
      setTimeout(() => {
        setShowWhcmsNotification(false);
      }, 3000);
    }, 2000);
    
    // Setup session timer countdown
    const sessionTimer = setInterval(() => {
      setSessionTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(sessionTimer);
          toast({
            title: "پایان نشست",
            description: "نشست شما به پایان رسیده است. لطفاً مجدداً وارد شوید.",
            variant: "destructive"
          });
          // در حالت واقعی، کاربر به صفحه ورود هدایت می‌شود
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(
        registration => {
          console.log('PWA service worker registered successfully:', registration);
        },
        error => {
          console.error('PWA service worker registration failed:', error);
        }
      );
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(sessionTimer);
      
      // پاکسازی تنظیمات RTL هنگام خروج از کامپوننت
      document.body.classList.remove('rtl');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    };
  }, [toast]);
  
  // تابع تبدیل ثانیه به فرمت زمان
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // نمایش پیام برای سرویس‌های در دست توسعه
  const showDevelopmentToast = (feature: string) => {
    toast({
      title: "در دست توسعه",
      description: `بخش ${feature} در حال توسعه است و به زودی راه‌اندازی می‌شود.`,
      duration: 3000,
    });
  };
  
  // هدایت به صفحه سفارش سرویس
  const navigateToServiceOrderPage = (serviceLink: string) => {
    // حالت‌های خاص مسیریابی
    if (serviceLink === '/tickets/new') {
      setShowCreateTicket(true);
      setShowNotifications(false);
      setShowAnnouncements(false);
      setActiveTicketId(null);
      setActiveTab('tickets');
      return;
    }
    
    if (serviceLink === '/tickets') {
      setActiveTab('tickets');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      return;
    }
    
    if (serviceLink === '/invoices') {
      setActiveTab('invoices');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      return;
    }
    
    // مسیریابی برای انواع سرور
    if (serviceLink.startsWith('/vps')) {
      setActiveTab('servers');
      setShowNotifications(false);
      setShowCreateTicket(false);
      setShowAnnouncements(false);
      setActiveTicketId(null);
      return;
    }
    
    if (serviceLink.startsWith('/dedicated')) {
      setActiveTab('dedicated');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      return;
    }
    
    if (serviceLink.startsWith('/hosting')) {
      setActiveTab('hosting');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      return;
    }
    
    if (serviceLink.startsWith('/domain')) {
      setActiveTab('domains');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      return;
    }
    
    if (serviceLink.startsWith('/cloud')) {
      setActiveTab('cloud');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      return;
    }
    
    // برای لینک‌های دیگر، به صفحه خارجی هدایت کنید
    navigate(serviceLink);
  };
  
  // بازگشت به صفحه اصلی
  const handleReturnToHome = () => {
    navigate('/');
  };
  
  // Handle sidebar item click
  const handleSidebarItemClick = (itemId: string) => {
    setActiveTab(itemId);
    
    // Reset all panel states when changing tabs
    setShowNotifications(itemId === 'notifications');
    setShowAnnouncements(itemId === 'announcements');
    setShowCreateTicket(false);
    setActiveTicketId(null);
  };
  
  // Handle ticket creation
  const handleTicketSubmit = () => {
    setShowCreateTicket(false);
    setActiveTab('tickets');
    
    toast({
      title: "تیکت ارسال شد",
      description: "تیکت شما با موفقیت ثبت شد و در اسرع وقت به آن رسیدگی خواهد شد.",
      duration: 3000,
    });
  };
  
  // View all notifications
  const handleViewAllNotifications = () => {
    setShowNotifications(true);
    setShowAnnouncements(false);
    setShowCreateTicket(false);
    setActiveTicketId(null);
    setActiveTab('notifications');
  };
  
  // View important announcements
  const handleViewImportantAnnouncements = () => {
    setShowAnnouncements(true);
    setShowNotifications(false);
    setShowCreateTicket(false);
    setActiveTicketId(null);
    setActiveTab('announcements');
  };
  
  // Get ticket departments
  const getTicketDepartments = () => [
    { value: 'technical', label: 'پشتیبانی فنی' },
    { value: 'billing', label: 'امور مالی' },
    { value: 'sales', label: 'فروش' },
    { value: 'general', label: 'عمومی' },
  ];

  // Close ticket detail and go back to tickets page
  const handleCloseTicketDetail = () => {
    setActiveTicketId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex user-panel-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleSidebarItemClick} 
        items={sidebarItems}
        onHomeClick={handleReturnToHome}
        className=""
      />
      
      <div className="flex-1 user-panel-content">
        <Header 
          activeTab={activeTab} 
          sidebarItems={sidebarItems} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sessionTimeLeft={formatTime(sessionTimeLeft)}
          onSidebarItemClick={handleSidebarItemClick}
          onViewAllNotifications={handleViewAllNotifications}
          onViewImportantAnnouncements={handleViewImportantAnnouncements}
        />
        
        {showWhcmsNotification && whmcsStatus === 'connected' && (
          <Alert className="m-6">
            <AlertDescription>
              اطلاعات سرویس‌ها و فاکتورهای شما با موفقیت بارگذاری شد.
            </AlertDescription>
          </Alert>
        )}
        
        {whmcsStatus === 'connecting' && (
          <Alert className="m-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>در حال بارگذاری اطلاعات</AlertTitle>
            <AlertDescription>
              لطفاً صبر کنید، در حال بارگذاری اطلاعات هستیم...
            </AlertDescription>
          </Alert>
        )}
        
        {whmcsStatus === 'disconnected' && (
          <Alert variant="destructive" className="m-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطا در بارگذاری اطلاعات</AlertTitle>
            <AlertDescription>
              بارگذاری اطلاعات با مشکل مواجه شد. لطفاً صفحه را مجدداً بارگذاری کنید یا با پشتیبانی تماس بگیرید.
            </AlertDescription>
          </Alert>
        )}
        
        <main className="p-6">
          {showCreateTicket ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-6">ارسال تیکت جدید</h2>
              <CreateTicketForm 
                onSubmit={handleTicketSubmit} 
                departments={getTicketDepartments()} 
              />
            </div>
          ) : showNotifications || activeTab === 'notifications' ? (
            <NotificationsPage />
          ) : showAnnouncements || activeTab === 'announcements' ? (
            <ImportantAnnouncementsPage />
          ) : activeTicketId ? (
            <TicketDetail 
              ticketId={activeTicketId} 
              onClose={handleCloseTicketDetail} 
            />
          ) : activeTab === 'dashboard' ? (
            <Dashboard 
              serviceCategories={serviceCategories} 
              navigateToServiceOrderPage={navigateToServiceOrderPage}
              operatingSystems={operatingSystems}
            />
          ) : activeTab === 'profile' ? (
            <ProfilePage />
          ) : activeTab === 'settings' ? (
            <SettingsPage />
          ) : activeTab === 'tickets' ? (
            <TicketsPage 
              onViewTicket={(ticketId) => {
                setActiveTicketId(ticketId);
              }} 
              onCreateNewTicket={() => {
                setShowCreateTicket(true);
              }}
            />
          ) : activeTab === 'wallet' ? (
            <WalletPage />
          ) : activeTab === 'downloads' ? (
            <DownloadsPage />
          ) : activeTab === 'calculator' ? (
            <ServiceCalculator operatingSystems={operatingSystems} />
          ) : activeTab === 'invoices' ? (
            <InvoicesPage />
          ) : activeTab === 'transactions' ? (
            <TransactionsPage />
          ) : activeTab === 'servers' || activeTab === 'dedicated' || activeTab === 'hosting' || activeTab === 'domains' || activeTab === 'cloud' ? (
            <ServicesPage 
              serviceType={activeTab} 
              operatingSystems={operatingSystems}
            />
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
                          navigateToServiceOrderPage(service.link);
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
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserPanelLayout;

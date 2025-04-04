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
import DomainManagement from './DomainManagement';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
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
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);
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
  
  // Handle redirection to service order page
  const navigateToServiceOrderPage = (serviceLink: string) => {
    // Handle special navigation cases
    if (serviceLink === '/tickets/new') {
      setShowCreateTicket(true);
      setShowNotifications(false);
      setShowAnnouncements(false);
      setActiveTicketId(null);
      setActiveDomainId(null);
      setActiveTab('tickets');
      return;
    }
    
    if (serviceLink === '/tickets') {
      setActiveTab('tickets');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      setActiveDomainId(null);
      return;
    }
    
    if (serviceLink === '/invoices') {
      setActiveTab('invoices');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      setActiveDomainId(null);
      return;
    }
    
    // Handle domain management navigation
    if (serviceLink.startsWith('/manage/domain/')) {
      const domainId = serviceLink.split('/').pop() || '';
      setActiveTab('domains');
      setActiveDomainId(domainId);
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      return;
    }
    
    // Handle service type navigation
    if (serviceLink.startsWith('/vps')) {
      setActiveTab('servers');
      setShowNotifications(false);
      setShowCreateTicket(false);
      setShowAnnouncements(false);
      setActiveTicketId(null);
      setActiveDomainId(null);
      return;
    }
    
    if (serviceLink.startsWith('/dedicated')) {
      setActiveTab('dedicated');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      setActiveDomainId(null);
      return;
    }
    
    if (serviceLink.startsWith('/hosting')) {
      setActiveTab('hosting');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      setActiveDomainId(null);
      return;
    }
    
    if (serviceLink.startsWith('/domain')) {
      setActiveTab('domains');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      setActiveDomainId(null);
      return;
    }
    
    if (serviceLink.startsWith('/cloud')) {
      setActiveTab('cloud');
      setShowNotifications(false);
      setShowAnnouncements(false);
      setShowCreateTicket(false);
      setActiveTicketId(null);
      setActiveDomainId(null);
      return;
    }
    
    // For other links, navigate to external page
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
    setActiveDomainId(null);
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
    setActiveDomainId(null);
    setActiveTab('notifications');
  };
  
  // View important announcements
  const handleViewImportantAnnouncements = () => {
    setShowAnnouncements(true);
    setShowNotifications(false);
    setShowCreateTicket(false);
    setActiveTicketId(null);
    setActiveDomainId(null);
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

  // Handle close domain management
  const handleCloseDomainManagement = () => {
    setActiveDomainId(null);
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
          ) : activeDomainId ? (
            <DomainManagement 
              domainId={activeDomainId}
              onClose={handleCloseDomainManagement}
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
              onManage={(serviceType, id) => {
                if (serviceType === 'domain') {
                  setActiveDomainId(id);
                } else {
                  navigateToServiceOrderPage(`/manage/${serviceType}/${id}`);
                }
              }}
              onReset={(serviceType, id) => {
                toast({
                  title: "تأیید ریست سرور",
                  description: `آیا از ریست سرور ${id} اطمینان دارید؟`,
                  action: (
                    <div className="flex gap-2 mt-2">
                      <Button variant="destructive" onClick={() => {
                        toast({
                          title: "در حال ریست سرور",
                          description: `لطفاً صبر کنید... سرور ${id} در حال ریست است.`
                        });
                        
                        // Simulate reset process
                        setTimeout(() => {
                          toast({
                            title: "ریست سرور انجام شد",
                            description: `ریست سرور ${id} با موفقیت انجام شد.`,
                            action: (
                              <Button variant="outline" onClick={() => toast({ title: "دریافت شد" })}>
                                تأیید
                              </Button>
                            )
                          });
                        }, 3000);
                      }}>
                        تأیید
                      </Button>
                      <Button variant="outline" onClick={() => toast({ title: "عملیات لغو شد" })}>
                        انصراف
                      </Button>
                    </div>
                  )
                });
              }}
              onRenew={(serviceType, id) => {
                toast({
                  title: "تمدید سرویس",
                  description: `درخواست تمدید سرویس ${id} ثبت شد و به صفحه پرداخت هدایت می‌شوید.`,
                  action: (
                    <Button variant="outline" onClick={() => navigateToServiceOrderPage(`/renew/${serviceType}/${id}`)}>
                      ادامه
                    </Button>
                  )
                });
              }}
            />
          ) : (
            <DevelopmentMessage />
          )}
        </main>
        
        {/* فوتر پنل کاربری - بازطراحی شده و گرافیکال‌تر */}
        <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {serviceCategories.map((category, index) => (
                <div key={index} className="group">
                  <h4 className="text-lg font-semibold mb-4 text-blue-300 relative flex items-center">
                    {category.title}
                    <span className="w-0 group-hover:w-full absolute bottom-0 left-0 h-0.5 bg-blue-400 transition-all duration-300"></span>
                  </h4>
                  <ul className="space-y-3">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="transition-transform hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
                        <a 
                          href="#" 
                          className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                          onClick={(e) => {
                            e.preventDefault();
                            // اینجا به صفحه سفارش مستقیم هدایت می‌شود به جای پنل سرویس‌های موجود
                            navigateToServiceOrderPage(service.link);
                          }}
                        >
                          <span className="text-blue-400">•</span>
                          {service.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-300">راه‌های ارتباطی</h4>
                <div className="flex flex-col md:flex-row gap-4 text-gray-300">
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {contactInfo.phone}
                  </a>
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="text-left rtl:text-right">
                <div className="flex justify-start rtl:justify-end items-center gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.104 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.013 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772c-.5.509-1.104.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.013-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 01-1.772-1.153 4.903 4.903 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.903 4.903 0 011.153-1.772A4.903 4.903 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.9

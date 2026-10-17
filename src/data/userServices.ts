// Central mock data source for user's services and domains.
// Mirrors what is shown in the Dashboard so "سرویس‌های من" and "دامنه‌ها"
// contain the same items as the dashboard cards (ParsVDS-style unified view).

export type ServiceKind = 'vps' | 'dedicated' | 'hourly' | 'cloud' | 'hosting' | 'multilocation';

export interface UnifiedService {
  id: string;
  kind: ServiceKind;
  name: string;
  productName: string;
  groupName: string;
  status: 'active' | 'suspended' | 'expired' | 'expiring' | 'pending';
  ip?: string;
  ipLocations?: Record<string, string>;
  capacities?: { cpuModel?: string; cores?: number; ramGB?: number; diskGB?: number; networkMbps?: number };
  // cpu/ram/disk/bandwidth are sample usage percentages, never capacities.
  ips?: string[];
  os?: string;
  panel?: string;
  location?: string;
  plan: string;
  cpu?: number;
  ram?: number;
  disk?: number;
  bandwidth?: number;
  diskLimit?: number;
  bandwidthLimit?: number;
  registrationDate: string;
  expiry: string;
  amount: number;
  currency: 'IRR';
  billingCycle: 'Monthly' | 'Quarterly' | 'Annually' | 'Hourly';
  hourlyCost?: string;
}

export interface UnifiedDomain {
  id: string;
  domain: string;
  registrar: string;
  status: 'active' | 'expiring' | 'expired' | 'pending';
  registrationDate: string;
  expiry: string;
  autoRenew: boolean;
  privacyProtection: boolean;
  dnsManagement: boolean;
  emailForwarding: boolean;
  nameservers: string[];
  recurringAmount: number;
}

export const userServices: UnifiedService[] = [
  {
    id: 'VPS-1234', kind: 'vps', name: 'سرور لینوکس ۱', productName: 'VPS Linux Professional', groupName: 'سرورهای مجازی',
    status: 'active', ip: '192.0.2.10', os: 'Ubuntu 22.04', location: 'دیتاسنتر آسیاتک',
    plan: 'پلن حرفه‌ای', cpu: 45, ram: 62, disk: 35, bandwidth: 20,
    registrationDate: '1402/03/15', expiry: '1403/06/15', amount: 2500000, currency: 'IRR', billingCycle: 'Monthly',
  },
  {
    id: 'VPS-5678', kind: 'vps', name: 'سرور ویندوز ۱', productName: 'VPS Windows VIP', groupName: 'سرورهای مجازی',
    status: 'active', ip: '192.0.2.11', os: 'Windows Server 2022', location: 'Frankfurt, Germany',
    plan: 'پلن ویژه', cpu: 78, ram: 85, disk: 60, bandwidth: 45,
    registrationDate: '1402/05/20', expiry: '1403/08/20', amount: 3800000, currency: 'IRR', billingCycle: 'Monthly',
  },
  {
    id: 'DED-9012', kind: 'dedicated', name: 'سرور اختصاصی ایران', productName: 'E3-1270v6 Iran', groupName: 'سرورهای اختصاصی',
    status: 'active', ip: '198.51.100.10', os: 'CentOS 8', location: 'دیتاسنتر پارس‌آنلاین',
    plan: 'E3-1270v6', cpu: 30, ram: 40, disk: 25, bandwidth: 15,
    registrationDate: '1402/06/01', expiry: '1403/09/01', amount: 12500000, currency: 'IRR', billingCycle: 'Monthly',
  },
  {
    id: 'HRL-3456', kind: 'hourly', name: 'سرور ساعتی ۱', productName: 'VPS Hourly Advanced', groupName: 'سرورهای ساعتی',
    status: 'active', ip: '198.51.100.20', os: 'Debian 12', location: 'Amsterdam, NL',
    plan: 'ساعتی پیشرفته', cpu: 55, ram: 70, disk: 40, bandwidth: 30,
    registrationDate: '1402/06/15', expiry: 'فعال', amount: 2500, currency: 'IRR', billingCycle: 'Hourly',
    hourlyCost: '۲۵۰ تومان/ساعت',
  },
  {
    id: 'CLD-2211', kind: 'cloud', name: 'سرور ابری تجاری', productName: 'Cloud Business', groupName: 'سرورهای ابری',
    status: 'active', ip: '192.0.2.30', os: 'Ubuntu 24.04', location: 'دیتاسنتر افرانت',
    plan: 'ابری تجاری', cpu: 22, ram: 38, disk: 18, bandwidth: 12,
    registrationDate: '1402/04/10', expiry: '1403/07/10', amount: 1800000, currency: 'IRR', billingCycle: 'Monthly',
  },
  {
    id: 'MUL-7745', kind: 'multilocation', name: 'سرور مولتی‌لوکیشن', productName: 'Multi-Location VPS', groupName: 'سرورهای مولتی‌لوکیشن',
    status: 'active', ips: ['198.51.100.20', '203.0.113.20', '2001:db8::20'], os: 'Ubuntu 22.04',
    plan: 'مولتی حرفه‌ای', cpu: 40, ram: 55, disk: 30, bandwidth: 25,
    registrationDate: '1402/05/01', expiry: '1403/08/01', amount: 4500000, currency: 'IRR', billingCycle: 'Monthly',
  },
  {
    id: 'HOST-7890', kind: 'hosting', name: 'example.ir', productName: 'هاست لینوکس PRO', groupName: 'هاستینگ اشتراکی',
    status: 'active', panel: 'cPanel', location: 'دیتاسنتر آسیاتک',
    plan: 'پکیج حرفه‌ای', disk: 25, bandwidth: 15, diskLimit: 50, bandwidthLimit: 500,
    registrationDate: '1402/06/01', expiry: '1403/12/01', amount: 850000, currency: 'IRR', billingCycle: 'Annually',
  },
  {
    id: 'HOST-1122', kind: 'hosting', name: 'mysite.com', productName: 'هاست لینوکس VIP', groupName: 'هاستینگ اشتراکی',
    status: 'active', panel: 'DirectAdmin', location: 'Frankfurt, Germany',
    plan: 'پکیج VIP', disk: 60, bandwidth: 40, diskLimit: 100, bandwidthLimit: 1000,
    registrationDate: '1402/04/15', expiry: '1403/10/15', amount: 1450000, currency: 'IRR', billingCycle: 'Annually',
  },
];

export const userDomains: UnifiedDomain[] = [
  {
    id: 'example.ir', domain: 'example.ir', registrar: 'ایرنیک',
    status: 'active', registrationDate: '1402/03/20', expiry: '1403/11/20',
    autoRenew: true, privacyProtection: false, dnsManagement: true, emailForwarding: true,
    nameservers: ['ns1.novinvds.com', 'ns2.novinvds.com'], recurringAmount: 55000,
  },
  {
    id: 'mysite.com', domain: 'mysite.com', registrar: 'بین‌المللی',
    status: 'active', registrationDate: '1403/03/05', expiry: '1404/03/05',
    autoRenew: true, privacyProtection: true, dnsManagement: true, emailForwarding: false,
    nameservers: ['ns1.novinvds.com', 'ns2.novinvds.com'], recurringAmount: 320000,
  },
  {
    id: 'shop.ir', domain: 'shop.ir', registrar: 'ایرنیک',
    status: 'expiring', registrationDate: '1401/05/01', expiry: '1403/05/01',
    autoRenew: false, privacyProtection: false, dnsManagement: true, emailForwarding: false,
    nameservers: ['ns1.novinvds.com', 'ns2.novinvds.com'], recurringAmount: 55000,
  },
  {
    id: 'novinvds.dev', domain: 'novinvds.dev', registrar: 'بین‌المللی',
    status: 'active', registrationDate: '1402/09/01', expiry: '1403/09/01',
    autoRenew: true, privacyProtection: true, dnsManagement: true, emailForwarding: false,
    nameservers: ['ns1.novinvds.com', 'ns2.novinvds.com'], recurringAmount: 850000,
  },
];

export const getServicesByKinds = (kinds: ServiceKind[]) =>
  userServices.filter((s) => kinds.includes(s.kind));

export const getServiceById = (id: string) => userServices.find((s) => s.id === id);
export const getDomainById = (id: string) => userDomains.find((d) => d.id === id);

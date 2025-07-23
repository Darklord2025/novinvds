
export interface WHMCSService {
  id: string;
  productId: string;
  domain: string;
  productName: string;
  groupName: string;
  status: 'Active' | 'Suspended' | 'Terminated' | 'Pending';
  billingCycle: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually' | 'Biennially' | 'Triennially';
  nextDueDate: string;
  amount: number;
  currency: 'IRR' | 'USD' | 'EUR';
  registrationDate: string;
  paymentMethod: string;
  dedicatedIp?: string;
  diskUsage?: number;
  diskLimit?: number;
  bandwidthUsage?: number;
  bandwidthLimit?: number;
  serverName?: string;
  serverLocation?: string;
  os?: string;
  controlPanel?: string;
  autoSuspend: boolean;
  overrideSuspend: boolean;
  overage: number;
  packageName: string;
  username?: string;
  password?: string;
  notes?: string;
  subscriptionId?: string;
  moduleCommand?: string;
  lastAction?: string;
  actionDate?: string;
}

export interface WHMCSInvoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  date: string;
  dueDate: string;
  status: 'Unpaid' | 'Paid' | 'Cancelled' | 'Refunded' | 'Collections' | 'Payment Pending';
  subtotal: number;
  tax: number;
  credit: number;
  total: number;
  balance: number;
  currency: 'IRR' | 'USD' | 'EUR';
  gatewayId?: string;
  paymentMethod?: string;
  notes?: string;
  items: WHMCSInvoiceItem[];
  transactions: WHMCSTransaction[];
}

export interface WHMCSInvoiceItem {
  id: string;
  type: 'hosting' | 'domain' | 'addon' | 'setup' | 'other';
  description: string;
  amount: number;
  taxed: boolean;
  relatedService?: string;
}

export interface WHMCSTransaction {
  id: string;
  userId: string;
  currency: 'IRR' | 'USD' | 'EUR';
  gateway: string;
  date: string;
  description: string;
  amountIn: number;
  amountOut: number;
  fees: number;
  rate: number;
  transactionId: string;
  invoiceId?: string;
  refundId?: string;
}

export interface WHMCSTicket {
  id: string;
  tid: string;
  userId: string;
  contactId?: string;
  name: string;
  email: string;
  cc?: string;
  department: string;
  subject: string;
  status: 'Open' | 'Answered' | 'Customer-Reply' | 'Closed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High';
  admin?: string;
  date: string;
  lastReply: string;
  flag?: number;
  service?: string;
  merged?: boolean;
  replies: WHMCSTicketReply[];
}

export interface WHMCSTicketReply {
  id: string;
  ticketId: string;
  userId?: string;
  contactId?: string;
  name: string;
  email: string;
  date: string;
  message: string;
  admin: boolean;
  attachment?: string;
  rating?: number;
}

export interface WHMCSDomain {
  id: string;
  userId: string;
  domain: string;
  registrar: string;
  registrationDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Cancelled' | 'Fraud' | 'Pending' | 'Pending Transfer' | 'Redemption';
  nextDueDate: string;
  subscriptionId: string;
  promoid?: string;
  recurringAmount: number;
  paymentMethod: string;
  autoRenew: boolean;
  dnsManagement: boolean;
  emailForwarding: boolean;
  idProtection: boolean;
  notes?: string;
  nameservers: string[];
  contactDetails: {
    registrant: WHMCSContact;
    admin: WHMCSContact;
    tech: WHMCSContact;
    billing: WHMCSContact;
  };
}

export interface WHMCSContact {
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phoneNumber: string;
  taxId?: string;
}

// Mock data for WHMCS services
export const mockWHMCSServices: WHMCSService[] = [
  {
    id: 'svc_001',
    productId: 'prod_vps_starter',
    domain: 'mysite.com',
    productName: 'VPS Starter - Iran',
    groupName: 'Virtual Private Servers',
    status: 'Active',
    billingCycle: 'Monthly',
    nextDueDate: '2024-02-15',
    amount: 25000,
    currency: 'IRR',
    registrationDate: '2024-01-15',
    paymentMethod: 'Credit Card',
    dedicatedIp: '185.143.232.10',
    diskUsage: 15,
    diskLimit: 50,
    bandwidthUsage: 120,
    bandwidthLimit: 1000,
    serverName: 'Tehran-VPS-01',
    serverLocation: 'Tehran, Iran',
    os: 'Ubuntu 22.04',
    controlPanel: 'cPanel',
    autoSuspend: true,
    overrideSuspend: false,
    overage: 0,
    packageName: 'VPS Starter',
    username: 'vps001',
    subscriptionId: 'sub_001',
    moduleCommand: 'create',
    lastAction: 'Created',
    actionDate: '2024-01-15'
  },
  {
    id: 'svc_002',
    productId: 'prod_hosting_premium',
    domain: 'example.ir',
    productName: 'Premium Hosting - Iran',
    groupName: 'Shared Hosting',
    status: 'Active',
    billingCycle: 'Annually',
    nextDueDate: '2024-12-01',
    amount: 180000,
    currency: 'IRR',
    registrationDate: '2023-12-01',
    paymentMethod: 'Bank Transfer',
    diskUsage: 5,
    diskLimit: 20,
    bandwidthUsage: 80,
    bandwidthLimit: 500,
    serverName: 'Shared-01',
    serverLocation: 'Tehran, Iran',
    controlPanel: 'cPanel',
    autoSuspend: true,
    overrideSuspend: false,
    overage: 0,
    packageName: 'Premium Hosting',
    username: 'host001',
    subscriptionId: 'sub_002',
    moduleCommand: 'create',
    lastAction: 'Created',
    actionDate: '2023-12-01'
  }
];

export const mockWHMCSInvoices: WHMCSInvoice[] = [
  {
    id: 'inv_001',
    invoiceNumber: '2024-001',
    userId: 'user_001',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'Unpaid',
    subtotal: 25000,
    tax: 2250,
    credit: 0,
    total: 27250,
    balance: 27250,
    currency: 'IRR',
    gatewayId: 'gateway_001',
    paymentMethod: 'Credit Card',
    items: [
      {
        id: 'item_001',
        type: 'hosting',
        description: 'VPS Starter - Monthly',
        amount: 25000,
        taxed: true,
        relatedService: 'svc_001'
      }
    ],
    transactions: []
  }
];

export const mockWHMCSTickets: WHMCSTicket[] = [
  {
    id: 'ticket_001',
    tid: 'T001',
    userId: 'user_001',
    name: 'احمد محمدی',
    email: 'ahmad@example.com',
    department: 'Technical Support',
    subject: 'مشکل در اتصال به سرور',
    status: 'Open',
    priority: 'High',
    admin: 'Support Team',
    date: '2024-01-20',
    lastReply: '2024-01-20',
    service: 'svc_001',
    merged: false,
    replies: [
      {
        id: 'reply_001',
        ticketId: 'ticket_001',
        userId: 'user_001',
        name: 'احمد محمدی',
        email: 'ahmad@example.com',
        date: '2024-01-20',
        message: 'سلام، من نمی‌توانم به سرور خود متصل شوم. لطفاً راهنمایی کنید.',
        admin: false
      }
    ]
  }
];

export const mockWHMCSDomains: WHMCSDomain[] = [
  {
    id: 'dom_001',
    userId: 'user_001',
    domain: 'example.ir',
    registrar: 'NIC Iran',
    registrationDate: '2024-01-01',
    expiryDate: '2025-01-01',
    status: 'Active',
    nextDueDate: '2024-12-01',
    subscriptionId: 'sub_dom_001',
    recurringAmount: 15000,
    paymentMethod: 'Credit Card',
    autoRenew: true,
    dnsManagement: true,
    emailForwarding: true,
    idProtection: false,
    nameservers: ['ns1.novinvds.com', 'ns2.novinvds.com'],
    contactDetails: {
      registrant: {
        firstName: 'احمد',
        lastName: 'محمدی',
        email: 'ahmad@example.com',
        address1: 'خیابان ولیعصر',
        city: 'تهران',
        state: 'تهران',
        postcode: '1234567890',
        country: 'IR',
        phoneNumber: '+98-21-12345678'
      },
      admin: {
        firstName: 'احمد',
        lastName: 'محمدی',
        email: 'ahmad@example.com',
        address1: 'خیابان ولیعصر',
        city: 'تهران',
        state: 'تهران',
        postcode: '1234567890',
        country: 'IR',
        phoneNumber: '+98-21-12345678'
      },
      tech: {
        firstName: 'احمد',
        lastName: 'محمدی',
        email: 'ahmad@example.com',
        address1: 'خیابان ولیعصر',
        city: 'تهران',
        state: 'تهران',
        postcode: '1234567890',
        country: 'IR',
        phoneNumber: '+98-21-12345678'
      },
      billing: {
        firstName: 'احمد',
        lastName: 'محمدی',
        email: 'ahmad@example.com',
        address1: 'خیابان ولیعصر',
        city: 'تهران',
        state: 'تهران',
        postcode: '1234567890',
        country: 'IR',
        phoneNumber: '+98-21-12345678'
      }
    }
  }
];

import {hostingPlans} from "@/data/hostingCatalog";
import { userServices, userDomains } from "@/data/userServices";
import { emptySnapshot, withVat, type PanelSnapshot } from "./panel-model";
export function previewSnapshot(): PanelSnapshot {
  const s = emptySnapshot();
  const today=new Date(),start=new Date(Date.UTC(today.getUTCFullYear(),today.getUTCMonth(),1)),end=new Date(Date.UTC(today.getUTCFullYear(),today.getUTCMonth()+1,1));
  s.services = userServices.map(service=>{if(service.kind!=='hosting')return service;const p=hostingPlans[service.id==='HOST-7890'?0:1],country=service.id==='HOST-7890'?'ir':'de';return {...service,hostingPlanId:p.id,country,datacenterId:country==='ir'?'ir-asiatech':'de-fsn',amount:p[country==='ir'?'ir':'eu']*10,billingCycle:'Monthly',plan:p.fa,billingPeriodStart:start.toISOString(),billingPeriodEnd:end.toISOString(),expiry:end.toISOString().slice(0,10)};});
  s.domains = userDomains;
  s.profile = {
    ...s.profile,
    name: "کاربر نمونه",
    email: "preview@example.com",
    username: "preview",
  };
  s.notifications = [
    {
      id: "sample-notice",
      title: {
        fa: "به پیش‌نمایش پنل خوش آمدید",
        en: "Welcome to the panel preview",
      },
      body: {
        fa: "این اعلان فقط برای بررسی طراحی، جهت متن و زبان است.",
        en: "This notification is a design, direction and language fixture.",
      },
      at: "2026-10-18T10:00:00Z",
      read: false,
      important: true,
    },
  ];
  s.affiliate = {
    code: "DEMO1001",
    referrals: 0,
    clicks: 0,
    commissions: [],
    terms:
      "نمونه طراحی — شرایط واقعی همکاری ارائه نشده / Design preview — real program terms unavailable",
  };
  s.tickets = [
    {
      id: "1001",
      number: 1001,
      subject: "بررسی سرویس مجازی",
      department: "technical",
      status: "answered",
      createdAt: "2026-10-16T10:00:00Z",
      messages: [
        {
          sender: "customer",
          body: "لطفاً وضعیت سرویس نمونه بررسی شود.",
          at: "2026-10-16T10:00:00Z",
        },
        {
          sender: "support",
          body: "این پیام فقط نمونه‌ای از طراحی گفتگو است.",
          at: "2026-10-16T10:20:00Z",
        },
      ],
    },
    {
      id: "1002",
      number: 1002,
      subject: "سؤال درباره صورتحساب",
      department: "billing",
      status: "open",
      createdAt: "2026-10-17T12:00:00Z",
      messages: [],
    },
  ];
  s.ledger = [
    {
      id: "1",
      at: "2026-10-01T09:00:00Z",
      category: "deposit",
      description: "واریز نمونه",
      amountToman: 2500000,
      status: "confirmed",
      originalCurrency: "TOMAN",
      originalAmount: 2500000,
      rateToman: 1,
    },
    {
      id: "2",
      at: "2026-10-10T09:00:00Z",
      category: "vps",
      description: "تمدید سرور مجازی",
      amountToman: -450000,
      status: "confirmed",
    },
    {
      id: "3",
      at: "2026-10-12T09:00:00Z",
      category: "hosting",
      description: "میزبانی وب",
      amountToman: -180000,
      status: "confirmed",
    },
    {
      id: "4",
      at: "2026-10-14T09:00:00Z",
      category: "domain",
      description: "دامنه",
      amountToman: -320000,
      status: "confirmed",
    },
  ];
  s.invoices = ["Paid", "Unpaid", "Overdue", "Cancelled"].map((status, i) => ({
    id: "INV-" + (1001 + i),
    issueDate: "2026-10-10",
    dueDate: "2026-10-20",
    status: status as any,
    currency: "TOMAN",
    demo: true,
    items: [
      { name: "سرویس نمونه " + (i + 1), quantity: 1, price: 250000 * (i + 1) },
    ],
    tax: withVat(250000 * (i + 1)).tax,
  }));
  return s;
}

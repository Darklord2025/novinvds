import { InvoiceData, InvoiceStatus } from '@/lib/billing';
import { userServices } from './userServices';
const statuses: InvoiceStatus[] = ['Paid', 'Unpaid', 'Overdue', 'Cancelled'];
// Explicit catalog examples, not fetched account invoices or evidence of payments.
export const sampleInvoices: InvoiceData[] = userServices.map((s, index) => ({
  id: `DEMO-INV-${index + 1}`, issueDate: s.registrationDate, dueDate: s.expiry,
  currency: s.currency, status: statuses[index % statuses.length], demo: true,
  items: [{ name: s.productName, description: s.id, quantity: 1, price: s.amount, period: s.billingCycle }],
}));

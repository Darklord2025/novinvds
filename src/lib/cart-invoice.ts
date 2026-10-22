import type { CartItem } from '@/contexts/CartContext';
import type { InvoiceData } from './billing';
import {withVat} from './panel-model';

export function cartInvoice(items: CartItem[], issueDate:string,reward?:{percent:number;capToman:number}|null):InvoiceData {
  const subtotal=items.reduce((sum,item)=>sum+item.price*item.quantity,0),discount=reward?Math.min(reward.capToman,Math.floor(subtotal*reward.percent/100)):0;
  return {
    id: 'DRAFT', issueDate, dueDate: '', status: 'Unpaid', currency: 'TOMAN',
    proforma: true, demo: true,
    tax:withVat(subtotal-discount).tax,discount,
    items: items.map(item => ({
      name: item.name, description: item.specs?.join(' · '),
      price: item.price, quantity: item.quantity, period: item.period,
    })),
  };
}

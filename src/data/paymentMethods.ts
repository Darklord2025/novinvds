import { CreditCard, Landmark, Coins, Wallet } from 'lucide-react';
export const paymentMethods = [
  { id: 'card', fa: 'کارت بانکی', en: 'Bank card', icon: CreditCard },
  { id: 'card2card', fa: 'کارت به کارت', en: 'Card-to-card', icon: CreditCard },
  { id: 'transfer', fa: 'حواله بانکی', en: 'Bank transfer', icon: Landmark },
  { id: 'crypto', fa: 'ارز دیجیتال', en: 'Cryptocurrency', icon: Coins },
  { id: 'perfectmoney', fa: 'Perfect Money', en: 'Perfect Money', icon: Wallet },
] as const;
export type PaymentMethod = typeof paymentMethods[number]['id'];

export const cycleLabel = (cycle: string, fa: boolean) =>
  ({
    OneTime: ["یک‌بار پرداخت", "One-time"],
    Hourly: ["ساعتی", "Hourly"],
    Daily: ["روزانه", "Daily"],
    Monthly: ["ماهانه", "Monthly"],
    Quarterly: ["سه‌ماهه", "Quarterly"],
    Annually: ["سالانه", "Annually"],
  })[cycle]?.[fa ? 0 : 1] || cycle;

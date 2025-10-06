// Number formatting utilities for multi-language support

export const formatNumber = (num: number, language: 'fa' | 'en' = 'fa'): string => {
  if (language === 'fa') {
    return num.toLocaleString('fa-IR');
  }
  return num.toLocaleString('en-US');
};

export const formatCurrency = (amount: number, currency: string = 'IRR', language: 'fa' | 'en' = 'fa'): string => {
  const formattedNumber = formatNumber(amount, language);
  
  if (language === 'fa') {
    if (currency === 'IRR') {
      return `${formattedNumber} تومان`;
    } else if (currency === 'USD') {
      return `${formattedNumber} دلار`;
    }
  } else {
    if (currency === 'IRR') {
      return `${formattedNumber} Toman`;
    } else if (currency === 'USD') {
      return `$${formattedNumber}`;
    }
  }
  
  return formattedNumber;
};

export const formatDate = (dateString: string, language: 'fa' | 'en' = 'fa'): string => {
  const date = new Date(dateString);
  
  if (language === 'fa') {
    return new Intl.DateTimeFormat('fa-IR').format(date);
  }
  return new Intl.DateTimeFormat('en-US').format(date);
};

export const formatBytes = (bytes: number, language: 'fa' | 'en' = 'fa'): string => {
  const gb = (bytes / 1024).toFixed(1);
  const formattedNumber = formatNumber(parseFloat(gb), language);
  
  return language === 'fa' ? `${formattedNumber} گیگابایت` : `${formattedNumber} GB`;
};

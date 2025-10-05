/**
 * Convert English digits to Persian digits
 */
export const toPersianDigits = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

/**
 * Convert Persian digits to English digits
 */
export const toEnglishDigits = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let result = str;
  persianDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, 'g'), String(index));
  });
  return result;
};

/**
 * Format number based on language
 */
export const formatNumber = (num: number, language: 'fa' | 'en' = 'fa'): string => {
  const formatted = new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(num);
  return language === 'fa' ? toPersianDigits(formatted) : formatted;
};

/**
 * Format currency based on language
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'IRR', 
  language: 'fa' | 'en' = 'fa'
): string => {
  const formatted = new Intl.NumberFormat(
    language === 'fa' ? 'fa-IR' : 'en-US',
    {
      style: 'currency',
      currency: currency === 'IRR' ? 'IRR' : 'USD',
      minimumFractionDigits: 0
    }
  ).format(amount);
  
  return language === 'fa' ? toPersianDigits(formatted) : formatted;
};

/**
 * Format date based on language
 */
export const formatDate = (date: Date | string, language: 'fa' | 'en' = 'fa'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formatted = new Intl.DateTimeFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(dateObj);
  return language === 'fa' ? toPersianDigits(formatted) : formatted;
};

// Format numbers for Persian (Farsi) or English based on language
export const formatNumber = (num: number | string, lang: 'fa' | 'en' = 'fa'): string => {
  const numStr = num.toString();
  
  if (lang === 'fa') {
    // Convert to Persian digits
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return numStr.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  }
  
  return numStr;
};

// Format currency for Persian or English
export const formatCurrency = (amount: number | string, lang: 'fa' | 'en' = 'fa'): string => {
  const numStr = amount.toString().replace(/,/g, '');
  const num = parseFloat(numStr);
  
  if (isNaN(num)) return amount.toString();
  
  // Add thousand separators
  const formatted = num.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US');
  
  return formatted;
};

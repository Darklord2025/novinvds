import React from 'react';
import { Twitter, Instagram, Send, Phone } from 'lucide-react';

const PanelFooter: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile: single compact centered row */}
        <div className="flex md:hidden flex-col items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-primary transition-colors" aria-label="تلگرام">
              <Send className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="اینستاگرام">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="توییتر">
              <Twitter className="h-4 w-4" />
            </a>
            <span className="w-px h-3 bg-border" />
            <a href="tel:02191000000" className="flex items-center gap-1 hover:text-primary transition-colors" dir="ltr">
              <Phone className="h-3.5 w-3.5" />
              <span>021-91000000</span>
            </a>
          </div>
          <p className="text-[11px] text-center leading-4">
            © ۱۴۰۵ نوین وی‌دی‌اس — تمامی حقوق محفوظ است
          </p>
        </div>

        {/* Desktop: original two-column layout */}
        <div className="hidden md:flex justify-between items-center text-sm text-muted-foreground">
          <p>© نوین وی‌دی‌اس ۱۴۰۵ — تمامی حقوق محفوظ است</p>
          <div className="flex items-center gap-4">
            <a href="tel:02191000000" className="flex items-center gap-1.5 hover:text-primary transition-colors" dir="ltr">
              <Phone className="h-4 w-4" />
              <span>021-91000000</span>
            </a>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-primary transition-colors" aria-label="تلگرام"><Send className="h-4 w-4" /></a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="اینستاگرام"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="توییتر"><Twitter className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PanelFooter;

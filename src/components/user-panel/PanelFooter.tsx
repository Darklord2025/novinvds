import {localizedDigits} from '@/lib/localized-number';
import {usePanelCopy} from './PanelPrimitives';
export default function PanelFooter(){const {s,fa}=usePanelCopy();return <footer className="border-t bg-card px-5 py-2 text-xs text-muted-foreground shrink-0 flex justify-between gap-3"><span>© {localizedDigits(new Date().getFullYear(),fa)} NovinVDS</span><span>{s('خدمات میزبانی و زیرساخت','Hosting & infrastructure')}</span></footer>;}

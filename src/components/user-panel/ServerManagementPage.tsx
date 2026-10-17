import { useState } from 'react';
import { userServices } from '@/data/userServices';
import { useLanguage } from '@/contexts/LanguageContext';
import { localize } from '@/lib/billing';
import { Button } from '@/components/ui/button';
import ServerManagementDetail from './ServerManagementDetail';
export default function ServerManagementPage() {
 const [id,setId]=useState<string | null>(null);const {language}=useLanguage();const fa=language==='fa';
 if(id) return <ServerManagementDetail key={id} serverId={id} onBack={()=>setId(null)} />;
 return <div className="space-y-4"><h1 className="text-xl font-bold">{fa ? 'مدیریت سرورها' : 'Server management'}</h1><p className="text-sm text-muted-foreground">{fa ? 'کاتالوگ نمونه / تأییدنشده' : 'Demo / unverified catalog'}</p><div className="grid sm:grid-cols-2 gap-3">{userServices.filter(s=>s.kind!=='hosting').map(s=><Button key={s.id} variant="outline" className="h-auto min-h-12 whitespace-normal" onClick={()=>setId(s.id)}>{localize(s.id+' · '+s.name,fa)}</Button>)}</div></div>;
}

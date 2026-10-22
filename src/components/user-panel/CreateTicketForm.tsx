import React,{useState} from 'react';
import {usePanelData} from '@/contexts/PanelDataContext';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {PanelHeading,usePanelCopy} from './PanelPrimitives';
export default function CreateTicketForm({onSubmit,onCancel}:{onSubmit:(...args:any[])=>void;onCancel:()=>void}){
 const {createTicket}=usePanelData();const {s}=usePanelCopy();const [subject,setSubject]=useState(''),[department,setDepartment]=useState('technical'),[body,setBody]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 return <form className="space-y-5 max-w-3xl" onSubmit={async e=>{e.preventDefault();setBusy(true);try{await createTicket(subject,department,body);onSubmit();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}}><PanelHeading title={s('ثبت تیکت جدید','Open a support ticket')}/><div className="rounded-2xl border bg-card p-6 space-y-5"><Label>{s('موضوع','Subject')}<Input required value={subject} onChange={e=>setSubject(e.target.value)}/></Label><Label>{s('بخش مربوطه','Department')}<select className="block w-full rounded-lg border p-3 bg-card mt-2" value={department} onChange={e=>setDepartment(e.target.value)}>{[['technical',s('پشتیبانی فنی','Technical support')],['billing',s('امور مالی','Billing')],['sales',s('فروش','Sales')],['security',s('امنیت و بازیابی حساب','Security & account recovery')]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></Label><Label>{s('متن درخواست','Your message')}<Textarea required rows={7} value={body} onChange={e=>setBody(e.target.value)}/></Label><p className="text-xs text-muted-foreground">{s('رمز عبور، کد یک‌بارمصرف یا کلید محرمانه را در تیکت نفرستید.','Do not include passwords, one-time codes or secret keys.')}</p><div className="flex gap-3"><Button disabled={busy||!subject.trim()||!body.trim()}>{s('ثبت تیکت','Create ticket')}</Button><Button type="button" variant="outline" onClick={onCancel}>{s('انصراف','Cancel')}</Button></div><p role="alert">{error}</p></div></form>;
}

-- Only trusted, verified settlements earn commission. Approval and contract rate
-- are private operator-managed data; no client can credit itself or a sponsor.
create function public.panel_credit_affiliate() returns trigger language plpgsql security definer set search_path=public as $$
declare sponsor uuid; program jsonb; rate numeric; invoice jsonb; subtotal bigint; credit bigint; entry uuid;
begin
 select sponsor_id into sponsor from panel_referrals where referred_id=new.user_id;
 if sponsor is null or sponsor=new.user_id then return new;end if;
 select data into program from panel_affiliates where user_id=sponsor for update;
 if program->>'approved' is distinct from 'true' or coalesce(program->>'ratePercent','') !~ '^([0-9]+)(\.[0-9]+)?$' then return new;end if;
 rate:=(program->>'ratePercent')::numeric;
 if rate<=0 or rate>100 then return new;end if;
 select data into invoice from panel_invoices where id=new.invoice_id and user_id=new.user_id;
 -- Funding a wallet is not a service purchase.
 if invoice is null or invoice->>'kind' in ('deposit','wallet-topup') then return new;end if;
 select sum((i->>'price')::bigint*(i->>'quantity')::bigint) into subtotal from jsonb_array_elements(invoice->'items') i;
 credit:=floor(greatest(0,subtotal-coalesce((invoice->>'discount')::bigint,0))*rate/100.0);
 if credit<=0 then return new;end if;
 insert into panel_ledger(user_id,category,description,amount_toman,status,provider_reference)
 values(sponsor,'affiliate','Affiliate commission / پورسانت معرفی: '||new.invoice_id,credit,'confirmed','affiliate:'||new.invoice_id)
 on conflict(provider_reference) do nothing returning id into entry;
 if entry is not null then
  update panel_affiliates set data=data||jsonb_build_object('commissions',coalesce(data->'commissions','[]'::jsonb)||jsonb_build_array(jsonb_build_object('id',new.invoice_id,'at',new.settled_at,'amountToman',credit,'status','paid'))) where user_id=sponsor;
 end if;
 return new;
end $$;
revoke all on function public.panel_credit_affiliate() from public,anon,authenticated;
create trigger panel_settlement_affiliate after insert on public.panel_payment_settlements for each row execute function public.panel_credit_affiliate();

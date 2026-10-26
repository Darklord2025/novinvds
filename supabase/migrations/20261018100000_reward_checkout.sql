-- A coupon can reserve one invoice. Retries return that invoice rather than
-- creating several payable discounted invoices. All entry points are private.
alter table public.panel_referral_rewards add column reserved_invoice uuid references public.panel_invoices(id);
create function public.panel_create_order_invoice(p_user uuid,p_invoice jsonb,p_reward_code text default null) returns uuid language plpgsql security definer set search_path=public as $$
declare reward panel_referral_rewards;invoice_id uuid;subtotal bigint;discount bigint:=0;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_user::text,0));
 if p_invoice->>'currency'<>'TOMAN' or p_invoice->>'status'<>'Unpaid' then raise exception 'Invalid invoice';end if;
 select sum((i->>'price')::bigint*(i->>'quantity')::bigint) into subtotal from jsonb_array_elements(p_invoice->'items') i;
 if subtotal is null or subtotal<=0 then raise exception 'Invalid invoice amount';end if;
 if p_reward_code is not null then
  select * into reward from panel_referral_rewards where user_id=p_user and code=p_reward_code for update;
  if not found or reward.redeemed_invoice is not null or reward.expires_at<=now() then raise exception 'Coupon unavailable';end if;
  if reward.reserved_invoice is not null then return reward.reserved_invoice;end if;
  discount:=least(reward.cap_toman,floor(subtotal*reward.percent/100.0)::bigint);
 end if;
 invoice_id:=gen_random_uuid();
 insert into panel_invoices(id,user_id,data) values(invoice_id,p_user,p_invoice||jsonb_build_object('id',invoice_id,'discount',discount,'tax',round((subtotal-discount)*0.1),'rewardCode',p_reward_code));
 if p_reward_code is not null then update panel_referral_rewards set reserved_invoice=invoice_id where user_id=p_user;end if;
 return invoice_id;
end $$;
revoke all on function public.panel_create_order_invoice(uuid,jsonb,text) from public,anon,authenticated;
grant execute on function public.panel_create_order_invoice(uuid,jsonb,text) to service_role;

-- Called by the trusted billing adapter only AFTER gateway verification. The
-- browser cannot settle invoices, supply verified payments or earn the reward.
create table public.panel_payment_settlements(payment_reference text primary key,user_id uuid not null references auth.users(id),invoice_id uuid not null references public.panel_invoices(id),amount_toman bigint not null check(amount_toman>0),settled_at timestamptz not null default now());
alter table public.panel_payment_settlements enable row level security;
revoke all on public.panel_payment_settlements from anon,authenticated;
grant all on public.panel_payment_settlements to service_role;
create function public.panel_settle_invoice(p_user uuid,p_invoice uuid,p_amount bigint,p_payment_reference text) returns void language plpgsql security definer set search_path=public as $$
declare i panel_invoices;existing panel_payment_settlements;subtotal bigint;expected bigint;
begin
 if length(trim(p_payment_reference))<8 then raise exception 'Verified payment reference required';end if;
 perform pg_advisory_xact_lock(hashtextextended(p_user::text,0));
 select * into existing from panel_payment_settlements where payment_reference=p_payment_reference;
 if found then
  if existing.user_id<>p_user or existing.invoice_id<>p_invoice or existing.amount_toman<>p_amount then raise exception 'Payment reference already used';end if;
  return;
 end if;
 select * into i from panel_invoices where id=p_invoice and user_id=p_user for update;
 if not found or i.data->>'status' not in ('Unpaid','Overdue') or i.data->>'currency'<>'TOMAN' then raise exception 'Invoice not payable';end if;
 select sum((line->>'price')::bigint*(line->>'quantity')::bigint) into subtotal from jsonb_array_elements(i.data->'items') line;
 expected:=subtotal+coalesce((i.data->>'tax')::bigint,0)-coalesce((i.data->>'discount')::bigint,0);
 if p_amount<>expected or p_amount<=0 then raise exception 'Payment amount mismatch';end if;
 if i.data->>'rewardCode' is not null then
  update panel_referral_rewards set redeemed_invoice=i.id where user_id=p_user and code=i.data->>'rewardCode' and reserved_invoice=i.id and redeemed_invoice is null and expires_at>now();
  if not found then raise exception 'Coupon unavailable';end if;
 end if;
 insert into panel_payment_settlements values(p_payment_reference,p_user,p_invoice,p_amount,now());
 update panel_invoices set settled_toman=p_amount,data=data||jsonb_build_object('status','Paid','proforma',false,'paidAt',now()) where id=i.id;
end $$;
revoke all on function public.panel_settle_invoice(uuid,uuid,bigint,text) from public,anon,authenticated;
grant execute on function public.panel_settle_invoice(uuid,uuid,bigint,text) to service_role;

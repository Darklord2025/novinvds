-- Account-owned records. Payment settlement and inventory are server-managed.
create table public.panel_profiles(user_id uuid primary key references auth.users(id) on delete cascade,data jsonb not null default '{}');
create table public.panel_preferences(user_id uuid primary key references auth.users(id) on delete cascade,data jsonb not null default '{}');
create table public.panel_tickets(id uuid primary key default gen_random_uuid(),number bigint generated always as identity (start with 1001) unique,user_id uuid not null references auth.users(id) on delete cascade,subject text not null,department text not null,status text not null default 'open' check(status in ('open','answered','closed')),created_at timestamptz not null default now(),messages jsonb not null default '[]');
create index on public.panel_tickets(user_id,created_at desc);
create table public.panel_ledger(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,at timestamptz not null default now(),category text not null,description text not null,amount_toman bigint not null,status text not null check(status in ('confirmed','pending')),original_currency text,original_amount numeric,rate_toman numeric,provider_reference text unique);
create index on public.panel_ledger(user_id,at desc);
create table public.panel_invoices(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,data jsonb not null,created_at timestamptz not null default now());
create table public.panel_inventory(id text primary key,user_id uuid not null references auth.users(id) on delete cascade,kind text not null check(kind in ('vps','dedicated','hosting','cloud','hourly','multilocation','license','ssl','network','addon','support','domain')),data jsonb not null,verified_at timestamptz not null);
create index on public.panel_inventory(user_id);
create table public.panel_requests(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,kind text not null,data jsonb not null,status text not null default 'pending',created_at timestamptz not null default now());
create table public.panel_bank_accounts(user_id uuid primary key references auth.users(id) on delete cascade,iban text not null,owner_name text not null,verified_at timestamptz not null);
create table public.panel_conversion_quotes(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,currency text not null,amount numeric not null check(amount>0),method text not null,rate_toman numeric not null check(rate_toman>0),amount_toman bigint not null check(amount_toman>0),provider_reference text not null,expires_at timestamptz not null);
create table public.panel_security(user_id uuid primary key references auth.users(id) on delete cascade,email_enabled boolean not null default false);
create table public.panel_email_challenges(user_id uuid primary key references auth.users(id) on delete cascade,session_id uuid not null,purpose text not null check(purpose in ('login','enable','disable')),code_hash text not null,expires_at timestamptz not null,attempts integer not null default 0,sent_at timestamptz not null default now());
create table public.panel_email_grants(user_id uuid not null references auth.users(id) on delete cascade,session_id uuid not null,expires_at timestamptz not null,primary key(user_id,session_id));
create table public.panel_recovery_limits(key_hash text primary key,requested_at timestamptz not null default now());

create function public.panel_rate_limit(p_key text,p_seconds integer) returns boolean language plpgsql security definer set search_path=public as $$
begin
 insert into panel_recovery_limits(key_hash,requested_at) values(p_key,clock_timestamp()) on conflict(key_hash) do update set requested_at=excluded.requested_at where panel_recovery_limits.requested_at<clock_timestamp()-make_interval(secs=>p_seconds);
 return found;
end $$;
revoke all on function public.panel_rate_limit(text,integer) from public,anon,authenticated;
grant execute on function public.panel_rate_limit(text,integer) to service_role;
create function public.panel_find_user(p_email text) returns uuid language sql security definer set search_path=public as $$ select id from auth.users where lower(email)=lower(p_email) and email_confirmed_at is not null limit 1 $$;
revoke all on function public.panel_find_user(text) from public,anon,authenticated;
grant execute on function public.panel_find_user(text) to service_role;
grant all on public.panel_profiles,public.panel_preferences,public.panel_tickets,public.panel_ledger,public.panel_invoices,public.panel_inventory,public.panel_requests,public.panel_bank_accounts,public.panel_conversion_quotes,public.panel_security,public.panel_email_challenges,public.panel_email_grants,public.panel_recovery_limits to service_role;
grant usage,select on sequence public.panel_tickets_number_seq to service_role;

-- The server authenticates the JWT, then enforces native MFA and the email grant.
-- These tables are API-private: even an AAL1 JWT cannot bypass the edge guard.
do $$ declare table_name text; begin
 foreach table_name in array array['panel_profiles','panel_preferences','panel_tickets','panel_ledger','panel_invoices','panel_inventory','panel_requests','panel_bank_accounts','panel_conversion_quotes','panel_security','panel_email_challenges','panel_email_grants','panel_recovery_limits'] loop
 execute format('alter table public.%I enable row level security',table_name);
 execute format('revoke all on public.%I from anon, authenticated',table_name);
 end loop;
end $$;

create function public.panel_ticket_reply(p_user uuid,p_id uuid,p_body text) returns void language plpgsql security definer set search_path=public as $$
begin
 if length(trim(p_body)) not between 1 and 10000 then raise exception 'Invalid message';end if;
 update panel_tickets set status='open',messages=messages||jsonb_build_array(jsonb_build_object('body',p_body,'at',now(),'sender','customer')) where id=p_id and user_id=p_user and status<>'closed';
 if not found then raise exception 'Ticket unavailable or closed';end if;
end $$;
revoke all on function public.panel_ticket_reply(uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.panel_ticket_reply(uuid,uuid,text) to service_role;

-- Consumption and attempt counting happen under a row lock, preventing replay.
create function public.panel_consume_email_code(p_user uuid,p_session uuid,p_purpose text,p_hash text) returns boolean language plpgsql security definer set search_path=public as $$
declare c panel_email_challenges;
begin
 select * into c from panel_email_challenges where user_id=p_user for update;
 if not found or c.session_id<>p_session or c.purpose<>p_purpose or c.expires_at<=now() or c.attempts>=5 then return false;end if;
 if c.code_hash<>p_hash then update panel_email_challenges set attempts=attempts+1 where user_id=p_user;return false;end if;
 delete from panel_email_challenges where user_id=p_user;
 if p_purpose='enable' then insert into panel_security(user_id,email_enabled) values(p_user,true) on conflict(user_id) do update set email_enabled=true;
 elsif p_purpose='disable' then update panel_security set email_enabled=false where user_id=p_user;delete from panel_email_grants where user_id=p_user;
 end if;
 if p_purpose<>'disable' then insert into panel_email_grants(user_id,session_id,expires_at) values(p_user,p_session,now()+interval '1 hour') on conflict(user_id,session_id) do update set expires_at=excluded.expires_at;end if;
 return true;
end $$;
revoke all on function public.panel_consume_email_code(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.panel_consume_email_code(uuid,uuid,text,text) to service_role;

-- Reserve a withdrawal under a per-account lock. No client can debit or settle it.
create function public.panel_request_withdrawal(p_user uuid,p_amount bigint,p_data jsonb) returns uuid language plpgsql security definer set search_path=public as $$
declare available bigint;request_id uuid;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_user::text,0));
 select coalesce(sum(amount_toman),0) into available from panel_ledger where user_id=p_user and status='confirmed';
 available:=available-coalesce((select sum((data->>'amountToman')::bigint) from panel_requests where user_id=p_user and kind='withdraw' and status in ('pending','approved')),0);
 if p_amount<=0 or p_amount>available then raise exception 'Insufficient available funds';end if;
 insert into panel_requests(user_id,kind,data) values(p_user,'withdraw',p_data||jsonb_build_object('amountToman',p_amount)) returning id into request_id;
 return request_id;
end $$;
revoke all on function public.panel_request_withdrawal(uuid,bigint,jsonb) from public,anon,authenticated;
grant execute on function public.panel_request_withdrawal(uuid,bigint,jsonb) to service_role;

create function public.panel_official_request(p_user uuid,p_invoice uuid,p_profile jsonb) returns bigint language plpgsql security definer set search_path=public as $$
declare ticket_number bigint;
begin
 if not exists(select 1 from panel_invoices where user_id=p_user and id=p_invoice) then raise exception 'Invoice unavailable';end if;
 insert into panel_requests(user_id,kind,data) values(p_user,'official-invoice',jsonb_build_object('invoiceId',p_invoice,'profile',p_profile));
 insert into panel_tickets(user_id,subject,department,messages) values(p_user,'درخواست فاکتور رسمی / Official invoice: '||p_invoice,'billing',jsonb_build_array(jsonb_build_object('body','درخواست در امور مالی ثبت شد. اطلاعات هویتی فقط در پرونده درخواست محفوظ است. / Request registered with billing. Identity details remain in the private request.','at',now(),'sender','customer'))) returning number into ticket_number;
 return ticket_number;
end $$;
revoke all on function public.panel_official_request(uuid,uuid,jsonb) from public,anon,authenticated;
grant execute on function public.panel_official_request(uuid,uuid,jsonb) to service_role;

create table public.panel_affiliates(user_id uuid primary key references auth.users(id) on delete cascade,data jsonb not null);
alter table public.panel_affiliates enable row level security;
revoke all on public.panel_affiliates from anon,authenticated;
grant all on public.panel_affiliates to service_role;

alter table public.panel_tickets add column survey jsonb;
create unique index panel_one_conversion_review on public.panel_requests(user_id) where kind='account-conversion' and status in ('pending','approved');

create function public.panel_identity_request(p_user uuid,p_kind text,p_data jsonb) returns bigint language plpgsql security definer set search_path=public as $$
declare account_kind text;ticket_number bigint;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_user::text,0));
 select data->>'kind' into account_kind from panel_profiles where user_id=p_user;
 if p_kind not in ('account-conversion','representative-change') or p_kind='account-conversion' and account_kind='company' or p_kind='representative-change' and account_kind<>'company' then raise exception 'Invalid identity request';end if;
 if exists(select 1 from panel_requests where user_id=p_user and kind=p_kind and status='pending') then raise exception 'Identity review already pending';end if;
 insert into panel_requests(user_id,kind,data) values(p_user,p_kind,p_data);
 insert into panel_tickets(user_id,subject,department,messages) values(p_user,case p_kind when 'account-conversion' then 'تبدیل حساب حقوقی / Company conversion' else 'تغییر نماینده / Representative change' end,'security',jsonb_build_array(jsonb_build_object('body','درخواست در پرونده احراز ثبت شد؛ تغییر فقط پس از بررسی هویت و اختیار نمایندگی انجام می‌شود. / Verification request recorded; identity and authorization review is required.','at',now(),'sender','customer'))) returning number into ticket_number;
 return ticket_number;
end $$;
revoke all on function public.panel_identity_request(uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.panel_identity_request(uuid,text,jsonb) to service_role;

-- Support calls this only after reviewing private evidence. Customers cannot approve themselves.
create function public.panel_approve_identity_request(p_request uuid,p_evidence_reference text) returns void language plpgsql security definer set search_path=public as $$
declare r panel_requests;p panel_profiles;
begin
 if length(trim(p_evidence_reference))<10 then raise exception 'Identity review evidence required';end if;
 select * into r from panel_requests where id=p_request and status='pending' and kind in ('account-conversion','representative-change') for update;
 if not found then raise exception 'Pending request unavailable';end if;
 select * into p from panel_profiles where user_id=r.user_id for update;
 if r.kind='account-conversion' then
  if p.data->>'kind'='company' then raise exception 'Conversion already completed';end if;
  update panel_profiles set data=data||r.data||jsonb_build_object('kind','company','email',p.data->>'email','username',p.data->>'username') where user_id=r.user_id;
 else
  if p.data->>'kind'<>'company' then raise exception 'Company account required';end if;
  update panel_profiles set data=data||jsonb_build_object('name',r.data->>'name','representativeNationalId',r.data->>'nationalId') where user_id=r.user_id;
 end if;
 update panel_requests set status='approved',data=data||jsonb_build_object('reviewEvidenceReference',p_evidence_reference,'reviewedAt',now()) where id=r.id;
end $$;
revoke all on function public.panel_approve_identity_request(uuid,text) from public,anon,authenticated;
grant execute on function public.panel_approve_identity_request(uuid,text) to service_role;

alter table public.panel_invoices add column settled_toman bigint not null default 0 check(settled_toman>=0);
create table public.panel_referrals(referred_id uuid primary key references auth.users(id) on delete cascade,sponsor_id uuid not null references auth.users(id),created_at timestamptz not null default now(),check(referred_id<>sponsor_id));
create table public.panel_referral_rewards(user_id uuid primary key references auth.users(id) on delete cascade,code text not null unique,percent integer not null check(percent in (3,5,7,10)),cap_toman bigint not null default 100000,threshold_toman bigint not null default 1000000,created_at timestamptz not null default now(),expires_at timestamptz not null default now()+interval '30 days',redeemed_invoice uuid references public.panel_invoices(id));
alter table public.panel_referrals enable row level security;
alter table public.panel_referral_rewards enable row level security;
revoke all on public.panel_referrals,public.panel_referral_rewards from anon,authenticated;
grant all on public.panel_referrals,public.panel_referral_rewards to service_role;
create unique index panel_affiliate_codes on public.panel_affiliates((data->>'code'));

create function public.panel_record_referral() returns trigger language plpgsql security definer set search_path=public as $$
declare sponsor uuid;
begin
 select user_id into sponsor from panel_affiliates where data->>'code'=new.raw_user_meta_data->>'referral_code';
 if sponsor is not null and sponsor<>new.id then insert into panel_referrals(referred_id,sponsor_id) values(new.id,sponsor) on conflict do nothing;end if;
 return new;
end $$;
revoke all on function public.panel_record_referral() from public,anon,authenticated;
create trigger panel_signup_referral after insert on auth.users for each row execute function public.panel_record_referral();

create function public.panel_claim_referral_reward(p_user uuid,p_percent integer) returns panel_referral_rewards language plpgsql security definer set search_path=public as $$
declare result panel_referral_rewards;paid_total bigint;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_user::text,0));
 select * into result from panel_referral_rewards where user_id=p_user;if found then return result;end if;
 if not exists(select 1 from panel_referrals where referred_id=p_user) then raise exception 'A verified referral is required';end if;
 select coalesce(sum(settled_toman),0) into paid_total from panel_invoices where user_id=p_user and data->>'status'='Paid';
 if paid_total<1000000 then raise exception 'Verified purchase threshold has not been reached';end if;
 insert into panel_referral_rewards(user_id,code,percent) values(p_user,'NV-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,12)),p_percent) returning * into result;
 return result;
end $$;
revoke all on function public.panel_claim_referral_reward(uuid,integer) from public,anon,authenticated;
grant execute on function public.panel_claim_referral_reward(uuid,integer) to service_role;

create table public.panel_notifications(id uuid primary key default gen_random_uuid(),user_id uuid references auth.users(id) on delete cascade,title jsonb not null,body jsonb not null,important boolean not null default false,created_at timestamptz not null default now());
create table public.panel_notification_reads(user_id uuid not null references auth.users(id) on delete cascade,notification_id uuid not null references public.panel_notifications(id) on delete cascade,primary key(user_id,notification_id));
alter table public.panel_notifications enable row level security;
alter table public.panel_notification_reads enable row level security;
revoke all on public.panel_notifications,public.panel_notification_reads from anon,authenticated;
grant all on public.panel_notifications,public.panel_notification_reads to service_role;

-- Trial location preferences stay attached to the first account entitlement.
alter table public.panel_hosting_trials add column country text,add column datacenter_id text;
alter table public.panel_hosting_trials add constraint panel_trial_location_pair check((country is null and datacenter_id is null) or (country in ('ir','de','fi','fr','gb','pl','us','ca','sg','au') and datacenter_id like country||'-%' and ((location='ir')=(country='ir'))));
drop function public.panel_request_hosting_trial(uuid,text,text);
create function public.panel_request_hosting_trial(p_user uuid,p_location text,p_workload text,p_country text default null,p_datacenter text default null) returns uuid language plpgsql security definer set search_path=public as $$
declare trial_id uuid;
begin
 if p_location not in ('ir','eu') or p_workload not in ('linux','wordpress') then raise exception 'Invalid hosting trial request';end if;
 if (p_country is null)<>(p_datacenter is null) then raise exception 'Country and datacenter must be supplied together';end if;
 insert into panel_hosting_trials(user_id,location,workload,country,datacenter_id) values(p_user,p_location,p_workload,p_country,p_datacenter) on conflict(user_id) do nothing returning id into trial_id;
 if trial_id is null then select id into trial_id from panel_hosting_trials where user_id=p_user;end if;
 return trial_id;
end $$;
revoke all on function public.panel_request_hosting_trial(uuid,text,text,text,text) from public,anon,authenticated;
grant execute on function public.panel_request_hosting_trial(uuid,text,text,text,text) to service_role;
-- A provider quote can only create one payable upgrade invoice.
create unique index panel_hosting_upgrade_quote_once on public.panel_invoices(user_id,(data->'hostingUpgrade'->>'quoteReference')) where data ? 'hostingUpgrade';

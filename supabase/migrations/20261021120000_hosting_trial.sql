-- Trial requests are not invoices or provisioning success. Approval requires a trusted operator.
create table public.panel_hosting_trials (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null unique references auth.users(id) on delete cascade,
 location text not null check(location in ('ir','eu')),
 workload text not null check(workload in ('linux','wordpress')),
 status text not null default 'pending' check(status in ('pending','active','expired','rejected')),
 requested_at timestamptz not null default now(),
 activated_at timestamptz,
 expires_at timestamptz,
 provider_reference text unique,
 resources jsonb not null default '{"cpu":1,"ramGB":0.5,"diskGB":0.5,"trafficGB":1,"sites":1}' check(resources = '{"cpu":1,"ramGB":0.5,"diskGB":0.5,"trafficGB":1,"sites":1}'::jsonb),
 check((activated_at is null and expires_at is null and status in ('pending','rejected')) or (status in ('active','expired') and activated_at is not null and expires_at is not null and expires_at=activated_at+interval '24 hours' and provider_reference is not null))
);
alter table public.panel_hosting_trials enable row level security;
revoke all on public.panel_hosting_trials from public,anon,authenticated;
grant all on public.panel_hosting_trials to service_role;
create or replace function public.panel_request_hosting_trial(p_user uuid,p_location text,p_workload text) returns uuid
language plpgsql security definer set search_path=public as $$
declare trial_id uuid;
begin
 if p_location not in ('ir','eu') or p_workload not in ('linux','wordpress') then raise exception 'Invalid hosting trial request'; end if;
 insert into panel_hosting_trials(user_id,location,workload) values(p_user,p_location,p_workload)
 on conflict(user_id) do nothing returning id into trial_id;
 if trial_id is null then select id into trial_id from panel_hosting_trials where user_id=p_user; end if;
 return trial_id;
end $$;
revoke all on function public.panel_request_hosting_trial(uuid,text,text) from public,anon,authenticated;
grant execute on function public.panel_request_hosting_trial(uuid,text,text) to service_role;

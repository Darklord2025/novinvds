-- Retain old tickets and account-only requests while supporting structured routing.
alter table public.panel_tickets add column context jsonb not null default '{}'
  check (jsonb_typeof(context) = 'object');

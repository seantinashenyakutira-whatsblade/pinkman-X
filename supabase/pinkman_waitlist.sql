create table if not exists pinkman_waitlist (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  whatsapp text not null,
  experience_level text not null,
  interest text not null,
  marketing_consent boolean default false,
  source text default 'landing_page',
  status text default 'waitlist',
  created_at timestamp with time zone default now()
);

alter table pinkman_waitlist enable row level security;

drop policy if exists "Allow public waitlist inserts" on pinkman_waitlist;
create policy "Allow public waitlist inserts"
  on pinkman_waitlist
  for insert
  to anon
  with check (true);

drop policy if exists "Prevent public reading waitlist" on pinkman_waitlist;
create policy "Prevent public reading waitlist"
  on pinkman_waitlist
  for select
  to anon
  using (false);

-- Somni: esquema inicial de datos de usuario
-- Ejecutar en el SQL Editor del panel de Supabase (Project > SQL Editor)

-- 1. Perfiles (1:1 con auth.users), guarda el estado de suscripción
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_premium boolean not null default false,
  parent_name text,
  created_at timestamptz not null default now()
);

-- Si la tabla profiles ya existía sin esta columna (proyectos creados antes
-- de este cambio), esta línea la agrega sin afectar los datos existentes.
alter table public.profiles add column if not exists parent_name text;

alter table public.profiles enable row level security;

create policy "Los usuarios ven su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Los usuarios actualizan su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Crea el perfil automáticamente cuando se registra un usuario nuevo
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Bebés (N:1 con el usuario)
create table if not exists public.babies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  birthdate date not null,
  created_at timestamptz not null default now()
);

alter table public.babies enable row level security;

create policy "Los usuarios ven sus propios bebés"
  on public.babies for select
  using (auth.uid() = user_id);

create policy "Los usuarios crean sus propios bebés"
  on public.babies for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios actualizan sus propios bebés"
  on public.babies for update
  using (auth.uid() = user_id);

create policy "Los usuarios eliminan sus propios bebés"
  on public.babies for delete
  using (auth.uid() = user_id);

-- 3. Registros de actividad (N:1 con el bebé)
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('sueño', 'toma', 'pañal')),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  tipo text,
  value numeric,
  created_at timestamptz not null default now()
);

alter table public.activity_logs enable row level security;

create policy "Los usuarios ven sus propios registros"
  on public.activity_logs for select
  using (auth.uid() = user_id);

create policy "Los usuarios crean sus propios registros"
  on public.activity_logs for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios actualizan sus propios registros"
  on public.activity_logs for update
  using (auth.uid() = user_id);

create policy "Los usuarios eliminan sus propios registros"
  on public.activity_logs for delete
  using (auth.uid() = user_id);

create index if not exists activity_logs_baby_id_idx on public.activity_logs (baby_id);
create index if not exists activity_logs_started_at_idx on public.activity_logs (started_at desc);

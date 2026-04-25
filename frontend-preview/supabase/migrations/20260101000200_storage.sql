-- =============================================================================
-- Saltos — Storage buckets
-- =============================================================================

-- Public bucket for gallery photos / videos.
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Public bucket for class cover images.
insert into storage.buckets (id, name, public)
values ('class-covers', 'class-covers', true)
on conflict (id) do nothing;

-- Private bucket for user uploads (e.g. parental consents).
insert into storage.buckets (id, name, public)
values ('user-uploads', 'user-uploads', false)
on conflict (id) do nothing;

-- ---------------- Policies for the `gallery` bucket --------------------------
create policy "gallery: public read"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "gallery: admin upload"
  on storage.objects for insert
  with check (bucket_id = 'gallery' and public.is_admin());

create policy "gallery: admin update"
  on storage.objects for update
  using (bucket_id = 'gallery' and public.is_admin())
  with check (bucket_id = 'gallery' and public.is_admin());

create policy "gallery: admin delete"
  on storage.objects for delete
  using (bucket_id = 'gallery' and public.is_admin());

-- ---------------- Policies for the `class-covers` bucket --------------------
create policy "class-covers: public read"
  on storage.objects for select
  using (bucket_id = 'class-covers');

create policy "class-covers: admin write"
  on storage.objects for all
  using (bucket_id = 'class-covers' and public.is_admin())
  with check (bucket_id = 'class-covers' and public.is_admin());

-- ---------------- Policies for the `user-uploads` bucket --------------------
create policy "user-uploads: owner reads"
  on storage.objects for select
  using (bucket_id = 'user-uploads' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "user-uploads: owner writes"
  on storage.objects for insert
  with check (bucket_id = 'user-uploads' and auth.uid()::text = (storage.foldername(name))[1]);

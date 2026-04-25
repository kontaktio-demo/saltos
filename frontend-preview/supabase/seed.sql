-- =============================================================================
-- Saltos — seed data (development only)
-- =============================================================================
-- Loads sample classes, sessions, pricing plans, FAQs.
-- Run via:  supabase db reset   (recreates DB and executes migrations + seed)
-- =============================================================================

-- ---------------- Classes ----------------------------------------------------
insert into public.classes (slug, title, short_description, description, duration_minutes, capacity, min_age) values
  ('free-jump', 'Free Jump',
   'Klasyczne skakanie na trampolinach — pełna swoboda i frajda.',
   'Sesja swobodnego skakania po wszystkich strefach trampolin parku Saltos. Idealne na pierwszy raz.',
   60, 40, 4),
  ('dodgeball', 'Dodgeball',
   'Drużynowa zabawa na trampolinach.',
   'Klasyczny dodgeball, ale z trampolinami pod nogami. Energia, śmiech i szybka akcja.',
   60, 24, 8),
  ('ninja-park', 'Ninja Park',
   'Tor przeszkód jak z Ninja Warrior.',
   'Wymagający tor przeszkód z elementami parkour i siły. Dla starszych dzieci i dorosłych.',
   45, 16, 10),
  ('foam-pit', 'Foam Pit & Tricks',
   'Skoki do basenu z gąbką — naucz się saltą bezpiecznie.',
   'Trener pomoże Ci opanować podstawowe akrobacje w bezpiecznym środowisku.',
   60, 20, 8),
  ('mini-saltos', 'Mini Saltos (3-6 lat)',
   'Strefa dla najmłodszych — pod opieką rodzica.',
   'Bezpieczna strefa dla dzieci 3-6 lat, gdzie najmłodsi mogą poznać świat trampolin.',
   45, 30, 3),
  ('fitness-jump', 'Fitness Jump',
   'Trening cardio na trampolinach.',
   'Spalisz do 800 kcal w godzinę! Trening prowadzony przez instruktora.',
   60, 20, 16)
on conflict (slug) do nothing;

-- ---------------- Pricing plans ---------------------------------------------
insert into public.pricing_plans (slug, name, description, price_grosze, type, entries, sort_order) values
  ('bilet-1h',     'Bilet 1h',                     'Pojedyncze wejście na 60 minut.',           4900,  'single',  1,    10),
  ('bilet-2h',     'Bilet 2h',                     'Pojedyncze wejście na 120 minut.',          7900,  'single',  1,    20),
  ('karnet-5',     'Karnet 5 wejść',               '5 wejść godzinnych, ważny 3 miesiące.',     19900, 'pack_5',  5,    30),
  ('karnet-10',    'Karnet 10 wejść',              '10 wejść godzinnych, ważny 6 miesięcy.',    34900, 'pack_10', 10,   40),
  ('karnet-month', 'Karnet miesięczny',            'Bez limitu wejść przez 30 dni.',            14900, 'monthly', null, 50),
  ('karnet-year',  'Karnet roczny',                'Bez limitu wejść przez rok.',               99900, 'yearly',  null, 60)
on conflict (slug) do nothing;

-- ---------------- FAQs -------------------------------------------------------
insert into public.faqs (category, question, answer, sort_order) values
  ('Bilety',         'Czy muszę kupić bilet online?',                         'Nie musisz, ale rezerwacja online gwarantuje miejsce w wybranym slocie i jest tańsza o 10%.', 10),
  ('Bilety',         'Czy mogę zwrócić bilet?',                              'Tak, do 24 godzin przed wybranym terminem zwracamy 100% kwoty.', 20),
  ('Bezpieczeństwo', 'Czy w parku obowiązują skarpetki antypoślizgowe?',     'Tak — skarpetki antypoślizgowe są obowiązkowe. Można je kupić w recepcji za 15 zł.', 10),
  ('Bezpieczeństwo', 'Od ilu lat można korzystać z parku?',                  'Z głównej strefy korzystamy od 8 lat. Mini Saltos jest dla dzieci 3-6 lat (pod opieką rodzica).', 20),
  ('Urodziny',       'Jak zarezerwować urodziny?',                           'Wypełnij formularz na stronie /urodziny lub zadzwoń do nas. Skontaktujemy się w 24h.', 10),
  ('Grupy',          'Czy organizujecie wycieczki szkolne?',                 'Tak — oferujemy specjalne pakiety dla szkół. Zobacz /szkoly.', 10)
on conflict do nothing;

-- ---------------- Settings ---------------------------------------------------
insert into public.settings (key, value) values
  ('opening_hours', '{"mon":{"open":"14:00","close":"21:00"},"tue":{"open":"14:00","close":"21:00"},"wed":{"open":"14:00","close":"21:00"},"thu":{"open":"14:00","close":"21:00"},"fri":{"open":"12:00","close":"22:00"},"sat":{"open":"10:00","close":"22:00"},"sun":{"open":"10:00","close":"20:00"}}'),
  ('happy_hours',   '{"days":["tue","wed","thu"],"from":"14:00","to":"16:00","discount":30}'),
  ('banner',        '{"enabled":false,"text":"Otwarcie nowej strefy Ninja!","cta_url":"/zajecia/ninja-park"}')
on conflict (key) do update set value = excluded.value;

-- ---------------- Sample sessions for the next 14 days ----------------------
do $$
declare
  d date;
  c record;
  hour int;
begin
  for c in select id, duration_minutes from public.classes loop
    for d in select generate_series(current_date, current_date + interval '14 days', interval '1 day')::date loop
      for hour in 14..20 loop
        insert into public.class_sessions (class_id, starts_at, ends_at)
        values (
          c.id,
          (d::timestamp + make_interval(hours => hour)) at time zone 'Europe/Warsaw',
          (d::timestamp + make_interval(hours => hour, mins => c.duration_minutes)) at time zone 'Europe/Warsaw'
        );
      end loop;
    end loop;
  end loop;
end $$;

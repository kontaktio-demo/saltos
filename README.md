# 🤸 SALTOS — Park trampolin · projekt strony

Premium serwis parku trampolin **Saltos**, zbudowany w Next.js 14 (App Router), z 3D, animacjami GSAP/Framer Motion, rezerwacjami online, płatnościami Stripe, panelem admina i pełną integracją z Supabase. Przygotowany pod **tysiące** jednoczesnych użytkowników (atomowe RPC na rezerwacjach, idempotentne webhooki Stripe, pooled connection do Postgresa, ISR, rate limiting).

---

## Spis treści

1. [Stack techniczny](#1-stack-techniczny)
2. [Wymagania wstępne](#2-wymagania-wstępne)
3. [Krok po kroku — uruchomienie projektu lokalnie](#3-krok-po-kroku--uruchomienie-projektu-lokalnie)
4. [Konfiguracja Supabase (baza danych + auth + storage)](#4-konfiguracja-supabase-baza-danych--auth--storage)
5. [Konfiguracja Stripe (płatności + webhooki)](#5-konfiguracja-stripe-płatności--webhooki)
6. [Konfiguracja e-maili (Resend)](#6-konfiguracja-e-maili-resend)
7. [Struktura bazy danych](#7-struktura-bazy-danych)
8. [Deploy na Vercel](#8-deploy-na-vercel)
9. [Skalowalność — gotowy na tysiące użytkowników](#9-skalowalność--gotowy-na-tysiące-użytkowników)
10. [Architektura projektu (drzewo)](#10-architektura-projektu-drzewo)
11. [Komendy, lint, testy](#11-komendy-lint-testy)
12. [Kolejne kroki / roadmap](#12-kolejne-kroki--roadmap)

---

## 1. Stack techniczny

| Warstwa            | Technologia                                                        |
| ------------------ | ------------------------------------------------------------------ |
| Framework          | **Next.js 14** (App Router, Server Components)                     |
| Język              | TypeScript                                                         |
| Style              | Tailwind CSS + `class-variance-authority`                          |
| Animacje UI        | Framer Motion                                                      |
| Animacje scroll    | GSAP + ScrollTrigger                                               |
| 3D                 | React Three Fiber + drei + Three.js                                |
| Baza / Auth / Storage | **Supabase** (Postgres 15, RLS)                                |
| Płatności          | **Stripe** (Checkout + webhooks, BLIK, P24, karty)                 |
| E-mail             | Resend                                                             |
| Formularze         | React Hook Form + Zod                                              |
| Tabele admina      | TanStack Table                                                     |
| Hosting            | **Vercel** (frontend + serverless API)                             |

**Paleta marki SALTOS** — ustawiona w `tailwind.config.ts` i `config/theme.ts`:

| Token       | HEX         | Użycie                                       |
| ----------- | ----------- | -------------------------------------------- |
| `brand`     | `#F39200`   | Pomarańcz — główne tło stron marketingowych  |
| `ink`       | `#1E2A5C`   | Granat — pasek kontaktowy, footer, admin     |
| `accent`    | `#2FA84F`   | Zieleń z logo                                |
| `teal`      | `#1FA9A8`   | Turkus z logo                                |

---

## 2. Wymagania wstępne

Zainstaluj na swoim komputerze:

- **Node.js ≥ 20** (LTS): <https://nodejs.org>
- **npm ≥ 10** (instalowane razem z Node), `pnpm` lub `yarn` opcjonalnie
- **Git**: <https://git-scm.com>
- **Supabase CLI** (do migracji): <https://supabase.com/docs/guides/cli>
  ```bash
  # macOS
  brew install supabase/tap/supabase
  # Windows (scoop)
  scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
  scoop install supabase
  # Linux / inne
  npx supabase --help
  ```
- **Stripe CLI** (do testów webhooków lokalnie): <https://stripe.com/docs/stripe-cli>
- Konto na **GitHub**, **Vercel**, **Supabase**, **Stripe**.

---

## 3. Krok po kroku — uruchomienie projektu lokalnie

### 3.1. Sklonuj repo

```bash
git clone https://github.com/<twoja-organizacja>/saltos.git
cd saltos
```

### 3.2. Zainstaluj zależności

```bash
npm install
```

### 3.3. Utwórz plik `.env.local`

Skopiuj wzorzec i uzupełnij wartości (kolejne sekcje pokażą jak):

```bash
cp .env.example .env.local
```

Plik `.env.local` **nigdy nie trafia do git** (jest w `.gitignore`). Klucze produkcyjne wpiszesz osobno w Vercel.

### 3.4. Uruchom serwer deweloperski

```bash
npm run dev
```

Aplikacja działa pod <http://localhost:3000>. Bez Supabase część stron pokaże błędy — uzupełnij sekcję 4.

### 3.5. Sprawdź typy / lint

```bash
npm run typecheck
npm run lint
```

---

## 4. Konfiguracja Supabase (baza danych + auth + storage)

### 4.1. Utwórz projekt Supabase

1. Wejdź na <https://supabase.com> → **New project**.
2. Wybierz region najbliższy użytkownikom (dla Polski: **eu-central-1 (Frankfurt)**).
3. Zapisz **Database password** w bezpiecznym miejscu (np. menedżerze haseł).
4. Po utworzeniu projektu otwórz **Project Settings → API** i skopiuj:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**TYLKO server-side**, nigdy w przeglądarce)
5. **Project Settings → Database → Connection string** — skopiuj dwa connection stringi:
   - **Pooled / Transaction (port 6543)** → `SUPABASE_DB_URL` ← używany przez serverless (Vercel)
   - **Direct (port 5432)** → `SUPABASE_DB_URL_DIRECT` ← używany tylko do migracji

Wklej wszystko do `.env.local`.

### 4.2. Powiąż lokalny projekt z Supabase

```bash
supabase login                       # otworzy przeglądarkę
supabase link --project-ref <REF>    # REF znajdziesz w URL dashboardu
```

### 4.3. Wykonaj migracje (utworzenie struktury bazy)

```bash
supabase db push
```

Komenda zaaplikuje wszystkie migracje z `supabase/migrations/`:

| Plik                                            | Co tworzy                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------------------- |
| `20260101000000_init_schema.sql`                | Tabele: `profiles`, `classes`, `class_sessions`, `pricing_plans`, `reservations`, `passes`, `faqs`, `gallery_items`, `contact_messages`, `birthday_inquiries`, `settings` + enumy + triggery `updated_at` + auto-tworzenie profilu po rejestracji w `auth.users` |
| `20260101000100_rls_policies.sql`               | Row-Level Security na każdej tabeli + helper `is_admin()`                  |
| `20260101000200_storage.sql`                    | Buckety: `gallery` (publiczny), `class-covers` (publiczny), `user-uploads` (prywatny) + polityki dostępu |
| `20260101000300_scalability.sql`                | **Atomic RPC `create_reservation_atomic`** (lock + capacity check), `consume_pass_entry`, `cleanup_stale_reservations`, tabela `stripe_events` (idempotency), indeksy hot-path |

### 4.4. Załaduj dane testowe (seed)

```bash
supabase db reset       # ⚠ wyczyści bazę i ponownie zaaplikuje migracje + seed
# lub samo seed:
psql "$SUPABASE_DB_URL_DIRECT" -f supabase/seed.sql
```

Wgra przykładowe zajęcia (Free Jump, Dodgeball, Ninja Park, Foam Pit, Mini Saltos, Fitness Jump), cennik, FAQ oraz **sesje na 14 dni do przodu** w godzinach 14:00–20:00 — od razu widoczne w aplikacji.

### 4.5. Wygeneruj typy TypeScript z Supabase (opcjonalnie ale zalecane)

```bash
supabase gen types typescript --linked > lib/supabase/types.ts
```

Zastąpi to ręczny stub i da pełne podpowiedzi typów dla wszystkich tabel.

### 4.6. Skonfiguruj Auth

Dashboard Supabase → **Authentication → Providers**:

- **Email** — włączone domyślnie.
- Włącz **Confirm email** w **Authentication → Settings**, jeśli chcesz wymagać potwierdzenia.
- W **Authentication → URL Configuration** dodaj:
  - Site URL: `https://saltos.pl` (i `http://localhost:3000` dla dev)
  - Redirect URLs: `https://saltos.pl/**`, `http://localhost:3000/**`
- (Opcjonalnie) skonfiguruj OAuth: Google / Facebook → trzeba zarejestrować aplikację u providera i wpisać `client_id` + `client_secret`.

### 4.7. Utwórz pierwszego administratora

Po rejestracji przez `/rejestracja` (lub przez Supabase Studio → Authentication → Add user), w SQL Editorze wykonaj:

```sql
update public.profiles
   set role = 'admin'
 where id = (select id from auth.users where email = 'twoj-email@saltos.pl');
```

Od teraz `/admin` będzie dostępne dla tego konta.

### 4.8. Włącz cron (auto-anulowanie nieopłaconych rezerwacji)

Dashboard Supabase → **Database → Cron Jobs → New job**:

```sql
select cron.schedule(
  'cleanup_stale_reservations',
  '*/10 * * * *',
  $$select public.cleanup_stale_reservations();$$
);
```

Co 10 minut anuluje rezerwacje, które zostały w stanie `pending` dłużej niż 30 minut (Stripe Checkout TTL). Zwalnia miejsca dla innych klientów.

---

## 5. Konfiguracja Stripe (płatności + webhooki)

### 5.1. Utwórz konto Stripe

1. Załóż konto na <https://stripe.com>. Wystarczy konto **w trybie testowym** do rozwoju.
2. Dashboard Stripe → **Developers → API keys**:
   - `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` → `STRIPE_SECRET_KEY`

Wklej do `.env.local`.

### 5.2. Włącz polskie metody płatności

Dashboard → **Settings → Payment methods** → włącz:
- Cards
- BLIK
- Przelewy24

### 5.3. Skonfiguruj webhook

#### Lokalnie (z użyciem Stripe CLI)

```bash
stripe login
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

CLI wypisze `whsec_...` — skopiuj do `STRIPE_WEBHOOK_SECRET` w `.env.local`.

W osobnym terminalu uruchom Next.js (`npm run dev`) i wyślij testowe zdarzenie:

```bash
stripe trigger checkout.session.completed
```

#### Produkcyjnie (po deployu na Vercel)

Dashboard Stripe → **Developers → Webhooks → Add endpoint**:
- URL: `https://saltos.pl/api/stripe/webhook`
- Eventy do nasłuchiwania:
  - `checkout.session.completed`
  - `checkout.session.expired`
  - `charge.refunded`
- Po zapisaniu skopiuj `Signing secret` (`whsec_...`) i wpisz w **Vercel → Project → Settings → Environment Variables** jako `STRIPE_WEBHOOK_SECRET`.

> **Idempotency**: webhook jest odporny na ponowne dostarczenia — każdy `event.id` zapisujemy do tabeli `stripe_events` i przy duplikacie kończymy wcześnie. Stripe ponawia nieudane webhooki przez 3 dni, więc to obowiązkowe przy skali.

### 5.4. (Opcjonalnie) Utwórz produkty w Stripe

Jeśli chcesz, żeby konkretne plany cenowe (`pricing_plans.stripe_price_id`) wskazywały na zdefiniowane wcześniej Price'y w Stripe (np. dla karnetów rocznych z subskrypcją), utwórz je w **Products → Add product** i wklej `price_id` do tabeli `pricing_plans` w Supabase.

Dla rezerwacji jednorazowych nie jest to potrzebne — używamy `price_data` w locie.

---

## 6. Konfiguracja e-maili (Resend)

1. Załóż konto na <https://resend.com>.
2. Zweryfikuj domenę `saltos.pl` (instrukcja w panelu Resend — DNS records).
3. **API Keys → Create API Key** → wpisz do `RESEND_API_KEY`.
4. W `lib/email/send.ts` zmień adres `from` (np. `Saltos <noreply@saltos.pl>`).

Bez `RESEND_API_KEY` aplikacja działa, ale wiadomości nie są wysyłane (warning w logach).

---

## 7. Struktura bazy danych

Pełny schemat znajdziesz w `supabase/migrations/`. Najważniejsze tabele:

### `profiles`
Rozszerzenie `auth.users`. Tworzona automatycznie po rejestracji (trigger `handle_new_user`).
- `id` UUID (FK → `auth.users.id`)
- `full_name`, `phone`, `role` (`user` | `staff` | `admin`)
- `created_at`, `updated_at`

### `classes`
Rodzaje zajęć (Free Jump, Dodgeball, Ninja, …).
- `slug` (unique), `title`, `short_description`, `description`
- `duration_minutes`, `capacity`, `min_age`, `cover_image_url`
- `is_active`

### `class_sessions`
Konkretne sloty czasowe.
- `class_id` → `classes.id`
- `starts_at`, `ends_at` (`tstamptz`)
- `capacity_override` (nadpisanie pojemności na sesję), `is_cancelled`

### `pricing_plans`
Cennik: bilety, karnety, pakiety.
- `slug` (unique), `name`, `description`, `price_grosze`
- `type` (`single` | `pack_5` | `pack_10` | `monthly` | `yearly`)
- `entries` (nullable dla planów bezlimitowych), `stripe_price_id`
- `is_active`, `sort_order`

### `reservations`
Rezerwacje (zarówno użytkowników zalogowanych, jak i gości).
- `user_id` (nullable — goście) lub `guest_name` + `guest_email` (constraint)
- `session_id` → `class_sessions.id`
- `quantity`, `total_grosze`
- `status` (`pending` | `paid` | `cancelled` | `refunded` | `completed`)
- `stripe_checkout_session_id`, `stripe_payment_intent_id`
- `notes`

### `passes`
Aktywne karnety klientów.
- `user_id` → `auth.users.id`
- `pricing_plan_id` → `pricing_plans.id`
- `entries_remaining`, `valid_from`, `valid_until`

### `faqs` / `gallery_items` / `contact_messages` / `birthday_inquiries`
Treści edytowalne z panelu admina.

### `settings`
Globalne ustawienia (godziny otwarcia, banner, happy hours) — JSONB.

### `stripe_events`
Idempotency: każdy przetworzony webhook Stripe (`event.id`).

### Funkcje (RPC)

| Funkcja                                 | Po co                                                                  |
| --------------------------------------- | ---------------------------------------------------------------------- |
| `is_admin()`                            | Helper RLS — sprawdza, czy bieżący `auth.uid()` ma rolę `admin`/`staff` |
| `create_reservation_atomic(...)`        | **Bezpieczne wątkowo** tworzenie rezerwacji (lock + capacity check)    |
| `consume_pass_entry(pass_id)`           | Atomowe odjęcie wejścia z karnetu                                      |
| `cleanup_stale_reservations()`          | Anuluje `pending` rezerwacje > 30 min (uruchamiane przez cron)         |
| `handle_new_user()`                     | Trigger — tworzy `profiles` po `auth.users` insert                     |
| `set_updated_at()`                      | Trigger — aktualizuje kolumnę `updated_at`                             |

### Row-Level Security

RLS jest **włączone na każdej tabeli**. Najważniejsze zasady:

- **Public (anon):** czyta tylko opublikowane rekordy (`is_active`, `is_published`, `not is_cancelled`).
- **Authenticated user:** widzi i edytuje swoje rezerwacje, karnety, profil.
- **Admin/staff:** pełen dostęp (przez `is_admin()`).
- **Service role** (`SUPABASE_SERVICE_ROLE_KEY`) — omija RLS, używana wyłącznie w webhookach Stripe i admin Server Actions.

---

## 8. Deploy na Vercel

### 8.1. Push do GitHub

```bash
git add .
git commit -m "init"
git push origin main
```

### 8.2. Import do Vercel

1. <https://vercel.com> → **Add New → Project** → wybierz repo z GitHub.
2. **Framework Preset**: Next.js (wykryte automatycznie).
3. **Build Command**: `npm run build` (domyślne).
4. **Output Directory**: `.next` (domyślne).

### 8.3. Wpisz zmienne środowiskowe

W **Settings → Environment Variables** dodaj **wszystkie** zmienne z `.env.example` z **produkcyjnymi** wartościami:

| Zmienna                              | Wartość produkcyjna                                            |
| ------------------------------------ | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`               | `https://saltos.pl`                                            |
| `NEXT_PUBLIC_SUPABASE_URL`           | z Supabase                                                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`      | z Supabase                                                     |
| `SUPABASE_SERVICE_ROLE_KEY`          | z Supabase (**production only**, nie udostępniaj w preview!)   |
| `SUPABASE_DB_URL`                    | **pooled** (port 6543, `pgbouncer=true`)                       |
| `SUPABASE_DB_URL_DIRECT`             | direct (port 5432) — opcjonalne, używane tylko do migracji     |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | live Publishable Key                                           |
| `STRIPE_SECRET_KEY`                  | live Secret Key                                                |
| `STRIPE_WEBHOOK_SECRET`              | z webhooka utworzonego pod `/api/stripe/webhook`               |
| `RESEND_API_KEY`                     | z Resend                                                       |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY`        | z Google Cloud Console                                         |

> **Ważne**: oddziel zmienne `Production` / `Preview` / `Development`. Nigdy nie używaj kluczy produkcyjnych Stripe w preview.

### 8.4. Domena

**Settings → Domains** → dodaj `saltos.pl` i `www.saltos.pl`. Vercel pokaże rekordy DNS do dodania u dostawcy domeny (najlepiej wskazać `A` na `76.76.21.21` + `CNAME www → cname.vercel-dns.com`).

### 8.5. Po deployu

1. Wróć do Stripe Dashboard → **Developers → Webhooks** → utwórz webhook na `https://saltos.pl/api/stripe/webhook` (sekcja 5.3).
2. Zaktualizuj **Site URL** w Supabase (sekcja 4.6).
3. Zrób testową rezerwację z testowymi kartami (`4242 4242 4242 4242`).

---

## 9. Skalowalność — gotowy na tysiące użytkowników

Projekt został zaprojektowany pod znaczący ruch. Co konkretnie zostało zrobione:

### 9.1. Baza danych

- **Pooled connection (Supavisor / PgBouncer, port 6543, transaction mode)** — `SUPABASE_DB_URL`. Każda funkcja serverless na Vercel otwiera krótkie połączenie, które poolerem dzielone jest między wszystkimi instancjami. Bez tego Postgres szybko by się dusił przy ~100 jednoczesnych funkcjach.
- **Atomic reservation creation** — funkcja `create_reservation_atomic` używa `SELECT … FOR UPDATE` na wierszu sesji, więc **nie da się przesprzedaży** nawet przy setkach jednoczesnych prób na ten sam slot.
- **Atomic pass consumption** — `consume_pass_entry` z lockiem zapobiega podwójnemu wykorzystaniu wejścia.
- **Hot-path indeksy** — `reservations(user_id, created_at desc)`, partial index `reservations(session_id) WHERE status IN ('paid','pending')`, `profiles(role) WHERE role <> 'user'`, etc.
- **Row-Level Security z `security definer`** — funkcje pomocnicze nie wymagają omijania RLS w runtime.

### 9.2. Auth

- Sesje Supabase są przechowywane w **HttpOnly cookies**, odświeżane w `middleware.ts` na każdym requeście (bez dodatkowych query do DB poza pojedynczym `getUser()`).
- Sprawdzenie roli admina to **jeden** zapytany rekord z indeksowanej tabeli `profiles`.
- **Confirm email** + **rate limit** Supabase Auth chronią przed bot-rejestracjami.
- Zalecamy włączyć **Captcha** (hCaptcha / Cloudflare Turnstile) w Supabase → Authentication → Settings → Captcha protection przy publicznym launchu.

### 9.3. Płatności

- **Stripe Checkout** — hosted page, Stripe sam skaluje, my odbieramy tylko webhook.
- **Idempotentne webhooki** — tabela `stripe_events`, każdy `event.id` przetwarzamy raz. Stripe ponawia 3 dni, więc obowiązkowe.
- Webhook na **Node runtime** (potrzebne raw body do podpisu).
- **`cleanup_stale_reservations`** zwalnia miejsca z porzuconych checkoutów.

### 9.4. API i front

- **ISR (`revalidate = 3600`)** na publicznych stronach (`/`, `/zajecia`, `/cennik`, `/faq`, `/galeria`) — Vercel serwuje je ze statycznego cache, baza praktycznie tylko raz na godzinę.
- **`generateStaticParams`** na `/zajecia/[slug]` — pre-renderujemy wszystkie zajęcia w czasie buildu.
- **Rate limiting** (`lib/utils/rate-limit.ts`) na `/api/contact`, `/api/reservations`, `/api/stripe/checkout`.
  - Domyślnie in-memory (działa per-instancja). Wystarcza do ~10k MAU.
  - Powyżej tego — odkomentuj zmienne `UPSTASH_REDIS_REST_URL/TOKEN` w `.env.example` i podmień implementację na `@upstash/ratelimit`.
- **`next/dynamic({ ssr: false })`** dla scen 3D — nie blokują pierwszego renderu.
- **`next/image`** w trybie AVIF/WebP — automatyczna optymalizacja wszystkich zdjęć z bucketu `gallery`.
- **Edge Runtime** dla `opengraph-image` — generacja OG tuż przy użytkowniku.

### 9.5. Monitoring (zalecane do dodania przed launchem)

- **Vercel Analytics** + **Vercel Speed Insights** — jeden klik w dashboardzie.
- **Sentry** — `npm i @sentry/nextjs && npx @sentry/wizard@latest -i nextjs` (do `app/error.tsx` i `app/global-error.tsx`).
- **Supabase Logs** — wbudowane, wystarczą do startu.

### 9.6. Limity, których trzeba pilnować

| Element                       | Free tier         | Co zrobić powyżej?                                  |
| ----------------------------- | ----------------- | --------------------------------------------------- |
| Supabase DB                   | 500 MB / 2 CPU    | Przejście na **Pro** ($25/mo) — 8 GB / 4 CPU       |
| Supabase Auth                 | 50 000 MAU        | Pro — bez limitu                                    |
| Vercel functions              | 100 GB-hr         | Pro plan ($20/user/mo)                              |
| Stripe                        | bez limitu        | tylko prowizja od transakcji                        |
| Resend                        | 100 mail/dzień    | $20/mo za 50 000 mail                               |

---

## 10. Architektura projektu (drzewo)

```
saltos/
├── app/                                    # Next.js App Router
│   ├── (marketing)/                        # Publiczne strony (orange bg, MainLayout)
│   │   ├── layout.tsx
│   │   ├── page.tsx                        # /  — strona główna z hero 3D
│   │   ├── rezerwacje/                     # /rezerwacje (+ sukces, anulowano)
│   │   ├── zajecia/                        # /zajecia + [slug] (ISR)
│   │   ├── cennik|faq|galeria|kontakt/
│   │   ├── urodziny|szkoly|firmy/
│   │   └── regulamin|polityka-prywatnosci|regulamin-rezerwacji/
│   ├── (auth)/                             # /logowanie, /rejestracja, /reset-hasla
│   ├── (account)/                          # /konto/* (chronione)
│   ├── (admin)/                            # /admin/* (chronione, sidebar)
│   ├── api/                                # Route Handlers
│   │   ├── stripe/checkout/route.ts        # Tworzenie Stripe Checkout Session
│   │   ├── stripe/webhook/route.ts         # Webhook + idempotency
│   │   ├── reservations/route.ts           # POST → atomic RPC
│   │   ├── availability/route.ts           # GET wolnych miejsc
│   │   └── contact/route.ts                # POST formularz kontaktowy
│   ├── layout.tsx                          # Root layout (html/body, providers)
│   ├── providers.tsx                       # Client providers
│   ├── globals.css                         # Tailwind + zmienne kolorów SALTOS
│   ├── not-found.tsx · error.tsx · loading.tsx
│   ├── sitemap.ts · robots.ts
│   └── opengraph-image.tsx                 # Dynamiczny OG (edge runtime)
│
├── components/
│   ├── ui/                                 # Atomic — Button, Card, Modal, Input…
│   ├── layout/                             # MainLayout, AdminLayout, Container, Section
│   ├── navigation/                         # Navbar, MobileMenu, Footer, AdminSidebar, UserMenu
│   ├── sections/                           # Sekcje stron (home/, pricing/, faq/, gallery/…)
│   ├── 3d/                                 # R3F: scenes/, models/, effects/, controls/, loaders/
│   ├── forms/                              # ReservationForm, ContactForm, LoginForm…
│   ├── admin/                              # tables/, filters/, forms/, widgets/
│   ├── animations/                         # FadeIn, ScrollReveal, PageTransition…
│   └── seo/                                # JsonLd, MetaTags
│
├── hooks/                                  # use-gsap, use-supabase-user, use-media-query…
├── context/                                # ReservationProvider, ThemeProvider
├── store/                                  # Zustand UI store
│
├── lib/
│   ├── supabase/                           # client, server, admin, middleware, queries/, mutations/, types
│   ├── stripe/                             # client, server, checkout, webhooks (idempotent), products
│   ├── services/                           # Logika domenowa (reservations, classes, pricing, availability, users, stats)
│   ├── validators/                         # Zod schematy
│   ├── animations/                         # Framer Motion variants/transitions
│   ├── gsap/                               # register + timelines/
│   ├── 3d/                                 # loaders, materials, helpers
│   ├── email/                              # send + templates/
│   └── utils/                              # cn, format, slugify, seo, constants, rate-limit
│
├── types/                                  # Domenowe typy TS
├── config/                                 # site, navigation, seo, theme, features
├── content/                                # MDX/JSON (FAQ seed, regulamin)
│
├── public/                                 # Assety statyczne (images/, models/, textures/, hdri/, videos/, fonts/, icons/, og/)
│
├── supabase/
│   ├── migrations/
│   │   ├── 20260101000000_init_schema.sql
│   │   ├── 20260101000100_rls_policies.sql
│   │   ├── 20260101000200_storage.sql
│   │   └── 20260101000300_scalability.sql      # ← atomic RPC, idempotency, indeksy
│   ├── seed.sql                            # Przykładowe zajęcia, cennik, FAQ, sesje na 14 dni
│   └── config.toml
│
├── tests/                                  # Vitest (unit) + Playwright (e2e)
│
├── middleware.ts                           # Auth + ochrona /admin, /konto
├── next.config.mjs                         # Images, webpack dla .glb
├── tailwind.config.ts                      # Paleta SALTOS
├── tsconfig.json                           # Path aliasy @/*
├── .env.example
├── package.json
└── README.md
```

---

## 11. Komendy, lint, testy

```bash
npm run dev          # serwer deweloperski
npm run build        # produkcyjny build
npm run start        # uruchomienie buildu
npm run lint         # ESLint (next/core-web-vitals)
npm run typecheck    # tsc --noEmit
npm run format       # prettier --write
npm run test         # vitest unit
npm run test:e2e     # playwright
```

---

## 12. Kolejne kroki / roadmap

Architektura jest gotowa pod inkrementalne dodawanie kolejnych sekcji. Sugerowana kolejność implementacji:

1. **HeroSection + HeroScene 3D** (`components/sections/home/hero-section.tsx` + `components/3d/scenes/hero-scene.tsx`) — wzmocnij modelem `.glb` zamiast placeholder torusa.
2. **PricingTable** (`components/sections/pricing/pricing-table.tsx`) — czyta `pricing_plans` z Supabase.
3. **FAQ Accordion** — Framer Motion + akordeony z `components/ui/accordion.tsx`.
4. **Kreator rezerwacji** (`components/forms/reservation-form.tsx`) — 3 kroki: zajęcia → slot → dane → płatność.
5. **Login / Register** — RHF + Zod + Supabase Auth.
6. **Panel admina** — `DataTable` (TanStack) + filtry + Server Actions.
7. **Galeria** z lightboxem (Framer Motion) i lazy loading.
8. **Mobile menu** (`components/navigation/mobile-menu.tsx`) — drawer z Framer Motion.
9. **Sentry + Vercel Analytics**.
10. **Captcha** w Supabase Auth + przejście rate-limit na Upstash Redis.

---

🤸 **Powodzenia!** Pytania / problemy → zgłoś issue w repo lub napisz na `kontakt@saltos.pl`.

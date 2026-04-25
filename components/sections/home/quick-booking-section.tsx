import Link from 'next/link';

/**
 * Sekcja szybkiej rezerwacji — mini-kreator (data → godzina → liczba osób).
 * Po kliknięciu "Sprawdź dostępność" przekierowanie do pełnego flow `/rezerwacje`
 * z wstępnie wypełnionymi parametrami w URL.
 *
 * Uwaga: render server-side; właściwa interaktywność (kalendarz, dynamiczne
 * sloty) jest w pełnym kreatorze na `/rezerwacje`.
 */
export function QuickBookingSection() {
  // Domyślna data: jutro
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section
      id="rezerwuj"
      aria-labelledby="quick-booking-title"
      className="bg-teal py-20 text-white md:py-24"
    >
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-white/80">
              Rezerwuj w 30 sekund
            </p>
            <h2
              id="quick-booking-title"
              className="mt-2 font-display text-4xl font-extrabold md:text-5xl"
            >
              Sprawdź dostępność i kup bilet online
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/90">
              Online gwarantujesz miejsce — w weekendy i wakacje park bywa pełny.
              Wpisz datę, godzinę i liczbę osób, a my pokażemy Ci wolne sloty.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/85">
              <li>✓ Płatność BLIK / karta / Apple Pay / Google Pay</li>
              <li>✓ Bezpłatne anulowanie do 24h przed sesją</li>
              <li>✓ Faktura VAT po podaniu NIP-u</li>
              <li>✓ Skarpetki antypoślizgowe dostępne na miejscu (10 zł)</li>
            </ul>
          </div>

          <form
            action="/rezerwacje"
            method="get"
            className="rounded-3xl bg-white p-6 text-ink shadow-2xl md:p-8"
            aria-label="Szybka rezerwacja"
          >
            <div className="grid gap-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-bold">Data wizyty</span>
                <input
                  type="date"
                  name="data"
                  min={minDate}
                  required
                  className="rounded-xl border-2 border-ink/15 px-4 py-3 text-base focus:border-brand focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-bold">Godzina</span>
                <select
                  name="godzina"
                  required
                  defaultValue=""
                  className="rounded-xl border-2 border-ink/15 px-4 py-3 text-base focus:border-brand focus:outline-none"
                >
                  <option value="" disabled>
                    Wybierz godzinę
                  </option>
                  {Array.from({ length: 12 }, (_, i) => 10 + i).map((h) => (
                    <option key={h} value={`${h}:00`}>
                      {h}:00
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-bold">Liczba osób</span>
                <input
                  type="number"
                  name="osoby"
                  min={1}
                  max={50}
                  defaultValue={2}
                  required
                  className="rounded-xl border-2 border-ink/15 px-4 py-3 text-base focus:border-brand focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="mt-2 rounded-full bg-brand px-6 py-4 text-base font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-brand-dark"
              >
                Sprawdź dostępność →
              </button>

              <p className="text-center text-xs text-ink/60">
                Po kliknięciu trafisz do pełnego kreatora rezerwacji.
              </p>
            </div>
          </form>
        </div>

        <div className="mt-10 rounded-2xl bg-white/15 p-4 text-center text-sm backdrop-blur-sm">
          ⚠️ <strong>Pamiętaj:</strong> przyjdź 15 minut przed sesją na rejestrację
          i obowiązkową rozgrzewkę. Wejścia tylko o pełnych godzinach.
          {' '}
          <Link href="/regulamin-rezerwacji" className="underline hover:no-underline">
            Zobacz pełen regulamin rezerwacji →
          </Link>
        </div>
      </div>
    </section>
  );
}

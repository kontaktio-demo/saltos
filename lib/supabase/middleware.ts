import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from './types';

/**
 * Refreshes the Supabase session cookie on every request and enforces
 * route protection for `/admin/*` and `/konto/*`.
 *
 * Called from the root `middleware.ts`.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ---- Admin protection ----
  // /admin/logowanie itself must remain reachable.
  if (pathname.startsWith('/admin') && pathname !== '/admin/logowanie') {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/logowanie';
      return NextResponse.redirect(url);
    }

    // Check admin role from `profiles.role` (see DB schema).
    const { data: profile } = (await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()) as { data: { role: 'user' | 'staff' | 'admin' } | null };

    if (profile?.role !== 'admin' && profile?.role !== 'staff') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/logowanie';
      return NextResponse.redirect(url);
    }
  }

  // ---- User account protection ----
  if (pathname.startsWith('/konto') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/logowanie';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

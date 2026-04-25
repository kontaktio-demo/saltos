import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Root proxy (Next 16 — formerly `middleware.ts`):
 *  - Refreshes the Supabase auth session cookie on every request.
 *  - Protects `/admin/*` (admin role required) and `/konto/*` (any authenticated user).
 *
 * NOTE: actual auth enforcement lives in `lib/supabase/middleware.ts`
 * (so it can use the shared SSR Supabase client). This file only wires
 * the matcher and delegates.
 */
export async function proxy(request: NextRequest): Promise<NextResponse> {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - _next/static, _next/image (Next internals)
     *  - favicon.ico, robots.txt, sitemap.xml
     *  - any file with an extension (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};

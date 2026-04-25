import { NextResponse } from 'next/server';
import { getSessionAvailability } from '@/lib/services/availability.service';

/** GET /api/availability?sessionId=... — remaining seats for a session. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  }

  try {
    const availability = await getSessionAvailability(sessionId);
    if (!availability) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(availability);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

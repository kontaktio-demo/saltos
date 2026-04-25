/**
 * Lightweight in-memory rate limiter (sliding window, per key).
 *
 * - Best-effort only: state lives in a single serverless instance,
 *   so a determined attacker can scale around it. For real protection
 *   in production swap this for Upstash Ratelimit (Redis) or Vercel KV.
 * - Good enough to stop accidental floods and most casual abuse.
 *
 * Returns `{ ok: true }` if the request is allowed, otherwise
 * `{ ok: false, retryAfter }` (seconds until the next allowed call).
 */

type Bucket = { count: number; resetAt: number };

// Module-scoped Map persists across requests on the same Node instance.
const buckets = new Map<string, Bucket>();

export type RateLimitOptions = {
  /** Max requests in the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfter: number };

export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, remaining: opts.limit - 1 };
  }

  if (bucket.count >= opts.limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, remaining: opts.limit - bucket.count };
}

/**
 * Periodically drop expired buckets so the Map doesn't grow unbounded.
 * Cheap O(n) scan on every 1000th call.
 */
let calls = 0;
export function maybeCleanup() {
  calls += 1;
  if (calls % 1000 !== 0) return;
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

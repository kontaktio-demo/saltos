/**
 * Mapping between Saltos pricing plans and Stripe Products / Prices.
 * Populate `stripe_price_id` in the `pricing_plans` table after creating
 * the matching Price in the Stripe Dashboard.
 *
 * For one-off, dynamic line items use `lib/stripe/checkout.ts` with
 * `price_data` instead of pre-created prices.
 */

export type StripePriceMap = Record<string, string>; // pricing_plan.slug -> stripe price id

/** Resolve a Stripe Price ID for a given pricing plan slug. */
export function resolveStripePriceId(slug: string, map: StripePriceMap): string | undefined {
  return map[slug];
}

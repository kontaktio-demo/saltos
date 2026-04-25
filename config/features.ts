/**
 * Feature flags. Toggle large pieces of functionality without code changes.
 * Read from env vars in production; defaults shown below.
 */
export const features = {
  online_booking: true,
  stripe_payments: true,
  user_accounts: true,
  birthday_offer: true,
  schools_offer: true,
  companies_offer: true,
  three_d_hero: true,
  newsletter: false,
} as const;

export type FeatureFlag = keyof typeof features;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}

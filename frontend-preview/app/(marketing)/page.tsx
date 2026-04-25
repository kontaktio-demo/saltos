import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/home/hero-section';
import { ParkZonesSection } from '@/components/sections/home/park-zones-section';
import { WhyUsSection } from '@/components/sections/home/why-us-section';
import { PricingTeaserSection } from '@/components/sections/home/pricing-teaser-section';
import { QuickBookingSection } from '@/components/sections/home/quick-booking-section';
import { TestimonialsSection } from '@/components/sections/home/testimonials-section';
import { CtaSection } from '@/components/sections/home/cta-section';
import { siteConfig } from '@/config/site';

/** ISR: regenerate from Supabase at most once per hour. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Park trampolin Łódź — ${siteConfig.name} | Rezerwacje online`,
  description:
    'Saltos Srebrzyńska — największy park trampolin w Łodzi. 6 stref, certyfikowani trenerzy, urodziny, lekcje WF, Pixel Games. Kup bilet online.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      'Bezpieczne trampoliny, certyfikowani trenerzy, strefy na każdy wiek. Kup bilet online.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ParkZonesSection />
      <WhyUsSection />
      <PricingTeaserSection />
      <QuickBookingSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}

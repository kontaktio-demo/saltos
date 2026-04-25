import { stripe } from './server';
import { siteConfig } from '@/config/site';

export type CheckoutLineItem = {
  name: string;
  description?: string;
  amount_grosze: number;
  quantity: number;
};

/**
 * Build a Stripe Checkout session for a reservation or pass purchase.
 * Returns the session — the caller (API route) can pass session.url back to the client.
 */
export async function createCheckoutSession(args: {
  items: CheckoutLineItem[];
  metadata: Record<string, string>;
  customerEmail?: string;
  successPath?: string;
  cancelPath?: string;
}) {
  const successUrl = `${siteConfig.url}${args.successPath ?? '/rezerwacje/sukces'}?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${siteConfig.url}${args.cancelPath ?? '/rezerwacje/anulowano'}`;

  return stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'blik', 'p24'],
    locale: 'pl',
    customer_email: args.customerEmail,
    line_items: args.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'pln',
        unit_amount: item.amount_grosze,
        product_data: {
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
        },
      },
    })),
    metadata: args.metadata,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

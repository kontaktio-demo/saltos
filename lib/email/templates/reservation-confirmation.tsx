import { siteConfig } from '@/config/site';
import { formatDateTime, formatPriceFromGrosze } from '@/lib/utils/format';

/**
 * Plain-HTML email template for reservation confirmation.
 * Intentionally inline-styled — many email clients strip <style>/<link>.
 */
export function reservationConfirmationEmail(args: {
  guestName: string;
  className: string;
  startsAt: string | Date;
  quantity: number;
  totalGrosze: number;
  reservationId: string;
}): string {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0B0B12;">
    <h1 style="color: #FF3D7F; margin: 0 0 16px;">${siteConfig.name}</h1>
    <p>Cześć ${args.guestName},</p>
    <p>Twoja rezerwacja w <strong>${siteConfig.name}</strong> została potwierdzona. Do zobaczenia!</p>
    <table style="width:100%; border-collapse: collapse; margin: 24px 0;">
      <tr><td style="padding:8px 0;"><strong>Zajęcia:</strong></td><td>${args.className}</td></tr>
      <tr><td style="padding:8px 0;"><strong>Termin:</strong></td><td>${formatDateTime(args.startsAt)}</td></tr>
      <tr><td style="padding:8px 0;"><strong>Liczba osób:</strong></td><td>${args.quantity}</td></tr>
      <tr><td style="padding:8px 0;"><strong>Kwota:</strong></td><td>${formatPriceFromGrosze(args.totalGrosze)}</td></tr>
      <tr><td style="padding:8px 0;"><strong>Numer:</strong></td><td>${args.reservationId}</td></tr>
    </table>
    <p>Do zobaczenia w parku!</p>
    <p style="color:#666; font-size:12px;">Ten e-mail został wygenerowany automatycznie. W razie pytań napisz na ${siteConfig.contact.email}.</p>
  </div>`;
}

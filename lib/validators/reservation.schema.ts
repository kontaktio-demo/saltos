import { z } from 'zod';

export const reservationSchema = z.object({
  sessionId: z.string().uuid('Nieprawidłowa sesja'),
  quantity: z.number().int().min(1).max(20),
  guestName: z.string().min(2, 'Podaj imię i nazwisko').max(120),
  guestEmail: z.string().email('Nieprawidłowy email'),
  guestPhone: z
    .string()
    .min(9, 'Nieprawidłowy numer telefonu')
    .max(20)
    .optional()
    .or(z.literal('')),
  notes: z.string().max(500).optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Musisz zaakceptować regulamin' }),
  }),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

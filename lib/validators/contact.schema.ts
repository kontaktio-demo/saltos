import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Podaj imię').max(120),
  email: z.string().email('Nieprawidłowy email'),
  phone: z.string().max(20).optional().or(z.literal('')),
  subject: z.string().max(200).optional().or(z.literal('')),
  message: z.string().min(10, 'Wiadomość jest za krótka').max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

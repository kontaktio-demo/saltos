import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Nieprawidłowy email'),
  password: z.string().min(8, 'Hasło musi mieć min. 8 znaków'),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2).max(120),
    email: z.string().email(),
    password: z.string().min(8, 'Hasło musi mieć min. 8 znaków'),
    confirmPassword: z.string().min(8),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'Musisz zaakceptować regulamin' }),
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Hasła nie są takie same',
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = z.object({
  email: z.string().email('Nieprawidłowy email'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

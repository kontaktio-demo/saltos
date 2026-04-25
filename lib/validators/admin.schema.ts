import { z } from 'zod';

export const classEditorSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Tylko małe litery, cyfry i myślniki'),
  title: z.string().min(2).max(120),
  shortDescription: z.string().max(200).optional().or(z.literal('')),
  description: z.string().max(5000).optional().or(z.literal('')),
  durationMinutes: z.number().int().min(15).max(480),
  capacity: z.number().int().min(1).max(500),
  minAge: z.number().int().min(0).max(120).optional().nullable(),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  isActive: z.boolean(),
});

export const pricingPlanSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(120),
  description: z.string().max(500).optional().or(z.literal('')),
  priceGrosze: z.number().int().min(0),
  type: z.enum(['single', 'pack_5', 'pack_10', 'monthly', 'yearly']),
  entries: z.number().int().min(1).optional().nullable(),
  stripePriceId: z.string().optional().or(z.literal('')),
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0),
});

export type ClassEditorInput = z.infer<typeof classEditorSchema>;
export type PricingPlanInput = z.infer<typeof pricingPlanSchema>;

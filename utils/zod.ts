import { z } from 'zod';

export const petSchema = z.object({
  petName: z.string().min(1, 'Pet name is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Number(val)), {
      message: 'Age must be a number',
    }),
});

export type PetFormData = z.infer<typeof petSchema>;
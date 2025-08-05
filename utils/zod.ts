import { z } from 'zod';

export const petSchema = z.object({
  petName: z.string().min(1, 'Pet name is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Number(val)) || Number(val) > 300 || Number(val) < 0 , {
      message: 'Age must be a number between 0 and 100',
    }),
});

export type PetFormData = z.infer<typeof petSchema>;
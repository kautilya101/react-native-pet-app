import { z } from 'zod';

export const petSchema = z.object({
  petName: z.string().min(1, 'Pet name is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z
    .string()
    .optional()
    .refine(val => {
      if (!val) return true; // allow empty since it's optional
      const num = Number(val);
      return !isNaN(num) && num >= 1 && num <= 300;
    }, {
      message: 'Age must be a number between 1 and 300',
    }),
});

export type PetFormData = z.infer<typeof petSchema>;
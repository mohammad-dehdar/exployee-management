import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.email.required')
    .email('validation.email.invalid'),
  password: z
    .string()
    .min(1, 'validation.password.required')
    .min(6, 'validation.password.minLength'),
  displayName: z.string().optional(),
  orgEmail: z
    .string()
    .email('validation.email.invalid')
    .optional()
    .or(z.literal('')),
});

export type RegisterUserFormData = z.infer<typeof registerUserSchema>;


import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.email.required')
    .email('validation.email.invalid'),
  password: z
    .string()
    .min(1, 'validation.password.required')
    .min(6, 'validation.password.minLength'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const LoginResponseSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    message: z.string().optional(),
    accessToken: z.string(),
    refreshToken: z.string().optional(),
    user: z.object({
      id: z.string(),
      email: z.string().email(),
      role: z.enum(['admin', 'user', 'employee']),
      name: z.string().optional(),
    }),
  }),
  z.object({
    success: z.literal(false),
    message: z.string(),
  }),
]);

export type LoginResponse = z.infer<typeof LoginResponseSchema>;


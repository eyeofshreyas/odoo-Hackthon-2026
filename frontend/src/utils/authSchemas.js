import { z } from 'zod';

/* ── Shared rules ── */
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    'Password must contain at least one special character',
  );

/* ── Login schema ── */
export const loginSchema = z.object({
  email:    emailSchema,
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

/* ── Signup schema ── */
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(80, 'Full name is too long')
      .regex(/^[a-zA-Z\s'-]+$/, 'Full name contains invalid characters'),
    email:           emailSchema,
    password:        passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role:            z.string().min(1, 'Please select a role'),
    terms:           z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms to continue' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path:    ['confirmPassword'],
  });

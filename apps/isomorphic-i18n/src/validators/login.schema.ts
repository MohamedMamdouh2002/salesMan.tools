import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(6) .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character (@, $, !, %, *, ?, &).' }),
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;

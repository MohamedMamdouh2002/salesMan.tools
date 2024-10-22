import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().min(1, { message: messages.lastNameRequired }),
  email: validateEmail,
  phoneNumber: z
    .string()
    .min(8, { message: 'Phone number must be at least 8 digits' })
    .max(15, { message: 'Phone number must be at most 15 digits' })
    .regex(/^[0-9]+$/, { message: 'Phone number must contain only digits'}),
  password: validatePassword,
  // confirmPassword: validateConfirmPassword,
  // isAgreed: z.boolean(),
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;

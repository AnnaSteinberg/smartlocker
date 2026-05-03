
import { z } from 'zod';

const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email format');

const passwordSchema = z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long');

export const registerBodySchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
    })
    .strict();

export const loginBodySchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
    })
    .strict();

export const refreshBodySchema = z
    .object({
        refreshToken: z.string().trim().min(1, 'Refresh token is required'),
    })
    .strict();

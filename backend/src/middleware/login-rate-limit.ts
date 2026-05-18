import rateLimit from 'express-rate-limit';
import { RATE_LIMIT } from '../constants/rate-limit';

export const loginRateLimit = rateLimit({
    windowMs: RATE_LIMIT.LOGIN_WINDOW_MS,
    max: RATE_LIMIT.LOGIN_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many login attempts. Please try again later.',
    }
    });
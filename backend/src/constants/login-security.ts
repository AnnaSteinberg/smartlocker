export const LOGIN_SECURITY = {
    MAX_FAILED_ATTEMPTS: 5,
    LOCKOUT_MS: 10 * 60 * 1000, // 10 minutes
} as const;
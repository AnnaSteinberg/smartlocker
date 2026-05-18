import { LOGIN_SECURITY } from '../constants/login-security';

type AttemptState = {
    failedCount: number;
    lockedUntilMs?: number;
};

const attemptsStore = new Map<string, AttemptState>();

function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

export function assertLoginAllowed(email: string): void {
    const key = normalizeEmail(email);
    const state = attemptsStore.get(key);

    if (!state?.lockedUntilMs) {
        return;
    }

    if (Date.now() >= state.lockedUntilMs) {
        attemptsStore.delete(key);
        return;
    }

    throw new Error('ACCOUNT_LOCKED');
}

export function registerFailedLogin(email: string): void {
    const key = normalizeEmail(email);
    const state = attemptsStore.get(key) ?? { failedCount: 0 };

    state.failedCount += 1;

    if (state.failedCount >= LOGIN_SECURITY.MAX_FAILED_ATTEMPTS) {
        state.lockedUntilMs = Date.now() + LOGIN_SECURITY.LOCKOUT_MS;
    }

    attemptsStore.set(key, state);
}

export function resetLoginAttempts(email: string): void {
    const key = normalizeEmail(email);
    attemptsStore.delete(key);
}
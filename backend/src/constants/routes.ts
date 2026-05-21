export const API_PREFIX='/api';
export const HEALTH_PATH = '/health';

export const AUTH_PATHS = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    ADMIN_ONLY: '/auth/admin-only',
    OPERATOR_OR_ADMIN: '/auth/operator-or-admin',
    REFRESH: '/auth/refresh',
    ASSIGN_ROLE: '/auth/assign-role',
} as const;

export const MONITORING_PATHS = {
    LOGS: '/monitoring/logs',
} as const;
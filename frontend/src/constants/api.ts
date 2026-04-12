
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const API_CONFIG = {
    BASE_URL: apiBaseUrl,
    HEALTH_PATH: '/api/health',
} as const;
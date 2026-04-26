export const LOG_LEVELS = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
} as const;

export type LogLevel = (typeof LOG_LEVELS)[keyof typeof LOG_LEVELS];

export interface LogEntry {
    id: string;
    level: LogLevel;
    message: string;
    timestamp: string;
    details?: string;
}

export interface CreateLogEntryParams {
    level: LogLevel;
    message: string;
    details?: string;
}
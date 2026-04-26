import { logRepository } from '../repositories/log.repository';
import type { LogLevel } from '../types/log';

function formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

function formatDetails(error?: unknown): string | undefined {
    if (!error) {
        return undefined;
    }

    if (error instanceof Error) {
        return error.stack ?? error.message;
    }

    return String(error);
}

function persist(level: LogLevel, message: string, error?: unknown): string {
    logRepository.save({
        level,
        message,
        details: formatDetails(error),
    });

    return formatMessage(level, message);
}

export const logger = {
    info(message: string) {
        console.log(persist('info', message));
    },

    warn(message: string) {
        console.warn(persist('warn', message));
    },

    error(message: string, error?: unknown) {
        console.error(persist('error', message, error), error);
    },
};
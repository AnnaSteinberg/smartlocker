type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
}

export const logger = {
    info(message: string) {
        console.log(formatMessage('INFO', message));
    },

    warn(message: string) {
        console.warn(formatMessage('WARN', message));
    },

    error(message: string, error?: unknown) {
        console.error(formatMessage('ERROR', message), error);
    },
};
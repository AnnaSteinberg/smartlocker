type LogLevel = 'info' | 'warn' | 'error';

function formatMessage(level: string, message:string):string{
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
}

export const logger = {
    info(message:string){
        console.log(formatMessage('info', message));
    },
    warn(message:string){
        console.warn(formatMessage('warn', message));
    },
    error(message:string, error?: unknown ){
        console.error(formatMessage('error', message), error);
    }
}
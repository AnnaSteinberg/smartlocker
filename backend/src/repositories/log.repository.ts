import { randomUUID } from 'crypto';
import type { CreateLogEntryParams, LogEntry, LogLevel } from '../types/log';

export interface LogRepository {
    save(params: CreateLogEntryParams): LogEntry;
    list(): LogEntry[];
    listByLevel(level: LogLevel): LogEntry[];
}

class InMemoryLogRepository implements LogRepository {
    private readonly entries: LogEntry[] = [];

    save(params: CreateLogEntryParams): LogEntry {
        const entry: LogEntry = {
            id: randomUUID(),
            level: params.level,
            message: params.message,
            timestamp: new Date().toISOString(),
            details: params.details,
        };

        this.entries.push(entry);
        return entry;
    }

    list(): LogEntry[] {
        return [...this.entries];
    }

    listByLevel(level: LogLevel): LogEntry[] {
        return this.entries.filter((entry) => entry.level === level);
    }
}

export const logRepository: LogRepository = new InMemoryLogRepository();
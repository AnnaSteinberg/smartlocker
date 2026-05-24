import { logRepository } from '../repositories/log.repository';
import type { LogEntry, LogLevel } from '../types/log';

type GetLogsParams = {
    level?: LogLevel;
    limit: number;
    offset: number;
};

type GetLogsResult = {
    total: number;
    count: number;
    limit: number;
    offset: number;
    logs: LogEntry[];
};

export function getLogs(params: GetLogsParams): GetLogsResult {
    const logs = params.level
        ? logRepository.listByLevel(params.level)
        : logRepository.list();

    const sortedLogs = [...logs].sort((left, right) => {
        return (
            new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime()
        );
    });

    const paginatedLogs = sortedLogs.slice(
        params.offset,
        params.offset + params.limit
    );

    return {
        total: sortedLogs.length,
        count: paginatedLogs.length,
        limit: params.limit,
        offset: params.offset,
        logs: paginatedLogs,
    };
}
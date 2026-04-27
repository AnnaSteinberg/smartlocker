import { HTTP_STATUS } from '../constants/http-status';
import { AppError } from '../errors/app-error';
import { logRepository } from '../repositories/log.repository';
import {LOG_LEVELS} from "../constants/log.constants";
import {LogEntry, LogLevel} from "../types/log";

const LOG_LEVEL_SET = new Set<string>(Object.values(LOG_LEVELS));

function isLogLevel(value: string): value is LogLevel {
    return LOG_LEVEL_SET.has(value);
}

export function getLogs(level?: string): LogEntry[] {
    if (!level) {
        return logRepository.list();
    }

    const normalizedLevel = level.trim().toLowerCase();

    if (!isLogLevel(normalizedLevel)) {
        throw new AppError(
            'Invalid log level.',
            HTTP_STATUS.BAD_REQUEST
        );
    }

    return logRepository.listByLevel(normalizedLevel);
}
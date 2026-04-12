import { NextFunction, Request, Response } from 'express';
import { logger } from '../lib/logger';

export function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
        logger.info(`Completed request: ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
    })

    next();
}
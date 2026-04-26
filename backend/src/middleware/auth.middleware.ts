import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { HTTP_STATUS } from '../constants/http-status';
import { AppError } from '../errors/app-error';
import type { AuthPayload } from '../types/auth';
import type { AuthenticatedRequest } from '../types/request';
import { AUTH_HEADER } from '../constants/auth';

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith(AUTH_HEADER.BEARER_PREFIX)) {
        return next(
            new AppError('Authorization token is required', HTTP_STATUS.UNAUTHORIZED)
        );
    }

    const token = authHeader.replace(AUTH_HEADER.BEARER_PREFIX, '');

    try {
        const payload = jwt.verify(token, config.jwtAccessSecret) as AuthPayload;
        req.user = payload;
        return next();
    } catch (error) {
        return next(
            new AppError('Invalid or expired token', HTTP_STATUS.UNAUTHORIZED)
        );
    }
}
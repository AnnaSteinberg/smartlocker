import { NextFunction, Response } from 'express';
import { HTTP_STATUS } from '../constants/http-status';
import { AppError } from '../errors/app-error';
import type { Role } from '../constants/roles';
import type { AuthenticatedRequest } from '../types/request';

export function requireRoles(...allowedRoles: Role[]){
    return function roleMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction){
        if(!req.user){
            return next(new AppError('Authentication is required', HTTP_STATUS.UNAUTHORIZED));
        }

        if(!allowedRoles.includes(req.user.role)){
            return next(
                new AppError('Access denied', HTTP_STATUS.FORBIDDEN)
            );
        }

        return  next();
    };
}
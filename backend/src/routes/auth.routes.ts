import { Router, Request, Response, NextFunction } from 'express';
import { AUTH_PATHS } from '../constants/routes';
import { HTTP_STATUS } from '../constants/http-status';
import { login, register, refreshAccessToken } from '../services/auth.service';
import { ROLES } from '../constants/roles';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/roles.middleware';
import type { AuthenticatedRequest } from '../types/request';

const authRouter = Router();

authRouter.post(AUTH_PATHS.REGISTER, (req:Request, res: Response, next: NextFunction) => {
    try{
        const result= register(req.body);
        res.status(HTTP_STATUS.CREATED).json(result);
    }catch (e) {
        next(e);
    }
});

authRouter.post(AUTH_PATHS.LOGIN, (req:Request, res: Response, next: NextFunction) => {
    try{
        const result= login(req.body);
        res.status(HTTP_STATUS.OK).json(result);
    }catch (e) {
        next(e);
    }
});

authRouter.get(
    AUTH_PATHS.ME,
    authenticate,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            res.status(HTTP_STATUS.OK).json({
                user: req.user,
            });
        } catch (error) {
            next(error);
        }
    }
);

authRouter.get(
    AUTH_PATHS.ADMIN_ONLY,
    authenticate,
    requireRoles(ROLES.ADMIN),
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            res.status(HTTP_STATUS.OK).json({
                message: 'Admin access granted',
                user: req.user,
            });
        } catch (error) {
            next(error);
        }
    }
);

authRouter.get(
    AUTH_PATHS.OPERATOR_OR_ADMIN,
    authenticate,
    requireRoles(ROLES.OPERATOR, ROLES.ADMIN),
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            res.status(HTTP_STATUS.OK).json({
                message: 'Operator or admin access granted',
                user: req.user,
            });
        } catch (error) {
            next(error);
        }
    }
);

authRouter.post(
    AUTH_PATHS.REFRESH,
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = refreshAccessToken(req.body);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
);

export default authRouter;
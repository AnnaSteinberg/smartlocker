import { Router, Request, Response, NextFunction } from 'express';
import { MONITORING_PATHS } from '../constants/routes';
import { HTTP_STATUS } from '../constants/http-status';
import { getLogs } from '../services/monitoring.service';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/roles.middleware';
import { ROLES } from '../constants/roles';

const monitoringRouter = Router();

monitoringRouter.get(
    MONITORING_PATHS.LOGS,
    authenticate,
    requireRoles(ROLES.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const level = typeof req.query.level === 'string' ? req.query.level : undefined;
            const logs = getLogs(level);

            res.status(HTTP_STATUS.OK).json({
                count: logs.length,
                logs,
            });
        } catch (error) {
            next(error);
        }
    }
);

export default monitoringRouter;
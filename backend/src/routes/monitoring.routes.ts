import { Router, Request, Response, NextFunction } from 'express';
import { MONITORING_PATHS } from '../constants/routes';
import { HTTP_STATUS } from '../constants/http-status';
import { getLogs } from '../services/monitoring.service';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/roles.middleware';
import { ROLES } from '../constants/roles';
import { logsQuerySchema } from '../schemas/monitoring.schema';
import { parseOrThrow } from '../lib/validation';

const monitoringRouter = Router();

monitoringRouter.get(
    MONITORING_PATHS.LOGS,
    authenticate,
    requireRoles(ROLES.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = parseOrThrow(logsQuerySchema, req.query);
            const result = getLogs(query);

            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
);

export default monitoringRouter;
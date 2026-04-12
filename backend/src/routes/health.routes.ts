import { Router, Request, Response, NextFunction } from 'express';
import {getHealthStatus} from "../services/health.service";
import {HEALTH_PATH} from "../constants/routes";


const healthRouter = Router();

healthRouter.get(HEALTH_PATH, async (req: Request, res: Response, next:NextFunction) => {
    try {
        const result = await getHealthStatus();
        res.json(result);
    }catch (error) {
       next(error);
    }

});


export default healthRouter;
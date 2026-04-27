import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import {errorHandler} from "./middleware/error-handler";
import {notFoundHandler} from "./middleware/not-found-handler";
import {API_PREFIX} from "./constants/routes";
import {requestLogger} from "./middleware/request-logger";
import authRouter from "./routes/auth.routes";
import monitoringRouter from './routes/monitoring.routes';

export function createApp(){
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(requestLogger);

    app.use(API_PREFIX,healthRouter);
    app.use(API_PREFIX, authRouter);
    app.use(API_PREFIX, monitoringRouter);

   app.use(notFoundHandler)
    app.use(errorHandler);

    return app;

}


import {NextFunction, Request, Response} from "express";
import {AppError} from "../errors/app-error";
import {HTTP_STATUS} from "../constants/http-status";
import {logger} from "../lib/logger";

export function errorHandler(error: Error,req: Request, res: Response, next: NextFunction) {
    logger.error('Unhandled error: ',error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    return  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error"
    });
}
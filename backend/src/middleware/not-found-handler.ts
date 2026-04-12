import {NextFunction, Request, Response} from "express";
import {AppError} from "../errors/app-error";
import {HTTP_STATUS} from "../constants/http-status";

export function notFoundHandler( req: Request, res: Response, next: NextFunction ) {
    next(new AppError('Route not found', HTTP_STATUS.NOT_FOUND));
}
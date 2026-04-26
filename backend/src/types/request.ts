import type { Request } from 'express';
import type { AuthPayload } from './auth';

export interface AuthenticatedRequest extends Request {
    user?: AuthPayload;
}
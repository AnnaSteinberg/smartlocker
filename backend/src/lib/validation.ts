import { z, type ZodTypeAny } from 'zod';
import { HTTP_STATUS } from '../constants/http-status';
import { AppError } from '../errors/app-error';

export function parseOrThrow<TSchema extends ZodTypeAny>(
    schema: TSchema,
    payload: unknown
): z.infer<TSchema> {
    const parsed = schema.safeParse(payload);

    if (!parsed.success) {
        const message = parsed.error.issues[0]?.message ?? 'Invalid request body';
        throw new AppError(message, HTTP_STATUS.BAD_REQUEST);
    }

    return parsed.data;
}
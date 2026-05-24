import {LOG_LEVEL_VALUES} from "../constants/log.constants";
import {z} from "zod";

export const logsQuerySchema = z
    .object({
        level: z.enum(LOG_LEVEL_VALUES).optional(),
        limit: z.coerce.number().int().min(1).max(100).default(50),
        offset: z.coerce.number().int().min(0).default(0),
    })
    .strict();
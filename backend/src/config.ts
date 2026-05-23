// const port=process.env.PORT||'3001';
// const lambdaUrl=process.env.LAMBDA_URL;
// const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
// const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
//
// if(!lambdaUrl){
//     throw new Error('Missing lambda URL');
// }
//
// if (!jwtAccessSecret) {
//     throw new Error('JWT_ACCESS_SECRET is not defined');
// }
//
// if (!jwtRefreshSecret) {
//     throw new Error('JWT_REFRESH_SECRET is not defined');
// }

import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().default('3001'),
    LAMBDA_URL: z.string().url('LAMBDA_URL must be a valid URL'),
    JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required'),
    JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
});

const env = envSchema.parse(process.env);

export const config = {
    port: env.PORT,
    lambdaUrl: env.LAMBDA_URL,
    jwtAccessSecret: env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: env.JWT_REFRESH_SECRET,
}
const port=process.env.PORT||'3001';
const lambdaUrl=process.env.LAMBDA_URL;
const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

if(!lambdaUrl){
    throw new Error('Missing lambda URL');
}

if (!jwtAccessSecret) {
    throw new Error('JWT_ACCESS_SECRET is not defined');
}

if (!jwtRefreshSecret) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
}

export const config = {
    port,
    lambdaUrl,
    jwtAccessSecret,
    jwtRefreshSecret,
}
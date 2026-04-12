const port=process.env.PORT||'3001';
const lambdaUrl=process.env.LAMBDA_URL;

if(!lambdaUrl){
    throw new Error('Missing lambda URL');
}

export const config = {
    port,
    lambdaUrl,
}
import {HealthResponse} from "../types/health.types";
import {config} from "../config";
import {AppError} from "../errors/app-error";
import {LambdaHealthResponse} from "../types/lambda.types";
import {HTTP_STATUS} from "../constants/http-status";

// const {healthLambda} = require('../../../lambda/health.js');


export async function getHealthStatus(): Promise<HealthResponse> {
    // const lambdaUrl=process.env.LAMBDA_URL;
    // const result=await  healthLambda();
    try{
        const response=await  fetch(`${config.lambdaUrl}/health`);

        if (!response.ok) {
            throw new AppError('Lambda service responded with an error: ' , HTTP_STATUS.BAD_GATEWAY);
        }


        const result:LambdaHealthResponse=await response.json();

        return{
            status: result.status,
            source:result.service
        };
    }catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError('Lambda service is unavailable', HTTP_STATUS.BAD_GATEWAY);
    }

}
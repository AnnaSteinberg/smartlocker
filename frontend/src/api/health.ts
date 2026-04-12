import {API_CONFIG} from "../constants/api.ts";
import type {ErrorApiResponse, HealthApiResponse} from "../types/health.ts";
import  {buildApiUrl} from "../utils";

export async function fetchHealthStatus(): Promise<HealthApiResponse> {
    const response = await fetch(buildApiUrl(API_CONFIG.HEALTH_PATH));

    if(!response.ok) {
        const errorData:ErrorApiResponse = await response.json();
        throw new Error('message' in errorData ? errorData.message : 'Request failed')
    }
    const data: HealthApiResponse = await response.json();

    return  data;
}
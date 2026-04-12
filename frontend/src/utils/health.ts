import type {HealthApiResponse} from "../types/health.ts";

export function formatHealthStatus(data:HealthApiResponse) :string{
    return ` ${data.status} (${data.source})`;
}
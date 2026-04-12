import type {StatusVariant} from "../constants/status";

export interface UseHealthCheckResult{
    statusText: string;
    statusVariant: StatusVariant;
    isLoading: boolean;
    handleHealthCheck: ()=>Promise<void>;
    resetHealthCheck: ()=>void;
}
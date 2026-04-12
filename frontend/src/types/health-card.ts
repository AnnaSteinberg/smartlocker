import type {StatusVariant} from "../constants/status";


export interface HealthCardState {
    statusText: string;
    statusVariant: StatusVariant;
    isLoading: boolean;
}
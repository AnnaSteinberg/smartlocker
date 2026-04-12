import {HEALTH_TEXT} from "./health-text";
import {STATUS_VARIANTS} from "./status";
import type {HealthCardState} from "../types/health-card";

export const HEALTH_CARD_INITIAL_STATE: HealthCardState = {
    statusText: HEALTH_TEXT.STATUS_IDLE,
    statusVariant: STATUS_VARIANTS.IDLE,
    isLoading: false,
} as const;
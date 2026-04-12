import { useState } from 'react';
import { fetchHealthStatus } from '../api/health';
import { HEALTH_CARD_INITIAL_STATE } from '../constants/health-card';
import { HEALTH_TEXT } from '../constants/health-text';
import { STATUS_VARIANTS, type StatusVariant } from '../constants/status';
import { formatHealthStatus } from '../utils';
import type {UseHealthCheckResult} from "../types/health-hook";

export function useHealthCheck(): UseHealthCheckResult {
    const [statusText, setStatusText] = useState<string>(HEALTH_CARD_INITIAL_STATE.statusText);
    const [statusVariant, setStatusVariant] = useState<StatusVariant>(HEALTH_CARD_INITIAL_STATE.statusVariant);
    const [isLoading, setIsLoading] = useState<boolean>(HEALTH_CARD_INITIAL_STATE.isLoading);

    async function handleHealthCheck() {
        try {
            setIsLoading(true);
            setStatusVariant(STATUS_VARIANTS.LOADING);
            setStatusText(HEALTH_TEXT.STATUS_LOADING);

            const data = await fetchHealthStatus();

            setStatusVariant(STATUS_VARIANTS.SUCCESS);
            setStatusText(formatHealthStatus(data));
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : HEALTH_TEXT.STATUS_UNKNOWN_ERROR;

            setStatusVariant(STATUS_VARIANTS.ERROR);
            setStatusText(message);
        } finally {
            setIsLoading(false);
        }
    }

    function resetHealthCheck() {
        setStatusText(HEALTH_CARD_INITIAL_STATE.statusText);
        setStatusVariant(HEALTH_CARD_INITIAL_STATE.statusVariant);
        setIsLoading(HEALTH_CARD_INITIAL_STATE.isLoading);
    }

    return {
        statusText,
        statusVariant,
        isLoading,
        handleHealthCheck,
        resetHealthCheck,
    };
}
import {HEALTH_TEXT} from '../../constants/health-text';
import {useHealthCheck} from "../../hooks/useHealthCheck";
import './HealthCard.css';
import {getStatusBadgeLabel} from "../../utils/status.ts";

export function HealthCard() {
    const {statusText, statusVariant, isLoading, handleHealthCheck, resetHealthCheck} = useHealthCheck();

    return (
        <section className="card">
            <p className="eyebrow">{HEALTH_TEXT.SUBTITLE}</p>
            <h1 className="title">{HEALTH_TEXT.TITLE}</h1>
            <p className="description">{HEALTH_TEXT.DESCRIPTION}</p>

            <div className="actions">
                <button
                    className="health-button"
                    type="button"
                    onClick={handleHealthCheck}
                    disabled={isLoading}
                >
                    {isLoading ? HEALTH_TEXT.BUTTON_LOADING : HEALTH_TEXT.BUTTON_IDLE}
                </button>

                <button
                    className='reset-button'
                    type="button"
                    onClick={resetHealthCheck}
                    disabled={isLoading}
                >
                    {HEALTH_TEXT.BUTTON_RESET}
                </button>
            </div>


            <div className={`result-box result-box--${statusVariant}`}>
                <div className="result-header">
                    <span className="result-label">{HEALTH_TEXT.STATUS_LABEL}</span>
                    <span className={`status-badge status-badge--${statusVariant}`}>
                        {getStatusBadgeLabel(statusVariant)}
                    </span>
                </div>
                <span className="result-value">{statusText}</span>
            </div>
        </section>
    );
}
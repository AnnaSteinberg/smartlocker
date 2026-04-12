import { STATUS_VARIANTS, type StatusVariant } from '../constants/status';

export function getStatusBadgeLabel(statusVariant: StatusVariant): string {
    switch (statusVariant) {
        case STATUS_VARIANTS.LOADING:
            return 'Loading';
        case STATUS_VARIANTS.SUCCESS:
            return 'Success';
        case STATUS_VARIANTS.ERROR:
            return 'Error';
        case STATUS_VARIANTS.IDLE:
        default:
            return '      ';
    }
}
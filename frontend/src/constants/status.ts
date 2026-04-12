export const STATUS_VARIANTS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

export type StatusVariant =
    (typeof STATUS_VARIANTS)[keyof typeof STATUS_VARIANTS];
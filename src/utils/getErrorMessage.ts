import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

interface ApiError {
    error?: {
        message?: string;
        code?: string;
        statusCode?: number;
        [key: string]: unknown;
    };
}

export function getErrorMessage(err: unknown): string {
    if (!err || typeof err !== 'object') return 'Something went wrong';

    // RTK Query fetch error
    if ('status' in err) {
        const fetchError = err as FetchBaseQueryError;
        if ('error' in fetchError && typeof fetchError.error === 'string') {
            return fetchError.error;
        } else if ('data' in fetchError && fetchError.data && typeof fetchError.data === 'object') {
            const apiError = fetchError.data as ApiError;
            return apiError.error?.message ?? 'Something went wrong';
        } else {
            return 'Something went wrong';
        }
    }

    // Serialized error
    if ('message' in err && typeof (err as SerializedError).message === 'string') {
        return (err as SerializedError).message!;
    }

    return 'Something went wrong';
}

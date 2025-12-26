import { z } from 'zod';

export const TransactionStatus = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIALLY: 'partially',
} as const;

export const PaymentGateway = {
    TAP_PAYMENT: 'tap_payment',
    STRIPE: 'stripe',
} as const;

export type TTransaction = {
    id: string;
    userId: string;
    courseId?: string | null;
    planId?: string | null;
    gateway: string;
    status: string;
    amount: number;
    currency: string;
    externalRef?: string | null;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    // Relations - Assuming these might be populated
    user?: {
        id: string;
        displayName: string;
        email: string;
        avatarUrl?: string;
    };
    course?: {
        id: string;
        title: string;
    };
    plan?: {
        id: string;
        title: string;
    };
};

// Schema for editing
export const TransactionEditSchema = z.object({
    status: z.enum([
        'pending',
        'processing',
        'completed',
        'failed',
        'cancelled',
        'refunded',
        'partially',
    ]),
    amount: z.coerce.number().min(0).optional(),
    currency: z.string().length(3).optional(),
    externalRef: z.string().optional(),
    description: z.string().optional(),
});

export type TTransactionEditSchema = z.infer<typeof TransactionEditSchema>;

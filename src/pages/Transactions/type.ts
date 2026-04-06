export const TransactionStatus = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
} as const;

export const PaymentGateway = {
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
} as const;

export type TTransaction = {
    id: string;
    membershipId: string;
    amount: string | number;
    currency: string;
    paymentGateway: string;
    paymentStatus: string;
    transactionType: string;
    externalId: string | null;
    description: string | null;
    metadata?: {
        invoiceId?: string;
        [key: string]: any;
    };
    processedAt: string | null;
    refundedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

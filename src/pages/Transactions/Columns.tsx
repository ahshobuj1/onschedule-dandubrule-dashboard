import type { ColumnDef } from '@tanstack/react-table';
import type { TTransaction } from './type';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Copy } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { formatDate } from '@/utils/formatDate';
import EditTransaction from './EditTransaction';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const columns: ColumnDef<TTransaction>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => (
            <div
                className="font-mono text-xs text-muted-foreground w-20 truncate"
                title={row.original.id}
            >
                {row.original.id.slice(0, 8)}...
            </div>
        ),
    },
    {
        accessorKey: 'user',
        header: 'User',
        cell: ({ row }) => {
            const user = row.original.user;
            if (!user)
                return <span className="text-muted-foreground text-xs">{row.original.userId}</span>;

            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                        <AvatarFallback className="text-[10px]">
                            {user.displayName?.[0] || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.displayName}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => (
            <div className="font-medium">
                {row.original.currency} {row.original.amount}
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'outline';

            switch (status) {
                case 'completed':
                    variant = 'default';
                    break; // Usually maps to green/primary
                case 'pending':
                    variant = 'secondary';
                    break;
                case 'processing':
                    variant = 'secondary';
                    break;
                case 'failed':
                    variant = 'destructive';
                    break;
                case 'cancelled':
                    variant = 'destructive';
                    break;
                case 'refunded':
                    variant = 'outline';
                    break;
            }

            return (
                <Badge variant={variant} className="capitalize">
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'gateway',
        header: 'Gateway',
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize font-normal">
                {row.original.gateway.replace('_', ' ')}
            </Badge>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-sm">{formatDate(row.original.createdAt)}</span>
                <span className="text-xs text-muted-foreground">
                    {new Date(row.original.createdAt).toLocaleTimeString()}
                </span>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const transaction = row.original;
            return (
                <div className="flex items-center gap-2">
                    <EditTransaction
                        item={transaction}
                        trigger={
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                            </Button>
                        }
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(transaction.id);
                                    toast.success('ID copied to clipboard');
                                }}
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(transaction.externalRef || '');
                                    toast.success('Reference copied');
                                }}
                                disabled={!transaction.externalRef}
                            >
                                Copy External Ref
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

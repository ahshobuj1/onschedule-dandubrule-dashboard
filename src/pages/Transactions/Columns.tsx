import type { ColumnDef } from '@tanstack/react-table';
import type { TTransaction } from './type';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatDate';

export const columns: ColumnDef<TTransaction>[] = [
  {
    id: 'serialNumber',
    header: 'SN',
    cell: ({ row }) => (
      <div className="text-muted-foreground w-8">
        {row.index + 1}
      </div>
    ),
  },
  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  //   cell: ({row}) => (
  //     <div
  //       className="font-mono text-xs text-muted-foreground w-20 truncate"
  //       title={row.original.id}>
  //       {row.original.id.slice(0, 8)}...
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <div className="font-medium uppercase">
        {row.original.amount} {row.original.currency}
      </div>
    ),
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      let variant: 'default' | 'secondary' | 'destructive' | 'outline' =
        'outline';

      switch (status) {
        case 'completed':
          variant = 'default';
          break;
        case 'pending':
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
    accessorKey: 'paymentGateway',
    header: 'Gateway',
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize font-normal">
        {row.original.paymentGateway.replace('_', ' ')}
      </Badge>
    ),
  },
  {
    accessorKey: 'transactionType',
    header: 'Type',
    cell: ({ row }) => (
      <span className="capitalize text-sm">{row.original.transactionType}</span>
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
];

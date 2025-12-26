import type {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {ChevronsDown, ChevronsRight, MoreHorizontal} from 'lucide-react';
import {formatDate} from '@/utils/formatDate';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import type {IPlan} from './type';
import PlanStatusCell from './PlanStatusCell';

export const columns: ColumnDef<IPlan>[] = [
  //  SL
  {
    id: 'sl',
    header: '#',
    cell: ({row, table}) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;

      return pageIndex * pageSize + row.index + 1;
    },
  },

  //  Plan
  {
    header: 'Plan',
    cell: ({row}) => {
      const plan = row.original;

      return (
        <div className="flex flex-col max-w-[320px]">
          <span className="font-medium">{plan.name}</span>
          <span className="text-xs text-muted-foreground line-clamp-2">
            {plan.description}
          </span>
        </div>
      );
    },
  },

  //  Price
  {
    header: 'Price',
    cell: ({row}) => {
      const plan = row.original;

      return (
        <div className="flex flex-col">
          <span className="font-medium">
            ${plan.limits.pricing.monthly}
            <span className="text-xs text-muted-foreground"> / month</span>
          </span>

          <span className="text-xs text-muted-foreground">
            ${plan.limits.pricing.annualAmount} / year
          </span>
        </div>
      );
    },
  },

  //  Billing
  {
    accessorKey: 'billingCycle',
    header: 'Billing',
    cell: ({row}) => (
      <Badge variant="outline">{row.original.billingCycle}</Badge>
    ),
  },

  //  Features
  {
    header: 'Features',
    cell: ({row}) => {
      const features = row.original.features as string[];

      if (!features?.length) {
        return <span className="text-muted-foreground">—</span>;
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge variant="secondary" className="cursor-pointer select-none">
              {features.length} features{' '}
              <ChevronsDown className="text-primary" />
            </Badge>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="max-w-[300px]">
            {features.map((feature) => (
              <DropdownMenuItem key={feature}>
                <ChevronsRight className="text-primary" />
                {feature}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  //  Highlights

  {
    header: 'Highlights',
    cell: ({row}) => {
      const l = row.original.limits;

      const highlights = [
        l.enableAPI && 'API Access',
        l.enableIntegrations && 'Integrations',
        l.enablePrioritySupport && 'Priority Support',
        l.enableAdvancedAnalytics && 'Advanced Analytics',
        l.enableMultiSite && 'Multi-site',
      ].filter(Boolean) as string[];

      if (!highlights.length) {
        return <span className="text-muted-foreground">—</span>;
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge variant="secondary" className="cursor-pointer select-none">
              View
              <ChevronsDown className="text-primary" />
            </Badge>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            {highlights.map((item) => (
              <DropdownMenuItem key={item}>
                <ChevronsRight className="text-primary" />
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  //  Status

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({row}) => (
      <PlanStatusCell
        planId={row.original.id}
        currentStatus={row.original.status}
      />
    ),
  },

  //  Created
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({row}) => formatDate(row.original.createdAt),
  },

  //  Actions
  {
    id: 'actions',
    header: 'Actions',
    cell: ({row}) => {
      const plan = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Plan</DropdownMenuItem>
            <DropdownMenuItem>Edit Plan</DropdownMenuItem>

            {plan.status === 'active' ? (
              <DropdownMenuItem className="text-yellow-600">
                Deactivate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="text-green-600">
                Activate
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete Plan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

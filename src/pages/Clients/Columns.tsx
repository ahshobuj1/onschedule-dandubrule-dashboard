import type {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {MoreHorizontal} from 'lucide-react';
import {formatDate} from '@/utils/formatDate';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import type {IClient} from './type';

export const columns: ColumnDef<IClient>[] = [
  //  Client / Company
  {
    header: 'Client',
    cell: ({row}) => {
      const client = row.original;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{client.name}</span>
          <span className="text-xs text-muted-foreground">
            {client.company}
          </span>
        </div>
      );
    },
  },

  //  Email
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({row}) => <span className="font-medium">{row.original.email}</span>,
  },

  //  Phone
  {
    accessorKey: 'phone',
    header: 'Phone',
  },

  //  Cranes
  {
    accessorKey: 'cranes',
    header: 'Cranes',
    cell: ({row}) => <Badge variant="outline">{row.original.cranes}</Badge>,
  },

  //  Location
  {
    accessorKey: 'location',
    header: 'Location',
  },

  //  Status
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({row}) =>
      row.original.status === 'active' ? (
        <Badge className="bg-green-600 text-white">active</Badge>
      ) : (
        <Badge variant="outline">inactive</Badge>
      ),
  },

  //  Created At
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
      const client = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>

            {client.status === 'active' ? (
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
              Delete Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

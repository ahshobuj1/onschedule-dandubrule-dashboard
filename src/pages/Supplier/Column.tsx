import type {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover';
import {ScrollArea} from '@/components/ui/scroll-area';
import {ChevronDown, MoreHorizontal} from 'lucide-react';
import {formatDate} from '@/utils/formatDate';
import {Link} from 'react-router';
import type {ISupplier} from './type';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import {IconLiveView, IconUserEdit} from '@tabler/icons-react';
import EditSupplier from './EditSupplier';

export const Columns: ColumnDef<ISupplier>[] = [
  {
    accessorKey: 'name',
    header: 'Supplier Name',
    cell: ({row}) => <div className="font-semibold">{row.original.name}</div>,
  },

  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({row}) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },

  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({row}) => <span>{row.original.phone}</span>,
  },

  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({row}) => (
      <Badge variant="outline" className="capitalize">
        {row.original.category}
      </Badge>
    ),
  },

  {
    accessorKey: 'criticality',
    header: 'Criticality',
    cell: ({row}) => {
      const level = row.original.criticality;

      const color =
        level === 'HIGH'
          ? 'bg-red-500'
          : level === 'MEDIUM'
          ? 'bg-yellow-500'
          : 'bg-green-500';

      return <Badge className={`${color} text-white`}>{level}</Badge>;
    },
  },

  {
    accessorKey: 'documentUrl',
    header: 'Document',
    cell: ({row}) =>
      row.original.documentUrl ? (
        <Link
          to={row.original.documentUrl}
          target="_blank"
          className="text-blue-600 underline">
          View
        </Link>
      ) : (
        '—'
      ),
  },

  {
    accessorKey: 'contractStartDate',
    header: 'Start Date',
    cell: ({row}) => <span>{formatDate(row.original.contractStartDate)}</span>,
  },

  {
    accessorKey: 'contractEndDate',
    header: 'End Date',
    cell: ({row}) => <span>{formatDate(row.original.contractEndDate)}</span>,
  },

  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({row}) =>
      row.original.isActive ? (
        <Badge className="bg-green-600 text-white">Active</Badge>
      ) : (
        <Badge className="bg-gray-500 text-white">Inactive</Badge>
      ),
  },

  {
    accessorKey: 'invitationToken',
    header: 'Invitation Token',
    cell: ({row}) => {
      const token = row.original.invitationToken;

      if (!token) return '—';
      if (token.length <= 20) return <span>{token}</span>;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="p-0 text-left">
              <span>{token.slice(0, 20)}...</span>
              <ChevronDown size={16} className="ml-1" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="max-w-xs p-3">
            <ScrollArea className="max-h-[50vh]">
              <p className="text-sm">{token}</p>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      );
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({row}) => <span>{formatDate(row.original.createdAt)}</span>,
  },

  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({row}) => <span>{formatDate(row.original.updatedAt)}</span>,
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({row}) => {
      const supplier = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <ul className="flex flex-col py-4 space-y-2">
              <li className="bg-transparent text-gray-700 cursor-pointer hover:bg-primary/20 hover:shadow-none flex gap-2 items-center p-1 rounded-sm">
                <View /> View
              </li>
              <EditSupplier
                supplier={supplier}
                trigger={
                  <li className="bg-transparent text-gray-700 cursor-pointer hover:bg-primary/20 hover:shadow-none">
                    <Edit /> Edit
                  </li>
                }
              />
            </ul> */}
            {/* 
            <DropdownMenuItem>
              <IconLiveView />
              View
            </DropdownMenuItem>

            <EditSupplier
              supplier={supplier}
              trigger={
                <DropdownMenuItem>
                  <IconUserEdit /> Edit
                </DropdownMenuItem>
              }
            /> */}

            <Button className="rounded-xm w-full flex justify-start bg-transparent hover:bg-gray-50 text-gray-700 mt-2">
              <IconLiveView />
              View
            </Button>
            <DropdownMenuItem asChild>
              <EditSupplier
                supplier={supplier}
                trigger={
                  <Button className="rounded-xm w-full flex justify-start bg-transparent hover:bg-gray-50 text-gray-700">
                    <IconUserEdit /> Edit
                  </Button>
                }
              />
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" asChild>
              {/* <DeleteSupplier
                id={supplier.id!}
                onSuccess={() => console.log('supplier deleted successfully')}
                trigger={
                  <Button className="text-destructive w-full" variant={'ghost'}>
                    Delete
                  </Button>
                }
              /> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

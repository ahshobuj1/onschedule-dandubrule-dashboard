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

import type {IEmployee} from './type';

export const columns: ColumnDef<IEmployee>[] = [
  // Serial

  {
    id: 'sl',
    header: '#',
    cell: ({row, table}) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;

      return (
        <span className="font-bold">
          {pageIndex * pageSize + row.index + 1}
        </span>
      );
    },
  },

  //  Employee
  {
    header: 'Employee',
    cell: ({row}) => {
      const emp = row.original;

      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {emp.firstName} {emp.lastName}
          </span>
          <span className="text-xs text-muted-foreground">
            {emp.employeeId}
          </span>
        </div>
      );
    },
  },

  //  Email
  {
    accessorKey: 'email',
    header: 'Email',
  },

  //  Phone
  {
    accessorKey: 'phone',
    header: 'Phone',
  },

  //  Role
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({row}) => <Badge variant="outline">{row.original.role}</Badge>,
  },

  //  Notes
  {
    accessorKey: 'additionalNotes',
    header: 'Notes',
    cell: ({row}) =>
      row.original.additionalNotes ? (
        <span className="truncate max-w-[200px] block">
          {row.original.additionalNotes}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },

  //  Joined
  {
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: ({row}) => formatDate(row.original.createdAt),
  },

  //  Actions
  {
    id: 'actions',
    header: 'Actions',
    cell: ({row}) => {
      const emp = row.original;
      console.log(emp);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Edit Employee</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete Employee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

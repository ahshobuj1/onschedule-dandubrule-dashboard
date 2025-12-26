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

import defaultAvatar from '@/assets/default-image.jpg';

import type {IUser} from './type';

export const columns: ColumnDef<IUser>[] = [
  //  User (Name + Email)
  {
    header: 'User',
    cell: ({row}) => {
      const user = row.original;
      const avatarSrc = user.avatarUrl || defaultAvatar;

      return (
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img
            src={avatarSrc}
            alt={user.displayName}
            className="h-10 w-10 rounded-full object-cover border"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />

          {/* Name & Email */}
          <div className="flex flex-col">
            <span className="font-medium leading-none">{user.displayName}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      );
    },
  },

  //  Phone
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
  },

  //  Role
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({row}) => {
      const role = row.original.role;

      const roleColor: Record<typeof role, string> = {
        admin: 'bg-purple-600',
        employee: 'bg-blue-600',
        subscriber: 'bg-gray-500',
      };

      return <Badge className={`${roleColor[role]} text-white`}>{role}</Badge>;
    },
  },

  //  Status
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({row}) => {
      const status = row.original.status;

      return status === 'active' ? (
        <Badge className="bg-green-600 text-white">active</Badge>
      ) : (
        <Badge variant="outline">inactive</Badge>
      );
    },
  },

  //  Email Verified
  {
    header: 'Email Verified',
    cell: ({row}) =>
      row.original.emailVerifiedAt ? (
        <Badge className="bg-green-600 text-white">Verified</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      ),
  },

  //  Designation (optional but useful)
  {
    accessorKey: 'designation',
    header: 'Designation',
    cell: ({row}) =>
      row.original.designation ?? (
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
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>

            {user.status === 'active' ? (
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
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

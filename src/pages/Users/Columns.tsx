import type {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import { MoreHorizontal, ShieldCheck, Trash, ChevronDown} from 'lucide-react';
import {formatDate} from '@/utils/formatDate';
import {UserPermissionDialog} from '@/features/permissions/components/UserPermissionDialog';
import {useState} from 'react';
import {toast} from 'sonner';
import {useDeleteUserMutation, useUpdateUserRoleMutation, useUpdateUserStatusMutation} from '@/features/users/userApi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
      const user = row.original;
      const [updateRole, { isLoading }] = useUpdateUserRoleMutation();
      const [pendingRole, setPendingRole] = useState<string | null>(null);

      const handleRoleChange = async () => {
        if (!pendingRole) return;
        try {
          await updateRole({ id: user.id, role: pendingRole }).unwrap();
          toast.success('Role updated successfully');
        } catch (error: any) {
          toast.error(error?.data?.message || 'Failed to update role');
        } finally {
          setPendingRole(null);
        }
      };

      const roleColor: Record<string, string> = {
        admin: 'bg-purple-600',
        subscriber: 'bg-gray-500',
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Badge className={`${roleColor[user.role] || 'bg-gray-500'} text-white flex items-center gap-1 cursor-pointer hover:opacity-80`}>
                {user.role} <ChevronDown className="h-3 w-3" />
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPendingRole('admin')}>admin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPendingRole('subscriber')}>subscriber</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={!!pendingRole} onOpenChange={(open) => !open && setPendingRole(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Change Role</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to change this user's role to <span className="font-semibold text-foreground">{pendingRole}</span>?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRoleChange} className="bg-blue-600 hover:bg-blue-700">
                  {isLoading ? 'Updating...' : 'Confirm'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },

  //  Status
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({row}) => {
      const user = row.original;
      const [updateStatus, { isLoading }] = useUpdateUserStatusMutation();
      const [pendingStatus, setPendingStatus] = useState<string | null>(null);

      const handleStatusChange = async () => {
        if (!pendingStatus) return;
        try {
          await updateStatus({ id: user.id, status: pendingStatus }).unwrap();
          toast.success('Status updated successfully');
        } catch (error: any) {
          toast.error(error?.data?.message || 'Failed to update status');
        } finally {
          setPendingStatus(null);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              {user.status === 'active' ? (
                <Badge className="bg-green-600 text-white flex items-center gap-1 cursor-pointer hover:opacity-80">
                  active <ChevronDown className="h-3 w-3" />
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1 cursor-pointer hover:bg-accent">
                  {user.status} <ChevronDown className="h-3 w-3" />
                </Badge>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPendingStatus('active')}>active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPendingStatus('inactive')}>inactive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPendingStatus('suspended')}>suspended</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPendingStatus('pending_verification')}>pending_verification</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={!!pendingStatus} onOpenChange={(open) => !open && setPendingStatus(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Change Status</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to change this user's status to <span className="font-semibold text-foreground">{pendingStatus}</span>?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleStatusChange} className="bg-blue-600 hover:bg-blue-700">
                  {isLoading ? 'Updating...' : 'Confirm'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
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
        <span className="text-muted-foreground">none</span>
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
      const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation();

      const handleDeleteUser = async () => {
        try {
          await deleteUser(user.id).unwrap();
          toast.success('User deleted successfully');
          setIsDeleteDialogOpen(false);
        } catch (error: any) {
          toast.error(error?.data?.message || 'Failed to delete user');
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="py-3">
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => setIsPermissionDialogOpen(true)}
              >
                <ShieldCheck className="mr-2 h-4 w-4" /> Manage Permissions
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* <DropdownMenuItem>View Profile</DropdownMenuItem> */}

              <DropdownMenuSeparator />

              <DropdownMenuItem 
                className="text-destructive cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserPermissionDialog 
            open={isPermissionDialogOpen} 
            onOpenChange={setIsPermissionDialogOpen} 
            user={user} 
          />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user
                  and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];

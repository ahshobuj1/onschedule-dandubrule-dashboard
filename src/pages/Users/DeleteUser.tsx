import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteUserMutation } from '@/features/users/userApi';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteUserProps {
    id: string;
    onSuccess?: (message?: string) => void;
    trigger?: React.ReactNode;
}

export default function DeleteUser({ id, onSuccess, trigger }: DeleteUserProps) {
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await deleteUser(id).unwrap();
            toast.success(res.message || 'User deleted successfully');
            // Call the callback to notify the parent
            if (onSuccess) onSuccess(res.message);
        } catch (error) {
            console.error('Failed to delete user:', error);
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger || (
                    <Button size={'icon'} variant={'destructive'}>
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            className="bg-destructive hover:bg-destructive/60 px-4 py-2 rounded text-white"
                            onClick={onDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

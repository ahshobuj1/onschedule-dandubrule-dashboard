'use client';

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
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useDeleteCourseMutation } from '@/features/courses/coursesApi';
import { useState } from 'react';

interface DeleteCourseProps {
    id: string;
    onSuccess?: (message?: string) => void;
    trigger?: React.ReactNode;
}

export default function DeleteCourse({ id, onSuccess, trigger }: DeleteCourseProps) {
    const [open, setOpen] = useState(false);
    const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await deleteCourse(id).unwrap();
            toast.success(res.message || 'Course deleted successfully');
            if (onSuccess) onSuccess(res.message);
            setOpen(false); // ✅ Close dialog on success
        } catch (error) {
            console.error('Failed to delete course:', error);
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {trigger || (
                    <Button size="icon" variant="destructive">
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this course and
                        remove all associated data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            onClick={onDelete}
                            disabled={isDeleting}
                            className="bg-destructive hover:bg-destructive/60 px-4 py-2 rounded text-white"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

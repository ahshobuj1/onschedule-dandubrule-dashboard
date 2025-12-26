import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UsersFormSchema, type TUser } from './type';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateUserMutation } from '@/features/users/userApi';
import type z from 'zod';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
// import { useGetPublicUploadUrlMutation } from '@/features/content/contentApi';
import DeleteUser from './DeleteUser';
import { FileUploadDirectUploadDemo } from '@/components/common/FileUploadDirectUploadDemo copy';
function EditUser({ item, trigger }: { item: TUser; trigger: React.ReactNode }) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const form = useForm<z.infer<typeof UsersFormSchema>>({
        resolver: zodResolver(UsersFormSchema),
        defaultValues: {
            // Convert dates to strings for the form
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
            lastLoginAt: item.lastLoginAt ? new Date(item.lastLoginAt) : null,
            deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
            // Ensure nullable fields are properly handled
            bio: item.bio || '',
            avatarUrl: item.avatarUrl,
            instagramUrl: item.instagramUrl,
            username: item.username || '',
            emailVerifiedAt: item.emailVerifiedAt || null,
            tapPayCustomerId: item.tapPayCustomerId || null,
            stripeCustomerId: item.stripeCustomerId || null,
            rewardfullAffiliateId: item.rewardfullAffiliateId || null,
            isDeleted: item.isDeleted || false,
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                ...item,
                createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
                updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
                lastLoginAt: item.lastLoginAt ? new Date(item.lastLoginAt) : null,
                deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
                bio: item.bio || '',
                avatarUrl: item.avatarUrl,
                instagramUrl: item.instagramUrl,
                username: item.username || '',
                emailVerifiedAt: item.emailVerifiedAt || null,
                tapPayCustomerId: item.tapPayCustomerId || null,
                stripeCustomerId: item.stripeCustomerId || null,
                rewardfullAffiliateId: item.rewardfullAffiliateId || null,
                isDeleted: item.isDeleted || false,
            });
        }
    }, [open, item, form]);

    const onSubmit = async (data: z.infer<typeof UsersFormSchema>) => {
        try {
            const res = await updateUser({ id: item.id, data }).unwrap();
            setOpen(false);
            toast.success(res.message || 'User updated successfully');
            form.reset(res.data); // reset with updated user
        } catch (error) {
            console.error('Failed to update user:', error);
            toast.error(getErrorMessage(error));
        }
    };

    const handleDeleteSuccess = (message?: string) => {
        // For example, remove the user from the list
        console.log('Delete success:', message);
        setOpen(false);
        // toast.success(message || 'User deleted successfully');
        // You can redirect or update the list here
    };

    return (
        <Drawer direction={isMobile ? 'bottom' : 'right'} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <div className="flex items-center justify-between">
                        <DrawerTitle>{item.displayName}</DrawerTitle>

                        <DeleteUser id={item.id!} onSuccess={() => handleDeleteSuccess(item.id)} />
                    </div>
                    <DrawerDescription>Edit user details</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="user@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* First Name */}
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Last Name */}
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-2">
                                {/* Role */}
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Role</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Status */}
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">
                                                        Inactive
                                                    </SelectItem>
                                                    <SelectItem value="suspended">
                                                        Suspended
                                                    </SelectItem>
                                                    <SelectItem value="pending_verification">
                                                        Pending Verification
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Bio */}
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write a short bio..."
                                                {...field}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Avatar URL */}
                            <FormField
                                control={form.control}
                                name="avatarUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Avatar URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://example.com/avatar.png"
                                                {...field}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FileUploadDirectUploadDemo
                                onUploaded={url => {
                                    form.setValue('avatarUrl', url);
                                    toast.success('Avatar uploaded successfully!');
                                }}
                            />

                            {/* Instagram URL */}
                            <FormField
                                control={form.control}
                                name="instagramUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instagram URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://instagram.com/username"
                                                {...field}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>

                <DrawerFooter>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {isLoading ? 'Saving...' : 'Submit'}
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default EditUser;

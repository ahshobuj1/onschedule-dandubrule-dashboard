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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useUpdateTransactionMutation } from '@/features/transactions/transactionsApi';
import {
    TransactionEditSchema,
    TransactionStatus,
    type TTransaction,
    type TTransactionEditSchema,
} from './type';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatDate';

function EditTransaction({ item, trigger }: { item: TTransaction; trigger: React.ReactNode }) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();

    const form = useForm({
        resolver: zodResolver(TransactionEditSchema),
        defaultValues: {
            // Safe cast to the schema type to satisfy TS and ESLint
            status: item.status as TTransactionEditSchema['status'],
            amount: item.amount,
            currency: item.currency,
            externalRef: item.externalRef || '',
            description: item.description || '',
        },
    });

    useEffect(() => {
        if (open && item) {
            form.reset({
                status: item.status as TTransactionEditSchema['status'],
                amount: item.amount,
                currency: item.currency,
                externalRef: item.externalRef || '',
                description: item.description || '',
            });
        }
    }, [open, item, form]);

    const onSubmit = async (data: TTransactionEditSchema) => {
        try {
            const res = await updateTransaction({ id: item.id, data }).unwrap();
            setOpen(false);
            toast.success(res.message || 'Transaction updated successfully');
        } catch (error) {
            console.error('Failed to update transaction:', error);
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Drawer direction={isMobile ? 'bottom' : 'right'} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className={isMobile ? 'max-h-[90vh]' : 'h-screen w-full md:w-[500px]'}>
                <DrawerHeader>
                    <DrawerTitle>Transaction Details</DrawerTitle>
                    <DrawerDescription>View and edit transaction information</DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-6">
                    {/* Read-only Info Section */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg text-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs">ID</span>
                            <span className="font-mono text-xs truncate" title={item.id}>
                                {item.id}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs">Date</span>
                            <span>{formatDate(item.createdAt, 'datetime')}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs">User</span>
                            <span>{item.user?.displayName || item.userId}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-xs">Gateway</span>
                            <Badge variant="outline" className="w-fit">
                                {item.gateway}
                            </Badge>
                        </div>
                        {item.course && (
                            <div className="flex flex-col gap-1 col-span-2">
                                <span className="text-muted-foreground text-xs">Course</span>
                                <span>{item.course.title}</span>
                            </div>
                        )}
                        {item.plan && (
                            <div className="flex flex-col gap-1 col-span-2">
                                <span className="text-muted-foreground text-xs">Plan</span>
                                <span>{item.plan.title}</span>
                            </div>
                        )}
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Status */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(TransactionStatus).map(status => (
                                                    <SelectItem key={status} value={status}>
                                                        <span className="capitalize">{status}</span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                {/* Amount */}
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    name={field.name}
                                                    onBlur={field.onBlur}
                                                    ref={field.ref}
                                                    disabled={field.disabled}
                                                    // Explicitly casting to avoid "Type '{}' is not assignable" error
                                                    value={
                                                        field.value === undefined ||
                                                        field.value === null
                                                            ? ''
                                                            : String(field.value)
                                                    }
                                                    onChange={e =>
                                                        field.onChange(e.target.valueAsNumber)
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Currency */}
                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Currency</FormLabel>
                                            <FormControl>
                                                <Input
                                                    name={field.name}
                                                    onBlur={field.onBlur}
                                                    ref={field.ref}
                                                    disabled={field.disabled}
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    maxLength={3}
                                                    className="uppercase"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* External Ref */}
                            <FormField
                                control={form.control}
                                name="externalRef"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>External Reference</FormLabel>
                                        <FormControl>
                                            <Input
                                                name={field.name}
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                                disabled={field.disabled}
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                placeholder="Payment ID from gateway"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                name={field.name}
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                                disabled={field.disabled}
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                placeholder="Additional notes..."
                                                className="min-h-[80px]"
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
                        {isLoading ? 'Updating...' : 'Update Transaction'}
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

export default EditTransaction;

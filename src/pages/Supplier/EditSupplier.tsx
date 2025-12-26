import {Button} from '@/components/ui/button';
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
import {useIsMobile} from '@/hooks/use-mobile';
import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {ISupplierEditSchema, type TEditSupplier, type ISupplier} from './type';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {toast} from 'sonner';

function EditSupplier({
  supplier,
  trigger,
}: {
  supplier: ISupplier;
  trigger: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const form = useForm<TEditSupplier>({
    resolver: zodResolver(ISupplierEditSchema),
    defaultValues: {
      ...supplier,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({...supplier});
    }
  }, [form, open, supplier]);

  const onSubmit = (data: TEditSupplier) => {
    console.log('Edited Supplier Data:', data);
    toast.success('Supplier updated (dummy, no API)');
    setOpen(false);
  };

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={open}
      onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Supplier</DrawerTitle>
          <DrawerDescription>Update supplier information</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-3 space-y-4 overflow-y-auto text-sm">
          <Form {...form}>
            <form className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Supplier name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Person */}
              <FormField
                control={form.control}
                name="contactPerson"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Contact person" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+8801XXXXXXXXX" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="security / IT / etc..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Criticality */}
              <FormField
                control={form.control}
                name="criticality"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Criticality</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select criticality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contract Start */}
              <FormField
                control={form.control}
                name="contractStartDate"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Contract Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contract End */}
              <FormField
                control={form.control}
                name="contractEndDate"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Contract End Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Document URL */}
              <FormField
                control={form.control}
                name="documentUrl"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Document URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Document URL"
                        {...field}
                        value={field.value ?? ''} // ⭐ FIX HERE
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
          <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
            Save Changes
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditSupplier;

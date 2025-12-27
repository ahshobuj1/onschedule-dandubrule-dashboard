/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {useUpdatePlanMutation} from '@/features/plans/plansApi';
import {editPlanSchema, type EditPlanInput} from './type';
import {LIMIT_BOOL_LABELS, LIMIT_LABELS} from './limitLabel';

type Props = {
  item: EditPlanInput;
  trigger: React.ReactNode;
};

const EditPlan = ({item, trigger}: Props) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const [updatePlan, {isLoading}] = useUpdatePlanMutation();

  console.log('[plan] : ', item);

  const form = useForm<EditPlanInput>({
    resolver: zodResolver(editPlanSchema),
    defaultValues: item,
  });

  useEffect(() => {
    if (open) {
      form.reset(item);
    }
  }, [open, item, form]);

  const onSubmit = async (data: EditPlanInput) => {
    // const {id, ...data} = values;

    try {
      await updatePlan({
        id: item?.id,
        data: {
          ...data,
          id: undefined,
        },
      }).unwrap();

      toast.success('Plan updated successfully');
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update plan');
    }
  };

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={open}
      onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>Edit plan details</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 overflow-y-auto">
          <Form {...form}>
            <form className="space-y-5">
              {/* Plan Name */}
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Plan name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Price */}

              <FormField
                control={form.control}
                name="price"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Billing Cycle */}
              <FormField
                control={form.control}
                name="billingCycle"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Billing Cycle</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Features – line per feature */}
              <FormField
                control={form.control}
                name="features"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <div className="space-y-2">
                      {field.value?.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const updated = [...field.value];
                              updated[index] = e.target.value;
                              field.onChange(updated);
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((_, i) => i !== index)
                              )
                            }>
                            ✕
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        className="font-normal"
                        onClick={() =>
                          field.onChange([...(field.value || []), ''])
                        }>
                        + Add Feature
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Limits grid */}
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    'maxClients',
                    'maxEmployees',
                    'maxTools',
                    'maxVehicles',
                    'maxInspectionsPerMonth',
                    'onboardingFee',
                  ] as const
                ).map((key) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`limits.${key}`}
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">
                          {LIMIT_LABELS[key]}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Flags grid */}
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    'enableSMS',
                    'enableMultiSite',
                    'enableAdvancedAnalytics',
                    'enablePrioritySupport',
                    'enableAPI',
                    'enableIntegrations',
                  ] as const
                ).map((key) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`limits.${key}`}
                    render={({field}) => (
                      <FormItem className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormLabel className="text-sm">
                          {LIMIT_BOOL_LABELS[key]}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </form>
          </Form>
        </div>

        <DrawerFooter>
          <Button disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
            {isLoading ? 'Saving...' : 'Update Plan'}
          </Button>

          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditPlan;

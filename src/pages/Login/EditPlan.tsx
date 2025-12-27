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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {getErrorMessage} from '@/utils/getErrorMessage';
import type z from 'zod';
import {useUpdatePlanMutation} from '@/features/plans/plansApi';

const LIMIT_LABELS: Record<string, string> = {
  maxClients: 'Clients',
  maxEmployees: 'Employees',
  maxTools: 'Tools',
  maxVehicles: 'Vehicles',
  maxInspectionsPerMonth: 'Inspections / Month',
  onboardingFee: 'Onboarding Fee ($)',
};

const LIMIT_BOOL_LABELS: Record<string, string> = {
  enableSMS: 'SMS',
  enableMultiSite: 'Multi-site',
  enableAdvancedAnalytics: 'Analytics',
  enablePrioritySupport: 'Priority Support',
  enableAPI: 'API Access',
  enableIntegrations: 'Integrations',
};

function EditPlan({item, trigger}: {item: TPlan; trigger: React.ReactNode}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const [updatePlan, {isLoading}] = useUpdatePlanMutation();

  const form = useForm<z.infer<typeof PlanEditSchema>>({
    resolver: zodResolver(PlanEditSchema),
    defaultValues: {
      ...item,
      features: item.features || [],
      limits: item.limits,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        ...item,
        features: item.features || [],
        limits: item.limits,
      });
    }
  }, [open, item, form]);

  const onSubmit = async (data: z.infer<typeof PlanEditSchema>) => {
    try {
      const res = await updatePlan({id: item.id, data}).unwrap();
      toast.success(res.message || 'Plan updated successfully');
      setOpen(false);
      form.reset(res.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={open}
      onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="gap-1">
          <div className="flex items-center justify-between">
            <DrawerTitle>{item.name}</DrawerTitle>
            <DeletePlan id={item.id} onSuccess={() => setOpen(false)} />
          </div>
          <DrawerDescription>Edit plan details</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Textarea {...field} rows={4} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Price & Billing */}
              <div className="grid grid-cols-2 gap-3">
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
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="billingCycle"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Billing Cycle</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* Features */}
              <FormField
                control={form.control}
                name="features"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="One feature per line"
                        value={(field.value ?? []).join('\n')}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              .split('\n')
                              .map((v) => v.trim())
                              .filter(Boolean)
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Numeric Limits */}
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
                        <FormLabel className="text-xs">
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

              {/* Boolean Limits */}
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
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditPlan;

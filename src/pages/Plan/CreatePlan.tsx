'use client';

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
import {toast} from 'sonner';
import {useState} from 'react';
import type z from 'zod';

import {PlanCreateSchema} from './type';
import {useCreatePlanMutation} from '@/features/plans/plansApi';
import {LIMIT_BOOL_LABELS, LIMIT_LABELS} from './limitLabel';

function CreatePlan({trigger}: {trigger: React.ReactNode}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [createPlan, {isLoading}] = useCreatePlanMutation();

  const form = useForm<z.infer<typeof PlanCreateSchema>>({
    resolver: zodResolver(PlanCreateSchema),
    defaultValues: {
      billingCycle: 'monthly',
      features: [],
      limits: {
        maxClients: 0,
        maxEmployees: 0,
        maxTools: 0,
        maxVehicles: 0,
        maxInspectionsPerMonth: 0,
        enableSMS: false,
        enableMultiSite: false,
        enableAdvancedAnalytics: false,
        enablePrioritySupport: false,
        enableAPI: false,
        enableIntegrations: false,
        onboardingFee: 0,
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof PlanCreateSchema>) => {
    try {
      const res = await createPlan(data).unwrap();
      console.log('[plan create response]', res);
      toast.success('Plan created successfully');
      form.reset();
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error('Failed to create plan');
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
          <DrawerTitle>Create Plan</DrawerTitle>
          <DrawerDescription>
            Create subscription plan for dashboard
          </DrawerDescription>
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
                      <Input placeholder="Enterprise" {...field} />
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

              {/* Features (comma separated) */}
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
                            onClick={() => {
                              field.onChange(
                                field.value.filter((_, i) => i !== index)
                              );
                            }}>
                            ✕
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="default"
                        size={'sm'}
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

              {/* <FormField
                control={form.control}
                name="features"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="One feature per line"
                        value={field.value.join('\n')}
                        onChange={(e) =>
                          field.onChange(e.target.value.split('\n'))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}

              {/* Limits */}
              <FormLabel>Limit Max</FormLabel>
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

              {/* Boolean Flags */}
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
            {isLoading ? 'Creating...' : 'Create Plan'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CreatePlan;

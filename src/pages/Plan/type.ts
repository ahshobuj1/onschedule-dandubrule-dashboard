import {z} from 'zod';

export type BillingCycle = 'monthly' | 'annual';
export type PlanStatus = 'active' | 'inactive';

export interface IPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  billingCycle: BillingCycle;
  status: PlanStatus;
  features: string[];
  limits: {
    maxClients: number;
    maxEmployees: number;
    maxTools: number;
    maxVehicles: number;
    maxInspectionsPerMonth: number;
    enableSMS: boolean;
    enableMultiSite: boolean;
    enableAdvancedAnalytics: boolean;
    enablePrioritySupport: boolean;
    enableAPI: boolean;
    enableIntegrations: boolean;
    onboardingFee: number;
    pricing: {
      monthly: number;
      annualAmount: number;
    };
    stripe: {
      productId: string;
      priceAnnual: string;
      priceMonthly: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export const PlanCreateSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  description: z.string().min(1, 'Description is required'),

  price: z.number().min(0),
  billingCycle: z.enum(['monthly', 'annual']),

  features: z.array(z.string().min(1)).min(1),

  limits: z.object({
    maxClients: z.number().min(0),
    maxEmployees: z.number().min(0),
    maxTools: z.number().min(0),
    maxVehicles: z.number().min(0),
    maxInspectionsPerMonth: z.number().min(0),

    enableSMS: z.boolean(),
    enableMultiSite: z.boolean(),
    enableAdvancedAnalytics: z.boolean(),
    enablePrioritySupport: z.boolean(),
    enableAPI: z.boolean(),
    enableIntegrations: z.boolean(),

    onboardingFee: z.number().min(0),
  }),
});

export type PlanCreateType = z.infer<typeof PlanCreateSchema>;

export const editPlanSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Plan name is required'),
  description: z.string().optional(),
  price: z.any().optional(),
  billingCycle: z.enum(['monthly', 'annual']),
  features: z.array(z.string().min(1)).min(1, 'At least one feature required'),
  limits: z.object({
    maxClients: z.number().min(0),
    maxEmployees: z.number().min(0),
    maxTools: z.number().min(0),
    maxVehicles: z.number().min(0),
    maxInspectionsPerMonth: z.number().min(0),
    onboardingFee: z.number().min(0),
    // feature toggles
    enableSMS: z.boolean(),
    enableMultiSite: z.boolean(),
    enableAdvancedAnalytics: z.boolean(),
    enablePrioritySupport: z.boolean(),
    enableAPI: z.boolean(),
    enableIntegrations: z.boolean(),
  }),
});

export type EditPlanInput = z.infer<typeof editPlanSchema>;

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

import z from 'zod';

export interface ISupplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  criticality: 'LOW' | 'MEDIUM' | 'HIGH'; // FIXED
  contractStartDate: string;
  contractEndDate: string;
  documentUrl: string | null;
  documentType: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
  invitationSentAt: string | null;
  invitationToken: string | null;
  userId: string | null;
  isActive: boolean;
  companyLogo: string | null;
}

export const ISupplierEditSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name is required'),
  contactPerson: z.string().min(2, 'Contact person is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(8, 'Invalid phone number'),
  category: z.string().min(2, 'Category is required'),

  // must match updated interface
  criticality: z.enum(['LOW', 'MEDIUM', 'HIGH']),

  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),

  documentUrl: z.string().url('Invalid document URL').nullable().optional(),
});

export type TEditSupplier = z.infer<typeof ISupplierEditSchema>;

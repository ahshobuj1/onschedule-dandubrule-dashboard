import {z} from 'zod';

// Role and status enums
const roleSchema = z.enum(
  ['user', 'admin'],
  'Role must be one of: user, admin'
);
const statusSchema = z.enum(
  ['active', 'inactive', 'suspended', 'pending_verification'],
  'Status must be one of: active, inactive, suspended, pending_verification'
);

export const UsersFormSchema = z.object({
  id: z.string().optional(),
  email: z
    .email('Enter a valid email')
    .nonempty('Email is required')
    .optional(),
  username: z.string().nullable().optional(),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must not exceed 100 characters')
    .trim(),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must not exceed 100 characters')
    .trim(),
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .optional(),
  role: roleSchema.optional(),
  status: statusSchema.optional(),
  emailVerifiedAt: z.string().nullable().optional(),
  bio: z
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .nullable()
    .optional(),
  avatarUrl: z.url('Avatar must be a valid URL').nullable().optional(),
  instagramUrl: z.url('Instagram URL must be valid').nullable().optional(),
  tapPayCustomerId: z.string().nullable().optional(),
  stripeCustomerId: z.string().nullable().optional(),
  rewardfullAffiliateId: z.string().nullable().optional(),
  isDeleted: z.boolean().optional(),
  lastLoginAt: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type TUser = z.infer<typeof UsersFormSchema>;

export type UserRole = 'subscriber' | 'admin' | 'employee';
export type UserStatus = 'active' | 'inactive';

export interface IUser {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: UserRole;
  designation: string | null;
  status: UserStatus;
  emailVerifiedAt: string | null;
  terms: boolean | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

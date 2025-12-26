import {z} from 'zod';

export interface IAssignment {
  id: string;
  examId: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  categories: {
    id: string;
    title: string;
    questions: unknown[];
  }[];
  submissions: {
    id: string;
    status: 'PENDING' | 'SUBMITTED' | 'APPROVED';
  }[];
  _count: {
    submissions: number;
    categories: number;
  };
}

export const AdminQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  order: z.number().min(1),
  isDocument: z.boolean(),
  isInputField: z.boolean(),
});

export const AdminCategorySchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().min(1),
  order: z.number().min(1),
  questions: z.array(AdminQuestionSchema).min(1),
});

export const CreateAssignmentAdminSchema = z.object({
  examId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  categories: z.array(AdminCategorySchema).min(1),
});

export type CreateAssignmentAdminType = z.infer<
  typeof CreateAssignmentAdminSchema
>;

import { z } from 'zod';

export const CourseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    subtitle: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    shortDescription: z.string().nullable().optional(),
    thumbnailUrl: z.string().url().nullable().optional().or(z.literal('')),
    previewVideoUrl: z.string().url().nullable().optional().or(z.literal('')),
    difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedDurationHours: z.number().nullable().optional(),
    basePrice: z.coerce.number().default(0),
    discount: z.coerce.number().nullable().default(0),
    discountedPrice: z.number().nullable().default(0),
    hasFinalQuiz: z.boolean().default(false),
    passPercentage: z.number().default(70),
    hasCertificate: z.boolean().default(false),
    isPublished: z.boolean().default(false),
    publishedAt: z.date().nullable().optional(),
    isDeleted: z.boolean().default(false),
    deletedAt: z.date().nullable().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    // relations as arrays or objects
    enrollments: z.array(z.any()).optional(),
    coursePlans: z.array(z.any()).optional(),
    modules: z.array(z.any()).optional(),
    transactions: z.array(z.any()).optional(),
    quiz: z.any().nullable().optional(),
    certificates: z.array(z.any()).optional(),
    courseReviews: z.array(z.any()).optional(),
});

export type TCourse = z.infer<typeof CourseSchema>;

// Schema for editing - makes most fields optional except critical ones
export const CourseEditSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    shortDescription: z.string().optional(),
    thumbnailUrl: z.string().url('Invalid thumbnail URL').optional(),
    difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    hasFinalQuiz: z.boolean().optional(),
    passPercentage: z.number().min(0).max(100).optional(),
    hasCertificate: z.boolean().optional(),
    isPublished: z.boolean().optional(),
});

export const Coursecreate = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    shortDescription: z.string().optional(),
    thumbnailUrl: z.string().url('Invalid thumbnail URL').optional(),
    previewVideoUrl: z.string().url('Invalid preview video URL').optional(),
    difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    hasFinalQuiz: z.boolean().default(false),
    passPercentage: z.number().min(0).max(100).default(70),
    hasCertificate: z.boolean().default(false),
    isPublished: z.boolean().default(false),
});

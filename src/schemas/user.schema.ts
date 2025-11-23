import { z } from 'zod';
import { OPTIONS_CONFIG } from './options.schema';

/**
 * ======================
 * VALIDATION SCHEMAS
 * ======================
 */

// Personal Info Schema
export const personalInfoSchema = z.object({
    username: z.string().min(2, 'نام کاربری باید حداقل ۲ کاراکتر باشد').optional(),
    firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد').optional(),
    lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد').optional(),
    fatherName: z.string().optional(),
    nationalId: z
        .string()
        .regex(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد')
        .optional(),
    birthDate: z.string().optional(),
    gender: z.enum(['male', 'female', 'none']).optional(),
});

// Contact Info Schema
export const contactInfoSchema = z.object({
    phone: z
        .string()
        .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
        .optional(),
    emergencyPhone: z.string().optional(),
    orgEmail: z.string().email('ایمیل نامعتبر است').optional(),
    personalEmail: z.string().email('ایمیل نامعتبر است').optional(),
    address: z.string().optional(),
    city: z.string().optional(),
});

// Job Info Schema
export const jobInfoSchema = z.object({
    position: z.enum([...OPTIONS_CONFIG.position.values] as [string, ...string[]]).optional(),
    contractType: z
        .enum([...OPTIONS_CONFIG.contractType.values] as [string, ...string[]])
        .optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    location: z.enum([...OPTIONS_CONFIG.location.values] as [string, ...string[]]).optional(),
});

// Financial Info Schema (Admin Only)
export const financialInfoSchema = z.object({
    baseSalary: z.string().optional(),
    benefits: z.string().optional(),
    commission: z.string().optional(),
    overtimeRate: z.string().optional(),
});

// Education Info Schema
export const educationInfoSchema = z.object({
    degree: z
        .enum([...OPTIONS_CONFIG.degree.values] as [string, ...string[]])
        .optional(),
    major: z.string().optional(),
    university: z.string().optional(),
    graduationYear: z.string().optional(),
});

// Work History Item Schema
export const workHistoryItemSchema = z.object({
    company: z.string().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

// Certificate Item Schema
export const certificateItemSchema = z.object({
    title: z.string().optional(),
    issuer: z.string().optional(),
    issueDate: z.string().optional(),
    duration: z.string().optional(),
});

// Attachment Info Schema
export const attachmentInfoSchema = z.object({
    resume: z.string().url('لینک نامعتبر است').optional(),
    idScan: z.string().url('لینک نامعتبر است').optional(),
    avatar: z.string().url('لینک نامعتبر است').optional(),
    educationDocs: z.string().url('لینک نامعتبر است').optional(),
    certificates: z.string().url('لینک نامعتبر است').optional(),
});

// Additional Info Schema
export const additionalInfoSchema = z.object({
    skills: z.array(z.string()).optional(),
    linkedin: z.string().url('لینک لینکدین نامعتبر است').optional(),
    github: z.string().url('لینک گیت‌هاب نامعتبر است').optional(),
    website: z.string().url('آدرس وب‌سایت نامعتبر است').optional(),
    maritalStatus: z.enum(['single', 'married', 'other']).optional(),
    notes: z.string().optional(),
});

// Complete User Record Schema
export const userRecordSchema = z.object({
    id: z.string(),
    personal: personalInfoSchema,
    contact: contactInfoSchema,
    job: jobInfoSchema,
    financial: financialInfoSchema,
    education: educationInfoSchema,
    workHistory: z.array(workHistoryItemSchema),
    certificates: z.array(certificateItemSchema),
    attachments: attachmentInfoSchema,
    additional: additionalInfoSchema,
});

/**
 * ======================
 * TYPESCRIPT TYPES
 * ======================
 */

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type JobInfo = z.infer<typeof jobInfoSchema>;
export type FinancialInfo = z.infer<typeof financialInfoSchema>;
export type EducationInfo = z.infer<typeof educationInfoSchema>;
export type WorkHistoryItem = z.infer<typeof workHistoryItemSchema>;
export type CertificateItem = z.infer<typeof certificateItemSchema>;
export type AttachmentInfo = z.infer<typeof attachmentInfoSchema>;
export type AdditionalInfo = z.infer<typeof additionalInfoSchema>;
export type UserRecord = z.infer<typeof userRecordSchema>;

/**
 * ======================
 * CONSTANTS & ENUMS
 * ======================
 */

/**
 * ======================
 * LEGACY CONSTANTS (for backward compatibility)
 * ======================
 * 
 * These constants are kept for backward compatibility.
 * New code should use OPTIONS_CONFIG from options.schema.ts
 * and translateOption from option-helpers.ts
 */

// Legacy format: { label, value } - labels should come from translations
export const CONTRACT_TYPES = OPTIONS_CONFIG.contractType.values.map(value => ({ 
    value 
})) as Array<{ value: typeof OPTIONS_CONFIG.contractType.values[number] }>;

export const WORK_LOCATIONS = OPTIONS_CONFIG.location.values.map(value => ({ 
    value 
})) as Array<{ value: typeof OPTIONS_CONFIG.location.values[number] }>;

export const POSITIONS = OPTIONS_CONFIG.position.values.map(value => ({ 
    value 
})) as Array<{ value: typeof OPTIONS_CONFIG.position.values[number] }>;

export const DEGREE_LEVELS = [...OPTIONS_CONFIG.degree.values] as const;
export const MARITAL_STATUSES = [...OPTIONS_CONFIG.maritalStatus.values] as const;
export const GENDER_OPTIONS = OPTIONS_CONFIG.gender.values.map(value => ({ 
    value 
})) as Array<{ value: typeof OPTIONS_CONFIG.gender.values[number] }>;

/**
 * ======================
 * API PAYLOAD SCHEMAS
 * ======================
 */

// What gets sent to the backend
export const createUserPayloadSchema = userRecordSchema.omit({ id: true });
export const updateUserPayloadSchema = userRecordSchema.partial().omit({ id: true });

export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;
export type UpdateUserPayload = z.infer<typeof updateUserPayloadSchema>;

/**
 * ======================
 * HELPER FUNCTIONS
 * ======================
 */

// Validate user data before sending to backend
export function validateUserRecord(data: unknown): {
    success: boolean;
    data?: UserRecord;
    errors?: z.ZodError;
} {
    const result = userRecordSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
}

// Validate partial update
export function validateUserUpdate(data: unknown): {
    success: boolean;
    data?: UpdateUserPayload;
    errors?: z.ZodError;
} {
    const result = updateUserPayloadSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
}

// Create empty profile with defaults
export function createEmptyProfile(userId: string, email?: string, displayName?: string, orgEmail?: string): UserRecord {
    return {
        id: userId,
        personal: { username: displayName },
        contact: { 
            personalEmail: email,
            orgEmail: orgEmail 
        },
        job: {},
        financial: {},
        education: {},
        workHistory: [],
        certificates: [],
        attachments: {},
        additional: {},
    };
}

// Calculate completion percentage
export function calculateCompletionPercent(profile: UserRecord): number {
    const scores = [
        Boolean(profile.personal && Object.keys(profile.personal).length),
        Boolean(profile.contact && Object.keys(profile.contact).length),
        Boolean(profile.job && Object.keys(profile.job).length),
        Boolean(profile.education && Object.keys(profile.education).length),
        Boolean(
            profile.workHistory?.length &&
                profile.workHistory.some((item) => Boolean(item.company || item.role))
        ),
        Boolean(
            profile.certificates?.length &&
                profile.certificates.some((item) => Boolean(item.title || item.issuer))
        ),
        Boolean(profile.attachments && Object.keys(profile.attachments).length),
        Boolean(profile.additional && Object.keys(profile.additional).length),
    ];

    return Math.round((scores.filter(Boolean).length / 8) * 100);
}
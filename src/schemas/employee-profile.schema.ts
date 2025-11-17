import { z } from "zod";

const experienceSchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  responsibilities: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const certificationSchema = z.object({
  title: z.string().optional(),
  issuer: z.string().optional(),
  issueDate: z.string().optional(),
  duration: z.string().optional(),
});

const attachmentSchema = z.object({
  id: z.string(),
  label: z.string(),
  fileName: z.string(),
});

export const employeeProfileSchema = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  fatherName: z.string().optional().nullable(),
  nationalId: z.string().optional().nullable(),
  birthDate: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  emergencyContact: z.string().optional().nullable(),
  orgEmail: z.string().email().optional().nullable(),
  personalEmail: z.string().email().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  contractType: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  workLocation: z.string().optional().nullable(),
  baseSalary: z.string().optional().nullable(),
  benefits: z.string().optional().nullable(),
  commission: z.string().optional().nullable(),
  overtimeRate: z.string().optional().nullable(),
  educationLevel: z.string().optional().nullable(),
  fieldOfStudy: z.string().optional().nullable(),
  university: z.string().optional().nullable(),
  graduationYear: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  experiences: z.array(experienceSchema),
  certifications: z.array(certificationSchema),
  attachments: z.array(attachmentSchema),
});

export type EmployeeProfileInput = z.infer<typeof employeeProfileSchema>;

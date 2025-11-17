import { z } from "zod";

const limitedText = (max = 256) => z.string().trim().max(max);

const experienceSchema = z
  .object({
    company: limitedText(128).optional().nullable(),
    role: limitedText(128).optional().nullable(),
    responsibilities: limitedText(512).optional().nullable(),
    startDate: limitedText(32).optional().nullable(),
    endDate: limitedText(32).optional().nullable(),
  })
  .strict();

const certificationSchema = z
  .object({
    title: limitedText(128).optional().nullable(),
    issuer: limitedText(128).optional().nullable(),
    issueDate: limitedText(32).optional().nullable(),
    duration: limitedText(64).optional().nullable(),
  })
  .strict();

const attachmentSchema = z
  .object({
    id: limitedText(64),
    label: limitedText(128),
    fileName: limitedText(256),
  })
  .strict();

export const employeeProfileSchema = z
  .object({
    firstName: limitedText(128).optional().nullable(),
    lastName: limitedText(128).optional().nullable(),
    fatherName: limitedText(128).optional().nullable(),
    nationalId: limitedText(32).optional().nullable(),
    birthDate: limitedText(32).optional().nullable(),
    gender: limitedText(32).optional().nullable(),
    mobile: limitedText(32).optional().nullable(),
    emergencyContact: limitedText(64).optional().nullable(),
    orgEmail: z.string().email().trim().max(256).optional().nullable(),
    personalEmail: z.string().email().trim().max(256).optional().nullable(),
    address: limitedText(256).optional().nullable(),
    city: limitedText(128).optional().nullable(),
    position: limitedText(128).optional().nullable(),
    contractType: limitedText(64).optional().nullable(),
    startDate: limitedText(32).optional().nullable(),
    endDate: limitedText(32).optional().nullable(),
    workLocation: limitedText(128).optional().nullable(),
    baseSalary: limitedText(64).optional().nullable(),
    benefits: limitedText(256).optional().nullable(),
    commission: limitedText(64).optional().nullable(),
    overtimeRate: limitedText(64).optional().nullable(),
    educationLevel: limitedText(128).optional().nullable(),
    fieldOfStudy: limitedText(128).optional().nullable(),
    university: limitedText(128).optional().nullable(),
    graduationYear: limitedText(16).optional().nullable(),
    skills: limitedText(512).optional().nullable(),
    maritalStatus: limitedText(32).optional().nullable(),
    linkedin: z.string().url().max(256).optional().nullable(),
    github: z.string().url().max(256).optional().nullable(),
    website: z.string().url().max(256).optional().nullable(),
    notes: limitedText(1024).optional().nullable(),
    experiences: z.array(experienceSchema).max(25).default([]),
    certifications: z.array(certificationSchema).max(25).default([]),
    attachments: z.array(attachmentSchema).max(15).default([]),
  })
  .strict();

export type EmployeeProfileInput = z.infer<typeof employeeProfileSchema>;

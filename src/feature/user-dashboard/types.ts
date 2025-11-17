import type { ComponentProps } from "react";
import type { User } from "@/store/user.store";
import type { Button } from "@/components/ui";

export type DashboardUser = Pick<User, "id" | "email" | "name" | "role">;

export interface DashboardFeatureProps {
  user: DashboardUser;
}

export type SectionConfig = {
  title: string;
  description: string;
  actions?: Array<{
    label: string;
    color: ComponentProps<typeof Button>["color"];
    href?: string;
  }>;
};

export interface Experience {
  company: string;
  role: string;
  responsibilities: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  duration: string;
}

export interface Attachment {
  id: string;
  label: string;
  fileName: string;
}

export interface EmployeeProfileFormData {
  firstName: string;
  lastName: string;
  fatherName: string;
  nationalId: string;
  birthDate: string;
  gender: string;
  mobile: string;
  emergencyContact: string;
  orgEmail: string;
  personalEmail: string;
  address: string;
  city: string;
  position: string;
  contractType: string;
  startDate: string;
  endDate: string;
  workLocation: string;
  baseSalary: string;
  benefits: string;
  commission: string;
  overtimeRate: string;
  educationLevel: string;
  fieldOfStudy: string;
  university: string;
  graduationYear: string;
  skills: string;
  maritalStatus: string;
  linkedin: string;
  github: string;
  website: string;
  notes: string;
}

export interface EmployeeProfilePayload extends EmployeeProfileFormData {
  _id?: string;
  userId?: string;
  userEmail?: string;
  experiences: Experience[];
  certifications: Certification[];
  attachments: Attachment[];
}

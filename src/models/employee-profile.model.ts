import { ObjectId } from "mongodb";

export interface EmployeeExperience {
  company: string;
  role: string;
  responsibilities: string;
  startDate: string;
  endDate: string;
}

export interface EmployeeCertification {
  title: string;
  issuer: string;
  issueDate: string;
  duration: string;
}

export interface EmployeeAttachment {
  id: string;
  label: string;
  fileName: string;
}

export interface EmployeeProfile {
  _id?: ObjectId | string;
  userId: string;
  userEmail: string;
  orgEmail: string;
  firstName?: string;
  lastName?: string;
  fatherName?: string;
  nationalId?: string;
  birthDate?: string;
  gender?: string;
  mobile?: string;
  emergencyContact?: string;
  personalEmail?: string;
  address?: string;
  city?: string;
  position?: string;
  contractType?: string;
  startDate?: string;
  endDate?: string;
  workLocation?: string;
  baseSalary?: string;
  benefits?: string;
  commission?: string;
  overtimeRate?: string;
  educationLevel?: string;
  fieldOfStudy?: string;
  university?: string;
  graduationYear?: string;
  skills?: string;
  maritalStatus?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  notes?: string;
  experiences?: EmployeeExperience[];
  certifications?: EmployeeCertification[];
  attachments?: EmployeeAttachment[];
  createdAt?: Date;
  updatedAt?: Date;
}

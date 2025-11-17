import type {
    Attachment,
    Certification,
    EmployeeProfileFormData,
    Experience,
} from "../../types";

export interface EmployeeProfileFormProps {
    userName?: string | null;
    userEmail: string;
}

export type { Attachment, Certification, EmployeeProfileFormData, Experience };
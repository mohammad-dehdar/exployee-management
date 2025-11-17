export interface EmployeeProfileFormProps {
    userName?: string | null;
    userEmail: string;
}

export type Experience = {
    company: string;
    role: string;
    responsibilities: string;
    startDate: string;
    endDate: string;
};

export type Certification = {
    title: string;
    issuer: string;
    issueDate: string;
    duration: string;
};

export type Attachment = {
    id: string;
    label: string;
    fileName: string;
};
export interface PersonalInfo {
    firstName?: string;
    lastName?: string;
    fatherName?: string;
    nationalId?: string;
    birthDate?: string;
    gender?: string;
}

export interface ContactInfo {
    phone?: string;
    emergencyPhone?: string;
    orgEmail?: string;
    personalEmail?: string;
    address?: string;
    city?: string;
}

export interface JobInfo {
    position?: string;
    contractType?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
}

export interface FinancialInfo {
    baseSalary?: string;
    benefits?: string;
    commission?: string;
    overtimeRate?: string;
}

export interface EducationInfo {
    degree?: string;
    major?: string;
    university?: string;
    graduationYear?: string;
}

export interface WorkHistoryItem {
    company?: string;
    role?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

export interface CertificateItem {
    title?: string;
    issuer?: string;
    issueDate?: string;
    duration?: string;
}

export interface AttachmentInfo {
    resume?: string;
    idScan?: string;
    avatar?: string;
    educationDocs?: string;
    certificates?: string;
}

export interface AdditionalInfo {
    skills?: string[];
    linkedin?: string;
    github?: string;
    website?: string;
    maritalStatus?: string;
    notes?: string;
}

export interface UserRecord {
    id: string;
    personal: PersonalInfo;
    contact: ContactInfo;
    job: JobInfo;
    financial: FinancialInfo;
    education: EducationInfo;
    workHistory: WorkHistoryItem[];
    certificates: CertificateItem[];
    attachments: AttachmentInfo;
    additional: AdditionalInfo;
}

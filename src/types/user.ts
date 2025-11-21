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

export interface UserRecord {
    id: string;
    personal: PersonalInfo;
    contact: ContactInfo;
    job: JobInfo;
}

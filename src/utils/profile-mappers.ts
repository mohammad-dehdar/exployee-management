import type { UserRecord, WorkHistoryItem, CertificateItem } from '@/schemas/user.schema';

type Uploadable = string | File | Blob;

export interface EmployeeProfilePayload {
  firstName?: string;
  lastName?: string;
  fatherName?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'none';
  mobile?: string;
  emergencyContact?: string;
  orgEmail?: string;
  personalEmail?: string;
  address?: string;
  city?: string;
  position?: string;
  contractType?: string;
  startDate?: string;
  endDate?: string;
  workLocation?: string;
  baseSalary?: number;
  benefits?: string;
  commission?: number;
  overtimeRate?: number;
  education?: {
    degree?: string;
    major?: string;
    university?: string;
    graduationYear?: number;
  };
  workHistory?: Array<{
    company?: string;
    position?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }>;
  certificates?: Array<{
    title?: string;
    issuer?: string;
    issueDate?: string;
    duration?: string;
  }>;
  attachments?: {
    resume?: Uploadable;
    nationalIdScan?: Uploadable;
    personalPhoto?: Uploadable;
    educationalDocs?: Array<Uploadable> | Uploadable;
    certificates?: Array<Uploadable> | Uploadable;
  };
  additional?: {
    skills?: string[];
    linkedin?: string;
    github?: string;
    website?: string;
    maritalStatus?: 'single' | 'married' | 'other';
    notes?: string;
  };
}

export interface EmployeeProfileApiModel extends EmployeeProfilePayload {
  id?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    joinedAt?: string;
  };
  fullName?: string;
  details?: {
    education?: Record<string, unknown>;
    workHistory?: Array<Record<string, unknown>>;
    certificates?: Array<Record<string, unknown>>;
    attachments?: {
      resume?: string;
      nationalIdScan?: string;
      personalPhoto?: string;
      educationalDocs?: string[];
      certificates?: string[];
    };
    additional?: Record<string, unknown>;
  };
  createdAt?: string;
  updatedAt?: string;
}

const toNumber = (value?: string): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const isFileLike = (value: unknown): value is File | Blob => {
  if (typeof File !== 'undefined' && value instanceof File) return true;
  if (typeof Blob !== 'undefined' && value instanceof Blob) return true;
  return false;
};

const hasFileInValue = (value: unknown): boolean => {
  if (!value) return false;
  if (isFileLike(value)) return true;
  if (Array.isArray(value)) {
    return value.some((item) => hasFileInValue(item));
  }
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some((item) => hasFileInValue(item));
  }
  return false;
};

const appendFormData = (formData: FormData, key: string, value: unknown) => {
  if (value === undefined || value === null) return;

  if (isFileLike(value)) {
    formData.append(key, value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => appendFormData(formData, `${key}[]`, item));
    return;
  }

  if (typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) =>
      appendFormData(formData, `${key}.${childKey}`, childValue),
    );
    return;
  }

  formData.append(key, String(value));
};

export const hasFileInPayload = (payload: EmployeeProfilePayload): boolean => hasFileInValue(payload);

export const buildEmployeeProfileFormData = (payload: EmployeeProfilePayload): FormData => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => appendFormData(formData, key, value));
  return formData;
};

// Convert UserRecord to API payload format
export function convertUserRecordToPayload(user: UserRecord): EmployeeProfilePayload {
  const payload: EmployeeProfilePayload = {};

  // Personal Info
  if (user.personal) {
    if (user.personal.firstName) payload.firstName = user.personal.firstName;
    if (user.personal.lastName) payload.lastName = user.personal.lastName;
    if (user.personal.fatherName) payload.fatherName = user.personal.fatherName;
    if (user.personal.nationalId) payload.nationalId = user.personal.nationalId;
    if (user.personal.birthDate) payload.dateOfBirth = user.personal.birthDate;
    if (user.personal.gender) payload.gender = user.personal.gender;
  }

  // Contact Info
  if (user.contact) {
    if (user.contact.phone) payload.mobile = user.contact.phone;
    if (user.contact.emergencyPhone) payload.emergencyContact = user.contact.emergencyPhone;
    if (user.contact.orgEmail) payload.orgEmail = user.contact.orgEmail;
    if (user.contact.personalEmail) payload.personalEmail = user.contact.personalEmail;
    if (user.contact.address) payload.address = user.contact.address;
    if (user.contact.city) payload.city = user.contact.city;
  }

  // Job Info
  if (user.job) {
    if (user.job.position) payload.position = user.job.position;
    if (user.job.contractType) payload.contractType = user.job.contractType;
    if (user.job.startDate) payload.startDate = user.job.startDate;
    if (user.job.endDate) payload.endDate = user.job.endDate;
    if (user.job.location) payload.workLocation = user.job.location;
  }

  // Financial Info
  if (user.financial) {
    const salary = toNumber(user.financial.baseSalary);
    const commission = toNumber(user.financial.commission);
    const overtime = toNumber(user.financial.overtimeRate);

    if (salary !== undefined) payload.baseSalary = salary;
    if (user.financial.benefits) payload.benefits = user.financial.benefits;
    if (commission !== undefined) payload.commission = commission;
    if (overtime !== undefined) payload.overtimeRate = overtime;
  }

  // Education
  if (user.education) {
    payload.education = {};
    if (user.education.degree) payload.education.degree = user.education.degree;
    if (user.education.major) payload.education.major = user.education.major;
    if (user.education.university) payload.education.university = user.education.university;
    if (user.education.graduationYear) {
      const year = parseInt(user.education.graduationYear, 10);
      if (!Number.isNaN(year)) payload.education.graduationYear = year;
    }
  }

  // Work History
  if (user.workHistory && user.workHistory.length > 0) {
    payload.workHistory = user.workHistory
      .filter((item) => item.company || item.role || item.description)
      .map((item) => ({
        company: item.company || undefined,
        position: item.role || undefined,
        description: item.description || undefined,
        startDate: item.startDate || undefined,
        endDate: item.endDate || undefined,
      }));
  }

  // Certificates
  if (user.certificates && user.certificates.length > 0) {
    payload.certificates = user.certificates
      .filter((item) => item.title || item.issuer)
      .map((item) => ({
        title: item.title || undefined,
        issuer: item.issuer || undefined,
        issueDate: item.issueDate || undefined,
        duration: item.duration || undefined,
      }));
  }

  // Attachments
  if (user.attachments) {
    payload.attachments = {};
    if (user.attachments.resume) payload.attachments.resume = user.attachments.resume;
    if (user.attachments.idScan) payload.attachments.nationalIdScan = user.attachments.idScan;
    if (user.attachments.avatar) payload.attachments.personalPhoto = user.attachments.avatar;
    if (user.attachments.educationDocs) {
      payload.attachments.educationalDocs = Array.isArray(user.attachments.educationDocs)
        ? user.attachments.educationDocs
        : [user.attachments.educationDocs];
    }
    if (user.attachments.certificates) {
      payload.attachments.certificates = Array.isArray(user.attachments.certificates)
        ? user.attachments.certificates
        : [user.attachments.certificates];
    }
  }

  // Additional
  if (user.additional) {
    payload.additional = {};
    if (user.additional.skills && Array.isArray(user.additional.skills)) {
      payload.additional.skills = user.additional.skills;
    }
    if (user.additional.linkedin) payload.additional.linkedin = user.additional.linkedin;
    if (user.additional.github) payload.additional.github = user.additional.github;
    if (user.additional.website) payload.additional.website = user.additional.website;
    if (user.additional.maritalStatus) payload.additional.maritalStatus = user.additional.maritalStatus;
    if (user.additional.notes) payload.additional.notes = user.additional.notes;
  }

  return payload;
}

// Convert API profile shape to local UserRecord
export function mapProfileApiToUserRecord(profile: EmployeeProfileApiModel): UserRecord {
  const details = profile.details ?? {};
  const attachments = details.attachments ?? profile.attachments ?? {};
  const workHistory = (details.workHistory ?? []) as WorkHistoryItem[];
  const certificates = (details.certificates ?? []) as CertificateItem[];

  return {
    id: profile.user?.id ?? profile.id ?? 'unknown',
    personal: {
      username: profile.user?.name,
      firstName: profile.firstName,
      lastName: profile.lastName,
      fatherName: profile.fatherName,
      nationalId: profile.nationalId,
      birthDate: profile.dateOfBirth,
      gender: profile.gender as UserRecord['personal']['gender'],
    },
    contact: {
      phone: profile.mobile,
      emergencyPhone: profile.emergencyContact,
      orgEmail: profile.orgEmail ?? profile.user?.email,
      personalEmail: profile.personalEmail,
      address: profile.address,
      city: profile.city,
    },
    job: {
      position: profile.position,
      contractType: profile.contractType as UserRecord['job']['contractType'],
      startDate: profile.startDate,
      endDate: profile.endDate,
      location: profile.workLocation as UserRecord['job']['location'],
    },
    financial: {
      baseSalary:
        profile.baseSalary !== undefined ? String(profile.baseSalary) : undefined,
      benefits: profile.benefits,
      commission:
        profile.commission !== undefined ? String(profile.commission) : undefined,
      overtimeRate:
        profile.overtimeRate !== undefined ? String(profile.overtimeRate) : undefined,
    },
    education: (details.education as UserRecord['education']) ?? {},
    workHistory:
      workHistory.map((item) => ({
        company: (item as Record<string, unknown>).company as string | undefined,
        role:
          ((item as Record<string, unknown>).role ??
            (item as Record<string, unknown>).position) as string | undefined,
        description: (item as Record<string, unknown>).description as string | undefined,
        startDate: (item as Record<string, unknown>).startDate as string | undefined,
        endDate: (item as Record<string, unknown>).endDate as string | undefined,
      })) ?? [],
    certificates:
      certificates.map((item) => ({
        title: (item as Record<string, unknown>).title as string | undefined,
        issuer: (item as Record<string, unknown>).issuer as string | undefined,
        issueDate: (item as Record<string, unknown>).issueDate as string | undefined,
        duration: (item as Record<string, unknown>).duration as string | undefined,
      })) ?? [],
    attachments: {
      resume: attachments.resume,
      idScan: attachments.nationalIdScan,
      avatar: attachments.personalPhoto,
      educationDocs: attachments.educationalDocs as string[] | undefined,
      certificates: attachments.certificates as string[] | undefined,
    },
    additional: (details.additional as UserRecord['additional']) ?? {},
  };
}

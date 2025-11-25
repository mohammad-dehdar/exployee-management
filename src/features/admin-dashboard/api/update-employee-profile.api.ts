import { customFetch, ApiError } from '@/utils/custom-fetch';
import { logger } from '@/utils/logger';
import type { UserRecord } from '@/schemas/user.schema';

const ERROR_MESSAGES = {
  UNAUTHORIZED: 'auth.errors.unauthorized',
  NETWORK_ERROR: 'auth.errors.networkError',
  VALIDATION_ERROR: 'validation.error',
} as const;

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
    resume?: string;
    nationalIdScan?: string;
    personalPhoto?: string;
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

interface UpdateEmployeeProfileApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

// Helper function to convert UserRecord to API payload format
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

  // Education
  if (user.education) {
    payload.education = {};
    if (user.education.degree) payload.education.degree = user.education.degree;
    if (user.education.major) payload.education.major = user.education.major;
    if (user.education.university) payload.education.university = user.education.university;
    if (user.education.graduationYear) {
      const year = parseInt(user.education.graduationYear, 10);
      if (!isNaN(year)) payload.education.graduationYear = year;
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

// Helper function to map API error to i18n key
const mapApiErrorToMessage = (error: ApiError | unknown): string => {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    
    if (apiError.status === 401 || apiError.status === 403) {
      return ERROR_MESSAGES.UNAUTHORIZED;
    }
    if (apiError.status === 400) {
      return ERROR_MESSAGES.VALIDATION_ERROR;
    }
  }
  
  return ERROR_MESSAGES.NETWORK_ERROR;
};

export interface UpdateEmployeeProfileResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

export async function updateEmployeeProfileApi(
  payload: EmployeeProfilePayload
): Promise<UpdateEmployeeProfileResult> {
  try {
    const endpoint = '/employee/profile';

    const response = await customFetch<UpdateEmployeeProfileApiResponse>(endpoint, {
      method: 'POST',
      body: payload,
      requiresAuth: true,
    });

    if (!response.success) {
      return {
        success: false,
        message: response.message || ERROR_MESSAGES.NETWORK_ERROR,
      };
    }

    logger.info('Employee profile updated successfully');

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    logger.error('Failed to update employee profile', error);
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}


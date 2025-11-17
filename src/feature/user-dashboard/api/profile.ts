import axios from "axios";
import type {
  EmployeeProfilePayload,
} from "../types";

export interface EmployeeProfileResponse {
  profile: EmployeeProfilePayload | null;
}

export interface SaveProfileResponse {
  message: string;
  profile: EmployeeProfilePayload;
}

const baseUrl = "/api/profile";

export async function fetchEmployeeProfile() {
  const response = await axios.get<EmployeeProfileResponse>(baseUrl);
  return response.data.profile;
}

export async function saveEmployeeProfile(data: EmployeeProfilePayload) {
  const response = await axios.put<SaveProfileResponse>(baseUrl, data);
  return response.data;
}

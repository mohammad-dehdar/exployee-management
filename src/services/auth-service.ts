import axios from 'axios';
import type { LoginInput, SignupInput } from '@/schemas/auth.schema';
import type { User } from '@/store/user.store';
import type { LoginResponse, SignupResponse, ApiError } from './types';

class AuthService {
  private baseURL = '/api/auth';

  async login(data: LoginInput): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${this.baseURL}/login`, data);
    return response.data;
  }

  async signup(data: SignupInput): Promise<SignupResponse> {
    const response = await axios.post<SignupResponse>(`${this.baseURL}/signup`, data);
    return response.data;
  }

  async logout(): Promise<{ message: string }> {
    const response = await axios.post<{ message: string }>(`${this.baseURL}/logout`);
    return response.data;
  }

  async getCurrentUser(): Promise<{ user: User | null }> {
    const response = await axios.get<{ user: User | null }>(`${this.baseURL}/user`);
    return response.data;
  }
}

export const authService = new AuthService();

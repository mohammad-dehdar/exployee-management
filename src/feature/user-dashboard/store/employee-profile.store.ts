import { create } from "zustand";
import type {
  EmployeeProfilePayload,
} from "../types";

interface EmployeeProfileState {
  profile: EmployeeProfilePayload | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  setProfile: (profile: EmployeeProfilePayload | null) => void;
  setLoading: (value: boolean) => void;
  setSaving: (value: boolean) => void;
  setError: (message: string | null) => void;
}

export const useEmployeeProfileStore = create<EmployeeProfileState>((set) => ({
  profile: null,
  isLoading: false,
  isSaving: false,
  error: null,
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),
  setSaving: (isSaving) => set({ isSaving }),
  setError: (error) => set({ error }),
}));

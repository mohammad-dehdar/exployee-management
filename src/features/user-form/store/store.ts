import { create } from "zustand";
import type { ContactInfo, JobInfo, PersonalInfo } from "@/types/user";

export interface UserFormState {
    personal: Partial<PersonalInfo>;
    contact: Partial<ContactInfo>;
    job: Partial<JobInfo>;
    setPersonal: (value: Partial<PersonalInfo>) => void;
    setContact: (value: Partial<ContactInfo>) => void;
    setJob: (value: Partial<JobInfo>) => void;
    reset: () => void;
}

export const useUserFormStore = create<UserFormState>((set) => ({
    personal: {},
    contact: {},
    job: {},
    setPersonal: (value) => set({ personal: value }),
    setContact: (value) => set({ contact: value }),
    setJob: (value) => set({ job: value }),
    reset: () => set({ personal: {}, contact: {}, job: {} }),
}));

import { create } from 'zustand';

interface UserFormState {
  personal: any;
  contact: any;
  job: any;

  setPersonal: (v: any) => void;
  setContact: (v: any) => void;
  setJob: (v: any) => void;
  reset: () => void;
}

export const useUserFormStore = create<UserFormState>((set) => ({
  personal: {},
  contact: {},
  job: {},

  setPersonal: (v) => set({ personal: v }),
  setContact: (v) => set({ contact: v }),
  setJob: (v) => set({ job: v }),

  reset: () => set({ personal: {}, contact: {}, job: {} }),
}));

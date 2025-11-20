import { ContractTypeValue, WorkLocationValue } from "./types";

export const contractTypes: { label: string; value: ContractTypeValue }[] = [
  { label: 'تمام‌وقت', value: 'fulltime' },
  { label: 'پاره‌وقت', value: 'parttime' },
  { label: 'فریلنسر', value: 'freelancer' },
  { label: 'پروژه‌ای', value: 'project' },
  { label: 'ساعتی', value: 'hourly' },
];

export const workLocations: { label: string; value: WorkLocationValue }[] = [
  { label: 'دفتر تهران', value: 'tehran' },
  { label: 'ریموت', value: 'remote' },
];

import { ContractTypeValue, WorkLocationValue } from "./types";

export const contractTypes: { label: string; value: ContractTypeValue }[] = [
    { label: "تمام‌وقت", value: "fulltime" },
    { label: "پاره‌وقت", value: "parttime" },
    { label: "فریلنسر", value: "freelancer" },
    { label: "پروژه‌ای", value: "project" },
    { label: "ساعتی", value: "hourly" },
];

export const workLocations: { label: string; value: WorkLocationValue }[] = [
    { label: "دفتر تهران", value: "tehran" },
    { label: "دفتر مشهد", value: "mashhad" },
    { label: "ریموت", value: "remote" },
    { label: "سایر", value: "other" },
];

export const positions = [
    { label: "فرانت‌اند دولوپر", value: "frontend" },
    { label: "بک‌اند دولوپر", value: "backend" },
    { label: "دیزاینر", value: "designer" },
    { label: "محصول / سایر", value: "other" },
];

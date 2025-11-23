import { ContractTypeValue, WorkLocationValue } from "./types";

// Only values are stored here, labels come from translations (options.json)
export const contractTypes: { value: ContractTypeValue }[] = [
    { value: "fulltime" },
    { value: "parttime" },
    { value: "freelancer" },
    { value: "project" },
    { value: "hourly" },
];

export const workLocations: { value: WorkLocationValue }[] = [
    { value: "german" },
    { value: "remote" },
];

export const positions = [
    { value: "frontend" },
    { value: "backend" },
    { value: "designer" },
    { value: "other" },
];

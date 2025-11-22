export interface JobInfoValues {
    position: string;
    contractType: string;
    startDate: string;
    endDate?: string;
    location: string;
  }

  export interface JobInfoProps {
    values: JobInfoValues;
    onChange: (field: keyof JobInfoValues, value: any) => void;
  }

export type ContractTypeValue = 'fulltime' | 'parttime' | 'freelancer' | 'project' | 'hourly';
export type WorkLocationValue = 'tehran' | 'mashhad' | 'remote' | 'other';
export interface PersonalInfoValues {
    firstName: string;
    lastName: string;
    fatherName?: string;
    nationalId: string;
    birthDate: string;
    gender?: string;
  }

  export interface PersonalInfoProps {
    values: PersonalInfoValues;
    onChange: (field: keyof PersonalInfoValues, value: any) => void;
  }

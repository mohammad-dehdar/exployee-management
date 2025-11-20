export interface ContactInfoValues {
    phone: string;
    emergencyPhone?: string;
    orgEmail: string;
    personalEmail?: string;
    address: string;
    city: string;
  }

  export interface ContactInfoProps {
    values: ContactInfoValues;
    onChange: (field: keyof ContactInfoValues, value: any) => void;
  }

export interface FormFieldProps {
    label: string;
    error?: string;
    warning?: string;  
    helperText?: string;
    required?: boolean;
    id?: string;
    className?: string;
    children: React.ReactNode;
    labelProps?: {
      color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      align?: 'left' | 'right' | 'center' | 'justify';
    };
  }
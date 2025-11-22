export type LoginType = 'user' | 'admin' | 'resume' | null;

export interface LoginCardProps {
    loginType: LoginType;
    email: string;
    password: string;
    onLoginTypeSelect: (type: 'user' | 'admin' | 'resume') => void;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onBack: () => void;
}

export interface LoginFormProps {
    loginType: 'user' | 'admin';
    email: string;
    password: string;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onBack: () => void;
}

export interface HeroSectionProps {
    loginType: LoginType;
}

export interface LoginTypeSelectorProps {
    onSelect: (type: 'user' | 'admin' | 'resume') => void;
}

export interface ResumeSectionProps {
    onBack: () => void;
}


'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from 'react';

interface FormSectionWrapperProps {
    sectionKey: string; // e.g., 'personal', 'contact', 'job'
    emoji: string;
    children: ReactNode;
    contentLayout?: 'grid' | 'stack'; // grid for 2-column layout, stack for vertical
    borderColor?: 'primary' | 'amber';
}

export const FormSectionWrapper = ({
    sectionKey,
    emoji,
    children,
    contentLayout = 'grid',
    borderColor = 'primary',
}: FormSectionWrapperProps) => {
    const t = useTranslations(`userForm.sections.${sectionKey}`);

    const borderClass = borderColor === 'amber' 
        ? 'border-2 border-amber-400/70' 
        : 'border-2 border-primary/50';

    const contentClass = contentLayout === 'grid'
        ? 'grid gap-6 px-6 pb-6 md:grid-cols-2'
        : 'space-y-6 px-6 pb-6';

    return (
        <Card className={`rounded-xl ${borderClass} bg-background p-0 shadow-lg`}>
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className={borderColor === 'amber' ? 'text-amber-500' : 'text-primary'}>{emoji}</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className={contentClass}>
                {children}
            </CardContent>
        </Card>
    );
};

// Export dir hook for use in child components
export const useFormSectionDir = () => {
    const locale = useLocale();
    return locale === 'fa' ? 'rtl' : 'ltr';
};

// Re-export SelectField
export { SelectField } from './select-field';


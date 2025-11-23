'use client';

import { useTranslations } from 'next-intl';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useFormSectionDir } from './index';

interface SelectFieldProps {
    labelKey: string; // Translation key for label (e.g., 'fields.position')
    register: UseFormRegisterReturn;
    options: Array<{ value: string }> | ReadonlyArray<{ readonly value: string }>;
    optionsTranslationKey: string; // Base key for options (e.g., 'position', 'contractType')
    editable?: boolean;
    sectionKey: string; // For translations (e.g., 'userForm.sections.job')
    className?: string;
}

export const SelectField = ({
    labelKey,
    register,
    options,
    optionsTranslationKey,
    editable = true,
    sectionKey,
    className = "rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
}: SelectFieldProps) => {
    const dir = useFormSectionDir();
    const t = useTranslations(`userForm.sections.${sectionKey}`);
    const tOptions = useTranslations('options');
    const tCommon = useTranslations('common');

    return (
        <div className="flex flex-col space-y-2" dir={dir}>
            <label className="text-sm font-medium text-foreground" dir={dir}>
                {t(labelKey)}
            </label>
            <select
                className={className}
                dir={dir}
                {...register}
                disabled={!editable}
            >
                <option value="">{tCommon('select')}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {tOptions(`${optionsTranslationKey}.${option.value}`)}
                    </option>
                ))}
            </select>
        </div>
    );
};


'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { TextInput } from "@/components/ui/text-input";
import { FormSectionWrapper } from "@/components/shared";

export const FinancialInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.financial');

    return (
        <FormSectionWrapper sectionKey="financial" emoji="💰" borderColor="amber">
                <TextInput
                    fullWidth
                    label={t('fields.baseSalary')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.baseSalary')}
                    {...register("financial.baseSalary")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.benefits')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.benefits')}
                    {...register("financial.benefits")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.commission')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.commission')}
                    {...register("financial.commission")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.overtimeRate')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.overtimeRate')}
                    {...register("financial.overtimeRate")}
                    className="rounded-lg"
                    disabled={!editable}
                />
        </FormSectionWrapper>
    );
};

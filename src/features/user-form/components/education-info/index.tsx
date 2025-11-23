'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { TextInput } from "@/components/ui/text-input";
import { DEGREE_LEVELS } from "@/schemas/user.schema";
import { FormSectionWrapper, SelectField } from "@/components/shared";

export const EducationInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.education');

    return (
        <FormSectionWrapper sectionKey="education" emoji="🎓">
                <SelectField
                    labelKey="fields.degree"
                    register={register("education.degree")}
                    options={DEGREE_LEVELS.map(d => ({ value: d }))}
                    optionsTranslationKey="degree"
                    editable={editable}
                    sectionKey="education"
                />

                <TextInput
                    fullWidth
                    label={t('fields.major')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.major')}
                    {...register("education.major")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.university')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.university')}
                    {...register("education.university")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.graduationYear')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.graduationYear')}
                    {...register("education.graduationYear")}
                    className="rounded-lg"
                    disabled={!editable}
                />
        </FormSectionWrapper>
    );
};

'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { TextInput } from "@/components/ui/text-input";
import { GENDER_OPTIONS } from "@/schemas/user.schema";
import { FormSectionWrapper, SelectField } from "@/components/shared";

export const PersonalInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.personal');

    return (
        <FormSectionWrapper sectionKey="personal" emoji="👤">
                <TextInput
                    label={t('fields.username')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.username')}
                    {...register("personal.username")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('fields.firstName')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.firstName')}
                    {...register("personal.firstName")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('fields.lastName')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.lastName')}
                    {...register("personal.lastName")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('fields.fatherName')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.fatherName')}
                    {...register("personal.fatherName")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('fields.nationalId')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.nationalId')}
                    {...register("personal.nationalId")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('fields.birthDate')}
                    fullWidth
                    type="date"
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.birthDate')}
                    {...register("personal.birthDate")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <SelectField
                    labelKey="fields.gender"
                    register={register("personal.gender")}
                    options={GENDER_OPTIONS}
                    optionsTranslationKey="gender"
                    editable={editable}
                    sectionKey="personal"
                />
        </FormSectionWrapper>
    );
};
'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { TextInput } from "@/components/ui/text-input";
import { CONTRACT_TYPES, POSITIONS, WORK_LOCATIONS } from "@/schemas/user.schema";
import { FormSectionWrapper, SelectField } from "@/components/shared";

export const JobInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.job');

    return (
        <FormSectionWrapper sectionKey="job" emoji="💼">
                <SelectField
                    labelKey="fields.position"
                    register={register("job.position")}
                    options={POSITIONS}
                    optionsTranslationKey="position"
                    editable={editable}
                    sectionKey="job"
                />

                <SelectField
                    labelKey="fields.contractType"
                    register={register("job.contractType")}
                    options={CONTRACT_TYPES}
                    optionsTranslationKey="contractType"
                    editable={editable}
                    sectionKey="job"
                />

                <TextInput
                    fullWidth
                    type="date"
                    label={t('fields.startDate')}
                    variant="outline"
                    color="neutral"
                    {...register("job.startDate")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    type="date"
                    label={t('fields.endDate')}
                    variant="outline"
                    color="neutral"
                    {...register("job.endDate")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <SelectField
                    labelKey="fields.location"
                    register={register("job.location")}
                    options={WORK_LOCATIONS}
                    optionsTranslationKey="location"
                    editable={editable}
                    sectionKey="job"
                />
        </FormSectionWrapper>
    );
};

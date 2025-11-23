'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { MARITAL_STATUSES } from "@/schemas/user.schema";
import { FormSectionWrapper, SelectField, useFormSectionDir } from "@/components/shared";

export const AdditionalInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register, setValue, watch } = useFormContext();
    const t = useTranslations('userForm.sections.additional');
    const dir = useFormSectionDir();
    const skills = watch("additional.skills") as string[] | undefined;

    const handleSkillsChange = (value: string) => {
        const parsed = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        setValue("additional.skills", parsed);
    };


    return (
        <FormSectionWrapper sectionKey="additional" emoji="✨">
                <div className="flex flex-col space-y-2 md:col-span-2" dir={dir}>
                    <label className="text-sm font-medium text-foreground" dir={dir}>{t('fields.skills')}</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        dir={dir}
                        value={skills?.join(", ") ?? ""}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2" dir={dir}>
                    <label className="text-sm font-medium text-foreground" dir={dir}>{t('fields.linkedin')}</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        dir={dir}
                        placeholder={t('placeholders.linkedin')}
                        {...register("additional.linkedin")}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2" dir={dir}>
                    <label className="text-sm font-medium text-foreground" dir={dir}>{t('fields.github')}</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        dir={dir}
                        placeholder={t('placeholders.github')}
                        {...register("additional.github")}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2" dir={dir}>
                    <label className="text-sm font-medium text-foreground" dir={dir}>{t('fields.website')}</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        dir={dir}
                        placeholder={t('placeholders.website')}
                        {...register("additional.website")}
                        disabled={!editable}
                    />
                </div>

                <SelectField
                    labelKey="fields.maritalStatus"
                    register={register("additional.maritalStatus")}
                    options={MARITAL_STATUSES.map(s => ({ value: s }))}
                    optionsTranslationKey="maritalStatus"
                    editable={editable}
                    sectionKey="additional"
                />

                <div className="flex flex-col space-y-2 md:col-span-2" dir={dir}>
                    <label className="text-sm font-medium text-foreground" dir={dir}>{t('fields.notes')}</label>
                    <textarea
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        dir={dir}
                        rows={3}
                        placeholder={t('placeholders.notes')}
                        {...register("additional.notes")}
                        disabled={!editable}
                    />
                </div>
        </FormSectionWrapper>
    );
};

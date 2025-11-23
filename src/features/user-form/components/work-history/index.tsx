'use client';

import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { FormSectionWrapper } from "@/components/shared";

export const WorkHistory = ({ editable = true }: { editable?: boolean }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "workHistory" });
    const t = useTranslations('userForm.sections.workHistory');
    const tCommon = useTranslations('common');

    const handleAdd = () =>
        append({ company: "", role: "", description: "", startDate: "", endDate: "" });

    return (
        <FormSectionWrapper sectionKey="workHistory" emoji="📂" contentLayout="stack">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="rounded-lg border border-border/60 bg-muted/30 p-4 shadow-inner space-y-3"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                fullWidth
                                label={t('fields.company')}
                                variant="outline"
                                color="neutral"
                                placeholder={t('placeholders.company')}
                                {...register(`workHistory.${index}.company` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                            <TextInput
                                fullWidth
                                label={t('fields.role')}
                                variant="outline"
                                color="neutral"
                                placeholder={t('placeholders.role')}
                                {...register(`workHistory.${index}.role` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                        </div>

                        <TextInput
                            fullWidth
                            label={t('fields.description')}
                            variant="outline"
                            color="neutral"
                            placeholder={t('placeholders.description')}
                            {...register(`workHistory.${index}.description` as const)}
                            className="rounded-lg"
                            disabled={!editable}
                        />

                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                fullWidth
                                type="date"
                                label={t('fields.startDate')}
                                variant="outline"
                                color="neutral"
                                {...register(`workHistory.${index}.startDate` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                            <TextInput
                                fullWidth
                                type="date"
                                label={t('fields.endDate')}
                                variant="outline"
                                color="neutral"
                                {...register(`workHistory.${index}.endDate` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                        </div>

                        {editable && fields.length > 1 && (
                            <div className="flex justify-end">
                                <Button variant="ghost" onClick={() => remove(index)}>
                                    {tCommon('delete')}
                                </Button>
                            </div>
                        )}
                    </div>
                ))}

                {editable && (
                    <div className="flex justify-start">
                        <Button type="button" variant="outline" onClick={handleAdd} className="rounded-lg">
                            {t('addNew')}
                        </Button>
                    </div>
                )}
        </FormSectionWrapper>
    );
};

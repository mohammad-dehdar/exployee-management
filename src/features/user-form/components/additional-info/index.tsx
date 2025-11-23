'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AdditionalInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register, setValue, watch } = useFormContext();
    const t = useTranslations('userForm.sections.additional');
    const tOptions = useTranslations('options');
    const tCommon = useTranslations('common');
    const skills = watch("additional.skills") as string[] | undefined;

    const handleSkillsChange = (value: string) => {
        const parsed = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        setValue("additional.skills", parsed);
    };

    const maritalStatusOptions = [
        { value: 'single' as const },
        { value: 'married' as const },
        { value: 'other' as const },
    ];

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className="text-primary">✨</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.skills')}</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        value={skills?.join(", ") ?? ""}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.linkedin')}</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        placeholder={t('placeholders.linkedin')}
                        {...register("additional.linkedin")}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.github')}</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        placeholder={t('placeholders.github')}
                        {...register("additional.github")}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.website')}</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        placeholder={t('placeholders.website')}
                        {...register("additional.website")}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.maritalStatus')}</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("additional.maritalStatus")}
                        disabled={!editable}
                    >
                        <option value="">{tCommon('select')}</option>
                        {maritalStatusOptions.map((status) => (
                            <option key={status.value} value={status.value}>
                                {tOptions(`maritalStatus.${status.value}`)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.notes')}</label>
                    <textarea
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        rows={3}
                        placeholder={t('placeholders.notes')}
                        {...register("additional.notes")}
                        disabled={!editable}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

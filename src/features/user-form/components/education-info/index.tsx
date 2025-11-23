'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";

export const EducationInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.education');
    const tOptions = useTranslations('options');
    const tCommon = useTranslations('common');
    
    const degreeOptions = [
        { value: 'diploma' as const },
        { value: 'associate' as const },
        { value: 'bachelor' as const },
        { value: 'master' as const },
        { value: 'phd' as const },
    ];

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className="text-primary">🎓</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.degree')}</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("education.degree")}
                        disabled={!editable}
                    >
                        <option value="">{tCommon('select')}</option>
                        {degreeOptions.map((degree) => (
                            <option key={degree.value} value={degree.value}>
                                {tOptions(`degree.${degree.value}`)}
                            </option>
                        ))}
                    </select>
                </div>

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
            </CardContent>
        </Card>
    );
};

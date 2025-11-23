'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";
import { GENDER_OPTIONS } from "@/schemas/user.schema";

export const PersonalInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.personal');
    const tCommon = useTranslations('common');
    const tOptions = useTranslations('options');

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className="text-primary">👤</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
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

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.gender')}</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("personal.gender")}
                        disabled={!editable}
                    >
                        <option value="">{tCommon('select')}</option>
                        {GENDER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {tOptions(`gender.${option.value}`)}
                            </option>
                        ))}
                    </select>
                </div>
            </CardContent>
        </Card>
    );
};
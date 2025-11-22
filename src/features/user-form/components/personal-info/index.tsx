'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";
import { GENDER_OPTIONS } from "@/schemas/user.schema";

export const PersonalInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations();

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('userForm.sections.personal.title')} <span className="text-primary">👤</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('userForm.sections.personal.description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <TextInput
                    label={t('userForm.sections.personal.fields.username')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    {...register("personal.username")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('userForm.sections.personal.fields.firstName')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    {...register("personal.firstName")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('userForm.sections.personal.fields.lastName')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    {...register("personal.lastName")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('userForm.sections.personal.fields.fatherName')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    {...register("personal.fatherName")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('userForm.sections.personal.fields.nationalId')}
                    fullWidth
                    variant="outline"
                    color="neutral"
                    {...register("personal.nationalId")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    label={t('userForm.sections.personal.fields.birthDate')}
                    fullWidth
                    type="date"
                    variant="outline"
                    color="neutral"
                    {...register("personal.birthDate")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('userForm.sections.personal.fields.gender')}</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("personal.gender")}
                        disabled={!editable}
                    >
                        <option value="">{t('common.select')}</option>
                        {GENDER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {t(`options.gender.${option.value}`)}
                            </option>
                        ))}
                    </select>
                </div>
            </CardContent>
        </Card>
    );
};
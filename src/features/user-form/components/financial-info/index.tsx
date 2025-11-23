'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";

export const FinancialInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.financial');

    return (
        <Card className="rounded-xl border-2 border-amber-400/70 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className="text-amber-500">💰</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
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
            </CardContent>
        </Card>
    );
};

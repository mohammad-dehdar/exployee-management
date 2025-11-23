'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";

export const ContactInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.contact');

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className="text-primary">📞</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <TextInput
                    fullWidth
                    label={t('fields.phone')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.phone')}
                    {...register("contact.phone")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.emergencyPhone')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.emergencyPhone')}
                    {...register("contact.emergencyPhone")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.orgEmail')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.orgEmail')}
                    {...register("contact.orgEmail")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.personalEmail')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.personalEmail')}
                    {...register("contact.personalEmail")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.address')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.address')}
                    {...register("contact.address")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.city')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.city')}
                    {...register("contact.city")}
                    disabled={!editable}
                    className="rounded-lg"
                />
            </CardContent>
        </Card>
    );
};

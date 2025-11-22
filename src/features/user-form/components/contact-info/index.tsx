'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";

export const ContactInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations();

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('userForm.sections.contact.title')} <span className="text-primary">📞</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('userForm.sections.contact.description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <TextInput
                    fullWidth
                    label={t('userForm.sections.contact.fields.phone')}
                    variant="outline"
                    color="neutral"
                    {...register("contact.phone")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('userForm.sections.contact.fields.emergencyPhone')}
                    variant="outline"
                    color="neutral"
                    {...register("contact.emergencyPhone")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('userForm.sections.contact.fields.orgEmail')}
                    variant="outline"
                    color="neutral"
                    {...register("contact.orgEmail")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('userForm.sections.contact.fields.personalEmail')}
                    variant="outline"
                    color="neutral"
                    {...register("contact.personalEmail")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('userForm.sections.contact.fields.address')}
                    variant="outline"
                    color="neutral"
                    {...register("contact.address")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('userForm.sections.contact.fields.city')}
                    variant="outline"
                    color="neutral"
                    {...register("contact.city")}
                    disabled={!editable}
                    className="rounded-lg"
                />
            </CardContent>
        </Card>
    );
};

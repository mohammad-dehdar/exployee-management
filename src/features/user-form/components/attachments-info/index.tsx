'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";

export const AttachmentsInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.attachments');

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className="text-primary">📎</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <TextInput
                    fullWidth
                    label={t('fields.resume')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.resume')}
                    {...register("attachments.resume")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.idScan')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.idScan')}
                    {...register("attachments.idScan")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.avatar')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.avatar')}
                    {...register("attachments.avatar")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.educationDocs')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.educationDocs')}
                    {...register("attachments.educationDocs")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.certificates')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.certificates')}
                    {...register("attachments.certificates")}
                    className="rounded-lg"
                    disabled={!editable}
                />
            </CardContent>
        </Card>
    );
};

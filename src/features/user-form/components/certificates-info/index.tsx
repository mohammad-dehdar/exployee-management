'use client';

import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";

export const CertificatesInfo = ({ editable = true }: { editable?: boolean }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "certificates" });
    const t = useTranslations('userForm.sections.certificates');
    const tCommon = useTranslations('common');

    const handleAdd = () => append({ title: "", issuer: "", issueDate: "", duration: "" });

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className="text-primary">📜</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid gap-4 rounded-lg border border-border/60 bg-muted/30 p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                fullWidth
                                label={t('fields.title')}
                                variant="outline"
                                color="neutral"
                                placeholder={t('placeholders.title')}
                                {...register(`certificates.${index}.title` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                            <TextInput
                                fullWidth
                                label={t('fields.issuer')}
                                variant="outline"
                                color="neutral"
                                placeholder={t('placeholders.issuer')}
                                {...register(`certificates.${index}.issuer` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                fullWidth
                                type="date"
                                label={t('fields.issueDate')}
                                variant="outline"
                                color="neutral"
                                {...register(`certificates.${index}.issueDate` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                            <TextInput
                                fullWidth
                                label={t('fields.duration')}
                                variant="outline"
                                color="neutral"
                                placeholder={t('placeholders.duration')}
                                {...register(`certificates.${index}.duration` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                        </div>
                        {editable && fields.length > 1 && (
                            <div className="flex justify-end">
                                <Button variant="ghost"  onClick={() => remove(index)}>
                                    {t('remove')}
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
            </CardContent>
        </Card>
    );
};

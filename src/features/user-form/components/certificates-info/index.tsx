'use client';

import { useFieldArray, useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";

export const CertificatesInfo = ({ editable = true }: { editable?: boolean }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "certificates" });

    const handleAdd = () => append({ title: "", issuer: "", issueDate: "", duration: "" });

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    گواهینامه‌ها و دوره‌ها <span className="text-primary">📜</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    دوره‌های اخذ شده یا گواهینامه‌ها را به صورت لیست وارد کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid gap-4 rounded-lg border border-border/60 bg-muted/30 p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                fullWidth
                                label="عنوان دوره / گواهینامه"
                                variant="outline"
                                color="neutral"
                                {...register(`certificates.${index}.title` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                            <TextInput
                                fullWidth
                                label="صادرکننده"
                                variant="outline"
                                color="neutral"
                                {...register(`certificates.${index}.issuer` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                fullWidth
                                type="date"
                                label="تاریخ دریافت"
                                variant="outline"
                                color="neutral"
                                {...register(`certificates.${index}.issueDate` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                            <TextInput
                                fullWidth
                                label="مدت زمان دوره (اختیاری)"
                                variant="outline"
                                color="neutral"
                                {...register(`certificates.${index}.duration` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                        </div>
                        {editable && fields.length > 1 && (
                            <div className="flex justify-end">
                                <Button variant="ghost" size="sm" onClick={() => remove(index)}>
                                    حذف دوره
                                </Button>
                            </div>
                        )}
                    </div>
                ))}

                {editable && (
                    <div className="flex justify-start">
                        <Button type="button" variant="outline" onClick={handleAdd} className="rounded-lg">
                            افزودن دوره جدید
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

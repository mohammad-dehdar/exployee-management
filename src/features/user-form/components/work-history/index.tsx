'use client';

import { useFieldArray, useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";

export const WorkHistory = ({ editable = true }: { editable?: boolean }) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "workHistory" });

    const handleAdd = () =>
        append({ company: "", role: "", description: "", startDate: "", endDate: "" });

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    سوابق شغلی <span className="text-primary">📂</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    حداقل یک سابقه کاری را ثبت کنید. در صورت نیاز موارد بیشتری اضافه کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-6">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="rounded-lg border border-border/60 bg-muted/30 p-4 shadow-inner space-y-3"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                fullWidth
                                label="نام شرکت"
                                variant="outline"
                                color="neutral"
                                {...register(`workHistory.${index}.company` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                            <TextInput
                                fullWidth
                                label="سمت"
                                variant="outline"
                                color="neutral"
                                {...register(`workHistory.${index}.role` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                        </div>

                        <TextInput
                            fullWidth
                            label="توضیحات وظایف (اختیاری)"
                            variant="outline"
                            color="neutral"
                            {...register(`workHistory.${index}.description` as const)}
                            className="rounded-lg"
                            disabled={!editable}
                        />

                        <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                                fullWidth
                                type="date"
                                label="تاریخ شروع"
                                variant="outline"
                                color="neutral"
                                {...register(`workHistory.${index}.startDate` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                            <TextInput
                                fullWidth
                                type="date"
                                label="تاریخ پایان"
                                variant="outline"
                                color="neutral"
                                {...register(`workHistory.${index}.endDate` as const)}
                                className="rounded-lg"
                                disabled={!editable}
                            />
                        </div>

                        {editable && fields.length > 1 && (
                            <div className="flex justify-end">
                                <Button variant="ghost" size="sm" onClick={() => remove(index)}>
                                    حذف سابقه
                                </Button>
                            </div>
                        )}
                    </div>
                ))}

                {editable && (
                    <div className="flex justify-start">
                        <Button type="button" variant="outline" onClick={handleAdd} className="rounded-lg">
                            افزودن سابقه جدید
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

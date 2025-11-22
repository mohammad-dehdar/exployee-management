'use client';

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";

export const AttachmentsInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    فایل‌های ضمیمه <span className="text-primary">📎</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    لینک یا نام فایل‌های آپلود شده را وارد کنید (PDF یا تصویر).
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <TextInput
                    fullWidth
                    label="رزومه (PDF)"
                    variant="outline"
                    color="neutral"
                    {...register("attachments.resume")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="اسکن کارت ملی / پاسپورت"
                    variant="outline"
                    color="neutral"
                    {...register("attachments.idScan")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="عکس پرسنلی"
                    variant="outline"
                    color="neutral"
                    {...register("attachments.avatar")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="مدارک تحصیلی"
                    variant="outline"
                    color="neutral"
                    {...register("attachments.educationDocs")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="گواهینامه‌ها و دوره‌ها"
                    variant="outline"
                    color="neutral"
                    {...register("attachments.certificates")}
                    className="rounded-lg"
                    disabled={!editable}
                />
            </CardContent>
        </Card>
    );
};

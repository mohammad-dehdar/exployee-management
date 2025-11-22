'use client';

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";

export const FinancialInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();

    return (
        <Card className="rounded-xl border-2 border-amber-400/70 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    اطلاعات مالی <span className="text-amber-500">💰</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    فقط ادمین می‌تواند این بخش را ویرایش کند. برای کارمند در حالت نمایش است.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <TextInput
                    fullWidth
                    label="حقوق پایه"
                    variant="outline"
                    color="neutral"
                    {...register("financial.baseSalary")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="مزایا"
                    variant="outline"
                    color="neutral"
                    {...register("financial.benefits")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="پورسانت"
                    variant="outline"
                    color="neutral"
                    {...register("financial.commission")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="نرخ اضافه‌کاری"
                    variant="outline"
                    color="neutral"
                    {...register("financial.overtimeRate")}
                    className="rounded-lg"
                    disabled={!editable}
                />
            </CardContent>
        </Card>
    );
};

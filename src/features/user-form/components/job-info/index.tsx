'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/ui/text-input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
// فرض بر این است که contractTypes و workLocations از './constants' دریافت می‌شوند
import { contractTypes, workLocations } from './constants';

export const JobInfo = () => {
    const { register } = useFormContext();

    return (
        // ✨ استایل‌های جدید کارت: rounded-xl، border-2، border-primary/50، shadow-lg
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    اطلاعات شغلی <span className="text-primary">💼</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    جزئیات قرارداد و وضعیت همکاری خود را وارد کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">

                <TextInput
                    fullWidth
                    label="سمت شغلی"
                    variant="outline"
                    color="neutral"
                    {...register("job.position")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">نوع قرارداد</label> {/* بهبود استایل لیبل */}
                    <select
                        // ✨ استایل‌های جدید Select: rounded-lg، border-border/60، ring-primary
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("job.contractType")}
                    >
                        <option value="">انتخاب کنید</option>
                        {contractTypes.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <TextInput
                    fullWidth
                    type="date"
                    label="شروع همکاری"
                    variant="outline"
                    color="neutral"
                    {...register("job.startDate")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

                <TextInput
                    fullWidth
                    type="date"
                    label="پایان همکاری"
                    variant="outline"
                    color="neutral"
                    {...register("job.endDate")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">لوکیشن کاری</label> {/* بهبود استایل لیبل */}
                    <select
                        // ✨ استایل‌های جدید Select: rounded-lg، border-border/60، ring-primary
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("job.location")}
                    >
                        <option value="">انتخاب کنید</option>
                        {workLocations.map((l) => (
                            <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                    </select>
                </div>

            </CardContent>
        </Card>
    );
}
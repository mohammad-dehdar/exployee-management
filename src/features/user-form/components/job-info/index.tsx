'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/ui/text-input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { contractTypes, workLocations } from './constants';

export const JobInfo = () => {
    const { register } = useFormContext();

    return (
        <Card className="rounded-3xl border border-border/60 bg-card/80 p-0 shadow-sm">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-lg font-semibold text-foreground">اطلاعات شغلی</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    جزئیات قرارداد و وضعیت همکاری خود را وارد کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 px-6 pb-6 md:grid-cols-2">

                <TextInput
                    fullWidth
                    label="سمت شغلی"
                    variant="outline"
                    color="neutral"
                    {...register("job.position")}
                />

                <div className="flex flex-col space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">نوع قرارداد</label>
                    <select
                        className="rounded-2xl border border-border/40 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
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
                />

                <TextInput
                    fullWidth
                    type="date"
                    label="پایان همکاری"
                    variant="outline"
                    color="neutral"
                    {...register("job.endDate")}
                />

                <div className="flex flex-col space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">لوکیشن کاری</label>
                    <select
                        className="rounded-2xl border border-border/40 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
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

'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/ui/text-input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { genderOptions } from './constants';

export const PersonalInfo = () => {
    const { register } = useFormContext();

    return (
        <Card className="rounded-3xl border border-border/60 bg-card/80 p-0 shadow-sm">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-lg font-semibold text-foreground">اطلاعات شخصی</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    مشخصات هویتی خود را دقیق و مطابق مدارک رسمی ثبت کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 px-6 pb-6 md:grid-cols-2">

                <TextInput label="نام" fullWidth variant="outline" color="neutral" {...register("personal.firstName")} />

                <TextInput label="نام خانوادگی" fullWidth variant="outline" color="neutral" {...register("personal.lastName")} />

                <TextInput label="نام پدر (اختیاری)" fullWidth variant="outline" color="neutral" {...register("personal.fatherName")} />

                <TextInput label="کد ملی / پاسپورت" fullWidth variant="outline" color="neutral" {...register("personal.nationalId")} />

                <TextInput
                    label="تاریخ تولد"
                    fullWidth
                    type="date"
                    variant="outline"
                    color="neutral"
                    {...register("personal.birthDate")}
                />

                <div className="flex flex-col space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">جنسیت</label>
                    <select
                        className="rounded-2xl border border-border/40 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                        {...register("personal.gender")}
                    >
                        <option value="">انتخاب کنید</option>
                        {genderOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

            </CardContent>
        </Card>
    );
}

'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/ui/text-input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { genderOptions } from './constants';

export const PersonalInfo = () => {
    const { register } = useFormContext();

    return (
        // ✨ تغییرات: rounded-xl، border-2، border-primary/50، shadow-lg
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    اطلاعات شخصی <span className="text-primary">👤</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    مشخصات هویتی خود را دقیق و مطابق مدارک رسمی ثبت کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2"> {/* فاصله بیشتر بین فیلدها */}

                <TextInput label="نام" fullWidth variant="outline" color="neutral" {...register("personal.firstName")} className="rounded-lg" />

                <TextInput label="نام خانوادگی" fullWidth variant="outline" color="neutral" {...register("personal.lastName")} className="rounded-lg" />

                <TextInput label="نام پدر (اختیاری)" fullWidth variant="outline" color="neutral" {...register("personal.fatherName")} className="rounded-lg" />

                <TextInput label="کد ملی / پاسپورت" fullWidth variant="outline" color="neutral" {...register("personal.nationalId")} className="rounded-lg" />

                <TextInput
                    label="تاریخ تولد"
                    fullWidth
                    type="date"
                    variant="outline"
                    color="neutral"
                    {...register("personal.birthDate")}
                    className="rounded-lg"
                />

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">جنسیت</label> {/* بهبود استایل لیبل */}
                    <select
                        // ✨ تغییرات: rounded-lg، border-border/60، ring-primary
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
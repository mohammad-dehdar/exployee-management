'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/ui/text-input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export const ContactInfo = () => {
    const { register } = useFormContext();

    return (
        // ✨ استایل‌های جدید کارت: rounded-xl، border-2، border-primary/50، shadow-lg
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    اطلاعات تماس <span className="text-primary">📞</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    راه‌های ارتباطی که HR از آن‌ها استفاده می‌کند را ثبت کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">

                <TextInput
                    fullWidth
                    label="شماره موبایل"
                    variant="outline"
                    color="neutral"
                    {...register("contact.phone")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

                <TextInput
                    fullWidth
                    label="تماس اضطراری"
                    variant="outline"
                    color="neutral"
                    {...register("contact.emergencyPhone")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

                <TextInput
                    fullWidth
                    label="ایمیل سازمانی"
                    disabled
                    variant="outline"
                    color="neutral"
                    {...register("contact.orgEmail")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

                <TextInput
                    fullWidth
                    label="ایمیل شخصی"
                    variant="outline"
                    color="neutral"
                    {...register("contact.personalEmail")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

                <TextInput
                    fullWidth
                    label="آدرس"
                    variant="outline"
                    color="neutral"
                    {...register("contact.address")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

                <TextInput
                    fullWidth
                    label="شهر/استان"
                    variant="outline"
                    color="neutral"
                    {...register("contact.city")}
                    className="rounded-lg" // ✨ استایل جدید TextInput
                />

            </CardContent>
        </Card>
    );
}
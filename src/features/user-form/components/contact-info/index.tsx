'use client';

import { useFormContext } from 'react-hook-form';
import { TextInput } from '@/components/ui/text-input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export const ContactInfo = () => {
    const { register } = useFormContext();

    return (
        <Card className="rounded-3xl border border-border/60 bg-card/80 p-0 shadow-sm">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-lg font-semibold text-foreground">اطلاعات تماس</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    راه‌های ارتباطی که HR از آن‌ها استفاده می‌کند را ثبت کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 px-6 pb-6 md:grid-cols-2">

                <TextInput fullWidth label="شماره موبایل" variant="outline" color="neutral" {...register("contact.phone")} />

                <TextInput fullWidth label="تماس اضطراری" variant="outline" color="neutral" {...register("contact.emergencyPhone")} />

                <TextInput
                    fullWidth
                    label="ایمیل سازمانی"
                    disabled
                    variant="outline"
                    color="neutral"
                    {...register("contact.orgEmail")}
                />

                <TextInput
                    fullWidth
                    label="ایمیل شخصی"
                    variant="outline"
                    color="neutral"
                    {...register("contact.personalEmail")}
                />

                <TextInput fullWidth label="آدرس" variant="outline" color="neutral" {...register("contact.address")} />

                <TextInput fullWidth label="شهر/استان" variant="outline" color="neutral" {...register("contact.city")} />

            </CardContent>
        </Card>
    );
}

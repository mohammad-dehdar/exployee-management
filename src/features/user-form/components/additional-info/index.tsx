'use client';

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const maritalStatuses = ["مجرد", "متاهل", "سایر"];

export const AdditionalInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register, setValue, watch } = useFormContext();
    const skills = watch("additional.skills") as string[] | undefined;

    const handleSkillsChange = (value: string) => {
        const parsed = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        setValue("additional.skills", parsed);
    };

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    اطلاعات تکمیلی <span className="text-primary">✨</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    مهارت‌ها، لینک‌ها و توضیحات تکمیلی خود را وارد کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">مهارت‌ها (با کاما جدا کنید)</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        value={skills?.join(", ") ?? ""}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">لینکدین</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("additional.linkedin")}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">گیت‌هاب</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("additional.github")}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">وب‌سایت شخصی</label>
                    <input
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("additional.website")}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">وضعیت تأهل (اختیاری)</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("additional.maritalStatus")}
                        disabled={!editable}
                    >
                        <option value="">انتخاب کنید</option>
                        {maritalStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">توضیحات اضافی</label>
                    <textarea
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        rows={3}
                        {...register("additional.notes")}
                        disabled={!editable}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

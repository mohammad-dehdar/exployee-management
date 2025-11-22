'use client';

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";

const degrees = ["دیپلم", "فوق‌دیپلم", "لیسانس", "فوق‌لیسانس", "دکتری"];

export const EducationInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    اطلاعات تحصیلی <span className="text-primary">🎓</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    آخرین مدرک، رشته و دانشگاه خود را وارد کنید.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">آخرین مدرک تحصیلی</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("education.degree")}
                        disabled={!editable}
                    >
                        <option value="">انتخاب کنید</option>
                        {degrees.map((degree) => (
                            <option key={degree} value={degree}>
                                {degree}
                            </option>
                        ))}
                    </select>
                </div>

                <TextInput
                    fullWidth
                    label="رشته تحصیلی"
                    variant="outline"
                    color="neutral"
                    {...register("education.major")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="نام دانشگاه / مؤسسه"
                    variant="outline"
                    color="neutral"
                    {...register("education.university")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label="سال فارغ‌التحصیلی"
                    variant="outline"
                    color="neutral"
                    {...register("education.graduationYear")}
                    className="rounded-lg"
                    disabled={!editable}
                />
            </CardContent>
        </Card>
    );
};

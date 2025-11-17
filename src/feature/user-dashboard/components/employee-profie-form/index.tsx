"use client";

import type React from "react";
import { startTransition, useEffect, useMemo, useState } from "react";
import { DashboardHeader } from "@/components/shared/dashboard-header";
import { Button, Card, TextInput } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { Attachment, Certification, EmployeeProfileFormProps, EmployeeProfileFormData, Experience } from "./tpes";
import { contractTypes, educationLevels, genderOptions, maritalStatuses, workLocations } from "./constant";
import { useEmployeeProfile } from "../../hooks/use-employee-profile";

const selectClassName =
    "w-full rounded-xl border border-neutral-30 bg-neutral-10/90 px-4 py-3 text-sm text-neutral-90 shadow-sm transition focus:border-primary-50 focus:outline-none dark:border-neutral-80 dark:bg-neutral-110 dark:text-neutral-10";

const textareaClassName =
    "w-full rounded-xl border border-neutral-30 bg-neutral-10/90 px-4 py-3 text-sm text-neutral-90 shadow-sm transition focus:border-primary-50 focus:outline-none dark:border-neutral-80 dark:bg-neutral-110 dark:text-neutral-10";

const createInitialFormData = (userEmail: string): EmployeeProfileFormData => ({
    firstName: "",
    lastName: "",
    fatherName: "",
    nationalId: "",
    birthDate: "",
    gender: "",
    mobile: "",
    emergencyContact: "",
    orgEmail: userEmail,
    personalEmail: "",
    address: "",
    city: "",
    position: "",
    contractType: contractTypes[0],
    startDate: "",
    endDate: "",
    workLocation: workLocations[0],
    baseSalary: "",
    benefits: "",
    commission: "",
    overtimeRate: "",
    educationLevel: "",
    fieldOfStudy: "",
    university: "",
    graduationYear: "",
    skills: "",
    linkedin: "",
    github: "",
    website: "",
    maritalStatus: "",
    notes: "",
});

const createEmptyExperience = (): Experience => ({
    company: "",
    role: "",
    responsibilities: "",
    startDate: "",
    endDate: "",
});

const createEmptyCertification = (): Certification => ({
    title: "",
    issuer: "",
    issueDate: "",
    duration: "",
});

export const EmployeeProfileForm = ({ userEmail, userName }: EmployeeProfileFormProps) => {
    const initialFormData = useMemo(() => createInitialFormData(userEmail), [userEmail]);
    const [formData, setFormData] = useState<EmployeeProfileFormData>(initialFormData);

    const [experiences, setExperiences] = useState<Experience[]>([createEmptyExperience()]);
    const [certifications, setCertifications] = useState<Certification[]>([createEmptyCertification()]);
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const { profile, isLoading, isSaving, error, loadProfile, upsertProfile } = useEmployeeProfile();

    const profileOwner = useMemo(() => {
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        if (fullName) {
            return fullName;
        }
        return userName ? userName.trim() : "";
    }, [formData.firstName, formData.lastName, userName]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    useEffect(() => {
        startTransition(() => {
            if (!profile) {
                setFormData(initialFormData);
                setExperiences([createEmptyExperience()]);
                setCertifications([createEmptyCertification()]);
                setAttachments([]);
                return;
            }

            setFormData({
                ...initialFormData,
                ...profile,
                orgEmail: profile.orgEmail || userEmail,
            });

            setExperiences(profile.experiences?.length ? profile.experiences : [createEmptyExperience()]);
            setCertifications(profile.certifications?.length ? profile.certifications : [createEmptyCertification()]);
            setAttachments(profile.attachments ?? []);
        });
    }, [profile, initialFormData, userEmail]);

    const handleChange = (
        field: keyof typeof formData,
    ) =>
        (
            event:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
                | React.ChangeEvent<HTMLSelectElement>,
        ) => {
            setFormData((prev) => ({ ...prev, [field]: event.target.value }));
        };

    const handleExperienceChange = (
        index: number,
        field: keyof Experience,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setExperiences((prev) =>
            prev.map((item, idx) => (idx === index ? { ...item, [field]: event.target.value } : item)),
        );
    };

    const handleCertificationChange = (
        index: number,
        field: keyof Certification,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCertifications((prev) =>
            prev.map((item, idx) => (idx === index ? { ...item, [field]: event.target.value } : item)),
        );
    };

    const handleAttachmentChange = (label: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileName = event.target.files?.[0]?.name || "";
        setAttachments((prev) => {
            const exists = prev.find((item) => item.label === label);
            if (exists) {
                return prev.map((item) => (item.label === label ? { ...item, fileName } : item));
            }
            return [...prev, { id: crypto.randomUUID(), label, fileName }];
        });
    };

    const addExperience = () => {
        setExperiences((prev) => [...prev, createEmptyExperience()]);
    };

    const removeExperience = (index: number) => {
        setExperiences((prev) => prev.filter((_, idx) => idx !== index));
    };

    const addCertification = () => {
        setCertifications((prev) => [...prev, createEmptyCertification()]);
    };

    const removeCertification = (index: number) => {
        setCertifications((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(false);

        try {
            await upsertProfile({
                ...formData,
                experiences,
                certifications,
                attachments,
            });
            setSubmitted(true);
        } catch {
            // error state handled by hook
        }
    };

    const getAttachmentName = (label: string) => attachments.find((item) => item.label === label)?.fileName || "";

    if (isLoading && !profile) {
        return (
            <div className="flex min-h-[200px] items-center justify-center">
                <p className="text-sm text-neutral-70 dark:text-neutral-40">در حال بارگذاری اطلاعات...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <DashboardHeader
                greeting={`سلام${profileOwner ? ` ${profileOwner}` : ""}!`}
                description="اطلاعات خود را کامل کنید تا تیم منابع انسانی بتواند بهتر از شما پشتیبانی کند."
                badge="پروفایل"
                badgeClass="bg-primary-40 text-neutral-10"
            />

            <div className="flex justify-end">
                <Button
                    as="link"
                    href="/dashboard/user"
                    variant="ghost"
                    color="neutral"
                    className="button-text-sm"
                >
                    بازگشت به داشبورد
                </Button>
            </div>

            {error ? (
                <div className="rounded-xl border border-error-40 bg-error-10/40 px-4 py-3 text-sm text-error-80">
                    {error}
                </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-primary-60">بخش ۱</p>
                            <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">اطلاعات شخصی</h2>
                            <p className="text-sm text-neutral-70 dark:text-neutral-40">
                                اطلاعات هویتی شما برای تکمیل پرونده منابع انسانی.
                            </p>
                        </div>
                    </header>
                    <div className="grid gap-4 md:grid-cols-2">
                        <TextInput label="نام" placeholder="مثال: علی" value={formData.firstName} onValueChange={handleChange("firstName")} fullWidth />
                        <TextInput label="نام خانوادگی" placeholder="مثال: رضایی" value={formData.lastName} onValueChange={handleChange("lastName")} fullWidth />
                        <TextInput label="نام پدر (اختیاری)" placeholder="مثال: محمد" value={formData.fatherName} onValueChange={handleChange("fatherName")} fullWidth />
                        <TextInput label="کد ملی / شماره پاسپورت" placeholder="کد ملی خود را وارد کنید" value={formData.nationalId} onValueChange={handleChange("nationalId")} fullWidth />
                        <TextInput label="تاریخ تولد" type="date" value={formData.birthDate} onValueChange={handleChange("birthDate")} fullWidth />
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-neutral-80 dark:text-neutral-20">جنسیت (اختیاری)</Label>
                            <select className={selectClassName} value={formData.gender} onChange={handleChange("gender")}>
                                {genderOptions.map((option) => (
                                    <option key={option || "خالی"} value={option}>
                                        {option || "انتخاب کنید"}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 space-y-1">
                        <p className="text-xs font-medium text-primary-60">بخش ۲</p>
                        <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">اطلاعات تماس</h2>
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">راه‌های ارتباطی در مواقع ضروری و اداری.</p>
                    </header>
                    <div className="grid gap-4 md:grid-cols-2">
                        <TextInput label="شماره موبایل" placeholder="0912..." value={formData.mobile} onValueChange={handleChange("mobile")} fullWidth />
                        <TextInput label="شماره تماس اضطراری (اختیاری)" placeholder="شماره یکی از نزدیکان" value={formData.emergencyContact} onValueChange={handleChange("emergencyContact")} fullWidth />
                        <TextInput label="ایمیل سازمانی" value={formData.orgEmail} fullWidth disabled />
                        <TextInput label="ایمیل شخصی (اختیاری)" placeholder="example@gmail.com" value={formData.personalEmail} onValueChange={handleChange("personalEmail")} fullWidth />
                        <TextInput label="آدرس محل سکونت (کامل)" placeholder="آدرس دقیق خود را وارد کنید" value={formData.address} onValueChange={handleChange("address")} fullWidth />
                        <TextInput label="شهر / استان" placeholder="مثال: تهران" value={formData.city} onValueChange={handleChange("city")} fullWidth />
                    </div>
                </Card>

                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 space-y-1">
                        <p className="text-xs font-medium text-primary-60">بخش ۳</p>
                        <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">اطلاعات شغلی</h2>
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">جزییات همکاری شما با شرکت.</p>
                    </header>
                    <div className="grid gap-4 md:grid-cols-2">
                        <TextInput label="سمت / عنوان شغلی" placeholder="مثال: توسعه‌دهنده فرانت‌اند" value={formData.position} onValueChange={handleChange("position")} fullWidth />
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-neutral-80 dark:text-neutral-20">نوع قرارداد</Label>
                            <select className={selectClassName} value={formData.contractType} onChange={handleChange("contractType")}>
                                {contractTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <TextInput label="تاریخ شروع همکاری" type="date" value={formData.startDate} onValueChange={handleChange("startDate")} fullWidth />
                        <TextInput label="تاریخ پایان همکاری (در صورت وجود)" type="date" value={formData.endDate} onValueChange={handleChange("endDate")} fullWidth />
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-neutral-80 dark:text-neutral-20">لوکیشن کاری</Label>
                            <select className={selectClassName} value={formData.workLocation} onChange={handleChange("workLocation")}>
                                {workLocations.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 space-y-1">
                        <p className="text-xs font-medium text-primary-60">بخش ۴</p>
                        <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">اطلاعات مالی (نمایش)</h2>
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">این بخش تنها توسط ادمین قابل ویرایش است.</p>
                    </header>
                    <div className="grid gap-4 md:grid-cols-2">
                        <TextInput label="حقوق پایه" placeholder="توسط ادمین ثبت می‌شود" value={formData.baseSalary} disabled fullWidth />
                        <TextInput label="مزایا" placeholder="توسط ادمین ثبت می‌شود" value={formData.benefits} disabled fullWidth />
                        <TextInput label="پورسانت" placeholder="توسط ادمین ثبت می‌شود" value={formData.commission} disabled fullWidth />
                        <TextInput label="نرخ اضافه‌کاری" placeholder="توسط ادمین ثبت می‌شود" value={formData.overtimeRate} disabled fullWidth />
                    </div>
                </Card>

                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 space-y-1">
                        <p className="text-xs font-medium text-primary-60">بخش ۵</p>
                        <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">اطلاعات تحصیلی</h2>
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">آخرین مدرک تحصیلی و اطلاعات دانشگاهی.</p>
                    </header>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-neutral-80 dark:text-neutral-20">آخرین مدرک تحصیلی</Label>
                            <select className={selectClassName} value={formData.educationLevel} onChange={handleChange("educationLevel")}>
                                <option value="">انتخاب کنید</option>
                                {educationLevels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <TextInput label="رشته تحصیلی" placeholder="مثال: مهندسی نرم‌افزار" value={formData.fieldOfStudy} onValueChange={handleChange("fieldOfStudy")} fullWidth />
                        <TextInput label="نام دانشگاه / مؤسسه" placeholder="مثال: دانشگاه تهران" value={formData.university} onValueChange={handleChange("university")} fullWidth />
                        <TextInput label="سال فارغ‌التحصیلی" placeholder="مثال: 1402" value={formData.graduationYear} onValueChange={handleChange("graduationYear")} fullWidth />
                    </div>
                </Card>

                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 flex flex-col gap-1">
                        <p className="text-xs font-medium text-primary-60">بخش ۶</p>
                        <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">سوابق شغلی</h2>
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">حداقل یک سابقه شغلی تکمیل شود.</p>
                    </header>
                    <div className="space-y-4">
                        {experiences.map((experience, index) => (
                            <div
                                key={`experience-${index}`}
                                className="rounded-xl border border-dashed border-neutral-40/70 bg-neutral-10/70 p-4 dark:border-neutral-80/80 dark:bg-neutral-120/40"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">سابقه #{index + 1}</p>
                                    {experiences.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            color="error"
                                            className="button-text-sm"
                                            onClick={() => removeExperience(index)}
                                        >
                                            حذف
                                        </Button>
                                    )}
                                </div>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <TextInput label="نام شرکت" placeholder="مثال: شرکت اتمیفی" value={experience.company} onValueChange={handleExperienceChange(index, "company")} fullWidth />
                                    <TextInput label="سمت" placeholder="مثال: سرپرست تیم" value={experience.role} onValueChange={handleExperienceChange(index, "role")} fullWidth />
                                    <div className="md:col-span-2">
                                        <Label className="text-sm font-medium text-neutral-80 dark:text-neutral-20">توضیحات وظایف (اختیاری)</Label>
                                        <textarea
                                            className={textareaClassName}
                                            rows={3}
                                            placeholder="شرح کلی وظایف و دستاوردها"
                                            value={experience.responsibilities}
                                            onChange={handleExperienceChange(index, "responsibilities")}
                                        />
                                    </div>
                                    <TextInput label="تاریخ شروع" type="date" value={experience.startDate} onValueChange={handleExperienceChange(index, "startDate")} fullWidth />
                                    <TextInput label="تاریخ پایان" type="date" value={experience.endDate} onValueChange={handleExperienceChange(index, "endDate")} fullWidth />
                                </div>
                            </div>
                        ))}
                        <Button type="button" color="secondary" variant="outline" className="button-text-sm" onClick={addExperience}>
                            افزودن سابقه جدید
                        </Button>
                    </div>
                </Card>

                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 space-y-1">
                        <p className="text-xs font-medium text-primary-60">بخش ۷</p>
                        <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">گواهینامه‌ها و دوره‌ها</h2>
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">دوره‌های معتبر و گواهینامه‌های حرفه‌ای خود را ثبت کنید.</p>
                    </header>
                    <div className="space-y-4">
                        {certifications.map((certification, index) => (
                            <div
                                key={`certification-${index}`}
                                className="rounded-xl border border-dashed border-neutral-40/70 bg-neutral-10/70 p-4 dark:border-neutral-80/80 dark:bg-neutral-120/40"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-sm font-semibold text-neutral-90 dark:text-neutral-10">دوره / گواهینامه #{index + 1}</p>
                                    {certifications.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            color="error"
                                            className="button-text-sm"
                                            onClick={() => removeCertification(index)}
                                        >
                                            حذف
                                        </Button>
                                    )}
                                </div>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <TextInput label="عنوان دوره / گواهینامه" placeholder="مثال: AWS Solution Architect" value={certification.title} onValueChange={handleCertificationChange(index, "title")} fullWidth />
                                    <TextInput label="صادرکننده" placeholder="نام موسسه" value={certification.issuer} onValueChange={handleCertificationChange(index, "issuer")} fullWidth />
                                    <TextInput label="تاریخ دریافت" type="date" value={certification.issueDate} onValueChange={handleCertificationChange(index, "issueDate")} fullWidth />
                                    <TextInput label="مدت زمان دوره (اختیاری)" placeholder="مثال: 40 ساعت" value={certification.duration} onValueChange={handleCertificationChange(index, "duration")} fullWidth />
                                </div>
                            </div>
                        ))}
                        <Button type="button" color="secondary" variant="outline" className="button-text-sm" onClick={addCertification}>
                            افزودن گواهینامه جدید
                        </Button>
                    </div>
                </Card>

                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 space-y-1">
                        <p className="text-xs font-medium text-primary-60">بخش ۸</p>
                        <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">فایل‌های ضمیمه</h2>
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">آپلود مدارک ضروری و اختیاری.</p>
                    </header>
                    <div className="grid gap-4 md:grid-cols-2">
                        {["رزومه (PDF)", "اسکن کارت ملی / پاسپورت", "عکس پرسنلی", "مدارک تحصیلی", "گواهینامه‌ها و دوره‌ها"].map((label) => (
                            <div key={label} className="flex flex-col gap-2">
                                <Label className="text-sm font-medium text-neutral-80 dark:text-neutral-20">{label}</Label>
                                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-neutral-40/70 bg-neutral-10/70 px-4 py-3 text-sm font-medium text-primary-70 transition hover:border-primary-50 dark:border-neutral-80/80 dark:bg-neutral-120/40">
                                    <span>{getAttachmentName(label) || "انتخاب فایل"}</span>
                                    <input type="file" className="hidden" onChange={handleAttachmentChange(label)} />
                                    <span className="text-xs text-neutral-60 dark:text-neutral-40">بارگذاری</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50">
                    <header className="mb-4 space-y-1">
                        <p className="text-xs font-medium text-primary-60">بخش ۹</p>
                        <h2 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">اطلاعات تکمیلی</h2>
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">مهارت‌ها، لینک‌های کاری و توضیحات اضافی.</p>
                    </header>
                    <div className="grid gap-4 md:grid-cols-2">
                        <TextInput label="مهارت‌ها (با ویرگول جدا کنید)" placeholder="مثال: React, TypeScript, Scrum" value={formData.skills} onValueChange={handleChange("skills")} fullWidth />
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-neutral-80 dark:text-neutral-20">وضعیت تأهل (اختیاری)</Label>
                            <select className={selectClassName} value={formData.maritalStatus} onChange={handleChange("maritalStatus")}>
                                {maritalStatuses.map((status) => (
                                    <option key={status || "خالی"} value={status}>
                                        {status || "انتخاب کنید"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <TextInput label="لینکدین" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onValueChange={handleChange("linkedin")} fullWidth />
                        <TextInput label="گیت‌هاب" placeholder="https://github.com/..." value={formData.github} onValueChange={handleChange("github")} fullWidth />
                        <TextInput label="وب‌سایت شخصی" placeholder="https://example.com" value={formData.website} onValueChange={handleChange("website")} fullWidth />
                        <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-neutral-80 dark:text-neutral-20">توضیحات اضافی</Label>
                            <textarea
                                className={textareaClassName}
                                rows={4}
                                placeholder="نکات تکمیلی که لازم است تیم منابع انسانی بداند"
                                value={formData.notes}
                                onChange={handleChange("notes")}
                            />
                        </div>
                    </div>
                </Card>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    {submitted ? (
                        <p className="text-sm text-success-60">اطلاعات پروفایل ذخیره شد.</p>
                    ) : (
                        <p className="text-sm text-neutral-70 dark:text-neutral-40">تمام بخش‌ها را بررسی و سپس دکمه ثبت را فشار دهید.</p>
                    )}
                    <div className="flex gap-3">
                        <Button type="button" variant="ghost" color="neutral" className="button-text-sm">
                            انصراف
                        </Button>
                        <Button type="submit" color="primary" className="button-text-sm" isLoading={isSaving}>
                            ثبت پروفایل
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EmployeeProfileForm;
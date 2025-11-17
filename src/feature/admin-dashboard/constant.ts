import { SectionConfig } from "../dashboard-shared/types";

export const adminSections: SectionConfig[] = [
    {
        title: "مدیریت کارمندان",
        description: "افزودن، ویرایش و مدیریت وضعیت کارمندان سازمان.",
        actions: [
            { label: "مشاهده لیست", color: "secondary" },
            { label: "افزودن کارمند", color: "primary" },
        ],
    },
    {
        title: "تنظیمات سامانه",
        description: "مدیریت دسترسی‌ها، نقش‌ها و سیاست‌های امنیتی سامانه.",
        actions: [{ label: "ورود به تنظیمات", color: "neutral" }],
    },
];
import type { ProfileSection, ReminderItem } from "./types";

export const profileSections: ProfileSection[] = [
  {
    title: "اطلاعات شخصی",
    description: "نام، کدملی، تاریخ تولد و جنسیت را وارد کنید.",
    path: "/user-dashboard/user-form?section=personal",
  },
  {
    title: "اطلاعات تماس",
    description: "شماره موبایل، ایمیل سازمانی و آدرس محل سکونت.",
    path: "/user-dashboard/user-form?section=contact",
  },
  {
    title: "اطلاعات شغلی",
    description: "سمت، نوع قرارداد، تاریخ شروع و محل استقرار.",
    path: "/user-dashboard/user-form?section=job",
  },
];

export const reminders: ReminderItem[] = [
  {
    title: "آماده‌سازی مدارک",
    value: "کارت ملی، شناسنامه، آخرین حکم کارگزینی",
  },
  {
    title: "آپلود مستندات",
    value: "امکان بارگذاری مدارک به‌زودی فعال می‌شود.",
  },
  {
    title: "پشتیبانی منابع انسانی",
    value: "در صورت نیاز با بخش HR تماس بگیرید.",
  },
];

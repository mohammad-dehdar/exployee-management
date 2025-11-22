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
  {
    title: "اطلاعات تحصیلی",
    description: "مدرک تحصیلی، رشته، دانشگاه و سال فارغ‌التحصیلی.",
    path: "/user-dashboard/user-form?section=education",
  },
  {
    title: "سابقه کار",
    description: "شرکت‌های قبلی، سمت‌ها و تجربیات کاری.",
    path: "/user-dashboard/user-form?section=workHistory",
  },
  {
    title: "گواهینامه‌ها",
    description: "گواهینامه‌ها و مدارک تخصصی.",
    path: "/user-dashboard/user-form?section=certificates",
  },
  {
    title: "ضمایم",
    description: "رزومه، کارت ملی، عکس و مدارک.",
    path: "/user-dashboard/user-form?section=attachments",
  },
  {
    title: "اطلاعات تکمیلی",
    description: "مهارت‌ها، لینکدین، گیت‌هاب و سایر اطلاعات.",
    path: "/user-dashboard/user-form?section=additional",
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

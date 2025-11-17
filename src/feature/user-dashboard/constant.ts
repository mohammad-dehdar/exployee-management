import { SectionConfig } from "./types";

export const userSections: SectionConfig[] = [
  {
    title: "پروفایل شخصی",
    description: "به‌روزرسانی اطلاعات فردی، سوابق و مدارک کاری.",
    actions: [
      {
        label: "تکمیل پروفایل کاربری",
        color: "primary",
        href: "/dashboard/user/profile",
      },
    ],
  },
  {
    title: "درخواست‌ها و حضور",
    description: "ثبت درخواست مرخصی، ماموریت و مشاهده گزارش حضور و غیاب.",
    actions: [{ label: "ثبت درخواست", color: "secondary" }],
  },
];
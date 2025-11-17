import { SectionConfig } from "../dashboard-shared/types";

export const userSections: SectionConfig[] = [
    {
      title: "پروفایل شخصی",
      description: "به‌روزرسانی اطلاعات فردی، سوابق و مدارک کاری.",
      actions: [{ label: "ویرایش پروفایل", color: "primary" }],
    },
    {
      title: "درخواست‌ها و حضور",
      description:
        "ثبت درخواست مرخصی، ماموریت و مشاهده گزارش حضور و غیاب.",
      actions: [{ label: "ثبت درخواست", color: "secondary" }],
    },
  ];
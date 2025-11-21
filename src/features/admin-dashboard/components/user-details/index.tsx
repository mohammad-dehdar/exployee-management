import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserRecord } from "@/types/user";

export default function UserDetails({ user }: { user: UserRecord }) {
    const { personal, contact, job } = user;

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">مشخصات کاربر</p>
                    <h1 className="text-2xl font-semibold">
                        {personal.firstName} {personal.lastName}
                    </h1>
                </div>
                <Link href="/admin-dashboard" className="text-sm text-primary hover:underline">
                    بازگشت به لیست کاربران
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>اطلاعات شخصی</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>نام: {personal.firstName ?? "ثبت نشده"}</p>
                    <p>نام خانوادگی: {personal.lastName ?? "ثبت نشده"}</p>
                    <p>کد ملی: {personal.nationalId ?? "ثبت نشده"}</p>
                    <p>تاریخ تولد: {personal.birthDate ?? "ثبت نشده"}</p>
                    <p>جنسیت: {personal.gender ?? "ثبت نشده"}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>اطلاعات تماس</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>شماره موبایل: {contact.phone ?? "ثبت نشده"}</p>
                    <p>ایمیل سازمانی: {contact.orgEmail ?? "ثبت نشده"}</p>
                    <p>آدرس: {contact.address ?? "ثبت نشده"}</p>
                    <p>شهر: {contact.city ?? "ثبت نشده"}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>اطلاعات شغلی</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>سمت: {job.position ?? "ثبت نشده"}</p>
                    <p>نوع قرارداد: {job.contractType ?? "ثبت نشده"}</p>
                    <p>تاریخ شروع: {job.startDate ?? "ثبت نشده"}</p>
                    <p>تاریخ پایان: {job.endDate ?? "ثبت نشده"}</p>
                    <p>لوکیشن: {job.location ?? "ثبت نشده"}</p>
                </CardContent>
            </Card>
        </div>
    );
}

import { UserRecord } from "../../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDetails({ user }: { user: UserRecord }) {
    const { personal, contact, job } = user;

    return (
        <div className="p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>اطلاعات شخصی</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>نام: {personal.firstName}</p>
                    <p>نام خانوادگی: {personal.lastName}</p>
                    <p>کد ملی: {personal.nationalId}</p>
                    <p>تاریخ تولد: {personal.birthDate}</p>
                    <p>جنسیت: {personal.gender}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>اطلاعات تماس</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>شماره موبایل: {contact.phone}</p>
                    <p>ایمیل سازمانی: {contact.orgEmail}</p>
                    <p>آدرس: {contact.address}</p>
                    <p>شهر: {contact.city}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>اطلاعات شغلی</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>سمت: {job.position}</p>
                    <p>نوع قرارداد: {job.contractType}</p>
                    <p>تاریخ شروع: {job.startDate}</p>
                    <p>تاریخ پایان: {job.endDate}</p>
                    <p>لوکیشن: {job.location}</p>
                </CardContent>
            </Card>
        </div>
    );
}

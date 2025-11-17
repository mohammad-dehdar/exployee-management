import { DashboardHeader } from "@/feature/dashboard-shared/components/dashboard-header";
import { AdminDashboardSections } from "./components/dashboard-sections";
import type { DashboardFeatureProps } from "@/feature/dashboard-shared/types";
import { adminSections } from "./constant";

export const AdminDashboardFeature = ({ user }: DashboardFeatureProps) => {
    const greeting = user.name || user.email;

    return (
        <>
            <DashboardHeader
                greeting={greeting}
                description="شما به عنوان مدیر سامانه می‌توانید تمامی بخش‌ها را مدیریت کنید."
                badge="ادمین"
                badgeClass="bg-secondary-40 text-neutral-10"
            />
            <AdminDashboardSections sections={adminSections} />
        </>
    );
};

export default AdminDashboardFeature;

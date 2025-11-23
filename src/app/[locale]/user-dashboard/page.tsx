import UserDashboardFeature from "@/features/user-dashboard";
import DashboardLayout from "@/layouts/dashboard-layout";

export default function UserDashboardPage() {
    return (
        <DashboardLayout>
            <UserDashboardFeature />
        </DashboardLayout>
    );
}


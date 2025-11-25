import AdminDashboardFeature from "@/features/admin-dashboard";
import DashboardLayout from "@/layouts/dashboard-layout";

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <AdminDashboardFeature />
    </DashboardLayout>
  )
}

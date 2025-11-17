import { AdminDashboardFeature } from "@/feature/admin-dashboard";
import { getAuthenticatedUser } from "@/services";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const { user, payload } = await getAuthenticatedUser();

  if (!user || !payload) {
    redirect("/login");
  }

  const role = user.role ?? "user";
  if (role !== "admin") {
    redirect("/dashboard/user");
  }

  return (
    <AdminDashboardFeature
      user={{
        id: user._id?.toString() ?? payload.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }}
    />
  );
}

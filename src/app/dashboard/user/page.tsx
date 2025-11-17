import { UserDashboardFeature } from "@/feature/user-dashboard";
import { getAuthenticatedUser } from "@/services";
import { redirect } from "next/navigation";

export default async function UserDashboardPage() {
  const { user, payload } = await getAuthenticatedUser();

  if (!user || !payload) {
    redirect("/login");
  }

  const role = user.role ?? "user";
  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  return (
    <UserDashboardFeature
      user={{
        id: user._id?.toString() ?? payload.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }}
    />
  );
}

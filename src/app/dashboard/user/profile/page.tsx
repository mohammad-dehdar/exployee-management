import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/services";
import { EmployeeProfileForm } from "@/feature/user-dashboard/components/employee-profie-form";

export default async function UserProfilePage() {
    const { user, payload } = await getAuthenticatedUser();

    if (!user || !payload) {
        redirect("/login");
    }

    const role = user.role ?? "user";
    if (role === "admin") {
        redirect("/dashboard/admin");
    }

    return (
        <EmployeeProfileForm
            userEmail={user.email}
            userName={user.name}
        />
    );
}

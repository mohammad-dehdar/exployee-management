import { getAuthenticatedUser } from "@/services";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const { user, payload } = await getAuthenticatedUser();

    if (!user || !payload) {
        redirect("/login");
    }

    if ((user.role ?? "user") === "admin") {
        redirect("/dashboard/admin");
    }

    redirect("/dashboard/user");
}

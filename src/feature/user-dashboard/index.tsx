import { DashboardFeatureProps } from "./types";
import { UserDashboardSections } from "./components/dashboard-section";
import { DashboardHeader } from "@/components/shared/dashboard-header";
import { userSections } from "./constant";

export const UserDashboardFeature = ({ user }: DashboardFeatureProps) => {
  const greeting = user.name || user.email;

  return (
    <>
      <DashboardHeader
        greeting={greeting}
        description="شما می‌توانید اطلاعات کاربری و درخواست‌های خود را از این قسمت مدیریت کنید."
        badge="کاربر"
        badgeClass="bg-primary-40 text-neutral-10"
      />
      <UserDashboardSections sections={userSections} />
    </>
  );
};

export default UserDashboardFeature;

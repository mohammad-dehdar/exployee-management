import type { ComponentProps } from "react";
import type { User } from "@/store/user.store";
import type { Button } from "@/components/ui";

export type DashboardUser = Pick<User, "id" | "email" | "name" | "role">;

export interface DashboardFeatureProps {
  user: DashboardUser;
}

export type SectionConfig = {
  title: string;
  description: string;
  actions?: Array<{
    label: string;
    color: ComponentProps<typeof Button>["color"];
  }>;
};

import { Card, Button } from "@/components/ui";
import { AdminDashboardSectionsProps } from "./constant";


export const AdminDashboardSections = ({
  sections,
}: AdminDashboardSectionsProps) => (
  <section className="grid gap-4 md:grid-cols-2">
    {sections.map((section) => (
      <Card
        key={section.title}
        className="rounded-2xl border border-neutral-40/40 bg-neutral-10/90 p-6 shadow-md backdrop-blur dark:border-neutral-80/60 dark:bg-neutral-110/50"
      >
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-lg font-semibold text-neutral-90 dark:text-neutral-10">
              {section.title}
            </h3>
            <p className="text-sm text-neutral-70 dark:text-neutral-40">
              {section.description}
            </p>
          </div>
          {section.actions?.length ? (
            <div className="flex flex-wrap gap-3">
              {section.actions.map((action) => (
                <Button
                  key={action.label}
                  type="button"
                  variant="outline"
                  color={action.color}
                  className="button-text-sm"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </Card>
    ))}
  </section>
);

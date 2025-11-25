'use client';

import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { type UserRecord } from "@/schemas/user.schema"
import { FormSectionWrapper } from "@/components/shared"

const inputStyles =
  "mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"

export const ContactInfo = ({ editable = true }: { editable?: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserRecord>()
  const t = useTranslations("userForm.sections.contact")
  const contactErrors = errors.contact ?? {}

  return (
    <FormSectionWrapper sectionKey="contact" emoji="📞">
      <FieldSet>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.phone")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.phone")}
              {...register("contact.phone")}
              disabled={!editable}
              className={inputStyles}
            />
            {contactErrors.phone?.message && (
              <FieldDescription variant="error" className="text-xs">
                {contactErrors.phone.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.emergencyPhone")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.emergencyPhone")}
              {...register("contact.emergencyPhone")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.orgEmail")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.orgEmail")}
              {...register("contact.orgEmail")}
              disabled
              className={inputStyles}
            />
            {contactErrors.orgEmail?.message && (
              <FieldDescription variant="error" className="text-xs">
                {contactErrors.orgEmail.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.personalEmail")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.personalEmail")}
              {...register("contact.personalEmail")}
              disabled={!editable}
              className={inputStyles}
            />
            {contactErrors.personalEmail?.message && (
              <FieldDescription variant="error" className="text-xs">
                {contactErrors.personalEmail.message}
              </FieldDescription>
            )}
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.address")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.address")}
              {...register("contact.address")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.city")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.city")}
              {...register("contact.city")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </FormSectionWrapper>
  )
}


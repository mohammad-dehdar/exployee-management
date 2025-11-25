'use client';

import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { GENDER_OPTIONS, type UserRecord } from "@/schemas/user.schema"
import { FormSectionWrapper, SelectField } from "@/components/shared"
import { User } from "lucide-react";

const inputStyles =
  "mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"

export const PersonalInfo = ({ editable = true }: { editable?: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserRecord>()
  const t = useTranslations("userForm.sections.personal")
  const personalErrors = errors.personal ?? {}

  return (
    <FormSectionWrapper sectionKey="personal" emoji="👤">
      <FieldSet>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.username")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.username")}
              {...register("personal.username")}
              disabled={!editable}
              className={inputStyles}
            />
            {personalErrors.username?.message && (
              <FieldDescription variant="error" className="text-xs">
                {personalErrors.username.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.firstName")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.firstName")}
              {...register("personal.firstName")}
              disabled={!editable}
              className={inputStyles}
            />
            {personalErrors.firstName?.message && (
              <FieldDescription variant="error" className="text-xs">
                {personalErrors.firstName.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.lastName")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.lastName")}
              {...register("personal.lastName")}
              disabled={!editable}
              className={inputStyles}
            />
            {personalErrors.lastName?.message && (
              <FieldDescription variant="error" className="text-xs">
                {personalErrors.lastName.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.fatherName")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.fatherName")}
              {...register("personal.fatherName")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.nationalId")}
            </FieldLabel>
            <Input
              placeholder={t("placeholders.nationalId")}
              {...register("personal.nationalId")}
              disabled={!editable}
              className={inputStyles}
            />
            {personalErrors.nationalId?.message && (
              <FieldDescription variant="error" className="text-xs">
                {personalErrors.nationalId.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold text-neutral-90 dark:text-neutral-20">
              {t("fields.birthDate")}
            </FieldLabel>
            <Input
              type="date"
              {...register("personal.birthDate")}
              disabled={!editable}
              className={inputStyles}
            />
          </Field>

          <SelectField
            labelKey="fields.gender"
            register={register("personal.gender")}
            options={GENDER_OPTIONS}
            optionsTranslationKey="gender"
            editable={editable}
            sectionKey="personal"
          />
        </FieldGroup>
      </FieldSet>
    </FormSectionWrapper>
  )
}
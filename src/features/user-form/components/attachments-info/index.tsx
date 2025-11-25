import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { FormSectionWrapper } from "@/components/shared"
import type { UserRecord } from "@/schemas/user.schema"

const inputStyles =
  "mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"

type AttachmentFieldKey = keyof UserRecord["attachments"]
type AttachmentFieldPath = `attachments.${AttachmentFieldKey}`

const attachmentFields: Array<{ name: AttachmentFieldKey; icon: string; fullWidth?: boolean }> = [
  { name: "resume", icon: "📄" },
  { name: "idScan", icon: "🪪" },
  { name: "avatar", icon: "🖼️" },
  { name: "educationDocs", icon: "🎓" },
  { name: "certificates", icon: "📚", fullWidth: true },
]

export const AttachmentsInfo = ({ editable = true }: { editable?: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserRecord>()
  const t = useTranslations("userForm.sections.attachments")
  const attachmentErrors = errors.attachments ?? {}

  return (
    <FormSectionWrapper sectionKey="attachments" emoji="📎">
      <FieldSet>
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          {attachmentFields.map((field) => {
            const fieldPath = `attachments.${field.name}` as AttachmentFieldPath
            const errorMessage = attachmentErrors?.[field.name]?.message

            return (
              <Field key={field.name} className={field.fullWidth ? "md:col-span-2" : undefined}>
              <FieldLabel className="flex items-center gap-2 text-sm font-semibold text-neutral-90 dark:text-neutral-20">
                <span aria-hidden="true">{field.icon}</span>
                {t(`fields.${field.name}`)}
              </FieldLabel>
              <Input
                placeholder={t(`placeholders.${field.name}`)}
                {...register(fieldPath)}
                disabled={!editable}
                className={inputStyles}
              />
              {errorMessage && (
                <FieldDescription variant="error" className="text-xs">
                  {errorMessage as string}
                </FieldDescription>
              )}
            </Field>
            )
          })}
        </FieldGroup>
      </FieldSet>
    </FormSectionWrapper>
  )
}



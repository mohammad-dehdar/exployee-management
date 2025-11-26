import type React from "react"
import { useTranslations } from "next-intl"
import { Controller, useFormContext } from "react-hook-form"
import { UploadCloud } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { FormSectionWrapper } from "@/components/shared"
import type { UserRecord } from "@/schemas/user.schema"

type AttachmentFieldKey = keyof UserRecord["attachments"]
type AttachmentFieldPath = `attachments.${AttachmentFieldKey}`

const attachmentFields: Array<{
  name: AttachmentFieldKey
  icon: React.ReactNode
  multiple?: boolean
  accept?: string
  fullWidth?: boolean
}> = [
  { name: "resume", icon: "📄", accept: ".pdf,.doc,.docx" },
  { name: "idScan", icon: "🪪", accept: ".pdf,.jpg,.jpeg,.png" },
  { name: "avatar", icon: "🖼️", accept: ".jpg,.jpeg,.png" },
  { name: "educationDocs", icon: "🎓", multiple: true, accept: ".pdf,.jpg,.jpeg,.png" },
  { name: "certificates", icon: "🏅", multiple: true, accept: ".pdf,.jpg,.jpeg,.png", fullWidth: true },
]

const formatSelected = (value: unknown): string => {
  if (!value) return ""
  if (Array.isArray(value)) {
    if (value.length === 0) return ""
    return value
      .map((item) => (typeof item === "string" ? item : "name" in item && (item as File).name ? (item as File).name : ""))
      .filter(Boolean)
      .join(", ")
  }
  if (typeof value === "string") return value
  if (value && typeof value === "object" && "name" in value) return (value as File).name
  return ""
}

export const AttachmentsInfo = ({ editable = true }: { editable?: boolean }) => {
  const {
    control,
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
            const errorMessage = attachmentErrors?.[field.name]?.message as string | undefined

            return (
              <Field key={field.name} className={field.fullWidth ? "md:col-span-2" : undefined}>
                <FieldLabel className="flex items-center gap-2 text-sm font-semibold text-neutral-90 dark:text-neutral-20">
                  <span aria-hidden="true">{field.icon}</span>
                  {t(`fields.${field.name}`)}
                </FieldLabel>

                <Controller
                  name={fieldPath}
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => {
                    const selected = formatSelected(value)
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            name={fieldPath}
                            multiple={field.multiple}
                            accept={field.accept}
                            disabled={!editable}
                            onBlur={onBlur}
                            onChange={(event) => {
                              const files = event.target.files
                              if (!files) return
                              const nextValue = field.multiple ? Array.from(files) : files[0]
                              onChange(nextValue)
                            }}
                            className="cursor-pointer border-dashed border-neutral-50 bg-neutral-10 hover:border-primary focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-110"
                          />
                          <UploadCloud className="size-4 text-primary" />
                        </div>
                        <FieldDescription className="text-xs text-neutral-70 dark:text-neutral-50">
                          {selected || t(`placeholders.${field.name}`)}
                        </FieldDescription>
                      </div>
                    )
                  }}
                />

                {errorMessage && (
                  <FieldDescription variant="error" className="text-xs">
                    {t(errorMessage) || errorMessage}
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

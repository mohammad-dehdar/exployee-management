'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { TextInput } from "@/components/ui/text-input";
import { FormSectionWrapper } from "@/components/shared";

export const AttachmentsInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.attachments');

    return (
        <FormSectionWrapper sectionKey="attachments" emoji="📎">
                <TextInput
                    fullWidth
                    label={t('fields.resume')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.resume')}
                    {...register("attachments.resume")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.idScan')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.idScan')}
                    {...register("attachments.idScan")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.avatar')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.avatar')}
                    {...register("attachments.avatar")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.educationDocs')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.educationDocs')}
                    {...register("attachments.educationDocs")}
                    className="rounded-lg"
                    disabled={!editable}
                />

                <TextInput
                    fullWidth
                    label={t('fields.certificates')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.certificates')}
                    {...register("attachments.certificates")}
                    className="rounded-lg"
                    disabled={!editable}
                />
        </FormSectionWrapper>
    );
};

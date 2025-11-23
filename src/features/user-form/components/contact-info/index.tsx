'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { TextInput } from "@/components/ui/text-input";
import { FormSectionWrapper } from "@/components/shared";

export const ContactInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.contact');

    return (
        <FormSectionWrapper sectionKey="contact" emoji="📞">
                <TextInput
                    fullWidth
                    label={t('fields.phone')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.phone')}
                    {...register("contact.phone")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.emergencyPhone')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.emergencyPhone')}
                    {...register("contact.emergencyPhone")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.orgEmail')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.orgEmail')}
                    {...register("contact.orgEmail")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.personalEmail')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.personalEmail')}
                    {...register("contact.personalEmail")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.address')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.address')}
                    {...register("contact.address")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    label={t('fields.city')}
                    variant="outline"
                    color="neutral"
                    placeholder={t('placeholders.city')}
                    {...register("contact.city")}
                    disabled={!editable}
                    className="rounded-lg"
                />
        </FormSectionWrapper>
    );
};

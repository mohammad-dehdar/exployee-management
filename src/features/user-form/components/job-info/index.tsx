'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/text-input";
import { contractTypes, positions, workLocations } from "./constants";

export const JobInfo = ({ editable = true }: { editable?: boolean }) => {
    const { register } = useFormContext();
    const t = useTranslations('userForm.sections.job');
    const tOptions = useTranslations('options');
    const tCommon = useTranslations('common');

    return (
        <Card className="rounded-xl border-2 border-primary/50 bg-background p-0 shadow-lg">
            <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    {t('title')} <span className="text-primary">💼</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {t('description')}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-6 pb-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.position')}</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("job.position")}
                        disabled={!editable}
                    >
                        <option value="">{tCommon('select')}</option>
                        {positions.map((position) => (
                            <option key={position.value} value={position.value}>
                                {tOptions(`position.${position.value}`)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.contractType')}</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("job.contractType")}
                        disabled={!editable}
                    >
                        <option value="">{tCommon('select')}</option>
                        {contractTypes.map((contract) => (
                            <option key={contract.value} value={contract.value}>
                                {tOptions(`contractType.${contract.value}`)}
                            </option>
                        ))}
                    </select>
                </div>

                <TextInput
                    fullWidth
                    type="date"
                    label={t('fields.startDate')}
                    variant="outline"
                    color="neutral"
                    {...register("job.startDate")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <TextInput
                    fullWidth
                    type="date"
                    label={t('fields.endDate')}
                    variant="outline"
                    color="neutral"
                    {...register("job.endDate")}
                    disabled={!editable}
                    className="rounded-lg"
                />

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('fields.location')}</label>
                    <select
                        className="rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...register("job.location")}
                        disabled={!editable}
                    >
                        <option value="">{tCommon('select')}</option>
                        {workLocations.map((location) => (
                            <option key={location.value} value={location.value}>
                                {tOptions(`location.${location.value}`)}
                            </option>
                        ))}
                    </select>
                </div>
            </CardContent>
        </Card>
    );
};

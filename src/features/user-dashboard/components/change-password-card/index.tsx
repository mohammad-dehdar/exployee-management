'use client';

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { toastError, toastSuccess } from "@/components/feedback/toast-provider/toast-provider";
import { useAuthStore } from "@/store/store";

export function ChangePasswordCard() {
    const t = useTranslations('userDashboard.changePasswordCard');
    const { accounts, currentUserId, changePassword } = useAuthStore();
    const account = accounts.find((acc) => acc.id === currentUserId);
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!account) return;
        
        const result = await changePassword(account.id, { currentPassword, newPassword });

        if (!result.success) {
            toastError(result.message ?? t('error'));
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        toastSuccess(t('success'));
    };

    return (
        <Card className="rounded-xl border border-border/60 bg-card/80 shadow-sm backdrop-blur w-full min-w-0 overflow-hidden">
            <CardHeader className="px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 md:pt-5 pb-2 sm:pb-3">
                <CardTitle className="text-sm sm:text-base font-semibold">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5">
                <form onSubmit={handlePasswordChange} className="space-y-3 w-full min-w-0">
                    <div className="space-y-1 w-full min-w-0">
                        <Label htmlFor="currentPassword" className="text-xs sm:text-sm">
                            {t('currentPassword')}
                        </Label>
                        <TextInput
                            id="currentPassword"
                            type="password"
                            placeholder={t('currentPasswordPlaceholder')}
                            fullWidth
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="text-sm w-full min-w-0"
                        />
                    </div>
                    <div className="space-y-1 w-full min-w-0">
                        <Label htmlFor="newPassword" className="text-xs sm:text-sm">
                            {t('newPassword')}
                        </Label>
                        <TextInput
                            id="newPassword"
                            type="password"
                            placeholder={t('newPasswordPlaceholder')}
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="text-sm w-full min-w-0"
                        />
                    </div>
                    <Button type="submit" className="w-full rounded-xl text-sm sm:text-base">
                        {t('submit')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}


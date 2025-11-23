'use client';

import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/i18n/routing";
import { toastError, toastSuccess } from "@/components/feedback/toast-provider/toast-provider";
import { useAuthStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "./constants";

export default function HomeFeature() {
    const t = useTranslations();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);
    const currentUserId = useAuthStore((state) => state.currentUserId);
    const accounts = useAuthStore((state) => state.accounts);

    useEffect(() => {
        if (!currentUserId) return;
        const account = accounts.find((acc) => acc.id === currentUserId);
        if (!account) return;
        router.push(account.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
    }, [accounts, currentUserId, router]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = login(email, password);

        if (!result.success) {
            toastError(result.message ?? t('home.errors.loginFailed'));
            return;
        }

        toastSuccess(t('home.success.welcome'));
        router.push(result.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
    };

    return (
        <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-4 px-4 py-8 sm:px-6 sm:py-12">
            <Card className="relative overflow-hidden rounded-xl shadow-xl border border-neutral-10 bg-neutral-90/5 backdrop-blur-3xl p-4 sm:p-5 md:p-6">
                <CardHeader className="flex flex-col justify-center items-center gap-2 mb-3 sm:mb-4 px-2 sm:px-0">
                    <CardTitle className="text-base sm:text-lg font-bold dark:text-neutral-10 text-neutral-90 text-center">
                        {t('home.login.title')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-0">
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div className="space-y-1.5 sm:space-y-2">
                            <Label className="text-xs sm:text-sm" htmlFor="email">
                                {t('common.email')}
                            </Label>
                            <TextInput
                                id="email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('home.login.placeholders.email')}
                                required
                                className="text-sm sm:text-base"
                            />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                            <Label className="text-xs sm:text-sm" htmlFor="password">
                                {t('common.password')}
                            </Label>
                            <TextInput
                                id="password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('home.login.placeholders.password')}
                                required
                                className="text-sm sm:text-base"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-sm sm:text-base py-2.5 sm:py-2"
                        >
                            {t('common.login')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}


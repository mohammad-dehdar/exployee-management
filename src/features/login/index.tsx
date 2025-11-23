'use client';

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginForm } from "./hooks/useLoginForm";

export default function LoginFeature() {
    const t = useTranslations();
    const { email, setEmail, password, setPassword, handleSubmit, isLoading } = useLoginForm();

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
                            disabled={isLoading}
                            className="w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-sm sm:text-base py-2.5 sm:py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? t('common.loading') || 'در حال ورود...' : t('common.login')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}


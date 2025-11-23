'use client';

import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/i18n/routing";
import { toastError, toastSuccess } from "@/components/feedback/toast-provider/toast-provider";
import { useAuthStore } from "@/store/store";
import { LoginCard } from "./components";
import type { LoginType } from "./types";
import { ROUTES } from "./constants";

export default function HomeFeature() {
    const t = useTranslations();
    const router = useRouter();
    const [loginType, setLoginType] = useState<LoginType>(null);
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

        if (loginType === 'admin' && result.role !== 'admin') {
            toastError(t('home.errors.notAdmin'));
            return;
        }
        if (loginType === 'user' && result.role !== 'user') {
            toastError(t('home.errors.notUser'));
            return;
        }

        toastSuccess(t('home.success.welcome'));
        router.push(result.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
    };

    const handleBack = () => {
        setLoginType(null);
        setEmail("");
        setPassword("");
    };

    const handleLoginTypeSelect = (type: 'user' | 'admin' | 'resume') => {
        setLoginType(type);
    };

    return (
        <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center gap-4 px-4 py-8 sm:gap-6 sm:px-6 sm:py-12 md:gap-8 md:pt-16 lg:pt-20">
            <section className="relative overflow-hidden rounded-xl">
                <div className="relative z-10 grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr,1fr] lg:items-center">
                    {/* <HeroSection loginType={loginType} /> */}
                    <div className="w-full lg:col-span-1">
                        <LoginCard
                            loginType={loginType}
                            email={email}
                            password={password}
                            onLoginTypeSelect={handleLoginTypeSelect}
                            onEmailChange={setEmail}
                            onPasswordChange={setPassword}
                            onSubmit={handleSubmit}
                            onBack={handleBack}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}


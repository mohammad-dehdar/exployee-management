'use client';

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "@/components/feedback/toast-provider/toast-provider";
import { useAuthStore } from "@/features/auth";
import { LoginCard } from "./components";
import type { LoginType } from "./types";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, ROUTES } from "./constants";

export default function HomeFeature() {
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
        router.replace(account.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
    }, [accounts, currentUserId, router]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = login(email, password);

        if (!result.success) {
            toastError(result.message ?? ERROR_MESSAGES.LOGIN_FAILED);
            return;
        }

        if (loginType === 'admin' && result.role !== 'admin') {
            toastError(ERROR_MESSAGES.NOT_ADMIN);
            return;
        }
        if (loginType === 'user' && result.role !== 'user') {
            toastError(ERROR_MESSAGES.NOT_USER);
            return;
        }

        toastSuccess(SUCCESS_MESSAGES.WELCOME);
        router.replace(result.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
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
        <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-4 px-4 py-8 sm:gap-6 sm:px-6 sm:py-12 md:gap-8 md:pt-16 lg:pt-20">
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


'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginTypeSelector } from "../login-type-selector";
import { LoginForm } from "../login-form";
import { ResumeSection } from "../resume-section";
import type { LoginCardProps } from "../../types";

export function LoginCard({
    loginType,
    email,
    password,
    onLoginTypeSelect,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onBack,
}: LoginCardProps) {
    const t = useTranslations();
    
    const getTitle = () => {
        if (loginType === null) return t('home.login.selectType.title');
        return t(`home.login.titles.${loginType}`);
    };
    
    return (
        <Card className="relative overflow-hidden rounded-xl shadow-xl border border-neutral-10 bg-neutral-90/5 backdrop-blur-3xl p-4 sm:p-5 md:p-6">
            <CardHeader className="flex flex-col justify-center items-center gap-2 mb-3 sm:mb-4 px-2 sm:px-0">
                <CardTitle className="text-base sm:text-lg font-bold dark:text-neutral-10 text-neutral-90 text-center">
                    {getTitle()}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-0">
                {loginType === null ? (
                    <LoginTypeSelector onSelect={onLoginTypeSelect} />
                ) : loginType === 'resume' ? (
                    <ResumeSection onBack={onBack} />
                ) : (
                    <LoginForm
                        loginType={loginType}
                        email={email}
                        password={password}
                        onEmailChange={onEmailChange}
                        onPasswordChange={onPasswordChange}
                        onSubmit={onSubmit}
                        onBack={onBack}
                    />
                )}
            </CardContent>
        </Card>
    );
}


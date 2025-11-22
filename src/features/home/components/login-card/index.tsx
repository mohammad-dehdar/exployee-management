'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginTypeSelector } from "../login-type-selector";
import { LoginForm } from "../login-form";
import { ResumeSection } from "../resume-section";
import type { LoginCardProps } from "../../types";
import { LOGIN_TITLES, LOGIN_DESCRIPTIONS, SELECT_LOGIN_TYPE_TITLE, SELECT_LOGIN_TYPE_DESCRIPTION } from "../../constants";

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
    const getTitle = () => {
        if (loginType === null) return SELECT_LOGIN_TYPE_TITLE;
        return LOGIN_TITLES[loginType];
    };

    const getDescription = () => {
        if (loginType === null) return SELECT_LOGIN_TYPE_DESCRIPTION;
        return LOGIN_DESCRIPTIONS[loginType];
    };

    return (
        <Card className="relative overflow-hidden rounded-xl shadow-xl border border-neutral-10 bg-neutral-90/5 backdrop-blur-3xl p-4 sm:p-5 md:p-6">
            <CardHeader className="flex flex-col justify-center items-center gap-2 mb-3 sm:mb-4 px-2 sm:px-0">
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 text-center">
                    {getTitle()}
                </CardTitle>
                <p className="text-xs sm:text-sm text-slate-600 text-center">
                    {getDescription()}
                </p>
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


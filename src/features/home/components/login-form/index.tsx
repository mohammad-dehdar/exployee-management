'use client';

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui";
import { Label } from "@/components/ui/label";
import type { LoginFormProps } from "../../types";
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER } from "../../constants";

export function LoginForm({
    loginType,
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onBack,
}: LoginFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm" htmlFor="email">
                    ایمیل
                </Label>
                <TextInput
                    id="email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder={EMAIL_PLACEHOLDER}
                    required
                    className="text-sm sm:text-base"
                />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm" htmlFor="password">
                    رمز عبور
                </Label>
                <TextInput
                    id="password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder={PASSWORD_PLACEHOLDER}
                    required
                    className="text-sm sm:text-base"
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <Button
                    type="button"
                    onClick={onBack}
                    variant="outline"
                    className="w-full sm:flex-1 rounded-xl text-sm sm:text-base py-2.5 sm:py-2"
                >
                    بازگشت
                </Button>
                <Button
                    type="submit"
                    className="w-full sm:flex-1 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-sm sm:text-base py-2.5 sm:py-2"
                >
                    ورود
                </Button>
            </div>
        </form>
    );
}


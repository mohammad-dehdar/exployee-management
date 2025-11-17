"use client";

import { TextInput, Button, Card } from "@/components/ui";
import { useLogin } from "@/hooks";

export const LoginForm = () => {
    const { formData, errors, handleChange, handleSubmit, isLoading } = useLogin();

    return (
        <div className="relative z-10 h-svh flex w-full items-center justify-center">
            <Card className="w-full max-w-md border border-secondary-40 dark:border-secondary-80 rounded-md shadow-md bg-neutral-10/80 dark:bg-neutral-90/70 backdrop-blur-md px-3 pb-1">
                <div className="space-y-8">
                    <header className="space-y-2 text-center">
                        <p className="text-xs w-fit  mx-auto px-4 rounded-b-sm py-0.5 uppercase tracking-[0.35em] dark:bg-neutral-90/80 bg-neutral-60/80 text-neutral-10 border border-t-0 border-secondary-40 dark:border-secondary-80  dark:text-neutral-40">Etmify- HR</p>
                        <div className="space-y-2 mt-4">
                            <h1 className="text-2xl font-semibold text-neutral-90 dark:text-neutral-10">ورود به پروفایل کاربری</h1>
                            <p className="text-sm text-neutral-70 dark:text-neutral-40">برای دسترسی به داشبورد، اطلاعات خود را وارد کنید.</p>
                        </div>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <TextInput
                            type="email"
                            variant="outline"
                            placeholder="ایمیل"
                            color="secondary"
                            value={formData.email}
                            onChange={handleChange("email")}
                            state={errors.email ? "error" : undefined}
                            inputMessage={errors.email}
                            fullWidth
                        />
                        <TextInput
                            type="password"
                            variant="outline"
                            color="secondary"
                            placeholder="رمز عبور"
                            value={formData.password}
                            onChange={handleChange("password")}
                            state={errors.password ? "error" : undefined}
                            inputMessage={errors.password}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            color='secondary'
                            className="button-text-sm"
                            fullWidth
                            isLoading={isLoading}
                            isDisabled={isLoading}
                        >
                            ورود
                        </Button>
                    </form>

                    <p className="text-xs text-center text-neutral-60 dark:text-neutral-40">
                        با ورود به سیستم، شرایط استفاده و سیاست حریم خصوصی را می‌پذیرید.
                    </p>
                </div>
            </Card>
        </div>
    );
};

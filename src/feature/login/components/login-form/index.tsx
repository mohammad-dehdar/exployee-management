"use client";

import { TextInput, Button, Card } from "@/components/ui";
import { useLogin } from "@/hooks";

export const LoginForm = () => {
    const { formData, errors, handleChange, handleSubmit, isLoading } = useLogin();

    return (
        <Card className="bg-neutral-10 rounded-sm max-w-sm mx-auto mt-24 p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-neutral-90">ورود</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    type="email"
                    placeholder="ایمیل"
                    value={formData.email}
                    onChange={handleChange("email")}
                    state={errors.email ? "error" : undefined}
                    inputMessage={errors.email}
                    fullWidth
                />
                <TextInput
                    type="password"
                    placeholder="رمز عبور"
                    value={formData.password}
                    onChange={handleChange("password")}
                    state={errors.password ? "error" : undefined}
                    inputMessage={errors.password}
                    fullWidth
                />
                <Button
                    type="submit"
                    className="button-text-sm"
                    fullWidth
                    isLoading={isLoading}
                    isDisabled={isLoading}
                >
                    ورود
                </Button>
            </form>
        </Card>
    );
}

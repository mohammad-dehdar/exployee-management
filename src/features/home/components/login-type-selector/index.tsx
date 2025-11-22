'use client';

import { Button } from "@/components/ui/button";
import type { LoginTypeSelectorProps } from "../../types";

export function LoginTypeSelector({ onSelect }: LoginTypeSelectorProps) {
    return (
        <div className="space-y-2.5 sm:space-y-3">
            <Button
                type="button"
                color="secondary"
                onClick={() => onSelect('user')}
                className="w-full rounded-xl py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold"
            >
                عضو اتمیتا هستم
            </Button>
            <Button
                type="button"
                color="primary"
                onClick={() => onSelect('admin')}
                className="w-full rounded-xl py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold"
            >
                ادمین
            </Button>
            <Button
                type="button"
                color="neutral"
                onClick={() => onSelect('resume')}
                className="w-full rounded-xl py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold opacity-75 cursor-not-allowed"
                disabled
            >
                ارسال رزومه
                <span className="mr-2 text-xs">( در حال توسعه ... )</span>
            </Button>
        </div>
    );
}


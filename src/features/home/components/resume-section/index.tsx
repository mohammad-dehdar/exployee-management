'use client';

import { Button } from "@/components/ui/button";
import type { ResumeSectionProps } from "../../types";
import { RESUME_SECTION_MESSAGE } from "../../constants";

export function ResumeSection({ onBack }: ResumeSectionProps) {
    return (
        <div className="space-y-3 sm:space-y-4">
            <div className="rounded-xl bg-slate-100 p-4 sm:p-5 md:p-6 text-center">
                <p className="text-slate-700 font-medium text-sm sm:text-base">
                    {RESUME_SECTION_MESSAGE}
                </p>
            </div>
            <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="w-full rounded-xl text-sm sm:text-base py-2.5 sm:py-2"
            >
                بازگشت
            </Button>
        </div>
    );
}


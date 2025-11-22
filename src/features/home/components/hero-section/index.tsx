'use client';

import type { HeroSectionProps } from "../../types";
import { HERO_TITLE, HERO_SUBTITLE, HERO_DESCRIPTION, ADMIN_HINT_TEXT, USER_HINT_TEXT } from "../../constants";

export function HeroSection({ loginType }: HeroSectionProps) {
    return (
        <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">{HERO_SUBTITLE}</p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{HERO_TITLE}</h1>
            <p className="text-base text-white/85 leading-7">
                {HERO_DESCRIPTION}
            </p>
            {loginType && (
                <div className="flex flex-wrap gap-3 text-xs text-white/80">
                    <span className="rounded-full bg-white/15 px-3 py-1">
                        {loginType === 'admin' ? ADMIN_HINT_TEXT : USER_HINT_TEXT}
                    </span>
                </div>
            )}
        </div>
    );
}


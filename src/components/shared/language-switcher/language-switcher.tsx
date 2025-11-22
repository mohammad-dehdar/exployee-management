'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm shadow-lg backdrop-blur dark:bg-slate-800/70"
      >
        <Image src="/globe.svg" alt="Language" width={16} height={16} />
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full right-0 mb-2 z-50 min-w-[120px] rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  locale === lang.code
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


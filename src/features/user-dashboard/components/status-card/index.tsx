'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusItem } from "@/components/shared/status-item";
import { useTranslations } from 'next-intl';

interface StatusCardProps {
  personal?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  job?: Record<string, unknown>;
  education?: Record<string, unknown>;
  workHistory?: Array<{ company?: string; role?: string; [key: string]: unknown }>;
  certificates?: Array<{ title?: string; issuer?: string; [key: string]: unknown }>;
  attachments?: Record<string, unknown>;
  additional?: Record<string, unknown>;
}

export function StatusCard({ 
  personal, 
  contact, 
  job, 
  education, 
  workHistory, 
  certificates, 
  attachments, 
  additional 
}: StatusCardProps) {
  const t = useTranslations('userDashboard');
  
  const sections = [
    { 
      key: 'personal' as const,
      isDone: Boolean(personal && Object.keys(personal).length)
    },
    { 
      key: 'contact' as const,
      isDone: Boolean(contact && Object.keys(contact).length)
    },
    { 
      key: 'job' as const,
      isDone: Boolean(job && Object.keys(job).length)
    },
    { 
      key: 'education' as const,
      isDone: Boolean(education && Object.keys(education).length)
    },
    { 
      key: 'workHistory' as const,
      isDone: Boolean(workHistory && workHistory.length > 0 && workHistory.some((item) => Boolean(item.company || item.role)))
    },
    { 
      key: 'certificates' as const,
      isDone: Boolean(certificates && certificates.length > 0 && certificates.some((item) => Boolean(item.title || item.issuer)))
    },
    { 
      key: 'attachments' as const,
      isDone: Boolean(attachments && Object.keys(attachments).length)
    },
    { 
      key: 'additional' as const,
      isDone: Boolean(additional && Object.keys(additional).length)
    },
  ];

  return (
    <Card className="rounded-xl border border-border/60 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="px-5 pt-5">
        <CardTitle className="text-base font-semibold text-foreground">
          {t('statusCard.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-3">
          {sections.map((section) => (
            <StatusItem
              key={section.key}
              titleKey={`sections.${section.key}.title`}
              descriptionKey={`sections.${section.key}.description`}
              isCompleted={section.isDone}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

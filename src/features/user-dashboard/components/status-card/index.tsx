'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusItem } from "@/components/shared/status-item";
import { useTranslations } from 'next-intl';
import type { PersonalInfo, ContactInfo, JobInfo, EducationInfo, WorkHistoryItem, CertificateItem, AttachmentInfo, AdditionalInfo } from "@/schemas/user.schema";

interface StatusCardProps {
  personal?: PersonalInfo;
  contact?: ContactInfo;
  job?: JobInfo;
  education?: EducationInfo;
  workHistory?: WorkHistoryItem[];
  certificates?: CertificateItem[];
  attachments?: AttachmentInfo;
  additional?: AdditionalInfo;
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

  const completedCount = sections.filter((section) => section.isDone).length

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-10/80 shadow-lg backdrop-blur-xl dark:border-neutral-90 dark:bg-neutral-110">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary-10 blur-[120px]" />
        <div className="absolute -left-12 -bottom-16 size-48 rounded-full bg-secondary-10 blur-[110px]" />
      </div>

      <CardHeader className="relative z-10 space-y-3 px-6 pt-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-neutral-110 dark:text-neutral-10">
              {t('statusCard.title')}
            </CardTitle>
            <CardDescription className="text-sm text-neutral-70 dark:text-neutral-50">
              {t('profileSummaryCard.title')}
            </CardDescription>
          </div>
          <Badge className="rounded-full bg-success-10 px-4 py-1 text-xs text-success-50">
            {completedCount}/{sections.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 px-6 pb-6">
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

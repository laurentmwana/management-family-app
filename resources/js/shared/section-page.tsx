import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

type SectionPageTitleProps = PropsWithChildren<{ title: string | React.ReactNode }>;

export const SectionPageTitle = ({ children, title }: SectionPageTitleProps) => {
    return (
        <div className="mx-auto mb-12 max-w-2xl">
            <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-muted-foreground text-center text-[17px]">{children}</p>
        </div>
    );
};

type SectionHeaderPageProps = PropsWithChildren<{ className?: string; title: string | React.ReactNode }>;

export const SectionHeaderPage = ({ className, children, title }: SectionHeaderPageProps) => {
    return (
        <div className={cn('mb-12', className)}>
            <h2 className="mb-2 text-xl font-semibold">{title}</h2>
            {children && <p className="text-muted-foreground mb-3 text-sm">{children}</p>}
            <Separator />
        </div>
    );
};

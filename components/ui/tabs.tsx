import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

/** TODO: implement Tabs component. Placeholder div for now. */
export function Tabs({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

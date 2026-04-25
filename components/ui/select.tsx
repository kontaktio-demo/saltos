import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

/** TODO: implement Select component. Placeholder div for now. */
export function Select({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

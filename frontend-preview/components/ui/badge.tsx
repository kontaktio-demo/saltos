import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

/** TODO: implement Badge component. Placeholder div for now. */
export function Badge({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

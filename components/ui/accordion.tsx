import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

/** TODO: implement Accordion component. Placeholder div for now. */
export function Accordion({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

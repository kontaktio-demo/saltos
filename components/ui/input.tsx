import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

/** TODO: implement Input component. Placeholder div for now. */
export function Input({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}
